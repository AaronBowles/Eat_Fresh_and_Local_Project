import React, { Component } from "react";

class ShowPage extends Component {
  constructor(props) {
    super(props);
  }
    
  render() {
      let showMarkets = this.props.localMarkets.map(item => {
          return (
              <div>
                  <h4>{item.marketname}</h4>
              </div>
          )
      })
      return (
          <div>
              <h2>Markets Near You!</h2>

              <div>{showMarkets}</div>
          </div>
      )
  }
}
export default ShowPage;