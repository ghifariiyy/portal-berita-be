const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

const {
  getAllNews,
  getNewsById,
  getMyNews,
  postNews,
  updateNews,
  deleteNews
} = require("../controllers/newsController");

// fetch all news (optional filter di query)
router.get("/", getAllNews);

// berita milik user login
router.get("/my-news", verifyToken, getMyNews);

// detail berita
router.get("/:id", getNewsById);

// tambah berita + upload file
router.post("/", verifyToken, upload.single("image"), postNews);

// edit berita + upload file
router.put("/:id", verifyToken, upload.single("image"), updateNews);

// hapus berita
router.delete("/:id", verifyToken, deleteNews);

module.exports = router;
