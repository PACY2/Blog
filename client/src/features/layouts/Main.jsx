import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";

const Main = () => {
  return (
    <section className="flex items-stretch w-full ">
      <Navbar />
      <section className="flex-1 h-screen">
        <Outlet />
      </section>
    </section>
  );
};

export default Main;
