import { Routes, Route, useLocation } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import Home from "../pages/Home";
import Header from "../components/Header";

function BlogRouter() {
  const location = useLocation();
  const { blogId } = location.state || {};
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add-form"
            element={
              blogId ? <BlogForm isEditMode={true} id={blogId} /> : <BlogForm />
            }
          />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}
export default BlogRouter;
