import React, {useEffect, useState} from "react";
import "./Solicitation.css"
import History from "../History/History";
import api from "../../services/service";
import {getFromStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import ModalPayment from "../Modal/Modal";

const Solicitation = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(0);
  const [complement, setComplement] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [service, setService] = useState('Abastecer');
  const [fuel, setFuel] = useState('');
  const [liters, setLiters] = useState('');
  const [license, setLicense] = useState('');
  const [color, setColor] = useState('');
  const [carModel, setCarModel] = useState('');

  const [valueModal, setValueModal] = useState(0);

  const [updateList, setUpdateList] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    api.get(`car/${getFromStorage(STORAGE_KEYS.USER_ID)}`).then(resp => {
      console.log(resp.data)
      setLicense(resp.data.license);
      setColor(resp.data.color);
      setCarModel(resp.data.carModel);
    });
  }, []);

  const onHandleCreateRequest = (e: any) => {
    e.preventDefault();
    if (!state || !city || !street || !number || !zipCode || !service || !fuel || !liters || !license || !carModel || !color ) {
      alert("Todos os campos são obrigatorios!")
    } else {
      const data = {
        service,
        fuelType: fuel,
        amountFuel: liters,
        car: {
          license,
          carModel,
          color
        },
        address: {
          state,
          city,
          street,
          number,
          complement,
          zipCode
        }
      };
      setValueModal(Number(liters) * 5);
      api.post("createOrder", data, { headers: { "x-access-token": getFromStorage(STORAGE_KEYS.TOKEN) }})
        .then(resp => {
          console.log(resp);
          console.log(resp.status);
          if (resp.status === 200) {
            setUpdateList(true);
            setState('');
            setState('');
            setCity('');
            setStreet('');
            setNumber(0);
            setComplement('');
            setZipCode('');
            setFuel('');
            setLiters('');
            setCarModel('');
            setLicense('');
            setColor('');
            setIsOpenModal(true);
          }
        });
    }
  }

  return (
    <>
      <div className="solicitationContainer">
        <div className="solicitation">
          <div>
            <label>Endereço</label>
            <input placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)}/>
            <input placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)}/>
            <input placeholder="Rua" value={street} onChange={(e) => setStreet(e.target.value)}/>
            <input type="number" placeholder="Número" value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
            <input placeholder="Complemento" value={complement} onChange={(e) => setComplement(e.target.value)}/>
            <input placeholder="CEP" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
            <button onClick={onHandleCreateRequest}>Pagar</button>
          </div>
          <div>
            <label>Serviço</label>
            <input placeholder="Serviço" value={service} disabled={true}/>
            <input placeholder="Combustível" value={fuel} onChange={(e) => setFuel(e.target.value)}/>
            <input placeholder="Litros" value={liters} onChange={(e) => setLiters(e.target.value)}/>
            <label>Carro</label>
            <input placeholder="Modelo" value={carModel} onChange={(e) => setCarModel(e.target.value)}/>
            <input placeholder="Placa" value={license} onChange={(e) => setLicense(e.target.value)}/>
            <input placeholder="Cor" value={color} onChange={(e) => setColor(e.target.value)}/>
          </div>
        </div>
        <div className="lineVertical"/>
        <div>
          <History updateList={updateList} setUpdateList={setUpdateList} setIsOpenModal={setIsOpenModal} setValueModal={setValueModal} />
        </div>
      </div>
      {isOpenModal ? <ModalPayment>
        <h1>Efetue o Pagamento</h1>
        <p>Faça um pix no valor de R$ {valueModal} para a chave xxxx</p>
        <p>e mande o comprovante para o whatsapp (51) 99999-9999</p>
        <button onClick={() => setIsOpenModal(false)}>OK</button>
      </ModalPayment> : null}
    </>
  )
}

export default Solicitation;
