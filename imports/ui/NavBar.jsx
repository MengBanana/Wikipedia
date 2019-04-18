import React, { Component } from "react";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";


export default class NavBar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{fontFamily:"Gloria Hallelujah"}}>
          <a className="navbar-brand" href="/"><h4>Exam</h4></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">     
            <div className="nav-item ml-auto signin">
              <AccountsUIWrapper />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
