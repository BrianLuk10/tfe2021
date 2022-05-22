import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./dashboard.css";

/**
 *création du Modal les articles de commande, leur prix à l'unité et leur quantité acheté
 * @param {any} handleClose
 * @param {any} show
 * @param {any} children
 * @returns {React.ReactElement}
 */

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="btn btn-danger" onClick={handleClose}>
          Fermer
        </button>
      </section>
    </div>
  );
};
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      show: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  /**
   * fonction qui permet d'afficher le modal des commandes, est appelé lorsqu'on clique sur la div des commandes
   * @param pd (post data)
   */

  showModal = (pd) => {
    sessionStorage.setItem("commandeCaisse", JSON.stringify(pd));
    var data = JSON.parse(sessionStorage.getItem("commandeCaisse"));
    console.log(data);
    this.setState({ show: true });
    document.getElementById("nom").innerHTML =
      "<div> produits :" +
      data.nom +
      " </div> <div>prix à l'unité : " +
      data.prix +
      " </div> <div>nombre par produits : " +
      data.nombre +
      " </div> <div>total : " +
      data.total +
      "€</div>";
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  /**
   * fonction pour changer de page
   * @param e
   */
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

  /**
   * changer l'état d'une commande (annulation, reservation ou vente), puis "recharge la page" dynamiquement en appellant componentDidMount
   * @param x
   */
  changerEtat(x) {
    var etat = document.getElementById(x).value;
    axios.put("http://localhost:3030/commande/" + x, {
      id_etat: etat,
    });
    this.componentDidMount();
  }

  componentDidMount() {
    axios.get("http://localhost:3030/commande").then((res) => {
      const data = res.data;
      const posts = data.map((obj) => ({
        id: obj.id_commandes,
        id_produits: obj.id_produits,
        nom: obj.nom,
        prix: obj.prix_sep,
        nombre: obj.nombre_sep,
        total: obj.total,
        date_commandes: obj.date_commandes.slice(0, 19).replace("T", " "),
        etat_commandes: obj.etat_commandes,
        id_etat: obj.id_etat,
      }));
      const slice = posts.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({});
      const postData = slice.map((pd) => (
        <ListGroupItem>
          <span onClick={() => this.showModal(pd)}>
            id de la commande : {pd.id} | total : {pd.total}€ | date :{" "}
            {pd.date_commandes} | etat de la commande :
            <span className={pd.etat_commandes}>{pd.etat_commandes}</span> |
          </span>
          changer etat :
          <select id={pd.id} name="etat_commande" defaultValue={pd.id_etat}>
            <option value="1">vente</option>
            <option value="2">réservation</option>
            <option value="3">annulé</option>
          </select>
          <button onClick={() => this.changerEtat(pd.id)}>changer état</button>
        </ListGroupItem>
      ));
      this.setState({
        pageCount: Math.ceil(posts.length / this.state.perPage),
        postData,
      });
    });
  }

  /**
   * render
   * @returns {html}
   */
  render() {
    return (
      <div>
        <Link to="/chartSemaine">
          <Button variant="dark">
            <span>graphique de la semaine</span>
          </Button>
        </Link>
        <Link to="/chartMois">
          <Button variant="dark">
            <span>graphique des mois</span>
          </Button>
        </Link>
        <Link to="/chartAnnee">
          <Button variant="dark">
            <span>graphique en année</span>
          </Button>
        </Link>
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          validerModal={this.validerModal}
        >
          <div id="nom"></div>
        </Modal>
        <ListGroup>{this.state.postData}</ListGroup>
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
    );
  }
}

export default Dashboard;
