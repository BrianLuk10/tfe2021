import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ModifierProduitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_produitPage: "",
      produitdata: [],
    };
  }

  componentDidMount() {
    let url = window.location.href;
    let getNumber = url
      .replace(/[^0-9]/g, " ")
      .trim()
      .split(/\s+/);
    let result = parseInt(getNumber[getNumber.length - 1], 10);
    this.setState({ id_produitPage: result }, () =>
      axios
        .get("http://localhost:3030/produit/" + this.state.id_produitPage)
        .then((res) => {
          const produitdata = res.data;
          this.setState({ produitdata });
          console.log(this.state.produitdata.nom_produits);
        })
    );
  }
  render() {
    return (
      <div>
        <img src={this.state.produitdata.image_produits}></img>
        <div>{this.state.produitdata.nom_produits}</div>
        <div>{this.state.produitdata.stock}</div>
        <Link to="/modifierProduit">retour page précédente</Link>
      </div>
    );
  }
}
