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

const ReturnsChart = ({ historicalData, sectors, title }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p>No data available for the chart.</p>;
  }

  // Filter data for specified sectors
  const filteredData = Object.keys(historicalData)
    .filter((sector) => sectors.includes(sector))
    .reduce((obj, key) => {
      obj[key] = historicalData[key];
      return obj;
    }, {});

  // Generate random colors for each sector
  const randomColor = () =>
    `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, 0.8)`;

  const sectorColors = Object.keys(filteredData).reduce((colors, sector) => {
    colors[sector] = randomColor();
    return colors;
  }, {});

  // Generate a unified list of unique dates across all sectors
  const allDates = Array.from(
    new Set(Object.values(filteredData).flatMap((sector) => sector.dates))
  ).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

  // Prepare datasets for each sector
  const datasets = Object.keys(filteredData).map((sector) => {
    const sectorData = filteredData[sector];

    // Align data with allDates, filling gaps with null
    const alignedValues = allDates.map((date) => {
      const index = sectorData.dates.indexOf(date);
      return index !== -1 ? sectorData.values[index] : null;
    });

    return {
      label: sector,
      data: alignedValues,
      fill: false,
      borderColor: sectorColors[sector],
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
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Total Index",
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

export default ReturnsChart;