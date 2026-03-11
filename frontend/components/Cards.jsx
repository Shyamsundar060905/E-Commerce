import React from "react";
import { useNavigate } from "react-router-dom";
function Cards({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="lg:h-80 lg:w-60 h-48 w-48 mb-5"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      <div className="h-60 w-[95%] items-center justify-center flex">
        <img src={item.images[0]} className="h-full w-[95%]" />
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="font-serif font-semibold uppercase"> {item.name} </p>
        <p> ₹{item.price} </p>
      </div>
    </div>
  );
}

export default Cards;
