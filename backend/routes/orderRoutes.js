import express from "express";

import { protect, restrictTo } from "../controller/authController.js";
import {
  cancelOrder,
  createOrder,
  getAllOrder,
  getOrder,
  getUserOrder,
  payOrder,
  updateOrder,
} from "../controller/orderController.js";

const router = express();

router.post("/", protect, restrictTo("user", "admin"), createOrder);
router.get("/my-order", protect, restrictTo("user"), getUserOrder);
router.get("/allOrders", protect, restrictTo("admin"), getAllOrder);
router.get("/:id", protect, restrictTo("admin", "user"), getOrder);
router.patch("/:id/status", protect, restrictTo("admin"), updateOrder);
router.patch("/:id/pay", protect, restrictTo("admin", "user"), payOrder);
router.patch("/:id/cancel", protect, restrictTo("admin", "user"), cancelOrder);
export default router;
