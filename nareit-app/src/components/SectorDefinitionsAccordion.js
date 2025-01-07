import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const sectors = [
  {
    title: "Residential",
    description:
      '"Residential REITs own and manage various forms of residences and rent space in those properties to tenants. Residential REITs include REITs that specialize in apartment buildings, student housing, manufactured homes and single-family homes. Within those market segments, some residential REITs also focus on specific geographical markets or classes of properties."',
  },
  {
    title: "Retail",
    description:
      '"Retail REITs own and manage retail real estate and rent space in those properties to tenants. Retail REITs include REITs that focus on large regional malls, outlet centers, grocery-anchored shopping centers and power centers that feature big box retailers.\n\nNet lease REITs own freestanding properties and structure their leases so that tenants pay both rent and the majority of operating expenses for a property. Well-known companies that utilize REIT-owned real estate include Whole Foods, Nordstrom, Krogers, and many more."',
  },
  {
    title: "Office",
    description:
      '"Office REITs own and manage office real estate and rent space in those properties to tenants. Those properties can range from skyscrapers to office parks. Some office REITs focus on specific types of markets, such as central business districts or suburban areas. Some emphasize specific classes of tenants, such as government agencies or biotech firms.\n\nCompanies such as Amazon and Salesforce use office buildings owned by REITs."',
  },
  {
    title: "Industrial",
    description:
      '"Industrial REITs own and manage industrial facilities and rent space in those properties to tenants. Some industrial REITs focus on specific types of properties, such as warehouses and distribution centers. Industrial REITs play an important part in e-commerce and are helping to meet the rapid delivery demand.\n\nCompanies such as Amazon, Home Depot, and Walmart rely on these REITs for last-mile delivery and distribution."',
  },
  {
    title: "Diversified",
    description:
      '"Diversified REITs own and manage a mix of property types and collect rent from tenants. For example, diversified REITs might own portfolios made up of both office and industrial properties, making them ideal for investors looking to gain exposure to a variety of real estate asset types."',
  },
  {
    title: "Lodging/Resorts",
    description:
      '"Lodging REITs own and manage hotels and resorts and rent space in those properties to guests. Lodging REITs own different classes of hotels based on features such as the hotels’ level of service and amenities. Lodging REITs’ properties service a wide spectrum of customers, from business travelers to vacationers.\n\nMany well-known hotel brands, including Hilton, Marriott, and Ritz-Carlton, operate out of REIT owned properties."',
  },
  {
    title: "Self Storage",
    description:
      '"Self-storage REITs own and manage storage facilities and collect rent from customers. Self-storage REITs rent space to both individuals and businesses."',
  },
  {
    title: "Health Care",
    description:
      '"Health care REITs own and manage a variety of health care-related real estate and collect rent from tenants. Health care REITs’ property types include senior living facilities, hospitals, medical office buildings and skilled nursing facilities."',
  },
  {
    title: "Timberland",
    description:
      '"Timberland REITs own and manage various types of timberland real estate. Timberland REITs specialize in harvesting and selling timber."',
  },
  {
    title: "Telecommunications",
    description:
      '"Telecommunications REITs own and manage infrastructure real estate and collect rent from tenants that occupy that real estate. Infrastructure REITs’ property types include fiber cables, wireless infrastructure, telecommunications towers and energy pipelines.\n\nTelecommunications REIT tenants include most major wireless service providers (AT&T, Verizon Wireless, T-Mobile, Sprint), and broadcast and satellite television companies including DISH network and Pavlov Media. Telecommunication REITs are also leading the development of small cell 5G networks nationwide."',
  },
  {
    title: "Data Centers",
    description:
      '"Data center REITs own and manage facilities that customers use to safely store data. Data center REITs offer a range of products and services to help keep servers and data safe, including providing uninterruptable power supplies, air-cooled chillers and physical security.\n\nA wide variety of companies including IBM, Ubisoft, and AT&T utilize REIT-owned data centers."',
  },
  {
    title: "Gaming",
    description:
      '"Gaming REITs concentrate on owning experiential real estate assets in the form of casino and entertainment properties, and leasing them through long-term, triple net lease structures.\n\nCaesars Palace Las Vegas, MGM Grand, and the Venetian Resort Las Vegas, all iconic entertainment facilities on the Las Vegas Strip, are housed in REIT owned properties, as are certain Ameristar-, Bally’s-, Hollywood-, Isle-, and Tropicana-branded casinos across the U.S. (among others). Gaming REITs casino properties include hotel rooms, restaurants, bars, and nightclubs."',
  },
  {
    title: "Specialty",
    description:
      '"Specialty REITs own and manage a unique mix of property types and collect rent from tenants. Specialty REITs own properties that don’t fit within the other REIT sectors. Examples of properties owned by specialty REITs include movie theaters, farmland and outdoor advertising sites.\n\nMultiple Six Flags amusement parks, and the Northstar California ski resort are REIT owned."',
  },
  {
    title: "Mortgage",
    description:
      '"Mortgage REITs (mREITS) provide financing for income-producing real estate by purchasing or originating mortgages and mortgage-backed securities (MBS) and earning income from the interest on these investments."',
  },
];

const SectorDefinitionsAccordion = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        backgroundColor: "#fff",
        margin: "20px auto",
        width: "80%",
        maxWidth: "1200px",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#000",
          marginBottom: "8px",
        }}
      >
        Sector Definitions
      </Typography>

      {/* Subheading */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          marginBottom: "16px",
          lineHeight: 1.6,
        }}
      >
        "REITs invest in the majority of real estate property types, including
        offices, apartment buildings, warehouses, retail centers, medical
        facilities, data centers, telecommunications towers, infrastructure,
        and hotels. Most REITs focus on a particular property type, but some
        hold multiple types of properties in their portfolios."
      </Typography>

      {/* Accordion */}
      {sectors.map((sector, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#f5f5f5", // Light gray background
              fontWeight: "bold",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {sector.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="textSecondary">
              {sector.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Source */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          marginTop: "16px",
          textAlign: "left",
          lineHeight: 1.6,
        }}
      >
        Source: Nareit.
      </Typography>
    </Box>
  );
};

export default SectorDefinitionsAccordion;