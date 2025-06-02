import React, { useState, useEffect } from 'react';

const UserForm = ({ onSave, editingUser, cancelEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name || '');
      setEmail(editingUser.email || '');
      setAge(editingUser.age || '');
    } else {
      setName('');
      setEmail('');
      setAge('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      alert('Please fill in all fields.');
      return;
    }
    const user = { name, email, age: Number(age) };
    if (editingUser && editingUser.id) {
      user.id = editingUser.id;
    }
    onSave(user);
    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        maxLength={50}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        maxLength={50}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        min={1}
        max={150}
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
      {editingUser && (
        <button type="button" className="cancel-btn" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;