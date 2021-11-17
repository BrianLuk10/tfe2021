import React from "react";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Caisse from "../components/Caisse";
import Dashboard from "../components/Dashboard";
import Connexion from "../components/Connexion";
import { Button } from "react-bootstrap";

export default function App(){

    return(
        <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Caisse />
          </Route>
          <Route path="/connexion">
            <Connexion />
          </Route>
        </Switch>
        <Link to="/preferences">
  <Button>
    <span>Login</span>
  </Button>
</Link>
<Link to="/connexion">
  <Button>
    <span>Login</span>
  </Button>
</Link>
      </BrowserRouter>
    
    </div>

    )
};