import {Meteor} from "meteor/meteor";
import axios from "axios";

if (Meteor.isServer) {
  

  Meteor.methods({

    "getwiki"() {
      var wikipedia = require("node-wikipedia");
      return new Promise((resolve, reject) => {
        wikipedia.page.data("Austin Sarat", { content: true }, resolve);
      });
    }
  });  

}









