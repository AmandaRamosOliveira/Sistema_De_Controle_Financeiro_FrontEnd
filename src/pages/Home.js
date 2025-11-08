import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/global.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      <div className="home-content">
        <div className="card text-center">
          <h2>
            "Aprender a administrar o dinheiro é transformar cada escolha em um
            passo seguro rumo aos seus sonhos."
          </h2>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
