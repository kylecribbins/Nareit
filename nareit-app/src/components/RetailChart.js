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

const RetailChart = ({ historicalData }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p>No data available for the chart.</p>;
  }

  // Define retail sectors
  const retailSectors = ["Retail", "Shopping Centers", "Regional Malls", "Free Standing"];

  // Filter Retail data only
  const retailData = Object.keys(historicalData)
    .filter((sector) => retailSectors.includes(sector))
    .reduce((obj, key) => {
      obj[key] = historicalData[key];
      return obj;
    }, {});

  // Define the color scheme
  const sectorColors = {
    Retail: "blue",
    "Shopping Centers": "green",
    "Regional Malls": "red",
    "Free Standing": "purple",
  };

  // Generate a unified list of unique dates across all retail sectors
  const allDates = Array.from(
    new Set(Object.values(retailData).flatMap((sector) => sector.dates))
  ).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

  // Prepare datasets for each retail sector
  const datasets = Object.keys(retailData).map((sector) => {
    const sectorData = retailData[sector];

    // Align data with allDates, filling gaps with null
    const alignedYields = allDates.map((date) => {
      const index = sectorData.dates.indexOf(date);
      return index !== -1 ? sectorData.yields[index] : null;
    });

    return {
      label: sector,
      data: alignedYields,
      fill: false,
      borderColor: sectorColors[sector] || "black", // Default to black if not matched
      tension: 0.1, // Smooth lines
    };
  });

  const chartData = {
    labels: allDates, // Unified date list for the x-axis
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
        text: "Dividend Yields Over Time (Retail Sectors)",
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

export default RetailChart;