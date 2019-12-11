import React, { Component } from "react";

class Home extends Component {
//   constructor(props) {
//     super(props);
//   }


  render() {
    // if(this.props.region !== "" && this.props.season !== ""){
    //     for(let i=0; i < this.props.produce.length; i++){
    //         for(let j=0; j < this.props.produce[i].seasonAndRegion[this.props.season].length; j++){
    //         //console.log(this.props.produce[i].seasonAndRegion[this.props.season])
    //             if(this.props.produce[i].seasonAndRegion[this.props.season][j] === this.props.region){
    //                 this.props.produceInSeason.push(this.props.produce[i])
    //             }
    //         }
    //     }
    // }
  
    let inSeasonList = null;
    if(this.props.produceInSeason !== null){
         inSeasonList = this.props.produceInSeason.map(item => {
            console.log(item)
            return (
                <div className="produceList">
                    <h3>Name: {item.name}</h3>
                    <h4>Category: {item.category}</h4>
                    <h4>Description:</h4><p>{item.description}</p>
                </div>
            )
        })
    }
    
    
      return (
          <div>
              {/* <h1> Eat Fresh and Local </h1>
              <h3> Find what fruits and vegetables are in season near you! </h3> */}
              <h3> Produce In Season :</h3>
              <div>{inSeasonList}</div>

              
          </div>
      )
  }
}
export default Home;