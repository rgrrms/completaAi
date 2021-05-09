import React, {useState} from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import "./Actions.css"

const Actions: React.FC = () => {
  const [action, setAction] = useState<string>('LOGIN');

  const onHandleAction = (event: any,act: string) => {
    event.preventDefault();
    setAction(act);
  }

  return (
    <div className={action === "LOGIN" ? "actionContainer loginAction" : "actionContainer registerAction" }>
      {action === 'LOGIN' ?
        <Login onHandleAction={onHandleAction}/>
        :
        <Register onHandleAction={onHandleAction}/>
      }
    </div>
  );
}

export default Actions;
