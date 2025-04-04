import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaCommentMedical } from "react-icons/fa";
import "../styles/Card.css";
import { useBlog } from "../context/BlogContext";
import Pagination from "./Pagination";
import Modal from "./Modal";

function Card() {
  const { allBlogs, pagination, loading, error, fetchBlogs } = useBlog();
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Initial load
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  const handlePageChange = async (newPage) => {
    try {
      await fetchBlogs({}, newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error changing page:", err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="cards-container">
        {allBlogs.map((blog) => {
          // Limit text to 100 characters
          const truncatedContent =
            blog.mainContent.length > 150
              ? `${blog.mainContent.substring(0, 150)}...`
              : blog.mainContent;

          // Take only first 3 images
          const displayedImages = blog.images?.slice(0, 3) || [];

          return (
            <div
              className="card-area"
              key={blog._id}
              onDoubleClick={() => setSelectedBlog(blog)} // Changed to onDoubleClick
              onClick={(e) => e.stopPropagation()}
            >
              <div className="card">
                {/* Card-Header */}
                <div className="card-header">
                  <h1>{blog.blogTitle}</h1>
                  <div className="header-cat-subCat">
                    <p>{blog.category}</p>
                    <p>{blog.subCategory}</p>
                  </div>
                  <p className="header-summary">
                    {blog.summary.length > 100
                      ? `${blog.summary.substring(0, 50)}...`
                      : blog.summary}
                  </p>
                </div>

                {/* Card Main-Content */}
                <div className="card-main-content">
                  <p>{truncatedContent}</p>
                </div>

                {/* Card Favourite view */}
                <div className="card-favourite-view">
                  <div className="card-heart">
                    <button
                      type="submit"
                      onDoubleClick={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle like functionality
                      }}
                    >
                      <CiHeart />
                    </button>
                    <p>{blog.likes || 0}</p>
                  </div>
                  <div className="card-view">
                    <button
                      type="submit"
                      onDoubleClick={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle Views functionality
                      }}
                    >
                      <IoEyeOutline />
                    </button>
                    <p>{blog.views || 0}</p>
                  </div>
                  <div className="card-book-mark">
                    <button
                      type="submit"
                      onDoubleClick={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle book marks functionality
                      }}
                    >
                      <CiBookmark />
                    </button>
                  </div>
                </div>

                {/* Card images show */}
                {displayedImages.length > 0 && (
                  <div className="card-image">
                    {displayedImages.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:3000/${img}`}
                        alt={`Blog content ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Card Profile for the Author */}
                <div className="card-profile">
                  <div className="card-author">
                    <img
                      src={
                        blog.profileImage
                          ? `http://localhost:3000/${blog.profileImage}`
                          : ``
                      }
                      alt={blog.profileImage}
                    />
                    <div className="card-author-name">
                      <h1>{blog.authorName}</h1>
                      <p>
                        Published on:
                        {new Date(blog.publicationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="card-follow-button">
                      <button
                        className="profile-follow-btn"
                        onDoubleClick={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle follow  functionality
                        }}
                      >
                        Follow <FaCommentMedical />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pagination.pages > 6 && <hr />}
      {/* Pagination */}
      {pagination.pages > 1 && (
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      )}
      {selectedBlog && (
        <Modal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
}

export default Card;
