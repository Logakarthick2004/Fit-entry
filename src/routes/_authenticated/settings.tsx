import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — FitFlow" }] }),
  component: Settings,
});

function Settings() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const qc = useQueryClient();
  const { register, handleSubmit } = useForm({ defaultValues: { name: active?.tenant.name, currency: active?.tenant.currency, timezone: active?.tenant.timezone, tax_percent: active?.tenant.tax_percent } });

  const saveTenant = useMutation({
    mutationFn: async (v: any) => {
      if (!tenantId) throw new Error("No tenant");
      const { error } = await supabase.from("tenants").update(v).eq("id", tenantId); if (error) throw error;
    },
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["my-tenants"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const { data: branches } = useQuery({
    enabled: !!tenantId,
    queryKey: ["branches", tenantId],
    queryFn: async () => (await supabase.from("branches").select("*").eq("tenant_id", tenantId!).order("created_at")).data ?? [],
  });

  const [bOpen, setBOpen] = useState(false);
  const bForm = useForm({ defaultValues: { name: "", address: "", phone: "" } });
  const addBranch = useMutation({
    mutationFn: async (v: any) => {
      if (!tenantId) throw new Error("No tenant");
      const { error } = await supabase.from("branches").insert({ ...v, tenant_id: tenantId }); if (error) throw error;
    },
    onSuccess: () => { toast.success("Branch added"); setBOpen(false); bForm.reset(); qc.invalidateQueries({ queryKey: ["branches"] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const delBranch = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("branches").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["branches"] }),
  });

  return (
    <>
      <PageHeader title="Settings" description="Workspace, branches, billing" />
      <PageBody>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-xl tracking-wide">GYM PROFILE</h3>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit((v) => saveTenant.mutate(v))}>
              <div><Label>Name</Label><Input {...register("name")} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Currency</Label><Input {...register("currency")} /></div>
                <div><Label>Timezone</Label><Input {...register("timezone")} /></div>
              </div>
              <div><Label>Tax %</Label><Input type="number" step="0.01" {...register("tax_percent")} /></div>
              <Button type="submit">Save</Button>
            </form>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl tracking-wide">BRANCHES</h3>
              <Dialog open={bOpen} onOpenChange={setBOpen}>
                <DialogTrigger asChild><Button size="sm"><Plus className="mr-1 h-4 w-4" /> Add</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>New branch</DialogTitle></DialogHeader>
                  <form onSubmit={bForm.handleSubmit((v) => addBranch.mutate(v))} className="space-y-3">
                    <div><Label>Name</Label><Input {...bForm.register("name", { required: true })} /></div>
                    <div><Label>Address</Label><Input {...bForm.register("address")} /></div>
                    <div><Label>Phone</Label><Input {...bForm.register("phone")} /></div>
                    <DialogFooter><Button type="submit">Save</Button></DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-4 space-y-2">
              {(branches ?? []).map((b: any) => (
                <div key={b.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
                  <div>
                    <div className="font-medium">{b.name} {b.is_main && <span className="ml-2 rounded bg-primary/15 px-1.5 py-0.5 text-xs text-primary">main</span>}</div>
                    <div className="text-xs text-muted-foreground">{b.address ?? ""} {b.phone ?? ""}</div>
                  </div>
                  {!b.is_main && <Button size="icon" variant="ghost" onClick={() => delBranch.mutate(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
