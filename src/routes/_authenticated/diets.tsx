import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const Route = createFileRoute("/_authenticated/diets")({
  head: () => ({ meta: [{ title: "Diets — FitFlow" }] }),
  component: Diets,
});

const schema = z.object({
  name: z.string().min(2),
  category: z.string().optional(),
  total_calories: z.coerce.number().int().optional(),
  description: z.string().optional(),
});

function Diets() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const { data } = useQuery({
    enabled: !!tenantId,
    queryKey: ["diet_plans", tenantId],
    queryFn: async () => {
      const { data } = await supabase.from("diet_plans").select("*").eq("tenant_id", tenantId!).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async (v: z.infer<typeof schema>) => {
      if (!tenantId) throw new Error("No tenant");
      const { error } = await supabase.from("diet_plans").insert({ ...v, tenant_id: tenantId });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Diet created"); reset(); setOpen(false); qc.invalidateQueries({ queryKey: ["diet_plans"] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("diet_plans").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["diet_plans"] }),
  });

  return (
    <>
      <PageHeader title="Diets" description="Meal plan templates" actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New diet</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New diet plan</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit((v) => create.mutate(v))} className="space-y-3">
              <div><Label>Name *</Label><Input {...register("name")} placeholder="Lean Bulk 2500" />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Category</Label><Input {...register("category")} placeholder="weight_loss / muscle_gain" /></div>
                <div><Label>Total kcal</Label><Input type="number" {...register("total_calories")} /></div>
              </div>
              <div><Label>Description</Label><Input {...register("description")} /></div>
              <DialogFooter><Button type="submit" disabled={create.isPending}>Save</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <PageBody>
        {!data || data.length === 0 ? <EmptyState title="No diet plans" hint="Create your first meal template." /> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p: any) => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl tracking-wide">{p.name.toUpperCase()}</h3>
                    <p className="text-xs uppercase text-muted-foreground">{p.category ?? "general"}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => del.mutate(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                {p.total_calories && <p className="mt-3 kpi-number text-accent">{p.total_calories}<span className="text-sm font-normal text-muted-foreground"> kcal</span></p>}
                {p.description && <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}
