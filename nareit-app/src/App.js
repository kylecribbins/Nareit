import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Papa from "papaparse";
import Table from "./components/Table";
import SectorChart from "./components/SectorChart";
import SectionHeader from "./components/SectionHeader";
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
  extractTreasuryData, // Import extractTreasuryData
  sectorColors, // Import sectorColors
} from "./utils/dataHelpers";
import { sectorDefinitions } from "./utils/sectorDefinitions"; // Import sector definitions
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [selectedDividendSector, setSelectedDividendSector] = useState("Residential");
  const [treasuryData, setTreasuryData] = useState({ dates: [], yields: [] }); // Updated to reflect new file

  useEffect(() => {
    // Load main REIT data
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

        setScatterData1Year(extractScatterplotData(metrics, "stdev1", "avgReturn1"));
        setScatterData3Year(extractScatterplotData(metrics, "stdev3", "avgReturn3"));
        setScatterData5Year(extractScatterplotData(metrics, "stdev5", "avgReturn5"));
        setScatterData10Year(extractScatterplotData(metrics, "stdev10", "avgReturn10"));
      },
    });

    // Load Treasury data from the new file
    Papa.parse(`${process.env.PUBLIC_URL}/treasury_data.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rawTreasuryData = result.data;
        const treasury = extractTreasuryData(rawTreasuryData); // Use updated extractTreasuryData
        setTreasuryData(treasury);
      },
    });
  }, []);

  // Mapping for dropdown selection to sector data
  const dividendSectorDataMap = {
    Residential: {
      data: residentialData,
      sectors: sectorDefinitions.Residential, // Use sectorDefinitions
      title: "Residential Sectors",
    },
    Retail: {
      data: retailData,
      sectors: sectorDefinitions.Retail, // Use sectorDefinitions
      title: "Retail Sectors",
    },
    "All Other Equity": {
      data: otherEquityData,
      sectors: sectorDefinitions["All Other Equity"], // Use sectorDefinitions
      title: "All Other Equity Sectors",
    },
    Mortgage: {
      data: mortgageData,
      sectors: sectorDefinitions.Mortgage, // Use sectorDefinitions
      title: "Mortgage Sectors",
    },
  };

  const selectedSectorData = dividendSectorDataMap[selectedDividendSector];

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

                    <Box sx={{ padding: "20px", marginTop: "75px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px", // Add space between title and selector
                          width: "70%", // Match the width of the chart below
                          margin: "0 auto", // Center the container
                        }}
                      >
                        {/* Title */}
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{
                            fontWeight: "bold",
                            flexShrink: 0, // Prevent the title from shrinking
                          }}
                        >
                          Sector Dividend Yields
                        </Typography>

                        {/* Form Selector */}
                        <FormControl sx={{ minWidth: 250 }}>
                          <InputLabel id="dividend-sector-select-label">Select Sector</InputLabel>
                          <Select
                            labelId="dividend-sector-select-label"
                            value={selectedDividendSector}
                            onChange={(e) => setSelectedDividendSector(e.target.value)}
                            autoWidth
                          >
                            <MenuItem value="Residential">Residential</MenuItem>
                            <MenuItem value="Retail">Retail</MenuItem>
                            <MenuItem value="All Other Equity">All Other Equity</MenuItem>
                            <MenuItem value="Mortgage">Mortgage</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        padding: "10px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "70%",
                          maxWidth: "70%",
                          height: "850px",
                        }}
                      >
                        <SectorChart
                          historicalData={selectedSectorData.data}
                          sectors={selectedSectorData.sectors}
                          title={selectedSectorData.title}
                          treasuryYields={treasuryData} // Pass Treasury data
                          sectorColors={sectorColors} // Pass colors
                        />
                      </Box>
                    </Box>
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