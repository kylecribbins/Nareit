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

  // Determine min and max dates for the selected sector
  const sectorDates = Object.values(filteredData).flatMap((sector) => sector.dates);
  const minSectorDate = new Date(Math.min(...sectorDates.map((date) => new Date(date))));
  const maxSectorDate = new Date(Math.max(...sectorDates.map((date) => new Date(date))));

  // Filter Treasury data to match the sector's date range
  const filteredTreasuryYields = {
    dates: treasuryYields.dates.filter(
      (date) => new Date(date) >= minSectorDate && new Date(date) <= maxSectorDate
    ),
    yields: treasuryYields.dates
      .map((date, index) =>
        new Date(date) >= minSectorDate && new Date(date) <= maxSectorDate
          ? treasuryYields.yields[index]
          : null
      )
      .filter((value) => value !== null), // Remove nulls from mismatched dates
  };

  // Generate a unified list of unique dates across the filtered data
  const allDates = Array.from(
    new Set([
      ...sectorDates,
      ...filteredTreasuryYields.dates, // Include filtered Treasury dates
    ])
  ).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order

  // Prepare datasets for each sector
  const datasets = Object.keys(filteredData).map((sector) => {
    const sectorData = filteredData[sector];

    // Align data with allDates, filling gaps with null
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
    data: filteredTreasuryYields.yields, // Use filtered Treasury yields
    fill: true,
    borderColor: "rgb(0, 0, 0)", // Black color for Treasury line
    borderWidth: 2, // Match the thickness of other lines
    borderDash: [5, 5], // Dotted line pattern (dash length and space)
    pointStyle: "circle",
    pointRadius: 1, // Match the point radius of other lines
    tension: 0.1, // Smooth lines
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
        beginAtZero: true,
        title: {
          display: true,
          text: "Dividend Yield",
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
          callback: (value) => `${value}%`, // Append % symbol to tick values
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
        radius: 1, // Radius of 1 for all points
      },
      line: {
        borderWidth: 2, // Adjust the thickness of the line for better visibility
      },
    },
  };

  return <Line data={chartData} options={options} height={550} />;
};

export default SectorChart;