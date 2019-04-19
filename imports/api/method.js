import {Meteor} from "meteor/meteor";
import axios from "axios";

if (Meteor.isServer) {
  

  Meteor.methods({

    "getwiki"(term) {
      var wikipedia = require("node-wikipedia");
      return new Promise((resolve, reject) => {
        wikipedia.page.data(term, { content: true }, resolve);
      });
    }
  });  

}









