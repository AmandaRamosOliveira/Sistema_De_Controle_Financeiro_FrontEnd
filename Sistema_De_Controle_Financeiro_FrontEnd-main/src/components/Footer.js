import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p> © 2025 Financial Management.</p>
        <div>
          <FaInstagramSquare size={20} color="green" />
          <a
            href="https://www.instagram.com/amanda_ramos_oliveira/?next=%2F"
            className="text-whit me-3"
          >
            Instagram
          </a>
          <AiFillLinkedin size={20} color="green" />
          <a
            href="https://www.linkedin.com/in/amanda-ramos-oliveira-56814322b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-whit me-3"
          >
            LinkedIn
          </a>
          <AiFillGithub size={20} color="green" />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/AmandaRamosOliveira"
            className="text-whit me-3"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
