import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, Title } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation"; // Import the annotation plugin

// Register required Chart.js components and plugins
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title, annotationPlugin);

const ScatterplotChart = ({ data, xLabel, yLabel = "Average Monthly Returns (%)", title }) => {
  const chartData = {
    datasets: [
      {
        label: title,
        data: data.map((point) => ({ x: point.x, y: point.y, label: point.sector })),
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Black color for dots
        borderColor: "rgba(0, 0, 0, 1)", // Black border for dots
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to stretch with container
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#000", // Set legend text color to black
        },
      },
      title: {
        display: true,
        text: title, // Use the title prop
        color: "#000", // Title color set to black
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.raw.label}: (${context.raw.x.toFixed(2)}, ${context.raw.y.toFixed(2)}%)`,
        },
      },
      annotation: {
        annotations: data.map((point) => ({
          type: "label",
          xValue: point.x,
          yValue: point.y,
          content: point.sector,
          color: "rgba(0, 0, 0, 1)", // Black for labels
          font: {
            size: 10,
            weight: "normal",
          },
          yAdjust: 13,
        })),
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: xLabel,
          color: "#000",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          color: "#000",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          drawOnChartArea: true,
        },
        ticks: {
          callback: (value) => `${value.toFixed(2)}%`,
          color: "#000",
        },
      },
    },
    elements: {
      point: {
        radius: 6,
      },
    },
  };

  return <Scatter data={chartData} options={options} height={550} />;
};

export default ScatterplotChart;