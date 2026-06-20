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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/workouts")({
  head: () => ({ meta: [{ title: "Workouts — FitFlow" }] }),
  component: Workouts,
});

const schema = z.object({
  name: z.string().min(2),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  goal: z.string().optional(),
  description: z.string().optional(),
});

function Workouts() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues: { level: "beginner" as const } });
  const level = watch("level");

  const { data } = useQuery({
    enabled: !!tenantId,
    queryKey: ["workout_plans", tenantId],
    queryFn: async () => {
      const { data } = await supabase.from("workout_plans").select("*, workout_exercises(id)").eq("tenant_id", tenantId!).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async (v: z.infer<typeof schema>) => {
      if (!tenantId) throw new Error("No tenant");
      const { error } = await supabase.from("workout_plans").insert({ ...v, tenant_id: tenantId });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Plan created"); reset(); setOpen(false); qc.invalidateQueries({ queryKey: ["workout_plans"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("workout_plans").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workout_plans"] }),
  });

  return (
    <>
      <PageHeader title="Workouts" description="Plan templates" actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New plan</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New workout plan</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit((v) => create.mutate(v))} className="space-y-3">
              <div><Label>Name *</Label><Input {...register("name")} placeholder="Push Pull Legs" />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
              <div><Label>Level</Label>
                <Select value={level} onValueChange={(v) => setValue("level", v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Goal</Label><Input {...register("goal")} placeholder="Muscle gain" /></div>
              <div><Label>Description</Label><Input {...register("description")} /></div>
              <DialogFooter><Button type="submit" disabled={create.isPending}>Save</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <PageBody>
        {!data || data.length === 0 ? <EmptyState title="No workout plans" hint="Create a beginner, intermediate, or advanced plan." /> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p: any) => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl tracking-wide">{p.name.toUpperCase()}</h3>
                    <p className="text-xs uppercase text-muted-foreground">{p.level} · {p.goal ?? "general"}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => del.mutate(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{p.description ?? "No description"}</p>
                <p className="mt-3 text-xs text-muted-foreground">{p.workout_exercises?.length ?? 0} exercises</p>
              </div>
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}
