import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";
import { PageHeader, PageBody, EmptyState } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Search, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/members")({
  head: () => ({ meta: [{ title: "Members — FitFlow" }] }),
  component: MembersPage,
});

const memberSchema = z.object({
  full_name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  gender: z.string().optional(),
  dob: z.string().optional(),
  address: z.string().optional(),
  emergency_contact: z.string().optional(),
});

function MembersPage() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    enabled: !!tenantId,
    queryKey: ["members", tenantId, q],
    queryFn: async () => {
      let qq = supabase.from("members").select("id, code, full_name, phone, email, status, joined_at, photo_url")
        .eq("tenant_id", tenantId!).order("created_at", { ascending: false }).limit(200);
      if (q) qq = qq.ilike("full_name", `%${q}%`);
      const { data, error } = await qq;
      if (error) throw error;
      return data ?? [];
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(memberSchema) });

  const create = useMutation({
    mutationFn: async (v: z.infer<typeof memberSchema>) => {
      if (!tenantId) throw new Error("No tenant");
      const code = "M" + Date.now().toString().slice(-7);
      const { error } = await supabase.from("members").insert({
        tenant_id: tenantId, code, full_name: v.full_name,
        phone: v.phone || null, email: v.email || null, gender: v.gender || null,
        dob: v.dob || null, address: v.address || null, emergency_contact: v.emergency_contact || null,
      });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Member added"); setOpen(false); reset(); qc.invalidateQueries({ queryKey: ["members"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader title="Members" description="Manage gym members" actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add member</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New member</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit((v) => create.mutate(v))} className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label>Full name *</Label><Input {...register("full_name")} />{errors.full_name && <p className="text-xs text-destructive">{errors.full_name.message}</p>}</div>
              <div><Label>Phone</Label><Input {...register("phone")} /></div>
              <div><Label>Email</Label><Input type="email" {...register("email")} /></div>
              <div><Label>Gender</Label><Input {...register("gender")} placeholder="male / female / other" /></div>
              <div><Label>DOB</Label><Input type="date" {...register("dob")} /></div>
              <div className="sm:col-span-2"><Label>Address</Label><Input {...register("address")} /></div>
              <div className="sm:col-span-2"><Label>Emergency contact</Label><Input {...register("emergency_contact")} /></div>
              <DialogFooter className="sm:col-span-2"><Button type="submit" disabled={create.isPending}>Save</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <PageBody>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search members…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> :
          !data || data.length === 0 ? (
            <EmptyState title="No members yet" hint="Add your first member to get started." />
          ) : (
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Phone</th>
                    <th className="px-4 py-3 hidden md:table-cell">Status</th>
                    <th className="px-4 py-3 hidden md:table-cell">Joined</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((m: any) => (
                    <tr key={m.id} className="border-t border-border hover:bg-secondary/30">
                      <td className="px-4 py-3 font-mono text-xs">{m.code}</td>
                      <td className="px-4 py-3 font-medium">{m.full_name}</td>
                      <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{m.phone ?? "—"}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${m.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{m.status}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{formatDate(m.joined_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link to="/members/$id" params={{ id: m.id }} className="inline-flex items-center text-primary hover:underline">
                          View <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
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
