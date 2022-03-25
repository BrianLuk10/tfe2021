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
      total: [],
      date: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3030/commande/days").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.state.total.push(res.data[i].total);
      }
      for (let i = 5; i > -2; i--) {
        var curr = new Date(); // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + i;
        let date = new Date(curr.setDate(last)).toGMTString().slice(0, 16);
        this.state.date.push(date);
      }
    });
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
            labels: this.state.date,
            datasets: [
              {
                label: "Tableau total de la semaine en €",
                data: this.state.total,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          redraw={true}
        />
      </div>
    );
  }
}

export default Create;
