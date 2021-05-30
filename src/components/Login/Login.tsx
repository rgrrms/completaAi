import React, {FormEvent, useState} from "react";
import './Login.css';
import api from "../../services/service";
import {setOnStorage} from "../../constants/helpers";
import {STORAGE_KEYS} from "../../constants/constantes";
import {emailMask} from "../../constants/utils/maks";

interface IRegister {
  onHandleAction: (e: any, act: string) => void;
}

const Login: React.FC<IRegister> = ({onHandleAction}) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [checkedAdmin, setCheckedAdmin] = useState<boolean>(false);

  const onHandleLogin = async (event: FormEvent) => {
    console.log('aaaaaa')
    console.log(event);
    event.stopPropagation();
    event.preventDefault();
    let uriTypeLogin = 'login';
    if (!email || !pass) {
      alert("Os campos Email e Senha são obrigatorios!")
    } else if (!emailMask(email)) {
      alert("Verifique o formato do email!");
    } else {
      const data = {email, pass};
      if (checkedAdmin) uriTypeLogin = 'loginAdmin';
      api.post(uriTypeLogin, data).then(resp => {
        console.log(resp);
        if (resp.status === 401) {
          alert("ERROU")
        }
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
      }).catch(e => {
        alert("Email ou senha incorreto!");
      });
    }
  }

  const onHandleLoginAdmin = () => {
    setCheckedAdmin(!checkedAdmin);
  }

  const onHandleBlur = (e: any) => {
    console.log(e.target.value)
    const validate = emailMask(e.target.value);
    console.log(validate)
  }

  return (
    <form className="formLogin" onSubmit={onHandleLogin}>
      <div className="adminLogin">
        <input type="checkbox" onChange={onHandleLoginAdmin} checked={checkedAdmin} />
        <label>Administrador</label>
      </div>
      <input className="inputEmailLogin" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} onBlur={onHandleBlur}/>
      <input type="password" value={pass} placeholder="Senha" onChange={(e) => setPass(e.target.value)}/>
      <div>
        <button type="submit">Login</button>
        <button onClick={(e) => onHandleAction(e,"CADASTRAR")}>Cadastrar</button>
      </div>
    </form>
  )
}

export default Login;
