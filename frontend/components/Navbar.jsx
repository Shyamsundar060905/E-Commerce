import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { SiNike } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import URL from "../helper";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
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

  function handleProfile() {
    if (!me) {
      navigate("/login");
    }

    navigate("/profile");
  }

  return (
    <div className="flex justify-center">
      <div
        className={`
        rounded-full
        w-full h-14 flex justify-between
        bg-white/5 backdrop-blur-md
        border-b border-white/20
        shadow-sm
       ${pathname === "/" ? "absolute" : ""} z-50
      `}
      >
        <div
          className="flex items-center justify-center w-35 mt-1 cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate("/")}
        >
          <SiNike size={70} />
        </div>

        <div className="w-2/6 flex justify-between mt-2">
          {["NEW RELEASES", "MEN", "WOMEN", "KIDS"].map((item) => (
            <button
              key={item}
              className="
              font-semibold tracking-tighter font-league
              text-black
              hover:opacity-70
              transition
              "
            >
              {item}
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className="flex gap-10 mr-5 mt-2">
          <CgProfile
            size={25}
            className="hover:opacity-70 transition"
            onClick={handleProfile}
          />
          <MdOutlineShoppingBag
            size={25}
            className="hover:opacity-70 transition"
            onClick={() => navigate("/cart")}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
