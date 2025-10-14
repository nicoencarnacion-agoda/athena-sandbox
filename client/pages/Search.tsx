import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  Alert,
  Link,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  InfoOutlined as InfoIcon,
  Cached as CachedIcon,
} from "@mui/icons-material";
import Layout from "../components/Layout";

export default function Search() {
  const [searchType, setSearchType] = useState("Booking ID");
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [selectedContactType, setSelectedContactType] = useState<string | null>(
    null,
  );
  const [selectedContactMethods, setSelectedContactMethods] = useState<
    string[]
  >([]);
  const [internalContactType, setInternalContactType] = useState("");
  const [ucidCode, setUcidCode] = useState("");

  const contactTypes = [
    ["Customer", "Hotel", "Supplier", "B2B"],
    ["Vendor", "Internal", "Other"],
  ];

  const contactMethods = ["Voice", "Email", "Chat", "Social Media"];

  const handleContactTypeClick = (type: string) => {
    setSelectedContactType(type === selectedContactType ? null : type);
    if (type !== "Internal") {
      setInternalContactType("");
    }
  };

  const handleContactMethodClick = (method: string) => {
    setSelectedContactMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method],
    );
  };

  const getChipStyles = (isSelected: boolean) => ({
    fontSize: "16px",
    letterSpacing: "0.16px",
    borderRadius: "100px",
    cursor: "pointer",
    borderColor: "#2196F3",
    color: isSelected ? "#FFF" : "#2196F3",
    bgcolor: isSelected ? "#2196F3" : "transparent",
    "& .MuiChip-label": {
      color: isSelected ? "#FFF" : "#2196F3",
      fontSize: "16px",
      letterSpacing: "0.16px",
    },
  });

  return (
    <Layout>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FAFAFA",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "12px",
            borderBottom: "1px solid #E0E0E0",
            bgcolor: "#FFF",
            minHeight: "48px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "16px",
                fontWeight: 400,
                letterSpacing: "0.15px",
              }}
            >
              Unknwon | Unknown |{" "}
              <Box component="span" sx={{ color: "rgba(0, 0, 0, 0.60)" }}>
                UCID
              </Box>
            </Typography>
            <Link
              href="#"
              underline="always"
              onClick={(e) => {
                e.preventDefault();
                setIsEditingContact(!isEditingContact);
              }}
              sx={{
                color: "#2196F3",
                fontSize: "16px",
                letterSpacing: "0.15px",
              }}
            >
              Edit
            </Link>
          </Box>
        </Box>

        {isEditingContact && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: "24px",
              p: "12px",
              bgcolor: "#FFF",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.87)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.17px",
                }}
              >
                Contact type
              </Typography>
              {contactTypes.map((row, rowIndex) => (
                <Box
                  key={rowIndex}
                  sx={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {row.map((type) => {
                    const isSelected = selectedContactType === type;
                    return (
                      <Chip
                        key={type}
                        label={type}
                        variant={isSelected ? "filled" : "outlined"}
                        color="primary"
                        onClick={() => handleContactTypeClick(type)}
                        sx={getChipStyles(isSelected)}
                      />
                    );
                  })}
                </Box>
              ))}
            </Box>

            {selectedContactType === "Internal" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                }}
              >
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#FFF" }}
                >
                  <InputLabel>Type of internal contact</InputLabel>
                  <Select
                    value={internalContactType}
                    label="Type of internal contact"
                    onChange={(e) => setInternalContactType(e.target.value)}
                  >
                    <MenuItem value="Team A">Team A</MenuItem>
                    <MenuItem value="Team B">Team B</MenuItem>
                    <MenuItem value="Team C">Team C</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.87)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.17px",
                }}
              >
                Method of contact
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {contactMethods.map((method) => {
                  const isSelected = selectedContactMethods.includes(method);
                  return (
                    <Chip
                      key={method}
                      label={method}
                      variant={isSelected ? "filled" : "outlined"}
                      color="primary"
                      onClick={() => handleContactMethodClick(method)}
                      sx={getChipStyles(isSelected)}
                    />
                  );
                })}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                flex: 1,
                justifyContent:
                  selectedContactType === "Internal" ? "center" : "flex-start",
              }}
            >
              <TextField
                label="UCID / Contact code"
                variant="outlined"
                size="small"
                value={ucidCode}
                onChange={(e) => setUcidCode(e.target.value)}
                sx={{
                  bgcolor: "#FFF",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: { xs: "flex-start", lg: "flex-end" },
                flex: 1,
              }}
            >
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
                  bgcolor: "#2196F3",
                  color: "#FFF",
                  boxShadow:
                    "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                  "&:hover": { bgcolor: "#1976D2" },
                  width: { xs: "100%", lg: "auto" },
                }}
              >
                Save contact
              </Button>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: "16px",
            px: "24px",
            py: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <FormControl
              variant="outlined"
              size="medium"
              sx={{
                width: { xs: "100%", sm: "240px" },
                bgcolor: "#FFF",
              }}
            >
              <InputLabel
                sx={{
                  color: "#2196F3",
                  "&.Mui-focused": { color: "#2196F3" },
                }}
              >
                Search for
              </InputLabel>
              <Select
                value={searchType}
                label="Search for"
                onChange={(event) => setSearchType(event.target.value)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196F3",
                    borderWidth: "2px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196F3",
                    borderWidth: "2px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196F3",
                    borderWidth: "2px",
                  },
                }}
              >
                <MenuItem value="Booking ID">Booking ID</MenuItem>
                <MenuItem value="Guest Name">Guest Name</MenuItem>
                <MenuItem value="Property">Property</MenuItem>
              </Select>
            </FormControl>

            <TextField
              placeholder="Search bookings"
              variant="outlined"
              size="medium"
              sx={{
                width: { xs: "100%", sm: "220px" },
                bgcolor: "#FFF",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.56)" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              disabled
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "26px",
                letterSpacing: "0.46px",
                textTransform: "none",
                px: "22px",
                py: "8px",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Search
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "12px",
                letterSpacing: "0.4px",
              }}
            >
              Last updated 20 Nov 14:22
            </Typography>
            <Button
              startIcon={<CachedIcon />}
              sx={{
                color: "#2196F3",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.46px",
                textTransform: "none",
                px: "5px",
                py: "4px",
                minWidth: 0,
              }}
            >
              Refresh results
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            px: "24px",
            pb: "24px",
            overflow: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "32px",
                letterSpacing: "0.15px",
              }}
            >
              Bookings (0)
            </Typography>
            <Alert
              icon={<InfoIcon sx={{ color: "#0288D1" }} />}
              severity="info"
              sx={{
                bgcolor: "#E5F6FD",
                color: "#014361",
                fontSize: "14px",
                letterSpacing: "0.17px",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.20)",
              }}
            >
              Please perform a search to proceed
            </Alert>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "32px",
                letterSpacing: "0.15px",
              }}
            >
              Requests (0)
            </Typography>
            <Alert
              icon={<InfoIcon sx={{ color: "#0288D1" }} />}
              severity="info"
              sx={{
                bgcolor: "#E5F6FD",
                color: "#014361",
                fontSize: "14px",
                letterSpacing: "0.17px",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.20)",
              }}
            >
              Please select a booking to see the related cases.
            </Alert>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
            p: "12px",
            borderTop: "1px solid #E0E0E0",
            bgcolor: "#FFF",
          }}
        >
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
              bgcolor: "#2196F3",
              color: "#FFF",
              boxShadow:
                "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
              "&:hover": { bgcolor: "#1976D2" },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
