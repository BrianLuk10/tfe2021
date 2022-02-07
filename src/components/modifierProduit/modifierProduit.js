import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Posts() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3030/produit`).then((response) => {
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
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <div>
        {searchInput.length > 1
          ? filteredResults.map((item) => {
              return (
                <div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      {item.nom_produits} &nbsp;&nbsp; stock : {item.stock}
                    </li>
                  </ul>
                </div>
              );
            })
          : APIData.map((item) => {
              return (
                <div>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item">
                      {item.nom_produits} &nbsp;&nbsp; stock : {item.stock}
                    </li>
                  </ul>
                </div>
              );
            })}
      </div>
    </div>
  );
}
