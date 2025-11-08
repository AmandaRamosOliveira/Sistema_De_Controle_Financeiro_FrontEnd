import React from "react";
import { AiFillPlaySquare } from "react-icons/ai";

const Explicacoes = () => {
  return (
    <div className="explicacoes-container">
      <h2> 🎓 Explicações & Vídeos</h2>

      <div className="explicacoes">
        {/* Conceitos */}
        <div className="conceitos-container">
          <p className="explicacoes-titulo">📊 Conceitos Básicos</p>

          <div className="conceitos">
            <a
              href="https://blog.alelo.com.br/o-que-e-um-orcamento-pessoal-e-por-que-e-importante-para-o-planejamento-financeiro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="p-titulo1">Orçamento Pessoal</p>
              <p>Planejamento de receitas e despesas mensais</p>
            </a>
          </div>

          <div className="conceitos">
            <a
              href="https://www.santander.com.br/blog/como-fazer-uma-reserva-de-emergencia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="p-titulo1">Reserva de Emergência</p>
              <p>Dinheiro guardado para imprevistos</p>
            </a>
          </div>

          <div className="conceitos">
            <a
              href="https://brasilescola.uol.com.br/matematica/juros-compostos.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="p-titulo1">Juros Compostos</p>
              <p>O poder dos rendimentos sobre rendimentos</p>
            </a>
          </div>
        </div>

        {/* Vídeos */}
        <div className="videos">
          <p className="videos-titulos"> 🎥 Vídeo Aulas Recomendadas </p>

          <div className="video-card">
            <div className="video-texto">
              <AiFillPlaySquare size={35} color="red" />
              <div>
                <p className="video-titulo">Como Fazer um Orçamento</p>
                <p className="video-subtitulo">
                  Passo a passo para organizar suas finanças
                </p>
              </div>
            </div>
            <div className="video-footer">
              <a
                href="https://www.youtube.com/watch?v=dzmjIW_jBNA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Assistir</p>
              </a>
            </div>
          </div>

          <div className="video-card">
            <div className="video-texto">
              <AiFillPlaySquare size={35} color="red" />
              <div>
                <p className="video-titulo">Investimentos para Iniciantes</p>
                <p className="video-subtitulo">
                  Primeiros passos no mundo dos investimentos
                </p>
              </div>
            </div>
            <div className="video-footer">
              <a
                href="https://www.youtube.com/watch?v=Q6x0xnI0uCg&list=PLfoXk6zZrMAUeI8dwnyVGBigVnCw8jgIg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Assistir</p>
              </a>
            </div>
          </div>

          <div className="video-card">
            <div className="video-texto">
              <AiFillPlaySquare size={35} color="red" />
              <div>
                <p className="video-titulo">Como Sair das Dívidas</p>
                <p className="video-subtitulo">
                  Estratégias para quitar dívidas rapidamente
                </p>
              </div>
            </div>
            <div className="video-footer">
              <a
                href="https://www.youtube.com/watch?v=xyNfNGS1H68"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Assistir</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="biblioteca-container">
        <p className="p-titulo">📚 Biblioteca de Conhecimento</p>
        <div className="biblioteca">
          <div className="biblioteca-cards">
            <a
              href="https://www.serasa.com.br/credito/blog/cartao-de-credito-o-que-e-e-como-funciona/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>💳</p>
              <p className="p-titulo1">Cartão de Crédito</p>
              <p>Como usar sem se endividar</p>
            </a>
          </div>

          <div className="biblioteca-cards">
            <a
              href="https://meutudo.com.br/blog/o-que-e-financiamento/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>🏠</p>
              <p className="p-titulo1">Financiamento</p>
              <p>Casa própria e simulações</p>
            </a>
          </div>

          <div className="biblioteca-cards">
            <a
              href="https://www.serasa.com.br/blog/o-que-e-renda-passiva/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>📈</p>
              <p className="p-titulo1">Renda Passiva</p>
              <p>Renda Passiva</p>
            </a>
          </div>

          <div className="biblioteca-cards">
            <a
              href="https://blog.avantiopenbanking.com.br/metas-financeiras/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>🎯</p>
              <p className="p-titulo1">Metas Financeiras</p>
              <p>Como definir e alcançar objetivos</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explicacoes;
