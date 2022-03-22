import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const data = {
  labels: ["test", "test", "test"],
  datasets: [
    {
      data: [12, 2, 16],
    },
  ],
};
class Create extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3030/commande/today").then((res) => {
      const data = res.data;
      const posts = data.map((obj) => ({
        id: obj.id_commandes,
        id_produits: obj.id_produits,
        nom: obj.nom,
        prix: obj.prix_sep,
        total: obj.id_total,
        date_commandes: obj.date_commandes,
        etat_commandes: obj.etat_commandes,
      }));
      const postData = posts.map((pd) => (
        <React.Fragment>
          <div>{pd.nom}</div>
          <div>{pd.date_commandes}</div>
        </React.Fragment>
      ));
      this.setState({
        postData,
      });
    });
  }

  render() {
    return (
      <div>
        <Doughnut data={data}></Doughnut>
      </div>
    );
  }
}

export default Create;
