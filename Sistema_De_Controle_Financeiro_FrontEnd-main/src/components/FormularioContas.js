import React, { useState } from "react";

const FormularioContas = ({onAdicionar}) => {
  const hoje = new Date();
  const [formData, setFormData] = useState({
    categoria: "",
    valor: "",
    tipo: "",
    mes: hoje.getMonth()+1,
    ano: hoje.getFullYear(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdicionar(formData);
    setFormData({ categoria: "", valor: "", tipo: "", mes: "", ano: "" });
  };

  return (
    <div className="formulario-container">
      <form className="formulario" onSubmit={handleSubmit}>
        <label>Categoria</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="ex: Conta de Luz"
        />

        <label>Valor</label>
        <input
          type="number"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
        />

        <label>Tipo</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="fixa">fixa</option>
          <option value="variavel">variavel</option>
        </select>

        <label>Mês</label>
        <input
          type="number"
          name="mes"
          value={formData.mes}
          onChange={handleChange}
          placeholder="ex: 8"
        />

        <label>Ano</label>
        <input
          type="number"
          name="ano"
          value={formData.ano}
          onChange={handleChange}
          placeholder="ex: 2025"
        />

        <button type="submit">Adicionar Conta</button>
      </form>
    </div>
  );
};

export default FormularioContas;
