import {
  Search,
  EditNote,
  Phone,
  Email,
  Message,
  List as ListIcon,
  Help,
  Campaign,
  Storage,
  Layers,
  Window,
} from "@mui/icons-material";
import { NavItem, ROUTES } from "../../types";

export const primaryNavItems: NavItem[] = [
  { icon: <Search />, label: "Search", path: ROUTES.SEARCH },
  { icon: <EditNote />, label: "Handling", path: ROUTES.HANDLING },
  { icon: <Phone />, label: "Phone", path: ROUTES.CLICK_TO_CALL },
  { icon: <Email />, label: "Email", path: ROUTES.CLICK_TO_EMAIL },
  { icon: <Message />, label: "Message", path: ROUTES.CLICK_TO_MESSAGING },
  { icon: <ListIcon />, label: "My Cases", path: ROUTES.MY_CASES },
];

export const secondaryNavItems: NavItem[] = [
  { icon: <Help />, label: "Help" },
  { icon: <Campaign />, label: "Updates", badge: 1 },
  { icon: <Storage />, label: "Bulk Action" },
  { icon: <Layers />, label: "Work\nspace" },
  { icon: <Window />, label: "Back Office" },
];
