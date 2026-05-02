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
import Addresses from "../components/Addresses";
import SavedItems from "../components/SavedItems";
import LoadingScreen from "../components/LoadingScreen";
import URL from "../helper";

const profileTabs = [
  { name: "Orders", label: "My Orders", icon: FaTruck },
  { name: "Addresses", label: "Your Addresses", icon: IoLocation },
  { name: "Security", label: "Login & Security", icon: FaLock },
  { name: "Saved", label: "Saved Items", icon: FaHeart },
];

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
        return <Security user={me.user} />;
      case "Addresses":
        return <Addresses user={me.user} />;
      case "Saved":
        return <SavedItems />;
      default:
        return <Orders />;
    }
  }

  async function logout() {
    const res = await fetch(`${URL}/users/logout`, {
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
      const res = await fetch(`${URL}/users/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    },
    retry: false,
  });

  if (isLoading) {
    return <LoadingScreen message="Loading your account..." />;
  }

  if (isError) {
    navigate("/login");
    return null;
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50 px-8 py-8">
      <div className="mx-auto flex max-w-6xl gap-8">
        <div className="w-[32%] min-w-72">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Your Account
            </p>
            <h1 className="mt-2 text-4xl font-bold">{me.user.name}</h1>
            <p className="mt-2 break-all text-gray-600">{me.user.email}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm">
            {profileTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedButton === tab.name;

              return (
                <button
                  key={tab.name}
                  onClick={() => handleClick(tab.name)}
                  className={`flex h-14 items-center gap-4 rounded-2xl px-4 text-left transition ${
                    isSelected
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}

            <hr className="my-2 border-gray-200" />

            <button
              onClick={logout}
              className="flex h-14 items-center gap-4 rounded-2xl px-4 text-left text-red-600 transition hover:bg-red-50"
            >
              <IoLogOut size={20} />
              <span className="font-medium">Log out</span>
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-1 rounded-3xl bg-white p-8 shadow-sm">
          {getComponent(selectedButton)}
        </div>
      </div>
    </div>
  );
}

export default Profile;
