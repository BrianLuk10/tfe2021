import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Caisse.css";
import ReactToPrint from "react-to-print";

//initialisation du prix total à 0 lorsqu'on arrive vers cette page
let prixTotal = 0;

//création du Modal des produit, renvoie un modal avec un choix de 1 à 10 du produit
const Modal = ({ handleClose, validerModal, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <input
          type="range"
          min="1"
          max="10"
          class="slider"
          id="myRange"
        ></input>
        <div id="result"></div>
        <span></span>
        <button className="btn btn-success" onClick={validerModal}>
          Valider
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Fermer
        </button>
      </section>
    </div>
  );
};


//création du Modal si le stock du produit est à 0, renvoie 'plus disponible'
const Modal2 = ({ handleClose2, show2 }) => {
  const showHideClassName2 = show2
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName2}>
      <section className="modal-main">
        <div>plus disponible</div>
        <span></span>
        <button className="btn btn-danger" onClick={handleClose2}>
          Fermer
        </button>
      </section>
    </div>
  );
};

export default class Caisse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      offset: 0,
      data: [],
      perPage: 14,
      currentPage: 0,
      caisse: [],
      categorie: "",
      value: "Tout",
      show: false,
      show2: false,
      article: [],
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideModal2 = this.hideModal2.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  //fonciton qui per;et d'afficher le modal des produits, est appelé lorsqu'on clique sur l'image du produit dans la caisse
  showModal = (pd) => {
    if (pd.stock > 0) {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("result");
      output.innerHTML = slider.value;
      slider.oninput = function () {
        output.innerHTML = this.value;
      };
      this.setState({ show: true });
      sessionStorage.setItem("caisseProduit", JSON.stringify(pd));
      var data = JSON.parse(sessionStorage.getItem("caisseProduit"));
      document.getElementById("nom").innerHTML = data.nom;
      document.getElementById("prix").innerHTML = data.prix.toFixed(2) + "$";
      document.getElementById("img1").innerHTML =
        `<img class="image" src=` + data.image + `>`;
    } else {
      this.setState({ show2: true });
    }
  };

  //fonction qui remet l'etat de la caisse à 0 et sauvegarde l'etat de la caisse actuelle dans un sessionStorage, est appelé une fois la caisse fini
  reset = () => {
    sessionStorage.setItem("save", JSON.stringify(this.state.caisse));
    axios.post("http://localhost:3030/commande");
    for (let i = 0; this.state.caisse.length > i; i++) {
      axios.put(
        "http://localhost:3030/fournissement/stock/" + this.state.caisse[i].id,
        {
          nombre: this.state.caisse[i].nombre,
        }
      );
    }
    for (let i = 0; this.state.caisse.length > i; i++) {
      axios.post("http://localhost:3030/commande2", {
        id_produits: this.state.caisse[i].id,
        nombre: this.state.caisse[i].nombre,
      });
    }

    this.setState({ caisse: [] });
    prixTotal = 0;
    this.componentDidMount();
  };

  //cache le modal des produit
  hideModal = () => {
    this.setState({ show: false });
  };

  //cache le modal 'plus disponible'
  hideModal2 = () => {
    this.setState({ show2: false });
  };

  //une fois le modal valider, le cache et ajoute les données dans la caisse avec un sessionStorage
  validerModal = () => {
    this.setState({ show: false });
    var slider = document.getElementById("myRange");
    let data = JSON.parse(sessionStorage.getItem("caisseProduit"));
    data.nombre = slider.value;
    if (data.nombre > data.stock) {
    } else {
      sessionStorage.setItem("caisse", JSON.stringify(data));
      this.state.caisse.push(JSON.parse(sessionStorage.getItem("caisse")));
      this.componentDidMount();
    }
  };

  //fonction simple de calcul pour calculer le prix total de la caisse
  calculerPrixTotal = (a, b) => {
    let prix = a * b;
    prixTotal += prix;
  };

  //fonction qui change la value du state lorsqu'on la change, est utilisé pour les SELECT/OPTION html pour les catégories des produits.
  onChangeValue(e) {
    this.setState({ value: e.target.value });
    this.componentDidMount();
  }

  //fonction componentDidMount, méthode de React pour recevoir les données des produits de la caisse via une API et les affichent.
  componentDidMount() {
    axios.get(`http://localhost:3030/produit`).then((res) => {
      let filter;
      if (this.state.value == "Tout") {
        filter = res.data;
      } else {
        filter = res.data.filter(
          (x) => x.categorie_produits == this.state.value
        );
      }
      const posts = filter.map((obj) => ({
        id: obj.id_produits,
        nom: obj.nom_produits,
        prix: obj.prix_produits,
        categorie: obj.categorie_produits,
        image: obj.image_produits,
        stock: obj.stock,
      }));
      const slice = posts.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((pd) => (
        <React.Fragment>
          <div className={`${pd.categorie}`}>
            <img
              className={"image"}
              src={`${pd.image}`}
              onClick={() => this.showModal(pd)}
              data-arg1={pd}
            />
            <div>{pd.nom}</div>
            <div>{pd.prix.toFixed(2)}€</div>
            <div className={`test${pd.stock}`}>stock : {pd.stock}</div>
          </div>
        </React.Fragment>
      ));
      this.setState({
        pageCount: Math.ceil(posts.length / this.state.perPage),

        postData,
      });
      this.setState({ posts });
      this.setState({ filter });
    });
    let i = 0;
    try {
      const posts = this.state.caisse.map((obj) => ({
        articleId: i++,
        id: obj.id,
        nom: obj.nom,
        prix: obj.prix,
        nombre: obj.nombre,
      }));
      prixTotal = 0;
      const articleShow = posts.map((pd) => (
        <React.Fragment>
          {this.calculerPrixTotal(pd.prix, pd.nombre)}
          <div>
            <div>
              {pd.nom} {pd.prix.toFixed(2)}€ x{pd.nombre} prix total :{" "}
              {(pd.prix * pd.nombre).toFixed(2)}€{" "}
            </div>
          </div>
          <hr></hr>
        </React.Fragment>
      ));
      this.setState({
        articleShow,
      });
    } catch {
      console.log("pas d'article");
    }
  }

  //fonction qui permet de changer de page
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  render() {
    return (
      <div>
        <div class="col-lg-3 col-sm-12 left">
          {this.state.articleShow}
          <div className="Total">Total à payer: {prixTotal.toFixed(2)} €</div>
          <Link to="/ticket">
            <button onClick={this.reset}>
              <span>ticket</span>
            </button>
          </Link>
        </div>
        <div class="col-lg-9 col-sm-12 right">
          <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            validerModal={this.validerModal}
          >
            <div id="img1" />
            <div id="nom"></div>
            <div id="prix">€</div>
          </Modal>
          <Modal2 show2={this.state.show2} handleClose2={this.hideModal2}>
            <div id="img1" />
            <div id="nom"></div>
            <div id="prix">€</div>
          </Modal2>
          <div className="container">
            <div onChange={this.onChangeValue}>
              <input type="radio" value="Tout" name="categorie" /> Tout
              <input type="radio" value="fleur" name="categorie" /> fleur
              <br></br>
              <input type="radio" value="consommable" name="categorie" />
              Consommable <br></br>
              <input type="radio" value="décoration" name="categorie" />
              Décoration
            </div>

            {this.state.postData}
          </div>
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}
