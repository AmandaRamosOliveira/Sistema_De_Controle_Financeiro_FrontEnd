import React from "react";
import logoTipo from "../assets/img/logoTipo.jpg";
import "../styles/global.css";
function Loading(){
    return(
        <div className="loading-container">
            <img src={logoTipo} alt="Logo tipo" width={350}/>
            <h2 className="h">Financial Management</h2>
            <h6 className="h">Sistema de Controle financeiro</h6>
        <div class="spinner-border text-success" role="status">
           <span class="visually-hidden">Loading...</span>
        </div>
            <div className="spinner"></div>
        </div>
    );
}
export default Loading;