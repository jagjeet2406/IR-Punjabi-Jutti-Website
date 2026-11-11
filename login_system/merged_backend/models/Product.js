const mongoose = require("mongoose");

// Every category the shop sells. To add a brand-new category later, add it here,
// to the admin portal dropdown, and to CATEGORY_CONFIG in src/productConfig.js.
const CATEGORIES = ["men", "women", "kids", "wedding", "purse"];

const productSchema = new mongoose.Schema({
  link: { type: String, required: true },         // main image (kept as "link" to match existing data)
  name: { type: String, required: true, trim: true },
  price: { type: String, required: true },         // e.g. "₹299"
  fake_price: { type: String, required: true },    // e.g. "₹599"
  category: { type: String, enum: CATEGORIES, required: true },
  subcategory: { type: String, default: null },    // little-gabru, little-mutiyar, groom, bride, ...

  description: { type: String, default: "" },
  images: { type: [String], default: [] },         // extra gallery images
  sizes: { type: [String], default: [] },          // e.g. ["6","7","8"]; empty = category default
  material: { type: String, default: "" },

  inStock: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ category: 1, subcategory: 1 });

module.exports = mongoose.model("Product", productSchema);
module.exports.CATEGORIES = CATEGORIES;
