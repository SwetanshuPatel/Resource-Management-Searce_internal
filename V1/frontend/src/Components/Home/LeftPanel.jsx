import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AttributionIcon from "@mui/icons-material/Attribution";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ViewOppor from "./viewoppor.jsx";
import ViewProj from "./viewproj.jsx";
import ViewInter from "./viewinter.jsx";
import ViewResour from "./viewresour.jsx";
import ViewAcI from "./viewaci.jsx";
import ViewUti from "./viewuti.jsx";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Dashboard from "./dashboard.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import CustFooter from "./footer.jsx";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function LeftPanel() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (text) => {
    setSelectedItem(text);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {![
                "Home",
                "Opportunity",
                "Project",
                "Resources",
                "Interaction",
                "Action Item",
                "Utilization",
              ].includes(selectedItem) && (
                <Typography>
                  <b>HOME PAGE</b>
                </Typography>
              )}
              {selectedItem === "Home" && (
                <Typography>
                  <b>DASHBOARD</b>
                </Typography>
              )}
              {selectedItem === "Opportunity" && (
                <Typography>
                  <b>OPPORTUNITY</b>
                </Typography>
              )}
              {selectedItem === "Project" && (
                <Typography>
                  <b>PROJECT</b>
                </Typography>
              )}
              {selectedItem === "Resources" && (
                <Typography>
                  <b>RESOURCES</b>
                </Typography>
              )}
              {selectedItem === "Interaction" && (
                <Typography>
                  <b>INTERACTION</b>
                </Typography>
              )}
              {selectedItem === "Action Item" && (
                <Typography>
                  <b>ACTION ITEM</b>
                </Typography>
              )}
              {selectedItem === "Utilization" && (
                <Typography>
                  <b>UTILIZATION</b>
                </Typography>
              )}
            </Typography>
          </div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={() => (window.location.href = "https://www.searce.com/")}
            >
              <InfoIcon style={{ marginRight: "10px" }} />
              About
            </MenuItem>
            <MenuItem>
              <SettingsIcon style={{ marginRight: "10px" }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon style={{ marginRight: "10px" }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Home",
            "Opportunity",
            "Project",
            "Resources",
            "Interaction",
            "Action Item",
            "Utilization",
          ].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  handleDrawerClose();
                  handleItemClick(text);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {(() => {
                    switch (text) {
                      case "Home":
                        return <HomeIcon />;
                      case "Opportunity":
                        return <DashboardIcon />;
                      case "Project":
                        return <AutoAwesomeMotionIcon />;
                      case "Interaction":
                        return <IntegrationInstructionsIcon />;
                      case "Resources":
                        return <AttributionIcon />;
                      case "Action Item":
                        return <TaskAltIcon />;
                      case "Utilization":
                        return <CalendarTodayIcon />;
                      default:
                        return null;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {![
          "Home",
          "Opportunity",
          "Project",
          "Resources",
          "Interaction",
          "Action Item",
          "Utilization",
        ].includes(selectedItem) && (
            <Dashboard/>
        )}

        {selectedItem === "Home" && <Dashboard />}
        {selectedItem === "Opportunity" && <ViewOppor />}
        {selectedItem === "Project" && <ViewProj />}
        {selectedItem === "Resources" && <ViewResour />}
        {selectedItem === "Interaction" && <ViewInter />}
        {selectedItem === "Action Item" && <ViewAcI />}
        {selectedItem === "Utilization" && <ViewUti />}
        <br></br>
        <br></br>
        <CustFooter />
      </Box>
    </Box>
  );
}
