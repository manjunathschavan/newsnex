const express = require('express');
const User = require('../models/User');
const protect = require('../middleware/auth');
const router = express.Router();

// Get all bookmarks
router.get('/', protect, async (req, res) => {
  res.json({ success: true, bookmarks: req.user.bookmarks });
});

// Add bookmark
router.post('/', protect, async (req, res) => {
  const { title, description, url, urlToImage, publishedAt, author, source } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const already = user.bookmarks.find(b => b.url === url);
    if (already) return res.status(400).json({ success: false, message: 'Already bookmarked' });
    user.bookmarks.unshift({ title, description, url, urlToImage, publishedAt, author, source });
    await user.save();
    res.status(201).json({ success: true, bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Remove bookmark
router.delete('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.bookmarks = user.bookmarks.filter(b => b._id.toString() !== req.params.id);
    await user.save();
    res.json({ success: true, bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
