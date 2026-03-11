import { Form } from "react-router-dom";
import React from "react";

function LoginPage() {
  const mode = "login";

  return (
    <div className="w-full flex flex-col">
      <Form method="post">
        <div className="flex flex-col gap-3 bg-gray-200 p-3 w-[70%] ml-[12%] rounded-2xl">
          <label htmlFor="email" className="ml-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            className="rounded-lg px-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 bg-gray-200 p-3 w-[70%] ml-[12%] rounded-2xl mt-[4%]">
          <label htmlFor="password" className="ml-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className="rounded-lg px-3 py-2 outline-none"
          />
        </div>
        <input type="hidden" name="mode" value={mode} />

        <div className="flex items-center justify-center w-full h-[45%]">
          <input
            type="submit"
            value="Login"
            className="bg-blue-400 p-5 w-[30%] rounded-2xl"
          />
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
