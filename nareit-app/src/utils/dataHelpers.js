// Helper function to calculate CAGR
export const calculateCAGR = (startValue, endValue, periods) => {
    if (startValue <= 0 || periods <= 0) return null; // Avoid invalid calculations
    return ((endValue / startValue) ** (1 / periods) - 1) * 100;
  };
  
  // Helper function to calculate Standard Deviation (STDEV)
export const calculateSTDEV = (values) => {
    if (values.length === 0) return null;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
    return Math.sqrt(variance);
  };
  
  // Function to extract sector metrics
  export const extractSectorMetrics = (data) => {
    const sectors = [...new Set(data.map((row) => row.Sector))]; // Get unique sectors

    const metrics = sectors.map((sector) => {
        const sectorData = data.filter((row) => row.Sector === sector); // Filter rows by sector
        const latestRow = sectorData[sectorData.length - 1]; // Last row for the sector

        const currentYield = parseFloat(latestRow["Dividend Yield (%)"]) || 0; // Current dividend yield

        // Extract Normalized Total Index values for CAGR calculations
        const normalizedIndexValues = sectorData.map((row) => parseFloat(row["Normalized Total Index"]) || 0);
        const normalizedIndexStart = (period) =>
            normalizedIndexValues[normalizedIndexValues.length - (12 * period) - 1]; // Start value for given period
        const normalizedIndexEnd = normalizedIndexValues[normalizedIndexValues.length - 1]; // Most recent value

        const cagr1 = calculateCAGR(normalizedIndexStart(1), normalizedIndexEnd, 1);
        const cagr3 = calculateCAGR(normalizedIndexStart(3), normalizedIndexEnd, 3);
        const cagr5 = calculateCAGR(normalizedIndexStart(5), normalizedIndexEnd, 5);
        const cagr10 = calculateCAGR(normalizedIndexStart(10), normalizedIndexEnd, 10);
        const cagrLife = calculateCAGR(normalizedIndexValues[0], normalizedIndexEnd, normalizedIndexValues.length / 12);

        return {
            sector,
            currentYield,
            cagr1,
            cagr3,
            cagr5,
            cagr10,
            cagrLife,
        };
    });

    return metrics;
};

// Helper function to group data by sector and extract historical data
export const groupSectorData = (data) => {
    const groupedData = {};
  
    data.forEach((row) => {
      const sector = row.Sector;
      const date = row.Date;
      const dividendYield = parseFloat(row["Dividend Yield (%)"]) || null;
  
      // Initialize sector if not already in groupedData
      if (!groupedData[sector]) {
        groupedData[sector] = { dates: [], yields: [] };
      }
  
      // Add data to the corresponding sector
      if (sector && date && dividendYield !== null) {
        groupedData[sector].dates.push(date);
        groupedData[sector].yields.push(dividendYield);
      }
    });
  
    return groupedData;
  };

// Helper function to group data for retail sectors
export const filterRetailSectors = (data) => {
    const retailSectors = ["Retail", "Shopping Centers", "Regional Malls", "Free Standing"];
    return groupSectorData(data.filter((row) => retailSectors.includes(row.Sector)));
  };
  
  // Helper function to group data for residential sectors
  export const filterResidentialSectors = (data) => {
    const residentialSectors = ["Residential", "Apartments", "Manufactured Homes", "Single Family Homes"];
    return groupSectorData(data.filter((row) => residentialSectors.includes(row.Sector)));
  };
  
  // Helper function to group data for "All Other Equity" sectors
  export const filterAllOtherEquitySectors = (data) => {
    const allOtherEquitySectors = [
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
    ];
    return groupSectorData(data.filter((row) => allOtherEquitySectors.includes(row.Sector)));
  };
  
  // Helper function to group data for mortgage sectors
  export const filterMortgageSectors = (data) => {
    const mortgageSectors = ["Home Financing", "Commercial Financing"];
    return groupSectorData(data.filter((row) => mortgageSectors.includes(row.Sector)));
  };

 // Helper function to group Total Index data by sector
const groupTotalIndexData = (data) => {
    const groupedData = {};

    data.forEach((row) => {
        const sector = row.Sector;
        const date = row.Date;
        const totalIndex = parseFloat(row["Total Index"]) || null;

        // Initialize sector if not already in groupedData
        if (!groupedData[sector]) {
            groupedData[sector] = { dates: [], values: [] };
        }

        // Add data to the corresponding sector
        if (sector && date && totalIndex !== null) {
            groupedData[sector].dates.push(date);
            groupedData[sector].values.push(totalIndex);
        }
    });

    return groupedData;
};

// Updated functions for different sector groups using Total Index
export const filterRetailIndexData = (data) => {
    const retailSectors = ["Retail", "Shopping Centers", "Regional Malls", "Free Standing"];
    return groupTotalIndexData(data.filter((row) => retailSectors.includes(row.Sector)));
};

export const filterResidentialIndexData = (data) => {
    const residentialSectors = ["Residential", "Apartments", "Manufactured Homes", "Single Family Homes"];
    return groupTotalIndexData(data.filter((row) => residentialSectors.includes(row.Sector)));
};

export const filterAllOtherEquityIndexData = (data) => {
    const allOtherEquitySectors = [
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
    ];

    // Helper function to group Normalized Total Index data by sector
    const groupNormalizedIndexData = (data) => {
        const groupedData = {};

        data.forEach((row) => {
            const sector = row.Sector;
            const date = row.Date;
            const normalizedIndex = parseFloat(row["Normalized Total Index"]) || null;

            // Initialize sector if not already in groupedData
            if (!groupedData[sector]) {
                groupedData[sector] = { dates: [], values: [] };
            }

            // Add data to the corresponding sector
            if (sector && date && normalizedIndex !== null) {
                groupedData[sector].dates.push(date);
                groupedData[sector].values.push(normalizedIndex);
            }
        });

        return groupedData;
    };

    return groupNormalizedIndexData(data.filter((row) => allOtherEquitySectors.includes(row.Sector)));
};

export const filterMortgageIndexData = (data) => {
    const mortgageSectors = ["Home Financing", "Commercial Financing"];
    return groupTotalIndexData(data.filter((row) => mortgageSectors.includes(row.Sector)));
};