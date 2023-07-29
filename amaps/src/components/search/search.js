import React, { useState } from 'react';
import { fetchData } from '../../api/apiCalls';
import './search.css';

const SearchBox = ({ onFetchData }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await fetchData(searchInput);
      onFetchData(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBox;
