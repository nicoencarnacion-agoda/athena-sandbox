import { useState, useRef } from "react";
import {
  Box,
  IconButton,
  Tabs,
  Tab,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Checkbox,
  Chip,
  Link,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import {
  RemoveCircle as RemoveIcon,
  ArrowDropDown as ArrowDownIcon,
  ArrowDropUp as ArrowUpIcon,
  ContentCopy as CopyIcon,
  CalendarToday as CalendarIcon,
  Business as HotelIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  AttachMoney as MoneyIcon,
  Description as NoteIcon,
  FormatListBulleted as ActivityIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  EmailOutlined as EmailIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material";
import ActivityLogTable from "./ActivityLogTable";

type PanelPosition = "bottom" | "middle" | "fullscreen";

interface BottomPanelProps {
  bookingId?: string;
}

const BottomPanel = ({ bookingId = "00000001" }: BottomPanelProps) => {
  const [position, setPosition] = useState<PanelPosition>("middle");
  const [activeTab, setActiveTab] = useState(0);
  const [expandedOtherActions, setExpandedOtherActions] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "booking", label: "Booking", Icon: CalendarIcon },
    { id: "hotel-supplier", label: "Hotel & supplier", Icon: HotelIcon },
    { id: "member-loyalty", label: "Member & loyalty", Icon: PersonIcon },
    { id: "customer-payments", label: "Customer payments", Icon: PaymentIcon },
    { id: "supplier-charges", label: "Supplier charges", Icon: MoneyIcon },
    { id: "note-log", label: "Note log", Icon: NoteIcon },
    { id: "activity-log", label: "Activity log", Icon: ActivityIcon },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    
    // Scroll to the corresponding section
    const sectionId = tabs[newValue].id;
    const sectionElement = document.getElementById(`section-${sectionId}`);
    
    if (sectionElement && contentRef.current) {
      const topOffset = sectionElement.offsetTop - 112; // Account for sticky header
      contentRef.current.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const getHeightStyle = () => {
    switch (position) {
      case "bottom":
        return "auto"; // Collapsed - only header and tabs
      case "middle":
        return "60%";
      case "fullscreen":
        return "100%";
      default:
        return "60%";
    }
  };

  const handlePositionChange = (newPosition: PanelPosition) => {
    setPosition(newPosition);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: getHeightStyle(),
        display: "flex",
        flexDirection: "column",
        transition: "height 0.3s ease-in-out",
        zIndex: 10,
        borderRadius: 0,
      }}
    >
      {/* Header with positioning controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 0,
          bgcolor: "#F5F5F5",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Box sx={{ display: "flex", gap: 0 }}>
          <IconButton
            size="small"
            onClick={() => handlePositionChange("bottom")}
            disabled={position === "bottom"}
          >
            <ArrowDownIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handlePositionChange("middle")}
            disabled={position === "middle"}
          >
            <RemoveIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handlePositionChange("fullscreen")}
            disabled={position === "fullscreen"}
          >
            <ArrowUpIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          bgcolor: "#FFF",
          borderBottom: "1px solid #E0E0E0",
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
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
              letterSpacing: "0.4px",
              color: "rgba(0, 0, 0, 0.60)",
              "&.Mui-selected": {
                color: "#2196F3",
              },
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <tab.Icon sx={{ fontSize: "20px" }} />
                  {tab.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Scrollable Content */}
      {position !== "bottom" && (
        <Box
          ref={contentRef}
          sx={{
            flex: 1,
            overflow: "auto",
            bgcolor: "#FFF",
            pt: 1.5,
          }}
        >
        {/* Booking Section */}
        <Box
          id="section-booking"
          sx={{
            bgcolor: "#FAFAFA",
            mb: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            mx: "16px",
          }}
        >
          {/* Section Header */}
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CalendarIcon sx={{ fontSize: "20px", color: "rgba(0, 0, 0, 0.54)" }} />
            <Typography
              variant="h6"
              sx={{ fontSize: "20px", fontWeight: 500 }}
            >
              Booking
            </Typography>
          </Box>

          {/* Booking Content */}
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Left Column - Booking Details */}
              <Box sx={{ flex: 1, borderRight: "1px solid #E0E0E0", pr: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Booking details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid #E0E0E0", pb: 2 }}>
                  <DetailRow
                    label="Booking status:"
                    value="995 Cancelled Booking (Cust Request)"
                    copyable
                  />
                  <DetailRow label="Logged in at booking:" value="Yes, App" />
                  <DetailRow label="No of nights:" value="2" />
                  <DetailRow label="No. guest:" value="4 (4 adults, 0 children)" />
                  <DetailRow
                    label="Cancellation policy:"
                    value="365D100P_100P This booking is Non-Refundable and cannot be amended or modified. If you fail to arrive or cancel the booking, no refund will be given."
                  />
                  <DetailRow label="Payment status:" value="Completed" />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mt: 2, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Check-in and Check-out time
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="Check-in time:" value="12-Oct-2019 11:00" />
                  <DetailRow label="Check-out time:" value="14-Oct-2019 12:00" />
                </Box>
              </Box>

              {/* Right Column - Guest Details */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Guest details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid #E0E0E0", pb: 2 }}>
                  <DetailRow
                    label="Lead guest:"
                    value="Seojun Kim (age, nationality)"
                    copyable
                  />
                  <DetailRow label="Guest phone:" value="66850437777" />
                  <DetailRow label="Booking email:" value="123@agoda.com" />
                  <DetailRow label="Client IP:" value="122.111.111.111" />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mt: 2, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Booking ID related
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="Itinerary ID:" value="3843490835" copyable />
                  <DetailRow label="Booking ID:" value="568308069" copyable />
                  <DetailRow label="Prebooking ID:" value="33333333333" />
                  <DetailRow label="Booking creation date:" value="11-Oct-2019" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Hotel & Supplier Section */}
        <Box
          id="section-hotel-supplier"
          sx={{
            bgcolor: "#FAFAFA",
            mb: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            mx: "16px",
          }}
        >
          {/* Section Header */}
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <HotelIcon sx={{ fontSize: "20px", color: "rgba(0, 0, 0, 0.54)" }} />
            <Typography
              variant="h6"
              sx={{ fontSize: "20px", fontWeight: 500 }}
            >
              Hotel & Supplier
            </Typography>
          </Box>

          {/* Hotel & Supplier Content */}
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Left Column - Hotel Details */}
              <Box sx={{ flex: 1, borderRight: "1px solid #E0E0E0", pr: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Hotel details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid #E0E0E0", pb: 2 }}>
                  <DetailRow label="Hotel ID:" value="3843490835" copyable />
                  <DetailRow
                    label="Hotel name:"
                    value="Classic Kameo Hotel & Serviced Apartments,"
                  />
                  <DetailRow
                    label="Hotel address:"
                    value="210 - 211, 148 Moo 5 Rojana Road Pailing Phra Nakhon Si Ayutthaya District, Phra Nakhon Si Ayutthaya 13000, Thailand"
                  />
                  <DetailRow label="Advanced guarantee:" value="Yes" />
                  <DetailRow label="Agoda MM:" value="jenvit.seriburi@agoda.com" />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mt: 2, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Booking remark by the guest
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="Room type:" value="1 x Deluxe Room" />
                  <DetailRow label="Benefits:" value="Breakfast included, Wi-Fi" />
                  <DetailRow label="Number of beds:" value="0" />
                  <DetailRow label="Extra beds:" value="0" />
                  <DetailRow 
                    label="Hotel remark:" 
                    value="Pax asked for extra bed but cannot accommodate because it is not available for this room type. Pax asked for extra bed but cannot accommodate because it is not available for this room type. Pax asked for extra bed but canno.. this is 250 characters." 
                  />
                  <DetailRow label="Room remark:" value="-" />
                  <DetailRow label="Special requests:" value="NonSmoke, LargeBed" />
                  <DetailRow label="Rate plan:" value="-" />
                </Box>
              </Box>

              {/* Right Column - Supplier Details */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Supplier details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid #E0E0E0", pb: 2 }}>
                  <DetailRow label="Supplier name:" value="BCOM" />
                  <DetailRow label="Supplier reference no.:" value="2847929565" />
                  <DetailRow label="Supplier price:" value="THB 4163.82" />
                  <DetailRow label="PIN code (BCOM only):" value="2453 GTMB link" link="#" />
                  <DetailRow
                    label="Current supplier payment method:"
                    value="UPC Plus under ePass (Foundation BO)"
                  />
                  <DetailRow label="Rate channel:" value="Retail" />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mt: 2, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Supply payment condition
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid #E0E0E0", pb: 2 }}>
                  <DetailRow label="Payment condition:" value="On departure" />
                  <DetailRow label="Payment condition for non-refundable bkg:" value="On booking" />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mt: 2, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Others
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="DMC due date:" value="11-Oct-2019  00:27" />
                  <DetailRow label="CID:" value="17709999" />
                  <DetailRow label="Affiliate name:" value="Property Share in App" />
                  <DetailRow label="Fraud action:" value="4" />
                  <DetailRow label="Hotel confirmation reference:" value="-" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Placeholder sections for other tabs */}
        <Box
          id="section-member-loyalty"
          sx={{
            bgcolor: "#FAFAFA",
            mb: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            mx: "16px",
          }}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PersonIcon sx={{ fontSize: "20px", color: "rgba(0, 0, 0, 0.54)" }} />
            <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500 }}>
              Member & loyalty
            </Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Left Column - Member Details */}
              <Box sx={{ flex: 1, borderRight: "1px solid #E0E0E0", pr: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Member details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid #E0E0E0", pb: 2 }}>
                  <DetailRow label="Member ID:" value="216520819" />
                  <DetailRow label="First name:" value="John" />
                  <DetailRow label="Last name:" value="Doe" />
                  <DetailRow label="Account type:" value="Email" />
                  <DetailRow label="Residency:" value="Thailand" />
                  <DetailRow label="Member email:" value="pimmda.jetsadakraisorn@agoda.com" />
                  <DetailRow label="Language:" value="Korea" />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mt: 2, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Loyalty
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="VIP status:" value="Gold" />
                  <DetailRow label="AgodaCash balance:" value="10 USD AgodaCash Backoffice link" link="#" />
                </Box>
              </Box>

              {/* Right Column - Cashback & PointsMAX */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Cashback details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid #E0E0E0", pb: 2 }}>
                  <DetailRow label="Cashback booking:" value="Yes Cashback link" link="#" />
                  <DetailRow label="Cashback amount:" value="120 THB (3.5 USD)" />
                  <DetailRow label="Cashback status:" value="Claimed" />
                  <DetailRow label="Earn date:" value="14-May-23" />
                  <DetailRow label="Claimed date:" value="14-May-23" />
                  <DetailRow label="Claim status:" value="Claim in Progress" />
                  <DetailRow label="ARN:" value="2311111111111111111111" />
                  <DetailRow label="Last 4 digits of CC:" value="5200" />
                  <DetailRow label="Expiry date:" value="20-Dec-23" />
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mt: 2, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  PointsMAX program
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="Membership ID:" value="12345" />
                  <DetailRow label="Program name:" value="program name" />
                  <DetailRow label="Number of Points:" value="123" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          id="section-customer-payments"
          sx={{
            bgcolor: "#FAFAFA",
            mb: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            mx: "16px",
          }}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PaymentIcon sx={{ fontSize: "20px", color: "rgba(0, 0, 0, 0.54)" }} />
            <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500 }}>
              Customer payments
            </Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
              {/* Left Column - Payment Overview */}
              <Box sx={{ flex: 1, borderRight: "1px solid #E0E0E0", pr: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Payment overview
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="Payment status:" value="Completed" />
                  <DetailRow label="Payment method:" value="Credit card" />
                  <DetailRow label="Booking value:" value="THB 4163.82" />
                  <DetailRow label="Total charge (cash):" value="THB 4163.82 (USD 230.48)" />
                  <DetailRow label="Total paid (cash):" value="THB 4163.82 (USD 230.48)" />
                  <DetailRow label="Outstanding balance:" value="THB 0 (USD 0)" />
                </Box>
              </Box>

              {/* Right Column - Credit Card */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
                >
                  Credit card
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <DetailRow label="Credit card Selection:" value="2222: 10-Oct-2022 11:19:00" />
                  <DetailRow label="Credit card No.:" value="xxxx-xxxx-xxxx-2222" />
                  <DetailRow label="Type:" value="Master Card" />
                  <DetailRow label="Holder name:" value="John Doe" />
                  <DetailRow label="CCID:" value="555555550" />
                  <DetailRow label="Updated by:" value="Customer" />
                  <DetailRow label="Date updated:" value="10-Oct-2022  11:10:10" />
                </Box>
              </Box>
            </Box>

            {/* Customer Payment List Table */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
              >
                Customer payment List
              </Typography>

              <TableContainer 
                sx={{ 
                  bgcolor: "#FFF", 
                  border: "1px solid #E0E0E0", 
                  borderRadius: "4px",
                  overflow: "hidden"
                }}
              >
                <Table 
                  size="small" 
                  sx={{ 
                    minWidth: 650,
                    '& td, & th': { borderRight: '1px solid #E0E0E0' },
                    '& td:last-child, & th:last-child': { borderRight: 0 }
                  }}
                >
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F5F5F5" }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Payment date</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Payment type</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Last 4 digits</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>MMSID</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Gateway</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Local amount</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Exchange rate</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>3DS Option</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>By</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((id) => (
                      <TableRow 
                        key={id}
                        sx={{ 
                          '&:hover': { bgcolor: '#F5F5F5' },
                          '&:last-child td, &:last-child th': { borderBottom: 0 }
                        }}
                      >
                        <TableCell sx={{ fontSize: "13px" }}>{id}</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>18-Feb-2021  10:26:00</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>Auth</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>Cards</TableCell>
                        <TableCell sx={{ fontSize: "13px", color: "#4CAF50" }}>Success</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>1111</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>116028280</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>WorldPay</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>USD 100</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>CHF 100</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>100.00</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>Auto Payment</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>Invalid user</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>

        <Box
          id="section-supplier-charges"
          sx={{
            bgcolor: "#FAFAFA",
            mb: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            mx: "16px",
          }}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MoneyIcon sx={{ fontSize: "20px", color: "rgba(0, 0, 0, 0.54)" }} />
            <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500 }}>
              Supplier charges
            </Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
            {/* Alert Banner */}
            <Alert severity="warning" sx={{ mb: 2 }}>
              This is a merchant-commission rate booking
            </Alert>

            {/* Supplier charge total */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
              >
                Supplier charge total
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <DetailRow label="Paid amount:" value="USD 78.32" />
                <DetailRow label="Outstanding balance:" value="USD 0.00" />
                <DetailRow label="Commission:" value="14%" />
              </Box>
            </Box>

            {/* Supplier Charges Table */}
            <TableContainer 
              sx={{ 
                bgcolor: "#FFF", 
                border: "1px solid #E0E0E0", 
                borderRadius: "4px",
                overflow: "hidden",
                mb: 3
              }}
            >
              <Table 
                size="small"
                sx={{
                  '& td, & th': { borderRight: '1px solid #E0E0E0' },
                  '& td:last-child, & th:last-child': { borderRight: 0 }
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F5F5F5" }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Selling price</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Tax</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>TDS - Withholding tax</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>TCS - Withholding tax</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Tax on Commission</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Selling price w/o tax</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Supplier price</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Local price</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Breakfast</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(10)].map((_, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:hover': { bgcolor: '#F5F5F5' },
                        '&:last-child td, &:last-child th': { borderBottom: 0 }
                      }}
                    >
                      <TableCell sx={{ fontSize: "13px" }}>3</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Room charge</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>USD0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>USD0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>MYR 0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>MYR 0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>MYR 0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>MYR 0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>MYR 0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>MYR 0.00</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        <Checkbox size="small" disabled />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals Row */}
                  <TableRow sx={{ bgcolor: "#BBDEFB" }}>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>Totals</TableCell>
                    <TableCell sx={{ fontSize: "13px" }}></TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 360.00</TableCell>
                    <TableCell sx={{ fontSize: "13px" }}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Charge History Table */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1, color: "rgba(0, 0, 0, 0.87)" }}
              >
                Charge History
              </Typography>

              <TableContainer 
                sx={{ 
                  bgcolor: "#FFF", 
                  border: "1px solid #E0E0E0", 
                  borderRadius: "4px",
                  overflow: "hidden"
                }}
              >
              <Table 
                size="small"
                sx={{
                  '& td, & th': { borderRight: '1px solid #E0E0E0' },
                  '& td:last-child, & th:last-child': { borderRight: 0 }
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F5F5F5" }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Transaction date</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Selling price</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Tax</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Selling price w/o tax</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Supplier & Hotel price</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Local price</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Exchange rate</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Markup</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Created by</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(10)].map((_, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          '&:hover': { bgcolor: '#F5F5F5' },
                          '&:last-child td, &:last-child th': { borderBottom: 0 }
                        }}
                      >
                        <TableCell sx={{ fontSize: "13px" }}>3</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>18-Feb-2021 10:26:00</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>Room Charge</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>USD 90.00</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>USD 10.00</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>USD 76.53</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>USD 74.67</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>MYR 267.36</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>3.5804</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>15%</TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>Auto insert</TableCell>
                      </TableRow>
                    ))}
                    {/* Totals Row */}
                    <TableRow sx={{ bgcolor: "#BBDEFB" }}>
                      <TableCell sx={{ fontSize: "13px" }}></TableCell>
                      <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>Totals</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}></TableCell>
                      <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 900.00</TableCell>
                      <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 100.00</TableCell>
                      <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 760.53</TableCell>
                      <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>USD 740.67</TableCell>
                      <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>MYR 2670.36</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}></TableCell>
                      <TableCell sx={{ fontSize: "13px" }}></TableCell>
                      <TableCell sx={{ fontSize: "13px" }}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>

        <Box
          id="section-note-log"
          sx={{
            bgcolor: "#FAFAFA",
            mb: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            mx: "16px",
          }}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NoteIcon sx={{ fontSize: "20px", color: "rgba(0, 0, 0, 0.54)" }} />
            <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500 }}>
              Note log
            </Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
            {/* Filter */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select defaultValue="all" sx={{ fontSize: "13px" }}>
                  <MenuItem value="all">All contact reasons</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Note Log Table */}
            <TableContainer 
              sx={{ 
                bgcolor: "#FFF", 
                border: "1px solid #E0E0E0", 
                borderRadius: "4px",
                overflow: "hidden"
              }}
            >
              <Table 
                size="small"
                sx={{
                  '& td, & th': { borderRight: '1px solid #E0E0E0' },
                  '& td:last-child, & th:last-child': { borderRight: 0 }
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F5F5F5" }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Note ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Contact party</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Contact reason</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px", width: "35%" }}>Notes</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { status: "Resolved", statusColor: "#E8F5E9", textColor: "#2E7D32", borderColor: "#81C784" },
                    { status: "Follow up with Finance", statusColor: "#FFF3E0", textColor: "#E65100", borderColor: "#FFB74D" },
                    { status: null, statusColor: "", textColor: "", borderColor: "" },
                    { status: "Duplicate", statusColor: "#E0E0E0", textColor: "#616161", borderColor: "#BDBDBD" },
                    { status: "Resolved", statusColor: "#E8F5E9", textColor: "#2E7D32", borderColor: "#81C784" },
                  ].map((item, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:hover': { bgcolor: '#F5F5F5' },
                        '&:last-child td, &:last-child th': { borderBottom: 0 },
                        verticalAlign: "top"
                      }}
                    >
                      <TableCell sx={{ fontSize: "13px" }}>C77B2udh</TableCell>
                      <TableCell sx={{ fontSize: "13px", whiteSpace: "nowrap" }}>
                        18-Feb-2021<br/>10:26:00
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Internal TMA<br/>
                        <Link href="#" sx={{ fontSize: "13px", textDecoration: "none" }}>Copy UCID</Link>
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Email</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        <Box>
                          Cancel booking inside policy with doc
                          {item.status && (
                            <Box sx={{ mt: 0.5 }}>
                              <Chip 
                                label={item.status} 
                                size="small"
                                sx={{ 
                                  height: "24px",
                                  fontSize: "12px",
                                  bgcolor: item.statusColor,
                                  color: item.textColor,
                                  border: `1px solid ${item.borderColor}`
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        <Box>
                          <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.87)" }}>
                            23 Jan 2025 10:11:33
                          </Typography>
                          <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.87)", mb: 1 }}>
                            00D4KaKS01A6E0KQ
                          </Typography>
                          
                          {index === 2 ? (
                            <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.87)" }}>
                              PLEASE TRANSFER ALL EMAIL CONTACTS (INCLUDING PGA EMAILS) TO VAG_TRANSFER_CSAT_EM FOR CSI TEAM TO HANDLE
                            </Typography>
                          ) : (
                            <>
                              <Typography sx={{ fontSize: "13px", fontWeight: 600, mb: 0.5 }}>
                                Case Summary
                              </Typography>
                              <Typography sx={{ fontSize: "13px", pl: 2, mb: 1 }}>
                                • pax req another relocation option as the provided alt is cheaper than the current accommodation.
                              </Typography>

                              <Typography sx={{ fontSize: "13px", fontWeight: 600, mb: 0.5 }}>
                                Action taken
                              </Typography>
                              <Box sx={{ pl: 2, mb: 1 }}>
                                <Typography sx={{ fontSize: "13px" }}>
                                  • ob ctc internal EN SST agent but at the same time, found another em from pax on ginesys
                                </Typography>
                                <Typography sx={{ fontSize: "13px" }}>
                                  • pulled em from pax from another agent (P. Piyush) 00D4KaKS01A6ENQ2
                                </Typography>
                              </Box>

                              <Box sx={{ pl: 2 }}>
                                <Box
                                  onClick={() => setExpandedOtherActions(expandedOtherActions === index ? null : index)}
                                  sx={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    cursor: "pointer",
                                    userSelect: "none"
                                  }}
                                >
                                  {expandedOtherActions === index ? (
                                    <ExpandMoreIcon sx={{ fontSize: "18px", color: "rgba(0, 0, 0, 0.87)" }} />
                                  ) : (
                                    <ChevronRightIcon sx={{ fontSize: "18px", color: "rgba(0, 0, 0, 0.87)" }} />
                                  )}
                                  <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.87)", ml: 0.25 }}>
                                    Other actions
                                  </Typography>
                                </Box>
                                {expandedOtherActions === index && (
                                  <Box sx={{ pl: 2, mt: 0.5 }}>
                                    <Typography sx={{ fontSize: "13px" }}>
                                      • Additional follow-up actions were performed
                                    </Typography>
                                    <Typography sx={{ fontSize: "13px" }}>
                                      • Escalated case to supervisor for review
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px", whiteSpace: "nowrap" }}>
                        esolis | Eunice<br/>
                        EN-IG | Agoda senior mgt | Priceline
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2, gap: 2 }}>
              <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.60)" }}>
                Rows per page: 15
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.60)" }}>
                1-14 of 14
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton size="small" disabled>
                  <ArrowUpIcon sx={{ transform: "rotate(-90deg)", fontSize: "20px" }} />
                </IconButton>
                <IconButton size="small" disabled>
                  <ArrowUpIcon sx={{ transform: "rotate(90deg)", fontSize: "20px" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          id="section-activity-log"
          sx={{
            bgcolor: "#FAFAFA",
            mb: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            mx: "16px",
          }}
        >
          <Box sx={{ p: 1.5 }}>
            <ActivityLogTable />
          </Box>
        </Box>
        </Box>
      )}
    </Paper>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
  copyable?: boolean;
  link?: string;
}

const DetailRow = ({ label, value, copyable, link }: DetailRowProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        fontSize: "14px",
        lineHeight: "20px",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          width: "144px",
          color: "rgba(0, 0, 0, 0.60)",
          fontWeight: 400,
          flexShrink: 0,
          wordWrap: "break-word",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5, flex: 1 }}>
        {link ? (
          <a
            href={link}
            style={{
              color: "#2196F3",
              textDecoration: "none",
            }}
          >
            {value}
          </a>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: "rgba(0, 0, 0, 0.87)",
              fontWeight: 400,
              wordBreak: "break-word",
            }}
          >
            {value}
          </Typography>
        )}
        {copyable && (
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              p: 0.25,
              color: "#2196F3",
              "&:hover": {
                bgcolor: "rgba(33, 150, 243, 0.08)",
              },
            }}
          >
            <CopyIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default BottomPanel;

