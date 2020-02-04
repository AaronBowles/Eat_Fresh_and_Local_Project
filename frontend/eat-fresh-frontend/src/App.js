import React, { Component } from 'react';
import { Link, Route, Switch} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Home from "./components/Home/Home";
import Market from "./components/Market/Market";
//import ShowPage from "./components/ShowPage/ShowPage";
import Axios from 'axios';
//import { throwStatement } from '@babel/types';





class App extends Component {
  constructor(state) {
    super(state);
    this.state = {
      region: "",
      season: "",
      produce:"",
      produceInSeason: null,
      path:"/"
      // localMarkets: [{"id": "Error"}],
      // zip: "",
      // marketDetails:null,
      // marketProducts:null
      
    };
  }
  
  componentDidMount() {
    Axios.get('https://eatfreshandlocalapp.herokuapp.com/produces')
    .then(res => {
      console.log(res.data);
      this.setState({produce: res.data});
    });
  };
  
  componentDidUpdate(prevProps, prevState){
   
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
    
    // if(this.state.marketDetails !== null){

    //  this.showMarketModal();
    // }
 
  }

  setRegion = event => {
      //console.log(event.target.innerHTML);
   this.setState({region: event.target.name})
  }

  setSeason = event => {
   this.setState({season: event.target.innerHTML})
  }

  marketPath = () => {
    this.setState({path: "/market"})
  }

  homePath = () => {
    this.setState({path: "/" })
  }




  render() {


    return (
      <div>
        <header>
          <div className="headerDiv">
            <div className="imgCrop">
              <img className="headerImage" src={"/images/vegetableBackground.png"}/>
            </div>
        
              <h1 className="title"> Eat Fresh and Local </h1>
    
          <nav className="navBar">
            <Link className="homeLink" to="/" onClick={this.homePath}>Home </Link>
            <Link className="marketLink" to ="/market" onClick={this.marketPath}> Find a Market Near You </Link>
          </nav>
          </div>
        </header>

        {this.state.path === "/" ? (
        <div className="seasonAndRegion">
        <div className="paramHeader">
          <h3> Select your region and season of interest and see what is in season! </h3>
        </div>
          <div className="region">

            <button className="regionButton" onClick={this.setRegion} name="NW">Northwest</button>
            <button className="regionButton" onClick={this.setRegion} name="NE">Northeast</button>
            <button className="regionButton" onClick={this.setRegion} name="MW">Midwest</button>
            <button className="regionButton" onClick={this.setRegion} name="SW">Southwest</button>
            <button className="regionButton" onClick={this.setRegion} name="SE">Southeast</button>
          </div>
          <div className="season">
            <button className="seasonButton" onClick={this.setSeason}>Spring</button>
            <button className="seasonButton" onClick={this.setSeason}>Summer</button>
            <button className="seasonButton" onClick={this.setSeason}>Fall</button>
            <button className="seasonButton" onClick={this.setSeason}>Winter</button>
          </div>
        </div>
        ) : (
          <div>
            </div>
        )
      }
 


        <main className="main">
          <Switch>
            <Route exact path="/" 
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
            {/* <Route path="/show" 
            //component={ShowPage} 
            render={props => (
              <ShowPage
              localMarkets={this.state.localMarkets}
              />
            )}
            /> */}
            <Route path="/market" render={props => (
              <Market
              path={this.state.path}
              
              />
            )}
            />
          </Switch>
        </main>

      </div>
    )
  }
}
export default App;