import React from "react";
import { useNavigate } from "react-router-dom";
import logoTipo from "../assets/img/logoTipo.jpg";
import Sidebar from "../components/Sidebar";
import { GoArrowLeft } from "react-icons/go";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";

const Estudos = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/dashboard");
  };

  return (
    <div className="estudos">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={logoTipo} width={70} alt="Logo" className="logo" />
            <span className="brand-text"> Financial Management</span>
          </a>

          <div className="d-flex">
            <button className="btn btn-success" onClick={handleVoltar}>
              <GoArrowLeft size={25} color="white" />
            </button>
          </div>
        </div>
      </nav>
      <div className="main-content-wrapper">
        <Sidebar />
      </div>

      <footer className="footer-Estudos">
        <div>
          <p> © 2025 Financial Management.</p>
          <div>
            <FaInstagramSquare size={20} color="green" />
            <a href="#" className="text-whit me-3">
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
              href="https://github.com/AmandaRamosOliveira"
              target="_blank"
              rel="noopener noreferrer"
              className="text-whit me-3"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Estudos;
