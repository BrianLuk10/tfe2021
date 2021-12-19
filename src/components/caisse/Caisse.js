import React from "react";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "./Caisse.css";
import ReactToPrint from "react-to-print"

let prixTotal = 0;

const Modal = ({ handleClose, validerModal, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <input type="range" min="1" max="10" class="slider" id="myRange"></input>
        <div id='result'></div>
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


export default class Caisse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      offset: 0,
      data: [],
      perPage: 20,
      currentPage: 0,
      caisse: [],
      show: false,
      article: [],
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }


  showModal = (pd) => {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("result");
    output.innerHTML = slider.value;
    slider.oninput = function () {
      output.innerHTML = this.value;
    }
    //pd.nombre = slider.value
    console.log(pd)
    this.setState({ show: true });
    sessionStorage.setItem('caisseProduit', JSON.stringify(pd))
    var data = JSON.parse(sessionStorage.getItem('caisseProduit'))
    document.getElementById("nom").innerHTML = data.nom;
    document.getElementById("prix").innerHTML = data.prix.toFixed(2) + "$";
    document.getElementById("img1").innerHTML = `<img class="image" src=` + data.image + `>`

  };

  reset = () => {
    sessionStorage.setItem('save', JSON.stringify(this.state.caisse))
    this.setState({ caisse: [] })
    prixTotal = 0;
    this.componentDidMount();
  }

  hideModal = () => {
    this.setState({ show: false });
  };

  validerModal = () => {
    this.setState({ show: false });
    var slider = document.getElementById("myRange");
    let data = JSON.parse(sessionStorage.getItem('caisseProduit'))
    data.nombre = slider.value
    sessionStorage.setItem('caisse', JSON.stringify(data))
    this.state.caisse.push(JSON.parse(sessionStorage.getItem('caisse')))
    console.log(this.state.caisse)
    this.componentDidMount();

  }

  calculerPrixTotal = (a, b) => {
    let prix = a * b;
    prixTotal += prix;
  }

  onChangeValue(e) {
    this.setState(
      { value: e.target.value }
    )
    this.componentDidMount()
  }

  recevoirArticle = (article) => {
    console.log(`${article}`)
  }

  componentDidMount() {
    axios.get(`http://localhost:3030/produit`)
      .then(res => {
        let filter;
        filter = res.data;
        const posts = filter.map(obj =>
          ({ id: obj.id_produits, nom: obj.nom_produits, prix: obj.prix_produits, image: obj.image_produits })
        );
        const slice = posts.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(pd => <React.Fragment>
          <div>
            <img className={"image"} src={`${pd.image}`} onClick={() => this.showModal(pd)} data-arg1={pd} />
            <div>{pd.nom}</div>
            <div>{pd.prix.toFixed(2)}€</div>
            <div>
              <button className='btn btn-info' onClick={this.test}>
                Ajouter</button>
            </div>
          </div>
        </React.Fragment>)
        this.setState({
          pageCount: Math.ceil(posts.length / this.state.perPage),

          postData
        })
        this.setState({ posts });
        this.setState({ filter });
      });
    let i = 0;
    try {
      const posts = this.state.caisse.map(obj => ({
        articleId: i++,
        id: obj.id,
        nom: obj.nom,
        prix: obj.prix,
        nombre: obj.nombre
      }));
      prixTotal = 0;
      const articleShow = posts.map(pd => <React.Fragment>
        {this.calculerPrixTotal(pd.prix, pd.nombre)}
        <div>
          <div>{pd.nom} {pd.prix.toFixed(2)}€ x{pd.nombre} prix total : {(pd.prix * pd.nombre).toFixed(2)}€ </div>
        </div>
        <hr></hr>
      </React.Fragment>)
      this.setState({
        articleShow
      })
    }
    catch {
      console.log("pas d'article")
    }
  }


  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.componentDidMount()
    });

  };


  render() {
    return (
      <div>
        <div class='col-lg-3 col-sm-12 left'>
          {this.state.articleShow}
          <div className="Total">
            Total à payer: {prixTotal.toFixed(2)} €
          </div>
          <button className="btn btn-info" onClick={this.reset}>confirmer</button>
          <Link to="/ticket">
            <button onClick={this.reset}>
              <span>ticket</span>
            </button>
          </Link>
        </div>
        <div class='col-lg-9 col-sm-12 right'>

          <Modal show={this.state.show} handleClose={this.hideModal} validerModal={this.validerModal}>
            <div id="img1" />
            <div id="nom"></div>
            <div id="prix">€</div>
          </Modal>
          <div className='container'>
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
            activeClassName={"active"} />
        </div>
      </div>
    )
  }
}