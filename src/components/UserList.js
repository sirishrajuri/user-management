import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

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
      .then(() => {
        refreshUsers();
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const updateUser = (user) => {
    axios.put(`/api/users/${user.id}`, user)
      .then(() => {
        refreshUsers();
      })
      .catch(error => console.error('Error updating user:', error));
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
            {/* ... other headers ... */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              {/* ... other cells ... */}
              <td>
                {/* Add your update logic here */}
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
