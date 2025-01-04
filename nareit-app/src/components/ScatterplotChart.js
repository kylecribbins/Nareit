import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const ScatterplotChart = ({ data, xLabel, yLabel, title }) => {
  const chartData = {
    datasets: [
      {
        label: title,
        data: data.map((point) => ({ x: point.x, y: point.y, label: point.sector })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.label}: (${context.raw.x.toFixed(2)}, ${context.raw.y.toFixed(2)})`,
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: xLabel,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default ScatterplotChart;