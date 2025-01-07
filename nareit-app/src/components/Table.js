import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MaterialTable = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const columnTitles = {
    sector: "Sector",
    currentYield: "Dividend Yield",
    cagr1: "1-Yr Return",
    cagr3: "3-Yr Return",
    cagr5: "5-Yr Return",
    cagr10: "10-Yr Return",
    cagrLife: "Lifetime Return",
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const formatValue = (value, column) => {
    if (value === null || (typeof value === "number" && isNaN(value))) {
      return "—"; // Format NaN or null as em dash
    }
    if (typeof value === "number") {
      if (["cagr1", "cagr3", "cagr5", "cagr10", "cagrLife"].includes(column)) {
        const sign = value > 0 ? "+" : "";
        return `${sign}${value.toFixed(2)}%`;
      }
      if (column === "currentYield") {
        return `${value.toFixed(2)}%`;
      }
      return value.toFixed(2);
    }
    return value; // Return the original value for non-numeric columns
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedData = React.useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }
      return order === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });
  }, [data, orderBy, order]);

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
        maxWidth: "1600px",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#000",
          marginBottom: "16px", // Space below the title
        }}
      >
        Sector Overview
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <StyledTableCell
                  key={col}
                  align={col === "sector" ? "left" : "center"}
                  sortDirection={orderBy === col ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === col}
                    direction={orderBy === col ? order : "asc"}
                    onClick={() => handleSort(col)}
                    sx={{
                      display: "flex",
                      justifyContent: col === "sector" ? "flex-start" : "center",
                      color: "inherit",
                    }}
                  >
                    {columnTitles[col] || col}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((col) => (
                  <StyledTableCell
                    key={col}
                    align={
                      ["currentYield", "cagr1", "cagr3", "cagr5", "cagr10", "cagrLife"].includes(col)
                        ? "center"
                        : "left"
                    }
                    style={{
                      color:
                        ["cagr1", "cagr3", "cagr5", "cagr10", "cagrLife"].includes(col) &&
                        typeof row[col] === "number" &&
                        !isNaN(row[col])
                          ? row[col] > 0
                            ? "#1b6c16"
                            : "#c01417"
                          : "inherit",
                    }}
                  >
                    {formatValue(row[col], col)}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          marginTop: "10px",
          textAlign: "left",
        }}
      >
        Source: Nareit. Updated as of 12/31/24.
      </Typography>
    </Box>
  );
};

export default MaterialTable;