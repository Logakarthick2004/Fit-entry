import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTenant } from "@/hooks/use-tenant";

export function useDashboardStats() {
  const { active } = useActiveTenant();
  const tenantId = active?.tenant_id;
  return useQuery({
    enabled: !!tenantId,
    queryKey: ["dashboard-stats", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("No tenant");
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const [members, active_mm, expired_mm, attendance_today, payments_month, trainers, branches] = await Promise.all([
        supabase.from("members").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId),
        supabase.from("member_memberships").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId).eq("status", "active"),
        supabase.from("member_memberships").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId).eq("status", "expired"),
        supabase.from("attendance").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId).gte("check_in", today.toISOString()),
        supabase.from("payments").select("amount").eq("tenant_id", tenantId).eq("status", "paid").gte("paid_at", monthStart.toISOString()),
        supabase.from("trainers").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId).eq("is_active", true),
        supabase.from("branches").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId),
      ]);

      const revenue = (payments_month.data ?? []).reduce((s, p: any) => s + Number(p.amount || 0), 0);

      // 6-month revenue trend
      const trendStart = new Date(today.getFullYear(), today.getMonth() - 5, 1);
      const { data: trend } = await supabase.from("payments")
        .select("amount, paid_at").eq("tenant_id", tenantId).eq("status", "paid").gte("paid_at", trendStart.toISOString());
      const monthBuckets: Record<string, number> = {};
      for (let i = 0; i < 6; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1);
        monthBuckets[`${d.getFullYear()}-${d.getMonth()}`] = 0;
      }
      (trend ?? []).forEach((p: any) => {
        const d = new Date(p.paid_at);
        const k = `${d.getFullYear()}-${d.getMonth()}`;
        if (monthBuckets[k] !== undefined) monthBuckets[k] += Number(p.amount || 0);
      });
      const revenueTrend = Object.entries(monthBuckets).map(([k, v]) => {
        const [y, m] = k.split("-").map(Number);
        return { month: new Date(y, m, 1).toLocaleDateString("en-US", { month: "short" }), revenue: Math.round(v) };
      });

      // attendance trend last 7 days
      const sevenStart = new Date(today); sevenStart.setDate(sevenStart.getDate() - 6);
      const { data: att } = await supabase.from("attendance")
        .select("check_in").eq("tenant_id", tenantId).gte("check_in", sevenStart.toISOString());
      const dayBuckets: Record<string, number> = {};
      for (let i = 0; i < 7; i++) {
        const d = new Date(today); d.setDate(d.getDate() - (6 - i));
        dayBuckets[d.toISOString().slice(0, 10)] = 0;
      }
      (att ?? []).forEach((a: any) => {
        const k = new Date(a.check_in).toISOString().slice(0, 10);
        if (dayBuckets[k] !== undefined) dayBuckets[k] += 1;
      });
      const attendanceTrend = Object.entries(dayBuckets).map(([d, v]) => ({
        day: new Date(d).toLocaleDateString("en-US", { weekday: "short" }), checkins: v,
      }));

      // outstanding dues
      const { data: dues } = await supabase.from("payments")
        .select("amount").eq("tenant_id", tenantId).eq("status", "pending");
      const outstanding = (dues ?? []).reduce((s, p: any) => s + Number(p.amount || 0), 0);

      return {
        totalMembers: members.count ?? 0,
        activeMembers: active_mm.count ?? 0,
        expiredMembers: expired_mm.count ?? 0,
        todayCheckins: attendance_today.count ?? 0,
        monthlyRevenue: revenue,
        outstanding,
        trainers: trainers.count ?? 0,
        branches: branches.count ?? 0,
        revenueTrend,
        attendanceTrend,
      };
    },
  });
}
