import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import ProductLayout from "./layouts/ProductLayout";
import React from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { loginAction } from "./actions/loginAction";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <ProductLayout />,
        children: [
          { index: true, element: <Products /> },
          { path: ":id", element: <ProductPage /> },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
