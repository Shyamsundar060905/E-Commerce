import React from "react";
import { SiNike } from "react-icons/si";

function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center bg-gray-50 px-6">
      <div className="flex flex-col items-center rounded-3xl bg-white px-10 py-8 shadow-sm">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-black" />
          <SiNike size={38} className="relative z-10" />
        </div>

        <p className="mt-6 text-lg font-semibold text-black">{message}</p>
        <p className="mt-2 text-sm text-gray-500">
          Getting everything ready for you.
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
