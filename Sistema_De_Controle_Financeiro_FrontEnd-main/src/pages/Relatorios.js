import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Relatorio.css";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import Footer from "../components/Footer";
import logoTipo from "../assets/img/logoTipo.jpg";
import { GoArrowLeft } from "react-icons/go";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Relatorios = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const idUsuario = location.state?.idUsuario;

  const [abaAtiva, setAbaAtiva] = useState("mensal");
  const [loading, setLoading] = useState(false);
  const [dadosRelatorio, setDadosRelatorio] = useState(null);
  const [dadosRelatorioAnual, setDadosRelatorioAnual] = useState(null);
  const [mesSelecionado, setMesSelecionado] = useState("");

  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const mesAno = dataAtual.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const handleVoltar = () => navigate("/dashboard");

  const buscarRelatorio = async (mesIndex) => {
    if (!idUsuario) return console.error("❌ ID do usuário não definido");

    try {
      setLoading(true);
      const mesNumero = mesIndex + 1;
      const response = await axios.get(
        `https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/relatorio/${idUsuario}/${mesNumero}/${anoAtual}`
      );
      setDadosRelatorio(response.data);
      setMesSelecionado(meses[mesIndex]);
    } catch (error) {
      console.error("❌ Erro ao buscar relatório:", error);
      setDadosRelatorio(null);
    } finally {
      setLoading(false);
    }
  };

  const buscarRelatorioAnual = async () => {
    if (!idUsuario) return console.error("❌ ID do usuário não definido");

    try {
      setLoading(true);
      const response = await axios.get(
        `https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/relatorio/anual/${idUsuario}/${anoAtual}`
      );
      setDadosRelatorioAnual(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar relatório anual:", error);
      setDadosRelatorioAnual(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAbaAnual = () => {
    setAbaAtiva("anual");
    if (!dadosRelatorioAnual) buscarRelatorioAnual();
  };
  const dadosMensais = Array(12).fill(0);
  if (dadosRelatorioAnual?.gastos_mensais) {
    dadosRelatorioAnual.gastos_mensais.forEach((g) => {
      const mesIndex = g.mes - 1; // array começa em 0
      dadosMensais[mesIndex] = g.total_mes;
    });
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logoTipo} width={70} alt="Logo" className="logo" />
            <span className="brand-text"> Financial Management</span>
          </Link>
          <div className="d-flex">
            <button className="btn btn-success me-2" onClick={handleVoltar}>
              <GoArrowLeft size={25} color="white" />
            </button>
          </div>
        </div>
      </nav>

      <div className="relatorio-contaneir">
        <div className="relatorio-header">
          <h2>{mesAno}</h2>
        </div>

        <div className="botoes-relatorios">
          <button
            className={`btn-relatorio ${abaAtiva === "mensal" ? "ativo" : ""}`}
            onClick={() => setAbaAtiva("mensal")}
          >
            📊 Relatório Mensal
          </button>
          <button
            className={`btn-relatorio ${abaAtiva === "anual" ? "ativo" : ""}`}
            onClick={handleAbaAnual}
          >
            📑 Relatório do Ano
          </button>
        </div>

        <div className="conteudo-relatorio">
          {abaAtiva === "mensal" && (
            <>
              <div className="meses">
                {meses.map((mes, index) => (
                  <button
                    key={index}
                    className="btn-relatorio"
                    onClick={() => buscarRelatorio(index)}
                  >
                    {mes}
                  </button>
                ))}
              </div>

              {loading && <p>Carregando relatório...</p>}

              {dadosRelatorio && !loading && (
                <div className="grafico-relatorio">
                  <h3>
                    Relatório de {mesSelecionado} {anoAtual}
                  </h3>

                  <Doughnut
                    data={{
                      labels: dadosRelatorio.categorias.map((c) => c.categoria),
                      datasets: [
                        {
                          data: dadosRelatorio.categorias.map(
                            (c) => c.total_categoria
                          ),
                          backgroundColor: [
                            "#ff6384",
                            "#36a2eb",
                            "#ffce56",
                            "#4bc0c0",
                            "#9966ff",
                            "#ff9f40",
                          ],
                        },
                      ],
                    }}
                  />

                  <div className="cards-destaque">
                    <div className="card">
                      <p>💰 Maior Gasto:</p>
                      <h2>R$ {dadosRelatorio.maior_gasto.valor}</h2>
                      <p>Categoria: {dadosRelatorio.maior_gasto.categoria}</p>
                    </div>
                    <div className="card">
                      <p>👜 Total Gasto:</p>
                      <h2>R$ {dadosRelatorio.total_gasto}</h2>
                    </div>
                    <div className="card">
                      <p>💚 Economia:</p>
                      <h2>R$ {dadosRelatorio.economia}</h2>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {abaAtiva === "anual" && dadosRelatorioAnual && (
            <div className="grafico-relatorio">
              <h3>Relatório Anual {anoAtual}</h3>

              <Bar
                data={{
                  labels: meses,
                  datasets: [
                    {
                      label: "Gastos Mensais",
                      data: dadosMensais,
                      backgroundColor: "rgba(75, 192, 192, 0.7)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Gastos por mês" },
                  },
                }}
              />

              <div className="cards-destaque">
                <div className="card">
                  <p>📅 Mês que mais Gastou</p>
                  <h2>
                    {dadosRelatorioAnual.mes_mais_gasto?.numero
                      ? meses[dadosRelatorioAnual.mes_mais_gasto.numero - 1]
                      : "-"}{" "}
                    R$ {dadosRelatorioAnual.mes_mais_gasto?.valor || 0}
                  </h2>
                </div>
                <div className="card">
                  <p>📅 Categoria Mais Gasta:</p>
                  <p>{dadosRelatorioAnual.categoria_mais_gasta.categoria}</p>
                  <h2>R$ {dadosRelatorioAnual.categoria_mais_gasta.valor}</h2>
                </div>
                <div className="card">
                  <p>👜 Total Gasto no Ano:</p>
                  <h2>R$ {dadosRelatorioAnual.total_gasto_anual}</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Relatorios;
