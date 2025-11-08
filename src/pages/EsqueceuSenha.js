import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [alerta, setAlerta] = useState(null);
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };

  const trocaSenha = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Informe o email.");
      return;
    }

    if (novaSenha !== confSenha) {
      setAlerta({
        tipo: "warning",
        mensagem: "As senhas não coincidem. Tente novamente.",
      });
      setTimeout(() => setAlerta(null), 3000); 
      return;
    }

    try {
      await axios.put("https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/esqueceu-senha", {
        email: email,
        senha: novaSenha,
      });

      setAlerta({
        tipo: "success",
        mensagem: "Senha atualizada com sucesso!",
      });
      setTimeout(() => setAlerta(null), 3000); 

      setEmail("");
      setNovaSenha("");
      setConfSenha("");
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      setAlerta({
        tipo: "danger",
        mensagem:
          error.response?.data?.erro ||
          "Ocorreu um erro ao atualizar a senha.",
      });
      setTimeout(() => setAlerta(null), 3000); 
    }
  };

  return (
    <div className="main-esqueceu">
      <div className="container-esqueceu">
        <form className="form" onSubmit={trocaSenha}>
          <div>
            <h2>Email</h2>
            <label>Seu email:</label>
            <input
              type="email"
              className="troca-senha"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <h2>Trocar Senha</h2>
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

          {alerta && (
            <div
              className={`alert alert-${alerta.tipo} d-flex align-items-center mt-3`}
              role="alert"
            >
              {alerta.tipo === "success" && (
                <i className="bi bi-check-circle-fill me-2"></i>
              )}
              {alerta.tipo === "danger" && (
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
              )}
              {alerta.tipo === "warning" && (
                <i className="bi bi-info-circle-fill me-2"></i>
              )}
              <div>{alerta.mensagem}</div>
            </div>
          )}

          <button type="submit" className="btn btn-success me-2 mt-2">
            Confirmar
          </button>
          <button onClick={handleVoltar} className="btn btn-primary mt-2">
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
