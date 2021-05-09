import React from "react";

import './Home.css'
import Actions from "../../components/Actions/Actions";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <div className="homeContainer">
      <Header />
      <div className="cards">
        <div className="cardLogin">
          <Actions />
        </div>
      </div>
    </div>
  )
}

export default Home;
