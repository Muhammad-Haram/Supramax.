import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array, required: true },
    partNumber: { type: String, required: true },
    type: { type: String, required: true },
    unit: { type: String, required: true },
    productDescImg: { type: Array },
    table: { type: String },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
