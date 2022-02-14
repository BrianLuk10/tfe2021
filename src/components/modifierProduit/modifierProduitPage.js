import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./modifierProduit.css";

export default class ModifierProduitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_produitPage: "",
      id_produits: "",
      image_produits: "",
      nom_produits: "",
      prix_produits: "",
      categorie_produits: "",
      stock: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitHandler = (e) => {
    e.preventDefault();
    let url = window.location.href;
    let getNumber = url
      .replace(/[^0-9]/g, " ")
      .trim()
      .split(/\s+/);
    let result = parseInt(getNumber[getNumber.length - 1], 10);
    axios
      .put("http://localhost:3030/produit/" + this.state.id_produitPage, {
        nom_produits: this.state.nom_produits,
        image_produits: this.state.image_produits,
        categorie_produits: this.state.categorie_produits,
        prix_produits: this.state.prix_produits,
      })
      .then((response) => {
        console.log(response);
        axios
          .put(
            "http://localhost:3030/fournissement/" + this.state.id_produitPage,
            { stock_produits: this.state.stock }
          )
          .then((response) => {
            console.log(response);
          });
      });
  };

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
          const produitdatavalue = res.data;
          this.setState({
            id_produits: produitdatavalue.id_produits,
            image_produits: produitdatavalue.image_produits,
            nom_produits: produitdatavalue.nom_produits,
            prix_produits: produitdatavalue.prix_produits,
            categorie_produits: produitdatavalue.categorie_produits,
            stock: produitdatavalue.stock,
          });
        })
    );
  }
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.submitHandler}>
            <div className={"row-wrapper"}>
              <div className="column-wrapper contact">
                <h2>Produit a ajouté dans la caisse</h2>
                <div>
                  <label htmlFor="Nom">Nom du produit :</label>
                  <input
                    type="texte"
                    id="nom_produits"
                    name="nom_produits"
                    value={this.state.nom_produits}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="Lien">Lien URL de l'image :</label>
                  <input
                    type="texte"
                    id="image_produits"
                    name="image_produits"
                    value={this.state.image_produits}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="Prix">Prix :</label>
                  <input
                    type="number"
                    min="0"
                    step=".01"
                    id="prix_produits"
                    name="prix_produits"
                    value={this.state.prix_produits}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="Cat">categorie :</label>
                  <select
                    id="categorie_produits"
                    name="categorie_produits"
                    value={this.state.categorie_produits}
                    onChange={this.handleChange}
                  >
                    <option value="fleur">fleur</option>
                    <option value="consommable">consommable</option>
                    <option value="décoration">décoration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="Stock">En stock :</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    id="stock"
                    name="stock"
                    value={this.state.stock}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="confirmer">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="sub"
                    name="sub"
                  >
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Link to="/modifierProduit">retour page précédente</Link>
      </div>
    );
  }
}
