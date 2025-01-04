import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Papa from "papaparse";
import Table from "./components/Table";
import RetailChart from "./components/RetailChart";
import ResidentialChart from "./components/ResidentialChart";
import AllOtherEquityChart from "./components/AllOtherEquityChart";
import MortgageChart from "./components/MortgageChart";
import Grid from "@mui/material/Grid";
import AppAppBar from "./components/AppAppBar";
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
  filterRetailIndexData,
  filterResidentialIndexData,
  filterAllOtherEquityIndexData,
  filterMortgageIndexData,
} from "./utils/dataHelpers";

function App() {
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [retailData, setRetailData] = useState({});
  const [residentialData, setResidentialData] = useState({});
  const [otherEquityData, setOtherEquityData] = useState({});
  const [mortgageData, setMortgageData] = useState({});
  const [retailIndexData, setRetailIndexData] = useState({});
  const [residentialIndexData, setResidentialIndexData] = useState({});
  const [otherEquityIndexData, setOtherEquityIndexData] = useState({});
  const [mortgageIndexData, setMortgageIndexData] = useState({});

  // Automatically load data when the app starts
  useEffect(() => {
    Papa.parse(`${process.env.PUBLIC_URL}/reit_data.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;
        setData(rawData);
        setTransformedData(extractSectorMetrics(rawData)); // Extract sector metrics
        setRetailData(filterRetailSectors(rawData)); // Filter retail sectors for homepage charts
        setResidentialData(filterResidentialSectors(rawData)); // Filter residential sectors for homepage charts
        setOtherEquityData(filterAllOtherEquitySectors(rawData)); // Filter all other equity sectors for homepage charts
        setMortgageData(filterMortgageSectors(rawData)); // Filter mortgage sectors for homepage charts

        // Set data for returns charts
        setRetailIndexData(filterRetailIndexData(rawData));
        setResidentialIndexData(filterResidentialIndexData(rawData));
        setOtherEquityIndexData(filterAllOtherEquityIndexData(rawData));
        setMortgageIndexData(filterMortgageIndexData(rawData));
      },
    });
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <Router>
      <AppAppBar position="static">
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
      </AppAppBar>
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div style={{ textAlign: "center" }}>
                  <h1>REIT Central</h1>
                </div>
                {transformedData.length > 0 && (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <h2>Sector Metrics</h2>
                    </div>
                    <Table data={transformedData} />
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <h2>Sector Dividend Yields</h2>
                    </div>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <div style={{ textAlign: "center", marginBottom: "10px" }}>
                          <h2>Residential Sectors</h2>
                        </div>
                        <ResidentialChart historicalData={residentialData} />
                      </Grid>
                      <Grid item xs={6}>
                        <div style={{ textAlign: "center", marginBottom: "10px" }}>
                          <h2>Retail Sectors</h2>
                        </div>
                        <RetailChart historicalData={retailData} />
                      </Grid>
                      <Grid item xs={6}>
                        <div style={{ textAlign: "center", marginBottom: "10px" }}>
                          <h2>All Other Equity Sectors</h2>
                        </div>
                        <AllOtherEquityChart historicalData={otherEquityData} />
                      </Grid>
                      <Grid item xs={6}>
                        <div style={{ textAlign: "center", marginBottom: "10px" }}>
                          <h2>Mortgage Sectors</h2>
                        </div>
                        <MortgageChart historicalData={mortgageData} />
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/sector-returns"
            element={
              <SectorReturns
                residentialData={residentialIndexData}
                retailData={retailIndexData}
                allOtherEquityData={otherEquityIndexData}
                mortgageData={mortgageIndexData}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;