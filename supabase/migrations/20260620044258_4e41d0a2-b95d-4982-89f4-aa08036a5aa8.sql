
-- ============== MEMBERS ==============
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  gender TEXT,
  dob DATE,
  address TEXT,
  emergency_contact TEXT,
  photo_url TEXT,
  id_proof_url TEXT,
  status public.member_status NOT NULL DEFAULT 'active',
  notes TEXT,
  joined_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, code)
);
CREATE INDEX idx_members_tenant ON public.members(tenant_id);
CREATE INDEX idx_members_user ON public.members(user_id);
CREATE INDEX idx_members_phone ON public.members(tenant_id, phone);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.members TO authenticated;
GRANT ALL ON public.members TO service_role;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_members_updated BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant staff view members" ON public.members FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff insert members" ON public.members FOR INSERT
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]));
CREATE POLICY "Staff update members" ON public.members FOR UPDATE
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist','trainer']::public.app_role[]));
CREATE POLICY "Staff delete members" ON public.members FOR DELETE
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));

-- ============== MEMBERSHIP PLANS ==============
CREATE TABLE public.membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_mplans_tenant ON public.membership_plans(tenant_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.membership_plans TO authenticated;
GRANT ALL ON public.membership_plans TO service_role;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_mplans_updated BEFORE UPDATE ON public.membership_plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant members view plans" ON public.membership_plans FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage plans" ON public.membership_plans FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager']::public.app_role[]));

-- ============== MEMBER MEMBERSHIPS ==============
CREATE TABLE public.member_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.membership_plans(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status public.membership_status NOT NULL DEFAULT 'active',
  freeze_days INTEGER NOT NULL DEFAULT 0,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_mm_tenant ON public.member_memberships(tenant_id);
CREATE INDEX idx_mm_member ON public.member_memberships(member_id);
CREATE INDEX idx_mm_status ON public.member_memberships(tenant_id, status, end_date);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.member_memberships TO authenticated;
GRANT ALL ON public.member_memberships TO service_role;
ALTER TABLE public.member_memberships ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_mm_updated BEFORE UPDATE ON public.member_memberships FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant members view" ON public.member_memberships FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage memberships" ON public.member_memberships FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]));

-- ============== PAYMENTS ==============
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  membership_id UUID REFERENCES public.member_memberships(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  method public.payment_method NOT NULL DEFAULT 'cash',
  status public.payment_status NOT NULL DEFAULT 'paid',
  paid_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_payments_tenant ON public.payments(tenant_id);
CREATE INDEX idx_payments_member ON public.payments(member_id);
CREATE INDEX idx_payments_paid_at ON public.payments(tenant_id, paid_at);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant members view payments" ON public.payments FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage payments" ON public.payments FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]));

-- ============== INVOICES ==============
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL,
  number TEXT NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  tax NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'paid',
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, number)
);
CREATE INDEX idx_invoices_tenant ON public.invoices(tenant_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoices TO authenticated;
GRANT ALL ON public.invoices TO service_role;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_invoices_updated BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Tenant view invoices" ON public.invoices FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage invoices" ON public.invoices FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]));

CREATE TABLE public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  amount NUMERIC(10,2) NOT NULL
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoice_items TO authenticated;
GRANT ALL ON public.invoice_items TO service_role;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Items visible if invoice visible" ON public.invoice_items FOR ALL
  USING (EXISTS (SELECT 1 FROM public.invoices i WHERE i.id = invoice_id AND i.tenant_id IN (SELECT public.my_tenant_ids())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.invoices i WHERE i.id = invoice_id AND i.tenant_id IN (SELECT public.my_tenant_ids())));

-- ============== ATTENDANCE ==============
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  check_in TIMESTAMPTZ NOT NULL DEFAULT now(),
  check_out TIMESTAMPTZ,
  duration_minutes INTEGER,
  method public.attendance_method NOT NULL DEFAULT 'manual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_att_tenant_date ON public.attendance(tenant_id, check_in);
CREATE INDEX idx_att_member ON public.attendance(member_id, check_in);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance TO authenticated;
GRANT ALL ON public.attendance TO service_role;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view attendance" ON public.attendance FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff manage attendance" ON public.attendance FOR ALL
  USING (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist','trainer']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist','trainer']::public.app_role[]));

-- ============== QR TOKENS ==============
CREATE TABLE public.qr_tokens (
  token TEXT PRIMARY KEY,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);
CREATE INDEX idx_qr_member ON public.qr_tokens(member_id);
GRANT SELECT, INSERT, DELETE ON public.qr_tokens TO authenticated;
GRANT ALL ON public.qr_tokens TO service_role;
ALTER TABLE public.qr_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant view tokens" ON public.qr_tokens FOR SELECT
  USING (tenant_id IN (SELECT public.my_tenant_ids()));
CREATE POLICY "Staff create tokens" ON public.qr_tokens FOR INSERT
  WITH CHECK (public.has_any_role(auth.uid(), tenant_id, ARRAY['owner','manager','receptionist']::public.app_role[]));
