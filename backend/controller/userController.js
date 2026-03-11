/* eslint-disable no-unused-vars */
// controllers/userController.js
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

// Get one user
export const getUser = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.params.id);

  if (!doc) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: doc,
  });
});

// Get all users
export const getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});
