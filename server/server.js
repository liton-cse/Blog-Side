import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://blog-side-1.onrender.com",
  })
);

// Database connection
connectDB();

app.use("/static", express.static("static"));
// Routes
app.use("/api", blogRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
