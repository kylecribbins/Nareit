import React from "react";
import Grid from "@mui/material/Grid";
import ReturnsChart from "../components/ReturnsChart";

const SectorReturns = ({ residentialData, retailData, allOtherEquityData, mortgageData }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Sector Returns</h1>

      <Grid container spacing={4}>
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
    </div>
  );
};

export default SectorReturns;