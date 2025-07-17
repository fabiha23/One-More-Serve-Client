import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-secondary p-10 rounded">
      <h2 className='text-xl font-semibold'>OneMoreServe</h2>

      <nav className="grid grid-flow-col gap-4">
        <Link to="/about-us" className="hover:underline cursor-pointer">About Us</Link>
        <Link to="/contact" className="hover:underline cursor-pointer">Contact Us</Link>
        <Link to="/terms" className="hover:underline cursor-pointer">Terms & Conditions</Link>
      </nav>

      <nav className="grid grid-flow-col gap-4">
        <a href="https://www.facebook.com/fabiha.amatullah.2024/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform cursor-pointer">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform cursor-pointer">
          <FaTwitter size={20} />
        </a>
        <a href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform cursor-pointer">
          <FaLinkedin size={20} />
        </a>
      </nav>

      <aside>
        <p className="text-sm">
          © {new Date().getFullYear()} - All rights reserved by OneMoreServe
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
