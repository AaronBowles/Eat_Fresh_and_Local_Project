import React, { Component } from "react";
import Axios from 'axios';
import "./Market.css";


class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
        localMarkets: [{"id": "Error"}],
        zip: "",
        marketDetails:null,
        marketProducts:null,

    }

}
    setZip = event => {
       console.log(event.target.value)
        this.setState({zip: event.target.value})
    }

    findMarket = () => {
        Axios.get("https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip="+ this.state.zip)
        .then(res => {
          console.log(res.data.results)
          this.setState({localMarkets: res.data.results})
        })
        
       }
    
       hideMarket = () => {
        this.setState({localMarkets: [{"id": "Error"}]})
        document.getElementsByClassName("zipInput")[0].value = ""
        this.setState({zip: ""})
      }

      getMarketDetail = event=> {
        console.log(event.target.innerHTML)
        let market = this.state.localMarkets.find( 
          name => name.marketname === event.target.innerHTML) 
          console.log(market)
        Axios.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + market.id)
        .then(res => {
          console.log(res.data.marketdetails)
          this.setState({marketDetails: res.data.marketdetails})
         
        })
      }

      showMarketModal = () => {
        let marketModal = document.getElementsByClassName("marketModal");
        marketModal[0].style.display = "block";
      }
    
      closeMarketModal = event => {
        let marketModal = document.getElementsByClassName("marketModal");
        marketModal[0].style.display = "none";
        
      }
      componentDidUpdate(){
          if(this.state.marketDetails !== null && this.state.localMarkets[0].id !== "Error"){
              this.showMarketModal();
          }
      }

  render() {
    let marketsList = null
    if(this.state.localMarkets[0].id !== "Error"){
      marketsList = this.state.localMarkets.map(item => {
        return (
          <div>
                <h4 className="markets" onClick={this.getMarketDetail}>{item.marketname}</h4>
            </div>
        )
      })
    }
    return (
    <div>

    <div>
        <h2>Find a farmer's market near you? </h2>
        <h3>Just enter a zipcode below!</h3>
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
        )}
    </div>

      <div className="marketModal">
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
      </div>
            
    </div>
    )
  }
}

export default Market;