import React, { useState } from "react";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";

function Login() {
  const [login, setLogin] = useState(true);

  return (
    <div className="flex w-screen h-[95%]">
      <div className="w-[60%]">
        <img
          src="https://res.cloudinary.com/dl6od3rl2/image/upload/v1773573837/login_nike_krf56o.jpg"
          className="h-screen"
        />
      </div>

      <div className="w-[40%] flex flex-col justify-around items-center">
        <div className="flex gap-2 flex-col">
          <h1 className="font-bold capitalize text-4xl">Welcome back!</h1>
          <p className="text-xs text-gray-400">
            Log in now to explore all the features and benefits of your platform
            and see what's new.
          </p>
        </div>

        {login ? <LoginPage /> : <SignupPage />}

        <button
          onClick={() => setLogin((prev) => !prev)}
          className="mt-4 text-blue-500"
        >
          {login
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

export default Login;
