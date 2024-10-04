import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} from "../middleware/isVerify.js";

import {
  newOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getMonthlyIncome,
} from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").post(verifyToken, newOrder);
router.route("/:id").put(verifyTokenAndAdmin, updateOrder);
router.route("/:id").delete(verifyTokenAndAdmin, deleteOrder);
router.route("/find/:userId").get(verifyTokenAndAuth, getOrderById);
router.route("/").get(verifyTokenAndAdmin, getOrders);
router.route("/income").get(verifyTokenAndAdmin, getMonthlyIncome);

export default router;
