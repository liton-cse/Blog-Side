import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BlogForm.css";
import { useBlog } from "../context/BlogContext.jsx";

const BlogForm = ({ isEditMode, id }) => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { singleBlog, updateBlog, createBlogFunction } = useBlog();

  const [formData, setFormData] = useState({
    authorName: "",
    blogTitle: "",
    category: "",
    summary: "",
    mainContent: "",
    profileImage: null,
    images: [],
    publicationDate: new Date().toISOString().split("T")[0],
    subCategory: "",
    travelTags: "",
  });

  const [previews, setPreviews] = useState({
    profileImage: "",
    blogImages: [],
  });

  // Fetch blog data in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const response = await singleBlog(id);
          const blogData = response.BlogData;

          setFormData({
            authorName: blogData.authorName,
            blogTitle: blogData.blogTitle,
            category: blogData.category,
            summary: blogData.summary,
            mainContent: blogData.mainContent,
            profileImage: null,
            images: [],
            publicationDate: blogData.publicationDate.split("T")[0],
            subCategory: blogData.subCategory || "",
            travelTags: blogData.travelTags || "",
          });

          setPreviews({
            profileImage: blogData.profileImage
              ? `https://blog-side-l4or.onrender.com/${blogData.profileImage}`
              : null,
            blogImages: blogData.images.map(
              (img) => `https://blog-side-l4or.onrender.com/${img}`
            ),
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [singleBlog, isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlogImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, images: files }));

      // Create previews
      const readers = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return reader;
      });

      Promise.all(
        readers.map(
          (reader) =>
            new Promise((resolve) => {
              reader.onloadend = () => resolve(reader.result);
            })
        )
      ).then((previews) => {
        setPreviews((prev) => ({
          ...prev,
          blogImages: isEditMode ? [...prev.blogImages, ...previews] : previews,
        }));
      });
    }
  };

  const removeBlogImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...previews.blogImages];

    if (isEditMode && typeof newPreviews[index] === "string") {
      // This is an existing image from server (URL string)
      // Mark it for deletion in backend
      newPreviews[index] = null;
    } else {
      // This is a newly added image (File object)
      newImages.splice(index, 1);
      newPreviews.splice(index, 1);
    }

    setFormData((prev) => ({ ...prev, images: newImages }));
    setPreviews((prev) => ({ ...prev, blogImages: newPreviews }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "profileImage" && key !== "images") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append files
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      // Handle image deletions in edit mode
      if (isEditMode) {
        previews.blogImages.forEach((img, index) => {
          if (img === null) {
            formDataToSend.append("deletedImages", index);
          }
        });
      }

      // Convert publicationDate to ISO string
      formDataToSend.set(
        "publicationDate",
        new Date(formData.publicationDate).toISOString()
      );

      // Make API request
      if (isEditMode) {
        await updateBlog(formDataToSend, id);
      } else {
        await createBlogFunction(formDataToSend);
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !formData.authorName) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="blog-form-container">
      <h1>{isEditMode ? "Edit Blog Post" : "Create New Blog Post"}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="authorName">Author Name*</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
              placeholder="Enter author name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="blogTitle">Blog Title*</label>
            <input
              type="text"
              id="blogTitle"
              name="blogTitle"
              value={formData.blogTitle}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subCategory">Sub Category</label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
            >
              <option value="">Select a sub-category</option>
              <option value="adventure">Adventure</option>
              <option value="culture">Culture</option>
              <option value="food">Food</option>
              <option value="budget">Budget</option>
              <option value="luxury">Luxury</option>
              <option value="family">Family</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="travelTags">Travel Tags</label>
            <select
              id="travelTags"
              name="travelTags"
              value={formData.travelTags}
              onChange={handleChange}
            >
              <option value="">Select a travel tag</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="north-america">North America</option>
              <option value="south-america">South America</option>
              <option value="australia">Australia</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="summary">Summary*</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter a brief summary of your blog post"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mainContent">Main Content*</label>
            <textarea
              id="mainContent"
              name="mainContent"
              value={formData.mainContent}
              onChange={handleChange}
              required
              rows="8"
              placeholder="Write your blog content here"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image*</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleProfileImageChange}
              accept="image/*"
              required={!isEditMode}
            />
            {previews.profileImage && (
              <div className="image-preview">
                <img src={previews.profileImage} alt="Profile preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="blogImages">Blog Images (Max 5)</label>
            <input
              type="file"
              id="blogImages"
              name="blogImages"
              onChange={handleBlogImagesChange}
              accept="image/*"
              multiple
              max="5"
            />
            <div className="image-previews-grid">
              {previews.blogImages.map(
                (img, index) =>
                  img && (
                    <div key={index} className="image-preview-item">
                      <img src={img} alt={`Preview ${index}`} />
                      <button
                        type="button"
                        onClick={() => removeBlogImage(index)}
                        className="remove-image-btn"
                      >
                        &times;
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="publicationDate">Publication Date*</label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <span className="btn-loader"></span>
            ) : isEditMode ? (
              "Update"
            ) : (
              "Publish"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
