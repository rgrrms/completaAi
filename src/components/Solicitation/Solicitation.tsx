import React, {useEffect, useState} from "react";
import "./Solicitation.css"
import History from "../History/History";
import api from "../../services/service";
import {getFromStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";

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
  const [idCar, setIdCar] = useState('');

  useEffect(() => {
    api.get(`car/${getFromStorage(STORAGE_KEYS.USER_ID)}`).then(resp => {
      console.log(resp.data)
      setLicense(resp.data.license);
      setColor(resp.data.color);
      setCarModel(resp.data.carModel);
      setIdCar(resp.data._id);
    });
  }, []);

  const onHandleCreateRequest = (e: any) => {
    e.preventDefault();
    if (!state || !city || !street || !number || !zipCode || !service || !fuel || !liters) {
      alert("Todos os campos são obrigatorios!")
    } else {
      const data = {state, city, street, number, zipCode, service, fuelType: fuel, amountFuel: liters, idCar};
      api.post("createOrder", data, { headers: { "x-access-token": getFromStorage(STORAGE_KEYS.TOKEN) }})
        .then(resp => {
        console.log(resp);
      });
    }
  }

  return (
    <div className="solicitationContainer">
      <div className="solicitation">
        <label>Endereço</label>
        <input placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)}/>
        <input placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)}/>
        <input placeholder="Rua" value={street} onChange={(e) => setStreet(e.target.value)}/>
        <input type="number" placeholder="Número" value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
        <input placeholder="Complemento" value={complement} onChange={(e) => setComplement(e.target.value)}/>
        <input placeholder="CEP" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
        <label>Serviço</label>
        <input placeholder="Serviço" value={service} disabled={true}/>
        <input placeholder="Combustível" value={fuel} onChange={(e) => setFuel(e.target.value)}/>
        <input placeholder="Litros" value={liters} onChange={(e) => setLiters(e.target.value)}/>
        <label>Carro</label>
        <input placeholder="Modelo" value={carModel} disabled={true}/>
        <input placeholder="Placa" value={license} disabled={true}/>
        <input placeholder="Cor" value={color} disabled={true}/>
        <button onClick={onHandleCreateRequest}>Pagar</button>
      </div>
      <div className="lineVertical"/>
      <div>
        <History />
      </div>
    </div>
  )
}

export default Solicitation;
