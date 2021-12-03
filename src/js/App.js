import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Caisse from "../components/caisse/Caisse";
import Dashboard from "../components/dashbord/Dashboard";
import Connexion from "../components/connexion/Connexion";
import { Button } from "react-bootstrap";
import useToken from '../components/connexion/useToken';

export default function App() {
  /*
  const { token, setToken } = useToken();
  if (!token) {
    return <Connexion setToken={setToken} />
  }
  */
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/caisse">
            <Caisse />
          </Route>
          <Route path="/connexion">
            <Connexion />
          </Route>
        </Switch>
        <Link to="/caisse">
          <Button>
            <span>Caisse</span>
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button>
            <span>Dashboard</span>
          </Button>
        </Link>
      </BrowserRouter>

    </div>

  )
};