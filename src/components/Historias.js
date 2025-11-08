import React, { useState } from "react";

const HistoriaCard = ({ titulo, texto }) => {
  const [expandido, setExpandido] = useState(false);

  const maxLength = 150;
  const textoExibido = expandido
    ? texto
    : texto.length > maxLength
    ? texto.substring(0, maxLength).split(" ").slice(0, -1).join(" ") + "..."
    : texto;

  const formatarTexto = (texto) => {
    return texto.split("\n").map((linha, i) => (
      <span key={i}>
        {linha}
        <br />
      </span>
    ));
  };

  return (
    <div className="historia mb-4 p-3 border rounded">
      <h5>{titulo}</h5>
      <p>{formatarTexto(textoExibido)}</p>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setExpandido(!expandido)}
      >
        {expandido ? "Ver Menos" : "Ler História Completa"}
      </button>
    </div>
  );
};

const Historias = () => {
  const historias = [
    {
      titulo: "🐜 A Formiga e a Cigarra Moderna",
      texto: `Era uma vez duas amigas: Ana e Carla. Ana sempre guardava 20% do seu salário, investindo e planejando o futuro. Carla gastava tudo com compras online e lazer, sem se preocupar com imprevistos.

Com o tempo, Ana conseguiu juntar um fundo de emergência, pagar suas dívidas e realizar alguns sonhos, como viajar e fazer cursos. Carla, por outro lado, passou por dificuldades financeiras: não tinha dinheiro guardado, contraiu dívidas e se sentia ansiosa por não ter controle sobre sua vida financeira.

Moral da história: guardar e investir parte do seu dinheiro garante segurança e liberdade para o futuro.`,
    },
    {
      titulo: "💰 Os Três Porquinhos e o Orçamento",
      texto: `Três irmãos receberam a mesma herança e decidiram administrar o dinheiro de formas diferentes:
O primeiro gastou tudo rapidamente com coisas supérfluas.
O segundo guardou uma parte, mas não planejou muito.
O terceiro fez um planejamento detalhado, economizando e investindo, pensando no longo prazo.
Com o tempo, o primeiro ficou sem nada, o segundo teve apenas uma segurança parcial, e o terceiro conseguiu estabilidade financeira e realizou seus objetivos.

Moral da história: planejamento e disciplina financeira são essenciais para ter estabilidade e alcançar sonhos.`,
    },
  ];

  return (
    <div>
      <h2>📖 Histórias & Parábolas Financeiras</h2>

      {/* Bloco das Histórias */}
      <div className="historias-container">
        {historias.map((historia, index) => (
          <HistoriaCard
            key={index}
            titulo={historia.titulo}
            texto={historia.texto}
          />
        ))}
      </div>

      {/* Bloco das Dicas */}
      <div className="dicas-container">
        <h5 className="dicas-titulo">💡 Dicas de Administração Financeira</h5>
        <div className="dicas-cards">
          <div className="dicas">
            <p className="p1">Regra 50-30-20</p>
            <p>50% necessidades, 30% desejos, 20% poupança</p>
          </div>

          <div className="dicas">
            <p className="p1">Emergência Primeiro</p>
            <p>Tenha 3-6 meses de gastos guardados</p>
          </div>

          <div className="dicas">
            <p className="p1">Anote Tudo</p>
            <p>Controle cada entrada e saída</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historias;
