import React, { useEffect } from "react";
import SearchBox from "./SearchBox";
import "../styles/Header.css";
import BlogFilter from "./BlogFilter";
import { useBlog } from "../context/BlogContext";

function Header() {
  const { fetchBlogs, handleSearch } = useBlog();

  // Initialize blogs on first render
  useEffect(() => {
    fetchBlogs({}, 1);
  }, [fetchBlogs]);

  const handleSearchBlog = (query) => {
    handleSearch(query);
  };

  const handleFilterChange = (filterUpdates) => {
    fetchBlogs(filterUpdates);
  };

  return (
    <div className="header-area">
      <div className="header">
        <h1>Blogs</h1>
        <div className="header-search-box">
          <SearchBox onSearch={handleSearchBlog} />
          <BlogFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  );
}

export default Header;
