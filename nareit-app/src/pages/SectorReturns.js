import React from "react";
import Grid from "@mui/material/Grid";
import ReturnsChart from "../components/ReturnsChart";
import ScatterplotChart from "../components/ScatterplotChart";
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
}) => {
  return (
    <div > 
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

      <Grid container spacing={4} sx={{ paddingLeft: "40px", paddingRight: "40px" }}>
        <Grid item xs={6}>
          <ScatterplotChart
            data={scatterData1Year}
            xLabel="1-Year Risk (STDEV)"
            yLabel="1-Year Return (CAGR)"
            title="1-Year Risk vs Return"
          />
        </Grid>
        <Grid item xs={6}>
          <ScatterplotChart
            data={scatterData3Year}
            xLabel="3-Year Risk (STDEV)"
            yLabel="3-Year Return (CAGR)"
            title="3-Year Risk vs Return"
          />
        </Grid>
        <Grid item xs={6}>
          <ScatterplotChart
            data={scatterData5Year}
            xLabel="5-Year Risk (STDEV)"
            yLabel="5-Year Return (CAGR)"
            title="5-Year Risk vs Return"
          />
        </Grid>
        <Grid item xs={6}>
          <ScatterplotChart
            data={scatterData10Year}
            xLabel="10-Year Risk (STDEV)"
            yLabel="10-Year Return (CAGR)"
            title="10-Year Risk vs Return"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SectorReturns;