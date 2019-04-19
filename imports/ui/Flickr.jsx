import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import "../api/method.js";

export default class Flickr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos:[],
      err:"", 
      search:"car"
    };
  }

  componentDidMount() {
    console.log("cdm");
    this.flickrApi(this.state.search);
    /*fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b839194d31fa92107cbb9bd8994c792&text=cat&format=json&nojsoncallback=1")
      .then(data => data.json())
      .then(jsonData => {
        console.log("got data", jsonData);
        this.setState({
          photos: jsonData.photos.photo
        })
      })
      .catch(err => this.setState({
        err
      }));*/
  }

  onChange(e){
    this.setState(
      {
        [e.target.id]: e.target.value
      }
    );
  }

  flickrApi(search) {
    Meteor.call("getData",{search:search}, (err, res) => {
      if (err) {
        this.setState({
          err
        });
        return;
      }
      console.log("got data", res);
      this.setState({
        photos: res
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.flickrApi(this.state.search);
  }

  getURL(p) {
    return `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_s.jpg`;
  }

  renderPhotos() {
    if (this.state.photos === []) {
      return;
    }
    return this.state.photos.map(a => a.photos.photo.slice(0, 28).map(p =>
      <img
        key={p.id}
        src={this.getURL(p)}
        alt={p.title}
      />));
  }

  render() {



    return (
      <div>
        { this.state.err ? <div>Error! {this.state.err}</div> : ""}
        <h1>Flickr</h1>
        <form>
          <div className="form-group">
            <label htmlFor="search">Search...</label>
            <input type="text" className="form-control" id="search" placeholder="car" onChange= {this.onChange.bind(this)} />
            <small id="searchHelp" className="form-text text-muted">Search and get rainbow~~~</small>
          </div>
          <button type="submit" className="btn btn-warning" onClick={this.onSubmit.bind(this)}>Submit</button>
        </form>
        <div id="content">
          {
            this.renderPhotos()
          }
        </div>

      </div>
    );
  }
}
