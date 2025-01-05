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
          Created by: Kyle Cribbins
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Website uses publicly available REIT data from Nareit:{" "}
          <a
            href="https://www.reit.com/data-research/reit-indexes/monthly-property-index-values-returns"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nareit Monthly Property Index Values & Returns
          </a>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Data is updated monthly at the end of the month.
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Returns are calculated as Compound Annual Growth Rate (CAGR).
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          Standard deviations are calculated using the sample standard deviation formula (STDEV.S).
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ lineHeight: 3 }}>
          REIT Central aims to provide transparent and accessible insights into REIT performance metrics.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;