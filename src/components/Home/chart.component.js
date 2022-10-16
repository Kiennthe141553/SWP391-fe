import React, { Component } from "react";
import { Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import faker from "faker";
import ".././style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Chart Selling This Month",
        },
      },
    };

    const labels = ["Pro1", "Pro2", "Pro3", "Pro4", "Pro5"];

    const data = {
      labels,
      datasets: [
        {
          label: "Sell in this Month",
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    const dataPie = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const optionsLine = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    };



    const dataLine = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() => faker.datatype.number({ min: 0, max: 2000 })),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: labels.map(() => faker.datatype.number({ min: 0, max: 2000 })),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    return (
      <div className="container">
        <div className="title">
          <h2>Chart</h2>
        </div>
        {/* {this.state.userReady?(<Table columns={columns} dataSource={data} />):null} */}
        <Bar options={options} data={data} />
        <Row gutter={24}>
          <Col span={8}>
            <Pie data={dataPie} />
          </Col>
          <Col span={16}>
            <Line options={optionsLine} data={dataLine} />
          </Col>
        </Row>
      </div>
    );
  }
}
