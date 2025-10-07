import { SelectChangeEvent } from "@mui/material";

export interface FilterState {
  contactType: string;
  ucid: string;
  ucidOpen: boolean;
}

export type ContactType = "Customer" | "Partner" | "Agent";

export interface FormHandlers {
  handleContactTypeChange: (event: SelectChangeEvent) => void;
  handleUcidChange: (event: SelectChangeEvent) => void;
}
