import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  return (
    <div>
     <header
  className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${
    scrolled 
      ? "backdrop-blur-md bg-black/30" 
      : location.pathname === "/" 
        ? "bg-transparent" 
        : "bg-primary"
  }`}
>
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
