import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

class Create extends Component {
  constructor() {
    super();
    this.state = {
      date: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3030/commande/days").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.state.date.push(res.data[i].total);
      }
    });
    console.log(this.state.date);
  }
  /*
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
*/
  render() {
    return (
      <div>
        <Bar
          data={{
            labels: "labels",
            datasets: [
              {
                label: "My First Dataset",
                data: this.state.date,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default Create;
