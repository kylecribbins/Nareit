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

  // Generate a unified list of unique dates across all sectors
  const allDates = Array.from(
    new Set(Object.values(historicalData).flatMap((sector) => sector.dates))
  ).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

  // Prepare datasets for each sector
  const datasets = Object.keys(historicalData).map((sector) => {
    const sectorData = historicalData[sector];

    // Align data with allDates, filling gaps with null
    const alignedYields = allDates.map((date) => {
      const index = sectorData.dates.indexOf(date);
      return index !== -1 ? sectorData.yields[index] : null;
    });

    return {
      label: sector,
      data: alignedYields,
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 1)`, // Random color for each line
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