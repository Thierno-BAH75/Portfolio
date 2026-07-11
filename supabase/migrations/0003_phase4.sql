-- Phase 4 : journal des connexions, journal du chatbot, curation de veille.

-- ── connection_logs ──────────────────────────────────────────────────
create table public.connection_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text,
  event_type text not null check (event_type in ('login', 'logout', 'mfa_challenge')),
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.connection_logs enable row level security;

-- Aucune policy publique : les insertions passent par le client
-- service_role (server actions), la lecture est réservée à l'admin.
create policy "authenticated read connection_logs" on public.connection_logs
  for select using (auth.role() = 'authenticated');

-- ── chat_logs ────────────────────────────────────────────────────────
create table public.chat_logs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  locale text not null,
  provider text not null,
  ip text,
  created_at timestamptz not null default now()
);

alter table public.chat_logs enable row level security;

create policy "authenticated read chat_logs" on public.chat_logs
  for select using (auth.role() = 'authenticated');

-- ── veille_sources ───────────────────────────────────────────────────
create table public.veille_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  domain text not null,
  category text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.veille_sources enable row level security;

-- Lecture publique : /api/rss lit les sources actives sans session.
create policy "public read veille_sources" on public.veille_sources
  for select using (true);
create policy "authenticated write veille_sources" on public.veille_sources
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── veille_bookmarks ─────────────────────────────────────────────────
create table public.veille_bookmarks (
  id uuid primary key default gen_random_uuid(),
  article_url text not null,
  article_title text not null,
  source_name text,
  comment_fr text,
  comment_en text,
  is_pinned boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.veille_bookmarks enable row level security;

-- Lecture publique : la page /veille affiche les articles épinglés.
create policy "public read veille_bookmarks" on public.veille_bookmarks
  for select using (true);
create policy "authenticated write veille_bookmarks" on public.veille_bookmarks
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
