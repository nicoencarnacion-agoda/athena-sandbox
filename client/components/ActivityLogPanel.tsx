import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  ArrowOutward as ArrowOutwardIcon,
  CallOutlined as CallOutlinedIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
  NorthEast as NorthEastIcon,
  Settings as SettingsIcon,
  SouthWest as SouthWestIcon,
} from "@mui/icons-material";

type ActivityChannel = "email" | "messaging" | "voice" | "system";
type ActivityNodeKind = "outgoing" | "incoming" | "system";

type SidePanelEmail = {
  to: string;
  ucid: string;
  subject: string;
  bodyLines: string[];
};

type ActivityEvent = {
  id: string;
  date: string;
  time: string;
  title: string;
  channel: ActivityChannel;
  meta: string;
  interactive: boolean;
  nodeKind: ActivityNodeKind;
  email?: SidePanelEmail;
};

type ActivityGroup = {
  date: string;
  events: ActivityEvent[];
  showMore?: { label: string };
};

const CHANNEL = {
  email: { label: "Email", color: "#1976D2", Icon: EmailOutlinedIcon },
  messaging: { label: "Messaging", color: "#D32F2F", Icon: ChatBubbleOutlineIcon },
  voice: { label: "Voice", color: "#2E7D32", Icon: CallOutlinedIcon },
  system: { label: "System", color: "#1976D2", Icon: SettingsIcon },
} as const satisfies Record<
  ActivityChannel,
  { label: string; color: string; Icon: React.ElementType }
>;

const groups: ActivityGroup[] = [
  {
    date: "18 Nov 2025",
    events: [
      {
        id: "18nov-0209-sent-email",
        date: "18 Nov 2025",
        time: "02:09 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "pca | ceg-automation-svc",
        interactive: true,
        nodeKind: "outgoing",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Agoda Booking ID 568534855 Check in 15 August 2025",
          bodyLines: [
            "Здравствуйте, Gulnur!",
            "",
            "Вас приветствует Agoda.",
            "",
            "Мы обращаемся к вам по поводу вашего бронирования № 568534855:",
            "",
            "Отель: Kibilu - Via dell'Unione - City Centre - Duomo",
            "Город: Milan",
            "Страна/регион: Italy",
            "Заезд: 15 August 2025",
            "Выезд: 18 August 2025",
            "",
            "Мы знаем, что вы бы хотели как можно скорее получить решение по вашему запросу, поэтому просим прощения за задержку с ответом. К сожалению, отель до сих пор не вышел с нами на связь.",
            "",
            "Тем не менее, мы делаем все, чтобы оперативно решить ваш вопрос, хотя и не можем гарантировать, что принимающая сторона пойдет вам на встречу. Позвольте предоставить вам информацию в течение ближайших 48 часов.",
            "",
            "Надеемся на ваше понимание. Пожалуйста, не отвечайте на это письмо, так как оно отправлено с электронного ящика, который никто не проверяет.",
          ],
        },
      },
      {
        id: "18nov-0606-sent-email",
        date: "18 Nov 2025",
        time: "06:06 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "pca | ceg-automation-svc",
        interactive: true,
        nodeKind: "outgoing",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Agoda Booking ID 568534855 Check in 15 August 2025",
          bodyLines: [
            "Здравствуйте, Gulnur!",
            "",
            "Это повторная отправка письма по вашему бронированию № 568534855.",
          ],
        },
      },
      {
        id: "18nov-0603-refund",
        date: "18 Nov 2025",
        time: "06:03 pm",
        title: "CC refunded successfully",
        channel: "system",
        meta: "auto refund | 1 : OperationSuccess",
        interactive: false,
        nodeKind: "system",
      },
    ],
    showMore: { label: "Show 2 more" },
  },
  {
    date: "17 Nov 2025",
    events: [
      {
        id: "17nov-0152-amended",
        date: "17 Nov 2025",
        time: "01:52 am",
        title: "Booking amended successfully",
        channel: "system",
        meta: "Update Room and Guest: 3 to 2 rooms, 5 to 4 adults, 1 to 0 children, 1 to 0 extrabed",
        interactive: false,
        nodeKind: "system",
      },
    ],
  },
  {
    date: "12 Nov 2025",
    events: [
      {
        id: "12nov-1933-received-supplier",
        date: "12 Nov 2025",
        time: "07:33 pm",
        title: "Received from Supplier, ab_service@bingtrip.com",
        channel: "email",
        meta: "thosney | Tasha Hosney | Accom - MY | CSS Agent | KUL",
        interactive: true,
        nodeKind: "incoming",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Received from Supplier, ab_service@bingtrip.com",
          bodyLines: ["(Mock content) Supplier email preview"],
        },
      },
    ],
  },
  {
    date: "10 Nov 2025",
    events: [
      {
        id: "10nov-1806-sent-customer",
        date: "10 Nov 2025",
        time: "06:06 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "thosney | Tasha Hosney | Accom - MY | CSS Agent | KUL",
        interactive: true,
        nodeKind: "outgoing",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Sent to Customer, lucasheil@id.uff.br",
          bodyLines: ["(Mock content) Customer email preview"],
        },
      },
      {
        id: "10nov-1806-received-messaging",
        date: "10 Nov 2025",
        time: "06:06 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "messaging",
        meta: "Kadimbung Kamson | kkamson | Accom - EN | CSS Agent | PNQ",
        interactive: true,
        nodeKind: "incoming",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Received from Customer (Messaging)",
          bodyLines: ["(Mock content) Messaging transcript preview"],
        },
      },
    ],
  },
  {
    date: "9 Nov 2025",
    events: [
      {
        id: "9nov-2144-received-voice",
        date: "9 Nov 2025",
        time: "09:44 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "voice",
        meta: "Nicole doamaral | ndoamaral | Accom - PT | CSS Agent | CAI",
        interactive: true,
        nodeKind: "incoming",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Received from Customer (Voice)",
          bodyLines: ["(Mock content) Call summary preview"],
        },
      },
    ],
  },
  {
    date: "8 Nov 2025",
    events: [
      {
        id: "8nov-1153-sent-supplier",
        date: "8 Nov 2025",
        time: "11:53 am",
        title: "Sent to Supplier, rafael.silva@hbxgroup.com",
        channel: "email",
        meta: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL",
        interactive: true,
        nodeKind: "outgoing",
        email: {
          to: "rafael.silva@hbxgroup.com",
          ucid: "-",
          subject: "Sent to Supplier, rafael.silva@hbxgroup.com",
          bodyLines: ["(Mock content) Supplier outbound email preview"],
        },
      },
      {
        id: "8nov-0420-received-supplier",
        date: "8 Nov 2025",
        time: "04:20 am",
        title: "Received from Supplier, rafael.silva@hbxgroup.com",
        channel: "email",
        meta: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL",
        interactive: true,
        nodeKind: "incoming",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Received from Supplier, rafael.silva@hbxgroup.com",
          bodyLines: ["(Mock content) Supplier inbound email preview"],
        },
      },
    ],
  },
  {
    date: "7 Nov 2025",
    events: [
      {
        id: "7nov-1927-received-voice",
        date: "7 Nov 2025",
        time: "07:27 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "voice",
        meta: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL",
        interactive: true,
        nodeKind: "incoming",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Received from Customer (Voice)",
          bodyLines: ["(Mock content) Call summary preview"],
        },
      },
      {
        id: "7nov-0617-sent-email",
        date: "7 Nov 2025",
        time: "06:17 am",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "Aarvi Patil | aapatil | Accom - EN | CSS Agent | PNQ",
        interactive: true,
        nodeKind: "outgoing",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Sent to Customer, lucasheil@id.uff.br",
          bodyLines: ["(Mock content) Customer email preview"],
        },
      },
      {
        id: "7nov-0612-received-hotel",
        date: "7 Nov 2025",
        time: "06:12 am",
        title: "Received from Hotel, reservas@lagunebarrahotel.com.br",
        channel: "email",
        meta: "Hussein Hafez | hhafez | Accom - PT | CSS Agent | CAI",
        interactive: true,
        nodeKind: "incoming",
        email: {
          to: "reservas@lagunebarrahotel.com.br",
          ucid: "-",
          subject: "Received from Hotel, reservas@lagunebarrahotel.com.br",
          bodyLines: ["(Mock content) Hotel email preview"],
        },
      },
    ],
    showMore: { label: "Show 14 more" },
  },
  {
    date: "6 Nov 2025",
    events: [
      {
        id: "6nov-2353-received-voice",
        date: "6 Nov 2025",
        time: "11:53 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "voice",
        meta: "Hussein Hafez | hhafez | Accom - PT | CSS Agent | CAI",
        interactive: true,
        nodeKind: "incoming",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Received from Customer (Voice)",
          bodyLines: ["(Mock content) Call summary preview"],
        },
      },
      {
        id: "6nov-2216-sent-email",
        date: "6 Nov 2025",
        time: "10:16 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "Maria Eshak | meshak | Accom - PT | CSS Agent | CAI",
        interactive: true,
        nodeKind: "outgoing",
        email: {
          to: "lucasheil@id.uff.br",
          ucid: "-",
          subject: "Sent to Customer, lucasheil@id.uff.br",
          bodyLines: ["(Mock content) Customer email preview"],
        },
      },
      {
        id: "6nov-2156-charged",
        date: "6 Nov 2025",
        time: "09:56 pm",
        title: "CC charged successfully",
        channel: "system",
        meta: "auto payment | 1 : Operation Success",
        interactive: false,
        nodeKind: "system",
      },
    ],
    showMore: { label: "Show 5 more" },
  },
];

function TimelineIcon({ nodeKind }: { nodeKind: ActivityNodeKind }) {
  const spec =
    nodeKind === "outgoing"
      ? { bg: "#E8F5E9", fg: "#2E7D32", Icon: NorthEastIcon }
      : nodeKind === "incoming"
        ? { bg: "#E3F2FD", fg: "primary.main", Icon: SouthWestIcon }
        : { bg: "#F5F5F5", fg: "rgba(0, 0, 0, 0.38)", Icon: SettingsIcon };

  const Icon = spec.Icon;
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: spec.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: spec.fg,
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Icon sx={{ fontSize: "18px" }} />
    </Box>
  );
}

function MetaPill({
  channel,
  meta,
}: {
  channel: ActivityChannel;
  meta: string;
}) {
  if (channel === "system") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
        <SettingsIcon sx={{ fontSize: "16px", color: "primary.main" }} />
        <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "primary.main" }}>
          System
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
          | {meta}
        </Typography>
      </Box>
    );
  }

  const icon =
    channel === "email"
      ? EmailOutlinedIcon
      : channel === "messaging"
        ? ChatBubbleOutlineIcon
        : CallOutlinedIcon;

  const Icon = icon;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
      <Icon sx={{ fontSize: "16px", color: "rgba(0, 0, 0, 0.87)" }} />
      <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "rgba(0, 0, 0, 0.87)" }}>
        {CHANNEL[channel].label}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
        | {meta}
      </Typography>
    </Box>
  );
}

function EventRow({
  event,
  selected,
  onSelect,
}: {
  event: ActivityEvent;
  selected: boolean;
  onSelect: () => void;
}) {
  const channel = CHANNEL[event.channel];

  if (!event.interactive) {
    return (
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        <Box sx={{ width: 28, display: "flex", justifyContent: "center" }}>
          <TimelineIcon nodeKind={event.nodeKind} />
        </Box>
        {/* Keep padding/alignment consistent with interactive cards */}
        <Box
          sx={{
            flex: 1,
            px: 2,
            py: 1.25,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            borderRadius: "4px",
            bgcolor: "transparent",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.87)",
                lineHeight: "18px",
              }}
            >
              {event.title}
            </Typography>
          <MetaPill channel={event.channel} meta={event.meta} />
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.60)",
              whiteSpace: "nowrap",
              pt: 0.25,
            }}
          >
            {event.time}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
      <Box sx={{ width: 28, display: "flex", justifyContent: "center" }}>
        <TimelineIcon nodeKind={event.nodeKind} />
      </Box>
      <Paper
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        elevation={1}
        sx={{
          flex: 1,
          borderRadius: "4px",
          border: "none",
          px: 2,
          py: 1.25,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          cursor: "pointer",
          bgcolor: selected ? "#E3F2FD" : "#FFF",
          transition: "box-shadow 120ms ease, background-color 120ms ease",
          "&:hover": {
            boxShadow: "0px 2px 6px rgba(0,0,0,0.12)",
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: 2,
          },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(0, 0, 0, 0.87)",
              lineHeight: "18px",
            }}
          >
            {event.title}
          </Typography>

          <MetaPill channel={event.channel} meta={event.meta} />
        </Box>

        <Typography
          sx={{
            fontSize: "12px",
            color: "rgba(0, 0, 0, 0.60)",
            whiteSpace: "nowrap",
            pt: 0.25,
          }}
        >
          {event.time}
        </Typography>
      </Paper>
    </Box>
  );
}

function SidePanel({ event }: { event: ActivityEvent }) {
  const [tab, setTab] = useState(0);
  const email = event.email ?? {
    to: "-",
    ucid: "-",
    subject: "-",
    bodyLines: ["No preview available."],
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderColor: "#E0E0E0",
        borderRadius: "4px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFF",
      }}
    >
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          px: 2,
          py: 1.5,
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            To: {email.to}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)", mt: 0.25 }}>
            UCID: {email.ucid}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{ textTransform: "none", minWidth: 96 }}
        >
          Resend
        </Button>
      </Box>

      <Divider />

      {/* tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          px: 2,
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
        <Tab
          icon={<EmailOutlinedIcon sx={{ fontSize: "18px" }} />}
          iconPosition="start"
          label="Email"
        />
        <Tab
          icon={<DescriptionOutlinedIcon sx={{ fontSize: "18px" }} />}
          iconPosition="start"
          label="Details"
          sx={{ ml: "auto" }}
        />
      </Tabs>

      <Divider />

      {/* content */}
      <Box sx={{ p: 2, overflow: "auto" }}>
        {tab === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              borderColor: "#E0E0E0",
              borderRadius: "4px",
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>
              {email.subject}
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            {email.bodyLines.map((line, idx) => (
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
          </Paper>
        ) : (
          <Typography sx={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.60)" }}>
            Details view (mock)
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default function ActivityLogPanel() {
  const interactiveEvents = useMemo(
    () => groups.flatMap((g) => g.events).filter((e) => e.interactive),
    [],
  );

  const [selectedId, setSelectedId] = useState<string>(
    interactiveEvents[0]?.id ?? "",
  );

  const selectedEvent =
    interactiveEvents.find((e) => e.id === selectedId) ?? interactiveEvents[0];

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "stretch", height: "100%", minHeight: 0 }}>
      {/* left: timeline */}
      <Box sx={{ flex: 1, minWidth: 0, overflow: "auto", pr: 0.5 }}>
        {groups.map((group) => (
          <Box key={group.date} sx={{ mb: 2.5 }}>
            <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)", mb: 1 }}>
              {group.date}
            </Typography>

            <Box sx={{ position: "relative" }}>
              {/* vertical line */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 13,
                  width: 2,
                  bgcolor: "divider",
                  zIndex: 0,
                }}
              />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {group.events.map((event) => (
                  <EventRow
                    key={event.id}
                    event={event}
                    selected={event.id === selectedId}
                    onSelect={() => {
                      if (!event.interactive) {
                        return;
                      }
                      setSelectedId(event.id);
                    }}
                  />
                ))}

                {group.showMore && (
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mt: 0.25 }}>
                    <Box sx={{ width: 28 }} />
                    <Link
                      component="button"
                      underline="none"
                      onClick={() => {
                        // Visual-only control for this mock dataset.
                      }}
                      sx={{
                        fontSize: "13px",
                        color: "primary.main",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.25,
                        "&:hover": { textDecoration: "underline" },
                        userSelect: "none",
                        mt: 0.25,
                      }}
                    >
                      {group.showMore.label}
                      <ExpandMoreIcon sx={{ fontSize: "18px" }} />
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* right: side panel */}
      <Box
        sx={{
          width: 460,
          flexShrink: 0,
          position: "sticky",
          top: 56, // sits below the sticky section header
          alignSelf: "flex-start",
          height: "calc(100% - 0px)",
        }}
      >
        {selectedEvent ? <SidePanel event={selectedEvent} /> : null}
      </Box>
    </Box>
  );
}

