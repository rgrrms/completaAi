import React, {useState} from "react";
import './Login.css';
import api from "../../services/service";
import {setOnStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import {Link} from "react-router-dom";

interface IRegister {
  onHandleAction: (e: any, act: string) => void;
}

const Login: React.FC<IRegister> = ({onHandleAction}) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [checkedAdmin, setCheckedAdmin] = useState<boolean>(false);

  const onHandleLogin = (e: any) => {
    e.preventDefault();
    let uriTypeLogin = 'login';
    if (!email || !pass) {
      alert("Os campos Email e Senha são obrigatorios!")
    } else {
      const data = {email, pass};
      if (checkedAdmin) uriTypeLogin = 'loginAdmin';
      api.post(uriTypeLogin, data).then(resp => {
        console.log(resp);
        setOnStorage(STORAGE_KEYS.TOKEN, resp.data.token);
        setOnStorage(STORAGE_KEYS.USER, email);
        setOnStorage(STORAGE_KEYS.AUTH, resp.data.auth);
        if (checkedAdmin) {
          setOnStorage(STORAGE_KEYS.HAS_PERMISSION, 2);
          document.location.href = '/admin'
        }
        else {
          setOnStorage(STORAGE_KEYS.HAS_PERMISSION, 1);
          setOnStorage(STORAGE_KEYS.USER_ID, resp.data.userId);
          document.location.href = '/';
        }
      });
    }
  }

  const onHandleLoginAdmin = () => {
    setCheckedAdmin(!checkedAdmin);
  }

  return (
    <form className="formLogin">
      <div className="adminLogin">
        <input type="checkbox" onChange={onHandleLoginAdmin} checked={checkedAdmin} />
        <label>Administrador</label>
      </div>
      <input value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
      <input value={pass} placeholder="Senha" onChange={(e) => setPass(e.target.value)}/>
      <div>
        <button onClick={onHandleLogin}>Login</button>
        <button onClick={(e) => onHandleAction(e,"CADASTRAR")}>Cadastrar</button>
      </div>
    </form>
  )
}

export default Login;
