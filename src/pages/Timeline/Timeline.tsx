import React from "react";
import Header from "../../components/Header/Header";
import "./Timeline.css"
import Solicitation from "../../components/Solicitation/Solicitation";

const Timeline = () => {
  return (
    <div className="timelineContainer">
      <Header exit={true}/>
      <p className="timelineTitle">Solicitação</p>
      <Solicitation />
    </div>
  );
}

export default Timeline;
