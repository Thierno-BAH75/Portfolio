-- Phase 1 : fondation du panneau admin — schéma miroir de src/data/*.ts.
-- Les champs traduisibles (fr/en) sont stockés en jsonb au format
-- { "fr": "...", "en": "..." } pour coller exactement au type Localized<T>
-- du front, sans dupliquer les colonnes.

-- ── projects ─────────────────────────────────────────────────────────
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  description jsonb not null,
  long_description jsonb,
  image text not null,
  images text[] not null default '{}',
  technologies text[] not null default '{}',
  category text not null,
  links jsonb not null default '{}',
  featured boolean not null default false,
  date text not null,
  metrics jsonb,
  challenges jsonb,
  architecture_diagram text,
  status text not null default 'published' check (status in ('draft', 'published')),
  view_count integer not null default 0,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── experiences ──────────────────────────────────────────────────────
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null,
  company text not null,
  company_logo text,
  location text not null,
  type text not null,
  start_date text not null,
  end_date text,
  current boolean not null default false,
  description jsonb not null,
  achievements jsonb not null,
  impact jsonb,
  technologies text[] not null default '{}',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── skills ───────────────────────────────────────────────────────────
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name jsonb not null, -- string simple ou { fr, en } selon Skill["name"]
  icon text not null,
  category text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── education ────────────────────────────────────────────────────────
create table public.education (
  id uuid primary key default gen_random_uuid(),
  degree jsonb not null,
  school text not null,
  location text,
  start_date text not null,
  end_date text not null,
  description jsonb,
  status text,
  note jsonb,
  level jsonb,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── certifications ───────────────────────────────────────────────────
create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  name jsonb not null,
  issuer text not null,
  date text not null,
  expiry text,
  icon text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── personal_info (singleton) ───────────────────────────────────────
create table public.personal_info (
  id integer primary key default 1 check (id = 1),
  name text not null,
  title jsonb not null,
  tagline jsonb not null,
  email text not null,
  phone text,
  location jsonb not null,
  available boolean not null default true,
  availability_message jsonb,
  social_links jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

-- ── contact_messages ─────────────────────────────────────────────────
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text not null,
  subject text,
  message text not null,
  read boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Row Level Security ───────────────────────────────────────────────
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;
alter table public.education enable row level security;
alter table public.certifications enable row level security;
alter table public.personal_info enable row level security;
alter table public.contact_messages enable row level security;

-- Lecture publique (anon + authenticated) sur tout sauf contact_messages.
-- Le filtrage des projets "draft" se fait côté requête applicative (Phase 1),
-- pas au niveau RLS, pour que l'admin authentifié voie aussi les brouillons.
create policy "public read projects" on public.projects
  for select using (true);
create policy "public read experiences" on public.experiences
  for select using (true);
create policy "public read skills" on public.skills
  for select using (true);
create policy "public read education" on public.education
  for select using (true);
create policy "public read certifications" on public.certifications
  for select using (true);
create policy "public read personal_info" on public.personal_info
  for select using (true);

-- Écriture réservée aux utilisateurs authentifiés (service_role contourne
-- RLS de toute façon et n'a donc pas besoin de policy dédiée).
create policy "authenticated write projects" on public.projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write experiences" on public.experiences
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write skills" on public.skills
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write education" on public.education
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write certifications" on public.certifications
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write personal_info" on public.personal_info
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- contact_messages : n'importe qui peut déposer un message (formulaire
-- public), seul un admin authentifié peut les lire/gérer.
create policy "public insert contact_messages" on public.contact_messages
  for insert with check (true);
create policy "authenticated read contact_messages" on public.contact_messages
  for select using (auth.role() = 'authenticated');
create policy "authenticated update contact_messages" on public.contact_messages
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated delete contact_messages" on public.contact_messages
  for delete using (auth.role() = 'authenticated');
