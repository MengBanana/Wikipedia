import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import "../api/method.js";

export default class Wikipedia extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      search:"",
      content:"",
      links:[]
    };
  }

  componentDidMount() {
    this.wiki(this.state.search);
  }

  onChange(e){
    this.setState(
      {
        [e.target.id]: e.target.value
      }
    );
  }

  wiki() {
    Meteor.call("getwiki", (err, res) => {
      if (err) {
        this.setState({
          err
        });
        return;
      }
      console.log("got data", res);
      this.setState({
        content: res,
        links: res.links
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.wiki(this.state.search);
  }

  render() {

    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="search">Search...</label>
            <input type="text" className="form-control" id="search" placeholder="wiki" onChange= {this.onChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-warning" onClick={this.onSubmit.bind(this)}>Submit</button>
        </form>
        <div>
          {this.state.links.map(l => <p key={l["*"]}>{l["*"]}</p>)}
        </div>
      </div>
    );
  }
}
