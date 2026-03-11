import React from "react";
import { CgArrowRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex flex-col justify-around items-center w-full h-[60%] gap-10">
        <div>
          <p className="font-lato text-8xl mt-30 tracking-tighter"> NIKE </p>
          <p className="text-gray-500">Iconic Footwear. Modern Performance.</p>
        </div>

        <div className="w-60">
          <button
            onClick={() => navigate("/product")}
            className="
    group
    flex flex-col items-center justify-center
    gap-2
    min-w-50    px-6 py-3
    bg-black text-white
    rounded-lg
    font-medium tracking-wide
    transition-all duration-300
    text-xl
    hover:bg-neutral-900
    hover:shadow-lg
    active:scale-95
  "
          >
            Learn more
            <CgArrowRight
              size={35}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
      <div className="bg-white w-2/5 h-full flex-col items-center justify-center overflow-visible">
        <div className="relative lg:w-116 lg:h-116 2xl:w-160 2xl:h-160">
          <img
            src="shoe_new_1.png"
            className="absolute xl:-top-28 2xl:-top-40 right-34 -top-55 z-30"
          />

          <img
            src="shoe_new_2.png"
            className="absolute lg:top-[70%] lg:right-[45%] z-20"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
