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
import { Box } from "@mui/material";

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RetailSectorsReturnsChart = ({ historicalData }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p style={{ textAlign: "center" }}>No data available for Retail Sectors.</p>;
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
    new Set(Object.values(retailData).flatMap((sector) => sector.dates || []))
  ).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

  // Prepare datasets for each retail sector
  const datasets = Object.keys(retailData).map((sector) => {
    const sectorData = retailData[sector];

    // Align data with allDates, filling gaps with null
    const alignedValues = allDates.map((date) => {
      const index = sectorData.dates?.indexOf(date);
      return index !== -1 ? sectorData.values[index] : null;
    });

    return {
      label: sector,
      data: alignedValues,
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
    maintainAspectRatio: false, // Allows custom sizing
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Total Returns Over Time (Retail Sectors)",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Normalized Total Index",
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

  return (
    <Box
      sx={{
        margin: "10px", // Add some spacing around the chart
      }}
    >
      <Line data={chartData} options={options} height={600} />
    </Box>
  );
};

export default RetailSectorsReturnsChart;