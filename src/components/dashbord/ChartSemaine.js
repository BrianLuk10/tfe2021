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

class ChartSemaine extends Component {
  constructor() {
    super();
    this.state = {
      total: [],
      date: [],
      isReady: false,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3030/commande/days").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.state.total.push(res.data[i].total);
        this.state.date.push(res.data[i].date_commandes.slice(0, 10));
      }
    });

    this.setState({ isReady: true });
  }

  render() {
    return (
      <div>
        {this.state.isFetching ? (
          <div>Loading...</div>
        ) : (
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
        )}
      </div>
    );
  }
}

export default ChartSemaine;
