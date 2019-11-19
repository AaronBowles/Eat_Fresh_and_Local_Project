import React, { Component } from "react";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  
  
  render() {
    if(this.props.region !== "" && this.props.season !== ""){
        for(let i=0; i < this.props.produce.length; i++){
            for(let j=0; j < this.props.produce[i].seasonAndRegion[this.props.season].length; j++){
            //console.log(this.props.produce[i].seasonAndRegion[this.props.season])
                if(this.props.produce[i].seasonAndRegion[this.props.season][j] === this.props.region){
                    this.props.produceInSeason.push(this.props.produce[i])
                }
            }
        }
    }
    
      return (
          <div>
              <h1> Eat Fresh and Local </h1>
              <h3>Find what fruits and vegetables in season near you</h3>
          </div>
      )
  }
}
export default Home;