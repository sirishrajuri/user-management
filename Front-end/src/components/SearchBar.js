import React from 'react';

const SearchBar = ({ onSearch, searchBy, setSearchBy }) => {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={`Search by ${searchBy}`}
      />
      <select onChange={(e) => setSearchBy(e.target.value)}>
        <option value="userID">User ID</option>
        <option value="firstName">First Name</option>
      </select>
    </div>
  );
};

export default SearchBar;
