import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
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
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const deleteUser = (userId) => {
    axios.delete(`/api/users/${userId}`)
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
    axios.put(`/api/users/${editingUserId}`, editFormData)
      .then(() => {
        refreshUsers();
        setEditingUserId(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h2>User List</h2>
      <form onSubmit={saveEdit}>
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
                {editingUserId === user.id ? (
                  // Editable row
                  <>
                    <td>{user.id}</td>
                    <td><input type="text" name="firstName" value={editFormData.firstName} onChange={handleEditFormChange} /></td>
                    <td><input type="text" name="lastName" value={editFormData.lastName} onChange={handleEditFormChange} /></td>
                    <td><input type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} /></td>
                    <td><input type="text" name="status" value={editFormData.status} onChange={handleEditFormChange} /></td>
                    <td><input type="tel" name="phoneNumber" value={editFormData.phoneNumber} onChange={handleEditFormChange} /></td>
                    <td><input type="date" name="dateOfBirth" value={editFormData.dateOfBirth} onChange={handleEditFormChange} /></td>
                    <td><input type="text" name="address" value={editFormData.address} onChange={handleEditFormChange} /></td>
                    <td>
                      <button type="submit">Save</button>
                      <button type="button" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default UserList;
