import { ReactNode, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import {
  PermContactCalendar,
  Article,
  Mail,
  Search,
  Info,
  Menu as MenuIcon,
} from "@mui/icons-material";
import MainNavigation from "../components/MainNavigation";
import BookingIDs from "../components/BookingIDs";
import RecipientsTable from "../components/RecipientsTable";
import Templates from "./Templates";
import Drafts from "./Drafts";

export default function Recipients() {
  const [activeTab, setActiveTab] = useState(0);
  const [contactType, setContactType] = useState("Customer");
  const [ucid, setUcid] = useState("7897129879879841");
  const [ucidOpen, setUcidOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleContactTypeChange = (event: SelectChangeEvent) => {
    setContactType(event.target.value);
  };

  const handleUcidChange = (event: SelectChangeEvent) => {
    setUcid(event.target.value);
  };

    const filterControls = (
      <>
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Contact type"
          value={contactType}
          onChange={handleContactTypeChange}
        >
          <MenuItem value="Customer">Customer</MenuItem>
          <MenuItem value="Partner">Partner</MenuItem>
          <MenuItem value="Agent">Agent</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          variant="outlined"
          label="UCID"
          value={ucid}
          onChange={handleUcidChange}
          onFocus={() => setUcidOpen(true)}
          onBlur={() => setUcidOpen(false)}
          InputProps={{
            startAdornment: (
              <Search sx={{ color: "rgba(0, 0, 0, 0.54)", mr: 1 }} />
            ),
          }}
        >
          <MenuItem value="7897129879879841">7897129879879841 (Default)</MenuItem>
          <MenuItem value="9879789712879841">9879789712879841</MenuItem>
          <MenuItem value="7987987897129841">7987987897129841</MenuItem>
        </TextField>

      </>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#FFF" }}>
      <MainNavigation />

      {isMobile ? (
        <>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{ "& .MuiDrawer-paper": { width: "320px", mt: "64px" } }}
          >
            <BookingIDs />
          </Drawer>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #E0E0E0",
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#FAFAFA",
              }}
            >
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Box sx={{ fontSize: "20px", fontWeight: 500 }}>Recipients</Box>
            </Box>
            <ContentArea
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              filterControls={filterControls}
              showFiltersInContent
            />
          </Box>
        </>
      ) : (
        <>
          <BookingIDs />
          <FiltersColumn>{filterControls}</FiltersColumn>
          <ContentArea
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            filterControls={filterControls}
          />
        </>
      )}
    </Box>
  );
}

function FiltersColumn({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: 404,
        borderRight: "1px solid #E0E0E0",
        p: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        justifyContent: "flex-start",
      }}
    >
      {children}
    </Box>
  );
}

function ContentArea({
  activeTab,
  handleTabChange,
  filterControls,
  showFiltersInContent = false,
}: {
  activeTab: number;
  handleTabChange: (_event: React.SyntheticEvent, newValue: number) => void;
  filterControls: ReactNode;
  showFiltersInContent?: boolean;
}) {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ borderBottom: "1px solid #E0E0E0", bgcolor: "#FAFAFA" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "0.4px",
              textTransform: "none",
              minHeight: "42px",
            },
          }}
        >
          <Tab
            icon={<PermContactCalendar />}
            iconPosition="start"
            label="Recipients"
          />
          <Tab icon={<Article />} iconPosition="start" label="Templates" />
          <Tab icon={<Mail />} iconPosition="start" label="Draft" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Box
            sx={{
              p: { xs: 2, md: "24px" },
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {showFiltersInContent && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                {filterControls}
              </Box>
            )}

            <Alert
              icon={<Info sx={{ color: "#0288D1" }} />}
              severity="info"
              sx={{
                bgcolor: "#E5F6FD",
                color: "#014361",
                "& .MuiAlert-icon": {
                  color: "#0288D1",
                },
                fontSize: "14px",
                lineHeight: "20.02px",
                letterSpacing: "0.17px",
                fontWeight: 400,
                p: "6px 16px",
                borderRadius: "4px",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.20)",
              }}
            >
              It's currently 06:37 in customer's local time (based on the
              primary phone of member)
            </Alert>

            <Box sx={{ overflowX: "auto" }}>
              <RecipientsTable />
            </Box>
          </Box>
        </Box>
      )}

      {activeTab === 1 && <Templates />}

      {activeTab === 2 && <Drafts />}
    </Box>
  );
}

function PlaceholderPanel({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>{icon}</Box>
        <Box
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: "rgba(0, 0, 0, 0.87)",
          }}
        >
          {title}
        </Box>
        <Box sx={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.60)", mt: 1 }}>
          {subtitle}
        </Box>
      </Box>
    </Box>
  );
}
