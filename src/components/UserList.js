import React from 'react';

const UserList = ({ users, onEdit, onDelete, truncateName }) => {
  if (users.length === 0) {
    return <div className="no-users">No users found.</div>;
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <span className="user-name" title={user.name}>
            {truncateName(user.name)}
          </span>
          <span className="user-email">{user.email}</span>
          <span className="user-age">{user.age} years</span>
          <button className="edit-btn" onClick={() => onEdit(user)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(user.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;