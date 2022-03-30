import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  Chart,
  BarElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

Chart.register(
  BarElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip
);

class ChartMois extends Component {
  constructor() {
    super();
    this.state = {
      total: [],
      date: [],
      isReady: false,
      mois: [],
      moisNom: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
      ],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3030/commande/month").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.state.total.push(res.data[i].total);
        this.state.date.push(res.data[i].date_commandes.slice(5, 7) - 1);
      }
      for (let i = 0; i < this.state.date.length; i++) {
        this.state.mois.push(this.state.moisNom[i]);
      }
    });

    this.setState({ isReady: true });
  }

  render() {
    return (
      <div>
        <Link to="/chartSemaine">
          <Button variant="dark">
            <span>graphique de la semaine</span>
          </Button>
        </Link>
        <Link to="/chartAnnee">
          <Button variant="dark">
            <span>graphique en année</span>
          </Button>
        </Link>
        {this.state.isFetching ? (
          <div>Loading...</div>
        ) : (
          <Bar
            data={{
              labels: this.state.mois,
              datasets: [
                {
                  label: "Tableau total des mois de l'année en €",
                  data: this.state.total,
                  backgroundColor: [
                    "rgb(255, 0, 0, 0.2)",
                    "rgba(255, 128, 0, 0.2)",
                    "rgba(255, 255, 0, 0.2)",
                    "rgba(128, 255, 0, 0.2)",
                    "rgba(0, 255, 0, 0.2)",
                    "rgba(0, 255, 128, 0.2)",
                    "rgba(0, 255, 255, 0.2)",
                    "rgba(0, 128, 255, 0.2)",
                    "rgba(0, 0, 255, 0.2)",
                    "rgba(128, 0, 255, 0.2)",
                    "rgba(255, 0, 255, 0.2)",
                    "rgba(255, 0, 128, 0.2)",
                  ],
                  borderColor: [
                    "rgb(255, 50, 50)",
                    "rgba(255, 128, 50)",
                    "rgba(255, 255, 50)",
                    "rgba(128, 255, 10)",
                    "rgba(50, 205, 60)",
                    "rgba(0, 255, 128)",
                    "rgba(60, 255, 255)",
                    "rgba(80, 128, 255)",
                    "rgba(50, 50, 255)",
                    "rgba(128, 50, 255)",
                    "rgba(255, 50, 255)",
                    "rgba(255, 50, 128)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            redraw={true}
          />
        )}
      </div>
    );
  }
}

export default ChartMois;
