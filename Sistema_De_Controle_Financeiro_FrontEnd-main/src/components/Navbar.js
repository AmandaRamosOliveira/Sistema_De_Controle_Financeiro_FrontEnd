import React, { useState } from "react";
import logoTipo from "../assets/img/logoTipo.jpg";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";

const Navbar = () => {
  const [abrirCadastro, setAbrirCadastro] = useState(false);
  const [abrirLogin, setAbrirLogin] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src={logoTipo} width={70} alt="Logo" className="logo" />
          <span className="brand-text">  Financial Management</span>
        </a>

        <div className="d-flex">
          <button
            className="btn btn-success me-2"
            onClick={() => setAbrirCadastro(true)}
          >
            Cadastrar
          </button>

          <button
            className="btn btn-success"
            onClick={() => setAbrirLogin(true)}
          >
            Entrar
          </button>

          {abrirCadastro && (
            <div
              className="modal-react-overlay"
              onClick={() => setAbrirCadastro(false)}
            >
              <div className="modal-react" onClick={(e) => e.stopPropagation()}>
                <Cadastro />
              </div>
            </div>
          )}

          {abrirLogin && (
            <div
              className="modal-react-overlay"
              onClick={() => setAbrirLogin(false)}
            >
              <div className="modal-react" onClick={(e) => e.stopPropagation()}>
                <Login />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
