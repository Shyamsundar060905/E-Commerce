import React from "react";

function SavedItems() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
        Wishlist
      </p>
      <h2 className="mt-2 text-3xl font-bold">Saved Items</h2>

      <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-10 text-center">
        <h3 className="text-xl font-semibold">No saved items yet</h3>
        <p className="mt-2 text-gray-500">
          Products you save for later will appear here once wishlist support is
          connected.
        </p>
      </div>
    </div>
  );
}

export default SavedItems;
