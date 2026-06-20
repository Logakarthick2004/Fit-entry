import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dumbbell, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/c/$token")({
  head: () => ({ meta: [{ title: "Check-in — FitFlow" }] }),
  ssr: false,
  component: PublicCheckin,
});

function PublicCheckin() {
  const { token } = Route.useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "in" | "out" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate({ to: "/auth", search: { redirect: window.location.pathname } as any });
          return;
        }
        const decoded = atob(token);
        const [tenantId, memberId] = decoded.split(":");
        if (!tenantId || !memberId) throw new Error("Invalid QR");
        const today = new Date(); today.setHours(0,0,0,0);
        const { data: open } = await supabase.from("attendance").select("*").eq("member_id", memberId).is("check_out", null).gte("check_in", today.toISOString()).limit(1).maybeSingle();
        const { data: member } = await supabase.from("members").select("full_name").eq("id", memberId).single();
        if (open) {
          const now = new Date();
          const dur = Math.round((now.getTime() - new Date(open.check_in).getTime()) / 60000);
          await supabase.from("attendance").update({ check_out: now.toISOString(), duration_minutes: dur }).eq("id", open.id);
          setStatus("out"); setMessage(`${member?.full_name ?? "Member"} — ${dur} min session`);
        } else {
          await supabase.from("attendance").insert({ tenant_id: tenantId, member_id: memberId, method: "qr" });
          setStatus("in"); setMessage(`${member?.full_name ?? "Member"} — welcome!`);
        }
      } catch (e: any) {
        setStatus("error"); setMessage(e.message ?? "Failed");
      }
    })();
  }, [token, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-background p-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 text-center">
        <Dumbbell className="mx-auto h-10 w-10 text-primary" />
        {status === "loading" && <><Loader2 className="mx-auto mt-4 h-8 w-8 animate-spin text-muted-foreground" /><p className="mt-2 text-sm text-muted-foreground">Processing…</p></>}
        {status === "in" && <><CheckCircle2 className="mx-auto mt-4 h-12 w-12 text-success" /><p className="mt-2 font-display text-2xl tracking-wide">CHECKED IN</p><p className="text-sm text-muted-foreground">{message}</p></>}
        {status === "out" && <><CheckCircle2 className="mx-auto mt-4 h-12 w-12 text-accent" /><p className="mt-2 font-display text-2xl tracking-wide">CHECKED OUT</p><p className="text-sm text-muted-foreground">{message}</p></>}
        {status === "error" && <><XCircle className="mx-auto mt-4 h-12 w-12 text-destructive" /><p className="mt-2 font-semibold">Error</p><p className="text-sm text-muted-foreground">{message}</p></>}
      </div>
    </div>
  );
}
