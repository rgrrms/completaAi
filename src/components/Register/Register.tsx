import React, {useState} from "react";
import api from "../../services/service";

import "./Register.css"
import {cpfMask, dataMask, emailMask, phoneMask, plateMercosul} from "../../constants/utils/maks";
import {setOnStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";

interface IRegister {
  onHandleAction: (e: any, act: string) => void;
}

const Register: React.FC<IRegister> = ({onHandleAction}) => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [cell, setCell] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [license, setLicense] = useState<string>('');
  const [carModel, setCarModel] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const onHandleRegister = (e: any) => {
    console.log("cadastrei")

    e.preventDefault();
    if (!name || !cpf || !cell || !birthDate || !email || !pass || !license || !carModel || !color) {
      alert("Todos os campos são obrigatorios!")
    } else if (!emailMask(email)) {
      alert("Verifique o formato do email!");
    } else {
      const data = {name, cpf, cell, birthDate, email, pass, license, carModel, color};
      api.post('createAccount', data).then(resp => {
        console.log(resp);
        setOnStorage(STORAGE_KEYS.TOKEN, resp.data.token);
        setOnStorage(STORAGE_KEYS.USER, email);
        setOnStorage(STORAGE_KEYS.AUTH, resp.data.auth);
        setOnStorage(STORAGE_KEYS.USER_ID, resp.data.userId);
        document.location.href = '/';
      });
    }
  }

  return (
    <form className="formRegister">
      <label>Informações do Cliente</label>
      <input value={name} placeholder="Nome" onChange={(e) => setName(e.target.value)}/>
      <input value={cpf} placeholder="CPF" onChange={(e) => setCpf(cpfMask(e.target.value))}/>
      <input type="email" value={cell} placeholder="Telefone" onChange={(e) => setCell(phoneMask(e.target.value))}/>
      <input value={birthDate} placeholder="Data de Nascimento" onChange={(e) => setBirthDate(dataMask(e.target.value))}/>
      <input value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" value={pass} placeholder="Senha" onChange={(e) => setPass(e.target.value)}/>
      <label>Informações do Automovel</label>
      <input value={carModel} placeholder="Modelo" onChange={(e) => setCarModel(e.target.value)}/>
      <input value={license} placeholder="Placa" onChange={(e) => setLicense(plateMercosul(e.target.value))}/>
      <input value={color} placeholder="Cor" onChange={(e) => setColor(e.target.value)}/>
      <div>
        <button onClick={onHandleRegister}>Cadastrar</button>
        <button onClick={(e) => onHandleAction(e,"LOGIN")}>Voltar</button>
      </div>
    </form>
  );
}

export default Register;
