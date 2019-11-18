import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home/Home";
import ShowPage from "./components/ShowPage/ShowPage";
import Axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      season: "",
      produce:""
    };
  }

 componentDidMount() {
   Axios.get('http://localhost:8000/produces')
   .then(res => {
     console.log(res.data);
    this.setState({produce: res.data});
   });
 };

  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/show" component={ShowPage} />
          </Switch>
        </main>
      </div>
    )
  }
}
export default App;