import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import React, { useState } from "react";
import Caisse from "../components/caisse/Caisse";
import Dashboard from "../components/dashbord/Dashboard";
import Connexion from "../components/connexion/Connexion";
import { Button } from "react-bootstrap";
import useToken from "../components/connexion/useToken";
import Ticket from "../components/caisse/Ticket";
import AjoutProduit from "../components/ajoutProduit/AjoutProduit";
import ModifierProduit from "../components/modifierProduit/modifierProduit";
import ModifierProduitPage from "../components/modifierProduit/modifierProduitpage";
import Blocnote from "../components/blocnote/blocnote";
import ProduitIndiponible from "../components/historique/produitIndisponible";
import Historique from "../components/historique/historique";
import ChartSemaine from "../components/dashbord/ChartSemaine";
import ChartMois from "../components/dashbord/ChartMois";
import ChartAnnee from "../components/dashbord/chartAnnee";

export default function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Connexion setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
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
        <Link to="/modifierProduit">
          <Button>
            <span>Modifier un produit</span>
          </Button>
        </Link>
        <Link to="/ajoutProduit">
          <Button>
            <span>Ajouter un produit</span>
          </Button>
        </Link>
        <Link to="/historique">
          <Button>
            <span>Historique des modifications</span>
          </Button>
        </Link>
        <Link to="/blocnote">
          <Button>
            <span>bloc-notes</span>
          </Button>
        </Link>

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
          <Route path="/ticket">
            <Ticket />
          </Route>
          <Route path="/modifierProduit">
            <ModifierProduit />
          </Route>
          <Route path="/modifierProduitpage/:id_produit">
            <ModifierProduitPage />
          </Route>
          <Route path="/ajoutProduit">
            <AjoutProduit />
          </Route>
          <Route path="/historique">
            <Historique />
          </Route>
          <Route path="/historiqueSupprim??">
            <ProduitIndiponible />
          </Route>
          <Route path="/blocnote">
            <Blocnote />
          </Route>
          <Route path="/chartSemaine">
            <ChartSemaine />
          </Route>
          <Route path="/chartMois">
            <ChartMois />
          </Route>
          <Route path="/chartAnnee">
            <ChartAnnee />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
