import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTodo from '../components/client/CreateTodo';
import ViewTodos from '../components/client/ViewTodos';
import UpdateProfile from '../components/client/UpdateProfile';

const tabs = [
  { id: 'create', label: 'Create TODO' },
  { id: 'view', label: 'View TODO List' },
  { id: 'profile', label: 'Update Profile' }
];

const ClientPanel = () => {
  const [activeTab, setActiveTab] = useState('create');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="mb-4 border-b border-gray-300">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {activeTab === 'create' && <CreateTodo />}
        {activeTab === 'view' && <ViewTodos />}
        {activeTab === 'profile' && <UpdateProfile />}
      </div>
    </div>
  );
};

export default ClientPanel;
