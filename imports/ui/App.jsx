import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import NavBar from "./NavBar";
import Footer from "./Footer.jsx";
import Wikipedia from "./Wikipedia.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Wikipedia />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withTracker(() => {
  return ({
    user:Meteor.user()
  });
})(App);


