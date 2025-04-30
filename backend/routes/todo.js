const express = require('express');
const Todo = require('../models/Todo');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create TODO (Client only)
router.post('/', authMiddleware, roleMiddleware([1]), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const todo = new Todo({
      userId: req.user.userId,
      title,
      description
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error('Create TODO error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get TODO list (Client only)
router.get('/', authMiddleware, roleMiddleware([1]), async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error('Get TODOs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update TODO (Client only)
router.put('/:id', authMiddleware, roleMiddleware([1]), async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' });
    }
    const { title, description } = req.body;
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error('Update TODO error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete TODO (Client only)
router.delete('/:id', authMiddleware, roleMiddleware([1]), async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' });
    }
    res.json({ message: 'TODO deleted' });
  } catch (err) {
    console.error('Delete TODO error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: View client TODO list with pagination
router.get('/admin/client-todos', authMiddleware, roleMiddleware([0]), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments();

    res.json({
      todos,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    console.error('Admin get client TODOs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
