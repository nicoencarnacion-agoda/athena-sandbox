import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Apartment as ApartmentIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import Layout from "../components/Layout";

interface RequestTab {
  id: string;
  label: string;
  locked?: boolean;
}

interface BIDTab {
  id: string;
  label: string;
  defaultRequests: RequestTab[];
}

const initialBIDs: BIDTab[] = [
  {
    id: "bid-1",
    label: "BID: 48293641",
    defaultRequests: [
      { id: "guest-name", label: "Add/change guest name" },
      { id: "special-request", label: "Add/change special request" },
      { id: "agent-assisted", label: "Adjust/modify Agent Assisted Booking" },
      { id: "benefits", label: "Amend Benefits" },
      { id: "occupancy", label: "Amend occupancy/rooms/extrabed" },
      { id: "stay-period", label: "Change period of stay" },
      { id: "room-type", label: "Change room type" },
    ],
  },
  {
    id: "bid-2",
    label: "BID: 71582064",
    defaultRequests: [
      { id: "change-period", label: "Change period of stay" },
      { id: "cancel-booking", label: "Request to cancel booking" },
      { id: "not-honored", label: "Reservation not honored" },
    ],
  },
  {
    id: "bid-3",
    label: "BID: 90314726",
    defaultRequests: [
      { id: "partial-refund", label: "Request partial refund" },
      { id: "price-match", label: "Price match inquiry" },
      { id: "early-checkin", label: "Request early check-in" },
      { id: "late-checkout", label: "Request late checkout" },
    ],
  },
];

export default function Handling() {
  const [bidTabs, setBidTabs] = useState<BIDTab[]>(initialBIDs);
  const [bidRequests, setBidRequests] = useState<Record<string, RequestTab[]>>(() =>
    initialBIDs.reduce<Record<string, RequestTab[]>>((acc, bid) => {
      acc[bid.id] = bid.defaultRequests;
      return acc;
    }, {})
  );
  const [activeBIDTab, setActiveBIDTab] = useState(0);
  const [activeRequestTab, setActiveRequestTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const activeBid = bidTabs[activeBIDTab];

  const activeRequests = useMemo(() => {
    if (!activeBid) {
      return [];
    }
    return bidRequests[activeBid.id] ?? [];
  }, [activeBid, bidRequests]);

  useEffect(() => {
    if (activeRequestTab >= activeRequests.length) {
      setActiveRequestTab(activeRequests.length > 0 ? activeRequests.length - 1 : 0);
    }
  }, [activeRequestTab, activeRequests]);

  const handleBIDTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveBIDTab(newValue);
    setActiveRequestTab(0);
  };

  const handleRequestTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (!activeRequests.length && newValue !== false) {
      return;
    }
    setActiveRequestTab(newValue);
  };

  const handleCloseBID = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const bidToRemove = bidTabs[index];
    const updatedBids = bidTabs.filter((_, i) => i !== index);
    const { [bidToRemove.id]: _removed, ...remainingRequests } = bidRequests;

    setBidTabs(updatedBids);
    setBidRequests(remainingRequests);

    if (updatedBids.length === 0) {
      setActiveBIDTab(0);
      setActiveRequestTab(0);
      return;
    }

    let nextIndex = activeBIDTab;
    if (index < activeBIDTab) {
      nextIndex = Math.max(0, activeBIDTab - 1);
    } else if (activeBIDTab >= updatedBids.length) {
      nextIndex = Math.max(0, updatedBids.length - 1);
    }

    setActiveBIDTab(nextIndex);
    setActiveRequestTab(0);
  };

  const handleCloseRequest = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!activeBid) {
      return;
    }

    const currentRequests = bidRequests[activeBid.id] ?? [];
    const updatedRequests = currentRequests.filter((_, i) => i !== index);

    setBidRequests(prev => ({ ...prev, [activeBid.id]: updatedRequests }));

    if (activeRequestTab >= updatedRequests.length) {
      setActiveRequestTab(Math.max(0, updatedRequests.length - 1));
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          bgcolor: "#FAFAFA",
        }}
      >
        {/* BID Tabs */}
        <Box
          sx={{
            bgcolor: "#455A64",
            pt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 2,
          }}
        >
          <Tabs
            value={activeBIDTab}
            onChange={handleBIDTabChange}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                minHeight: "40px",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                letterSpacing: "0.4px",
                borderRadius: "4px 4px 0 0",
                mr: "2px",
                color: "#FFF",
                "&.Mui-selected": {
                  bgcolor: "#FFF",
                  color: "#2196F3",
                },
              },
            }}
          >
            {bidTabs.map((bid, index) => (
              <Tab
                key={bid.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ApartmentIcon sx={{ fontSize: "18px" }} />
                    {bid.label}
                    <IconButton
                      size="small"
                      onClick={(e) => handleCloseBID(index, e)}
                      sx={{
                        p: 0.5,
                        ml: 0.5,
                        color: index === activeBIDTab ? "#2196F3" : "#FFF",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  </Box>
                }
              />
            ))}
          </Tabs>
          <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.56)" }}>
            <AddIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>

        {/* Request Tabs */}
        <Box
          sx={{
            bgcolor: "#FFF",
            borderBottom: "1px solid #E0E0E0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 1.5,
          }}
        >
          <Tabs
            value={activeRequests.length > 0 ? activeRequestTab : false}
            onChange={handleRequestTabChange}
            sx={{
              "& .MuiTabs-indicator": {
                bgcolor: "#2196F3",
                height: "2px",
              },
              "& .MuiTab-root": {
                minHeight: "48px",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                letterSpacing: "0.4px",
                color: "rgba(0, 0, 0, 0.60)",
                "&.Mui-selected": {
                  color: "#2196F3",
                },
              },
            }}
          >
            {activeRequests.map((request, index) => (
              <Tab
                key={request.id}
                disabled={request.locked}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {request.locked && (
                      <LockIcon
                        sx={{
                          fontSize: "20px",
                          color: "rgba(0, 0, 0, 0.60)",
                        }}
                      />
                    )}
                    {request.label}
                    {!request.locked && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleCloseRequest(index, e)}
                        sx={{
                          p: 0.5,
                          ml: 0.5,
                          color: "rgba(0, 0, 0, 0.56)",
                        }}
                      >
                        <CloseIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="text"
              startIcon={<AddIcon />}
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "22px",
                letterSpacing: "0.46px",
                textTransform: "none",
                color: "#2196F3",
              }}
            >
              Add request
            </Button>
            <Button
              variant="contained"
              disabled
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "22px",
                letterSpacing: "0.46px",
                textTransform: "none",
                px: 1.25,
                py: 0.5,
              }}
            >
              Save & close
            </Button>
          </Box>
        </Box>

        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            pt: 6,
            px: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              maxWidth: "700px",
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for a request"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                  </InputAdornment>
                ),
              }}
              FormHelperTextProps={{
                sx: {
                  fontSize: "12px",
                  lineHeight: "166%",
                  letterSpacing: "0.4px",
                  color: "rgba(0, 0, 0, 0.60)",
                },
              }}
              helperText="Use Ctrl+K to quickly access commands and actions."
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "26px",
                letterSpacing: "0.46px",
                textTransform: "none",
                px: "22px",
                py: "8px",
                mt: "8px",
                bgcolor: "#2196F3",
                "&:hover": {
                  bgcolor: "#1976D2",
                },
              }}
            >
              Go
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
