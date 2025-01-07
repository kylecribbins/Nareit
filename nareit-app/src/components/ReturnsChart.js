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

const ReturnsChart = ({ historicalData, sectors, title, sectorColors, sp500Data }) => {
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

  // Generate a unified list of unique dates across all sectors
  const allDates = Array.from(
    new Set([
      ...Object.values(filteredData).flatMap((sector) => sector.dates),
      ...sp500Data.dates, // Include S&P 500 dates
    ])
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
      borderColor: sectorColors[sector] || "#000", // Use provided color or default to black
      tension: 0.1, // Smooth lines
    };
  });

  // Add S&P 500 normalized data as a separate dataset
  datasets.push({
    label: "S&P 500 (Normalized)",
    data: allDates.map((date) => {
      const index = sp500Data.dates.indexOf(date);
      return index !== -1 ? sp500Data.normalized[index] : null;
    }),
    fill: false,
    borderColor: "#ff8000", // Orange color for high visibility
    borderWidth: 2, // Match the same thickness as other lines
    tension: 0.1, // Smooth lines
    pointStyle: "circle",
    pointRadius: 0, // Remove dots for the S&P 500 line
    pointBackgroundColor: "#ff8000", // Match point color with the line
    borderDash: [8, 4], // Dash effect: 8px line, 4px gap
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
        labels: {
          color: "#000", // Set legend text color to black
        },
      },
      title: {
        display: true,
        text: title,
        color: "#000", // Set chart title text color to black
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Total Index",
          color: "#000", // Set y-axis title text color to black
          font: {
            size: 14,
            weight: "bold", // Make y-axis title bold
          },
        },
        grid: {
          drawOnChartArea: true, // Keep y-axis gridlines
        },
        ticks: {
          color: "#000", // Set y-axis tick labels color to black
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#000", // Set x-axis title text color to black
          font: {
            size: 14,
            weight: "bold", // Make x-axis title bold
          },
        },
        grid: {
          drawOnChartArea: false, // Remove x-axis gridlines
        },
        ticks: {
          color: "#000", // Set x-axis tick labels color to black
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

  return <Line data={chartData} options={options} height={550} />;
};

export default ReturnsChart;