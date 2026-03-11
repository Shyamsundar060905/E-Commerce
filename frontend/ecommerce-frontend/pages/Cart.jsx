import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TAX_RATE } from "../helper";
import { FREE_SHIPPING_THRESHOLD } from "../helper";
import CartBox from "../components/CartBox";
function Cart() {
  const {
    data: cart,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/cart", {
        credentials: "include",
      });

      if (res.status === 404) {
        return { items: [] };
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch cart");
      }

      return res.json();
    },
    retry: false,
  });

  if (isLoading) {
    return <div> Loading </div>;
  }
  const subtotal = cart.data.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 2000 ? 0 : 1000;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const TAX = Math.round(subtotal * TAX_RATE);

  const total = subtotal + shipping + TAX;

  return (
    <div className="h-screen flex ">
      <div className="w-[60%]">
        <div className="h-screen overflow-scroll">
          <div className="overflow-hidden bg-gray-200 w-[70%] ml-[10%] mt-[3%] h-12 flex items-center">
            <div className="whitespace-nowrap animate-marquee text-orange-400 font-bold text-xl">
              GET FREE SHIPPING WITH ORDERS ABOVE Rs. 2000 • GET FREE SHIPPING
              WITH ORDERS ABOVE Rs. 2000 • GET FREE SHIPPING WITH ORDERS ABOVE
              Rs. 2000 • GET FREE SHIPPING WITH ORDERS ABOVE Rs. 2000 • GET FREE
              SHIPPING WITH ORDERS ABOVE Rs. 2000 • GET FREE SHIPPING WITH
              ORDERS ABOVE Rs. 2000 • GET FREE SHIPPING WITH ORDERS ABOVE Rs.
              2000 • GET FREE SHIPPING WITH ORDERS ABOVE Rs. 2000 • GET FREE
              SHIPPING WITH ORDERS ABOVE Rs. 2000 •
            </div>
          </div>
          <div>
            <div className="w-[70%] bg-gray-200 ml-[10%] mt-[3%] h-20 text-black font-bold text-3xl flex items-center justify-center">
              Your Cart
            </div>
            <div className="w-[70%] ml-[10%] mt-[3%] h-[50%] mb-15">
              {cart.data.items.map((item, index) => (
                <CartBox item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-screen w-[30%] mr-20 text-white">
        <div className="font-bold uppercase mt-5 ml-5 text-white flex items-center justify-center">
          <p>Summary</p>
        </div>
        <hr className="border-t border-dotted border-gray-300 mt-5" />
        <div className="font-bold uppercase mt-5 ml-5 flex justify-between mr-20 text-white ">
          <div> Subtotal </div>
          <div> {subtotal} ₹ </div>
        </div>
        <hr className="border-t border-dotted border-gray-300 mt-5" />
        <div>
          <div className="font-bold uppercase mt-5 ml-5 flex justify-between mr-20 text-white">
            <div> Shipping</div>
            <div>
              {shipping === 0
                ? "FREE SHIPPING"
                : `Shipping will be free if you add ₹${remaining}`}
            </div>
          </div>

          <hr className="border-t border-dotted border-gray-300 mt-5" />

          <div className="font-extralight uppercase mt-5 ml-5 flex justify-between mr-20 text-gray-200">
            <div> Tax </div>
            <div> {TAX}₹ </div>
          </div>
        </div>
        <hr className="border-t border-dotted border-gray-300 mt-5" />

        <div className="font-bold uppercase mt-5 ml-5 flex justify-between mr-20 text-white">
          <div> Total </div>
          <div> {total}₹ </div>
        </div>

        <div className="font-bold flex justify-start items-center h-40 flex-col gap-5 mt-10 ml-10">
          <div className="h-10 w-[50%]">
            <button className="bg-orange-500 w-[80%] h-10 uppercase rounded-lg">
              checkout
            </button>
          </div>

          <div className="mr-5"> OR </div>
          <div className="h-10 w-[50%]">
            <button>Check out with PAYPAL</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
