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
import ProduitIndiponible from "../components/produitIndisponible/produitIndisponible";

export default function App() {
  /*
  const { token, setToken } = useToken();
  if (!token) {
    return <Connexion setToken={setToken} />
  }
  */
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
        <Link to="/historiqueSupprimé">
          <Button>
            <span>Historique des produits supprimés</span>
          </Button>
        </Link>
        <Link to="/blocnote">
          <Button>
            <span>bloc note</span>
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
          <Route path="/historiqueSupprimé">
            <ProduitIndiponible />
          </Route>
          <Route path="/blocnote">
            <Blocnote />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
