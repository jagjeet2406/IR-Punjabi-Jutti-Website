const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/Product");

// Fields an admin is allowed to set. Anything else in the request body is ignored.
const WRITABLE = [
  "link", "name", "price", "fake_price", "category", "subcategory",
  "description", "images", "sizes", "material", "inStock",
];
const pick = (body) => {
  const out = {};
  WRITABLE.forEach((k) => { if (body[k] !== undefined) out[k] = body[k]; });
  if (out.subcategory === "") out.subcategory = null;
  return out;
};

// Admin key check. If ADMIN_SECRET isn't configured the routes stay locked,
// instead of letting requests with no header through.
const adminAuth = (req, res, next) => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || req.headers["x-admin-key"] !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// GET all — supports ?category=women  &subcategory=little-gabru  &search=pearl
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.subcategory) filter.subcategory = req.query.subcategory;
    if (req.query.search) {
      const safe = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: safe, $options: "i" };
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Legacy: find by name (old /women/:name links)
router.get("/by-name/:name", async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one product by id — powers the common detail page (/product/:id)
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: "Not found" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET related products (same category, excluding the product itself)
router.get("/:id/related", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.json([]);
    const product = await Product.findById(req.params.id);
    if (!product) return res.json([]);
    const related = await Product.aggregate([
      { $match: { category: product.category, _id: { $ne: product._id } } },
      { $sample: { size: 4 } },
    ]);
    res.json(related);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — add product (admin only). A detail page exists for it immediately.
router.post("/", adminAuth, async (req, res) => {
  try {
    const product = new Product(pick(req.body));
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT — edit product (admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, pick(req.body), {
      new: true, runValidators: true,
    });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE — remove product (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
