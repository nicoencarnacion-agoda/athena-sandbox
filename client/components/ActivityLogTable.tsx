import { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  TextField,
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
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  NorthEast as NorthEastIcon,
  SouthEast as SouthEastIcon,
  MailOutline as MailOutlineIcon,
  Person as PersonIcon,
  SentimentSatisfiedAlt as SmileyIcon,
} from "@mui/icons-material";

type ContactType = "email" | "messaging" | "voice" | "system";
type PartyTag = "Supplier" | "Customer" | "System";

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
  { label: string; bg: string; fg: string }
> = {
  email: { label: "Email", bg: "#3F51B5", fg: "#FFF" },
  messaging: { label: "Messaging", bg: "#D81B60", fg: "#FFF" },
  voice: { label: "Voice", bg: "#00695C", fg: "#FFF" },
};

// Order/content mirrors the provided screenshots (toggle OFF hides system rows).
const rowsAll: ActivityRow[] = [
  // System logs (only visible when toggled ON)
  {
    id: "s-send-refund-processed",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "18 Nov 2025 01:52 pm",
    from: { value: "auto mail", subValue: "CancelBookingConfirm - Success" },
    to: { value: "-" },
    summary: { title: "Send Refund Processed", body: "Sent Successfully" },
  },
  {
    id: "s-cc-auto-refund-refunded",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "18 Nov 2025 01:52 pm",
    from: { value: "auto payment", subValue: "1: Operation Success." },
    to: { value: "-" },
    summary: { title: "CC Auto Refund (Cxl)", body: "Refunded successfully" },
  },
  {
    id: "s-cc-auto-refund-charge-details",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "18 Nov 2025 01:52 pm",
    from: { value: "auto payment" },
    to: { value: "-" },
    summary: { title: "CC Auto Refund (Cxl)", body: "Charge Details Added" },
  },
  {
    id: "s-cancellation-ack-to-dmc",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "18 Nov 2025 01:52 pm",
    from: { value: "auto provision", subValue: "Sent by Pigeon" },
    to: { value: "-" },
    summary: {
      title: "Sending Copy of Cancellation Acknowledged to DMC",
      body: "Sent Successfully",
    },
  },
  {
    id: "s-booking-provisioning-cancellation",
    contactType: "system",
    dateReceived: "-",
    dateClosedOrSent: "18 Nov 2025 01:52 pm",
    from: { value: "auto mail", subValue: "CancelBookingConfirm - Success" },
    to: { value: "-" },
    summary: { title: "Booking Provisioning for Cancellation", body: "Confirm Cancellation" },
  },
  // Contact row (always visible) - Booking cancellation email
  {
    id: "r18",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "18 Nov 2025 01:52 pm",
    from: { value: "CUSTOMER-SERVICE@AGODA.COM", tag: "System" },
    to: { value: "lucasheil@id.uff.br", tag: "Customer" },
    summary: {
      title: "Agoda has cancelled your booking -- Booking ID: 1929586320",
      body:
        "We're sorry, your booking has been cancelled by the supplier. Dear Lucas Heil, Booking ID: 930329922 We have confirmed the cancellation of your booking at Lagune Barra Hotel Your booking has been cancelled for free. Any payment made for this booking will be refunded. Make another booking Book another room Agoda has initiated a refund to your initi...",
    },
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
        "This customer first entered their question to our chatbot, but later insisted later on talking to an agent. Please continue with usual handling on Athena - if not verified automatically, fill in the verification (no need to verify with pax as they already verified in chatbot).",
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
    to: { value: "john.jumero@hbxgroup.com", tag: "Supplier" },
    summary: {
      title: "RE: RES: RES: Agoda Booking ID 930329922 - Check in: November 15, 2025 ACCOM",
      body:
        "Dear Lagune Barra Hotel, Greetings from Agoda! Please be informed that this is a third party booking. Kindly contact the partner for further assistance regarding this booking. Regards, Zaieynab Agoda Customer Experience Group",
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
  // Page 2 (11-17 of 17) - content mirrors the provided screenshot
  {
    id: "r11",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "07 Nov 2025 06:11 am",
    from: { value: "pca", tag: "System" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Customer" },
    summary: {
      title: "Agoda Booking ID 930329922 Check in November 15, 2025",
      body:
        "Здравствуйте, Gulnur! Вас приветствует Agoda. Мы обращаемся к вам по поводу вашего бронирования № 568534855: Отель: LAGUNE BARRA HOTEL Город: Milan Страна/ регион: Italy Заезд: 15 November 2025 Выезд: 18 November 2025 Мы знаем, что вы бы хотели как можно скорее получить решение по вашему запросу, поэтому просим...",
    },
  },
  {
    id: "r12",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "06 Nov 2025 14:24 pm",
    from: { value: "CUSTOMER-SERVICE@AGODA.COM", tag: "System" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Customer" },
    summary: {
      title: "Agoda Booking ID 930329922 – RECEIPT enclosed",
      body:
        "Dear Rafael Silva, As requested, we are sending you a PDF copy of your receipt for your Agoda booking. Thank you for choosing Agoda. Best regards, Agoda Customer Experience Group\n1 attachment: Agoda_RECEIPT_enclosed.pdf",
    },
  },
  {
    id: "r13",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "06 Nov 2025 14:23 pm",
    from: { value: "auto email forward (booking.com)", tag: "System" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Customer" },
    summary: {
      title: "Are you satisfied with our Customer Service?",
      body:
        "Are you satisfied with our Customer Service? Your booking at LAGUNE BARRA HOTEL | Check-in: 15 Aug 2025 | Manage booking Booking.com Confirmation number: 6595758631 PIN code: 2900...",
    },
  },
  {
    id: "r14",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "06 Nov 2025 14:22 pm",
    from: { value: "auto email forward (booking.com)", tag: "System" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Customer" },
    summary: {
      title: "A refund for your reservation 6595758631 is ready for you to claim",
      body:
        "Hello Rafael Silva, Thank you for your reply regarding reservation 6595758631. We will be happy to refund € 10 to your credit card. To complete this transaction, please click on the following link and enter your credit card information. https://secure.booking.com/payout.html?ncid=YzQxNTJiMGMtYmUxYy00ZTQwLThjNzMtYjI5NWNJYzBmODRj Refunds usually...",
    },
  },
  {
    id: "r15",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "06 Nov 2025 14:21 pm",
    from: { value: "auto email forward (booking.com)", tag: "System" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Customer" },
    summary: {
      title: "Reservation 6595758631: Customer Service will look into your report",
      body:
        "Reservation 6595758631: Customer Service will look into your report Booking.com Confirmation: 6595758631 Hi Rafael, We've asked LAGUNE BARRA HOTEL to look into your recent experience. Unfortunately, we were not able to reach an agreement between you and the accommodation. Customer Service will now look into this issue closely and contac...",
    },
  },
  {
    id: "r16",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "06 Nov 2025 14:20 pm",
    from: { value: "ceg-automation-svc", tag: "System" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Customer" },
    summary: {
      title: "Agoda Booking ID 930329922 Check in November 15, 2025",
      body:
        "Здравствуйте, Rafael! Вас приветствует Agoda. Мы обращаемся к вам по поводу вашего бронирования № 568534855: Отель: LAGUNE BARRA HOTEL Город: Milan Страна/ регион: Italy Заезд: 15 November 2025 Выезд: 18 November 2025 Мы знаем, что вы бы хотели как можно скорее получить решение по вашему запросу, поэтому просим...",
    },
  },
  {
    id: "r17",
    contactType: "email",
    dateReceived: "-",
    dateClosedOrSent: "06 Nov 2025 11:15 am",
    from: { value: "CUSTOMER-SERVICE@AGODA.COM", tag: "System" },
    to: { value: "rafael.silva@hbxgroup.com", tag: "Customer" },
    summary: {
      title: "Booking confirmation with Agoda - Booking ID: 930329922",
      body:
        "Your booking is now confirmed! Hi Lucas Heil Figueira Carnevale, For reference, your booking ID is 930329922. To view, cancel, or modify your booking, use our easy self service. Manage My Booking Lagune Barra Hotel 4.0 stars rating out of five 6555 Avenida Salvador Allende, Rio De Janeiro, Brazil, 22783-127 Rio de Janeiro, Brasil Directions Check in Satu...\n1 attachment: Confirmation_for_Booking_ID_#_930329922.pdf",
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
  const ArrowIcon = direction === "inbound" ? SouthEastIcon : NorthEastIcon;
  return (
    <Chip
      size="small"
      icon={<ArrowIcon sx={{ fontSize: "16px" }} />}
      label={spec.label}
      sx={{
        typography: "body2",
        bgcolor: spec.bg,
        color: spec.fg,
        "& .MuiChip-label": {
          fontSize: "inherit",
          fontWeight: 400,
        },
        "& .MuiChip-icon": {
          ml: "8px",
          mr: "-4px",
          color: `${spec.fg} !important`,
        },
      }}
    />
  );
}

function PartyChip({ tag }: { tag: PartyTag }) {
  return (
    <Chip
      label={tag}
      size="small"
      sx={{
        height: 24,
        typography: "body2",
        bgcolor: "#EEEEEE",
        color: "rgba(0, 0, 0, 0.60)",
        borderRadius: "999px",
        "& .MuiChip-label": {
          fontSize: "inherit",
          fontWeight: 400,
          px: 1,
        },
      }}
    />
  );
}

function isAttachmentLine(line: string) {
  const trimmed = line.trim();
  return /^\d+\s+attachment:/.test(trimmed);
}

function hashToDigits(seed: string, digits = 16) {
  // Deterministic "fake" UCID generator (no crypto).
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const base = Math.abs(h).toString().padStart(digits, "0");
  return base.slice(0, digits);
}

function generateFakeDrawer(row: ActivityRow): ActivityRow["drawer"] | undefined {
  if (row.contactType === "system") return undefined;
  // Keep these special drawers unchanged.
  if (row.id === "r17" || row.id === "r18") return undefined;
  // Keep any explicitly hardcoded drawer content unchanged.
  if (row.drawer) return row.drawer;

  const ucid = hashToDigits(`${row.id}-${row.from.value}-${row.to.value}`, 16);
  const subject = row.summary.title?.trim() || `Message details — ${row.from.value}`;

  // For voice, we intentionally do not generate any call summary content.
  if (row.contactType === "voice") {
    return {
      kind: "email",
      fromLabel: row.from.value,
      ucid,
      subject: "Voice contact",
      body: [],
    };
  }

  const bodyIntro = [
    "Email received from the internet. If in doubt, don’t click any link nor open any attachment !",
    "",
    "Hi team,",
    "",
  ];

  const bodyFromSummary = row.summary.body
    ? [
        row.summary.body.replace(/\s+/g, " ").trim(),
        "",
        "—",
        "This is simulated drawer content for demo purposes.",
      ]
    : ["-", "", "—", "This is simulated drawer content for demo purposes."];

  const participants = [
    `From: ${row.from.value}`,
    `To: ${row.to.value}`,
    row.dateReceived !== "-" ? `Date received: ${row.dateReceived}` : undefined,
    row.dateClosedOrSent !== "-" ? `Date closed/sent: ${row.dateClosedOrSent}` : undefined,
  ].filter(Boolean) as string[];

  return {
    kind: "email",
    fromLabel: row.from.value,
    ucid,
    subject,
    body: [...bodyIntro, ...participants, "", ...bodyFromSummary],
  };
}

export default function ActivityLogTable() {
  const [showSystemLogs, setShowSystemLogs] = useState(false);
  const [page, setPage] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState(0);
  const [activeRow, setActiveRow] = useState<ActivityRow | null>(null);
  const [emailRecipient, setEmailRecipient] = useState("");
  const [resendSuccessOpen, setResendSuccessOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isBookingConfirmationPreview = activeRow?.id === "r17";
  const isBookingCancellationPreview = activeRow?.id === "r18";
  const isSpecialEmailPreview = isBookingConfirmationPreview || isBookingCancellationPreview;
  const isVoiceDrawer = activeRow?.contactType === "voice";
  const isOutbound = activeRow ? activeRow.dateReceived === "-" : false;
  const showOutboundEmailFooter =
    !isSpecialEmailPreview &&
    !isVoiceDrawer &&
    activeRow?.contactType === "email" &&
    activeRow?.drawer?.kind === "email" &&
    isOutbound;
  const specialToAddress = isBookingCancellationPreview
    ? "rafael.silva@hbxgroup.com"
    : activeRow?.to.value ?? "-";

  const pageSize = 10;

  const visibleRowsAll = useMemo(() => {
    const base = showSystemLogs ? rowsAll : rowsAll.filter((r) => r.contactType !== "system");
    return base.map((r) => ({ ...r, drawer: generateFakeDrawer(r) }));
  }, [showSystemLogs]);

  const totalRows = visibleRowsAll.length;
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  const safePage = Math.min(page, pageCount - 1);

  const visibleRows = useMemo(() => {
    const start = safePage * pageSize;
    return visibleRowsAll.slice(start, start + pageSize);
  }, [safePage, visibleRowsAll]);

  const handleOpenDrawer = (row: ActivityRow) => {
    setActiveRow(row);
    setDrawerTab(0);
    setDrawerOpen(true);
    if (row.id === "r17") setEmailRecipient(row.to.value);
    if (row.id === "r18") setEmailRecipient("rafael.silva@hbxgroup.com");
    if (row.contactType === "email" && row.id !== "r18") setEmailRecipient(row.to.value);
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
              onChange={(_, checked) => {
                setShowSystemLogs(checked);
                setPage(0);
              }}
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
            tableLayout: "fixed",
            "& td, & th": {
              borderRightWidth: 1,
              borderRightStyle: "solid",
              borderRightColor: "divider", // elevation/outlined token
              typography: "body2",
            },
            "& td:last-child, & th:last-child": { borderRight: 0 },
          }}
        >
          <colgroup>
            <col style={{ width: 150 }} />
            <col style={{ width: 180 }} />
            <col style={{ width: 240 }} />
            <col style={{ width: 240 }} />
            <col />
          </colgroup>
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
              <TableCell sx={{ fontWeight: 600, width: 150 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  Contact
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, width: 180 }}>
                Date &amp; time
              </TableCell>
              <TableCell sx={{ fontWeight: 600, width: 240 }}>
                From
              </TableCell>
              <TableCell sx={{ fontWeight: 600, width: 240 }}>
                To
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Summary</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => {
              const isInteractive =
                row.id === "r17" || row.id === "r18" || Boolean(row.drawer);
              return (
                <TableRow
                  key={row.id}
                  sx={{
                    ...(isInteractive ? { "&:hover": { bgcolor: "#FAFAFA" } } : null),
                    "&:last-child td, &:last-child th": { borderBottom: 0 },
                    cursor: isInteractive ? "pointer" : "default",
                    ...(drawerOpen && activeRow?.id === row.id
                      ? { bgcolor: "#E3F2FD" }
                      : null),
                  }}
                  onClick={isInteractive ? () => handleOpenDrawer(row) : undefined}
                >
                <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                  {row.contactType === "system" ? (
                    <Typography variant="inherit" sx={{ color: "text.secondary" }}>
                      -
                    </Typography>
                  ) : (
                    <ContactPill
                      type={row.contactType}
                      direction={
                        row.dateReceived !== "-" ? "inbound" : "outbound"
                      }
                    />
                  )}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                  {row.dateReceived !== "-" ? row.dateReceived : row.dateClosedOrSent}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                  <Typography
                    variant="inherit"
                    component="div"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    <Box component="span" sx={{ display: "block", color: "text.primary" }}>
                      {row.from.value}
                    </Box>
                    {row.from.subValue ? (
                      <Box component="span" sx={{ display: "block", color: "text.secondary" }}>
                        {row.from.subValue}
                      </Box>
                    ) : null}
                  </Typography>
                  {row.from.tag ? (
                    <Box sx={{ mt: 0.75 }}>
                      <PartyChip tag={row.from.tag} />
                    </Box>
                  ) : null}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                  <Typography
                    variant="inherit"
                    component="div"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    <Box component="span" sx={{ display: "block", color: "text.primary" }}>
                      {row.to.value}
                    </Box>
                    {row.to.subValue ? (
                      <Box component="span" sx={{ display: "block", color: "text.secondary" }}>
                        {row.to.subValue}
                      </Box>
                    ) : null}
                  </Typography>
                  {row.to.tag ? (
                    <Box sx={{ mt: 0.75 }}>
                      <PartyChip tag={row.to.tag} />
                    </Box>
                  ) : null}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                  {row.summary.title ? (
                    <Typography variant="inherit" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {row.summary.title}
                    </Typography>
                  ) : null}
                  <Typography
                    variant="inherit"
                    component="div"
                    sx={{
                      color: "text.primary",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {row.summary.body.split("\n").map((line, idx) => (
                      <Box
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${row.id}-summary-line-${idx}`}
                        component="span"
                        sx={{
                          display: "block",
                          color: isAttachmentLine(line) ? "text.secondary" : "text.primary",
                        }}
                      >
                        {line === "" ? "\u00A0" : line}
                      </Box>
                    ))}
                  </Typography>
                </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 1.5, gap: 2 }}>
        <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
          {totalRows === 0
            ? "0-0 of 0"
            : `${safePage * pageSize + 1}-${Math.min(
                (safePage + 1) * pageSize,
                totalRows,
              )} of ${totalRows}`}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            <ChevronLeftIcon sx={{ fontSize: "18px" }} />
          </IconButton>
          <IconButton
            size="small"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          >
            <ChevronRightIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setResendSuccessOpen(false);
        }}
        hideBackdrop
        ModalProps={{
          disableScrollLock: true,
          disablePortal: true,
          keepMounted: true,
          container: containerRef.current,
          disableEnforceFocus: true,
          disableAutoFocus: true,
          disableRestoreFocus: true,
          sx: { pointerEvents: "none" },
        }}
        PaperProps={{
          sx: {
            width: 560,
            maxWidth: "90vw",
            position: "absolute",
            top: 0,
            bottom: 0,
            pointerEvents: "auto",
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
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              position: "sticky",
              top: 0,
              zIndex: 2,
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderBottomColor: "divider",
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.2 }}>
                {isSpecialEmailPreview
                  ? `To: ${specialToAddress}`
                  : activeRow?.contactType === "email" && activeRow?.drawer?.kind === "email"
                    ? isOutbound
                      ? `To: ${activeRow?.to.value ?? "-"}`
                      : `From: ${activeRow?.from.value ?? "-"}`
                  : activeRow?.drawer?.kind === "conversation"
                    ? `${activeRow?.drawer?.fromLabel ?? activeRow?.from.value ?? "-"}`
                    : `From: ${activeRow?.drawer?.fromLabel ?? activeRow?.from.value ?? "-"}`}
              </Typography>
              {isSpecialEmailPreview ? null : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                    UCID:
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    endIcon={<CopyIcon sx={{ fontSize: "16px" }} />}
                    onClick={() => {
                      const ucid = activeRow?.drawer?.ucid;
                      if (ucid) navigator.clipboard.writeText(ucid);
                    }}
                    sx={{
                      p: 0,
                      minWidth: 0,
                      textTransform: "none",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: 1.2,
                      "& .MuiButton-endIcon": { ml: 0.5 },
                    }}
                  >
                    {activeRow?.drawer?.ucid ?? "-"}
                  </Button>
                </Box>
              )}
            </Box>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {isSpecialEmailPreview || isVoiceDrawer ? null : (
            <>
              {/* Drawer tabs */}
              <Tabs
                value={drawerTab}
                onChange={(_, v) => setDrawerTab(v)}
                variant="fullWidth"
                sx={{
                  px: 2.5,
                  minHeight: 44,
                  "& .MuiTabs-indicator": { bgcolor: "primary.main", height: 2 },
                  "& .MuiTab-root": {
                    flex: 1,
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
                />
              </Tabs>
              <Divider />
            </>
          )}

          {/* Drawer content */}
          {isSpecialEmailPreview ? (
            <>
              <Box
                sx={{
                  px: 2.5,
                  pt: 2,
                  pb: 2.5,
                  overflow: "auto",
                  flex: 1,
                  bgcolor: "grey.50",
                }}
              >
                <Paper variant="outlined" sx={{ borderColor: "divider", borderRadius: "8px" }}>
                  <Box sx={{ p: 2 }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 0.5 }}>
                      {isBookingCancellationPreview
                        ? "Agoda has cancelled your booking -- Booking ID: 930329922"
                        : "Booking confirmation with Agoda - Booking ID: 930329922"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                        Attachments:
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          p: 0,
                          minWidth: 0,
                          textTransform: "none",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: 1.2,
                          textDecoration: "underline",
                          "&:hover": { textDecoration: "underline", bgcolor: "transparent" },
                        }}
                      >
                        Confirmation_for_Booking_ID_#_930329922.pdf
                      </Button>
                    </Box>
                  </Box>
                  <Divider />

                  {/* "PDF" preview content */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "#EAF2FF",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "8px",
                        p: 2,
                      }}
                    >
                      <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#7A7A7A" }}>
                          agoda
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, mt: 0.5 }}>
                          {["#E53935", "#FB8C00", "#FDD835", "#43A047", "#1E88E5"].map((c) => (
                            <Box
                              key={c}
                              sx={{ width: 8, height: 8, borderRadius: "999px", bgcolor: c }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Paper
                        elevation={0}
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: "8px",
                          overflow: "hidden",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            height: 6,
                            bgcolor: isBookingCancellationPreview ? "#263238" : "#1B5E20",
                          }}
                        />
                        <Box sx={{ p: 3 }}>
                          {isBookingCancellationPreview ? (
                            <>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 700,
                                  color: "rgba(0, 0, 0, 0.87)",
                                  textAlign: "center",
                                  mb: 1.5,
                                }}
                              >
                                We&apos;re sorry, your booking has been cancelled by the supplier.
                              </Typography>
                              <Typography sx={{ fontSize: "13px", textAlign: "center", mb: 2 }}>
                                Hi Lucas Heil Figueira Carnevale,
                                <br />
                                Your booking has been cancelled for free. Any payment made for this
                                booking will be refunded.
                              </Typography>
                              <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
                                <Button
                                  variant="contained"
                                  disableElevation
                                  sx={{
                                    textTransform: "none",
                                    borderRadius: "999px",
                                    px: 3,
                                  }}
                                >
                                  Make another booking
                                </Button>
                                <Button
                                  variant="outlined"
                                  sx={{
                                    textTransform: "none",
                                    borderRadius: "999px",
                                    px: 3,
                                  }}
                                >
                                  Book another room
                                </Button>
                              </Box>
                            </>
                          ) : (
                            <>
                              <Typography
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 700,
                                  color: "#1B5E20",
                                  textAlign: "center",
                                  mb: 1,
                                }}
                              >
                                Your booking is now confirmed!
                              </Typography>
                              <Typography sx={{ fontSize: "13px", textAlign: "center", mb: 2 }}>
                                Hi Lucas Heil Figueira Carnevale,
                                <br />
                                For reference, your booking ID is 930329922. To view, cancel, or
                                modify your booking, use our easy self service.
                              </Typography>
                              <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                  variant="contained"
                                  disableElevation
                                  sx={{
                                    textTransform: "none",
                                    borderRadius: "999px",
                                    px: 4,
                                  }}
                                >
                                  Manage my booking
                                </Button>
                              </Box>
                            </>
                          )}
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: "8px",
                          p: 2.5,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                            Lagune Barra Hotel
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "#FB8C00" }}>★★★★☆</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              width: 140,
                              height: 56,
                              borderRadius: "6px",
                              bgcolor: "grey.100",
                              border: "1px solid",
                              borderColor: "divider",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "rgba(0, 0, 0, 0.60)",
                              fontSize: "12px",
                            }}
                          >
                            property image
                          </Box>

                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.87)", mb: 0.5 }}>
                              6555 Avenida Salvador Allende, Rio De Janeiro, Brazil, 22783-127
                            </Typography>
                            <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                              Rio de Janeiro, Brasil
                            </Typography>
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                p: 0,
                                mt: 0.5,
                                minWidth: 0,
                                textTransform: "none",
                                fontSize: "12px",
                                textDecoration: "underline",
                                "&:hover": { textDecoration: "underline", bgcolor: "transparent" },
                              }}
                            >
                              Directions
                            </Button>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "stretch",
                            gap: 2,
                            py: 1.5,
                            borderTop: "1px solid",
                            borderTopColor: "divider",
                            borderBottom: "1px solid",
                            borderBottomColor: "divider",
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: "11px", color: "rgba(0, 0, 0, 0.60)" }}>
                              Check in
                            </Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                              Saturday November 15, 2025
                              <br />
                              <span style={{ fontWeight: 400 }}>(after 3:00 PM)</span>
                            </Typography>
                          </Box>
                          <Divider orientation="vertical" flexItem />
                          <Box sx={{ flex: 1, textAlign: "right" }}>
                            <Typography sx={{ fontSize: "11px", color: "rgba(0, 0, 0, 0.60)" }}>
                              Check out
                            </Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                              Sunday November 16, 2025
                              <br />
                              <span style={{ fontWeight: 400 }}>(before 12:00 PM)</span>
                            </Typography>
                          </Box>
                        </Box>

                        <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)", mt: 1.5 }}>
                          You can also easily find out about property policies and amenities in{" "}
                          <Button
                            variant="text"
                            size="small"
                            sx={{
                              p: 0,
                              minWidth: 0,
                              textTransform: "none",
                              fontSize: "12px",
                              textDecoration: "underline",
                              "&:hover": { textDecoration: "underline", bgcolor: "transparent" },
                            }}
                          >
                            Manage my booking
                          </Button>
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography sx={{ fontSize: "13px", fontWeight: 700, mb: 1 }}>
                          Contact property
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)", mb: 1 }}>
                          For any questions related to the property, please contact them directly.
                        </Typography>
                        <Box
                          sx={{
                            border: "1px solid",
                            borderColor: "primary.main",
                            borderRadius: "8px",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <MailOutlineIcon sx={{ fontSize: 18, color: "primary.main" }} />
                          <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "primary.main" }}>
                            reservas@lagunebarrahotel.com.br
                          </Typography>
                        </Box>
                      </Paper>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              {/* Footer (recipient + resend) */}
              <Box
                sx={{
                  position: "sticky",
                  bottom: 0,
                  zIndex: 2,
                  bgcolor: "background.paper",
                  borderTop: "1px solid",
                  borderTopColor: "divider",
                  px: 2.5,
                  py: 1.5,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  gap: 2,
                  boxShadow: "0 -1px 0 rgba(0, 0, 0, 0.08)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                  <TextField
                    label="Email recipient"
                    size="small"
                    variant="outlined"
                    value={emailRecipient || (isBookingCancellationPreview ? specialToAddress : activeRow?.to.value) || ""}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 320 }}
                  />
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{ textTransform: "none" }}
                    onClick={() => setResendSuccessOpen(true)}
                  >
                    Resend
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ p: 2.5, overflow: "auto", flex: 1, bgcolor: "grey.50" }}>
              {isVoiceDrawer ? (
                <Paper variant="outlined" sx={{ borderColor: "divider", borderRadius: "8px", p: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                        Disposition code:
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "text.primary" }}>-</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                        Skillset:
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "text.primary" }}>EN</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                        Category:
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "text.primary" }}>-</Typography>
                    </Box>
                  </Box>
                </Paper>
              ) : drawerTab === 0 ? (
                <Paper
                  variant="outlined"
                  sx={{ borderColor: "divider", borderRadius: "4px", p: 2 }}
                >
                  {activeRow?.drawer?.kind === "conversation" ? (
                    <>
                      {/* Collapsed / expanded conversation headers */}
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, mb: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                          }}
                        >
                          <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                            06 Nov 2025, 04:38 pm | Swenka Shourya, VIVR
                          </Typography>
                          <KeyboardArrowDownIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                          }}
                        >
                          <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                            10 Nov 2025, 06:04 pm | Kadimbung Kamson, VIVR
                          </Typography>
                          <KeyboardArrowUpIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                          mb: 1.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                          Conversation ID:
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
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

                      {/* Chat transcript */}
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {[0, 1].map((n) => (
                          <Box key={n} sx={{ alignSelf: "flex-end", maxWidth: 420 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: 1,
                                mb: 0.5,
                              }}
                            >
                              <Typography sx={{ fontSize: "11px", color: "rgba(0, 0, 0, 0.54)" }}>
                                VIVR 11/6/2025, 4:38:43 PM
                              </Typography>
                              <SmileyIcon sx={{ fontSize: 14, color: "#FBC02D" }} />
                            </Box>

                            <Box
                              sx={{
                                bgcolor: "#EEF0F2",
                                borderRadius: "10px",
                                p: 2,
                                whiteSpace: "pre-wrap",
                                fontSize: "12px",
                                color: "rgba(0, 0, 0, 0.87)",
                              }}
                            >
                              {activeRow.drawer.body.join("\n")}
                            </Box>
                          </Box>
                        ))}

                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, maxWidth: 460 }}>
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "999px",
                              bgcolor: "#EDE7F6",
                              color: "#5E35B1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: "0 0 auto",
                            }}
                          >
                            <PersonIcon sx={{ fontSize: 18 }} />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: "11px", color: "rgba(0, 0, 0, 0.54)", mb: 0.25 }}>
                              Lucas Heil Figueira Carnevale 10/09 8:59 pm
                            </Typography>
                            <Box
                              sx={{
                                bgcolor: "#EEF0F2",
                                borderRadius: "10px",
                                p: 2,
                                fontSize: "12px",
                                color: "rgba(0, 0, 0, 0.87)",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              In order to keep your log-in status, do not edit or share this message.
                              Please press send to continue:{" "}
                              {"MB_BJL: NWJkNGY5YTEtMTQ2Ny00ZTYyLTg3OTUtZWZhMGZkMjRkNmJh"}
                            </Box>
                          </Box>
                        </Box>
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
                <Paper variant="outlined" sx={{ borderColor: "divider", borderRadius: "8px", p: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                        Disposition code:
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "text.primary" }}>-</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                        Skillset:
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "text.primary" }}>EN</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                        Category:
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "text.primary" }}>-</Typography>
                    </Box>
                  </Box>
                </Paper>
              )}
              </Box>

              {showOutboundEmailFooter ? (
                <Box
                  sx={{
                    position: "sticky",
                    bottom: 0,
                    zIndex: 2,
                    bgcolor: "background.paper",
                    borderTop: "1px solid",
                    borderTopColor: "divider",
                    px: 2.5,
                    py: 1.5,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    gap: 2,
                    boxShadow: "0 -1px 0 rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                    <TextField
                      label="Email recipient"
                      size="small"
                      variant="outlined"
                      value={emailRecipient || activeRow?.to.value || ""}
                      onChange={(e) => setEmailRecipient(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: 320 }}
                    />
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{ textTransform: "none" }}
                      onClick={() => setResendSuccessOpen(true)}
                    >
                      Resend
                    </Button>
                  </Box>
                </Box>
              ) : null}
            </>
          )}
        </Box>
      </Drawer>

      <Dialog
        open={resendSuccessOpen}
        onClose={() => setResendSuccessOpen(false)}
        aria-labelledby="resend-success-title"
      >
        <DialogTitle
          id="resend-success-title"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            pr: 6,
          }}
        >
          Done
          <IconButton
            onClick={() => setResendSuccessOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "rgba(0, 0, 0, 0.54)" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.87)" }}>
            Email has been sent successfully.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="text"
            onClick={() => setResendSuccessOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

