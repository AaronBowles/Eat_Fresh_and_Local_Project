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
    }
  }
}

export default App;
