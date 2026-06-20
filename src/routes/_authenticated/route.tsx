import { createFileRoute, redirect, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant, useMyTenants, setActiveTenantId } from "@/hooks/use-tenant";
import { useAuthUser } from "@/hooks/use-auth";
import { cn, initials } from "@/lib/utils";
import {
  Activity, BarChart3, CalendarCheck, CreditCard, Dumbbell, Home, LogOut,
  Settings, Users, Salad, UserCog, Sparkles, Building2, ChevronsUpDown,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth", search: { redirect: location.href } });
    return { user: data.user };
  },
  component: AuthedLayout,
});

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/members", label: "Members", icon: Users },
  { to: "/memberships", label: "Memberships", icon: Sparkles },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/trainers", label: "Trainers", icon: UserCog },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/diets", label: "Diets", icon: Salad },
  { to: "/leads", label: "Leads", icon: Activity },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function AuthedLayout() {
  const { user } = useAuthUser();
  const { active, tenants, isLoading } = useActiveTenant();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isLoading && tenants.length === 0) {
      // no tenant — go to onboarding
      navigate({ to: "/onboarding" });
    }
  }, [isLoading, tenants.length, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="h-5 w-5" />
          </span>
          <span className="font-display text-xl tracking-wider text-sidebar-foreground">FITFLOW</span>
        </div>

        <div className="px-3 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-md border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-left text-sm">
                <div className="min-w-0">
                  <div className="truncate font-semibold">{active?.tenant.name ?? "—"}</div>
                  <div className="truncate text-xs text-muted-foreground">{active?.roles.join(", ") || "member"}</div>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Switch workspace</DropdownMenuLabel>
              {tenants.map((t) => (
                <DropdownMenuItem key={t.tenant_id} onClick={() => { setActiveTenantId(t.tenant_id); window.location.reload(); }}>
                  <Building2 className="mr-2 h-4 w-4" /> {t.tenant.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/onboarding" })}>+ Create gym</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 pb-4">
          {nav.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link key={to} to={to as any}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}>
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-md p-2 hover:bg-sidebar-accent/60">
                <Avatar className="h-8 w-8"><AvatarFallback>{initials(user?.user_metadata?.full_name || user?.email)}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1 text-left">
                  <div className="truncate text-sm font-medium">{user?.user_metadata?.full_name || user?.email}</div>
                  <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleSignOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border px-6 md:hidden">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><Dumbbell className="h-5 w-5" /></span>
            <span className="font-display text-lg tracking-wider">FITFLOW</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut}><LogOut className="h-4 w-4" /></Button>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
