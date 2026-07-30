
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
