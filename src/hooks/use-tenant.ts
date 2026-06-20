import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TenantMembership {
  tenant_id: string;
  is_default: boolean;
  tenant: {
    id: string;
    name: string;
    slug: string;
    currency: string;
    timezone: string;
    status: string;
    logo_url: string | null;
    tax_percent: number;
  };
  roles: string[];
}

const ACTIVE_KEY = "fitflow.active_tenant";

export function getActiveTenantId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveTenantId(id: string) {
  if (typeof window !== "undefined") localStorage.setItem(ACTIVE_KEY, id);
}

export function useMyTenants() {
  return useQuery({
    queryKey: ["my-tenants"],
    queryFn: async (): Promise<TenantMembership[]> => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return [];
      const { data, error } = await supabase
        .from("user_tenants")
        .select("tenant_id, is_default, tenants(id, name, slug, currency, timezone, status, logo_url, tax_percent)")
        .eq("user_id", user.user.id);
      if (error) throw error;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("tenant_id, role")
        .eq("user_id", user.user.id);
      return (data ?? []).map((r: any) => ({
        tenant_id: r.tenant_id,
        is_default: r.is_default,
        tenant: r.tenants,
        roles: (roles ?? []).filter((x: any) => x.tenant_id === r.tenant_id || x.tenant_id === null).map((x: any) => x.role),
      }));
    },
  });
}

export function useActiveTenant() {
  const { data: tenants, isLoading } = useMyTenants();
  const activeId = typeof window !== "undefined" ? localStorage.getItem(ACTIVE_KEY) : null;
  const active = tenants?.find((t) => t.tenant_id === activeId) ?? tenants?.find((t) => t.is_default) ?? tenants?.[0];
  return { active, tenants: tenants ?? [], isLoading };
}
