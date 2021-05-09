import React from "react";
import Header from "../../components/Header/Header";
import NavButtons from "../../components/NavButtons/NavButtons";
import "./Timeline.css"
import Solicitation from "../../components/Solicitation/Solicitation";

const Timeline = () => {
  return (
    <div className="timelineContainer">
      <Header />
      <p className="timelineTitle">Solicitação</p>
      <Solicitation />
    </div>
  );
}

export default Timeline;
