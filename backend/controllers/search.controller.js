import { Product } from "../models/product.model.js";

export const search = async (req, res) => {
  const query = req.query.q;

  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { partNumber: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
