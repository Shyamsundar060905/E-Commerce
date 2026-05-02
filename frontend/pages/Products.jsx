import { getProduct } from "../services/product.js";
import Cards from "../components/Cards";
import Sidebar from "../components/Sidebar";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";

function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  if (isLoading) return <LoadingScreen message="Loading products..." />;
  if (error) return <p>Error</p>;
  return (
    <div className="flex overflow-y-hidden w-full justify-center">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
          {data.data.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
