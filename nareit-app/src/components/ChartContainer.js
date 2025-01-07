import React from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ChartContainer = ({
  title,
  formControlLabel,
  formControlValue,
  formControlOptions,
  onFormControlChange,
  chartComponent,
  description,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px", // Rounded corners for the outer container
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        backgroundColor: "#fff", // White background for the outer container
        marginBottom: "24px", // Space below the container
        width: "80%",
        maxWidth: "1600px",
        margin: "0 auto", // Center the container
      }}
    >
      {/* Title and Form Control */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
          {title}
        </Typography>

        {formControlLabel && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{formControlLabel}</InputLabel>
            <Select
              value={formControlValue}
              onChange={onFormControlChange}
              autoWidth
            >
              {formControlOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Chart or Content */}
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflow: "hidden", // Prevent content overflow
          padding: "16px",
          backgroundColor: "#f9f9f9", // Light gray background for the chart area
        }}
      >
        {chartComponent}
      </Box>

      {/* Description */}
      {description && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            marginTop: "16px",
            textAlign: "left",
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ChartContainer;