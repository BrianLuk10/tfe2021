import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./historique.css";
import Confirmer from "../modifierProduit/Confirmer";

export default function Historique() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [
    image_produits,
    nom_produits,
    prix_produits,
    categorie_produits,
    stock,
    statut,
    date_modification,
  ] = useState("");
  const [showConfirm, setConfirm] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3030/historique`).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].date_modification = response.data[i].date_modification
          .slice(0, 19)
          .replace("T", " ");
      }
      setAPIData(response.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  const confirmer = () => {
    setConfirm((showConfirm) => !showConfirm);
    window.history.back();
  };

  const supprimerHistorique = (id) => {
    axios.delete(`http://localhost:3030/historique/` + id);
    setConfirm((showConfirm) => !showConfirm);
  };

  return (
    <div>
      <Link to="/historiqueSupprimé">
        <Button variant="danger">
          <span>Historique des produits supprimés</span>
        </Button>
      </Link>
      <div style={{ padding: 20 }}>
        <input
          icon="search"
          placeholder="Rechercher..."
          onChange={(e) => searchItems(e.target.value)}
        />
        <div>
          {searchInput.length > 1
            ? filteredResults.map((item) => {
                let url = "/modifierProduitPage/" + item.id_produits;
                console.log(url);
                return (
                  <div>
                    <ul className="list-group">
                      <li key={item.id_produits} className="list-group-item">
                        id : {item.id_produits}
                        &nbsp;&nbsp; Nom du produit : {item.nom_produits}{" "}
                        &nbsp;&nbsp; prix : {item.prix_produits.toFixed(2)} €{" "}
                        &nbsp;&nbsp; stock : {item.stock} &nbsp;&nbsp; categorie
                        : {item.categorie_produits}
                        &nbsp;&nbsp;status : {item.statut} &nbsp;&nbsp; Date de
                        modification : {item.date_modification}
                        <button
                          className="button-40"
                          role="button"
                          onClick={() =>
                            supprimerHistorique(item.id_historique)
                          }
                        >
                          supprimé
                        </button>
                      </li>
                    </ul>
                    <Confirmer show={showConfirm} confirmer={confirmer} />
                  </div>
                );
              })
            : APIData.map((item) => {
                let url = "/modifierProduitPage/" + item.id_produits;
                console.log(url);
                return (
                  <div>
                    <ul className="list-group">
                      <li key={item.id_produits} className="list-group-item">
                        id : {item.id_produits}
                        &nbsp;&nbsp; Nom du produit : {item.nom_produits}{" "}
                        &nbsp;&nbsp; prix : {item.prix_produits.toFixed(2)} €{" "}
                        &nbsp;&nbsp; stock : {item.stock} &nbsp;&nbsp; categorie
                        : {item.categorie_produits}
                        &nbsp;&nbsp;status : {item.statut} &nbsp;&nbsp; Date de
                        modification : {item.date_modification}
                        <button
                          className="button-40"
                          role="button"
                          onClick={() =>
                            supprimerHistorique(item.id_historique)
                          }
                        >
                          supprimé
                        </button>
                      </li>
                    </ul>
                    <Confirmer show={showConfirm} confirmer={confirmer} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
