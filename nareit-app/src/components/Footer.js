import React from "react";
import { Box, Typography, Link, Grid, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5", // Light grey background
        padding: "20px 0", // Spacing around the content
        borderTop: "1px solid #ddd", // Optional border at the top
        textAlign: "center",
      }}
    >
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} REIT Central. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              Follow us on{" "}
              <Link href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                Twitter
              </Link>
              .
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;