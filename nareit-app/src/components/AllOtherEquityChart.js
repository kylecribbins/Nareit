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

const AllOtherEquityChart = ({ historicalData }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p>No data available for the chart.</p>;
  }

  // Define "All Other Equity" sectors
  const allOtherEquitySectors = [
    "Office",
    "Industrial",
    "Diversified",
    "Lodging/Resorts",
    "Self Storage",
    "Health Care",
    "Timberland",
    "Telecommunications",
    "Data Centers",
    "Gaming",
    "Specialty",
  ];

  // Filter "All Other Equity" data only
  const otherEquityData = Object.keys(historicalData)
    .filter((sector) => allOtherEquitySectors.includes(sector))
    .reduce((obj, key) => {
      obj[key] = historicalData[key];
      return obj;
    }, {});

  // Define the color scheme
  const sectorColors = {
    Office: "blue",
    Industrial: "green",
    Diversified: "red",
    "Lodging/Resorts": "purple",
    "Self Storage": "orange",
    "Health Care": "cyan",
    Timberland: "brown",
    Telecommunications: "pink",
    "Data Centers": "yellow",
    Gaming: "gold",
    Specialty: "gray",
  };

  // Generate a unified list of unique dates across all sectors
  const allDates = Array.from(
    new Set(Object.values(otherEquityData).flatMap((sector) => sector.dates))
  ).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

  // Prepare datasets for each sector
  const datasets = Object.keys(otherEquityData).map((sector) => {
    const sectorData = otherEquityData[sector];

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
        text: "Dividend Yields Over Time (All Other Equity Sectors)",
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
    elements: {
      point: {
        radius: 0, // Removes the dots from the line graph
      },
      line: {
        borderWidth: 2, // Adjust the thickness of the line for better visibility
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AllOtherEquityChart;