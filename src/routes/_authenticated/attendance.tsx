import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogIn, LogOut, Search } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/attendance")({
  head: () => ({ meta: [{ title: "Attendance — FitFlow" }] }),
  component: Attendance,
});

function Attendance() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  const { data: members } = useQuery({
    enabled: !!tenantId && q.length > 0,
    queryKey: ["members-search", tenantId, q],
    queryFn: async () => {
      const { data } = await supabase.from("members").select("id, code, full_name, phone").eq("tenant_id", tenantId!).or(`full_name.ilike.%${q}%,code.ilike.%${q}%,phone.ilike.%${q}%`).limit(10);
      return data ?? [];
    },
  });

  const { data: todayAtt } = useQuery({
    enabled: !!tenantId,
    queryKey: ["today-att", tenantId],
    queryFn: async () => {
      const today = new Date(); today.setHours(0,0,0,0);
      const { data } = await supabase.from("attendance").select("*, members(full_name, code)").eq("tenant_id", tenantId!).gte("check_in", today.toISOString()).order("check_in", { ascending: false });
      return data ?? [];
    },
    refetchInterval: 10000,
  });

  const checkin = useMutation({
    mutationFn: async ({ memberId, method = "manual" }: { memberId: string; method?: "manual" | "qr" | "code" }) => {
      if (!tenantId) throw new Error("No tenant");
      const today = new Date(); today.setHours(0,0,0,0);
      const { data: open } = await supabase.from("attendance").select("*").eq("member_id", memberId).is("check_out", null).gte("check_in", today.toISOString()).limit(1).maybeSingle();
      if (open) {
        const now = new Date();
        const dur = Math.round((now.getTime() - new Date(open.check_in).getTime()) / 60000);
        const { error } = await supabase.from("attendance").update({ check_out: now.toISOString(), duration_minutes: dur }).eq("id", open.id);
        if (error) throw error;
        return { action: "out", duration: dur };
      } else {
        const { error } = await supabase.from("attendance").insert({ tenant_id: tenantId, member_id: memberId, method });
        if (error) throw error;
        return { action: "in" };
      }
    },
    onSuccess: (r) => { toast.success(r.action === "in" ? "Checked in" : `Checked out (${r.duration} min)`); qc.invalidateQueries({ queryKey: ["today-att"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader title="Attendance" description="Check members in and out" />
      <PageBody>
        <Tabs defaultValue="manual" className="space-y-4">
          <TabsList><TabsTrigger value="manual">Manual</TabsTrigger><TabsTrigger value="qr">QR Scanner</TabsTrigger></TabsList>

          <TabsContent value="manual" className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search by name, code, or phone…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              {members && members.length > 0 && (
                <div className="mt-3 divide-y divide-border rounded-md border border-border">
                  {members.map((m: any) => (
                    <button key={m.id} onClick={() => checkin.mutate({ memberId: m.id })}
                      className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-secondary/40">
                      <div>
                        <div className="font-medium">{m.full_name}</div>
                        <div className="text-xs text-muted-foreground">{m.code} · {m.phone ?? "no phone"}</div>
                      </div>
                      <LogIn className="h-4 w-4 text-primary" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="qr">
            <QrScanner onScan={(token) => {
              try {
                const decoded = atob(token.split("/").pop() || token);
                const [, memberId] = decoded.split(":");
                if (memberId) checkin.mutate({ memberId, method: "qr" });
              } catch { toast.error("Invalid QR"); }
            }} />
          </TabsContent>
        </Tabs>

        <div className="mt-6 rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-lg tracking-wide">TODAY'S CHECK-INS ({todayAtt?.length ?? 0})</h3>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground"><tr><th className="py-2">Member</th><th>In</th><th>Out</th><th>Method</th><th></th></tr></thead>
            <tbody>
              {(todayAtt ?? []).map((a: any) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="py-2 font-medium">{a.members?.full_name} <span className="ml-2 text-xs text-muted-foreground">{a.members?.code}</span></td>
                  <td>{formatDateTime(a.check_in)}</td>
                  <td>{a.check_out ? formatDateTime(a.check_out) : "—"}</td>
                  <td className="uppercase text-xs">{a.method}</td>
                  <td className="text-right">{!a.check_out && <Button size="sm" variant="outline" onClick={() => checkin.mutate({ memberId: a.member_id })}><LogOut className="mr-1 h-3 w-3" /> Out</Button>}</td>
                </tr>
              ))}
              {(!todayAtt || todayAtt.length === 0) && <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">No check-ins yet today</td></tr>}
            </tbody>
          </table>
        </div>
      </PageBody>
    </>
  );
}

function QrScanner({ onScan }: { onScan: (text: string) => void }) {
  const [active, setActive] = useState(false);
  const scannerRef = useRef<any>(null);
  const elId = "qr-reader";

  useEffect(() => {
    if (!active) return;
    let mounted = true;
    (async () => {
      const { Html5Qrcode } = await import("html5-qrcode");
      if (!mounted) return;
      const inst = new Html5Qrcode(elId);
      scannerRef.current = inst;
      try {
        await inst.start({ facingMode: "environment" }, { fps: 10, qrbox: 240 },
          (text) => { onScan(text); inst.stop().catch(() => {}); setActive(false); },
          () => {});
      } catch (e: any) { toast.error("Camera error: " + e.message); setActive(false); }
    })();
    return () => { mounted = false; scannerRef.current?.stop().catch(() => {}); };
  }, [active, onScan]);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {!active ? (
        <div className="text-center">
          <p className="mb-4 text-sm text-muted-foreground">Scan a member's QR code to check them in or out.</p>
          <Button onClick={() => setActive(true)}>Start camera</Button>
        </div>
      ) : (
        <>
          <div id={elId} className="mx-auto max-w-sm overflow-hidden rounded-md" />
          <div className="mt-3 text-center">
            <Button variant="outline" onClick={() => { scannerRef.current?.stop().catch(() => {}); setActive(false); }}>Stop</Button>
          </div>
        </>
      )}
    </div>
  );
}
