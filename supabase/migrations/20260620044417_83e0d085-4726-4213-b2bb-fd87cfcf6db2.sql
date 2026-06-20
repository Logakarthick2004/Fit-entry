
-- ============== TRAINERS ==============
CREATE TABLE public.trainers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  specialties TEXT[] DEFAULT '{}',
  bio TEXT,
  photo_url TEXT,
  commission_pct NUMERIC(5,2) DEFAULT 0,
  salary NUMERIC(10,2) DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_trainers_tenant ON public.trainers(tenant_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trainers TO authenticated;
GRANT ALL ON public.trainers TO service_role;
ALTER TABLE public.trainers ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_trainers_updated BEFORE UPDATE ON public.trainers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant view trainers" ON public.trainers FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage trainers" ON public.trainers FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));

CREATE TABLE public.trainer_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES public.trainers(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (trainer_id, member_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trainer_assignments TO authenticated;
GRANT ALL ON public.trainer_assignments TO service_role;
ALTER TABLE public.trainer_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view assignments" ON public.trainer_assignments FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage assignments" ON public.trainer_assignments FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]));

-- ============== WORKOUTS ==============
CREATE TABLE public.workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  trainer_id UUID REFERENCES public.trainers(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  level public.workout_level NOT NULL DEFAULT 'beginner',
  goal TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workout_plans TO authenticated;
GRANT ALL ON public.workout_plans TO service_role;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_wp_updated BEFORE UPDATE ON public.workout_plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant view workouts" ON public.workout_plans FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage workouts" ON public.workout_plans FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]));

CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  muscle_group TEXT,
  sets INTEGER DEFAULT 3,
  reps TEXT DEFAULT '10',
  weight TEXT,
  day_of_week INTEGER DEFAULT 1,
  notes TEXT,
  position INTEGER DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workout_exercises TO authenticated;
GRANT ALL ON public.workout_exercises TO service_role;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exercises follow plan" ON public.workout_exercises FOR ALL
  USING (EXISTS (SELECT 1 FROM public.workout_plans p WHERE p.id = plan_id AND p.tenant_id IN (SELECT public.my_tenant_ids())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.workout_plans p WHERE p.id = plan_id AND p.tenant_id IN (SELECT public.my_tenant_ids())));

CREATE TABLE public.member_workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (member_id, plan_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.member_workouts TO authenticated;
GRANT ALL ON public.member_workouts TO service_role;
ALTER TABLE public.member_workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view mw" ON public.member_workouts FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage mw" ON public.member_workouts FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]));

-- ============== DIETS ==============
CREATE TABLE public.diet_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  total_calories INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diet_plans TO authenticated;
GRANT ALL ON public.diet_plans TO service_role;
ALTER TABLE public.diet_plans ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_dp_updated BEFORE UPDATE ON public.diet_plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant view diets" ON public.diet_plans FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage diets" ON public.diet_plans FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]));

CREATE TABLE public.diet_meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.diet_plans(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL,
  name TEXT NOT NULL,
  calories INTEGER,
  items JSONB DEFAULT '[]'::jsonb,
  position INTEGER DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diet_meals TO authenticated;
GRANT ALL ON public.diet_meals TO service_role;
ALTER TABLE public.diet_meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Meals follow plan" ON public.diet_meals FOR ALL
  USING (EXISTS (SELECT 1 FROM public.diet_plans p WHERE p.id = plan_id AND p.tenant_id IN (SELECT public.my_tenant_ids())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.diet_plans p WHERE p.id = plan_id AND p.tenant_id IN (SELECT public.my_tenant_ids())));

CREATE TABLE public.member_diets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.diet_plans(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (member_id, plan_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.member_diets TO authenticated;
GRANT ALL ON public.member_diets TO service_role;
ALTER TABLE public.member_diets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view md" ON public.member_diets FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage md" ON public.member_diets FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','trainer']::public.app_role[]));

-- ============== LEADS ==============
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  source TEXT,
  status public.lead_status NOT NULL DEFAULT 'new',
  notes TEXT,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_leads_tenant_status ON public.leads(tenant_id, status);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant view leads" ON public.leads FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage leads" ON public.leads FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]));

CREATE TABLE public.lead_followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_followups TO authenticated;
GRANT ALL ON public.lead_followups TO service_role;
ALTER TABLE public.lead_followups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Followups follow lead" ON public.lead_followups FOR ALL
  USING (EXISTS (SELECT 1 FROM public.leads l WHERE l.id = lead_id AND l.tenant_id IN (SELECT public.my_tenant_ids())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.leads l WHERE l.id = lead_id AND l.tenant_id IN (SELECT public.my_tenant_ids())));

-- ============== EXPENSES ==============
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  spent_on DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_expenses_tenant ON public.expenses(tenant_id, spent_on);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.expenses TO authenticated;
GRANT ALL ON public.expenses TO service_role;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view expenses" ON public.expenses FOR SELECT USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage expenses" ON public.expenses FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));

-- ============== AUDIT LOGS ==============
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity TEXT,
  entity_id TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_tenant ON public.audit_logs(tenant_id, created_at);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view audit" ON public.audit_logs FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()) AND public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));
CREATE POLICY "Anyone can write audit" ON public.audit_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============== SUBSCRIPTIONS (tenant->plan) ==============
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'trial',
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  renewed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view subs" ON public.subscriptions FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Owners manage subs" ON public.subscriptions FOR ALL
  USING (public.has_role(auth.uid(), tenant_id, 'owner'))
  WITH CHECK (public.has_role(auth.uid(), tenant_id, 'owner'));

-- ============== STORAGE POLICIES ==============
-- member-photos (private). Path: <tenant_id>/<member_id>/...
CREATE POLICY "Tenant read photos" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'member-photos' AND (split_part(name,'/',1))::uuid IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff upload photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'member-photos' AND public.has_any_role(auth.uid(), (split_part(name,'/',1))::uuid, ARRAY['owner','manager','receptionist']::public.app_role[]));
CREATE POLICY "Staff update photos" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'member-photos' AND public.has_any_role(auth.uid(), (split_part(name,'/',1))::uuid, ARRAY['owner','manager','receptionist']::public.app_role[]));
CREATE POLICY "Staff delete photos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'member-photos' AND public.has_any_role(auth.uid(), (split_part(name,'/',1))::uuid, ARRAY['owner','manager']::public.app_role[]));

CREATE POLICY "Tenant read docs" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'member-documents' AND (split_part(name,'/',1))::uuid IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff upload docs" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'member-documents' AND public.has_any_role(auth.uid(), (split_part(name,'/',1))::uuid, ARRAY['owner','manager','receptionist']::public.app_role[]));
CREATE POLICY "Staff delete docs" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'member-documents' AND public.has_any_role(auth.uid(), (split_part(name,'/',1))::uuid, ARRAY['owner','manager']::public.app_role[]));

-- ============== signup helper: create tenant + owner role + main branch + trial sub ==============
CREATE OR REPLACE FUNCTION public.create_tenant_for_owner(_name TEXT, _slug TEXT, _currency TEXT DEFAULT 'USD', _timezone TEXT DEFAULT 'UTC')
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _tenant_id UUID;
  _plan_id UUID;
  _uid UUID := auth.uid();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT id INTO _plan_id FROM public.subscription_plans WHERE name = 'Starter' LIMIT 1;

  INSERT INTO public.tenants (name, slug, currency, timezone, status, plan_id)
  VALUES (_name, _slug, _currency, _timezone, 'trial', _plan_id)
  RETURNING id INTO _tenant_id;

  INSERT INTO public.user_tenants (user_id, tenant_id, is_default) VALUES (_uid, _tenant_id, true);
  INSERT INTO public.user_roles (user_id, tenant_id, role) VALUES (_uid, _tenant_id, 'owner');
  INSERT INTO public.branches (tenant_id, name, is_main) VALUES (_tenant_id, 'Main Branch', true);
  INSERT INTO public.settings (tenant_id, data) VALUES (_tenant_id, '{}'::jsonb);
  INSERT INTO public.subscriptions (tenant_id, plan_id, status, started_at, expires_at)
    VALUES (_tenant_id, _plan_id, 'trial', now(), now() + INTERVAL '14 days');

  RETURN _tenant_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_tenant_for_owner(TEXT, TEXT, TEXT, TEXT) TO authenticated;
