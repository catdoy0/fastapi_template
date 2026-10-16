import { Outlet, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { getNavLabel } from "../modules/dashboard/DashboardNav";
import SidebarLayout from "../modules/dashboard/SidebarLayout";
import { useTitle } from "../hooks/useTitle";
import type { Role } from "../types/auth";

const defaultRole: Role = "ADMIN";

export default function DashboardLayout() {
  const { session } = useAuth();
  const { pathname } = useLocation();
  const role = session?.user.role ?? defaultRole;
  const pageTitle = getNavLabel(role, pathname);

  useTitle(`${pageTitle} · Dashboard`);

  return (
    <SidebarProvider>

      <SidebarLayout />

      <SidebarInset className="min-h-svh min-w-0">

        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <SidebarTrigger className="md:hidden" />
          <ChevronRight className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">{pageTitle}</span>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}
