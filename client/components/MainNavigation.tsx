import { ReactNode } from "react";
import { Box, Avatar, Badge, Typography } from "@mui/material";
import {
  Search,
  EditNote,
  Phone,
  Email,
  Message,
  List as ListIcon,
  Help,
  Campaign,
  Storage,
  Layers,
  Window,
} from "@mui/icons-material";
import agodaLetter from "../assets/logos/agoda-letter.png";

type NavItem = {
  icon: ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
};

const primaryNavItems: NavItem[] = [
  { icon: <Search />, label: "Search", badge: 1 },
  { icon: <EditNote />, label: "Handling" },
  { icon: <Phone />, label: "Phone" },
  { icon: <Email />, label: "Email", active: true },
  { icon: <Message />, label: "Message" },
  { icon: <ListIcon />, label: "My Cases" },
];

const secondaryNavItems: NavItem[] = [
  { icon: <Help />, label: "Help" },
  { icon: <Campaign />, label: "Updates", badge: 1 },
  { icon: <Storage />, label: "Bulk Action" },
  { icon: <Layers />, label: "Work\nspace" },
  { icon: <Window />, label: "Back Office" },
];

const renderNavItem = (item: NavItem) => (
  <Box
    key={item.label}
    sx={{
      p: "8px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
      bgcolor: item.active ? "#37474F" : "transparent",
      "&:hover": {
        bgcolor: item.active ? "#37474F" : "rgba(255,255,255,0.05)",
      },
      cursor: "pointer",
    }}
  >
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
  </Box>
);

export default function MainNavigation() {
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
        <Box>{primaryNavItems.map(renderNavItem)}</Box>
        <Box sx={{ mt: 4 }}>{secondaryNavItems.map(renderNavItem)}</Box>
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
