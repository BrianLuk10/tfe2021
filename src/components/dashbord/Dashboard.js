import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

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

  componentDidMount() {
    axios.get("http://localhost:3030/commande").then((res) => {
      const data = res.data;
      const posts = data.map((obj) => ({
        id: obj.id_commandes,
        id_produits: obj.id_produits,
        nom: obj.nom,
        prix: obj.prix_sep,
        total: obj.total,
        date_commandes: obj.date_commandes,
        etat_commandes: obj.etat_commandes,
      }));
      const slice = posts.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      console.log(slice);
      const postData = slice.map((pd) => (
        <React.Fragment>
          <div>{pd.nom}</div>
          <div>{pd.date_commandes}</div>
        </React.Fragment>
      ));
      this.setState({
        pageCount: Math.ceil(posts.length / this.state.perPage),
        postData,
      });
    });
  }

  render() {
    return (
      <div>
        <Link to="/chartSemaine">
          <Button variant="info">
            <span>graphique de la semaine</span>
          </Button>
        </Link>
        {this.state.postData}
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
