import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../controller/cartController.js";

const router = express.Router();

router.use(protect);
router.use(restrictTo("user"));
router.get("/", getCart);
router.post("/:productId", addToCart);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);

export default router;
