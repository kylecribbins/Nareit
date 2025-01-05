import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from ReactDOM
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './index.css';

const theme = createTheme(); // Create a default Material-UI theme
const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
