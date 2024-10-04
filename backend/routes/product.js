import express from "express";
import {
  verifyTokenAndAdmin
} from "../middleware/isVerify.js";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").post(verifyTokenAndAdmin, createProduct);
router.route("/:id").put(verifyTokenAndAdmin, updateProduct);
router.route("/:id").delete(verifyTokenAndAdmin, deleteProduct);
router.route("/find/:id").get(getProductById);
router.route("/").get(getProducts);

export default router;
