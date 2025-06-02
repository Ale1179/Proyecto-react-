import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm'; 
import UserList from './components/UserList';
import { truncateName } from './utils/utils';
import './App.css';

const API_URL = "/api/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const resp = await fetch(API_URL);
    const data = await resp.json();
    setUsers(data);
    setLoading(false);
  };

  
  const handleSaveUser = async (user) => {
    if (user.id) {
      
      const resp = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const updatedUser = await resp.json();
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setEditingUser(null);
    } else {
      
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const newUser = await resp.json();
      setUsers([...users, newUser]);
    }
  };

  
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  
  const handleDeleteUser = async (id) => {
    await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    setUsers(users.filter(u => u.id !== id));
    if (editingUser && editingUser.id === id) setEditingUser(null);
  };

  
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>User Management</h1>
      <UserForm
        onSave={handleSaveUser}
        editingUser={editingUser}
        cancelEdit={() => setEditingUser(null)}
      />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <UserList
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          truncateName={truncateName}
        />
      )}

      <div className="user-count">
        Total Users: {filteredUsers.length}
      </div>
    </div>
  );
};

export default App;
