import catchAsync from "../utils/catchAsync.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";

export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

export const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, data: products });
});

export const getOneProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, data: product });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with this ID"));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("Product ID not found"));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});
