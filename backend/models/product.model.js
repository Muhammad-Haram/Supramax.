import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    points: { type: Array },
    img: { type: String, required: true },
    categories: { type: Array },
    inStock: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
