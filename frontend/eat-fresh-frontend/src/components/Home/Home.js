import React, { Component } from "react";
import "./Home.css"
class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
        produceSelected: null,

  
    }
  }

    produceSelect = event => {
        
        console.log(event.target.innerHTML)
        this.setState({produceSelected: event.target.innerHTML})
        if(this.state.produceSelected === event.target.innerHTML){
            this.showProduceModal()
        }
    } 
    showProduceModal = () => {
        let produceModal = document.getElementsByClassName("produceModal");
        produceModal[0].style.display = "block";
    }
    resetSelected = () => {
        this.setState({produceSelected: null})
    }
    closeProduceModal = event => {
        let produceModal = document.getElementsByClassName("produceModal");
        produceModal[0].style.display = "none";
    }
    componentDidUpdate(prevProps, prevState){
   
        if(prevState.produceSelected !== this.state.produceSelected && prevProps === this.props){
          this.showProduceModal()
        }
        
            if(prevProps.region !== this.props.region || prevProps.season !==  this.props.season){
                this.setState({produceSelected: null})
            }
        
        //this.setState({produceSelected: null})
    }
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

    // let inSeasonList = null;
    
    // if(this.props.produceInSeason !== null){
        //      inSeasonList = this.props.produceInSeason.map(item => {
            //         console.log(item)
            //         return (
                //             <div className="produceDetail">
                //                 <h3>Name: {item.name}</h3>
                //                 <h4>Category: {item.category}</h4>
                //                 <h4>Description:</h4><p>{item.description}</p>
                //             </div>
                //         )
                //     })
                
                // }
    let produceDetail = null
    if(this.state.produceSelected !== null && this.props.produceInSeason !== null){
        // for(let i=0; i< this.props.produceInSeason.length; i++){
            produceDetail = this.props.produceInSeason.map(item => {
                    if(item.name === this.state.produceSelected){
                            console.log(item)
                            return (
                                <div className="produceDetailShow">
                                    <h3>Name: {item.name}</h3>
                                    <h4>Category: {item.category}</h4>
                                    <h4>Description:</h4><p>{item.description}</p>
                                    <button onClick={this.closeProduceModal}>exit </button>
                                </div>
                            )
                        }
                        })
      //  }
    }
    
    let produceList = null;
    if(this.props.produceInSeason !== null){
        produceList = this.props.produceInSeason.map(item => {
            return (
                <div className="produceNames">
                    <button className="produceButton" onClick={this.produceSelect}>{item.name}</button>
                </div>
            )
        })
    }
    
      return (
          <div>
              {/* <h1> Eat Fresh and Local </h1>
              <h3> Find what fruits and vegetables are in season near you! </h3> */}
              <div className="currentParams">
                <h3>Current Region: {this.props.region}</h3>
                <h3>Current Season: {this.props.season}</h3>
              </div>
              <h2 className="produceHeader"> Produce In Season:</h2>
              <div className ="produce">
                {produceList}
              </div>
              <div className="produceModal">
                  <div className="produceModal-container">
                      <div>{produceDetail}</div>
                  </div>
              </div>
              {/* <div>{inSeasonList}</div> */}

              
          </div>
      )
  }
}
export default Home;