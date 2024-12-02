import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or email"
      className="w-full p-2 border border-gray-300 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
