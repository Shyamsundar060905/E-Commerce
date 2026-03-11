import express from "express";
import { getUser, getAllUser } from "../controller/userController.js";
import {
  login,
  signup,
  restrictTo,
  protect,
} from "../controller/authController.js";

const router = express.Router();

/* =====================
   PUBLIC AUTH ROUTES
===================== */
router.post("/signup", signup);
router.post("/login", login);

/* =====================
   PROTECTED USER ROUTES
===================== */
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ status: "success" });
});

/* =====================
   ADMIN-ONLY ROUTES
===================== */
router.get("/", protect, restrictTo("admin"), getAllUser);
router.get("/:id", protect, restrictTo("admin"), getUser);

export default router;
