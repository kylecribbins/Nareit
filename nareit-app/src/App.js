import React, { useState } from "react";
import Papa from "papaparse";
import Table from "./components/Table";
import RetailChart from "./components/RetailChart";
import ResidentialChart from "./components/ResidentialChart";
import AllOtherEquityChart from "./components/AllOtherEquityChart";
import MortgageChart from "./components/MortgageChart";
import {
  extractSectorMetrics,
  filterRetailSectors,
  filterResidentialSectors,
  filterAllOtherEquitySectors,
  filterMortgageSectors,
} from './utils/dataHelpers';

function App() {
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [retailData, setRetailData] = useState({});
  const [residentialData, setResidentialData] = useState({});
  const [otherEquityData, setOtherEquityData] = useState({});
  const [mortgageData, setMortgageData] = useState({});

  const handleFileLoad = () => {
    Papa.parse(`${process.env.PUBLIC_URL}/reit_data.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;
        setData(rawData);
        setTransformedData(extractSectorMetrics(rawData)); // Extract sector metrics
        setRetailData(filterRetailSectors(rawData)); // Filter retail sectors
        setResidentialData(filterResidentialSectors(rawData)); // Filter residential sectors
        setOtherEquityData(filterAllOtherEquitySectors(rawData)); // Filter all other equity sectors
        setMortgageData(filterMortgageSectors(rawData)); // Filter mortgage sectors
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
          <h2>Retail Sectors</h2>
          <RetailChart historicalData={retailData} />
          <h2>Residential Sectors</h2>
          <ResidentialChart historicalData={residentialData} />
          <h2>All Other Equity Sectors</h2>
          <AllOtherEquityChart historicalData={otherEquityData} />
          <h2>Mortgage Sectors</h2>
          <MortgageChart historicalData={mortgageData} />
        </>
      )}
    </div>
  );
}

export default App;