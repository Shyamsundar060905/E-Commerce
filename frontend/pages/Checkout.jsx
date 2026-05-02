import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL, { FREE_SHIPPING_THRESHOLD, TAX_RATE } from "../helper";
import LoadingScreen from "../components/LoadingScreen";

function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cash",
  });

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(`${URL}/cart`, {
        credentials: "include",
      });

      if (res.status === 404) {
        return { data: { items: [] } };
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to fetch cart");
      }

      return res.json();
    },
    retry: false,
  });

  const items = cart?.data?.items || [];
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 1000;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  const placeOrder = useMutation({
    mutationFn: async () => {
      const orderItems = items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const orderRes = await fetch(`${URL}/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: orderItems }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to place order");
      }

      const order = await orderRes.json();

      const clearCartRes = await fetch(`${URL}/cart`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!clearCartRes.ok) {
        const err = await clearCartRes.json().catch(() => ({}));
        throw new Error(err.message || "Order placed, but cart was not cleared");
      }

      return order;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      await queryClient.invalidateQueries({ queryKey: ["profile-orders"] });
      navigate("/profile");
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    placeOrder.mutate();
  }

  if (isLoading) {
    return <LoadingScreen message="Preparing checkout..." />;
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold">Please log in before checkout.</p>
        <button
          onClick={() => navigate("/login")}
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-8 py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_380px] gap-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Checkout
          </p>
          <h1 className="mt-2 text-4xl font-bold">Delivery Details</h1>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Full name"
              className="rounded-2xl border px-4 py-3 outline-none focus:border-black"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Phone number"
              className="rounded-2xl border px-4 py-3 outline-none focus:border-black"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Address"
              className="col-span-2 rounded-2xl border px-4 py-3 outline-none focus:border-black"
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              placeholder="City"
              className="rounded-2xl border px-4 py-3 outline-none focus:border-black"
            />
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              placeholder="Pincode"
              className="rounded-2xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">Payment Method</h2>
            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border p-4">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={form.paymentMethod === "cash"}
                onChange={handleChange}
              />
              <span>Cash on delivery</span>
            </label>
            <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-gray-400">
              <input type="radio" disabled />
              <span>Online payment coming soon</span>
            </label>
          </div>

          {placeOrder.isError && (
            <p className="mt-6 rounded-2xl bg-red-50 p-4 text-red-600">
              {placeOrder.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={items.length === 0 || placeOrder.isPending}
            className="mt-8 h-12 w-full rounded-full bg-black font-semibold uppercase text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {placeOrder.isPending ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="rounded-3xl bg-black p-8 text-white shadow-sm">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          {items.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-white/20 p-6 text-center">
              <p className="font-semibold">Your cart is empty</p>
              <button
                onClick={() => navigate("/product")}
                className="mt-4 rounded-full bg-white px-5 py-2 text-black"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="mt-8 flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={`${item.product._id}-${item.size}`}
                    className="grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-2xl bg-white/10 p-3"
                  >
                    <div
                      className="flex items-center justify-center overflow-hidden rounded-xl bg-white p-2"
                      style={{
                        width: "64px",
                        height: "64px",
                        maxWidth: "64px",
                        maxHeight: "64px",
                      }}
                    >
                      <img
                        src={item.product.images?.[0] || item.product.images}
                        alt={item.product.name}
                        className="block object-contain"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        Size {item.size} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-white/20 pt-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
