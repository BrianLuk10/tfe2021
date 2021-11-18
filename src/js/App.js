import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Caisse from "../components/caisse/Caisse";
import Dashboard from "../components/dashbord/Dashboard";
import Connexion from "../components/connexion/Connexion";
import { Button } from "react-bootstrap";

export default function App(){
  const [token, setToken] = useState();
  if(!token) {
    return <Connexion setToken={setToken} />
  }
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
    <span>preferences</span>
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