import {
  createBlog,
  deleteBlogApi,
  editBlog,
  getSingleBlog,
} from "../utility/api.js";
// Creating function that create a blog..
export const createBlogFunction = async (data) => {
  try {
    const response = await createBlog(data);
    const blogData = response.data;
    console.log(blogData);
    return { blogData };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Create Blog",
    };
  }
};

//Updating finction that update the blog..
export const updateBlog = async (formDataToSend, id) => {
  try {
    const response = await editBlog(formDataToSend, id);
    const updateBlog = response.data;
    return { updateBlog };
  } catch (error) {
    return {
      message: error.response?.data?.message || "Update Blog",
    };
  }
};

// Fatching the single data from data base
export const singleBlog = async (id) => {
  try {
    const response = await getSingleBlog(id);
    const BlogData = response.data.data;

    return { BlogData };
  } catch (error) {
    return {
      message: error.response?.data?.message || "Failed to get Single Blog",
    };
  }
};

// deleting the blog from database ...

export const deleteBlog = async (id) => {
  try {
    const response = await deleteBlogApi(id);
    const deleteBlog = response.data;
    return { deleteBlog };
  } catch (error) {
    return {
      message: error.response?.data?.message || "Failde to delete data",
    };
  }
};
