/* eslint-disable no-unused-vars */
import Order from "../models/OrderModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Product from "../models/productModel.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const items = req.body.items;
  let orderItems = [];

  for (const item of items) {
    const productId = item.product;
    const quantity = item.quantity;
    const product = await Product.findById(productId);
    if (
      typeof quantity !== "number" ||
      quantity < 1 ||
      Number.isNaN(quantity)
    ) {
      return next(new AppError("Price or Quantity is invalid", 400));
    }
    const price = product.price;
    const newItem = { product: product._id, quantity, price };
    orderItems.push(newItem);
  }

  const order = new Order({
    items: orderItems,
    user: req.user._id,
  });

  await order.save();

  res.status(201).json({
    success: true,
    order,
  });
});

export const getUserOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate({
      path: "items.product",
      select: "name price",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

export const getAllOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "items.product",
      select: "name price",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

export const getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    order,
    success: true,
  });
});
export const updateOrder = catchAsync(async (req, res, next) => {
  const { orderStatus } = req.body;

  const allowedStatus = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatus.includes(orderStatus)) {
    return next(new AppError("Invalid order status", 400));
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});

export const payOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("Order does not exist", 404));
  }
  if (
    req.user._id.toString() !== order.user.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("You are not allowed to access this"));
  }
  if (order.orderStatus === "cancelled") {
    return next(new AppError("Order has been cancelled", 409));
  }
  if (order.isPaid) {
    return next(new AppError("Order has already been paid for"));
  }

  const newOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      isPaid: true,
      paidAt: new Date(),
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: "It was successful",
    newOrder,
  });
});

export const cancelOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("Order does not exist"));
  }
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("You are not allowed to access this"));
  }

  if (req.user.role === "user") {
    if (order.orderStatus === "pending") {
      const newOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          orderStatus: "cancelled",
        },
        {
          new: true,
        }
      );
      res.status(201).json({
        newOrder,
        message: "Success",
      });
    } else {
      res.status(400).json({
        message: "Order has already been shipped. It cannot be cancelled",
      });
    }
  }

  if (req.user.role === "admin") {
    const newOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: "cancelled",
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      newOrder,
      message: "Success",
    });
  }
});
