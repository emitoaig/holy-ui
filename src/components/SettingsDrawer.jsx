import { useState, useEffect } from "react";

import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Close as CloseIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  SettingsBrightness as SettingsBrightnessIcon
} from "@mui/icons-material";
import {
  Drawer,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  Typography,
  Button,
  IconButton,
  Avatar,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { getSetting, setSetting } from "~/hooks/settingsService";
import useSetting from "~/hooks/useSetting";

const SettingsDrawer = ({ open, handleClose }) => {
  const [themeMode, setThemeMode] = useState(() => getSetting("themeMode", "light"));
  const [language, setLanguage] = useState(() => getSetting("language", "English"));
  const [themeColor, setThemeColor] = useState(() => getSetting("themeColor", ""));
  const [selectedTenant, setSelectedTenant] = useState(() => getSetting("selectedTenant", "tenant1"));
  const { state } = useSetting();
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState(null);

  useEffect(() => {
    if (state.setting.default_theme_color) {
      setThemeColor(state.setting.default_theme_color);
    }
  }, [state.setting.default_theme_color]);

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    setSetting("themeMode", mode);
    // Implement theme change logic here
  };

  const handleColorChange = (color) => {
    setThemeColor(color);
    setSetting("themeColor", color);
    // Implement theme color change logic here
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setSetting("language", selectedLanguage);
  };

  const handleTenantChange = (event) => {
    const selectedTenant = event.target.value;
    setSelectedTenant(selectedTenant);
    setSetting("selectedTenant", selectedTenant);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const isAuthenticated = state.setting.authenticated;
  const languageList = state.setting.langs || [];
  const themeColors = ["#ff0000", "#00ff00", "#0000ff"];
  const tenantList = [
    { id: "tenant1", name: "Tenant 1" },
    { id: "tenant2", name: "Tenant 2" },
    { id: "tenant3", name: "Tenant 3" }
  ];

  return (
    <Drawer anchor="right" open={open} onClose={handleClose} sx={{ width: "80vw" }}>
      <Paper sx={{ height: "100%", padding: "16px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={handleClose} edge="end" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ flexGrow: 1 }}>
          <ListItem button sx={{ marginBottom: "8px" }}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
            <Select value={language} onChange={handleLanguageChange} size="small">
              {languageList.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </ListItem>
          <Divider />
          <ListItem button sx={{ marginBottom: "8px" }}>
            <ListItemIcon>
              <SettingsBrightnessIcon />
            </ListItemIcon>
            <ListItemText primary="Theme Mode" />
          </ListItem>
          <Box sx={{ display: "flex", gap: "8px", marginTop: "8px", marginLeft: "48px" }}>
            <Button
              variant={themeMode === "light" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("light")}
              startIcon={<Brightness7Icon />}
            >
              Light
            </Button>
            <Button
              variant={themeMode === "system" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("system")}
              startIcon={<SettingsBrightnessIcon />}
            >
              System
            </Button>
            <Button
              variant={themeMode === "dark" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("dark")}
              startIcon={<Brightness4Icon />}
            >
              Dark
            </Button>
          </Box>
          <Divider />
          <ListItem sx={{ marginBottom: "8px" }}>
            <ListItemIcon>
              <Avatar variant="rounded" sx={{ bgcolor: themeColor, width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Theme Color" />
          </ListItem>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={(event, newAlignment) => {
                if (newAlignment !== null) {
                  setAlignment(newAlignment);
                  handleColorChange(themeColors[newAlignment]);
                }
              }}
              size="small"
            >
              {themeColors.map((color, index) => (
                <ToggleButton key={color} value={index} sx={{ width: "64px", height: "64px", borderRadius: 0 }}>
                  {index === 0 ? "Blue" : index === 1 ? "Purple" : "Red"}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Divider />
          <ListItem sx={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Tenant" />
            <Select value={selectedTenant} onChange={handleTenantChange} size="small" sx={{ marginLeft: "auto" }}>
              {tenantList.map((tenant) => (
                <MenuItem key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </MenuItem>
              ))}
            </Select>
          </ListItem>
        </List>
        <Divider />
        <div style={{ marginTop: "16px" }}>
          {isAuthenticated ? (
            <Button onClick={handleLogout} fullWidth variant="contained" color="primary">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} fullWidth variant="contained" color="primary">
              Login
            </Button>
          )}
        </div>
      </Paper>
    </Drawer>
  );
};

SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SettingsDrawer;
