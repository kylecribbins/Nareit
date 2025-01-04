import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

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
    if (typeof value === "number" && !isNaN(value)) {
      // Format return values with a "+" or "-" symbol and a percentage
      if (["cagr1", "cagr3", "cagr5", "cagr10", "cagrLife"].includes(column)) {
        const sign = value > 0 ? "+" : "";
        return `${sign}${value.toFixed(2)}%`;
      }
      // Format dividend yield with percentage only
      if (column === "currentYield") {
        return `${value.toFixed(2)}%`;
      }
      return value.toFixed(2);
    }
    return value; // Return the raw value for non-numeric or invalid data
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
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
            {columns.map((col) => (
            <TableCell
                key={col}
                align={
                ["currentYield", "cagr1", "cagr3", "cagr5", "cagr10", "cagrLife"].includes(col)
                    ? "center"
                    : "left"
                }
                sortDirection={orderBy === col ? order : false}
                style={{ fontWeight: "bold" }} // Bold the column titles
            >
                <TableSortLabel
                active={orderBy === col}
                direction={orderBy === col ? order : "asc"}
                onClick={() => handleSort(col)}
                >
                {columnTitles[col] || col}
                </TableSortLabel>
            </TableCell>
            ))}
        </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((col) => (
                <TableCell
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
                          ? "#1b6c16" // Green for positive
                          : "#c01417" // Red for negative
                        : "inherit", // Default color for non-return columns or dividend yield
                  }}
                >
                  {formatValue(row[col], col)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;