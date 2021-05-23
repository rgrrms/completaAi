import React from "react";
import "./Modal.css"

interface IModal {
  children: any
}

const Modal: React.FC<IModal> = ({ children }) => {
  return (
    <div className="modal">
      <div className="containerModal">
        {children}
      </div>
    </div>
  )
}

export default Modal;
