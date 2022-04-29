import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./modifierProduit.css";
import Dialog from "./Dialog";
import Confirmer from "./Confirmer";

export default class ModifierProduitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_produitPage: "",
      id_produits: "",
      image_produits: "",
      nom_produits: "",
      prix_produits: "",
      id_categorie: "",
      stock: "",
      showDialog: false,
      showConfirm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  //ouverture du modal avec un state true/false
  openDialog() {
    this.setState({
      showDialog: true,
    });
  }

  //fermeture du modal avec un state true/false
  confirmer = () => {
    this.setState({
      showConfirm: false,
    });
  };

  //une fois le choix confirmer, envoie les données dans la BDD via l'API et fermeture du modal avec un state true/false
  confirm = () => {
    axios
      .put("http://localhost:3030/produitModify/" + this.state.id_produitPage)
      .then((res) => {
        console.log(res);
      });

    this.setState({
      showDialog: false,
    });
    window.history.back();
  };

  //annulation du modal avec en le faisant disparaitre avec un state true/false
  cancelDialog = () => {
    this.setState({
      showDialog: false,
    });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  //envoie des données dans la BDD et fermeture du modal
  submitHandler = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3030/produit/" + this.state.id_produitPage, {
        nom_produits: this.state.nom_produits,
        image_produits: this.state.image_produits,
        id_categorie: this.state.id_categorie,
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
    this.setState({
      showConfirm: true,
    });
  };

  //méthode react pour obtenir les données du produit en cours en fonction de son id et les affiches
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
          console.log(produitdatavalue);
          this.setState({
            id_produits: produitdatavalue.id_produits,
            image_produits: produitdatavalue.image_produits,
            nom_produits: produitdatavalue.nom_produits,
            prix_produits: produitdatavalue.prix_produits,
            categorie_produits: produitdatavalue.categorie_produits,
            id_categorie: produitdatavalue.id_categorie,
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
                    id="id_categorie"
                    name="id_categorie"
                    value={this.state.id_categorie}
                    onChange={this.handleChange}
                    defaultValue={this.state.categorie_produits}
                  >
                    <option value="1">fleur</option>
                    <option value="2">consommable</option>
                    <option value="3">décoration</option>
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
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div>
            <div className="mt-10 text-center">
              <button className="btn" onClick={this.openDialog}>
                Supprimer produit
              </button>
            </div>

            <Dialog
              show={this.state.showDialog}
              cancel={this.cancelDialog}
              confirm={this.confirm}
            />

            <Confirmer
              show={this.state.showConfirm}
              confirmer={this.confirmer}
            />
          </div>
        </div>
        <Link to="/modifierProduit">retour page précédente</Link>
      </div>
    );
  }
}
