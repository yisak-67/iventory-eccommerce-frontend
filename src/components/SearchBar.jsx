import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    color: '',
    name: '',
    price_min: '',
    price_max: ''
  });

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove empty fields from search
    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== '')
    );
    onSearch(filteredParams);
  };

  const handleClear = () => {
    setSearchParams({
      color: '',
      name: '',
      price_min: '',
      price_max: ''
    });
    onSearch({});
  };

  return (
    <div className="search-bar">
      <h3>Search Products</h3>
      <form onSubmit={handleSubmit}>
        <div className="search-fields">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={searchParams.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={searchParams.color}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price_min"
            placeholder="Min Price"
            step="0.01"
            value={searchParams.price_min}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price_max"
            placeholder="Max Price"
            step="0.01"
            value={searchParams.price_max}
            onChange={handleChange}
          />
        </div>
        <div className="search-actions">
          <button type="submit" className="btn-search">Search</button>
          <button type="button" onClick={handleClear} className="btn-clear">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;