const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  link: { type: String, required: true },        // kept as "link" to match your existing data shape
  name: { type: String, required: true },
  price: { type: String, required: true },        // kept as string e.g. "₹299" to match existing
  fake_price: { type: String, required: true },   // kept as string e.g. "₹599"
  category: {
    type: String,
    enum: ["men", "women", "kids", "wedding"],
    required: true
  },
  subcategory: {
    type: String,
    enum: ["little-gabru", "little-mutiyar", "groom", "bride", null],
    default: null
  },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
