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

const AllOtherEquitySectorsReturnsChart = ({ historicalData }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p style={{ textAlign: "center" }}>No data available for All Other Equity Sectors.</p>;
  }

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

  const equityData = Object.keys(historicalData)
    .filter((sector) => allOtherEquitySectors.includes(sector))
    .reduce((obj, key) => {
      obj[key] = historicalData[key];
      return obj;
    }, {});

  const sectorColors = {
    Office: "blue",
    Industrial: "green",
    Diversified: "red",
    "Lodging/Resorts": "orange",
    "Self Storage": "purple",
    "Health Care": "teal",
    Timberland: "brown",
    Telecommunications: "cyan",
    "Data Centers": "pink",
    Gaming: "yellow",
    Specialty: "gray",
  };

  const allDates = Array.from(
    new Set(Object.values(equityData).flatMap((sector) => sector.dates || []))
  ).sort((a, b) => new Date(a) - new Date(b));

  const datasets = Object.keys(equityData).map((sector) => {
    const sectorData = equityData[sector];
    const alignedValues = allDates.map((date) => {
      const index = sectorData.dates?.indexOf(date);
      return index !== -1 ? sectorData.values[index] : null;
    });

    return {
      label: sector,
      data: alignedValues,
      fill: false,
      borderColor: sectorColors[sector] || "black",
      tension: 0.1,
    };
  });

  const chartData = {
    labels: allDates,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Total Returns Over Time (All Other Equity Sectors)",
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
        radius: 0,
      },
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <Box
      sx={{
        margin: "10px",
      }}
    >
      <Line data={chartData} options={options} height={600} />
    </Box>
  );
};

export default AllOtherEquitySectorsReturnsChart;