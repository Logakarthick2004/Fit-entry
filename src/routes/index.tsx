import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, BarChart3, QrCode, Users, Dumbbell, CreditCard, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitFlow ERP — Run your gym like a champion" },
      { name: "description", content: "All-in-one multi-tenant gym management platform: members, attendance, billing, trainers, workouts, diets, and reports." },
      { property: "og:title", content: "FitFlow ERP — Run your gym like a champion" },
      { property: "og:description", content: "All-in-one multi-tenant gym management platform." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl tracking-wider">FITFLOW</span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="rounded-md px-3 py-2 text-sm hover:bg-secondary">Sign in</Link>
            <Link to="/auth" search={{ mode: "signup" } as any}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Start free
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-display text-6xl leading-[0.95] tracking-wide md:text-8xl">
            RUN YOUR GYM<br />
            <span className="text-primary">LIKE A CHAMPION.</span>
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            FitFlow is the modern operating system for gyms and fitness franchises. Members, attendance, billing, trainers, workouts, leads — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" search={{ mode: "signup" } as any}
              className="rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90">
              Start your 14-day trial
            </Link>
            <Link to="/auth" className="rounded-md border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary">
              Sign in
            </Link>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-4">
            {[
              { k: "10K+", v: "Members managed" },
              { k: "120+", v: "Active gyms" },
              { k: "99.9%", v: "Uptime" },
              { k: "24/7", v: "Support" },
            ].map((s) => (
              <div key={s.v} className="rounded-lg border border-border bg-card p-5">
                <div className="kpi-number text-primary">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl tracking-wide md:text-5xl">EVERYTHING YOU NEED</h2>
          <p className="mt-2 text-muted-foreground">Built for single gyms, multi-branch chains and franchises.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { i: Users, t: "Members & CRM", d: "Profiles, documents, photos, membership history, and a sales pipeline for leads." },
              { i: QrCode, t: "QR Attendance", d: "Each member gets a personal QR. Scan with any phone at the front desk." },
              { i: CreditCard, t: "Billing & Invoices", d: "Plans, renewals, receipts, outstanding dues, and tax-ready invoices." },
              { i: Dumbbell, t: "Trainers & Plans", d: "Assign trainers, build workout splits and meal plans, track progress." },
              { i: BarChart3, t: "Reports", d: "Revenue, attendance, retention, and trainer performance dashboards." },
              { i: ShieldCheck, t: "Multi-tenant secure", d: "Row-level security on every table. Your data never crosses lanes." },
            ].map(({ i: Icon, t, d }) => (
              <motion.div key={t} whileHover={{ y: -4 }}
                className="rounded-xl border border-border bg-card p-6">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl tracking-wide md:text-5xl">SIMPLE PRICING</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { n: "Starter", p: 29, f: ["Up to 100 members", "1 branch", "QR attendance", "Email support"] },
              { n: "Growth", p: 79, f: ["Up to 500 members", "3 branches", "Trainers & diets", "Reports"], hi: true },
              { n: "Pro", p: 199, f: ["Up to 5k members", "20 branches", "API access", "Priority support"] },
            ].map((pl) => (
              <div key={pl.n} className={`rounded-xl border p-6 ${pl.hi ? "border-primary bg-card shadow-lg" : "border-border bg-card"}`}>
                {pl.hi && <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase text-primary"><Zap className="h-3 w-3" /> Popular</div>}
                <div className="font-display text-3xl tracking-wide">{pl.n.toUpperCase()}</div>
                <div className="mt-1 text-3xl font-bold">${pl.p}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {pl.f.map((x) => <li key={x}>• {x}</li>)}
                </ul>
                <Link to="/auth" search={{ mode: "signup" } as any}
                  className="mt-6 block rounded-md bg-primary py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> FitFlow ERP © 2026
          </div>
          <div className="flex gap-4">
            <Link to="/auth">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
