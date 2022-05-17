import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/**
 * fonction pour afficher la page de la liste des produits ajoutés
 * @returns {html}
 */
export default function ModifierProduit() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [
    image_produits,
    nom_produits,
    prix_produits,
    categorie_produits,
    stock,
  ] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3030/produit`).then((response) => {
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

  return (
    <div data-testid="searchBar" style={{ padding: 20 }}>
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
                    <li key={item.nom_produits} className="list-group-item">
                      <Link to={`${url}`}>
                        <button>
                          Nom du produit : {item.nom_produits} &nbsp;&nbsp; prix
                          : {item.prix_produits} &nbsp;&nbsp; catégorie :
                          {item.categorie_produits} &nbsp;&nbsp; stock :
                          {item.stock} &nbsp;&nbsp;
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })
          : APIData.map((item) => {
              let url = "/modifierProduitPage/" + item.id_produits;
              console.log(url);
              return (
                <div>
                  <ul className="list-group">
                    <li key={item.nom_produits} className="list-group-item">
                      <Link to={`${url}`}>
                        <button>
                          Nom du produit : {item.nom_produits} &nbsp;&nbsp; prix
                          : {item.prix_produits} &nbsp;&nbsp; catégorie :
                          {item.categorie_produits} &nbsp;&nbsp; stock :
                          {item.stock}
                          &nbsp;&nbsp;
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
      </div>
    </div>
  );
}
