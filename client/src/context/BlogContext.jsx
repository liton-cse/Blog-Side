import { createContext, useContext } from "react";

// Create context to be used throughout the a
export const BlogContext = createContext();
export const useBlog = () => {
  return useContext(BlogContext);
};
