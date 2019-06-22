import React, { Component } from "react";
import "./Home.css";
import GlueStick from '../Icons/GlueStick.js';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Acapana</h1>
          <GlueStick width="140px" height="140px" />
          <p>Create a list of WikiData items</p>
        </div>
      </div>
    );
  }
}
