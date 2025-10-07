import { ReactNode } from "react";

export interface NavItem {
  icon: ReactNode;
  label: string;
  path?: string;
  badge?: number;
}

export const ROUTES = {
  SEARCH: '/',
  HANDLING: '/handling',
  CLICK_TO_CALL: '/click-to-call',
  CLICK_TO_EMAIL: '/click-to-email',
  CLICK_TO_MESSAGING: '/click-to-messaging',
  MY_CASES: '/my-cases',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
