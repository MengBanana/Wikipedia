import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import "../api/method.js";

export default class Wikipedia extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      search:"",
      content:"",
      links:[],
      history:[],
      title: ""
    };
    this.renderLinks = this.renderLinks.bind(this);
    this.renderHistory = this.renderHistory.bind(this);
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

  wiki(search) {
    Meteor.call("getwiki", search, (err, res) => {
      if (err) {
        this.setState({
          err
        });
        return;
      }
      console.log("got data", res);
      this.setState({
        links: res.links,
        content: res.text["*"],
        title: search,
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      // history: [this.state.search]
    });
    this.wiki(this.state.search);
  }

  renderHistory() {
    return this.state.history.map(l => 
      <button key={l} onClick={()=> {
        this.setState({

          history: this.state.history.slice(0, this.state.history.indexOf(l))
        });
        this.wiki(this.state.title);
      }}><h6><span className="badge badge-secondary">
          {l}</span></h6></button>);

  }


  renderLinks() {
    return this.state.links.slice(0,99).map(l => 
      <button key={l["*"]} onClick={()=> {
        this.setState({
          title:l["*"],
          history: [...this.state.history, this.state.title]
        });
        this.wiki(l["*"]);
      }}><h6><span className="badge badge-secondary">
          {l["*"]}</span></h6></button>);
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
        <div className="history container part">
          <h1>History</h1>
          {this.renderHistory()}
        </div>
        
        <div className="links container part">
          <h1>Links</h1>
          {this.renderLinks()}
        </div>
        <div className="content container part">
          <h1>Content: {this.state.title}</h1>
          <span dangerouslySetInnerHTML={{__html: this.state.content}}></span>
        </div>
      </div>
    );
  }
}
