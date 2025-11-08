import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contas.css";
import Footer from "../components/Footer";
import FormularioContas from "../components/FormularioContas";
import logoTipo from "../assets/img/logoTipo.jpg";
import { GoArrowLeft } from "react-icons/go";
import { CgAddR } from "react-icons/cg";
import { TbMoneybag } from "react-icons/tb";
import {
  adicionarConta,
  buscarSalarioUsuario,
  listarContasPorUsuario,
} from "../services/contasService";

const Contas = () => {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contas, setContas] = useState([]);
  const [salario, setSalario] = useState(0);
  const [salarioDescontado, setSalarioDescontado] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);

  const handleVoltar = () => {
    navigate("/dashboard");
  };

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleAdicionarConta = async (novaConta) => {
    const idUsuarioLogado = localStorage.getItem("id_usuario");
    if (!idUsuarioLogado) {
      alert(
        "Sessão expirada ou ID de usuário não encontrado. Faça login novamente."
      );
      return;
    }

    try {
      const contaParaEnviar = {
        ...novaConta,
        id_usuario: +idUsuarioLogado,
      };
      await adicionarConta(contaParaEnviar);
      await carregarContas();
      setMostrarFormulario(false);
    } catch (error) {
      alert("Erro ao adicionar conta: " + error.message);
      console.error("erro completo:", error);
    }
  };


  const carregarSalario = async () => {
    const idUsuarioLogado = localStorage.getItem("id_usuario");
    if (!idUsuarioLogado) return;

    try {
      const data = await buscarSalarioUsuario(+idUsuarioLogado);
      const salarioNum = Number(data.salario) || 0;
      setSalario(salarioNum);
    } catch (error) {
      console.error("Erro ao carregar salário:", error);
    }
  };


  const carregarContas = async () => {
    const idUsuarioLogado = localStorage.getItem("id_usuario");
    if (!idUsuarioLogado) return;

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    try {
      const contasDoUsuario = await listarContasPorUsuario(
        +idUsuarioLogado,
        mesAtual,
        anoAtual
      );
      setContas(contasDoUsuario);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    }
  };

  useEffect(() => {
    const totalContas = contas.reduce((soma, conta) => {
      const valorConta = Number(conta.valor) || 0;
      return soma + valorConta;
    }, 0);

    setSalarioDescontado(salario - totalContas);
    setTotalGasto(totalContas);
  }, [salario, contas]);

  useEffect(() => {
    carregarSalario();
    carregarContas();
  }, []);

  return (
    <div className="contas-container">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={logoTipo} width={70} alt="Logo" className="logo" />
            <span className="brand-text"> Financial Management</span>
          </a>
          <div className="d-flex">
            <button className="btn btn-success me-2" onClick={handleVoltar}>
              <GoArrowLeft size={25} color="white" />
            </button>
          </div>
        </div>
      </nav>

      <div className="contas-main">
        <div className="painel-contas">
          <div className="salario">
            <div className="valorSalario">
              <TbMoneybag
                size={15}
                color="green"
                style={{ marginRight: "6px" }}
              />
              <h6>Salario: R$ {Number(salario).toFixed(2)}</h6>
            </div>
            <div className="valorDescontado">
              <TbMoneybag
                size={15}
                color="green"
                style={{ marginRight: "6px" }}
              />
              <h6>Saldo: R$ {Number(salarioDescontado).toFixed(2)}</h6>
            </div>
            <div className="valorDescontado">
              <TbMoneybag
                size={15}
                color="green"
                style={{ marginRight: "6px" }}
              />
              <h6>Gasto: R$ {Number(totalGasto).toFixed(2)}</h6>
            </div>
          </div>

          <div className="titulo">
            <h4>Contas</h4>
          </div>
          <button
            type="button"
            className="btn btn-success btn-contas"
            onClick={handleToggleFormulario}
          >
            <CgAddR color="white" size={15} style={{ marginRight: "6px" }} />
            {mostrarFormulario ? "Fechar Formulario" : "Adicionar Conta"}
          </button>

          {mostrarFormulario && (
            <FormularioContas onAdicionar={handleAdicionarConta} />
          )}

          <div className="contas-spaces">
            <div className="titulos">
              <h5>Suas Contas:</h5>
              {contas.length === 0 ? (
                <p>Nenhuma conta foi adicionada ainda</p>
              ) : (
                <ul>
                  {contas.map((c, index) => (
                    <li key={index}>
                      {c.categoria} Valor: R${Number(c.valor).toFixed(2)} Tipo:{" "}
                      {c.tipo}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contas;
