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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/trainers")({
  head: () => ({ meta: [{ title: "Trainers — FitFlow" }] }),
  component: Trainers,
});

const schema = z.object({
  full_name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  bio: z.string().optional(),
  specialties: z.string().optional(),
  salary: z.coerce.number().nonnegative().optional(),
});

function Trainers() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const { data } = useQuery({
    enabled: !!tenantId,
    queryKey: ["trainers", tenantId],
    queryFn: async () => {
      const { data } = await supabase.from("trainers").select("*").eq("tenant_id", tenantId!).order("full_name");
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async (v: z.infer<typeof schema>) => {
      if (!tenantId) throw new Error("No tenant");
      const { error } = await supabase.from("trainers").insert({
        tenant_id: tenantId, full_name: v.full_name, phone: v.phone || null, email: v.email || null,
        bio: v.bio || null, specialties: v.specialties ? v.specialties.split(",").map((s) => s.trim()) : [],
        salary: v.salary || 0,
      });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Trainer added"); reset(); setOpen(false); qc.invalidateQueries({ queryKey: ["trainers"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("trainers").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trainers"] }),
  });

  return (
    <>
      <PageHeader title="Trainers" description="Manage trainers and assignments" actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add trainer</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New trainer</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit((v) => create.mutate(v))} className="space-y-3">
              <div><Label>Full name *</Label><Input {...register("full_name")} />{errors.full_name && <p className="text-xs text-destructive">{errors.full_name.message}</p>}</div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input {...register("phone")} /></div>
                <div><Label>Email</Label><Input type="email" {...register("email")} /></div>
              </div>
              <div><Label>Specialties</Label><Input {...register("specialties")} placeholder="Strength, HIIT, Yoga" /></div>
              <div><Label>Bio</Label><Input {...register("bio")} /></div>
              <div><Label>Salary</Label><Input type="number" step="0.01" {...register("salary")} /></div>
              <DialogFooter><Button type="submit" disabled={create.isPending}>Save</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <PageBody>
        {!data || data.length === 0 ? <EmptyState title="No trainers yet" hint="Add your first trainer." /> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((t: any) => (
              <div key={t.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12"><AvatarFallback>{initials(t.full_name)}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{t.full_name}</h3>
                    <p className="text-xs text-muted-foreground">{t.phone ?? t.email ?? ""}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => del.mutate(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                {t.specialties?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.specialties.map((s: string) => <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-xs">{s}</span>)}
                  </div>
                )}
                {t.bio && <p className="mt-2 text-sm text-muted-foreground">{t.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}
