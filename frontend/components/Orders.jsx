import { useQuery } from "@tanstack/react-query";
import React from "react";
import URL from "../helper";

function Orders() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile-orders"],
    queryFn: async () => {
      const res = await fetch(`${URL}/orders/my-order`, {
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to load orders");
      }

      return res.json();
    },
    retry: false,
  });

  if (isLoading) {
    return <p className="text-gray-500">Loading your orders...</p>;
  }

  if (isError) {
    return (
      <div>
        <h2 className="text-3xl font-bold">My Orders</h2>
        <p className="mt-4 rounded-2xl bg-red-50 p-4 text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  const orders = data?.orders || [];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Purchases
          </p>
          <h2 className="mt-2 text-3xl font-bold">My Orders</h2>
        </div>
        <p className="text-sm text-gray-500">{orders.length} orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-10 text-center">
          <h3 className="text-xl font-semibold">No orders yet</h3>
          <p className="mt-2 text-gray-500">
            Your completed purchases will show up here after checkout.
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-3xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{order.totalAmount || 0}</p>
                  <p className="mt-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-600">
                    {order.orderStatus}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {order.items.map((item) => (
                  <div
                    key={`${order._id}-${item.product?._id || item.product}`}
                    className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3 text-sm"
                  >
                    <span>{item.product?.name || "Product"}</span>
                    <span className="text-gray-500">
                      {item.quantity} x ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
