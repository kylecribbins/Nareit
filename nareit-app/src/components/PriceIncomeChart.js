import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PriceIncomeChart = ({ data, sector, title }) => {
  if (!data || !data[sector]) {
    return <p>No data available for the selected sector.</p>;
  }

  const sectorData = data[sector];
  const { dates, priceReturns, incomeReturns } = sectorData;

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Income Return (%)",
        data: incomeReturns,
        backgroundColor: "rgb(0, 0, 255)", // Blue
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Price Return (%)",
        data: priceReturns,
        backgroundColor: "rgb(0, 0, 0)", // Black
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#000", // Legend text color to black
        },
      },
      title: {
        display: true,
        text: title || "Price vs Income Returns",
        color: "#000", // Title text color to black
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Date",
          color: "#000", // X-axis title color to black
          font: {
            size: 14,
            weight: "bold", // Bold X-axis title
          },
        },
        grid: {
          drawOnChartArea: false, // Removes vertical gridlines
        },
        ticks: {
          color: "#000", // X-axis labels color to black
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Return (%)",
          color: "#000", // Y-axis title color to black
          font: {
            size: 14,
            weight: "bold", // Bold Y-axis title
          },
        },
        ticks: {
          color: "#000", // Y-axis labels color to black
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} height={550} />; 
};

export default PriceIncomeChart;