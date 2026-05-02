import React from "react";

function Security({ user }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
        Account Access
      </p>
      <h2 className="mt-2 text-3xl font-bold">Login & Security</h2>

      <div className="mt-8 flex flex-col gap-4">
        <div className="rounded-3xl border p-5">
          <p className="text-sm font-semibold uppercase text-gray-400">Name</p>
          <p className="mt-2 text-lg font-medium">{user.name}</p>
        </div>

        <div className="rounded-3xl border p-5">
          <p className="text-sm font-semibold uppercase text-gray-400">Email</p>
          <p className="mt-2 break-all text-lg font-medium">{user.email}</p>
        </div>

        <div className="rounded-3xl border p-5">
          <p className="text-sm font-semibold uppercase text-gray-400">
            Account Type
          </p>
          <p className="mt-2 text-lg font-medium capitalize">{user.role}</p>
        </div>

        <div className="rounded-3xl bg-gray-50 p-5">
          <p className="font-semibold">Password changes are not available yet</p>
          <p className="mt-2 text-sm text-gray-500">
            The backend currently exposes your account details but does not have
            a working profile update route connected to the frontend.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Security;
