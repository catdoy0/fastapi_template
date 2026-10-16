import { Link, useLocation } from "react-router";
import { EllipsisVertical, LogOut, Settings, UserRound } from "lucide-react";
import { Popover } from "@base-ui/react/popover";

import { useAuth } from "../../context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { dashboardSectionsByRole } from "./DashboardNav";
import type { Role } from "../../types/auth";
import AreYouSureModal from "@/components/common/modals/AreYouSureModal";
import { useState } from "react";

const defaultRole: Role = "ADMIN";

export default function SidebarLayout() {
  const { session, logout } = useAuth();
  const { pathname } = useLocation();
  const role = session?.user.role ?? defaultRole;
  const userName = session
    ? `${session.user.email}`.trim()
    : "template@email.com";

  return (
    <Sidebar collapsible="icon">

      <SidebarHeader className="h-14 shrink-0 flex-row items-center border-b p-3">
        <div className="flex items-center gap-2 font-semibold">
          <SidebarTrigger />
          <span className="group-data-[collapsible=icon]:hidden">Starter Dashboard</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {dashboardSectionsByRole[role].map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton render={<Link to={item.href} />} isActive={isActive}>
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <ProfilePopover
          userName={userName}
          role={role}
          onLogout={() => void logout()}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

interface ProfilePopoverProps {
  userName: string;
  role: Role;
  onLogout: () => void;
}

function ProfilePopover({ userName, role, onLogout }: ProfilePopoverProps) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);

  return (
    <Popover.Root open={profilePopoverOpen} onOpenChange={setProfilePopoverOpen}>
      <AreYouSureModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} onConfirm={onLogout}/>
      <Popover.Trigger className="flex w-full items-center gap-3 rounded-md px-2 py-1 text-left outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium transition-all group-data-[collapsible=icon]:size-6">
          {userName.slice(0, 1).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
          <span className="block truncate text-sm font-medium">{userName}</span>
          <span className="block text-xs text-muted-foreground">{role.replaceAll("_", " ")}</span>
        </span>
      <EllipsisVertical size={18} className="group-data-[collapsible=icon]:hidden"/>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="right" align="end" sideOffset={8} className="z-50 outline-none">
          <Popover.Popup className="min-w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none transition-[opacity,transform] duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0">
            <Link to="/dashboard/profile" className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
              <UserRound className="size-4" /> Profile
            </Link>
            <Link to="/dashboard/settings" className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
              <Settings className="size-4" /> Settings
            </Link>
            <div className="my-1 h-px bg-border" />
            <button
              type="button"
              onClick={() => {
                setProfilePopoverOpen(false);
                setLogoutModalOpen(true);
              }}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="size-4" /> Log out
            </button>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
