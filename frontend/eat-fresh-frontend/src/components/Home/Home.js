import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
      return (
          <div>
              <h1> Eat Fresh and Local </h1>

              <h3>Find what fruits and vegetables in season near you</h3>
          </div>
      )
  }
}

export default Home;