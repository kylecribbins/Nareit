import React, { useState } from "react";
import Papa from "papaparse";
import Table from "./components/Table";
import Chart from "./components/Chart";
import { extractSectorMetrics, groupSectorData } from "./utils/dataHelpers";

function App() {
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});

  const handleFileLoad = () => {
    Papa.parse(`${process.env.PUBLIC_URL}/reit_data.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;
        setData(rawData);
        setTransformedData(extractSectorMetrics(rawData)); // Extract sector metrics
        setHistoricalData(groupSectorData(rawData)); // Extract historical data
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nareit Data Viewer</h1>
      <button onClick={handleFileLoad}>Load Data</button>
      {transformedData.length > 0 && (
        <>
          <h2>Sector Metrics</h2>
          <Table data={transformedData} />
          <h2>Dividend Yield Over Time</h2>
          <Chart historicalData={historicalData} />
        </>
      )}
    </div>
  );
}

export default App;