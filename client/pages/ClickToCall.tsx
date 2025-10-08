import { useState } from "react";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  TextField,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Phone as PhoneIcon,
  Add as AddIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import Layout from "../components/Layout";
import BookingIDs from "../components/BookingIDs";

interface ContactRow {
  role: string;
  description: string;
  phoneType: string;
  phoneNumber: string;
}

const contactData: ContactRow[] = Array.from({ length: 9 }, () => ({
  role: "Member",
  description: "Mohd Faez Nawi",
  phoneType: "Primary phone",
  phoneNumber: "63 277 1188",
}));

export default function ClickToCall() {
  const [direction, setDirection] = useState("outbound");
  const [contactType, setContactType] = useState("Customer");
  const [contactMethod, setContactMethod] = useState("voice");
  const [contactedVia, setContactedVia] = useState("athena");
  const [interactionId, setInteractionId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Layout>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", width: "100%" }}>
        <BookingIDs />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "326px",
            p: "24px 16px 16px 16px",
            borderRight: "1px solid #E0E0E0",
            bgcolor: "#FFF",
            gap: "24px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  lineHeight: "150%",
                  letterSpacing: "0.15px",
                  color: "rgba(0, 0, 0, 0.60)",
                }}
              >
                Direction
              </Typography>
              <ToggleButtonGroup
                value={direction}
                exclusive
                onChange={(e, newValue) => newValue && setDirection(newValue)}
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "4px",
                }}
              >
                <ToggleButton
                  value="outbound"
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Outbound
                </ToggleButton>
                <ToggleButton
                  value="inbound"
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Inbound
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <TextField
              select
              fullWidth
              variant="outlined"
              label="Contact type"
              value={contactType}
              onChange={(event: SelectChangeEvent) =>
                setContactType(event.target.value as string)
              }
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                },
              }}
            >
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Partner">Partner</MenuItem>
              <MenuItem value="Internal">Internal</MenuItem>
            </TextField>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  lineHeight: "150%",
                  letterSpacing: "0.15px",
                  color: "rgba(0, 0, 0, 0.60)",
                }}
              >
                Contact method
              </Typography>
              <ToggleButtonGroup
                value={contactMethod}
                exclusive
                onChange={(e, newValue) =>
                  newValue && setContactMethod(newValue)
                }
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "4px",
                }}
              >
                <ToggleButton
                  value="voice"
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Voice
                </ToggleButton>
                <ToggleButton
                  value="email"
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Email
                </ToggleButton>
                <ToggleButton
                  value="chat"
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Chat
                </ToggleButton>
                <ToggleButton
                  value="social"
                  disabled
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Social media
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  lineHeight: "150%",
                  letterSpacing: "0.15px",
                  color: "rgba(0, 0, 0, 0.60)",
                }}
              >
                Contacted via
              </Typography>
              <ToggleButtonGroup
                value={contactedVia}
                exclusive
                onChange={(e, newValue) =>
                  newValue && setContactedVia(newValue)
                }
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "4px",
                }}
              >
                <ToggleButton
                  value="athena"
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Athena
                </ToggleButton>
                <ToggleButton
                  value="manual"
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    textTransform: "none",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      color: "#2196F3",
                    },
                  }}
                >
                  Manual
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <TextField
              label="Enter interaction ID"
              variant="outlined"
              fullWidth
              value={interactionId}
              onChange={(e) => setInteractionId(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "26px",
              letterSpacing: "0.46px",
              textTransform: "none",
              py: "8px",
              bgcolor: "#2196F3",
              color: "#FFF",
              "&:hover": {
                bgcolor: "#1976D2",
              },
            }}
          >
            Add contact
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              overflow: "auto",
              width: "100%",
            }}
          >
            <Alert
              icon={<InfoIcon sx={{ color: "#0288D1" }} />}
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

            <Button
              variant="text"
              startIcon={<AddIcon />}
              sx={{
                alignSelf: "flex-start",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "26px",
                letterSpacing: "0.46px",
                textTransform: "none",
                color: "#2196F3",
              }}
            >
              Add phone number
            </Button>

            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                border: "1px solid #E0E0E0",
                boxShadow: "none",
                borderRadius: "4px",
              }}
            >
              <Table sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#ECEFF1" }}>
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "166%",
                        letterSpacing: "0.4px",
                        color: "rgba(0, 0, 0, 0.87)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      Role
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "166%",
                        letterSpacing: "0.4px",
                        color: "rgba(0, 0, 0, 0.87)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "166%",
                        letterSpacing: "0.4px",
                        color: "rgba(0, 0, 0, 0.87)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      Phone type
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "166%",
                        letterSpacing: "0.4px",
                        color: "rgba(0, 0, 0, 0.87)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      Phone number
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "166%",
                        letterSpacing: "0.4px",
                        color: "rgba(0, 0, 0, 0.87)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        textAlign: "center",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactData.map((row, index) => (
                    <TableRow key={`${row.phoneNumber}-${index}`}>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          lineHeight: "143%",
                          letterSpacing: "0.17px",
                          color: "rgba(0, 0, 0, 0.87)",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}
                      >
                        {row.role}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          lineHeight: "143%",
                          letterSpacing: "0.17px",
                          color: "rgba(0, 0, 0, 0.87)",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          lineHeight: "143%",
                          letterSpacing: "0.17px",
                          color: "rgba(0, 0, 0, 0.87)",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}
                      >
                        {row.phoneType}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          lineHeight: "143%",
                          letterSpacing: "0.17px",
                          color: "rgba(0, 0, 0, 0.87)",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}
                      >
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<PhoneIcon />}
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "26px",
                            letterSpacing: "0.46px",
                            textTransform: "none",
                            borderColor: "rgba(25, 118, 210, 0.5)",
                            color: "#2196F3",
                            px: "22px",
                          }}
                        >
                          Call
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              p: "24px",
              borderTop: "1px solid #E0E0E0",
              bgcolor: "#FFF",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "0.15px",
                color: "#000",
              }}
            >
              Call another contact:
            </Typography>
            <TextField
              label="Enter phone number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{
                flex: 1,
                maxWidth: "356px",
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<PhoneIcon />}
              disabled={!phoneNumber}
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "26px",
                letterSpacing: "0.46px",
                textTransform: "none",
                px: "22px",
                py: "8px",
                "&.Mui-disabled": {
                  bgcolor: "rgba(0, 0, 0, 0.12)",
                  color: "rgba(0, 0, 0, 0.38)",
                },
              }}
            >
              Call
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
