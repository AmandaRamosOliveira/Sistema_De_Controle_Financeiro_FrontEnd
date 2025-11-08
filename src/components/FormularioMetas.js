import React, { useState } from "react";


const FormularioMetas = ({ onAdicionar }) => {
  const hoje = new Date();
  const [formData, setFormData] = useState({
    descricaoMeta: "",
    valorMensal: "",
    valorFinal: "",
    mes: hoje.getMonth() + 1,
    ano: hoje.getFullYear(),
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdicionar(formData);
    setFormData({ descricaoMeta: "", valorMensal: "", valorFinal: "", mes: "", ano: "" });
  };

  return (
    <div className="formulario-container">
      <form className="formulario" onSubmit={handleSubmit}>
        <label>Descrição da Meta</label>
        <input
          type="text"
          name="descricaoMeta"
          value={formData.descricaoMeta}
          onChange={handleChange}
          placeholder="ex: Viagem para a Bahia"
        />
        <label>Valor mensal para a meta</label>
        <input
          type="number"
          name="valorMensal"
          value={formData.valorMensal}
          onChange={handleChange}
          placeholder="ex: 2000.00"
        />
        <label>Valor final</label>
        <input
          type="number"
          name="valorFinal"
          value={formData.valorFinal}
          onChange={handleChange}
          placeholder="ex: 15000.00"
        />
        <div className="botoes-metas">
          <button type="submit">Adicionar Meta</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioMetas;
