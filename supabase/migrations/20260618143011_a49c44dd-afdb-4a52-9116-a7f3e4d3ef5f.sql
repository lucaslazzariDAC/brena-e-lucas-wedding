
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
