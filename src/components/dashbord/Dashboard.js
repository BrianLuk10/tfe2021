import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
export default class PrintingClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      value: "32",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3030/produit").then((res) => {
      const posts = res.data.map((obj) => ({
        id: obj.id_produits,
        nom: obj.nom_produits,
        prix: obj.prix_produits,
        categorie: obj.categorie_produits,
        image: obj.image_produits,
        stock: obj.stock,
      }));
      const postData = posts.map((pd) => (
        <option value={pd.id}>{pd.nom}</option>
      ));
      console.log(postData);

      this.setState({ postData });
      this.setState({ posts });
    });
  }

  test = () => {
    var width = window.innerWidth;
    var height = window.innerHeight;
    console.log(width + "    " + height);
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    axios
      .get("http://localhost:3030/produit/" + this.state.value)
      .then((res) => {
        console.log(res.data);
      });
  };

  render() {
    return (
      <div>
        <div>
          <select onChange={this.handleChange} value={this.state.value}>
            {this.state.postData}
          </select>
          {this.state.value}
        </div>
        <div>
          <form onSubmit={this.submitHandler}>
            <div className={"row-wrapper"}>
              <div className="column-wrapper contact">
                <div className="confirmer">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="sub"
                    name="sub"
                  >
                    confirmer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <button onClick={this.test}>largeur hauteur</button>
        </div>
      </div>
    );
  }
}
