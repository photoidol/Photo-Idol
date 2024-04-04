/* const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    ); // 23/08/2022
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Supported types are jpg, png, and jpeg."),
      false
    );
  }
}

const upload = multer({ storage, fileFilter });

module.exports = { upload };
 */ // imageUploadMiddleware.js

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Supported types are jpg, png, and jpeg."), false);
  }
}

// Multer upload middleware with file size limit and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // Limit file size to 1MB
});

// Middleware function to check image size
const checkImageSize = (req, res, next) => {
  // Check if any files were uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // Check file size
  if (req.file.size > 1 * 1024 * 1024) {
    // Check if file size exceeds 1MB (1 * 1024 * 1024 bytes)
    return res.status(400).json({ message: "Image size must be less than 1MB." });
  }

  // If all checks pass, proceed to the next middleware/route handler
  next();
};

module.exports = { upload, checkImageSize };
