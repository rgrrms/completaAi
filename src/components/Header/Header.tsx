import React from "react";
import LogoMarca from "../../assets/Completa_aí_Logotipo.svg";
import "./Header.css";
import {clearStorage} from "../../constants/helpers";

interface IHeader {
  exit: boolean
}

const Header: React.FC<IHeader> = ({ exit }) => {

  const onHandleExit = () => {
    clearStorage();
    console.log(document)
    document.location.href = '/auth';
  }

  return (
    <>
      <div className="line" />
      <div className="lineImages">
        <img src={LogoMarca} alt="LogoMarca completa ai" className="logoMarca" />
        <span className="titleHeader">Não fique pelo caminho, Completa Ai!</span>
      </div>
      <div className="line" />
      {exit ?
        <div className="divExitButton">
          <button className="exitButton" onClick={onHandleExit}>Sair</button>
        </div> : null
      }
    </>
  );
}

export default Header;
