import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-side-l4or.onrender.com/api", // Backend base URL
});

export const createBlog = (data) => API.post("/blog", data);

export const editBlog = (formDataToSend, id) =>
  API.put(`/blog/${id}`, formDataToSend);

// export const getSingleBlog = () => API.get("/blog/:id");
export const getSingleBlog = (id) => API.get(`/blog/${id}`);

export const getBlog = (param) => API.get(`/blogs?${param}`);

export const deleteBlogApi = (id) => API.delete(`/blog/${id}`);

export const searchBlog = (query) =>
  API.get(`/search?q=${encodeURIComponent(query)}`);
