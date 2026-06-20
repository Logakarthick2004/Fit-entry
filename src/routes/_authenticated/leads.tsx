import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const STAGES = ["new","contacted","interested","trial","converted","lost"] as const;

export const Route = createFileRoute("/_authenticated/leads")({
  head: () => ({ meta: [{ title: "Leads — FitFlow" }] }),
  component: Leads,
});

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().optional(),
  notes: z.string().optional(),
});

function Leads() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const { data } = useQuery({
    enabled: !!tenantId,
    queryKey: ["leads", tenantId],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("*").eq("tenant_id", tenantId!).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async (v: z.infer<typeof schema>) => {
      if (!tenantId) throw new Error("No tenant");
      const { error } = await supabase.from("leads").insert({ ...v, tenant_id: tenantId, email: v.email || null });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Lead added"); reset(); setOpen(false); qc.invalidateQueries({ queryKey: ["leads"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: typeof STAGES[number] }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id); if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });

  return (
    <>
      <PageHeader title="Leads" description="Sales pipeline" actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add lead</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New lead</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit((v) => create.mutate(v))} className="space-y-3">
              <div><Label>Name *</Label><Input {...register("name")} />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input {...register("phone")} /></div>
                <div><Label>Email</Label><Input type="email" {...register("email")} /></div>
              </div>
              <div><Label>Source</Label><Input {...register("source")} placeholder="Instagram, Walk-in…" /></div>
              <div><Label>Notes</Label><Input {...register("notes")} /></div>
              <DialogFooter><Button type="submit">Save</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <PageBody>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {STAGES.map((s) => {
            const items = (data ?? []).filter((l: any) => l.status === s);
            return (
              <div key={s} className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-3">
                  <h3 className="font-display text-sm uppercase tracking-wider">{s} <span className="ml-1 text-xs text-muted-foreground">({items.length})</span></h3>
                </div>
                <div className="max-h-[60vh] space-y-2 overflow-auto p-2">
                  {items.map((l: any) => (
                    <div key={l.id} className="rounded-md border border-border bg-secondary/40 p-2 text-sm">
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.phone || l.email || "—"}</div>
                      <Select value={l.status} onValueChange={(v) => update.mutate({ id: l.id, status: v as any })}>
                        <SelectTrigger className="mt-2 h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {STAGES.map((st) => <SelectItem key={st} value={st}>{st}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                  {items.length === 0 && <p className="p-2 text-center text-xs text-muted-foreground">Empty</p>}
                </div>
              </div>
            );
          })}
        </div>
      </PageBody>
    </>
  );
}
