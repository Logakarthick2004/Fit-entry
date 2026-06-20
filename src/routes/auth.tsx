import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Dumbbell, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "login" | "signup" | "forgot";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({ mode: (s.mode as Mode) ?? undefined, redirect: (s.redirect as string) ?? undefined }),
  head: () => ({ meta: [{ title: "Sign in — FitFlow ERP" }] }),
  component: AuthPage,
});

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
const signupSchema = z.object({
  full_name: z.string().min(2),
  gym_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "At least 8 characters"),
});
const forgotSchema = z.object({ email: z.string().email() });

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(search.mode ?? "login");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 gradient-orange" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white/15 backdrop-blur"><Dumbbell className="h-5 w-5" /></span>
            <span className="font-display text-2xl tracking-wider">FITFLOW</span>
          </Link>
          <div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-display text-5xl leading-[0.95] tracking-wide md:text-7xl">
              SWEAT. SCALE.<br />SUCCEED.
            </motion.h2>
            <p className="mt-4 max-w-md text-white/85">
              Membership, attendance, payments, trainers — all in one operating system designed for gyms that grow.
            </p>
          </div>
          <div className="text-xs uppercase tracking-wider text-white/70">Trusted by 120+ gyms worldwide</div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden mb-6 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" /> <span className="font-display text-xl">FITFLOW</span>
          </Link>
          {mode === "login" && <LoginForm onSwitch={setMode} busy={busy} setBusy={setBusy} redirect={search.redirect} />}
          {mode === "signup" && <SignupForm onSwitch={setMode} busy={busy} setBusy={setBusy} />}
          {mode === "forgot" && <ForgotForm onSwitch={setMode} busy={busy} setBusy={setBusy} />}
        </div>
      </div>
    </div>
  );
}

function GoogleButton({ busy }: { busy: boolean }) {
  const onClick = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard"
      }
    });
    if (error) toast.error(error.message ?? "Google sign-in failed");
  };
  return (
    <Button type="button" variant="outline" disabled={busy} onClick={onClick} className="w-full">
      <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="#EA4335" d="M12 10.2v3.96h5.55c-.24 1.5-1.74 4.38-5.55 4.38-3.33 0-6.06-2.76-6.06-6.18s2.73-6.18 6.06-6.18c1.92 0 3.18.81 3.9 1.5l2.64-2.55C16.83 3.45 14.64 2.4 12 2.4 6.69 2.4 2.4 6.69 2.4 12s4.29 9.6 9.6 9.6c5.55 0 9.21-3.9 9.21-9.39 0-.63-.06-1.11-.15-1.56H12z"/></svg>
      Continue with Google
    </Button>
  );
}

function LoginForm({ onSwitch, busy, setBusy, redirect }: { onSwitch: (m: Mode) => void; busy: boolean; setBusy: (b: boolean) => void; redirect?: string }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
  const onSubmit = async (v: z.infer<typeof loginSchema>) => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(v);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    navigate({ to: redirect ?? "/dashboard" });
  };
  return (
    <>
      <h1 className="font-display text-3xl tracking-wide">SIGN IN</h1>
      <p className="text-sm text-muted-foreground">Welcome back. Let's get to work.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div><Label>Email</Label><Input type="email" autoComplete="email" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
        <div><Label>Password</Label><Input type="password" autoComplete="current-password" {...register("password")} />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}</div>
        <Button disabled={busy} className="w-full font-semibold">{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign in</Button>
      </form>
      <div className="my-4 flex items-center gap-2 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" /></div>
      <GoogleButton busy={busy} />
      <div className="mt-6 flex justify-between text-sm">
        <button onClick={() => onSwitch("forgot")} className="text-muted-foreground hover:text-foreground">Forgot password?</button>
        <button onClick={() => onSwitch("signup")} className="font-medium text-primary hover:underline">Create account</button>
      </div>
    </>
  );
}

function SignupForm({ onSwitch, busy, setBusy }: { onSwitch: (m: Mode) => void; busy: boolean; setBusy: (b: boolean) => void }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });
  const onSubmit = async (v: z.infer<typeof signupSchema>) => {
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: v.email,
      password: v.password,
      options: { data: { full_name: v.full_name, gym_name: v.gym_name }, emailRedirectTo: window.location.origin + "/dashboard" },
    });
    if (error) { setBusy(false); return toast.error(error.message); }
    if (data.session) {
      const slug = v.gym_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
      const { error: rpcErr } = await supabase.rpc("create_tenant_for_owner", { _name: v.gym_name, _slug: slug, _currency: "USD", _timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
      setBusy(false);
      if (rpcErr) return toast.error("Account created but workspace setup failed: " + rpcErr.message);
      toast.success("Welcome to FitFlow!");
      navigate({ to: "/dashboard" });
    } else {
      setBusy(false);
      toast.success("Check your email to confirm.");
    }
  };
  return (
    <>
      <h1 className="font-display text-3xl tracking-wide">START YOUR GYM</h1>
      <p className="text-sm text-muted-foreground">14-day free trial. No credit card.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
        <div><Label>Your name</Label><Input {...register("full_name")} />{errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name.message}</p>}</div>
        <div><Label>Gym name</Label><Input placeholder="Beast Mode Fitness" {...register("gym_name")} />{errors.gym_name && <p className="mt-1 text-xs text-destructive">{errors.gym_name.message}</p>}</div>
        <div><Label>Email</Label><Input type="email" autoComplete="email" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
        <div><Label>Password</Label><Input type="password" autoComplete="new-password" {...register("password")} />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}</div>
        <Button disabled={busy} className="w-full font-semibold">{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create account</Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account? <button onClick={() => onSwitch("login")} className="font-medium text-primary hover:underline">Sign in</button>
      </div>
    </>
  );
}

function ForgotForm({ onSwitch, busy, setBusy }: { onSwitch: (m: Mode) => void; busy: boolean; setBusy: (b: boolean) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(forgotSchema) });
  const onSubmit = async (v: z.infer<typeof forgotSchema>) => {
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(v.email, { redirectTo: window.location.origin + "/reset-password" });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password reset email sent.");
    onSwitch("login");
  };
  return (
    <>
      <h1 className="font-display text-3xl tracking-wide">RESET PASSWORD</h1>
      <p className="text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
        <div><Label>Email</Label><Input type="email" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
        <Button disabled={busy} className="w-full">{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send reset link</Button>
      </form>
      <button onClick={() => onSwitch("login")} className="mt-4 text-sm text-muted-foreground hover:text-foreground">← Back to sign in</button>
    </>
  );
}
