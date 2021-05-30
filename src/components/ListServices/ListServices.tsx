import React, {useEffect, useState} from "react";
import api from "../../services/service";
import {getFromStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import {IServices} from "../../types/oreder";
import ModalPayment from "../Modal/Modal";
import "./ListServices.css";

const ListServices = () => {
  const [services, setServices] = useState<IServices[]>();
  const [idSelected, setIdSelected] = useState('');
  const [statusToUpdate, setStatusToUpdate] = useState('');

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalPayment, setIsOpenModalPayment] = useState(false);
  const [updateList, setUpdateList] = useState(true);

  useEffect(() => {
    if (updateList) {
      api.get('allOrders').then(resp => {
        console.log(resp.data)
        setServices(resp.data);
      });
      setUpdateList(false)
    }
  }, [updateList]);

  const onUpdateService = (id: string, status: string) => {
    setIdSelected(id);
    setStatusToUpdate(status)
    setIsOpenModalPayment(true);
  }

  const onAskDelete = (id: string) => {
    setIdSelected(id);
    setIsOpenModalDelete(true);
  }

  const onHandlePayment = () => {
    let status = statusToUpdate === "Aguardando Pagamento" ? "Em atendimento" : "Finalizado";
    api.put(`updateOrder/${idSelected}`, {status: status}).then(resp => {
      console.log(resp.data)
      if (resp.status === 200) {
        alert("Status atualizado com sucesso!")
        setIsOpenModalPayment(false);
        setUpdateList(true);
      }
    });
  }

  const onHandleDelete = () => {
    api.delete(`deleteOrder/${idSelected}`).then(resp => {
      console.log(resp.data)
      if (resp.status === 200) {
        alert("Solicitação excluida com sucesso!")
        setIsOpenModalDelete(false);
        setUpdateList(true);
      }
    });
  }

  return (
    <>
      <table>
        <thead>
        <tr>
          <th>Codigo</th>
          <th>Status</th>
          <th>Quantidade</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Rua</th>
          <th>Numero</th>
          <th>Placa</th>
          <th>Codigo Cliente</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {services?.map(service => {
          return (
            <tr key={service._id}>
              <td>{service._id}</td>
              <td>{service.status}</td>
              <td>{service.amountFuel}</td>
              <td>{service.payment}</td>
              <td>{service.fuelType}</td>
              <td>{service.address.street}</td>
              <td>{service.address.number}</td>
              <td>{service.car.license}</td>
              <td>{service.idUser}</td>
              <td><button className="buttonListServiceAction" onClick={() => onUpdateService(service._id, service.status)}>Paga</button></td>
              <td><button className="buttonListServiceAction" onClick={() => onAskDelete(service._id)}>Exlcuir</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>

      {isOpenModalPayment ? <ModalPayment>
        {statusToUpdate === "Aguardando Pagamento" ?
          <>
            <h1>A solicitação foi paga?</h1>
            <p>Você deseja iniciar o atendimento?</p>
          </>
          :
          <>
            <h1>A solicitação foi concluida?</h1>
            <p>Você deseja finalizar o atendimento?</p>
          </>
        }
        <div className="buttonsModal">
          <button onClick={onHandlePayment}>Sim</button>
          <button onClick={() => setIsOpenModalPayment(false)}>Não</button>
        </div>
      </ModalPayment> : null}

      {isOpenModalDelete ? <ModalPayment>
        <h1>Exlcuir a Solicitação</h1>
        <p>Você deseja realmente excluir essa solicitação</p>
        <div className="buttonsModal">
          <button onClick={onHandleDelete}>Sim</button>
          <button onClick={() => setIsOpenModalDelete(false)}>Não</button>
        </div>
      </ModalPayment> : null}
    </>
  )
}

export default ListServices;
