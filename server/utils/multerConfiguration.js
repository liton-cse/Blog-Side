import multer from "multer";
import path from "path";

// Configure Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/"); // Save images in the "uploads" folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File Type Validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

// Multer Upload Configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: fileFilter,
});
export const uploadImages = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);
