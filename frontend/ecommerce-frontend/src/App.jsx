import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../components/Navbar";
function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
