import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Papa from "papaparse";
import Table from "./components/Table";
import SectorChart from "./components/SectorChart";
import SectionHeader from "./components/SectionHeader";
import AppAppBar from "./components/AppAppBar";
import Footer from "./components/Footer";
import ChartContainer from "./components/ChartContainer"; // Import ChartContainer
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SectorReturns from "./pages/SectorReturns";
import SectorDefinitionsAccordion from "./components/SectorDefinitionsAccordion";
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
  extractTreasuryData,
  sectorColors,
  extractSP500NormalizedData,
  extractPriceAndIncomeReturns,
} from "./utils/dataHelpers";
import { sectorDefinitions } from "./utils/sectorDefinitions";

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
  const [treasuryData, setTreasuryData] = useState({ dates: [], yields: [] });
  const [sp500Data, setSP500Data] = useState({ dates: [], normalized: [] });
  const [priceAndIncomeData, setPriceAndIncomeData] = useState({});

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

        const priceAndIncome = extractPriceAndIncomeReturns(rawData);
        setPriceAndIncomeData(priceAndIncome);
      },
    });

    // Load Treasury data
    Papa.parse(`${process.env.PUBLIC_URL}/treasury_data.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rawTreasuryData = result.data;
        const treasury = extractTreasuryData(rawTreasuryData);
        setTreasuryData(treasury);
      },
    });

    // Load S&P 500 data
    Papa.parse(`${process.env.PUBLIC_URL}/sp500_data.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rawSP500Data = result.data;
        const sp500 = extractSP500NormalizedData(rawSP500Data);
        setSP500Data(sp500);
      },
    });
  }, []);

  // Mapping for dropdown selection to sector data
  const dividendSectorDataMap = {
    Residential: {
      data: residentialData,
      sectors: sectorDefinitions.Residential,
      title: "Residential Sectors",
    },
    Retail: {
      data: retailData,
      sectors: sectorDefinitions.Retail,
      title: "Retail Sectors",
    },
    "All Other Equity": {
      data: otherEquityData,
      sectors: sectorDefinitions["All Other Equity"],
      title: "All Other Equity Sectors",
    },
    Mortgage: {
      data: mortgageData,
      sectors: sectorDefinitions.Mortgage,
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

                    {/* Dividend Yield Chart in ChartContainer */}
                    <ChartContainer
                      title="Sector Dividend Yields"
                      formControlLabel="Select Sector"
                      formControlValue={selectedDividendSector}
                      formControlOptions={[
                        { label: "Residential", value: "Residential" },
                        { label: "Retail", value: "Retail" },
                        { label: "All Other Equity", value: "All Other Equity" },
                        { label: "Mortgage", value: "Mortgage" },
                      ]}
                      onFormControlChange={(e) => setSelectedDividendSector(e.target.value)}
                      chartComponent={
                        <SectorChart
                          historicalData={selectedSectorData.data}
                          sectors={selectedSectorData.sectors}
                          title={selectedSectorData.title}
                          treasuryYields={treasuryData}
                          sectorColors={sectorColors}
                        />
                      }
                      description="Source: Nareit, FRED."
                    />
                                        {/* Sector Definitions Accordion */}
                                        <SectorDefinitionsAccordion />
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
                sp500Data={sp500Data}
                priceAndIncomeData={priceAndIncomeData}
                sectorColors={sectorColors}
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