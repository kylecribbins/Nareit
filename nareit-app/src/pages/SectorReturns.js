import React, { useState } from "react";
import ReturnsChart from "../components/ReturnsChart";
import ScatterplotChart from "../components/ScatterplotChart";
import PriceIncomeChart from "../components/PriceIncomeChart";
import ChartContainer from "../components/ChartContainer";
import { sectorDefinitions, allSectors } from "../utils/sectorDefinitions";
import { Box } from "@mui/material";
import SectionHeader from "../components/SectionHeader";

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
  // State for dropdowns
  const [selectedSector, setSelectedSector] = useState("Residential");
  const [selectedIncomeSector, setSelectedIncomeSector] = useState(allSectors[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1-Year");

  // Handlers for dropdown changes
  const handleSectorChange = (event) => setSelectedSector(event.target.value);
  const handleIncomeSectorChange = (event) => setSelectedIncomeSector(event.target.value);
  const handleTimeframeChange = (event) => setSelectedTimeframe(event.target.value);

  // Data and labels for sector risk vs reward
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

  const selectedScatterplotData = scatterplotDataMap[selectedTimeframe];
  const selectedLabels = scatterplotLabelsMap[selectedTimeframe];

  // Data mapping for the sector returns chart
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

  const selectedSectorData = sectorDataMap[selectedSector];

  return (
    <div>
      <SectionHeader title="Sector Returns" />
      {/* Sector Returns Chart */}
      <Box sx={{ marginBottom: "32px" }}>
        <ChartContainer
          title="Sector Returns"
          formControlLabel="Select Sector"
          formControlValue={selectedSector}
          formControlOptions={[
            { label: "Residential", value: "Residential" },
            { label: "Retail", value: "Retail" },
            { label: "All Other Equity", value: "All Other Equity" },
            { label: "Mortgage", value: "Mortgage" },
          ]}
          onFormControlChange={handleSectorChange}
          chartComponent={
            <ReturnsChart
              historicalData={selectedSectorData.data}
              sectors={selectedSectorData.sectors}
              title={selectedSectorData.title}
              sectorColors={sectorColors}
              sp500Data={sp500Data}
            />
          }
          description="Source: Nareit, Yahoo Finance."
        />
      </Box>
  
      {/* Price vs Income Returns Chart */}
      <Box sx={{ marginBottom: "32px" }}>
        <ChartContainer
          title="Sector Price vs Income Return"
          formControlLabel="Select Sector"
          formControlValue={selectedIncomeSector}
          formControlOptions={allSectors.map((sector) => ({
            label: sector,
            value: sector,
          }))}
          onFormControlChange={handleIncomeSectorChange}
          chartComponent={
            <PriceIncomeChart
              data={priceAndIncomeData}
              sector={selectedIncomeSector}
              title={`Price vs Income Returns for ${selectedIncomeSector}`}
            />
          }
          description="Source: Nareit."
        />
      </Box>
  
      {/* Sector Risk vs Reward Chart */}
      <Box sx={{ marginBottom: "32px" }}>
        <ChartContainer
          title="Sector Risk vs Reward"
          formControlLabel="Select Timeframe"
          formControlValue={selectedTimeframe}
          formControlOptions={[
            { label: "1-Year", value: "1-Year" },
            { label: "3-Year", value: "3-Year" },
            { label: "5-Year", value: "5-Year" },
            { label: "10-Year", value: "10-Year" },
          ]}
          onFormControlChange={handleTimeframeChange}
          chartComponent={
            <ScatterplotChart
              data={selectedScatterplotData}
              xLabel={selectedLabels.x}
              yLabel={selectedLabels.y}
              title={selectedLabels.title}
            />
          }
          description="Source: Nareit."
        />
      </Box>
    </div>
  );
};

export default SectorReturns;