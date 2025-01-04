import React from "react";
import Grid from "@mui/material/Grid";
import ResidentialSectorReturnsChart from "../components/ResidentialSectorReturnsChart";
import RetailSectorsReturnsChart from "../components/RetailSectorsReturnsChart";
import AllOtherEquitySectorsReturnsChart from "../components/AllOtherEquitySectorsReturnsChart";
import MortgageSectorsReturnsChart from "../components/MortgageSectorsReturnsChart";

const SectorReturns = ({ residentialData, retailData, allOtherEquityData, mortgageData }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Sector Returns</h1>

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h2>Residential Sectors</h2>
          </div>
          <ResidentialSectorReturnsChart historicalData={residentialData} />
        </Grid>
        <Grid item xs={6}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h2>Retail Sectors</h2>
          </div>
          <RetailSectorsReturnsChart historicalData={retailData} />
        </Grid>
        <Grid item xs={6}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h2>All Other Equity Sectors</h2>
          </div>
          <AllOtherEquitySectorsReturnsChart historicalData={allOtherEquityData} />
        </Grid>
        <Grid item xs={6}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h2>Mortgage Sectors</h2>
          </div>
          <MortgageSectorsReturnsChart historicalData={mortgageData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SectorReturns;