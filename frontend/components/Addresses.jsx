import React from "react";

function Addresses({ user }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
        Delivery
      </p>
      <h2 className="mt-2 text-3xl font-bold">Your Addresses</h2>

      <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-10 text-center">
        <h3 className="text-xl font-semibold">No saved addresses</h3>
        <p className="mt-2 text-gray-500">
          {user.name}, you can add address management here once the backend has
          an address endpoint.
        </p>
      </div>
    </div>
  );
}

export default Addresses;
