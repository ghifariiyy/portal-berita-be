const multer = require("multer");
const path = require("path");
const fs = require("fs");

// pastikan folder uploads ada
const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // contoh: 17237812891.jpg
  }
});

const upload = multer({ storage });

module.exports = upload;
