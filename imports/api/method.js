import {Meteor} from "meteor/meteor";
// import {Mongo} from "meteor/mongo";
import axios from "axios";


if (Meteor.isServer) {
  /*Meteor.methods({
    "getData"() {
      return axios
        .get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b839194d31fa92107cbb9bd8994c792&text=cat&format=json&nojsoncallback=1")
        .then(data => {
          console.log("Got data", data.data);

          return data.data;
        });

    }
  });*/

  Meteor.methods({
    "getData"() {
      return axios
        .get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b839194d31fa92107cbb9bd8994c792&text=cat&format=json&nojsoncallback=1")
        .then(data => data.data);
    }
  });
  // axios 自动 get json
}









