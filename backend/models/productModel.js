// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"] },
    price: { type: Number, required: [true, "Product price is required"] },
    description: { type: String },
    category: { type: String },
    images: [String],
    audience: { type: String, enum: ["Men", "Women", "Kids"] },
    size: {
      type: [Number],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
