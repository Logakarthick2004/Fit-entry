import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports — FitFlow" }] }),
  component: Reports,
});

function toCsv(rows: Record<string, any>[]) {
  if (!rows.length) return "";
  const keys = Object.keys(rows[0]);
  const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [keys.join(","), ...rows.map((r) => keys.map((k) => escape(r[k])).join(","))].join("\n");
}
function downloadCsv(name: string, rows: Record<string, any>[]) {
  const blob = new Blob([toCsv(rows)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}

function Reports() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const currency = active?.tenant.currency ?? "USD";

  const { data: revenue } = useQuery({
    enabled: !!tenantId,
    queryKey: ["rep-rev", tenantId],
    queryFn: async () => (await supabase.from("payments").select("paid_at, amount, method, status, members(full_name, code)").eq("tenant_id", tenantId!).order("paid_at", { ascending: false }).limit(500)).data ?? [],
  });
  const { data: attendance } = useQuery({
    enabled: !!tenantId,
    queryKey: ["rep-att", tenantId],
    queryFn: async () => (await supabase.from("attendance").select("check_in, check_out, method, members(full_name, code)").eq("tenant_id", tenantId!).order("check_in", { ascending: false }).limit(500)).data ?? [],
  });
  const { data: memberships } = useQuery({
    enabled: !!tenantId,
    queryKey: ["rep-mem", tenantId],
    queryFn: async () => (await supabase.from("member_memberships").select("start_date, end_date, status, price, members(full_name, code), membership_plans(name)").eq("tenant_id", tenantId!).order("start_date", { ascending: false }).limit(500)).data ?? [],
  });
  const { data: expenses } = useQuery({
    enabled: !!tenantId,
    queryKey: ["rep-exp", tenantId],
    queryFn: async () => (await supabase.from("expenses").select("*").eq("tenant_id", tenantId!).order("spent_on", { ascending: false }).limit(500)).data ?? [],
  });

  const totalRevenue = (revenue ?? []).filter((r: any) => r.status === "paid").reduce((s, r: any) => s + Number(r.amount), 0);
  const totalExpense = (expenses ?? []).reduce((s, e: any) => s + Number(e.amount), 0);

  return (
    <>
      <PageHeader title="Reports" description="Export and analyze gym performance" />
      <PageBody>
        <Tabs defaultValue="revenue">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
            <TabsTrigger value="pnl">P &amp; L</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total collected: <span className="font-semibold text-foreground">{formatCurrency(totalRevenue, currency)}</span></p>
              <Button variant="outline" size="sm" onClick={() => downloadCsv("revenue.csv", (revenue ?? []).map((r: any) => ({ date: r.paid_at, member: r.members?.full_name, amount: r.amount, method: r.method, status: r.status })))}><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
            </div>
            <Table head={["Date","Member","Amount","Method","Status"]} rows={(revenue ?? []).map((r: any) => [formatDate(r.paid_at), r.members?.full_name ?? "—", formatCurrency(Number(r.amount), currency), r.method.replace("_"," "), r.status])} />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => downloadCsv("attendance.csv", (attendance ?? []).map((a: any) => ({ check_in: a.check_in, check_out: a.check_out, method: a.method, member: a.members?.full_name })))}><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
            </div>
            <Table head={["In","Out","Method","Member"]} rows={(attendance ?? []).map((a: any) => [formatDate(a.check_in), a.check_out ? formatDate(a.check_out) : "—", a.method, a.members?.full_name ?? "—"])} />
          </TabsContent>

          <TabsContent value="memberships" className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => downloadCsv("memberships.csv", (memberships ?? []).map((m: any) => ({ start: m.start_date, end: m.end_date, status: m.status, plan: m.membership_plans?.name, price: m.price, member: m.members?.full_name })))}><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
            </div>
            <Table head={["Start","End","Status","Plan","Price","Member"]} rows={(memberships ?? []).map((m: any) => [formatDate(m.start_date), formatDate(m.end_date), m.status, m.membership_plans?.name ?? "—", formatCurrency(Number(m.price), currency), m.members?.full_name ?? "—"])} />
          </TabsContent>

          <TabsContent value="pnl" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Revenue" v={formatCurrency(totalRevenue, currency)} />
              <Stat label="Expenses" v={formatCurrency(totalExpense, currency)} />
              <Stat label="Net profit" v={formatCurrency(totalRevenue - totalExpense, currency)} tone={totalRevenue - totalExpense >= 0 ? "good" : "bad"} />
            </div>
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}

function Stat({ label, v, tone }: { label: string; v: string; tone?: "good" | "bad" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 kpi-number ${tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "text-primary"}`}>{v}</div>
    </div>
  );
}
function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground"><tr>{head.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => <tr key={i} className="border-t border-border">{r.map((c, j) => <td key={j} className="px-4 py-2">{c}</td>)}</tr>)}
          {rows.length === 0 && <tr><td colSpan={head.length} className="py-6 text-center text-muted-foreground">No data yet</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
