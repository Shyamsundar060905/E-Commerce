import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React from "react";

function ProductLayout() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default ProductLayout;
