import { createFileRoute } from "@tanstack/react-router";
import { useActiveTenant } from "@/hooks/use-tenant";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { PageHeader, PageBody } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import {
  Users, UserCheck, Clock, CalendarCheck, DollarSign, AlertCircle, UserCog, Building2,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — FitFlow" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { active } = useActiveTenant();
  const { data, isLoading } = useDashboardStats();
  const currency = active?.tenant.currency ?? "USD";

  return (
    <>
      <PageHeader title="Dashboard" description={`Welcome back to ${active?.tenant.name ?? ""}`} />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total members" value={data?.totalMembers ?? "—"} icon={Users} accent="primary" />
          <StatCard label="Active" value={data?.activeMembers ?? "—"} icon={UserCheck} accent="success" />
          <StatCard label="Expired" value={data?.expiredMembers ?? "—"} icon={Clock} accent="warning" />
          <StatCard label="Check-ins today" value={data?.todayCheckins ?? "—"} icon={CalendarCheck} accent="accent" />
          <StatCard label="MTD revenue" value={data ? formatCurrency(data.monthlyRevenue, currency) : "—"} icon={DollarSign} accent="primary" />
          <StatCard label="Outstanding" value={data ? formatCurrency(data.outstanding, currency) : "—"} icon={AlertCircle} accent="destructive" />
          <StatCard label="Trainers" value={data?.trainers ?? "—"} icon={UserCog} accent="accent" />
          <StatCard label="Branches" value={data?.branches ?? "—"} icon={Building2} accent="primary" />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl tracking-wide">REVENUE TREND</h3>
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.revenueTrend ?? []}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" fill="url(#rev)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl tracking-wide">CHECK-INS</h3>
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.attendanceTrend ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                  <Bar dataKey="checkins" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}
      </PageBody>
    </>
  );
}
