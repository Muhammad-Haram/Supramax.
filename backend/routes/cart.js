import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} from "../middleware/isVerify.js";

import {
  createCart,
  deleteCart,
  getCartById,
  getCarts,
  updateCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.route("/").post(verifyToken, createCart);
router.route("/:id").put(verifyTokenAndAuth, updateCart);
router.route("/:id").delete(verifyTokenAndAuth, deleteCart);
router.route("/find/:userId").get(verifyTokenAndAuth, getCartById);
router.route("/").get(verifyTokenAndAdmin, getCarts);

export default router;
