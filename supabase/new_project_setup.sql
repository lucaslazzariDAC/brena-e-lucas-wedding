-- Run this once in your NEW Supabase project's SQL Editor
-- (Dashboard > SQL Editor > New query > paste all of this > Run).
-- It recreates the exact schema from supabase/migrations/*.sql (4 files,
-- combined here in order) so you don't need the Supabase CLI.

-- ============================================================
-- 20260618142103_24612311-0611-46e6-b2cf-23e11b62e9c5.sql
-- ============================================================

-- Roles enum & user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Bootstrap admin function: lets the FIRST authenticated user claim admin if no admin exists yet
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_exists boolean;
  current_uid uuid;
BEGIN
  current_uid := auth.uid();
  IF current_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO admin_exists;
  IF admin_exists THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles(user_id, role) VALUES (current_uid, 'admin')
    ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

-- RSVPs table
CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  guests_count int NOT NULL DEFAULT 1 CHECK (guests_count >= 1 AND guests_count <= 20),
  companions text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.rsvps TO authenticated;
GRANT INSERT ON public.rsvps TO anon;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Anyone (logged in or not) can submit a confirmation
CREATE POLICY "Anyone can insert RSVP"
  ON public.rsvps FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read, update or delete
CREATE POLICY "Admins can view all RSVPs"
  ON public.rsvps FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update RSVPs"
  ON public.rsvps FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete RSVPs"
  ON public.rsvps FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_rsvps_updated_at
  BEFORE UPDATE ON public.rsvps
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 20260618142656_948d1d25-1fe4-41d6-a918-bbf89cf0c0f2.sql
-- ============================================================

-- Trigger: ao criar usuário, se email estiver na allowlist, conceder admin
CREATE OR REPLACE FUNCTION public.grant_admin_to_allowlisted()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IN ('lucaslazzari1812@gmail.com','brenapereiral02@gmail.com') THEN
    INSERT INTO public.user_roles(user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_to_allowlisted();

-- Aplica retroativamente caso já existam
INSERT INTO public.user_roles(user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE email IN ('lucaslazzari1812@gmail.com','brenapereiral02@gmail.com')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 20260618143011_a49c44dd-afdb-4a52-9116-a7f3e4d3ef5f.sql
-- ============================================================

-- 1) Remover função pública desnecessária
DROP FUNCTION IF EXISTS public.claim_first_admin();

-- 2) Restringir EXECUTE das funções SECURITY DEFINER
REVOKE ALL ON FUNCTION public.grant_admin_to_allowlisted() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
-- has_role precisa continuar disponível para 'authenticated' pois é chamada nas policies de RLS
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- 3) Substituir policy permissiva de INSERT em rsvps por uma com validação
DROP POLICY IF EXISTS "Anyone can insert RSVP" ON public.rsvps;
CREATE POLICY "Anyone can insert validated RSVP"
ON public.rsvps
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(full_name) BETWEEN 2 AND 120
  AND char_length(phone) BETWEEN 5 AND 30
  AND guests_count BETWEEN 1 AND 20
  AND (companions IS NULL OR char_length(companions) <= 1000)
  AND (message IS NULL OR char_length(message) <= 2000)
);

-- ============================================================
-- 20260618143527_0beedbb4-ddda-4c17-bf5a-07ddb0c12545.sql
-- ============================================================

CREATE POLICY "Only admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Only admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Only admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
