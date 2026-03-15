import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getIndividualProduct } from "../services/product";
import React, { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { useAddToCart } from "../hooks/useCart";
import URL from "../helper";

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getIndividualProduct(id),
    enabled: !!id,
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch(`${URL}/users/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    },
    retry: false,
  });

  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");

  const { mutate, isPending } = useAddToCart();

  const handleAddtoCart = () => {
    if (selectedSize == null) {
      setSizeError("Please select a size");
      return;
    }

    if (!me) {
      navigate("/users/login");
      return;
    }

    mutate({
      productId: id,
      quantity: 1,
      size: selectedSize,
    });
  };

  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Error loading product</p>;

  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-between">
        <div className="flex flex-col w-2/6 items-center justify-between gap-20 h-full mt-20 mr-5">
          <div className="flex-col items-center justify-center w-full flex gap-4 h-full">
            <p className="uppercase font-semibold text-xs">
              {data.data.audience}'s Shoe
            </p>
            <p className="text-5xl font-lato font-semibold tracking-tighter uppercase">
              {data.data.name}
            </p>
            <p className="text-sm text-gray-500">{data.data.description}</p>
          </div>

          <div className="rounded-full bg-blue-500 w-43 h-14 flex items-center justify-around px-4 gap-2">
            <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
              <CgShoppingCart size={25} />
            </div>
            <button
              className="hover:opacity-60"
              onClick={handleAddtoCart}
              disabled={isPending}
            >
              Add to Cart
            </button>
          </div>

          {sizeError && <p className="text-red-500">{sizeError}</p>}
        </div>

        <div className="w-2/6 absolute left-[30%] bottom-[5%]">
          <img
            src={data.data.images[0]}
            className="w-full object-contain"
            alt=""
          />
        </div>

        <div className="w-1/5 flex-col flex gap-10 mt-50 mr-20">
          <p className="font-semibold text-sm">SELECT SIZE (US)</p>
          <div className="grid grid-cols-5 gap-5">
            {data.data.sizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError("");
                }}
                className={`border flex w-10 items-center justify-center cursor-pointer ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-200"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
