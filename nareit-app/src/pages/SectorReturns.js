import React, { useState } from "react";
import ReturnsChart from "../components/ReturnsChart";
import ScatterplotChart from "../components/ScatterplotChart";
import SectionHeader from "../components/SectionHeader";
import PriceIncomeChart from "../components/PriceIncomeChart";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { sectorDefinitions, allSectors } from "../utils/sectorDefinitions";

const SectorReturns = ({
  residentialData,
  retailData,
  allOtherEquityData,
  mortgageData,
  scatterData1Year,
  scatterData3Year,
  scatterData5Year,
  scatterData10Year,
  sectorColors,
  sp500Data,
  priceAndIncomeData,
}) => {
  const [selectedSector, setSelectedSector] = useState("Residential");
  const [selectedIncomeSector, setSelectedIncomeSector] = useState(allSectors[0]); // New state for Price vs Income chart

  const [selectedTimeframe, setSelectedTimeframe] = useState("1-Year");

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const handleIncomeSectorChange = (event) => {
    setSelectedIncomeSector(event.target.value);
  };

  const handleTimeframeChange = (event) => {
    setSelectedTimeframe(event.target.value);
  };

  const sectorDataMap = {
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
      data: allOtherEquityData,
      sectors: sectorDefinitions["All Other Equity"],
      title: "All Other Equity Sectors",
    },
    Mortgage: {
      data: mortgageData,
      sectors: sectorDefinitions.Mortgage,
      title: "Mortgage Sectors",
    },
  };

  const scatterplotDataMap = {
    "1-Year": scatterData1Year,
    "3-Year": scatterData3Year,
    "5-Year": scatterData5Year,
    "10-Year": scatterData10Year,
  };

  const scatterplotLabelsMap = {
    "1-Year": {
      x: "Standard Deviation of Monthly Returns (%)",
      y: "1-Year Average Monthly Return",
      title: "1-Year Risk vs Average Monthly Return",
    },
    "3-Year": {
      x: "Standard Deviation of Monthly Returns (%)",
      y: "3-Year Average Monthly Return",
      title: "3-Year Risk vs Average Monthly Return",
    },
    "5-Year": {
      x: "Standard Deviation of Monthly Returns (%)",
      y: "5-Year Average Monthly Return",
      title: "5-Year Risk vs Average Monthly Return",
    },
    "10-Year": {
      x: "Standard Deviation of Monthly Returns (%)",
      y: "10-Year Average Monthly Return",
      title: "10-Year Risk vs Average Monthly Return",
    },
  };

  const selectedSectorData = sectorDataMap[selectedSector];
  const selectedScatterplotData = scatterplotDataMap[selectedTimeframe];
  const selectedLabels = scatterplotLabelsMap[selectedTimeframe];

  return (
    <div>
      {/* Section Header */}
      <SectionHeader title="REIT Sector Returns" />

      {/* Sector Returns Section */}
      <Box sx={{ padding: "20px", marginTop: "10px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: "70%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >
            Sector Returns
          </Typography>

          {/* Sector Selector for Sector Returns */}
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel id="sector-select-label">Select Sector</InputLabel>
            <Select
              labelId="sector-select-label"
              value={selectedSector}
              onChange={handleSectorChange}
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

      {/* Returns Chart */}
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
          <ReturnsChart
            historicalData={selectedSectorData.data}
            sectors={selectedSectorData.sectors}
            title={selectedSectorData.title}
            sectorColors={sectorColors}
            sp500Data={sp500Data}
          />
          {/* Add source information below the chart */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              marginTop: "10px",
              textAlign: "left",
            }}
          >
            Source: Nareit, Yahoo Finance.
          </Typography>
        </Box>
      </Box>

{/* Price vs Income Returns Chart */}
<Box sx={{ padding: "20px", marginTop: "75px" }}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "20px", // Space between title and selector
      width: "70%", // Match the width of other chart sections
      margin: "0 auto", // Center the container
    }}
  >
    {/* Title */}
    <Typography
      variant="h5"
      component="h2"
      sx={{
        fontWeight: "bold",
        flexShrink: 0, // Prevent title from shrinking
      }}
    >
      Sector Price vs. Income Return
    </Typography>

    {/* New Dropdown for All Sectors */}
    <FormControl sx={{ minWidth: 250 }}>
      <InputLabel id="income-sector-select-label">Select Sector</InputLabel>
      <Select
        labelId="income-sector-select-label"
        value={selectedIncomeSector}
        onChange={handleIncomeSectorChange}
        autoWidth
      >
        {allSectors.map((sector) => (
          <MenuItem key={sector} value={sector}>
            {sector}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>

  {/* PriceIncomeChart */}
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
        height: "500px",
      }}
    >
      <PriceIncomeChart
        data={priceAndIncomeData}
        sector={selectedIncomeSector}
        title={`Price vs Income Returns for ${selectedIncomeSector}`}
      />
    </Box>
  </Box>
</Box>

      {/* Sector Risk vs. Reward Section */}
      <Box sx={{ padding: "20px", marginTop: "75px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: "70%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >
            Sector Risk vs. Reward
          </Typography>

          {/* Form Selector for Timeframe */}
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel id="timeframe-select-label">Select Timeframe</InputLabel>
            <Select
              labelId="timeframe-select-label"
              value={selectedTimeframe}
              onChange={handleTimeframeChange}
              autoWidth
            >
              <MenuItem value="1-Year">1-Year</MenuItem>
              <MenuItem value="3-Year">3-Year</MenuItem>
              <MenuItem value="5-Year">5-Year</MenuItem>
              <MenuItem value="10-Year">10-Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Scatterplot Chart */}
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
            height: "700px",
          }}
        >
          <ScatterplotChart
            data={selectedScatterplotData}
            xLabel={selectedLabels.x}
            yLabel={selectedLabels.y}
            title={selectedLabels.title}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SectorReturns;