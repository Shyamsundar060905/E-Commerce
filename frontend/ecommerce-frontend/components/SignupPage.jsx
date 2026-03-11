import React from "react";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
function SignupPage() {
  const mode = "signup";
  return (
    <div className="max-h-max flex items-center justify-center w-full overflow-scroll overflow-x-hidden">
      <Form
        method="post"
        className="w-full h-full rounded-2xl flex flex-col gap-2"
      >
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>

        <div className="flex flex-col gap-1 bg-gray-200 p-5 w-[90%] rounded-2xl">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            className="border rounded-lg w-[90%] px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1 bg-gray-200 p-5 w-[90%] rounded-2xl">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            className="border rounded-lg px-3 py-2  w-[90%] outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1 bg-gray-200 p-5 w-[90%] rounded-2xl">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className="border rounded-lg px-3 py-2  w-[90%] outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1 bg-gray-200 p-5 w-[90%] rounded-2xl">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="border rounded-lg px-3 py-2  w-[90%] outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <input type="hidden" name="mode" value={mode} />
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-xl  w-[90%] hover:bg-blue-600 transition"
        >
          Create Account
        </button>
      </Form>
    </div>
  );
}

export default SignupPage;
