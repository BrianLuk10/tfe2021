import React, { useState, useEffect } from "react";
import axios from "axios";

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
                    <li className="list-group-item">
                      Nom du produit :{item.nom_produits} &nbsp;&nbsp; stock :{" "}
                      {item.stock}
                      &nbsp;&nbsp; Date de modification :
                      {item.date_modification}
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
                    <li className="list-group-item">
                      Nom du produit : {item.nom_produits} &nbsp;&nbsp; stock :{" "}
                      {item.stock}
                      &nbsp;&nbsp; Date de modification :
                      {item.date_modification}
                    </li>
                  </ul>
                </div>
              );
            })}
      </div>
    </div>
  );
}
