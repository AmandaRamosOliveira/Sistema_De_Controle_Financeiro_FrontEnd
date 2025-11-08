import React, { useState, useEffect } from "react";

const Desafios = () => {
  const [desafiosAceitos, setDesafiosAceitos] = useState([]);

  const localStorageKey = "desafios_aceitos";

  useEffect(() => {
    const idUsuario = localStorage.getItem("id_usuario");
    if (idUsuario) {
      try {
        const dadosArmazenados = localStorage.getItem(localStorageKey);
        if (dadosArmazenados) {
          const desafiosPorUsuario = JSON.parse(dadosArmazenados);
          if (desafiosPorUsuario[idUsuario]) {
            setDesafiosAceitos(desafiosPorUsuario[idUsuario]);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage", error);
      }
    }
  }, []);

  const salvarNoLocalStorage = (novosDesafios) => {
    const idUsuario = localStorage.getItem("id_usuario");
    if (!idUsuario) {
      alert("Erro: Id do usuário não encontrado.");
      return;
    }

    try {
      const dadosArmazenados = localStorage.getItem(localStorageKey);
      const desafiosPorUsuario = dadosArmazenados
        ? JSON.parse(dadosArmazenados)
        : {};

      desafiosPorUsuario[idUsuario] = novosDesafios;

      localStorage.setItem(localStorageKey, JSON.stringify(desafiosPorUsuario));
      setDesafiosAceitos(novosDesafios);
      alert("Desafio aceito com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage", error);
    }
  };

  const handleAceitarDesafio = (desafioId, desafioNome) => {
    if (!desafiosAceitos.some((d) => d.id === desafioId)) {
      const novoDesafio = {
        id: desafioId,
        nome: desafioNome,
        aceitoEm: new Date(),
      };
      const novosDesafiosAceitos = [...desafiosAceitos, novoDesafio];
      salvarNoLocalStorage(novosDesafiosAceitos);
    } else {
      alert("Você já aceitou esse desafio!");
    }
  };

  return (
    <div>
      <h2> 🎯 Desafios Financeiros</h2>
      <div className="desafios-container">
        <div className="meta-desafio">
          <p className="p1M">🗓️ Desafio Mensal</p>
          <p className="p2M">Janeiro: Sem Gastos Supérfluos</p>
          <p>
            Durante todo o mês, evite compras por impulso. Antes de comprar
            algo, espere 24 horas e pergunte: "Eu realmente preciso disso?"
          </p>

          <div className="resul-desafio">
            <p>Meta: Economizar pelo menos R$ 200 em gastos desnecessários</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAceitarDesafio(1, "Sem Gastos Supérfluos")}
          >
            Aceitar Desafio
          </button>
        </div>

        <div className="meta-desafio">
          <p className="p1A">📅 Desafio Anual</p>
          <p className="p2A">2024: Desafio das 52 Semanas</p>
          <p>
            Na primeira semana, guarde R$ 1. Na segunda, R$ 2. Continue
            aumentando R$ 1 por semana até completar o ano.
          </p>
          <div className="resul-desafio">
            <p>Resultado: Ao final do ano, você terá R$ 1.378!</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAceitarDesafio(2, "Desafio das 52 Semanas")}
          >
            Aceitar Desafio
          </button>
        </div>
      </div>

      <div className="desafios-ativos-container">
        <h5 className="desaf-titulo">🏆 Seus Desafios Ativos</h5>
        <div className="Desafios-ativos">
          {desafiosAceitos.length > 0 ? (
            <ul>
              {desafiosAceitos.map((desafio) => (
                <li key={desafio.id}>
                  <strong>{desafio.nome}</strong> - Aceito em: {new Date(desafio.aceitoEm).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum desafio aceito ainda</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Desafios;
