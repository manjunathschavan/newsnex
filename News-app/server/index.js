require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const bookmarkRoutes = require("./routes/bookmarks");

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth & Bookmark routes
app.use("/auth", authRoutes);
app.use("/bookmarks", bookmarkRoutes);

// Helper
async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return { status: 200, success: true, message: "Successfully fetched the data", data: response.data };
  } catch (error) {
    return { status: 500, success: false, message: "Failed to fetch data from the API", error: error.response ? error.response.data : error.message };
  }
}

app.get("/all-news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let q = req.query.q || 'world';
  const today = new Date().toISOString();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${thirtyDaysAgo}&to=${today}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/top-headlines", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category || "general";
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/country/:iso", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 6;
  let page = parseInt(req.query.page) || 1;
  const country = req.params.iso;
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const today = new Date().toISOString();
  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(country)}&from=${thirtyDaysAgo}&to=${today}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
