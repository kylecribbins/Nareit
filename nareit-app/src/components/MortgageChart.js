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

const MortgageChart = ({ historicalData }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p>No data available for the chart.</p>;
  }

  // Define mortgage sectors
  const mortgageSectors = ["Home Financing", "Commercial Financing"];

  // Filter Mortgage data only
  const mortgageData = Object.keys(historicalData)
    .filter((sector) => mortgageSectors.includes(sector))
    .reduce((obj, key) => {
      obj[key] = historicalData[key];
      return obj;
    }, {});

  // Define the color scheme
  const sectorColors = {
    "Home Financing": "blue",
    "Commercial Financing": "green",
  };

  // Generate a unified list of unique dates across all mortgage sectors
  const allDates = Array.from(
    new Set(Object.values(mortgageData).flatMap((sector) => sector.dates))
  ).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

  // Prepare datasets for each mortgage sector
  const datasets = Object.keys(mortgageData).map((sector) => {
    const sectorData = mortgageData[sector];

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
        text: "Dividend Yields Over Time (Mortgage Sectors)",
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

export default MortgageChart;