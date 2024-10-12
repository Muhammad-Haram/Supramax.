import { Product } from "../models/product.model.js";

// Create product
import { Product } from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { title, desc, img, categories, partNumber, type, unit } = req.body;

    // Validate that all required fields are present
    if (
      !title ||
      !desc ||
      !img ||
      !categories ||
      !partNumber ||
      !type ||
      !unit
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields: {
          title: !title ? "Title is required" : null,
          desc: !desc ? "Description is required" : null,
          img: !img ? "Image is required" : null,
          categories: !categories ? "Categories are required" : null,
          partNumber: !partNumber ? "Part Number is required" : null,
          type: !type ? "Type is required" : null,
          unit: !unit ? "Unit is required" : null,
        },
      });
    }

    // Create a new product instance
    const newProduct = new Product(req.body);

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the newly created product
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle errors during product creation
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { title, desc, img, categories, partNumber, type, unit } = req.body;

    // Validate that at least one field is present for the update
    if (
      !title &&
      !desc &&
      !img &&
      !categories &&
      !partNumber &&
      !type &&
      !unit
    ) {
      return res.status(400).json({
        message: "No fields provided for update",
      });
    }

    // Find the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Check if product was found
    if (!updatedProduct) {
      return res.status(404).json("Product not found");
    }

    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Handle errors during product update
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json("Product not found");
    }

    res.status(200).json("Product has been deleted");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve product", error: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};
