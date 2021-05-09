import React, {useEffect, useState} from "react";
import "./History.css"
import api from "../../services/service";
import {getFromStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import {IServices} from "../../types/services";

const History = () => {
  const [services, setServices] = useState<IServices[]>();
  const [cars, setCars] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    api.get("order", { headers: { "x-access-token": getFromStorage(STORAGE_KEYS.TOKEN) }}).then(resp => {
      console.log(resp.data.carros[0])
      console.log(resp.data.servicos[0])
      console.log(resp.data.enderecos[0])
      setCars(resp.data.carros[0]);
      setAddress(resp.data.enderecos[0]);
      setServices(resp.data.servicos[0]);
    });
  }, []);

  return (
    <>
      <table className="historyTable">
        <thead>
        <tr>
          <th>Status</th>
          <th>Rua</th>
          <th>Numero</th>
          <th>Placa</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          {services?.map(service => {
            return (
              <td>service.status</td>
            )
          })}

          <td>Smith</td>
          <td>50</td>
          <td>ABC-DES</td>

          <td>Concluido</td>
          <td>Jackson</td>
          <td>94</td>
          <td>ABC-123</td>
        </tr>
        </tbody>
      </table>
    </>
  )
}

export default History;
