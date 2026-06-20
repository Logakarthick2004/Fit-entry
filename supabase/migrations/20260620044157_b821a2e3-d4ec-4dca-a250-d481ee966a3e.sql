
-- ============== ENUMS ==============
CREATE TYPE public.app_role AS ENUM ('super_admin','owner','manager','receptionist','trainer','member');
CREATE TYPE public.tenant_status AS ENUM ('trial','active','suspended','cancelled');
CREATE TYPE public.member_status AS ENUM ('active','inactive','expired','frozen','cancelled');
CREATE TYPE public.membership_status AS ENUM ('active','expired','frozen','cancelled');
CREATE TYPE public.payment_method AS ENUM ('cash','upi','credit_card','debit_card','bank_transfer','other');
CREATE TYPE public.payment_status AS ENUM ('paid','pending','failed','refunded');
CREATE TYPE public.attendance_method AS ENUM ('qr','manual','code');
CREATE TYPE public.lead_status AS ENUM ('new','contacted','interested','trial','converted','lost');
CREATE TYPE public.workout_level AS ENUM ('beginner','intermediate','advanced');

-- ============== UPDATED_AT TRIGGER ==============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============== SUBSCRIPTION PLANS (platform-wide) ==============
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_monthly NUMERIC(10,2) NOT NULL DEFAULT 0,
  max_members INTEGER,
  max_branches INTEGER,
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subscription_plans TO authenticated, anon;
GRANT ALL ON public.subscription_plans TO service_role;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Plans readable by all" ON public.subscription_plans FOR SELECT USING (true);

-- ============== TENANTS ==============
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  currency TEXT NOT NULL DEFAULT 'USD',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  status public.tenant_status NOT NULL DEFAULT 'trial',
  plan_id UUID REFERENCES public.subscription_plans(id),
  trial_ends_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '14 days'),
  tax_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.tenants TO authenticated;
GRANT ALL ON public.tenants TO service_role;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============== USER <-> TENANT mapping ==============
CREATE TABLE public.user_tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tenant_id)
);
CREATE INDEX idx_user_tenants_user ON public.user_tenants(user_id);
CREATE INDEX idx_user_tenants_tenant ON public.user_tenants(tenant_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_tenants TO authenticated;
GRANT ALL ON public.user_tenants TO service_role;
ALTER TABLE public.user_tenants ENABLE ROW LEVEL SECURITY;

-- ============== USER ROLES (tenant-scoped) ==============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tenant_id, role)
);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_tenant ON public.user_roles(tenant_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ============== PROFILES ==============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============== HELPER FUNCTIONS (security definer) ==============
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _tenant_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (tenant_id = _tenant_id OR tenant_id IS NULL)
  );
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID, _tenant_id UUID, _roles public.app_role[])
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = ANY(_roles)
      AND (tenant_id = _tenant_id OR tenant_id IS NULL)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_tenant_member(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_tenants
    WHERE user_id = _user_id AND tenant_id = _tenant_id
  );
$$;

CREATE OR REPLACE FUNCTION public.my_tenant_ids()
RETURNS SETOF UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT tenant_id FROM public.user_tenants WHERE user_id = auth.uid();
$$;

-- ============== TENANT/USER POLICIES ==============
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR auth.uid() IS NOT NULL);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "User views own memberships" ON public.user_tenants FOR SELECT
  USING (user_id = auth.uid() OR tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Owner adds users to tenant" ON public.user_tenants FOR INSERT
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]) OR user_id = auth.uid());
CREATE POLICY "Owner removes users" ON public.user_tenants FOR DELETE
  USING (public.has_role(auth.uid(), tenant_id, 'owner'));

CREATE POLICY "User views own roles or tenant roles" ON public.user_roles FOR SELECT
  USING (user_id = auth.uid() OR tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Owner manages roles" ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), tenant_id, 'owner') OR (tenant_id IS NULL AND auth.uid() = user_id));
CREATE POLICY "Owner updates roles" ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), tenant_id, 'owner'));
CREATE POLICY "Owner deletes roles" ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), tenant_id, 'owner'));

CREATE POLICY "Members view own tenant" ON public.tenants FOR SELECT
  USING (id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Anyone can create tenant (signup)" ON public.tenants FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Owners update tenant" ON public.tenants FOR UPDATE
  USING (public.has_any_role(auth.uid(), id, ARRAY['owner','manager']::public.app_role[]));

-- ============== BRANCHES ==============
CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  is_main BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_branches_tenant ON public.branches(tenant_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.branches TO authenticated;
GRANT ALL ON public.branches TO service_role;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_branches_updated BEFORE UPDATE ON public.branches FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant members view branches" ON public.branches FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage branches" ON public.branches FOR INSERT
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));
CREATE POLICY "Staff update branches" ON public.branches FOR UPDATE
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));
CREATE POLICY "Staff delete branches" ON public.branches FOR DELETE
  USING (public.has_role(auth.uid(), tenant_id, 'owner'));

-- ============== SETTINGS (per tenant) ==============
CREATE TABLE public.settings (
  tenant_id UUID PRIMARY KEY REFERENCES public.tenants(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant members view settings" ON public.settings FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Owners update settings" ON public.settings FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));

-- ============== AUTO-CREATE PROFILE ON SIGNUP ==============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============== SEED SUBSCRIPTION PLANS ==============
INSERT INTO public.subscription_plans (name, price_monthly, max_members, max_branches, features) VALUES
  ('Starter', 29, 100, 1, '{"reports":true,"qr":true}'::jsonb),
  ('Growth', 79, 500, 3, '{"reports":true,"qr":true,"trainers":true,"diets":true}'::jsonb),
  ('Pro', 199, 5000, 20, '{"reports":true,"qr":true,"trainers":true,"diets":true,"api":true,"priority_support":true}'::jsonb);
