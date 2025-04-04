import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import "../styles/Modal.css";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import ConfirmDialog from "../utility/ConfirmAlert";

function Modal({ blog, onClose }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { deleteBlog, fetchBlogs } = useBlog();

  const handleEdit = (blogId) => {
    navigate("./add-form", {
      state: {
        blogId: blogId,
      },
    });
  };
  let id = blog._id;
  const handleDelete = async () => {
    try {
      const response = await deleteBlog(id);
      const data = response.deleteBlog;

      if (data.success) {
        onClose();
        await fetchBlogs();
        navigate("/"); // Navigate to home
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setShowConfirm(false); // Always hide confirm dialog
    }
  };
  return (
    <div className="blog-detail-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h1 className="detail-title">{blog.blogTitle}</h1>

        <div className="detail-categories">
          <span className="category-badge">{blog.category}</span>
          {blog.subCategory && (
            <span className="subcategory-badge">{blog.subCategory}</span>
          )}
        </div>

        <div className="detail-author">
          <img
            src={
              blog.profileImage
                ? `https://blog-side-l4or.onrender.com/${blog.profileImage}`
                : ""
            }
            alt={blog.authorName}
            className="author-image"
          />
          <div className="author-info">
            <h3>{blog.authorName}</h3>
            <p>
              Published on:{" "}
              {new Date(blog.publicationDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="detail-summary">
          <h3>Summary</h3>
          <p>{blog.summary}</p>
        </div>

        <div className="detail-content">
          <h3>Content</h3>
          <p>{blog.mainContent}</p>
        </div>

        {blog.images?.length > 0 && (
          <div className="detail-images">
            <h3>Images</h3>
            <div className="image-grid">
              {blog.images.map((img, index) => (
                <img
                  key={index}
                  src={`https://blog-side-l4or.onrender.com/${img}`}
                  alt={`Blog content ${index + 1}`}
                  className="detail-image"
                />
              ))}
            </div>
          </div>
        )}

        <div className="detail-interactions">
          <div className="social-interactions">
            <button className="like-button">
              <CiHeart /> {blog.likes || 0}
            </button>
            <button className="view-button">
              <IoEyeOutline /> {blog.views || 0}
            </button>
            <button className="bookmark-button">
              <CiBookmark /> {blog.bookMark || 0}
            </button>
          </div>
          <div className="management-actions">
            <button
              className="edit-button"
              onClick={() => handleEdit(blog._id)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
            >
              Delete
            </button>
            {showConfirm && (
              <ConfirmDialog
                title="Confirm Delete"
                message="Are you sure you want to delete this item?"
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
