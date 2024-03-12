import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ refreshUsers }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/userdetails/createuser', user)
      .then(() => {
        refreshUsers();
        setUser({
          firstName: '',
          lastName: '',
          email: '',
          status: '',
          phoneNumber: '',
          dateOfBirth: '',
          address: '',
        }); 
      })
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
      <input type="text" name="status" placeholder="Status" value={user.status} onChange={handleChange} required />
      <input type="tel" name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleChange} required />
      <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={user.dateOfBirth} onChange={handleChange} required />
      <textarea name="address" placeholder="Address" value={user.address} onChange={handleChange} required />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
