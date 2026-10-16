import { LayoutDashboard, Settings, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Role } from "../../types/auth";
import { ROUTES } from "../../routes";

export interface DashboardSidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardSidebarSection {
  label: string;
  items: DashboardSidebarItem[];
}

const root = ROUTES.DASHBOARD.ROOT;
const overview = { label: "Overview", href: root, icon: LayoutDashboard };
const profile = { label: "Profile", href: `${root}/profile`, icon: UserRound };
const settings = { label: "Settings", href: `${root}/settings`, icon: Settings };

const basicSections: DashboardSidebarSection[] = [
  { label: "Workspace", items: [overview] },
  { label: "Account", items: [profile] },
];


const administratorSections: DashboardSidebarSection[] = [
  { label: "Workspace", items: [overview] },
  { label: "Manage", items: [profile, settings] },
];


export const dashboardSectionsByRole: Record<Role, DashboardSidebarSection[]> = {
  CUSTOMER: basicSections,
  ADMIN: administratorSections,
  SUPER_ADMIN: administratorSections,
};


export function getNavLabel(role: Role, pathname: string): string {
  const sections = dashboardSectionsByRole[role];
  for (const section of sections) {
    const item = section.items.find((entry) => entry.href === pathname);
    if (item) return item.label;
  }

  return pathname === root ? "Overview" : "Dashboard";
}
