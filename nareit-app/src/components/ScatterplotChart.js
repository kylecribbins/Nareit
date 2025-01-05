import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, Title } from "chart.js";
import { Box } from "@mui/material"; // Import Box for styling
import annotationPlugin from "chartjs-plugin-annotation"; // Import the annotation plugin

// Register required Chart.js components and plugins
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title, annotationPlugin);

const ScatterplotChart = ({ data, xLabel, yLabel = "Average Monthly Returns (%)", title }) => {
  // Assign black color for all points
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
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#000", // Set legend text color to black
        },
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
          yAdjust: 13, // Move the label 13 pixels below the dot
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
          color: "#000", // Set x-axis title text color to black
          font: {
            size: 14,
            weight: "bold", // Match font size and weight to other charts
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#000", // Set x-axis tick labels color to black
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel, // Updated to reflect Average Monthly Returns
          color: "#000", // Set y-axis title text color to black
          font: {
            size: 14,
            weight: "bold", // Match font size and weight to other charts
          },
        },
        grid: {
          drawOnChartArea: true,
        },
        ticks: {
          callback: (value) => `${value.toFixed(2)}%`, // Format ticks as percentages
          color: "#000", // Set y-axis tick labels color to black
        },
      },
    },
    elements: {
      point: {
        radius: 6, // Size of the dots
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default ScatterplotChart;