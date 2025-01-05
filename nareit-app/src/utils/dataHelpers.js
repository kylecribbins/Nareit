import { sectorDefinitions } from "./sectorDefinitions"; // Import centralized definitions

// Helper function to calculate CAGR
export const calculateCAGR = (startValue, endValue, periods) => {
  if (startValue <= 0 || periods <= 0) return null; // Avoid invalid calculations
  return ((endValue / startValue) ** (1 / periods) - 1) * 100;
};

// Helper function to calculate Standard Deviation (STDEV.S)
export const calculateSTDEV = (values) => {
  if (values.length <= 1) return null; // At least 2 values are required for sample STDEV
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / (values.length - 1); // Divide by (n - 1)
  return Math.sqrt(variance);
};

// Helper function to calculate arithmetic mean
export const calculateMean = (values) => {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

// Function to extract sector metrics with risk (STDEV), return (CAGR), and average monthly returns
export const extractSectorMetrics = (data) => {
  const sectors = [...new Set(data.map((row) => row.Sector))]; // Get unique sectors

  const metrics = sectors.map((sector) => {
      const sectorData = data.filter((row) => row.Sector === sector); // Filter rows by sector
      const latestRow = sectorData[sectorData.length - 1]; // Last row for the sector

      const currentYield = parseFloat(latestRow["Dividend Yield (%)"]) || 0; // Current dividend yield

      // Extract Total Return (%) values for STDEV and average monthly return calculations
      const totalReturnValues = sectorData
          .map((row) => parseFloat(row["Total Return (%)"]))
          .filter((value) => !isNaN(value) && value !== null);

      // Helper function to get values for a given period
      const getPeriodValues = (values, period) => {
          const requiredLength = 12 * period;
          if (values.length >= requiredLength) {
              return values.slice(-requiredLength); // Last 'requiredLength' values
          }
          return null; // Not enough data for the period
      };

      // Calculate STDEV and average monthly returns for consistent periods
      const calculateMetricsForPeriod = (period) => {
          const periodValues = getPeriodValues(totalReturnValues, period);
          return {
              stdev: periodValues ? calculateSTDEV(periodValues) : NaN,
              averageReturn: periodValues ? calculateMean(periodValues) : NaN,
          };
      };

      const metrics1 = calculateMetricsForPeriod(1);
      const metrics3 = calculateMetricsForPeriod(3);
      const metrics5 = calculateMetricsForPeriod(5);
      const metrics10 = calculateMetricsForPeriod(10);
      const metricsLife = {
          stdev: totalReturnValues.length > 0 ? calculateSTDEV(totalReturnValues) : NaN,
          averageReturn: totalReturnValues.length > 0 ? calculateMean(totalReturnValues) : NaN,
      };

      // Extract Total Index values for CAGR calculations
      const totalIndexValues = sectorData.map((row) => parseFloat(row["Total Index"]) || 0);

      const getStartValue = (period) =>
          totalIndexValues.length >= 12 * period + 1
              ? totalIndexValues[totalIndexValues.length - (12 * period) - 1]
              : null; // Start value for given period
      const endValue = totalIndexValues[totalIndexValues.length - 1]; // Most recent value

      // Calculate CAGR
      const cagr1 = getStartValue(1) ? calculateCAGR(getStartValue(1), endValue, 1) : NaN;
      const cagr3 = getStartValue(3) ? calculateCAGR(getStartValue(3), endValue, 3) : NaN;
      const cagr5 = getStartValue(5) ? calculateCAGR(getStartValue(5), endValue, 5) : NaN;
      const cagr10 = getStartValue(10) ? calculateCAGR(getStartValue(10), endValue, 10) : NaN;
      const cagrLife =
          totalIndexValues.length > 0
              ? calculateCAGR(totalIndexValues[0], endValue, totalIndexValues.length / 12)
              : NaN;

      return {
          sector,
          currentYield,
          cagr1,
          cagr3,
          cagr5,
          cagr10,
          cagrLife,
          stdev1: metrics1.stdev,
          stdev3: metrics3.stdev,
          stdev5: metrics5.stdev,
          stdev10: metrics10.stdev,
          stdevLife: metricsLife.stdev,
          avgReturn1: metrics1.averageReturn,
          avgReturn3: metrics3.averageReturn,
          avgReturn5: metrics5.averageReturn,
          avgReturn10: metrics10.averageReturn,
          avgReturnLife: metricsLife.averageReturn,
      };
  });

  return metrics;
};

// Helper function to extract unique 10-Year Treasury data
export const extractTreasuryData = (data) => {
  const treasuryData = {};

  data.forEach((row) => {
    const date = row.Date;
    const treasuryYield = parseFloat(row["10-Year Treasury"]) || null;

    if (date && treasuryYield !== null) {
      treasuryData[date] = treasuryYield; // Use date as key to ensure uniqueness
    }
  });

  return {
    dates: Object.keys(treasuryData).sort((a, b) => new Date(a) - new Date(b)), // Sort dates
    yields: Object.values(treasuryData), // Get yields aligned with dates
  };
};

// Helper function to group data by sector and extract historical data
export const groupSectorData = (data) => {
  const groupedData = {};

  data.forEach((row) => {
    const sector = row.Sector;
    const date = row.Date;
    const dividendYield = parseFloat(row["Dividend Yield (%)"]) || null;

    if (!groupedData[sector]) {
      groupedData[sector] = { dates: [], yields: [] }; // No treasuryYields here
    }

    if (sector && date) {
      groupedData[sector].dates.push(date);
      groupedData[sector].yields.push(dividendYield);
    }
  });

  return groupedData;
};

// Helper function to group data for retail sectors
export const filterRetailSectors = (data) => {
  return groupSectorData(data.filter((row) => sectorDefinitions.Retail.includes(row.Sector)));
};

// Helper function to group data for residential sectors
export const filterResidentialSectors = (data) => {
  return groupSectorData(data.filter((row) => sectorDefinitions.Residential.includes(row.Sector)));
};

// Helper function to group data for "All Other Equity" sectors
export const filterAllOtherEquitySectors = (data) => {
  return groupSectorData(data.filter((row) => sectorDefinitions["All Other Equity"].includes(row.Sector)));
};

// Helper function to group data for mortgage sectors
export const filterMortgageSectors = (data) => {
  return groupSectorData(data.filter((row) => sectorDefinitions.Mortgage.includes(row.Sector)));
};

// Helper function to group data by Total Index or Normalized Total Index
const groupIndexData = (data, indexField) => {
  const groupedData = {};

  data.forEach((row) => {
      const sector = row.Sector;
      const date = row.Date;
      const indexValue = parseFloat(row[indexField]) || null;

      // Initialize sector if not already in groupedData
      if (!groupedData[sector]) {
          groupedData[sector] = { dates: [], values: [] };
      }

      // Add data to the corresponding sector
      if (sector && date && indexValue !== null) {
          groupedData[sector].dates.push(date);
          groupedData[sector].values.push(indexValue);
      }
  });

  return groupedData;
};

// Updated functions for different sector groups using the centralized sectorDefinitions

export const filterRetailIndexData = (data) => {
  return groupIndexData(data.filter((row) => sectorDefinitions.Retail.includes(row.Sector)), "Total Index");
};

export const filterResidentialIndexData = (data) => {
  return groupIndexData(data.filter((row) => sectorDefinitions.Residential.includes(row.Sector)), "Total Index");
};

export const filterAllOtherEquityIndexData = (data) => {
  return groupIndexData(data.filter((row) => sectorDefinitions["All Other Equity"].includes(row.Sector)), "Normalized Total Index");
};

export const filterMortgageIndexData = (data) => {
  return groupIndexData(data.filter((row) => sectorDefinitions.Mortgage.includes(row.Sector)), "Total Index");
};

// Helper function to exclude STDEV-related and average return fields from metrics
export const filterOutSTDEV = (metrics) => {
  return metrics.map(({ 
      stdev1, stdev3, stdev5, stdev10, stdevLife, 
      avgReturn1, avgReturn3, avgReturn5, avgReturn10, avgReturnLife, 
      ...rest 
  }) => rest);
};

// Generic helper function to extract data for scatterplots
export const extractScatterplotData = (metrics, xField, yField) => {
  return metrics
    .map((metric) => ({
      sector: metric.sector,
      x: metric[xField],
      y: metric[yField],
    }))
    .filter((point) => point.x !== null && point.y !== null && !isNaN(point.x) && !isNaN(point.y)); // Exclude invalid data points
};

export const sectorColors = {
  Residential: "#000000", // Black
  Apartments: "#0000ff", // Blue
  "Manufactured Homes": "#ff0000", // Red
  "Single Family Homes": "#008000", // Green
  Retail: "#000000", // Black
  "Shopping Centers": "#0000ff", // Blue
  "Regional Malls": "#ff0000", // Red
  "Free Standing": "#008000", // Green
  Office: "#000000", // Black
  Industrial: "#0000ff", // Blue
  Diversified: "#ff0000", // Red
  "Lodging/Resorts": "#b03060", // maroon3
  "Self Storage": "#ff4500", // orangered
  "Health Care": "#ffd700", // gold
  Timberland: "#deb887", // burlywood
  Telecommunications: "#008000", // Green
  "Data Centers": "#00ffff", // aqua
  Gaming: "#ff00ff", // fuschia
  Specialty: "#6495ed", // cornflower
  "Home Financing": "#000000", // Black
  "Commercial Financing": "#0000ff", // Blue
};