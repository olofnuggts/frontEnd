import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import {
  Chart as Chartjs,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";

Chartjs.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController
);
function MyChart() {
  const [response, setData] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async function () {
    const res = await fetch("/api/getalldata");
    const json = await res.json();
    setData(json);
  };

  let temperatureData = [];
  let timeData = [];
  for (let i = 0; i < response.length; i += 15) {
    // console.log(response[i]);
    temperatureData.push(response[i].temperature);
    timeData.push(response[i].time);
  }
  console.log(temperatureData.length);

  const data = {
    labels: timeData,

    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: temperatureData,
      },
    ],
  };
  console.log();
  return (
    <div className="flex flex-row h-1/2 absolute">
      <div>
        <h2>Line Example</h2>
      </div>
      <div className="grow w-full h-full bg-white">
        <Line data={data} />
      </div>
    </div>
  );
}

export default MyChart;
