import React, {useState} from "react";
import Header from "../../components/Header/Header";
import Customers from "../../components/Customers/Customers";
import ListServices from "../../components/ListServices/ListServices";
import './Admin.css';

const Admin = () => {
  const [whichList, setWhichList] = useState("CUSTOMERS");

  const onHandleAlterTable = () => {
    whichList === "CUSTOMERS" ? setWhichList("SERVICES") : setWhichList("CUSTOMERS");
  }

  return (
    <>
      <Header exit={true}/>
      <button className="alterTable" onClick={onHandleAlterTable} >{whichList === "CUSTOMERS" ? "Solicitações" : "Clientes"}</button>
      <div className="adminContainerTable">
        {whichList === "CUSTOMERS" ? <Customers /> : <ListServices />}
      </div>
    </>
  )
}

export default Admin;
