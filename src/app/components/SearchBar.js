'use client'; // Ensure this is added to use React hooks

import React, { useState } from 'react'; // Add this import
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ setSearchTerm }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded pr-12"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-10 text-gray-500"
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-2 text-gray-500"
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
