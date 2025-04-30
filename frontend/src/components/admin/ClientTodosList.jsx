import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ClientTodosList = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async (pageNum) => {
    setError('');
    setLoading(true);
    try {
      const response = await api.get(`api/todos/admin/client-todos?page=${pageNum}`);
      setTodos(response.data.todos);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch client TODOs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Client TODO List</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No TODOs found.</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Client Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{todo.userId?.name || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{todo.userId?.email || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{todo.userId?.phone || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{todo.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{todo.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(todo.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={page === 1 || loading}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages || loading}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientTodosList;
