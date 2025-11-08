import React, { useState } from "react";
import axios from "axios";

const FormularioTrocaNome = () => {
  const [novoNome, setNovoNome] = useState("");
  const [confNome, setConfNome] = useState("");

  const idUsuarioLogado = localStorage.getItem("id_usuario");

  const trocaNome = async (e) => {
    e.preventDefault();

    if (!idUsuarioLogado) {
      alert(
        "Sessão expirada ou ID de usuário não encontrado. Faça login novamente."
      );
      return;
    }

    if (novoNome === confNome) {
      try {
        await axios.put(`https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/usuario/${idUsuarioLogado}/nome`, {
          nome: novoNome,
        });
        alert("Nome atualizado com sucesso!");
        setNovoNome("");
        setConfNome("");
      } catch (error) {
        console.error("Erro ao atualizar nome:", error);
        alert("Ocorreu um erro ao atualizar o nome.");
      }
    } else {
      alert("Os nomes não coincidem. Tente novamente.");
    }
  };

  return (
    <div className="container-troca">
      <form className="form" onSubmit={trocaNome}>
        <div>
          <div>
            <h2>Trocar Nome</h2>
          </div>
          <label>Novo Nome:</label>
          <br/>
          <input
            type="text"
            className="troca-nome"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirmar Novo Nome:</label>
          <input
            type="text"
            className="troca-nome"
            value={confNome}
            onChange={(e) => setConfNome(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default FormularioTrocaNome;
