import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
        <Route exact path = "/" component = {Landing} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/login" component = {Login} />
        <Footer />
        </div>
      </Router>
    )
  }
}



