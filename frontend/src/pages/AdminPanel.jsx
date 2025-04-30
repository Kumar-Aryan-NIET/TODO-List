import React, { useState } from 'react';
import ClientTodosList from '../components/admin/ClientTodosList';
import ChangePassword from '../components/admin/ChangePassword';

const tabs = [
  { id: 'todos', label: 'Client TODOs' },
  { id: 'password', label: 'Change Password' }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
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
        {activeTab === 'todos' && <ClientTodosList />}
        {activeTab === 'password' && <ChangePassword />}
      </div>
    </div>
  );
};

export default AdminPanel;
