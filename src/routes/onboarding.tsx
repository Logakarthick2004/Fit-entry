import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMyTenants, setActiveTenantId } from "@/hooks/use-tenant";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Create gym — FitFlow" }] }),
  component: Onboarding,
});

const schema = z.object({
  gym_name: z.string().min(2),
  currency: z.string().default("USD"),
});

function Onboarding() {
  const navigate = useNavigate();
  const { data: tenants, refetch } = useMyTenants();
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues: { currency: "USD" } });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (!data.user) navigate({ to: "/auth" }); });
  }, [navigate]);

  const onSubmit = async (v: z.infer<typeof schema>) => {
    setBusy(true);
    const slug = v.gym_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
    const { data, error } = await supabase.rpc("create_tenant_for_owner", {
      _name: v.gym_name, _slug: slug, _currency: v.currency, _timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (data) setActiveTenantId(data as string);
    await refetch();
    toast.success("Gym created!");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8">
        <h1 className="font-display text-3xl tracking-wide">CREATE YOUR GYM</h1>
        <p className="text-sm text-muted-foreground">Set up your workspace. You can add branches later.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
          <div><Label>Gym name</Label><Input placeholder="Beast Mode Fitness" {...register("gym_name")} />{errors.gym_name && <p className="text-xs text-destructive">{errors.gym_name.message}</p>}</div>
          <div><Label>Currency</Label><Input placeholder="USD" {...register("currency")} /></div>
          <Button disabled={busy} className="w-full">Create gym</Button>
        </form>
        {tenants && tenants.length > 0 && (
          <button onClick={() => navigate({ to: "/dashboard" })} className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            ← Back to dashboard
          </button>
        )}
      </div>
    </div>
  );
}
