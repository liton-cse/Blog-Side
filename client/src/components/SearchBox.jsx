import React, { useState } from "react";
import "../styles/Search.css";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    setQuery("");
  };

  return (
    <div className="search-wrapper">
      <form className="search-container" onSubmit={handleSubmit}>
        <button type="button" className="menu-icon" aria-label="Menu">
          ☰
        </button>

        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blog by Title/Author name/Destination/Category"
          aria-label="Search"
        />

        <div className="search-icon-inside">🔍</div>
      </form>

      <button
        type="submit"
        className="search-button-external"
        onClick={handleSubmit}
        aria-label="Submit search"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
