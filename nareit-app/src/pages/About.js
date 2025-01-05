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
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 4 }}>
          Website uses publicly available data from Nareit:{" "}
          <a
            href="https://www.reit.com/data-research/reit-indexes/monthly-property-index-values-returns"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nareit Monthly Property Index Values & Returns
          </a>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 4 }}>
          Data is updated monthly at the end of the month
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 4 }}>
          Returns are calculated as the Compound Annual Growth Rate (CAGR) of the Total Return Index
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 4 }}>
          Standard deviations are calculated as the sample standard deviation of monthly total returns
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 4 }}>
          This website is an independent project and is not affiliated with any organizations, including REITs
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 4 }}>
          Created by Kyle Cribbins
        </Typography>
      </Box>
    </Container>
  );
};

export default About;