import React, { useState } from "react";
import axios from "axios";

const FormularioTrocaSenha = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const idUsuarioLogado = localStorage.getItem("id_usuario");

  const trocaSenha = async (e) => {
    e.preventDefault();

    if (!idUsuarioLogado) {
      alert(
        "Sessão expirada ou ID de usuário não encontrado. Faça login novamente."
      );
      return;
    }

    if (novaSenha === confSenha) {
      try {
        await axios.put(`https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/usuario/${idUsuarioLogado}/senha`, {
          senha: novaSenha,
        });
        alert("Senha atualizado com sucesso!");
        setNovaSenha("");
        setConfSenha("");
      } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        alert("Ocorreu um erro ao atualizar a Senha.");
      }
    } else {
      alert("As senhas não coincidem. Tente novamente.");
    }
  };

  return (
    <div className="container-troca">
      <form className="form" onSubmit={trocaSenha}>
        <div>
          <div>
            <h2>Trocar Senha</h2>
          </div>
          <label>Nova Senha:</label>
          <input
            type="password"
            
            className="troca-senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirmar Nova Senha:</label>
          <input
            type="password"
            className="troca-senha"
            value={confSenha}
            onChange={(e) => setConfSenha(e.target.value)}
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
export default FormularioTrocaSenha;
