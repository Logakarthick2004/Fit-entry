import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, icon: Icon, hint, accent,
}: { label: string; value: string | number; icon: LucideIcon; hint?: string; accent?: "primary" | "accent" | "success" | "warning" | "destructive" }) {
  const tone = accent ?? "primary";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={cn(
          "grid h-9 w-9 place-items-center rounded-md",
          tone === "primary" && "bg-primary/15 text-primary",
          tone === "accent" && "bg-accent/15 text-accent",
          tone === "success" && "bg-success/15 text-success",
          tone === "warning" && "bg-warning/15 text-warning",
          tone === "destructive" && "bg-destructive/15 text-destructive",
        )}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3 kpi-number">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </motion.div>
  );
}
