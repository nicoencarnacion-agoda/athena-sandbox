import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  Link,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  InfoOutlined as InfoIcon,
  Cached as CachedIcon,
} from "@mui/icons-material";
import Layout from "../components/Layout";

export default function Index() {
  const [searchType, setSearchType] = useState("Booking ID");

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
            height: "48px",
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
              <span style={{ color: "rgba(0, 0, 0, 0.60)" }}>UCID</span>
            </Typography>
            <Link
              href="#"
              sx={{
                color: "#2196F3",
                fontSize: "16px",
                fontWeight: 400,
                letterSpacing: "0.15px",
                textDecoration: "underline",
                textDecorationColor: "rgba(33, 150, 243, 0.4)",
              }}
            >
              Edit
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "24px",
            gap: "12px",
            height: "56px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <FormControl
              variant="outlined"
              size="medium"
              sx={{ width: "240px", bgcolor: "#FFF" }}
            >
              <InputLabel
                sx={{
                  color: "#2196F3",
                  "&.Mui-focused": {
                    color: "#2196F3",
                  },
                }}
              >
                Search for
              </InputLabel>
              <Select
                value={searchType}
                label="Search for"
                onChange={(e) => setSearchType(e.target.value)}
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
                width: "220px",
                bgcolor: "#FFF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    sx={{
                      color: "rgba(0, 0, 0, 0.56)",
                      mr: 1,
                    }}
                  />
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
              }}
            >
              Search
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "12px",
                fontWeight: 400,
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
                p: "4px 5px",
              }}
            >
              Refresh results
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            px: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            overflow: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "160%",
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
                fontWeight: 400,
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
                lineHeight: "160%",
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
                fontWeight: 400,
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
            p: "12px",
            gap: "8px",
            borderTop: "1px solid #E0E0E0",
            bgcolor: "#FFF",
            height: "66px",
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
              "&:hover": {
                bgcolor: "#1976D2",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
