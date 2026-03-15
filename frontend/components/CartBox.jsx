import React from "react";
import { useAddToCart, useRemoveFromCart } from "../hooks/useCart";

function CartBox({ item }) {
  const { mutate: removeMutate, isError: isErrorRemove } = useRemoveFromCart();
  const { mutate: addMutate, isError: isErrorAdd } = useAddToCart();

  function handleRemoveFromCart() {
    if (item.quantity <= 0) return;

    removeMutate({
      productId: item.product._id,
      size: item.size,
    });
  }

  function handleAddToCart() {
    if (item.quantity <= 0) return;

    addMutate({
      productId: item.product._id,
      size: item.size,
      quantity: 1,
    });
  }

  if (isErrorRemove || isErrorAdd) {
    return <div>Error has occurred</div>;
  }

  console.log(item);

  return (
    <div className="flex items-center gap-6 w-full">
      <div className="w-35 h-35 bg-white flex items-center justify-center">
        <img src={item.product.images} />
      </div>

      <div className="grid grid-cols-[1fr_0.5fr_1fr] h-20 items-center w-full gap-4 border-2">
        <div>
          <p className="truncate text-center">{item.product.name}</p>
          <p className="truncate text-center"> Size: {item.size}</p>
        </div>
        <p className="text-right tabular-nums">₹{item.product.price}</p>

        <div className="flex items-center gap-3">
          <button
            className="w-8 h-8 border rounded flex items-center justify-center"
            onClick={handleRemoveFromCart}
          >
            −
          </button>

          <span className="w-6 text-center tabular-nums">{item.quantity}</span>

          <button
            className="w-8 h-8 border rounded flex items-center justify-center"
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartBox;
