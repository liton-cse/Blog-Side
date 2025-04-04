import { Blog } from "../models/Blog.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    const {
      authorName,
      blogTitle,
      category,
      summary,
      mainContent,
      subCategory,
      travelTags,
      publicationDate,
    } = req.body;

    // Get image path from uploaded file
    // const imagePath = req.file ? req.file.path : null;

    if (!req.files.profileImage || !req.files.images) {
      return res
        .status(400)
        .json({ message: "Profile image and images are required" });
    }

    const profileImage = req.files.profileImage[0].path;
    const images = req.files.images.map((file) => file.path);

    const newBlog = new Blog({
      authorName,
      blogTitle,
      category,
      summary,
      profileImage,
      mainContent,
      images,
      subCategory,
      travelTags,
      publicationDate: publicationDate ? new Date(publicationDate) : Date.now(),
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

// Update a blog post with optional image upload
export const updateBlog = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };

    // If a new image is uploaded, update the blog image
    if (req.files.profileImage) {
      updates.profileImage = req.files.profileImage[0].path;
    }
    if (req.files.images) {
      updates.images = req.files.images.map((file) => file.path);
    }

    // Convert publicationDate to Date object if provided
    if (updates.publicationDate) {
      updates.publicationDate = new Date(updates.publicationDate);
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message,
    });
  }
};

// Get all blogs with filters and pagination
export const getAllBlogs = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      travelTags,
      startDate,
      endDate,
      page = 1,
      limit = 6,
      sortBy = "newest", // Default to newest first
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (travelTags) query.travelTags = travelTags;

    // Date range filter
    if (startDate || endDate) {
      query.publicationDate = {};
      if (startDate) query.publicationDate.$gte = new Date(startDate);
      if (endDate) query.publicationDate.$lte = new Date(endDate);
    }

    // Determine sort order
    let sortOption = { publicationDate: -1 }; // Default: newest first
    if (sortBy === "oldest") {
      sortOption = { publicationDate: 1 };
    }

    const blogs = await Blog.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select("-__v")
      .lean();

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select("-__v");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blog",
      error: error.message,
    });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
};

// Search blogs by title, content, or summary
export const searchBlogs = async (req, res) => {
  try {
    const { q, page = 1, limit = 6 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchQuery = {
      $or: [
        { blogTitle: { $regex: q, $options: "i" } },
        { authorName: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { travelTags: { $regex: q, $options: "i" } },
      ],
    };

    const blogs = await Blog.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select("-__v")
      .lean();

    const total = await Blog.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching blogs",
      error: error.message,
    });
  }
};
