import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody, EmptyState } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/memberships")({
  head: () => ({ meta: [{ title: "Memberships — FitFlow" }] }),
  component: Memberships,
});

const planSchema = z.object({
  name: z.string().min(2),
  duration_days: z.coerce.number().int().positive(),
  price: z.coerce.number().nonnegative(),
  description: z.string().optional(),
});

function Memberships() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const currency = active?.tenant.currency ?? "USD";
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(planSchema) });

  const { data: plans } = useQuery({
    enabled: !!tenantId,
    queryKey: ["membership_plans", tenantId],
    queryFn: async () => {
      const { data } = await supabase.from("membership_plans").select("*").eq("tenant_id", tenantId!).order("price");
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async (v: z.infer<typeof planSchema>) => {
      if (!tenantId) throw new Error("No tenant");
      const { error } = await supabase.from("membership_plans").insert({ ...v, tenant_id: tenantId });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Plan created"); reset(); setOpen(false); qc.invalidateQueries({ queryKey: ["membership_plans"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("membership_plans").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["membership_plans"] }),
  });

  return (
    <>
      <PageHeader title="Memberships" description="Plans and pricing" actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New plan</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New membership plan</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit((v) => create.mutate(v))} className="space-y-3">
              <div><Label>Name *</Label><Input {...register("name")} placeholder="Monthly Pass" />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Duration (days) *</Label><Input type="number" {...register("duration_days")} placeholder="30" /></div>
                <div><Label>Price *</Label><Input type="number" step="0.01" {...register("price")} /></div>
              </div>
              <div><Label>Description</Label><Input {...register("description")} /></div>
              <DialogFooter><Button type="submit" disabled={create.isPending}>Save</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <PageBody>
        {!plans || plans.length === 0 ? (
          <EmptyState title="No plans yet" hint="Create a Daily, Monthly, or Annual plan to get started." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p: any) => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl tracking-wide">{p.name.toUpperCase()}</h3>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.duration_days} days</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => del.mutate(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                <div className="mt-4 kpi-number text-primary">{formatCurrency(Number(p.price), currency)}</div>
                {p.description && <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}
