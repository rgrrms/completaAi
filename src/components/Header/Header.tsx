import React from "react";
import LogoMarca from "../../assets/Completa_aí_Logotipo.svg";
import Logotipo from "../../assets/completa_ai_logoMarca.png";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="line" />
      <div className="lineImages">
        <img src={LogoMarca} alt="LogoMarca completa ai" className="logoMarca" />
        <span className="titleHeader">Não fique pelo caminho, Completa Ai!</span>
      </div>
      <div className="line" />
    </>
  );
}

export default Header;
