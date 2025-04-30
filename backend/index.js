require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Import routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('TODO App Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
