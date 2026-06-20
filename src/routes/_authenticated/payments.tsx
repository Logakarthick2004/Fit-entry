import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody, EmptyState } from "@/components/page-header";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/payments")({
  head: () => ({ meta: [{ title: "Payments — FitFlow" }] }),
  component: Payments,
});

function Payments() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const currency = active?.tenant.currency ?? "USD";
  const { data } = useQuery({
    enabled: !!tenantId,
    queryKey: ["payments", tenantId],
    queryFn: async () => {
      const { data } = await supabase.from("payments")
        .select("*, members(full_name, code)").eq("tenant_id", tenantId!).order("paid_at", { ascending: false }).limit(200);
      return data ?? [];
    },
  });
  const total = (data ?? []).filter((p: any) => p.status === "paid").reduce((s, p: any) => s + Number(p.amount), 0);
  return (
    <>
      <PageHeader title="Payments" description={`Total collected: ${formatCurrency(total, currency)}`} />
      <PageBody>
        {!data || data.length === 0 ? <EmptyState title="No payments yet" hint="Payments appear when you assign memberships." /> : (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Member</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3 hidden sm:table-cell">Method</th><th className="px-4 py-3">Status</th></tr>
              </thead>
              <tbody>
                {data.map((p: any) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="px-4 py-3">{formatDateTime(p.paid_at)}</td>
                    <td className="px-4 py-3 font-medium">{p.members?.full_name} <span className="ml-2 text-xs text-muted-foreground">{p.members?.code}</span></td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(Number(p.amount), currency)}</td>
                    <td className="px-4 py-3 hidden sm:table-cell capitalize">{p.method.replace("_"," ")}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageBody>
    </>
  );
}
