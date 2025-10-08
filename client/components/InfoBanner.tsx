import { Alert, AlertProps } from "@mui/material";
import { Info } from "@mui/icons-material";

interface InfoBannerProps extends Omit<AlertProps, 'severity' | 'icon'> {
  children: React.ReactNode;
}

export default function InfoBanner({ children, sx, ...props }: InfoBannerProps) {
  return (
    <Alert
      icon={<Info sx={{ color: "#0288D1" }} />}
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
        ...sx,
      }}
      {...props}
    >
      {children}
    </Alert>
  );
}
