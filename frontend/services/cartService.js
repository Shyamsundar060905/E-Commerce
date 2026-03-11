import URL from "../helper.js";
export async function addCart({ productId, quantity, size }) {
  const res = await fetch(`${URL}/cart/${productId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, size, quantity }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to add to cart");
  }

  return res.json();
}

export async function removeFromCart({ productId, size }) {
  const res = await fetch(`${URL}/cart/${productId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, size }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to add to cart");
  }

  return res.json();
}
