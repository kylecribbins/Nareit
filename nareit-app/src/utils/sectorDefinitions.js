// Define sector groupings
export const sectorDefinitions = {
  Residential: ["Residential", "Apartments", "Manufactured Homes", "Single Family Homes"],
  Retail: ["Retail", "Shopping Centers", "Regional Malls", "Free Standing"],
  "All Other Equity": [
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
  ],
  Mortgage: ["Home Financing", "Commercial Financing"],
};

// Combined sector definitions: all sectors in one list
export const allSectors = [
  ...sectorDefinitions.Residential,
  ...sectorDefinitions.Retail,
  ...sectorDefinitions["All Other Equity"],
  ...sectorDefinitions.Mortgage,
];