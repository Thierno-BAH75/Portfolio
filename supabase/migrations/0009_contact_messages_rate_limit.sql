-- Throttle au niveau base pour l'insertion publique dans contact_messages
-- (suite au pentest actif : la server action est protégée par le CSRF natif
-- de Next.js, mais l'écriture directe via l'API REST Supabase — clé anon
-- publique par design — ne l'est pas et reste accessible depuis n'importe
-- quel domaine tiers, pas seulement le portfolio). Un vrai rate-limit HTTP
-- (comme sur /api/chat ou /api/rss) ne protège que la route Next.js, pas cet
-- accès direct à Supabase — d'où un throttle posé ici, au plus près de la
-- donnée, seul point que TOUT chemin d'insertion doit obligatoirement
-- traverser.
--
-- PostgREST expose les en-têtes de la requête HTTP entrante via le GUC
-- request.headers (vérifié empiriquement sur ce projet). cf-connecting-ip
-- est ajouté par l'infrastructure Cloudflare de Supabase et n'est PAS
-- falsifiable côté client (contrairement à x-forwarded-for, que le client
-- peut préfixer arbitrairement) — c'est la source la plus fiable disponible
-- ici pour identifier l'appelant sans authentification.

create table if not exists public.contact_rate_limit (
  ip_address text primary key,
  window_start timestamptz not null default now(),
  request_count int not null default 1
);

-- RLS activée sans aucune policy publique : cette table n'est accessible
-- que via la fonction SECURITY DEFINER ci-dessous, jamais directement par
-- un client (anon ou authentifié).
alter table public.contact_rate_limit enable row level security;

create or replace function public.check_contact_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  headers json;
  client_ip text;
  current_count int;
  window_started_at timestamptz;
  max_requests constant int := 5;
  window_duration constant interval := interval '10 minutes';
begin
  headers := nullif(current_setting('request.headers', true), '')::json;
  client_ip := coalesce(
    headers->>'cf-connecting-ip',
    split_part(headers->>'x-forwarded-for', ',', 1),
    'unknown'
  );

  select request_count, window_start into current_count, window_started_at
  from public.contact_rate_limit
  where ip_address = client_ip
  for update;

  if not found then
    insert into public.contact_rate_limit (ip_address, window_start, request_count)
    values (client_ip, now(), 1);
    return new;
  end if;

  if now() - window_started_at > window_duration then
    update public.contact_rate_limit
    set window_start = now(), request_count = 1
    where ip_address = client_ip;
    return new;
  end if;

  if current_count >= max_requests then
    raise exception 'Trop de messages envoyés récemment depuis cette adresse. Réessayez dans quelques minutes.'
      using errcode = '42901';
  end if;

  update public.contact_rate_limit
  set request_count = request_count + 1
  where ip_address = client_ip;

  return new;
end;
$$;

drop trigger if exists contact_messages_rate_limit on public.contact_messages;
create trigger contact_messages_rate_limit
  before insert on public.contact_messages
  for each row execute function public.check_contact_rate_limit();
