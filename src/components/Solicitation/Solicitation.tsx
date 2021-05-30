import React, {useEffect, useState} from "react";
import "./Solicitation.css"
import History from "../History/History";
import api from "../../services/service";
import {getFromStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import ModalPayment from "../Modal/Modal";
import {cepMask, plateMercosul} from "../../constants/utils/maks";
import axios from "axios";
import {IStateAndCity} from "../../types/stateAndCity";
import {typesFuel} from "../../constants/utils/typesFuel";
import {typesServices} from "../../constants/utils/typesServices";

const Solicitation = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState<number>();
  const [complement, setComplement] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [service, setService] = useState('');
  const [fuel, setFuel] = useState('');
  const [liters, setLiters] = useState<number>();
  const [license, setLicense] = useState('');
  const [color, setColor] = useState('');
  const [carModel, setCarModel] = useState('');

  const [valueModal, setValueModal] = useState(0);

  const [updateList, setUpdateList] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [listState, setListState] = useState<string[]>();
  const [listCity, setListCity] = useState<string[]>();

  const [listTypeFuel, setListTypeFuel] = useState<string[]>();
  const [listTypeServices, setListTypeServices] = useState<string[]>();

  useEffect(() => {
    api.get(`car/${getFromStorage(STORAGE_KEYS.USER_ID)}`).then(resp => {
      console.log(resp.data)
      setLicense(resp.data.license);
      setColor(resp.data.color);
      setCarModel(resp.data.carModel);
    });

    axios.get<IStateAndCity[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const stateNames = response.data.map(uf => uf.sigla + " - " + uf.nome).sort((a, b) => a.localeCompare(b));
      setListState(stateNames);
    });

    setListTypeServices(typesServices.sort((a, b) => a.localeCompare(b)));
    setListTypeFuel(typesFuel.sort((a, b) => a.localeCompare(b)));

  }, []);

  useEffect(() =>{
    if (state === '0'){
      return;
    }
    const uf = state.split("-")[0].trim();
    console.log(uf);
    axios.get<IStateAndCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome).sort((a, b) => a.localeCompare(b));
      setListCity(cityNames);
    });
  }, [state]);

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
      api.post("createOrder", data)
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
            setService('');
            setFuel('');
            setLiters(0);
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
            <select name="state" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="0">Selecione o estado</option>
              {listState?.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
            <select name="city" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="0">Selecione uma cidade</option>
              {listCity?.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <input placeholder="Rua" value={street} onChange={(e) => setStreet(e.target.value)}/>
            <input type="number" placeholder="Número" value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
            <input placeholder="Complemento" value={complement} onChange={(e) => setComplement(e.target.value)}/>
            <input placeholder="CEP" value={zipCode} onChange={(e) => setZipCode(cepMask(e.target.value))}/>
            <button onClick={onHandleCreateRequest}>Pagar</button>
          </div>
          <div>
            <label>Serviço</label>
            <select name="service" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="0">Selecione o serviço</option>
              {listTypeServices?.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <select name="fuel" value={fuel} onChange={(e) => setFuel(e.target.value)}>
              <option value="0">Selecione o combustível</option>
              {listTypeFuel?.map(fuel => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
            <input type="number" placeholder="Litros" value={liters} onChange={(e) => setLiters(Number(e.target.value))}/>
            <label>Carro</label>
            <input placeholder="Modelo" value={carModel} onChange={(e) => setCarModel(e.target.value)}/>
            <input placeholder="Placa" value={license} onChange={(e) => setLicense(plateMercosul(e.target.value))}/>
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
