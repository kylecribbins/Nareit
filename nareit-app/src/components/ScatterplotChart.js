import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, Title } from "chart.js";
import { Box } from "@mui/material"; // Import Box for styling
import annotationPlugin from "chartjs-plugin-annotation"; // Import the annotation plugin

// Register required Chart.js components and plugins
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title, annotationPlugin);

const ScatterplotChart = ({ data, xLabel, yLabel, title }) => {
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
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.label}: (${context.raw.x.toFixed(2)}, ${context.raw.y.toFixed(2)})`,
        },
      },
      title: {
        display: true, // Enable the title display
        text: title, // Use the title prop
        font: {
          size: 16, // Adjust title font size
          weight: "bold", // Make it bold
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
    elements: {
      point: {
        radius: 5, // Size of the dots
      },
    },
  };

  // Add labels below dots using Chart.js annotation plugin
  const annotations = {
    plugins: {
      tooltip: { enabled: true },
      annotation: {
        annotations: data.map((point) => ({
          type: "label",
          xValue: point.x,
          yValue: point.y,
          content: point.sector,
          color: "rgba(0, 0, 0, 1)", // Black for labels as well
          font: {
            size: 10,
            weight: "normal",
          },
          yAdjust: 13, // Move the label 13 pixels below the dot, consistent across charts
        })),
      },
    },
  };

  return <Scatter data={chartData} options={{ ...options, ...annotations }} />;
};

export default ScatterplotChart;