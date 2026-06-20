import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, Plus } from "lucide-react";
import { formatDate, formatDateTime, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import QRCode from "qrcode";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/members/$id")({
  head: () => ({ meta: [{ title: "Member — FitFlow" }] }),
  component: MemberDetail,
});

function MemberDetail() {
  const { id } = Route.useParams();
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const currency = active?.tenant.currency ?? "USD";
  const qc = useQueryClient();
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const { data: member } = useQuery({
    enabled: !!tenantId,
    queryKey: ["member", id],
    queryFn: async () => {
      const { data } = await supabase.from("members").select("*").eq("id", id).single();
      return data;
    },
  });

  const { data: memberships } = useQuery({
    queryKey: ["member-memberships", id],
    queryFn: async () => {
      const { data } = await supabase.from("member_memberships")
        .select("*, membership_plans(name, duration_days)").eq("member_id", id).order("start_date", { ascending: false });
      return data ?? [];
    },
  });

  const { data: payments } = useQuery({
    queryKey: ["member-payments", id],
    queryFn: async () => {
      const { data } = await supabase.from("payments").select("*").eq("member_id", id).order("paid_at", { ascending: false }).limit(20);
      return data ?? [];
    },
  });

  const { data: attendance } = useQuery({
    queryKey: ["member-attendance", id],
    queryFn: async () => {
      const { data } = await supabase.from("attendance").select("*").eq("member_id", id).order("check_in", { ascending: false }).limit(20);
      return data ?? [];
    },
  });

  const { data: plans } = useQuery({
    enabled: !!tenantId,
    queryKey: ["mplans", tenantId],
    queryFn: async () => {
      const { data } = await supabase.from("membership_plans").select("*").eq("tenant_id", tenantId!).eq("is_active", true);
      return data ?? [];
    },
  });

  const [assignOpen, setAssignOpen] = useState(false);
  const [planId, setPlanId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  const assign = useMutation({
    mutationFn: async () => {
      const plan = plans?.find((p: any) => p.id === planId);
      if (!plan || !tenantId || !member) throw new Error("Missing data");
      const end = new Date(startDate); end.setDate(end.getDate() + plan.duration_days);
      const { data: mm, error } = await supabase.from("member_memberships").insert({
        tenant_id: tenantId, member_id: id, plan_id: planId, start_date: startDate,
        end_date: end.toISOString().slice(0, 10), price: plan.price, status: "active",
      }).select().single();
      if (error) throw error;
      const { data: pay, error: payErr } = await supabase.from("payments").insert({
        tenant_id: tenantId, member_id: id, membership_id: mm.id, amount: plan.price,
        method: paymentMethod as any, status: "paid",
      }).select().single();
      if (payErr) throw payErr;
      const num = "INV-" + Date.now().toString().slice(-8);
      const tax = Number(plan.price) * (Number(active?.tenant.tax_percent ?? 0) / 100);
      await supabase.from("invoices").insert({
        tenant_id: tenantId, member_id: id, payment_id: pay.id, number: num,
        subtotal: plan.price, tax, total: Number(plan.price) + tax,
      });
      // mark member active
      await supabase.from("members").update({ status: "active" }).eq("id", id);
    },
    onSuccess: () => {
      toast.success("Membership assigned");
      setAssignOpen(false);
      qc.invalidateQueries({ queryKey: ["member-memberships"] });
      qc.invalidateQueries({ queryKey: ["member-payments"] });
      qc.invalidateQueries({ queryKey: ["member"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  // QR code generation
  useEffect(() => {
    if (!member || !qrRef.current) return;
    const token = `${member.tenant_id}:${member.id}`;
    const url = `${window.location.origin}/c/${btoa(token)}`;
    QRCode.toCanvas(qrRef.current, url, { width: 220, margin: 1, color: { dark: "#ff5b1f", light: "#0b0b0f" } });
  }, [member]);

  if (!member) return <PageBody>Loading…</PageBody>;

  return (
    <>
      <PageHeader title={member.full_name} description={`Code ${member.code} · ${member.status}`} actions={
        <Link to="/members"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button></Link>
      } />
      <PageBody>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg tracking-wide">PROFILE</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="Phone" v={member.phone} /> <Row k="Email" v={member.email} />
              <Row k="Gender" v={member.gender} /> <Row k="DOB" v={member.dob ? formatDate(member.dob) : null} />
              <Row k="Joined" v={formatDate(member.joined_at)} />
              <Row k="Emergency" v={member.emergency_contact} />
              <Row k="Address" v={member.address} />
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg tracking-wide">MEMBERSHIPS</h3>
              <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
                <DialogTrigger asChild><Button size="sm"><Plus className="mr-1 h-4 w-4" /> Assign plan</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Assign membership</DialogTitle></DialogHeader>
                  <div className="space-y-3">
                    <div><Label>Plan</Label>
                      <Select value={planId} onValueChange={setPlanId}>
                        <SelectTrigger><SelectValue placeholder="Choose plan" /></SelectTrigger>
                        <SelectContent>
                          {(plans ?? []).map((p: any) => <SelectItem key={p.id} value={p.id}>{p.name} — {formatCurrency(p.price, currency)} / {p.duration_days}d</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label>Start date</Label><Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
                    <div><Label>Payment method</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["cash","upi","credit_card","debit_card","bank_transfer","other"].map(m => <SelectItem key={m} value={m}>{m.replace("_"," ")}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter><Button onClick={() => assign.mutate()} disabled={!planId || assign.isPending}>Assign + Collect</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-3 space-y-2">
              {memberships && memberships.length > 0 ? memberships.map((m: any) => (
                <div key={m.id} className="rounded-md border border-border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{m.membership_plans?.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${m.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{m.status}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatDate(m.start_date)} → {formatDate(m.end_date)} · {formatCurrency(Number(m.price), currency)}</div>
                </div>
              )) : <p className="text-sm text-muted-foreground">No memberships yet.</p>}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg tracking-wide">QR CODE</h3>
            <p className="text-xs text-muted-foreground">Scan at front desk to check in</p>
            <div className="mt-3 grid place-items-center rounded-md bg-background p-4">
              <canvas ref={qrRef} className="rounded" />
            </div>
            <Button variant="outline" className="mt-3 w-full" onClick={() => {
              const c = qrRef.current; if (!c) return;
              const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = `${member.code}-qr.png`; a.click();
            }}><QrCode className="mr-2 h-4 w-4" /> Download</Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg tracking-wide">PAYMENTS</h3>
            <table className="mt-3 w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground"><tr><th className="py-2">Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
              <tbody>{(payments ?? []).map((p: any) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="py-2">{formatDate(p.paid_at)}</td>
                  <td>{formatCurrency(Number(p.amount), currency)}</td>
                  <td className="capitalize">{p.method.replace("_"," ")}</td>
                  <td>{p.status}</td>
                </tr>))}
                {(!payments || payments.length === 0) && <tr><td colSpan={4} className="py-4 text-center text-muted-foreground">No payments yet</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg tracking-wide">ATTENDANCE</h3>
            <table className="mt-3 w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground"><tr><th className="py-2">In</th><th>Out</th><th>Method</th></tr></thead>
              <tbody>{(attendance ?? []).map((a: any) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="py-2">{formatDateTime(a.check_in)}</td>
                  <td>{a.check_out ? formatDateTime(a.check_out) : "—"}</td>
                  <td className="uppercase text-xs">{a.method}</td>
                </tr>))}
                {(!attendance || attendance.length === 0) && <tr><td colSpan={3} className="py-4 text-center text-muted-foreground">No check-ins yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </PageBody>
    </>
  );
}

function Row({ k, v }: { k: string; v?: string | null }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v || "—"}</dd>
    </div>
  );
}
