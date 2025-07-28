const News = require("../models/News");

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (err) {
    console.error("GET ALL NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to get news" });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findOne({ where: { id } });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } catch (err) {
    console.error("GET NEWS BY ID ERROR:", err);
    res.status(500).json({ message: "Failed to get news" });
  }
};

exports.postNews = async (req, res) => {
  console.log({
    body: req.body,
    file: req.file,
    user: req.user,
  });

  if (!req.body || !req.body.title || !req.body.category || !req.body.content) {
    return res.status(400).json({ message: "Form-data tidak lengkap" });
  }

  const { title, category, content, quickAccess, trending } = req.body;
  const authorId = req.user.id;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const news = await News.create({
      title,
      category,
      content,
      quickAccess,   // ✅ simpan quickAccess
      trending,      // ✅ simpan trending
      image,
      authorId,
    });
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create news", error: err.message });
  }
};

exports.getMyNews = async (req, res) => {
  try {
    const news = await News.findAll({ where: { authorId: req.user.id } });
    res.json(news);
  } catch (err) {
    console.error("GET MY NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to get my news" });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, image, category, content, quickAccess, trending } = req.body;

    const news = await News.findOne({ where: { id, authorId: req.user.id } });
    if (!news) return res.status(404).json({ message: "News not found or unauthorized" });

    news.title = title || news.title;
    news.image = image || news.image;
    news.category = category || news.category;
    news.content = content || news.content;
    news.quickAccess = quickAccess || news.quickAccess;  // ✅ update quickAccess
    news.trending = trending || news.trending;           // ✅ update trending

    await news.save();
    res.json(news);
  } catch (err) {
    console.error("UPDATE NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to update news" });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const id = req.params.id;

    const news = await News.findOne({ where: { id, authorId: req.user.id } });
    if (!news) return res.status(404).json({ message: "News not found or unauthorized" });

    await news.destroy();
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("DELETE NEWS ERROR:", err);
    res.status(500).json({ message: "Failed to delete news" });
  }
};
