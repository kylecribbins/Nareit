import React from "react";
import { Box, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container>
      <Box
        sx={{
          padding: "40px 20px",
          textAlign: "left",
        }}
      >
        <Typography variant="h4" gutterBottom>
          About REIT Central
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Website uses publicly available data from Nareit:{" "}
          <a
            href="https://www.reit.com/data-research/reit-indexes/monthly-property-index-values-returns"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nareit Monthly Property Index Values & Returns
          </a>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Data is updated monthly at the end of the month
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Returns are calculated as Compound Annual Growth Rate (CAGR) of the Total Return Index
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Standard deviations are calculated using the sample standard deviation formula (STDEV.S) on monthly returns
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          This website is an independent project and is not affiliated with any organizations, including REITs
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Created by Kyle Cribbins
        </Typography>
      </Box>
    </Container>
  );
};

export default About;