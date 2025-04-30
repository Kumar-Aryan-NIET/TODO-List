import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const ViewTodos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    setError('');
    try {
      const token = getToken();
      const response = await axios.get('/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch TODOs');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your TODO List</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {todos.length === 0 ? (
        <p>No TODOs found.</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo._id} className="border border-gray-300 rounded p-4">
              <h3 className="font-semibold text-lg">{todo.title}</h3>
              <p className="text-gray-700">{todo.description}</p>
              <p className="text-sm text-gray-500">
                Created at: {new Date(todo.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewTodos;
