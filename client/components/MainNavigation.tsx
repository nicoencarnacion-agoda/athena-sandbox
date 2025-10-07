import { Box, Avatar, Badge, Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import agodaLetter from "../assets/logos/agoda-letter.png";
import { NavItem } from "../types";
import { primaryNavItems, secondaryNavItems } from "../data/navigation";

const renderNavItem = (item: NavItem, currentPath: string) => {
  const isActive = item.path === currentPath;

  const content = (
    <>
      <Box
        sx={{
          color: "#E3F2FD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.icon}
      </Box>
      <Typography
        sx={{
          color: "rgba(0, 0, 0, 0.87)",
          fontSize: "12px",
          textAlign: "center",
          lineHeight: "19.92px",
          letterSpacing: "0.4px",
          whiteSpace: "pre-line",
          fontWeight: 400,
          mt: 0,
        }}
      >
        <span style={{ color: "#fff" }}>{item.label}</span>
      </Typography>
      {item.badge && (
        <Badge
          badgeContent={item.badge}
          color="warning"
          sx={{
            position: "absolute",
            top: 8,
            right: 14,
          }}
        />
      )}
    </>
  );

  const boxStyles = {
    p: "8px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    bgcolor: isActive ? "#37474F" : "transparent",
    "&:hover": {
      bgcolor: isActive ? "#37474F" : "rgba(255,255,255,0.05)",
    },
    cursor: "pointer",
  };

  if (item.path) {
    return (
      <Box
        key={item.label}
        component={Link}
        to={item.path}
        sx={{
          ...boxStyles,
          textDecoration: 'none',
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box key={item.label} sx={boxStyles}>
      {content}
    </Box>
  );
};

export default function MainNavigation() {
  const location = useLocation();
  return (
    <Box
      sx={{
        width: "72px",
        height: "100vh",
        bgcolor: "#455A64",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          p: "8px 6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "64px",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#4DD0E1",
            width: 40,
            height: 40,
            color: "rgba(0, 0, 0, 0.87)",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "20px",
            letterSpacing: "0.14px",
          }}
        >
          N
        </Avatar>
      </Box>

      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>{primaryNavItems.map(item => renderNavItem(item, location.pathname))}</Box>
        <Box sx={{ mt: 4 }}>{secondaryNavItems.map(item => renderNavItem(item, location.pathname))}</Box>
      </Box>

      <Box sx={{ p: 1.5, mb: 2 }}>
        <Box
          component="img"
          src={agodaLetter}
          alt="Agoda letter logo"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "4px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
}
