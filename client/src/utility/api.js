import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://blog-side-l4or.onrender.com/api",
=======
  baseURL: "https://blog-side-l4or.onrender.com/api", // Backend base URL
>>>>>>> 42f252405ef1ff46e4dc4acd5ae71fb44a555cea
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
