require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// buat folder uploads bisa diakses publik
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", authRoutes);
app.use("/api/news", newsRoutes);

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
