import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ReturnsChart from "../components/ReturnsChart";
import ScatterplotChart from "../components/ScatterplotChart";
import SectionHeader from "../components/SectionHeader";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const SectorReturns = ({
  residentialData,
  retailData,
  allOtherEquityData,
  mortgageData,
  scatterData1Year,
  scatterData3Year,
  scatterData5Year,
  scatterData10Year,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1-Year");

  const handleTimeframeChange = (event) => {
    setSelectedTimeframe(event.target.value);
  };

  // Mapping timeframes to corresponding data
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

  const selectedScatterplotData = scatterplotDataMap[selectedTimeframe];
  const selectedLabels = scatterplotLabelsMap[selectedTimeframe];

  return (
    <div>
      <SectionHeader title="Sector Returns" />

      <Grid container spacing={2} sx={{ paddingLeft: "40px", paddingRight: "40px" }}>
        <Grid item xs={6}>
          <ReturnsChart
            historicalData={residentialData}
            sectors={["Residential", "Apartments", "Manufactured Homes", "Single Family Homes"]}
            title="Residential Sectors"
          />
        </Grid>
        <Grid item xs={6}>
          <ReturnsChart
            historicalData={retailData}
            sectors={["Retail", "Shopping Centers", "Regional Malls", "Free Standing"]}
            title="Retail Sectors"
          />
        </Grid>
        <Grid item xs={6}>
          <ReturnsChart
            historicalData={allOtherEquityData}
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
          />
        </Grid>
        <Grid item xs={6}>
          <ReturnsChart
            historicalData={mortgageData}
            sectors={["Home Financing", "Commercial Financing"]}
            title="Mortgage Sectors"
          />
        </Grid>
      </Grid>

      <SectionHeader title="Sector Risk vs. Reward" />

      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="timeframe-select-label">Timeframe</InputLabel>
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
            width: "100%", // Adjust chart width
            maxWidth: "1133px",
            height: "600px", // Adjust chart height
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