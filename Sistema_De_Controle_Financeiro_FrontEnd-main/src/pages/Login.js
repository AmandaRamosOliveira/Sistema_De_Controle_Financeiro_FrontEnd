import React, { useState } from "react";
import logoTipo from "../assets/img/logoTipo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState(null);
  const navigate = useNavigate();

  const handleEsqueceuSenha = () => {
    navigate("/esqueceu");
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/login", {
        email,
        senha,
      });

      const usuario = response.data.Usuario;

      localStorage.setItem("id_usuario", usuario.id);
      localStorage.setItem("nome_usuario", usuario.nome);

      setAlerta({
        tipo: "success",
        mensagem: response.data.Mensagem,
      });
      setTimeout(() => setAlerta(null), 3000);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      if (error.response) {
        setAlerta({
          tipo: "danger",
          mensagem: error.response.data.Mensagem,
        });
        setTimeout(() => setAlerta(null), 3000);
      } else {
        setAlerta({
          tipo: "warning",
          mensagem: "Erro ao conectar com o servidor",
        });
        setTimeout(() => setAlerta(null), 3000);
      }
    }
  };

  return (
    <div className="form-card">
      <div className="imagem-card">
        <img src={logoTipo} width={70} alt="Logo" className="logo" />
        <span className="brand-text">Financial Management</span>
      </div>

      <div className="form-content">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {alerta && (
            <div
              className={`alert alert-${alerta.tipo} d-flex align-items-center`}
              role="alert"
            >
              <svg
                className="bi flex-shrink-0 me-2"
                role="img"
                aria-label={alerta.tipo}
                style={{ width: "20px", height: "20px" }}
              >
                {alerta.tipo === "success" && (
                  <use xlinkHref="#check-circle-fill" />
                )}
                {alerta.tipo === "danger" && (
                  <use xlinkHref="#exclamation-triangle-fill" />
                )}
                {alerta.tipo === "warning" && <use xlinkHref="#info-fill" />}
              </svg>
              <div>{alerta.mensagem}</div>
            </div>
          )}

          <button type="submit" className="btn btn-outline-success">
            Entrar
          </button>
          <a onClick={handleEsqueceuSenha}>Esqueceu a senha</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
