import React, { useState } from "react";
import "../styles/BlogFilter.css";

const BlogFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    travelTags: "",
    category: "",
    subCategory: "",
    sortBy: "newest",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      travelTags: "",
      category: "",
      subCategory: "",
      sortBy: "newest",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="filter-container">
      <div className="filter-group left-group">
        <div className="filter-item">
          <select
            id="travelTags"
            name="travelTags"
            value={filters.travelTags}
            onChange={handleChange}
          >
            <option value="" disabled>
              Destination
            </option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
            <option value="north-america">North America</option>
            <option value="south-america">South America</option>
            <option value="australia">Australia</option>
          </select>
        </div>

        <div className="filter-item">
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Category
            </option>
            <option value="technology">Technology</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
          </select>
        </div>

        <div className="filter-item">
          <select
            id="subCategory"
            name="subCategory"
            value={filters.subCategory}
            onChange={handleChange}
            // disabled={filters.category !== "travel"}
          >
            <option value="" disabled>
              Subcategory
            </option>
            <option value="adventure">Adventure</option>
            <option value="culture">Culture</option>
            <option value="food">Food</option>
            <option value="budget">Budget</option>
            <option value="luxury">Luxury</option>
            <option value="family">Family</option>
          </select>
        </div>
      </div>

      <div className="filter-group right-group">
        <div className="filter-item">
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="filter-item">
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;
