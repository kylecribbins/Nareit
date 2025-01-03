import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ historicalData }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p>No data available for the chart.</p>;
  }

  const labels = historicalData[Object.keys(historicalData)[0]].dates; // Dates for the x-axis

  const datasets = Object.keys(historicalData).map((sector) => ({
    label: sector,
    data: historicalData[sector].yields,
    fill: false,
    borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, 1)`, // Random color for each line
    tension: 0.1, // Smooth lines
  }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Dividend Yields Over Time by Sector",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Dividend Yield (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;