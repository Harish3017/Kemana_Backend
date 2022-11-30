const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true  },
    price: { type: Number, required: true },
    inStock: { type: Number, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);