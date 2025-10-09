import { useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Tabs,
  Tab,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  FormHelperText,
  Popover,
  Select,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Typography,
  Fade,
} from "@mui/material";
import {
  Apartment as ApartmentIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Lock as LockIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
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
    ],
  },
];

export default function Handling() {
  const [bidTabs, setBidTabs] = useState<BIDTab[]>(initialBIDs);
  const [bidRequests, setBidRequests] = useState<Record<string, RequestTab[]>>(
    () =>
      initialBIDs.reduce<Record<string, RequestTab[]>>((acc, bid) => {
        acc[bid.id] = bid.defaultRequests;
        return acc;
      }, {}),
  );
  const [activeBIDTab, setActiveBIDTab] = useState(0);
  const [activeRequestTab, setActiveRequestTab] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isWizardVisible, setIsWizardVisible] = useState(false);
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const activeBid = bidTabs[activeBIDTab];

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearchFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsPopoverOpen(false);
    setExpandedCategory(null); // Reset expanded category
  };

  const handleCategoryChange = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleRequestSelect = (request: string) => {
    setSelectedRequest(request);
    setIsPopoverOpen(false);
    setAnchorEl(null);
    setExpandedCategory(null); // Reset expanded category
    // Blur the input field to remove focus
    const field = searchFieldRef.current;
    if (field && typeof (field as unknown as HTMLElement).blur === "function") {
      (field as unknown as HTMLElement).blur();
    }
  };

  const requestOptions = [
    {
      category: "Top Case Reasons",
      options: [
        "Change period of stay",
        "Request to cancel booking",
        "Reservation not honored",
      ],
    },
    {
      category: "Agoda member account",
      options: [
        "Access - DSRR (PMT Team)",
        "Add/Edit Reward Account",
        "Compromised Agoda account",
        "Delete account - DSRR (PMT Team)",
        "Delete booking - DSRR (PMT Team)",
        "Inquiry about CCPA",
        "Inquiry about DSRR",
        "Inquiry on Agoda VIP status",
        "Objection - DSRR (PMT Team)",
        "Portability - DSRR (PMT Team)",
        "Questions about property review",
        "Remove/unsubscribe from newsletter/sms/hermes",
        "Restriction - DSRR (PMT Team)",
      ],
    },
    {
      category: "Agodacash and Promotions",
      options: [
        "Deactivate Agodacash",
        "Inquiry/status on Agodacash",
        "Inquiry/status on Promotion/Pointsmax",
      ],
    },
    {
      category: "Amendment",
      options: [
        "Add/change guest name",
        "Adjust/modify Agent Assisted Booking",
        "Amend Benefits",
        "Amend occupancy/rooms/extrabed",
        "Change period of stay",
        "Change room type",
        "Guest details update",
        "Inquiry on special request",
        "Member details update",
      ],
    },
    {
      category: "Best price guarantee",
      options: [
        "Claim BPG",
      ],
    },
    {
      category: "Booking info",
      options: [
        "Agoda flights related inquiry (SM Team)",
        "Check booking details/status",
        "Inquiry about government travel campaign",
      ],
    },
    {
      category: "Cancellation",
      options: [
        "Inquiry about cancelled booking",
        "Reinstate booking",
        "Request to cancel booking",
        "Resend cancellation email",
      ],
    },
    {
      category: "Cashback",
      options: [
        "Inquiry about Cashback",
      ],
    },
    {
      category: "Check-in inquiry/issue",
      options: [
        "API mapping issue (CSI Team)",
        "Complaint about stay",
        "Inquiry on type/mode of payment available (SM Team)",
        "Reservation not found",
        "Reservation not honored",
        "Room details mismatch from master supplier (CSI Team)",
        "Send confirmation email",
        "XML mapping error (CSI Team)",
      ],
    },
  ];

  const activeRequests = useMemo(() => {
    if (!activeBid) {
      return [];
    }
    return bidRequests[activeBid.id] ?? [];
  }, [activeBid, bidRequests]);

  useEffect(() => {
    if (activeRequestTab >= activeRequests.length) {
      setActiveRequestTab(
        activeRequests.length > 0 ? activeRequests.length - 1 : 0,
      );
    }
  }, [activeRequestTab, activeRequests]);

  const handleBIDTabChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setActiveBIDTab(newValue);
    setActiveRequestTab(0);
  };

  const handleRequestTabChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ) => {
    if (!activeRequests.length) {
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

    setBidRequests((prev) => ({ ...prev, [activeBid.id]: updatedRequests }));

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
                      component="span"
                      size="small"
                      onClick={(e) => handleCloseBID(index, e)}
                      sx={{
                        p: 0.5,
                        ml: 0.5,
                        color: index === activeBIDTab ? "#2196F3" : "#FFF",
                        cursor: "pointer",
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
                        component="span"
                        size="small"
                        onClick={(e) => handleCloseRequest(index, e)}
                        sx={{
                          p: 0.5,
                          ml: 0.5,
                          color: "rgba(0, 0, 0, 0.56)",
                          cursor: "pointer",
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
            justifyContent: "flex-start",
          }}
        >
          {isWizardVisible ? (
            <>
              {/* Wizard and Note for BID */}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Wizard */}
                <Box
                  sx={{
                    flex: 1,
                    height: "100%",
                    bgcolor: "#fafafa",
                    overflow: "hidden",
                    p: "16px",
                  }}
                >
                  <iframe
                    src="https://154888a4619c4c7d80756b1098d1b96d-main.projects.builder.my/"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: "4px",
                      border: "1px solid #E0E0E0",
                    }}
                    title="Case Handling Wizard"
                  />
                </Box>

                {/* Note for BID */}
                <Box
                  sx={{
                    width: "310px",
                    height: "100%",
                    bgcolor: "#fff",
                    borderLeft: "1px solid #E0E0E0",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Note for BID {activeBid?.label.split(": ")[1]}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Request 1:
                  </Typography>

                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Case summary
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Lorem ipsum placeholder
                  </Typography>

                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Action taken
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Lorem ipsum placeholder
                  </Typography>
                  <Box sx={{ pl: 2, mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      1. Action item
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2. Action item
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Special notes (Optional)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Lorem ipsum placeholder
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      1. Action item
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2. Action item
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            /* Default View */
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                maxWidth: "700px",
                width: "100%",
                padding: "24px",
              }}
            >
            <FormControl fullWidth>
               <InputLabel 
                 id="search-request-label" 
                 sx={{ 
                   "&.MuiInputLabel-shrink": { 
                     color: "rgba(0, 0, 0, 0.6)",
                   },
                   "&.Mui-focused": {
                     color: "#1976d2 !important", // Primary blue color when focused
                   }
                 }}
               >
                 Search for a request
               </InputLabel>
               <Select
                 labelId="search-request-label"
                 value={selectedRequest}
                 displayEmpty
                 label="Search for a request"
                 onClick={handleSearchFocus}
                 open={false}
                 inputRef={searchFieldRef}
                 startAdornment={
                   <InputAdornment position="start">
                     <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                   </InputAdornment>
                 }
                 sx={{
                   "& .MuiSelect-select": {
                     fontSize: "16px",
                     lineHeight: "24px",
                     letterSpacing: "0.15px",
                     paddingLeft: "32px !important",
                     cursor: "pointer",
                   },
                   "& .MuiInputAdornment-root": {
                     position: "absolute",
                     left: "12px",
                     pointerEvents: "none",
                   },
                   "& .MuiOutlinedInput-notchedOutline": {
                     borderColor: "rgba(0, 0, 0, 0.23)",
                   },
                   "&:hover .MuiOutlinedInput-notchedOutline": {
                     borderColor: "rgba(0, 0, 0, 0.87)",
                   },
                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                     borderColor: "#1976d2",
                   },
                 }}
                 renderValue={(selected) => {
                   if (!selected) {
                     return "Search for a request";
                   }
                   return selected;
                 }}
              />
              <FormHelperText sx={{
                fontSize: "12px",
                lineHeight: "166%",
                letterSpacing: "0.4px",
                color: "rgba(0, 0, 0, 0.60)",
              }}>
                Use Ctrl+K to quickly access commands and actions.
              </FormHelperText>
               <Popover
                 open={isPopoverOpen}
                 anchorEl={anchorEl}
                 onClose={handlePopoverClose}
                 anchorOrigin={{
                   vertical: 'bottom',
                   horizontal: 'left',
                 }}
                 transformOrigin={{
                   vertical: 'top',
                   horizontal: 'left',
                 }}
                 TransitionComponent={Fade}
                 transitionDuration={200}
                 sx={{
                   '& .MuiPopover-paper': {
                     width: `620px`,
                     maxHeight: 400,
                     marginTop: '1px',
                     boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                     transform: 'none !important',
                   },
                 }}
              >
                {/* Top Case Reasons - Always visible */}
                <Box sx={{ bgcolor: "#F5F5F5", p: 2, borderBottom: "1px solid #E0E0E0" }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "rgba(0, 0, 0, 0.87)" }}>
                    Top Case Reasons
                  </Typography>
                </Box>
                {requestOptions
                  .find(cat => cat.category === "Top Case Reasons")
                  ?.options.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        handleRequestSelect(option);
                      }}
                      sx={{
                        py: 1.5,
                        pl: 3,
                        fontSize: "14px",
                        color: "rgba(0, 0, 0, 0.87)",
                        "&:hover": { bgcolor: "#F5F5F5" },
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}

                {/* Other Categories as Accordions */}
                {requestOptions
                  .filter(cat => cat.category !== "Top Case Reasons")
                  .map((category) => (
                    <Accordion
                      key={category.category}
                      expanded={expandedCategory === category.category}
                      onChange={() => handleCategoryChange(category.category)}
                      disableGutters
                      elevation={0}
                      sx={{
                        "&:before": { display: "none" },
                        borderBottom: "1px solid #E0E0E0",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          bgcolor: "#F5F5F5",
                          minHeight: "48px",
                          "& .MuiAccordionSummary-content": {
                            margin: "12px 0",
                          },
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500, color: "rgba(0, 0, 0, 0.87)" }}>
                          {category.category}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0 }}>
                        {category.options.map((option) => (
                          <MenuItem
                            key={option}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event bubbling
                              handleRequestSelect(option);
                            }}
                            sx={{
                              py: 1.5,
                              pl: 3,
                              fontSize: "14px",
                              color: "rgba(0, 0, 0, 0.87)",
                              "&:hover": { bgcolor: "#F5F5F5" },
                            }}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </Popover>
            </FormControl>
              <Button
                variant="contained"
                onClick={() => {
                  if (selectedRequest) {
                    setIsWizardVisible(true);
                    setIsPopoverOpen(false);
                    setAnchorEl(null);
                  }
                }}
                disabled={!selectedRequest}
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "26px",
                  letterSpacing: "0.46px",
                  textTransform: "none",
                  px: "22px",
                  py: "8px",
                  bgcolor: "#2196F3",
                  color: "#FFFFFF",
                  mt: "7px",
                  "&:hover": {
                    bgcolor: "#1976D2",
                  },
                }}
              >
                Go
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
}
