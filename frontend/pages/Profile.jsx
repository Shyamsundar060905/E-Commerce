import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaTruck, FaLock } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Orders from "../components/Orders";
import Security from "../components/Security";

function Profile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedButton, setSelectedButton] = useState("Orders");

  function handleClick(names) {
    setSelectedButton(names);
  }

  function getComponent(component) {
    switch (component) {
      case "Orders":
        return <Orders />;
      case "Security":
        return <Security />;
    }
  }
  async function logout() {
    const res = await fetch("http://localhost:3000/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Logout failed");

    queryClient.removeQueries({ queryKey: ["me"] }); // 🔥 clear user cache
    navigate("/login"); // 🔁 redirect
  }

  const {
    data: me,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/users/me", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    },
    retry: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return navigate("/login");

  return (
    <div className="w-full flex h-full justify-start">
      <div className="flex flex-col gap-10 w-[30%]">
        <div className="flex items-center flex-col">
          <h1 className="text-4xl font-bold">Your Account</h1>
          <div className="flex gap-1">
            <p className="text-gray-600">Name: {me.user.name}</p>
            <p>,</p>
            <p className="text-gray-600">Email: {me.user.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center w-[90%]">
          <div className="border-2 w-[70%] h-12 flex items-center justify-start gap-5 px-4">
            <FaTruck size={20} />
            <button onClick={() => handleClick("Orders")}> My Orders </button>
          </div>
          <div className="border-2 w-[70%] h-12 flex items-center justify-start gap-5 px-4">
            <IoLocation size={20} />
            <button> Your Addresses </button>
          </div>

          <div className="border-2 w-[70%] h-12 flex items-center justify-start gap-5 px-4">
            <FaLock size={20} />
            <button onClick={() => handleClick("Security")}>
              {" "}
              Login & Security{" "}
            </button>
          </div>
          <div className="border-2 w-[70%] h-12 flex items-center justify-start gap-5 px-4">
            <FaHeart size={20} />
            <button onClick={() => handleClick("Saved")}> Saved Items </button>
          </div>
          <hr className="w-3/5" />

          <div
            onClick={logout}
            className="border-2 w-[70%] h-12 flex items-center justify-start gap-5 px-4 cursor-pointer hover:bg-gray-100"
          >
            <IoLogOut size={20} />
            <button onClick={() => handleClick("Logout")}>Log out</button>
          </div>
        </div>
      </div>

      <div>{getComponent(selectedButton)}</div>
    </div>
  );
}

export default Profile;
