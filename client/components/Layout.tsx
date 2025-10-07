import { ReactNode } from "react";
import { Box } from "@mui/material";
import MainNavigation from "./MainNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#FFF" }}>
      <MainNavigation />
      {children}
    </Box>
  );
}
