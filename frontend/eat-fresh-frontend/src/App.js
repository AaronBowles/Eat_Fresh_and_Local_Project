import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home/Home";
import ShowPage from "./components/ShowPage/ShowPage";
import Axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      season: "",
      produce:"",
      produceInSeason: []
    };
  }

 componentDidMount() {
   Axios.get('http://localhost:8000/produces')
   .then(res => {
     console.log(res.data);
    this.setState({produce: res.data});
   });
 };

 setRegion = event => {
   //console.log(event.target.innerHTML);
   this.setState({region: event.target.name})
 }

 setSeason = event => {
   this.setState({season: event.target.innerHTML})
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
      </div>
    )
  }
}
export default App;