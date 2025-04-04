import React, { useState, useCallback, useEffect, useRef } from "react";
import { BlogContext } from "./BlogContext";
import { getBlog, searchBlog } from "../utility/api.js";
import {
  createBlogFunction,
  updateBlog,
  singleBlog,
  deleteBlog,
} from "../context/BlogFunction.jsx";

export const BlogContextProvider = ({ children }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    pages: 1,
  });
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    travelTags: "",
    sortBy: "newest",
  });

  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // comtroling get all data with filtering ...
  const fetchBlogs = useCallback(
    async (newFilters = {}, page = 1) => {
      setLoading(true);
      try {
        const updatedFilters = { ...filtersRef.current, ...newFilters };
        const params = new URLSearchParams({
          page,
          limit: pagination.limit,
          ...updatedFilters,
        });

        // const response = await fetch(
        //   `http://localhost:3000/api/blogs?${params.toString()}`
        // );

        // if (!response.ok)
        //   throw new Error(`HTTP error! status: ${response.status}`);

        // const data = await response.json();

        const response = await getBlog(params.toString());
        const data = response.data;

        setAllBlogs(data.data || []);
        setPagination(
          data.pagination || {
            page: 1,
            limit: pagination.limit,
            total: 0,
            pages: 1,
          }
        );
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  useEffect(() => {
    fetchBlogs({}, 1);
  }, [fetchBlogs]);

  //controlling the search function ...
  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await searchBlog(query);
      const data = response.data.data;
      setAllBlogs(data || []);
      setPagination(
        data.pagination || {
          page: 1,
          limit: pagination.limit,
          total: 0,
          pages: 1,
        }
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    allBlogs,
    loading,
    error,
    pagination,
    filters,
    fetchBlogs,
    setFilters,
    handleSearch,
    createBlogFunction,
    updateBlog,
    singleBlog,
    deleteBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
