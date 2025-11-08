import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import Footer from "../components/Footer";
import logoTipo from "../assets/img/logoTipo.jpg";
import { FaMoneyBillWave, FaChartBar, FaBolt, FaBook } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import {
  AiOutlineSetting,
  AiOutlineUser,
  AiTwotonePhone,
} from "react-icons/ai";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormularioTrocaNome from "../components/fomularioTrocaNome";
import FormularioTrocaSenha from "../components/formularioTrocaSenha";

const Dashboard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  const [abrirFormularioNome, setAbrirFormularioNome] = useState(false);
  const [abrirFormularioSenha, setAbrirFomularioSenha] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id_usuario");
    if (!id) {
      navigate("/");
      return;
    }

    axios
      .get(`https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/usuario/${id}`)
      .then((res) => setUsuario(res.data))
      .catch((err) => console.error("Erro ao buscar usuário:", err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("id_usuario");
    navigate("/");
  };
  const handleContas = () => {
    navigate("/contas");
  };
  const handleEstudos = () => {
    navigate("/estudos");
  };
  const handleRelatorio = () => {
    const id = localStorage.getItem("id_usuario");
    navigate("/relatorios", { state: { idUsuario: id } });
  };

  const handleMetas = () => {
    navigate("/metas");
  };
  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logoTipo} width={70} alt="Logo" className="logo" />
            <span className="brand-text"> Financial Management</span>
          </a>

          <DropdownButton
            id="dropdown-settings-button"
            title={<AiOutlineSetting size={25} color="white" />}
            variant="success"
          >

            <Dropdown.Item onClick={() => setAbrirFormularioNome(true)}>
              <AiOutlineUser
                size={20}
                color="green"
                style={{ marginRight: "8px" }}
              />
              Alterar Nome
            </Dropdown.Item>
            
            <Dropdown.Item onClick={() => setAbrirFomularioSenha(true)}>
              <AiTwotonePhone
                size={20}
                color="green"
                style={{ marginRight: "8px" }}
              />
              Alterar Senha
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item onClick={handleLogout}>
              <IoIosLogOut
                size={20}
                color="green"
                style={{ marginRight: "8px" }}
              />
              Sair
            </Dropdown.Item>
          </DropdownButton>

          {abrirFormularioNome && (
            <div
              className="modal-react-overlay"
              onClick={() => setAbrirFormularioNome(false)}
            >
              <div className="modal-react" onClick={(e) => e.stopPropagation()}>
                <FormularioTrocaNome />
              </div>
            </div>
          )}
          {abrirFormularioSenha && (
            <div className="modal-react-overlay"
            onClick={() => setAbrirFomularioSenha(false)}>
              <div className="modal-react" onClick={(e) => e.stopPropagation()}>
                <FormularioTrocaSenha/>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="meioDash">
        <h1 className="h1Dash">
          Seja Bem Vindo(a), {usuario ? usuario.nome : "Carregando..."}!
        </h1>
        <h5 style={{ color: "aliceblue" }}>
          Escolha uma das opções abaixo para começar
        </h5>

        <div className="card-container">
          <div className="card dash-card">
            <div className="card-body" onClick={handleContas}>
              <FaMoneyBillWave size={40} color="green" />
              <h5 className="card-title">Contas</h5>
              <p className="card-text">Gerencie suas contas e transações</p>
            </div>
          </div>

          <div className="card dash-card">
            <div className="card-body" onClick={handleRelatorio}>
              <FaChartBar size={40} color="green" />
              <h5 className="card-title">Relatórios</h5>
              <p className="card-text">Visualize relatórios detalhados</p>
            </div>
          </div>

          <div className="card dash-card">
            <div className="card-body" onClick={handleMetas}>
              <FaBolt size={40} color="green" />
              <h5 className="card-title">Metas</h5>
              <p className="card-text">Defina e acompanhe suas metas</p>
            </div>
          </div>

          <div className="card dash-card">
            <div className="card-body" onClick={handleEstudos}>
              <FaBook size={40} color="green" />
              <h5 className="card-title">Estudos</h5>
              <p className="card-text">Acesse materiais de estudo</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
