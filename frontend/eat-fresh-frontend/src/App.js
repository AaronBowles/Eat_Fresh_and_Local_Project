import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      season: ""
    };
  }

  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <main>
          <Switch>
            
          </Switch>
        </main>
      </div>

    )
  }
}

export default App;
