import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home/Home";
import ShowPage from "./components/ShowPage/ShowPage";
import Axios from 'axios';
class App extends Component {
  constructor(state) {
    super(state);
    this.state = {
      region: "",
      season: "",
      produce:"",
      produceInSeason: null,
      localMarkets: "",
      zip: ""
    };
  }

 componentDidMount() {
   Axios.get('http://localhost:8000/produces')
   .then(res => {
     console.log(res.data);
    this.setState({produce: res.data});
   });
 };

 componentDidUpdate(prevProps, prevState){
  console.log(prevState)
  if(prevState.region !== this.state.region || prevState.season !==  this.state.season){
     this.setState({produceInSeason: null})
    if(this.state.region !== "" && this.state.season !== ""){
      let inSeason =[];
      for(let i=0; i < this.state.produce.length; i++){
          for(let j=0; j < this.state.produce[i].seasonAndRegion[this.state.season].length; j++){
          //console.log(this.state.produce[i].seasonAndRegion[this.state.season])
              if(this.state.produce[i].seasonAndRegion[this.state.season][j] === this.state.region){
                inSeason.push(this.state.produce[i])
                console.log(inSeason)
              }
          }
      }
      if(inSeason.length > 0){
      this.setState({produceInSeason: inSeason})
      }
    }
  }
 }

 setRegion = event => {
   //console.log(event.target.innerHTML);
   this.setState({region: event.target.name})
 
 }

 setSeason = event => {
   this.setState({season: event.target.innerHTML})
 }

 setZip = event => {
   console.log(event.target.value)
   this.setState({zip: event.target.value})

 }

 findMarket = () => {
   Axios.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip="+ this.state.zip)
   .then(res => {
     console.log(res.data.results)
     this.setState({localMarkets: res.data.results})
   })
 }

  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <div>

          <button onClick={this.setRegion} name="NW">Northwest</button>
          <button onClick={this.setRegion} name="NE">Northeast</button>
          <button onClick={this.setRegion} name="MW">Midwest</button>
          <button onClick={this.setRegion} name="SW">Southwest</button>
          <button onClick={this.setRegion} name="SE">Southeast</button>
        </div>
        <div>

          <button onClick={this.setSeason}>Spring</button>
          <button onClick={this.setSeason}>Summer</button>
          <button onClick={this.setSeason}>Fall</button>
          <button onClick={this.setSeason}>Winter</button>
        </div>


        <main>
          <Switch>
            <Route path="/" 
            //component={Home}
            render={props => (
              <Home
                region={this.state.region}
                season={this.state.season}
                produce={this.state.produce}
                produceInSeason={this.state.produceInSeason}
                />
            )}
            />
            <Route path="/show" component={ShowPage} />
          </Switch>
        </main>
        <div>
          <h3>Find a farmer's market near you!</h3>
          <input onChange={this.setZip} type="text" placeholder="enter a zipcode"/> <button onClick={this.findMarket}>enter</button>
        </div>
      </div>
    )
  }
}
export default App;