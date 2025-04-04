import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  blogTitle: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: [
        "technology",
        "travel",
        "food",
        "lifestyle",
        "business",
        "health",
      ],
      message: "{VALUE} is not a valid category",
    },
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
    trim: true,
  },
  mainContent: {
    type: String,
    required: [true, "Main content is required"],
    trim: true,
  },
  profileImage: {
    type: String,
    required: true,
  },

  images: [
    {
      type: String, // Storing image paths or URLs
      required: [true, "Image is required"],
    },
  ],

  publicationDate: {
    type: Date,
    default: Date.now,
  },
  subCategory: {
    type: String,
    enum: {
      values: ["adventure", "culture", "food", "budget", "luxury", "family"],
      message: "{VALUE} is not a valid sub-category",
    },
  },

  travelTags: {
    type: String,
    enum: {
      values: [
        "europe",
        "asia",
        "africa",
        "north-america",
        "south-america",
        "australia",
      ],
      message: "{VALUE} is not a valid travel tag",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
