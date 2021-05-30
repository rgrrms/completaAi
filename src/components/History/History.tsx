import React, {useEffect, useState} from "react";
import "./History.css"
import api from "../../services/service";
import {getFromStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import {IServices} from "../../types/oreder";

interface IUpdate {
  updateList: boolean;
  setUpdateList: (e: boolean) => void;
  setIsOpenModal: (e: any) => void;
  setValueModal: (e: any) => void;
}

const History: React.FC<IUpdate> = ({updateList, setUpdateList, setIsOpenModal, setValueModal}) => {
  const [services, setServices] = useState<IServices[]>();

  useEffect(() => {
    if (updateList === true) {
      api.get("order").then(resp => {
        console.log(resp.data)
        setServices(resp.data);
      });
      setUpdateList(false);
    }
  }, [updateList, setUpdateList]);

  const onHandleModalOpen = (value: string) => {
    setValueModal(value);
    setIsOpenModal(true)
  }

  return (
    <>
      <table className="historyTable">
        <thead>
          <tr>
            <th>Status</th>
            <th>Litros</th>
            <th>Valor</th>
            <th>Rua</th>
            <th>Numero</th>
            <th>Modelo</th>
            <th>Placa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services?.map(service => {
            return (
              <tr key={service._id}>
                <td>{service.status}</td>
                <td>{service.amountFuel}</td>
                <td>R$ {service.payment}</td>
                <td>{service.address.street}</td>
                <td>{service.address.number}</td>
                <td>{service.car.carModel}</td>
                <td>{service.car.license}</td>
                {service.status === "Aguardando Pagamento" ? <td><button className="buttonPayList" onClick={() => onHandleModalOpen(service.payment)}>Pagar</button></td> : null}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default History;
