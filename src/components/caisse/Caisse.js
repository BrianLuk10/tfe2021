import React from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "./Caisse.css";



const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};
export default class Caisse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      posts: [],
      offset: 0,
      data: [],
      perPage: 1,
      currentPage: 0,
      categorie: "",
      filter: [],
      value: "Tout",
      panier: [],
      show: false,
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }


  showModal = (pd) => {
    this.setState({ show: true });
    sessionStorage.setItem('caisse', JSON.stringify(pd))
    var data = JSON.parse(sessionStorage.getItem('caisse'))
    document.getElementById("nom").innerHTML = data.nom;
    document.getElementById("prix").innerHTML = data.prix.toFixed(2) + "$";
    document.getElementById("img1").innerHTML = `<img class="image" src=` + data.image + `>`

  };

  hideModal = () => {
    this.setState({ show: false });
    this.state.panier.push(JSON.parse(sessionStorage.getItem('caisse')))
    console.log(this.state.panier)
    sessionStorage.removeItem('caisse')
  };

  test() {
    console.log('test')
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
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <div id="img1" />
          <div id="nom"></div>
          <div id="prix">€</div>
          <label for="customRange1" class="form-label">Example range</label>
          <input type="range" class="form-range" id="customRange1" />
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
    )
  }
}
