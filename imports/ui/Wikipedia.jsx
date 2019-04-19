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
      history:[]
    };
    // this.handleRirect = this.handleRirect.bind(this);
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
        history: this.history.contact[search]
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
    	history: [this.state.search]
    })
    this.wiki(this.state.search);
  }

 /* handleRirect(redirect){
  	this.setState({
  		search:redirect
  	})
  	this.wiki(this.state.search);
  }*/

  renderLinks() {
  	return this.state.links.slice(0,99).map(l => 
  		<button key={l["*"]} onClick={()=> {
  			this.setState({
  				history:this.state.history.concat([l["*"]])
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
        <div className="history container">
          <h1>History</h1>
          {this.state.history.slice(0,99).map(l => <h6 key={l["*"]}><span className="badge badge-secondary">{l["*"]}</span></h6>)}
        </div>
        
        <div className="links container">
          <h1>Links</h1>
          {this.renderLinks()}
        </div>
        <div className="content container">
          <h1>Content: {this.state.search}</h1>
          <span dangerouslySetInnerHTML={{__html: this.state.content}}></span>
        </div>
      </div>
    );
  }
}
