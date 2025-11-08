import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import FormularioMetas from "../components/FormularioMetas";
import "../styles/metas.css";
import logoTipo from "../assets/img/logoTipo.jpg";
import { CgAddR } from "react-icons/cg";
import { GoArrowLeft } from "react-icons/go";
import { AiOutlineCheck } from "react-icons/ai";
import {
  adicionarMeta as adicionarMetaService,
  listarMetasPorUsuario,
  atualizarStatus,
} from "../services/metasService";

const Metas = () => {
  const navigate = useNavigate();

  const [valorMensal, setValorMensal] = useState("");
  const [numMeses, setNumMeses] = useState("");
  const [resultado, setResultado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [metas, setmetas] = useState([]);

  const handleVoltar = () => {
    navigate("/dashboard");
  };

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const adicionarMeta = async (novaMeta) => {
    const idUsuarioLogado = localStorage.getItem("id_usuario");
    if (!idUsuarioLogado) {
      alert(
        "Sessão expirada ou Id de usuário não encontrado. Faça login novamente"
      );
      return;
    }
    try {
      const metaParaEnviar = {
        ...novaMeta,
        id_usuario: +idUsuarioLogado,
      };
      await adicionarMetaService(metaParaEnviar);
      setMostrarFormulario(false);
      carregarMetas();
    } catch (error) {
      alert("Erro ao adicionar meta: " + error.message);
      console.error("erro completo: ", error);
    }
  };

  const carregarMetas = async () => {
    const idUsuarioLogado = localStorage.getItem("id_usuario");
    if (!idUsuarioLogado) return;

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    try {
      const metasDoUsuario = await listarMetasPorUsuario(+idUsuarioLogado);
      setmetas(metasDoUsuario);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
    }
  };
  useEffect(()=>{
    carregarMetas();
  }, []);
  const marcarComoFeito = async (id_meta) => {
    try {
      await atualizarStatus(id_meta, "concluida");
      await carregarMetas();
    } catch (error) {
      console.error("Erro ao marcar como feito:", error);
    }
  };

  const calculo = () => {
    const valor = parseFloat(valorMensal) || 0;
    const meses = parseInt(numMeses) || 0;

    setResultado(valor * meses);
  };
  return (
    <div className="metas-container">
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
      
      <div className="metas">
        <div className="main-container">
          <div className="metas-titulo">
            <h3>Metas</h3>
            <p>
              Aqui você poderá criar metas e ver seus planos serem realizados
            </p>
          </div>

          <button
            type="button"
            className="btn btn-success btn-adicionar"
            onClick={handleToggleFormulario}
          >
            <CgAddR color="white" size={15} style={{ marginRight: "6px" }} />
            {mostrarFormulario ? "Fechar Formulário" : "Adicionar Meta"}
          </button>

          {mostrarFormulario && <FormularioMetas onAdicionar={adicionarMeta} />}

          <div className="calculadora-metas">
            <h5>Calculadora de Metas</h5>

            <div className="inputs-calculadora">
              <div className="input-group">
                <p>Valor Mensal (R$)</p>
                <input
                  type="number"
                  value={valorMensal}
                  onChange={(e) => setValorMensal(e.target.value)}
                />
              </div>
              <div className="input-group">
                <p>Número de Meses</p>
                <input
                  type="number"
                  value={numMeses}
                  onChange={(e) => setNumMeses(e.target.value)}
                />
              </div>
            </div>

            <button
              type="button"
              class="btn btn-primary calcular-btn"
              onClick={calculo}
            >
              Calcular
            </button>

            {resultado !== null && (
              <div className="resultado">
                <p>Resultado: R$ {resultado.toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className="suas-metas">
            <h4>Suas Metas</h4>
            {metas.length === 0 ? (
              <p>Nenhuma meta criada ainda</p>
            ) : (
              <ul>
                {metas.map((m, index) => (
                  <li key={index}>
                    <strong>{m.descricaoMeta}</strong>
                    <br />
                    💰 Valor Mensal: R$ {Number(m.valor).toFixed(2)} <br />
                    🎯 Valor Final: R$ {Number(m.valor_final).toFixed(2)} <br />
                    📅 Período Estimado: {Math.ceil(m.periodo_meses)} meses{" "}
                    <br />
                    📝 Status: <b>{m.status}</b> <br />
                    {m.status === "pendente" && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => marcarComoFeito(m.id_meta)}
                      >
                        <AiOutlineCheck color="white" size={15} /> 
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Metas;
