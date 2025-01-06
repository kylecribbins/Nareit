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

const SectorChart = ({ historicalData, sectors, title, sectorColors, treasuryYields }) => {
  if (!historicalData || Object.keys(historicalData).length === 0) {
    return <p>No data available for the chart.</p>;
  }

  // Filter the data for the specified sectors
  const filteredData = Object.keys(historicalData)
    .filter((sector) => sectors.includes(sector))
    .reduce((obj, key) => {
      obj[key] = historicalData[key];
      return obj;
    }, {});

  // Generate a unified list of unique dates
  const allDates = Array.from(
    new Set([
      ...Object.values(filteredData).flatMap((sector) => sector.dates),
      ...treasuryYields.dates,
    ])
  ).sort((a, b) => new Date(a) - new Date(b));

  // Prepare datasets for each sector
  const datasets = Object.keys(filteredData).map((sector) => {
    const sectorData = filteredData[sector];

    // Align sector data with allDates, filling gaps with null
    const alignedYields = allDates.map((date) => {
      const index = sectorData.dates.indexOf(date);
      return index !== -1 ? sectorData.yields[index] : null;
    });

    return {
      label: sector,
      data: alignedYields,
      fill: false,
      borderColor: sectorColors[sector] || "#000", // Use provided color or default to black
      tension: 0.1, // Smooth lines
    };
  });

  // Add 10-Year Treasury data as a separate dataset
  datasets.push({
    label: "10-Year Treasury",
    data: allDates.map((date) => {
      const index = treasuryYields.dates.indexOf(date);
      return index !== -1 ? treasuryYields.yields[index] : null;
    }),
    fill: false,
    borderColor: "#ff8000", // Orange color for high visibility
    borderWidth: 2, // Match the same thickness as the dividend yield lines
    tension: 0.1, // Smooth lines
    pointStyle: "circle",
    pointRadius: 0, // Match the point size of dividend yield lines
    pointBackgroundColor: "#ff8000", // Match point color with the line
    borderDash: [8, 4], // Dash effect: 8px line, 4px gap
  });

  const chartData = {
    labels: allDates, // Unified date list for the x-axis
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#000", // Legend text color
        },
      },
      title: {
        display: true,
        text: title,
        color: "#000", // Chart title color
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Dividend Yield",
          color: "#000",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          drawOnChartArea: true,
        },
        ticks: {
          color: "#000",
          callback: (value) => `${value}%`,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#000",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#000",
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

  return <Line data={chartData} options={options} height={550} />;
};

export default SectorChart;