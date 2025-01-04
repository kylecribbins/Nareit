import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#387a2b", // Uniform green background
        color: "white", // White text
        boxShadow: 1, // Slight shadow for elevation
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar>
          {/* Left: Logo or Title */}
          <Box sx={{ flexGrow: 1 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "none",
                color: "white", // White text for title
              }}
            >
              REIT Central
            </Button>
          </Box>

          {/* Center/Right: Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: "white", // White text for buttons
                textTransform: "none",
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/sector-returns"
              sx={{
                color: "white", // White text for buttons
                textTransform: "none",
              }}
            >
              Sector Returns
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: "white", // White text for buttons
                textTransform: "none",
              }}
            >
              About
            </Button>
          </Box>

          {/* Right: Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "white" }} /> {/* White menu icon */}
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  bgcolor: "#387a2b", // Match app bar background
                  color: "white", // White text for drawer items
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon sx={{ color: "white" }} /> {/* White close icon */}
                  </IconButton>
                </Box>
                <MenuItem
                  component={Link}
                  to="/"
                  onClick={toggleDrawer(false)}
                  sx={{ color: "white" }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/sector-returns"
                  onClick={toggleDrawer(false)}
                  sx={{ color: "white" }}
                >
                  Sector Returns
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/about"
                  onClick={toggleDrawer(false)}
                  sx={{ color: "white" }}
                >
                  About
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}