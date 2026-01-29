import { Box, Link, Paper, Typography } from "@mui/material";
import {
  ArrowOutward as ArrowOutwardIcon,
  CallOutlined as CallOutlinedIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  EmailOutlined as EmailOutlinedIcon,
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

type ActivityChannel = "email" | "messaging" | "voice" | "system";

type ActivityEvent = {
  date: string;
  time: string;
  title: string;
  channel: ActivityChannel;
  meta: string;
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
        date: "18 Nov 2025",
        time: "02:09 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "pca | ceg-automation-svc",
      },
      {
        date: "18 Nov 2025",
        time: "06:06 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "pca | ceg-automation-svc",
      },
      {
        date: "18 Nov 2025",
        time: "06:03 pm",
        title: "CC refunded successfully",
        channel: "system",
        meta: "auto refund | 1 : OperationSuccess",
      },
    ],
    showMore: { label: "Show 2 more" },
  },
  {
    date: "17 Nov 2025",
    events: [
      {
        date: "17 Nov 2025",
        time: "01:52 am",
        title: "Booking amended successfully",
        channel: "system",
        meta: "Update Room and Guest: 3 to 2 rooms, 5 to 4 adults, 1 to 0 children, 1 to 0 extrabed",
      },
    ],
  },
  {
    date: "12 Nov 2025",
    events: [
      {
        date: "12 Nov 2025",
        time: "07:33 pm",
        title: "Received from Supplier, ab_service@bingtrip.com",
        channel: "email",
        meta: "thosney | Tasha Hosney | Accom - MY | CSS Agent | KUL",
      },
    ],
  },
  {
    date: "10 Nov 2025",
    events: [
      {
        date: "10 Nov 2025",
        time: "06:06 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "thosney | Tasha Hosney | Accom - MY | CSS Agent | KUL",
      },
      {
        date: "10 Nov 2025",
        time: "06:06 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "messaging",
        meta: "Kadimbung Kamson | kkamson | Accom - EN | CSS Agent | PNQ",
      },
    ],
  },
  {
    date: "9 Nov 2025",
    events: [
      {
        date: "9 Nov 2025",
        time: "09:44 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "voice",
        meta: "Nicole doamaral | ndoamaral | Accom - PT | CSS Agent | CAI",
      },
    ],
  },
  {
    date: "8 Nov 2025",
    events: [
      {
        date: "8 Nov 2025",
        time: "11:53 am",
        title: "Sent to Supplier, rafael.silva@hbxgroup.com",
        channel: "email",
        meta: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL",
      },
      {
        date: "8 Nov 2025",
        time: "04:20 am",
        title: "Received from Supplier, rafael.silva@hbxgroup.com",
        channel: "email",
        meta: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL",
      },
    ],
  },
  {
    date: "7 Nov 2025",
    events: [
      {
        date: "7 Nov 2025",
        time: "07:27 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "voice",
        meta: "Zaieynab Mustapha | zmustapha | Accom - MY | CSS Agent | KUL",
      },
      {
        date: "7 Nov 2025",
        time: "06:17 am",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "Aarvi Patil | aapatil | Accom - EN | CSS Agent | PNQ",
      },
      {
        date: "7 Nov 2025",
        time: "06:12 am",
        title: "Received from Hotel, reservas@lagunebarrahotel.com.br",
        channel: "email",
        meta: "Hussein Hafez | hhafez | Accom - PT | CSS Agent | CAI",
      },
    ],
    showMore: { label: "Show 14 more" },
  },
  {
    date: "6 Nov 2025",
    events: [
      {
        date: "6 Nov 2025",
        time: "11:53 pm",
        title: "Received from Customer, Lucas Heil Figueira Carnevale (Brazil)",
        channel: "voice",
        meta: "Hussein Hafez | hhafez | Accom - PT | CSS Agent | CAI",
      },
      {
        date: "6 Nov 2025",
        time: "10:16 pm",
        title: "Sent to Customer, lucasheil@id.uff.br",
        channel: "email",
        meta: "Maria Eshak | meshak | Accom - PT | CSS Agent | CAI",
      },
      {
        date: "6 Nov 2025",
        time: "09:56 pm",
        title: "CC charged successfully",
        channel: "system",
        meta: "auto payment | 1 : Operation Success",
      },
    ],
    showMore: { label: "Show 5 more" },
  },
];

function TimelineIcon({ channel }: { channel: ActivityChannel }) {
  const Icon = CHANNEL[channel].Icon;
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: "#E3F2FD",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "primary.main",
        flexShrink: 0,
        position: "relative",
        zIndex: 1, // keep icon above connector line
      }}
    >
      <Icon sx={{ fontSize: "18px" }} />
    </Box>
  );
}

function EventCard({ event }: { event: ActivityEvent }) {
  const channel = CHANNEL[event.channel];

  return (
    <Paper
      variant="outlined"
      sx={{
        flex: 1,
        borderColor: "#E0E0E0",
        borderRadius: "4px",
        px: 2,
        py: 1.25,
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
          {event.channel === "system" ? (
            <>
              <SettingsIcon sx={{ fontSize: "16px", color: "#1976D2" }} />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#1976D2",
                }}
              >
                System
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                | {event.meta}
              </Typography>
            </>
          ) : (
            <>
              <ArrowOutwardIcon sx={{ fontSize: "16px", color: channel.color }} />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: channel.color,
                }}
              >
                {channel.label}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.60)" }}>
                | {event.meta}
              </Typography>
            </>
          )}
        </Box>
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
  );
}

export default function ActivityTimeline() {
  return (
    <Box sx={{ px: 0.5 }}>
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
                bgcolor: "primary.main",
                zIndex: 0, // ensure it stays behind the icons/cards
              }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {group.events.map((event, idx) => (
                <Box
                  key={`${group.date}-${idx}-${event.title}`}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box sx={{ width: 28, display: "flex", justifyContent: "center" }}>
                    <TimelineIcon channel={event.channel} />
                  </Box>
                  <EventCard event={event} />
                </Box>
              ))}

              {group.showMore && (
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mt: 0.25 }}>
                  <Box sx={{ width: 28 }} />
                  <Link
                    component="button"
                    underline="none"
                    onClick={() => {
                      // Intentionally a visual-only control for this mock,
                      // to keep the visible dataset identical to the provided screenshot.
                    }}
                    sx={{
                      fontSize: "13px",
                      color: "#1976D2",
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
  );
}

