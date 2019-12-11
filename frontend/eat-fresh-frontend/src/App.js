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

  // setZip = event => {
  //  console.log(event.target.value)
  //  this.setState({zip: event.target.value})

  // }

  // findMarket = () => {
  //  Axios.get("https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip="+ this.state.zip)
  //  .then(res => {
  //    console.log(res.data.results)
  //    this.setState({localMarkets: res.data.results})
  //  })
   
  // }

  // hideMarket = () => {
  //   this.setState({localMarkets: [{"id": "Error"}]})
  //   document.getElementsByClassName("zipInput")[0].value = ""
  // }

  // getMarketDetail = event=> {
  //   console.log(event.target.innerHTML)
  //   let market = this.state.localMarkets.find( 
  //     name => name.marketname === event.target.innerHTML) 
  //     console.log(market)
  //   Axios.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + market.id)
  //   .then(res => {
  //     console.log(res.data.marketdetails)
  //     this.setState({marketDetails: res.data.marketdetails})
     
  //   })
  // }

  // showMarketModal = () => {
  //   let marketModal = document.getElementsByClassName("marketModal");
  //   marketModal[0].style.display = "block";
  // }

  // closeMarketModal = event => {
  //   let marketModal = document.getElementsByClassName("marketModal");
  //   marketModal[0].style.display = "none";
  // }


  render() {
    // let marketsList = null
    // if(this.state.localMarkets[0].id !== "Error"){
    //   marketsList = this.state.localMarkets.map(item => {
    //     return (
    //       <div>
    //             <h4 className="markets" onClick={this.getMarketDetail}>{item.marketname}</h4>
    //         </div>
    //     )
    //   })
    // }

    return (
      <div>
        <header>
          <h1 className="title"> Eat Fresh and Local </h1>
          <nav>
            <Link to="/" onClick={this.homePath}>Home </Link>
            <Link to ="/market" onClick={this.marketPath}> Find a Market Near You </Link>
          </nav>
        </header>

        <div>
          <h3> Select your region and season of interest and see what is in season! </h3>
        </div>
        {this.state.path === "/" ? (
        <div>
          <div className="region">

            <button onClick={this.setRegion} name="NW">Northwest</button>
            <button onClick={this.setRegion} name="NE">Northeast</button>
            <button onClick={this.setRegion} name="MW">Midwest</button>
            <button onClick={this.setRegion} name="SW">Southwest</button>
            <button onClick={this.setRegion} name="SE">Southeast</button>
          </div>
          <div className="season">
            <button onClick={this.setSeason}>Spring</button>
            <button onClick={this.setSeason}>Summer</button>
            <button onClick={this.setSeason}>Fall</button>
            <button onClick={this.setSeason}>Winter</button>
          </div>
        </div>
        ) : (
          <div>
            </div>
        )
      }
 


        <main>
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
            <Route path="/market" component= {Market}/>
          </Switch>
        </main>
        <div>
      
         {/*<h3>Find a farmer's market near you?</h3>
          <input className="zipInput" onChange={this.setZip} type="text" placeholder="enter a zipcode"/>
          <button onClick={this.findMarket}>Enter</button>
          <button onClick={this.hideMarket}>Hide Markets</button>

          {this.state.localMarkets[0].id !== "Error" ? (
          <div>
            <h3></h3>
            <h4>{marketsList}</h4>
          </div>

          ):(
            <div>
              
            </div>
          )} */}
        </div>

        {/* <div className="marketModal">
          <div className="marketModal-container">
            {this.state.marketDetails !== null ? (
              <div>
                <h3> Address: {this.state.marketDetails.Address} </h3>
                <h3> Schedule: {this.state.marketDetails.Schedule.split(";").shift()}</h3>
                <h3> Products: {this.state.marketDetails.Products}</h3>
                <h3> Link: <a href={this.state.marketDetails.GoogleLink}>learn more</a></h3>
                <button onClick={this.closeMarketModal}>exit </button>
              </div>
            ):(
              <div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    )
  }
}
export default App;