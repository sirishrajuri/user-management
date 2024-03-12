import React, { useState } from 'react';
import axios from 'axios'; 
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchBy, setSearchBy] = useState('userID');

  const refreshUsers = () => {
    axios.get('http://localhost:8080/userdetails/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleSearch = (searchTerm) => {
    const apiEndpoint = searchBy === 'userID' ? `http://localhost:8080/userdetails/users/${searchTerm}` : 
    `http://localhost:8080/userdetails/users/search/byFirstName?firstName=${searchTerm}`;
    axios.get(apiEndpoint)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error searching users:', error));
  };


  return (
    <div className="App">
      <h1>User Management</h1>
      <CreateUser refreshUsers={refreshUsers} />
      <SearchBar onSearch={handleSearch} searchBy={searchBy} setSearchBy={setSearchBy} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
