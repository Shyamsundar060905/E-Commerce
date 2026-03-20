/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!name || !email || !password) {
    return res.status(404).json({ data: "Information incomplete" });
  }
  const newUser = await User.create({ name, email, password });
  const token = signToken(newUser._id);
  res.status(200).json({
    token,
    success: true,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const checkPassword = req.body.checkPassword;

  const findUser = await User.findById(req.user.id).select("+password");

  if (!findUser || !(await findUser.matchPassword(currentPassword))) {
    return next(new AppError("Current password is incorrect"));
  }

  if (newPassword != checkPassword) {
    res.status(404).json({
      message: "Password do not match",
    });
  }

  findUser.password = await bcrypt.hash(password, 12);
  findUser.passwordChangedAt = Date.now();
  await findUser.save();

  const token = signToken(findUser._id);
  res.status(200).json({ status: "success", token, data: { user: findUser } });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // ✅ REQUIRED in production
    sameSite: "none", // ✅ REQUIRED for cross-site
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does not exist", 401),
    );
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("No user found. Are you logged in?", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not allowed to access this.", 403));
    }

    next();
  };
};
