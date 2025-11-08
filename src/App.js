import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Loading from "./pages/Loading"; 
import Home from "./pages/Home";
import Estudos from "./pages/Estudos";
import Contas from "./pages/Contas";
import Metas from "./pages/Metas";
import Dashboard from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";
import EsqueceuSenha from "./pages/EsqueceuSenha";


function App(){ 
  const [loading, setLoading] = useState(true); 

  useEffect(() => { 
   setTimeout(() => setLoading(false), 3000); 
  }, []); 

  if (loading){
    return <Loading/>;
  }
  

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estudos" element={<Estudos/>}/>
        <Route path="/relatorios" element={<Relatorios/>}/>
        <Route path="/esqueceu" element={<EsqueceuSenha/>}/>
        <Route path="/contas" element={<Contas/>}/>
        <Route path="/metas" element={<Metas/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
 );
    
} 
export default App;

















