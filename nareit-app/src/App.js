import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Papa from "papaparse";
import Table from "./components/Table";
import SectorChart from "./components/SectorChart";
import SectionHeader from "./components/SectionHeader";
import Grid from "@mui/material/Grid";
import AppAppBar from "./components/AppAppBar";
import Footer from "./components/Footer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SectorReturns from "./pages/SectorReturns";
import About from "./pages/About";
import {
  extractSectorMetrics,
  filterOutSTDEV,
  filterRetailSectors,
  filterResidentialSectors,
  filterAllOtherEquitySectors,
  filterMortgageSectors,
  filterRetailIndexData,
  filterResidentialIndexData,
  filterAllOtherEquityIndexData,
  filterMortgageIndexData,
  extractScatterplotData,
  sectorColors, // Import sectorColors
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
  const [scatterData1Year, setScatterData1Year] = useState([]);
  const [scatterData3Year, setScatterData3Year] = useState([]);
  const [scatterData5Year, setScatterData5Year] = useState([]);
  const [scatterData10Year, setScatterData10Year] = useState([]);

  useEffect(() => {
    Papa.parse(`${process.env.PUBLIC_URL}/reit_data.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;
        setData(rawData);

        const metrics = extractSectorMetrics(rawData);
        const filteredMetrics = filterOutSTDEV(metrics);
        setTransformedData(filteredMetrics);

        setRetailData(filterRetailSectors(rawData));
        setResidentialData(filterResidentialSectors(rawData));
        setOtherEquityData(filterAllOtherEquitySectors(rawData));
        setMortgageData(filterMortgageSectors(rawData));

        setRetailIndexData(filterRetailIndexData(rawData));
        setResidentialIndexData(filterResidentialIndexData(rawData));
        setOtherEquityIndexData(filterAllOtherEquityIndexData(rawData));
        setMortgageIndexData(filterMortgageIndexData(rawData));

        setScatterData1Year(extractScatterplotData(metrics, "stdev1", "cagr1"));
        setScatterData3Year(extractScatterplotData(metrics, "stdev3", "cagr3"));
        setScatterData5Year(extractScatterplotData(metrics, "stdev5", "cagr5"));
        setScatterData10Year(extractScatterplotData(metrics, "stdev10", "cagr10"));
      },
    });
  }, []);

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
      <main style={{ flex: "1", padding: "80px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {transformedData.length > 0 && (
                  <>
                    <SectionHeader title="REIT Central" />
                    <Table data={transformedData} />
                    <SectionHeader title="Sector Dividend Yields" />
                    <Grid container spacing={2} sx={{ paddingLeft: "40px", paddingRight: "40px" }}>
                      <Grid item xs={6}>
                        <SectorChart
                          historicalData={residentialData}
                          sectors={["Residential", "Apartments", "Manufactured Homes", "Single Family Homes"]}
                          title="Residential Sectors"
                          sectorColors={sectorColors} // Pass colors
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <SectorChart
                          historicalData={retailData}
                          sectors={["Retail", "Shopping Centers", "Regional Malls", "Free Standing"]}
                          title="Retail Sectors"
                          sectorColors={sectorColors} // Pass colors
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <SectorChart
                          historicalData={otherEquityData}
                          sectors={[
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
                          ]}
                          title="All Other Equity Sectors"
                          sectorColors={sectorColors} // Pass colors
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <SectorChart
                          historicalData={mortgageData}
                          sectors={["Home Financing", "Commercial Financing"]}
                          title="Mortgage Sectors"
                          sectorColors={sectorColors} // Pass colors
                        />
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
                scatterData1Year={scatterData1Year}
                scatterData3Year={scatterData3Year}
                scatterData5Year={scatterData5Year}
                scatterData10Year={scatterData10Year}
                sectorColors={sectorColors} // Pass colors to SectorReturns
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;