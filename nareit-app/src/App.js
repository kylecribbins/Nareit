import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Papa from "papaparse";
import Table from "./components/Table";
import RetailChart from "./components/RetailChart";
import ResidentialChart from "./components/ResidentialChart";
import AllOtherEquityChart from "./components/AllOtherEquityChart";
import MortgageChart from "./components/MortgageChart";
import Grid from "@mui/material/Grid"; // Stable Grid import
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SectorReturns from "./pages/SectorReturns";
import About from "./pages/About";
import {
  extractSectorMetrics,
  filterRetailSectors,
  filterResidentialSectors,
  filterAllOtherEquitySectors,
  filterMortgageSectors,
} from "./utils/dataHelpers";

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
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            REIT Central
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/sector-returns">
            Sector Returns
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>REIT Central</h1>
                <button onClick={handleFileLoad}>Load Data</button>
                {transformedData.length > 0 && (
                  <>
                    <h2>Sector Metrics</h2>
                    <Table data={transformedData} />
                    <h2>Sector Charts</h2>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <ResidentialChart historicalData={residentialData} />
                      </Grid>
                      <Grid item xs={6}>
                        <RetailChart historicalData={retailData} />
                      </Grid>
                      <Grid item xs={6}>
                        <AllOtherEquityChart historicalData={otherEquityData} />
                      </Grid>
                      <Grid item xs={6}>
                        <MortgageChart historicalData={mortgageData} />
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            }
          />
          <Route path="/sector-returns" element={<SectorReturns />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;