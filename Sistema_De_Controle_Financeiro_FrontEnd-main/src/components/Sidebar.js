import React, { useState } from "react";
import Historias from "./Historias";
import Desafios from "./Desafios";
import Explicacoes from "./Explicacoes";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("historias");

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h5>📚 Menu de Estudos</h5>
        <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <button
              className={`sidebar-btn ${
                activeTab === "historias" ? "active" : ""
              }`}
              onClick={() => setActiveTab("historias")}
            >
              📖 Histórias & Parábulas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`sidebar-btn ${
                activeTab === "desafios" ? "active" : ""
              }`}
              onClick={() => setActiveTab("desafios")}
            >
              🎯 Desafios
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`sidebar-btn ${
                activeTab === "explicacoes" ? "active" : ""
              }`}
              onClick={() => setActiveTab("explicacoes")}
            >
              🎓 Explicações & Vídeos
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo */}
      <div className="content">
        {activeTab === "historias" && <Historias />}
        {activeTab === "desafios" && <Desafios />}
        {activeTab === "explicacoes" && <Explicacoes />}
      </div>
    </div>
  );
};

export default Sidebar;
