import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import NavComponent from './components/nav/nav.jsx' 
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import Project from './pages/ProjectPage';
import Header from './components/Header/Header'



const App = () => {
  return(
    <section id="container">
      <div>
      <Router>
        <Header />
        <NavComponent />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>

    </section>
    

  )
}

export default App;
