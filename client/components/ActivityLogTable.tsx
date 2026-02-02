import { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Switch,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  EmailOutlined as EmailIcon,
  ForumOutlined as MessagingIcon,
  PhoneOutlined as VoiceIcon,
  FormatListBulleted as ActivityListIcon,
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  DescriptionOutlined as DetailsIcon,
  ForumOutlined as ConversationIcon,
  NorthWest as NorthWestIcon,
  SouthEast as SouthEastIcon,
} from "@mui/icons-material";

type ContactType = "email" | "messaging" | "voice" | "system";
type PartyTag = "Supplier" | "Customer";

type ActivityRow = {
  id: string;
  contactType: ContactType;
  dateReceived: string;
  dateClosedOrSent: string;
  from: { value: string; subValue?: string; tag?: PartyTag };
  to: { value: string; subValue?: string; tag?: PartyTag };
  summary: {
    title: string;
    body: string;
    linkLabel?: string;
  };
  drawer?: {
    kind: "email" | "conversation";
    fromLabel: string;
    ucid: string;
    subject: string;
    body: string[];
  };
};

const CONTACT_PILL: Record<
  Exclude<ContactType, "system">,
  { label: string; bg: string; fg: string; Icon: React.ElementType }
> = {
  email: { label: "Email", bg: "#3F51B5", fg: "#FFF", Icon: EmailIcon },
  messaging: { label: "Messaging", bg: "#D81B60", fg: "#FFF", Icon: MessagingIcon },
  voice: { label: "Voice", bg: "#00695C", fg: "#FFF", Icon: VoiceIcon },
};

// Order/content mirrors the provided screenshots (toggle OFF hides system rows).
const rowsAll: ActivityRow[] = [
  // System logs (only visible when toggled ON)
  {
    id: "s-booking-departure",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "17 Nov 2025 01:52 pm",
    from: { value: "departure agent", subValue: "ChangeBookingState to 505" },
    to: { value: "-" },
    summary: { title: "Booking Completed (pending departure)", body: "Departed" },
  },
  {
    id: "r1",
    contactType: "email",
    dateReceived: "12 Nov 2025 07:33 pm",
    dateClosedOrSent: "12 Nov 2025 07:53 pm",
    from: { value: "ab_service@bingtrip.com", tag: "Supplier" },
    to: { value: "Hanisa Tasha Binti Hosney | thosney | Accom - MY | CSS Agent | KUL" },
    summary: {
      title:
        "回复：Agoda Booking ID 930329922/ Bingtrip8251106060409922- Hotel Country:Brazil Check in Date: November...",
      body:
        "Hotel lady ala informed that the order has been confirmed normally. Hotel confirmation number: RES000101-19802 -----The following replies in Chinese are for bingtrip internal employees only for follow-up records------- Best Regard,...",
      linkLabel: "View email",
    },
    drawer: {
      kind: "email",
      fromLabel: "ab_service@bingtrip.com",
      ucid: "0004KaMM0G6ED35A",
      subject:
        "回复：Agoda Booking ID 930329922/ Bingtrip8251106060409922- Hotel Country:Brazil Check in Date: November 15, 2025",
      body: [
        "Email received from the internet. If in doubt, don’t click any link nor open any attachment !",
        "",
        "Hotel lady ala informed that the order has been confirmed normally. Hotel confirmation number: RES000101-19802",
        "",
        "------The following replies in Chinese are for bingtrip internal employees only for follow-up records------",
        "",
        "Best Regards,",
        "Bingtrip Customer Service Team",
        "",
        "If you have any further question on this reservation, please get back to us via email and we will get back to you as soon as possible.",
      ],
    },
  },
  {
    id: "r2",
    contactType: "email",
    dateReceived: "10 Nov 2025 06:06 pm",
    dateClosedOrSent: "-",
    from: { value: "lucasheil@id.uff.br", tag: "Customer" },
    to: { value: "Pamela Periera | pperiera | Accom - PT | CSS Agent | CAI" },
    summary: {
      title:
        "Re: RESERVA NÃO LOCALIZADA | LAGUNE BARRA HOTEL Key: [def01] L:PT GPTS A:3IU5 PC07 [rogu02] S:1705 S ...",
      body:
        "Bom dia! [1] I have contacted our partner, and they have provided the hotel confirmation number 2328694168. Please inform the hotel that the booking is from Expedia and not Agoda.please check with the hotel and let us know...",
      linkLabel: "View email",
    },
  },
  {
    id: "s-avaya-ivr",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "09 Nov 2025 09:43 pm",
    from: { value: "avaya ivr", subValue: "S2A Other Q | UCID:MBJEa1231239AnP..." },
    to: { value: "-" },
    summary: { title: "Booking Completed (pending departure)", body: "Pax IVRs S2A General1" },
  },
  {
    id: "r3",
    contactType: "messaging",
    dateReceived: "10 Nov 2025 06:06 pm",
    dateClosedOrSent: "-",
    from: { value: "Lucas Heil Figueira Carnevale (Brazil)", tag: "Customer" },
    to: { value: "Kadimbung Kamson | kkamson | Accom - EN | CSS Agent | PNQ" },
    summary: {
      title: "",
      body:
        "This customer first entered their question to our chatbot, but later insisted later on talking to an agent. Please continue with usual handling on Athena - if not verified automatically, fill in the verification (no need to verify with pa...",
      linkLabel: "View conversation",
    },
    drawer: {
      kind: "conversation",
      fromLabel: "Lucas Heil Figueira Carnevale (Brazil)",
      ucid: "880212175701142856",
      subject: "eddd-898998919-assd-wd090909-01",
      body: [
        "##WELCOME##",
        "------------------------------------------------------------",
        "//q-xx.bstatic.com/xdata/images/hotel/max500/356339992.jpg?",
        "k=00e40cb64bed878b0d83e64e1d7d72939d566289fa5",
        "16be7a549e1dd1c7fa5ce&0= | Lagune Barra Hotel | Rio De Janeiro | Brazil | November 15, 2025 - November 16, 2025 | Booking ID: 930329922 | Paid | Success | Booking details",
        "| PPL:/lagune-barra-hotel/hotel/all/rio-de-janeiro-br.html",
        "",
        "Please select or type in your exact request.",
      ],
    },
  },
  {
    id: "s-cc-auto-charge",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "09 Nov 2025 09:56 pm",
    from: { value: "auto payment", subValue: "1: Operation Success." },
    to: { value: "-" },
    summary: { title: "CC Auto Charge", body: "Charged successfully" },
  },
  {
    id: "s-wait-full-charge",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "09 Nov 2025 09:56 pm",
    from: { value: "auto payment", subValue: "1: Operation Success." },
    to: { value: "-" },
    summary: { title: "Wait for Full Charge (Delay Settlement)", body: "Reached Payment Due Date" },
  },
  {
    id: "r4",
    contactType: "voice",
    dateReceived: "09 Nov 2025 09:44 pm",
    dateClosedOrSent: "09 Nov 2025 09:59 pm",
    from: { value: "Lucas Heil Figueira Carnevale (Brazil)", tag: "Customer" },
    to: { value: "Nicole doamaral | ndoamaral | Accom - PT | CSS Agent | CAI" },
    summary: { title: "", body: "-", linkLabel: undefined },
  },
  {
    id: "r5",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "8 Nov 2025 11:53 am",
    from: { value: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Supplier" },
    summary: {
      title: "RE: RES: RES: Agoda Booking ID 930329922 - Check in: November 15, 2025 ACCOM",
      body:
        "Dear Lagune Barra Hotel, Greetings from Agoda! Please be informed that this is a third party booking. Kindly contact the partner for further assistance regarding this booking. Regards, Zaieynab Agoda Customer Experience Group",
      linkLabel: "View conversation",
    },
  },
  {
    id: "s-payment-details",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "08 Nov 2025 04:46 am",
    from: { value: "-" },
    to: { value: "-" },
    summary: { title: "Payment Details", body: "Retrieve Payment Details Skipped" },
  },
  {
    id: "r6",
    contactType: "email",
    dateReceived: "08 Nov 2025 04:20 am",
    dateClosedOrSent: "08 Nov 2025 11:55 am",
    from: { value: "rafael.silva@hbxgroup.com", tag: "Supplier" },
    to: { value: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL" },
    summary: {
      title:
        "RES: RES: Agoda Booking ID 930329922 - Check in: November 15, 2025 ACCOM Key: WL_1; S:22820 L:PT HCBR G...",
      body:
        "Boa noite, Ana! Tudo bem? Busquei em nosso sistema todas as reservas (confirmadas ou não, com check in para o dia 15/11/2025 e não localizei nada com este nome. Segue abaixo a lista.",
      linkLabel: "View conversation",
    },
  },
  {
    id: "r7",
    contactType: "voice",
    dateReceived: "07 Nov 2025 07:27 pm",
    dateClosedOrSent: "07 Nov 2025 07:38 pm",
    from: { value: "Lucas Heil Figueira Carnevale (Brazil)", tag: "Customer" },
    to: { value: "Hussein Hafez | hhafez | Accom - PT | CSS Agent | CAI" },
    summary: { title: "", body: "-", linkLabel: undefined },
  },
  {
    id: "r8",
    contactType: "email",
    dateReceived: "07 Nov 2025 06:12 am",
    dateClosedOrSent: "07 Nov 2025 06:17 am",
    from: { value: "reservas@lagunebarrahotel.com.br", tag: "Supplier" },
    to: { value: "Hussein Hafez | hhafez | Accom - PT | CSS Agent | CAI" },
    summary: {
      title:
        "RES: RES: Agoda Booking ID 930329922 - Check in: November 15, 2025 ACCOM Key: WL_1; S:22880 L:PT HCBR G...",
      body:
        "Olá, Lucas Heil Figueira Carnevale, Cumprimentos da Agoda! Com referência à sua reserva de n.º 930329922 confirme detalhado abaixo: Hotel: Lagune Barra Hotel Cidade/País ou Região: Rio De Janeiro/Brazil Chegada: Nove...",
      linkLabel: "View conversation",
    },
  },
  {
    id: "r9",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "7 Nov 2025 06:17 am",
    from: { value: "Aarvi Patil | aapatil | Accom - EN | CSS Agent | PNQ" },
    to: { value: "lucasheil@id.uff.br", tag: "Customer" },
    summary: {
      title: "Agoda Booking ID 930329922 Check in November 15, 2025",
      body:
        "Dear Lucas Heil Figueira Carnevale, Greetings from Agoda! With reference to your booking ID 930329922 as detailed below: Hotel: Lagune Barra Hotel City/Country or Region: Rio De Janeiro/Brazil Arrival: November 15, 2025 Departur...",
      linkLabel: undefined,
    },
  },
  {
    id: "r10",
    contactType: "email",
    dateReceived: "07 Nov 2025 06:12 am",
    dateClosedOrSent: "07 Nov 2025 06:17 am",
    from: { value: "ab_service@bingtrip.com", tag: "Supplier" },
    to: { value: "Aarvi Patil | aapatil | Accom - EN | CSS Agent | PNQ" },
    summary: {
      title:
        "回复：Agoda Booking ID 930329922/ Bingtrip8251106060409922- Hotel Country:Brazil Check in Date: November...",
      body:
        "We will send you the new confirmation number as soon as possible. Since this order is still more than 7 days away from the check-in date, please do not change the order status before we reply to you -------The following replies in Ch...",
      linkLabel: undefined,
    },
  },
];

function ContactPill({
  type,
  direction,
}: {
  type: ContactType;
  direction: "inbound" | "outbound";
}) {
  if (type === "system") return null;
  const spec = CONTACT_PILL[type];
  const ArrowIcon = direction === "inbound" ? SouthEastIcon : NorthWestIcon;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        borderRadius: "999px",
        bgcolor: spec.bg,
        color: spec.fg,
        fontSize: "12px",
        fontWeight: 600,
        lineHeight: "16px",
      }}
    >
      <ArrowIcon sx={{ fontSize: "16px", color: spec.fg }} />
      {spec.label}
    </Box>
  );
}

function PartyChip({ tag }: { tag: PartyTag }) {
  return (
    <Chip
      label={tag}
      size="small"
      sx={{
        height: 20,
        fontSize: "11px",
        bgcolor: "#EEEEEE",
        color: "rgba(0, 0, 0, 0.60)",
        borderRadius: "999px",
      }}
    />
  );
}

export default function ActivityLogTable() {
  const [showSystemLogs, setShowSystemLogs] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState(0);
  const [activeRow, setActiveRow] = useState<ActivityRow | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const visibleRows = useMemo(() => {
    if (showSystemLogs) return rowsAll;
    return rowsAll.filter((r) => r.contactType !== "system");
  }, [showSystemLogs]);

  const handleOpenDrawer = (row: ActivityRow) => {
    setActiveRow(row);
    setDrawerTab(0);
    setDrawerOpen(true);
  };

  return (
    <Box ref={containerRef}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ActivityListIcon sx={{ fontSize: "18px", color: "rgba(0, 0, 0, 0.54)" }} />
            <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500 }}>
              Activity log
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Switch
              checked={showSystemLogs}
              onChange={(_, checked) => setShowSystemLogs(checked)}
            />
            <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.87)" }}>
              Show system logs
            </Typography>
          </Box>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderColor: "#E0E0E0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <Table
          size="small"
          sx={{
            "& td, & th": {
              borderRightWidth: 1,
              borderRightStyle: "solid",
              borderRightColor: "divider", // elevation/outlined token
            },
            "& td:last-child, & th:last-child": { borderRight: 0 },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#EEF1F3",
                "& > th": {
                  borderRightWidth: 1,
                  borderRightStyle: "solid",
                  borderRightColor: "divider", // elevation/outlined token
                },
                "& > th:last-of-type": { borderRight: 0 },
              }}
            >
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", width: 120 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  Contact
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", width: 180 }}>
                Date received
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", width: 180 }}>
                Date closed or sent
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", width: 240 }}>
                From
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", width: 240 }}>
                To
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>Summary</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": { bgcolor: "#FAFAFA" },
                  "&:last-child td, &:last-child th": { borderBottom: 0 },
                }}
              >
                <TableCell sx={{ fontSize: "13px", verticalAlign: "top", py: 2 }}>
                  {row.contactType === "system" ? (
                    <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.60)" }}>
                      -
                    </Typography>
                  ) : (
                    <ContactPill
                      type={row.contactType}
                      direction={
                        row.dateReceived !== "-" && row.dateClosedOrSent !== "-"
                          ? "inbound"
                          : "outbound"
                      }
                    />
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: "13px", verticalAlign: "top", py: 2 }}>
                  {row.dateReceived}
                </TableCell>
                <TableCell sx={{ fontSize: "13px", verticalAlign: "top", py: 2 }}>
                  {row.dateClosedOrSent}
                </TableCell>
                <TableCell sx={{ fontSize: "13px", verticalAlign: "top", py: 2 }}>
                  <Typography sx={{ fontSize: "13px" }}>{row.from.value}</Typography>
                  {row.from.subValue ? (
                    <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                      {row.from.subValue}
                    </Typography>
                  ) : null}
                  {row.from.tag ? (
                    <Box sx={{ mt: 0.75 }}>
                      <PartyChip tag={row.from.tag} />
                    </Box>
                  ) : null}
                </TableCell>
                <TableCell sx={{ fontSize: "13px", verticalAlign: "top", py: 2 }}>
                  <Typography sx={{ fontSize: "13px" }}>{row.to.value}</Typography>
                  {row.to.subValue ? (
                    <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                      {row.to.subValue}
                    </Typography>
                  ) : null}
                  {row.to.tag ? (
                    <Box sx={{ mt: 0.75 }}>
                      <PartyChip tag={row.to.tag} />
                    </Box>
                  ) : null}
                </TableCell>
                <TableCell sx={{ fontSize: "13px", verticalAlign: "top", py: 2 }}>
                  {row.summary.title ? (
                    <Typography sx={{ fontSize: "12px", fontWeight: 600, mb: 0.5 }}>
                      {row.summary.title}
                    </Typography>
                  ) : null}
                  <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.87)" }}>
                    {row.summary.body}
                  </Typography>
                  {row.summary.linkLabel ? (
                    <Box sx={{ mt: 1 }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleOpenDrawer(row)}
                        endIcon={<ChevronRightIcon sx={{ fontSize: "16px" }} />}
                        sx={{
                          textTransform: "none",
                          fontSize: "12px",
                          minWidth: 0,
                          px: 0,
                          py: 0,
                          lineHeight: "16px",
                        }}
                      >
                        {row.summary.linkLabel}
                      </Button>
                    </Box>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 1.5, gap: 2 }}>
        <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
          1-10 of 28
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton size="small" disabled>
            <ChevronLeftIcon sx={{ fontSize: "18px" }} />
          </IconButton>
          <IconButton size="small">
            <ChevronRightIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        hideBackdrop
        ModalProps={{
          disableScrollLock: true,
          disablePortal: true,
          keepMounted: true,
          container: containerRef.current,
        }}
        PaperProps={{
          sx: {
            width: 560,
            maxWidth: "90vw",
            position: "absolute",
            top: 0,
            bottom: 0,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Drawer header */}
          <Box
            sx={{
              px: 2.5,
              py: 2,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                From: {activeRow?.drawer?.fromLabel ?? activeRow?.from.value ?? "-"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                  UCID:
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "primary.main" }}>
                  {activeRow?.drawer?.ucid ?? "-"}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    const ucid = activeRow?.drawer?.ucid;
                    if (ucid) navigator.clipboard.writeText(ucid);
                  }}
                  sx={{ p: 0.25, color: "rgba(0, 0, 0, 0.54)" }}
                >
                  <CopyIcon sx={{ fontSize: "16px" }} />
                </IconButton>
              </Box>
            </Box>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drawer tabs */}
          <Tabs
            value={drawerTab}
            onChange={(_, v) => setDrawerTab(v)}
            sx={{
              px: 2.5,
              minHeight: 44,
              "& .MuiTabs-indicator": { bgcolor: "primary.main", height: 2 },
              "& .MuiTab-root": {
                minHeight: 44,
                textTransform: "none",
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(0, 0, 0, 0.60)",
                "&.Mui-selected": { color: "primary.main" },
              },
            }}
          >
            {activeRow?.drawer?.kind === "conversation" ? (
              <Tab
                icon={<ConversationIcon sx={{ fontSize: "18px" }} />}
                iconPosition="start"
                label="Conversation"
              />
            ) : (
              <Tab
                icon={<EmailIcon sx={{ fontSize: "18px" }} />}
                iconPosition="start"
                label="Email"
              />
            )}
            <Tab
              icon={<DetailsIcon sx={{ fontSize: "18px" }} />}
              iconPosition="start"
              label="Details"
              sx={{ ml: "auto" }}
            />
          </Tabs>
          <Divider />

          {/* Drawer content */}
          <Box sx={{ p: 2.5, overflow: "auto", flex: 1 }}>
            {drawerTab === 0 ? (
              <Paper
                variant="outlined"
                sx={{ borderColor: "divider", borderRadius: "4px", p: 2 }}
              >
                {activeRow?.drawer?.kind === "conversation" ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 1.5,
                      }}
                    >
                      <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                        Conversation ID:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "primary.main",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 360,
                          }}
                        >
                          {activeRow.drawer.subject}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => navigator.clipboard.writeText(activeRow.drawer!.subject)}
                          sx={{ p: 0.25, color: "rgba(0, 0, 0, 0.54)" }}
                        >
                          <CopyIcon sx={{ fontSize: "16px" }} />
                        </IconButton>
                      </Box>
                    </Box>
                    <Divider sx={{ mb: 1.5 }} />

                    <Box
                      sx={{
                        bgcolor: "#EEF3FB",
                        borderRadius: "8px",
                        p: 2,
                      }}
                    >
                      {activeRow.drawer.body.map((line, idx) => (
                        <Typography
                          key={`${idx}-${line}`}
                          sx={{
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.87)",
                            lineHeight: "18px",
                            whiteSpace: "pre-wrap",
                            mb: line === "" ? 1 : 0.5,
                          }}
                        >
                          {line === "" ? "\u00A0" : line}
                        </Typography>
                      ))}
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>
                      {activeRow?.drawer?.subject ?? activeRow?.summary.title ?? "-"}
                    </Typography>
                    <Divider sx={{ mb: 1.5 }} />

                    {activeRow?.drawer?.body?.length ? (
                      <>
                        {/* First line is the safety warning in screenshot */}
                        <Box
                          sx={{
                            border: "1px dotted",
                            borderColor: "#FB8C00",
                            bgcolor: "#FFF3E0",
                            color: "rgba(0, 0, 0, 0.87)",
                            px: 1.5,
                            py: 1,
                            fontSize: "12px",
                            mb: 2,
                          }}
                        >
                          {activeRow.drawer.body[0]}
                        </Box>
                        {activeRow.drawer.body.slice(1).map((line, idx) => (
                          <Typography
                            key={`${idx}-${line}`}
                            sx={{
                              fontSize: "13px",
                              color: "rgba(0, 0, 0, 0.87)",
                              lineHeight: "20px",
                              whiteSpace: "pre-wrap",
                              mb: line === "" ? 1 : 0.75,
                            }}
                          >
                            {line === "" ? "\u00A0" : line}
                          </Typography>
                        ))}
                      </>
                    ) : (
                      <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.87)" }}>
                        {activeRow?.summary.body ?? "-"}
                      </Typography>
                    )}
                  </>
                )}
              </Paper>
            ) : (
              <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.60)" }}>
                Details view (mock)
              </Typography>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

