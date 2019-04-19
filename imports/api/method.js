import {Meteor} from "meteor/meteor";
import wikipedia from "node-wikipedia";
import axios from "axios";


if (Meteor.isServer) {
  

  Meteor.methods({
    "getwiki"(term) {
      return new Promise((resolve, reject) => {
        wikipedia.page.data(term, { content: true }, resolve);
      });
    }
  });  

}









