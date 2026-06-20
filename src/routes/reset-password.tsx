import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — FitFlow" }] }),
  component: ResetPassword,
});

const schema = z.object({ password: z.string().min(8) });

function ResetPassword() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (v: z.infer<typeof schema>) => {
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: v.password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated.");
    navigate({ to: "/dashboard" });
  };
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl tracking-wide">SET NEW PASSWORD</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
          <div><Label>New password</Label><Input type="password" {...register("password")} />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}</div>
          <Button disabled={busy} className="w-full">Update password</Button>
        </form>
      </div>
    </div>
  );
}
