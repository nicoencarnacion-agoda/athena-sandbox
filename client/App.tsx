import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Search from "./pages/Search";
import Handling from "./pages/Handling";
import ClickToCall from "./pages/ClickToCall";
import ClickToEmail from "./pages/ClickToEmail";
import ClickToMessaging from "./pages/ClickToMessaging";
import MyCases from "./pages/MyCases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/handling" element={<Handling />} />
            <Route path="/click-to-call" element={<ClickToCall />} />
            <Route path="/click-to-email" element={<ClickToEmail />} />
            <Route path="/click-to-messaging" element={<ClickToMessaging />} />
            <Route path="/my-cases" element={<MyCases />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
