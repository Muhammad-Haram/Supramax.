import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} from "../middleware/isVerify.js";
import {
  deleteUser,
  getUser,
  getUserById,
  getUserStats,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/:id").put(verifyTokenAndAuth, updateUser);
router.route("/:id").delete(verifyTokenAndAuth, deleteUser);
router.route("/find/:id").get(verifyTokenAndAdmin, getUserById);
router.route("/").get(verifyTokenAndAdmin, getUser);
router.route("/stats").get(verifyTokenAndAdmin, getUserStats);

export default router;
