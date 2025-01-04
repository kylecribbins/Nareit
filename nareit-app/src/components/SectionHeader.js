import React from "react";
import { Box, Typography } from "@mui/material";

const SectionHeader = () => {
  return (
    <Box
      sx={{
        mt: 3,
        mb: 2,
        textAlign: "center", // Center align the text
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          color: "#000000", // Match the green color of the AppBar for consistency
          textShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)", // Add a subtle shadow for better visibility
        }}
      >
        Sector Metrics
      </Typography>
    </Box>
  );
};

export default SectionHeader;