import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          price: { type: Number, min: 1 },
          quantity: { type: Number, min: 0 },
        },
      ],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Order must have atleast one time",
      },
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: { type: Number },
    isPaid: { type: Boolean },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

OrderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  next();
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
