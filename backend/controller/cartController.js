import Cart from "../models/cartModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getCart = catchAsync(async (req, res, next) => {
  const userID = req.user._id;
  const cart = await Cart.findOne({ user: userID }).populate("items.product");

  if (!cart) {
    return next(new AppError("Cart does not exist", 404));
  }

  res.status(200).json({
    success: true,
    data: cart,
    itemsCount: cart.items.length,
  });
});

export const addToCart = catchAsync(async (req, res, next) => {
  let { productId, size, quantity } = req.body;
  if (!productId || !size || !quantity) {
    return next(new AppError("Missing required fields", 400));
  }
  quantity = Math.max(1, quantity);

  const userID = req.user._id;
  let cart = await Cart.findOne({ user: userID });

  if (!cart) {
    cart = new Cart({
      user: userID,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId && item.size === size,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      size,
      quantity,
    });
  }

  await cart.save();
  res.status(200).json(cart);
});

export const removeFromCart = catchAsync(async (req, res, next) => {
  const { productId, size } = req.body;
  const userID = req.user._id;

  const cart = await Cart.findOne({ user: userID });

  if (!cart) {
    return next(new AppError("Cart does not exist", 404));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId && item.size === size,
  );

  if (itemIndex === -1) {
    return next(new AppError("Item not found in cart", 404));
  }

  if (cart.items[itemIndex].quantity > 1) {
    cart.items[itemIndex].quantity -= 1;
  } else {
    cart.items.splice(itemIndex, 1);
  }

  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
  });
});

export const clearCart = catchAsync(async (req, res, next) => {
  const userID = req.user._id;

  const cart = await Cart.findOne({ user: userID });

  if (!cart) {
    return next(new AppError("Cart does not exist", 404));
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared",
  });
});
