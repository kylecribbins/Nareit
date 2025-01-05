import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ReturnsChart from "../components/ReturnsChart";
import ScatterplotChart from "../components/ScatterplotChart";
import SectionHeader from "../components/SectionHeader";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

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
}) => {
  const [selectedSector, setSelectedSector] = useState("Residential");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1-Year");

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const handleTimeframeChange = (event) => {
    setSelectedTimeframe(event.target.value);
  };

  const sectorDataMap = {
    Residential: {
      data: residentialData,
      sectors: ["Residential", "Apartments", "Manufactured Homes", "Single Family Homes"],
      title: "Residential Sectors",
    },
    Retail: {
      data: retailData,
      sectors: ["Retail", "Shopping Centers", "Regional Malls", "Free Standing"],
      title: "Retail Sectors",
    },
    "All Other Equity": {
      data: allOtherEquityData,
      sectors: [
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
      ],
      title: "All Other Equity Sectors",
    },
    Mortgage: {
      data: mortgageData,
      sectors: ["Home Financing", "Commercial Financing"],
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
    "1-Year": { x: "1-Year Risk (STDEV)", y: "1-Year Return (CAGR)", title: "1-Year Risk vs Return" },
    "3-Year": { x: "3-Year Risk (STDEV)", y: "3-Year Return (CAGR)", title: "3-Year Risk vs Return" },
    "5-Year": { x: "5-Year Risk (STDEV)", y: "5-Year Return (CAGR)", title: "5-Year Risk vs Return" },
    "10-Year": { x: "10-Year Risk (STDEV)", y: "10-Year Return (CAGR)", title: "10-Year Risk vs Return" },
  };

  const selectedSectorData = sectorDataMap[selectedSector];
  const selectedScatterplotData = scatterplotDataMap[selectedTimeframe];
  const selectedLabels = scatterplotLabelsMap[selectedTimeframe];

  return (
    <div>
      {/* Section Header */}
      <SectionHeader title="REIT Sector Returns Analysis" />

      {/* Sector Returns Section */}
      <Box sx={{ padding: "20px", marginTop: "75px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px", // Space between title and selector
            width: "70%", // Match chart width below
            margin: "0 auto", // Center content
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
            Sector Returns
          </Typography>

          {/* Form Selector */}
          <FormControl sx={{ minWidth: 300 }}>
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
          />
        </Box>
      </Box>

      {/* Sector Risk vs. Reward Section */}
      <Box sx={{ padding: "20px", marginTop: "75px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px", // Space between title and selector
            width: "70%", // Match chart width below
            margin: "0 auto", // Center content
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
            Sector Risk vs. Reward
          </Typography>

          {/* Form Selector */}
          <FormControl sx={{ minWidth: 300 }}>
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
            height: "800px",
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