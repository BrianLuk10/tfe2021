import React from "react";
import axios from "axios";
import "./AjoutProduit.css";
import Confirmer from "../modifierProduit/Confirmer";

//obtenir la date actuelle
const current_date = new Date().toISOString().slice(0, 19).replace("T", " ");

export default class Caisse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_produits: "",
      image_produits:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png",
      prix_produits: 0.0,
      categorie_produits: "fleur",
      stock: 0,
      date_fournissement: current_date,
    };
    this.state.showConfirm = false;
    this.handleChange = this.handleChange.bind(this);
  }

  //fonction confirmer qui change l'etat du state
  confirmer = () => {
    this.setState({
      showConfirm: false,
    });
  };

  //fonction qui permet de changer l'état pour correspondre à ce qui a été écrit
  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  //fonction valider envoie les données dans la BDD
  submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3030/produit", this.state).then((response) => {
      const data_fournissement = {
        id_produits: response.data.id,
        date_fournissement: this.state.date_fournissement,
        stock_produits: this.state.stock,
        exp_date: null,
      };
      axios
        .post("http://localhost:3030/fournissement/", data_fournissement)
        .then((response) => {
        });
    });
    this.setState({
      showConfirm: true,
    });
  };

  render() {
    return (
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
              <div>
                <label htmlFor="Date">Date & heure du fournissement :</label>
                <input
                  type="datetime-local"
                  id="data_fournissement"
                  name="data_fournissement"
                  value={this.state.data_fournissement}
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
                  Ajouter
                </button>
              </div>
              <Confirmer
                show={this.state.showConfirm}
                confirmer={this.confirmer}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
