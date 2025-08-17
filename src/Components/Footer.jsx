import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png"

const Footer = () => {
  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Donations", path: "/all-donations" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://www.facebook.com" },
    { icon: <FaTwitter />, url: "https://www.twitter.com" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com" },
  ];

  return (
    <footer className="text-accent py-16 border-t border-primary/30">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">

        {/* Logo Section */}
        <div className="flex items-center gap-2 md:items-start">
          <h2 className="text-3xl font-bold tracking-tight">OneMoreServe</h2>
          <img className="w-8" src={logo} alt="logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-12 md:flex-nowrap md:gap-24">
          {["Quick Links", "Resources"].map((section, i) => (
            <nav key={i}>
              <h4 className="font-semibold mb-3">{section}</h4>
              <ul className="space-y-2">
                {navLinks.slice(i * 2, i * 2 + 2).map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-accent/80 transition-colors duration-200 font-medium text-lg block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 items-center md:flex-col md:items-start">
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent/80 hover:-translate-y-1 transition-all duration-300 text-2xl"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary/20 pt-8 mt-12 text-center">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="font-semibold">OneMoreServe</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
