-- Tabela + função usadas pelo GitHub Action "Keep Supabase project alive".
-- A função faz uma ESCRITA real no banco (upsert), o que conta como atividade
-- de banco de dados e evita o auto-pause do plano gratuito.

CREATE TABLE IF NOT EXISTS public.keepalive (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  pinged_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.keepalive ENABLE ROW LEVEL SECURITY;
-- Sem policies: ninguém acessa a tabela diretamente; só via função abaixo.

CREATE OR REPLACE FUNCTION public.keep_alive()
RETURNS timestamptz
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.keepalive (id, pinged_at) VALUES (1, now())
  ON CONFLICT (id) DO UPDATE SET pinged_at = now()
  RETURNING pinged_at;
$$;

REVOKE ALL ON FUNCTION public.keep_alive() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.keep_alive() TO anon, authenticated;
