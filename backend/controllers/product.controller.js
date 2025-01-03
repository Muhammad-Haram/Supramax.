import { Product } from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      desc,
      img,
      categories,
      partNumber,
      type,
      unit,
      productDescImg,
      table,
      dataSheet,
      certificate,
    } = req.body;

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
          img: !img ? "Images are required" : null,
          categories: !categories ? "Categories are required" : null,
          partNumber: !partNumber ? "Part Number is required" : null,
          type: !type ? "Type is required" : null,
          unit: !unit ? "Unit is required" : null,
        },
      });
    }

    const newProduct = new Product({
      title,
      desc,
      img, // Save multiple images
      categories,
      partNumber,
      type,
      unit,
      productDescImg,
      table,
      dataSheet,
      certificate,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error Details:", error);
    if (error.code === 11000 && error.keyPattern?.partNumber) {
      return res.status(400).json({
        message: "Part Number must be unique",
        field: "partNumber",
        error: error.message,
      });
    }
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const {
      title,
      desc,
      img,
      categories,
      partNumber,
      type,
      unit,
      productDescImg,
      dataSheet,
      certificate,
    } = req.body;

    if (
      !title &&
      !desc &&
      !img &&
      !categories &&
      !partNumber &&
      !type &&
      !unit &&
      !productDescImg &&
      !dataSheet &&
      !certificate
    ) {
      return res.status(400).json({
        message: "No fields provided for update",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update array fields
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json("Product not found");
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
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
