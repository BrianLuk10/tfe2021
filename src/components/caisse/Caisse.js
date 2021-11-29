import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import "./Caisse.css";


export default class Caisse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage : false,
            posts: [],
            offset: 0,
            data: [],
            perPage: 1,
            currentPage: 0,
            categorie: "",
            filter:[],
            value: "Tout",
            panier : [],
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    onChangeValue(e) {
        this.setState(
            {value: e.target.value}
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
                    <img className={"image"} src={`${pd.image}`} />
                    <div>{pd.nom}</div>
                    <div>{pd.prix.toFixed(2)}€</div>
                    <div>
                        {this.state.showMessage && <p>Article ajouté avec succès</p>}
                        <button className='btn btn-info' onClick={() => this.recevoirArticle(pd)}>
                            Ajouter au panier</button>
                    </div>
                </div>
            </React.Fragment>)


            this.setState({
                pageCount: Math.ceil(posts.length / this.state.perPage),
                
                postData
            })
            this.setState({ posts });
            this.setState({filter});
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
                <ToastContainer />
                <div className='container'>
                {this.state.postData}
                {this.state.showMessage && <p>Article ajouté avec succès</p>}
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
                    activeClassName={"active"}/>
            </div>
        )
    }
}
