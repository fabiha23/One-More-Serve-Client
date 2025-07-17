import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <Navbar />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-primary">
        <footer className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <Footer></Footer>
        </footer>
      </footer>
    </div>
  );
};

export default MainLayout;
