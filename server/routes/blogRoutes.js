import express from "express";
import multer from "multer";
import {
  createBlog,
  updateBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  searchBlogs,
} from "../controllers/blogController.js";
import { uploadImages } from "../utils/multerConfiguration.js";
const router = express.Router();

// Multer file...

// Define routes
router.post("/blog", uploadImages, createBlog);
router.put("/blog/:id", uploadImages, updateBlog);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.delete("/blog/:id", deleteBlog);
router.get("/search", searchBlogs);

export default router;
