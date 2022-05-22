import React, { useState, useEffect } from "react";
import axios from "axios";
import Confirmer from "../modifierProduit/Confirmer";

/**
 * fonction affiche produit indisponible
 * @returns {React.ReactElement}
 */
export default function ProduitIndiponible() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [
    image_produits,
    nom_produits,
    prix_produits,
    categorie_produits,
    stock,
    date_modification,
  ] = useState("");
  const [showConfirm, setConfirm] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3030/produit/indisponible`).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].date_modification = response.data[i].date_modification
          .slice(0, 19)
          .replace("T", " ");
      }
      setAPIData(response.data);
    });
  }, []);

  /**
   * fonction qui permet de filtrer les données avec ce qu'on écrit
   * @param {string} searchValue
   * @param {boolean} affiche un resultat en Object en fonction de ce qu'on écrit si vide ou non
   * @return {Object.values}
   */
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

  /*
   fonction pour faire disparaitre le message de confirmation avec un state en false 
   */
  const confirmer = () => {
    setConfirm((showConfirm) => !showConfirm);
    window.history.back();
  };

  /**
   * fonction pour restaurer un produit non disponible, message de confirmation apparait avec un state boolean
   * @param id
   */
  const restore = (id) => {
    axios.put("http://localhost:3030/produitRestore/" + id);
    setConfirm((showConfirm) => !showConfirm);
  };

  return (
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
              return (
                <div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      id du produit : {item.id_produits} &nbsp;&nbsp; Nom du
                      produit :{item.nom_produits} &nbsp;&nbsp; catégorie :{" "}
                      {item.categorie_produits} &nbsp;&nbsp;prix :
                      {item.prix_produits}&nbsp;&nbsp; stock : {item.stock}
                      &nbsp;&nbsp; Date de suppression :{item.date_modification}
                      <button
                        className="button-30"
                        role="button"
                        onClick={() => restore(item.id_produits)}
                      >
                        restorer le produit
                      </button>
                    </li>
                  </ul>
                  <Confirmer show={showConfirm} confirmer={confirmer} />
                </div>
              );
            })
          : APIData.map((item) => {
              let url = "/modifierProduitPage/" + item.id_produits;
              return (
                <div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      id du produit : {item.id_produits} &nbsp;&nbsp; Nom du
                      produit :{item.nom_produits} &nbsp;&nbsp; catégorie :{" "}
                      {item.categorie_produits} &nbsp;&nbsp;prix :
                      {item.prix_produits}&nbsp;&nbsp; stock : {item.stock}
                      &nbsp;&nbsp; Date de suppression :{item.date_modification}
                      <button
                        className="button-30"
                        role="button"
                        onClick={() => restore(item.id_produits)}
                      >
                        restorer le produit
                      </button>
                    </li>
                  </ul>
                  <Confirmer show={showConfirm} confirmer={confirmer} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
