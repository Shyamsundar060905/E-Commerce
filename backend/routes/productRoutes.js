// routes/productRoutes.js
import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controller/productController.js";
import { protect, restrictTo } from "../controller/authController.js";

const router = express.Router();

router.get("/", getAllProducts); // public
router.get("/:id", getOneProduct); // public
router.post("/", protect, restrictTo("admin"), createProduct);
router.patch("/:id", protect, restrictTo("admin"), updateProduct);
router.delete("/:id", protect, restrictTo("admin"), deleteProduct);

export default router;
