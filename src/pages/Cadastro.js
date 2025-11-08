import React, { useState } from "react";
import logoTipo from "../assets/img/logoTipo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    salario: "",
    senha: "",
    confirmarSenha: "",
  });
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState(null);

  const handleCadastro = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres!");
      setTimeout(() => setAlerta(null), 3000);
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setAlerta({
        tipo: "warning",
        Mensagem: "As senhas não coincidem!",
      });
      setTimeout(() => setAlerta(null), 3000);
      return;
    }

    try {
      const verificar = await axios.post(
        "https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/verificar-email",
        {
          email: formData.email,
        }
      );

      if (verificar.data.existe) {
        setAlerta({
          tipo: "danger",
          mensagem: "Este email já está cadastrado!",
        });
        setTimeout(() => setAlerta(null), 3000);
        return;
      }

      await axios.post("https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/criarCadastro", {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        salario: formData.salario,
        senha: formData.senha,
      });

      setAlerta({
        tipo: "success",
        mensagem: "Cadastro realizado com sucesso!",
      });
      setTimeout(() => setAlerta(null), 3000);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.response) {
        const mensagemErro =
          error.response.data.Mensagem || "Erro no cadastro.";
        setAlerta({
          tipo: "danger",
          mensagem: mensagemErro,
        });
        setTimeout(() => setAlerta(null), 3000);
      } else {
        setAlerta({
          tipo: "warning",
          mensagem: "Erro ao conectar com o servidor.",
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
        <form onSubmit={handleSubmit}>
          <h2>Cadastro</h2>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleCadastro}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleCadastro}
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleCadastro}
            required
          />
          <input
            type="number"
            name="salario"
            placeholder="Salário"
            value={formData.salario}
            onChange={handleCadastro}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleCadastro}
            minLength={6}
            required
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            minLength={6}
            onChange={handleCadastro}
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
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
