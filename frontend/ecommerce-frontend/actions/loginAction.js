import { redirect } from "react-router-dom";
import { queryClient } from "../src/main.jsx";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const mode = formData.get("mode"); // "login" | "signup"
  
  console.log(mode);
  let data;
  if (mode === "login") {
    data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
  } else {
    data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
  }

  const endpoint =
    mode === "signup"
      ? "http://localhost:3000/users/signup"
      : "http://localhost:3000/users/login";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { error: err.message || "Authentication failed" };
  }

  await queryClient.invalidateQueries({ queryKey: ["me"] });

  return redirect("/product");
}
