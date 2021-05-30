import React, {useEffect, useState} from "react";
import api from "../../services/service";
import {getFromStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import {ICustomers} from "../../types/customers";
import ModalPayment from "../Modal/Modal";
import "./Customers.css";

const Customers = () => {
  const [idDelete, setIdDelete] = useState('');
  const [customers, setCustomers] = useState<ICustomers[]>();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateList, setUpdateList] = useState(true);

  useEffect(() => {
    if (updateList) {
      api.get('/listAllUsers').then(resp => {
        console.log(resp.data)
        setCustomers(resp.data);
      });
      setUpdateList(false);
    }
  }, [updateList]);

  const onAskDelete = (id: string) => {
    setIdDelete(id);
    setIsOpenModal(true);
  }

  const onHandleDelete = () => {
    api.delete(`deleteUser/${idDelete}`).then(resp => {
      console.log(resp.data)
      if (resp.status === 200) {
        alert("Usuário excluido com sucesso!")
        setIsOpenModal(false);
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
          <th>Nome</th>
          <th>CPF</th>
          <th>Email</th>
          <th>Telefone</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {customers?.map(customer => {
          return (
            <tr key={customer._id}>
              <td>{customer._id}</td>
              <td>{customer.name}</td>
              <td>{customer.cpf}</td>
              <td>{customer.email}</td>
              <td>{customer.cell}</td>
              <td><button className="buttonCustomersAction" onClick={() => onAskDelete(customer._id)}>Exlcuir</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>

      {isOpenModal ? <ModalPayment>
        <h1>Exlcuir o Cliente</h1>
        <p>Você deseja realmente excluir o cliente</p>
        <div className="buttonsModal">
          <button onClick={onHandleDelete}>Sim</button>
          <button onClick={() => setIsOpenModal(false)}>Não</button>
        </div>
      </ModalPayment> : null}
    </>
  )
}

export default Customers;
