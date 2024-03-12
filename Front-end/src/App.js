import React from 'react';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
// import './App.css'; // This line is only needed if you have an App.css file

function App() {
  return (
    <div className="App">
      <h1>User Management</h1>
      <CreateUser />
      <UserList />
    </div>
  );
}

export default App;
