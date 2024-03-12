import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ users, setUsers }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
  });

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    axios.get('http://localhost:8080/userdetails/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:8080/userdetails/users/${userId}`)
      .then(refreshUsers)
      .catch(error => console.error('Error deleting user:', error));
  };

  const startEdit = (user) => {
    setEditingUserId(user.id);
    setEditFormData(user);
  };

  const cancelEdit = () => {
    setEditingUserId(null);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/userdetails/users/${editingUserId}`, editFormData)
      .then(() => {
        refreshUsers();
        setEditingUserId(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const renderRow = (user, isEditing) => {
    if (isEditing) {
      return (
        <>
          {}
          <td>{user.id}</td>
          <td><input type="text" name="firstName" value={editFormData.firstName} onChange={handleEditFormChange} /></td>
          <td><input type="text" name="lastName" value={editFormData.lastName} onChange={handleEditFormChange} /></td>
          <td><input type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} /></td>
          <td><input type="text" name="status" value={editFormData.status} onChange={handleEditFormChange} /></td>
          <td><input type="tel" name="phoneNumber" value={editFormData.phoneNumber} onChange={handleEditFormChange} /></td>
          <td><input type="date" name="dateOfBirth" value={editFormData.dateOfBirth} onChange={handleEditFormChange} /></td>
          <td><input type="text" name="address" value={editFormData.address} onChange={handleEditFormChange} /></td>
          <td>
            <button type="button" onClick={saveEdit}>Save</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </td>
        </>
      );
    } else {
      return (
        <>
          <td>{user.id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.status}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.dateOfBirth}</td>
          <td>{user.address}</td>
          <td>
            <button type="button" onClick={() => startEdit(user)}>Edit</button>
            <button type="button" onClick={() => deleteUser(user.id)}>Delete</button>
          </td>
        </>
      );
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {}
              {renderRow(user, editingUserId === user.id)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
