-- Ton/instructions du chatbot éditables en admin + couleurs d'accent du thème.
--
-- chatbot_settings : singleton (id=1, même convention que personal_info).
-- Lu par src/lib/chat-context.ts (client anon) pour construire le system
-- prompt — le contenu de "extra_instructions" est un TEXTE INJECTÉ APRÈS les
-- règles de sécurité codées en dur dans chat-context.ts (anti hors-sujet,
-- anti-injection, defensive-only, anti-invention), qui restent prioritaires
-- et non modifiables depuis ce champ (documenté aussi côté TypeScript).

create table public.chatbot_settings (
  id integer primary key default 1 check (id = 1),
  tone text not null default 'warm' check (tone in ('warm', 'direct', 'detailed')),
  extra_instructions text,
  updated_at timestamptz not null default now()
);

alter table public.chatbot_settings enable row level security;

create policy "public read chatbot_settings" on public.chatbot_settings
  for select using (true);

create policy "admin write chatbot_settings" on public.chatbot_settings
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

insert into public.chatbot_settings (id) values (1)
  on conflict (id) do nothing;

-- ── Couleurs d'accent du thème (2 couleurs hex) ────────────────────────
-- Stockées sur personal_info (déjà le singleton de config site-wide)
-- plutôt qu'une nouvelle table, pour rester lues via le même fetcher que
-- le reste des infos publiques (src/lib/data.ts).
alter table public.personal_info
  add column if not exists accent_color_1 text not null default '#8b5cf6',
  add column if not exists accent_color_2 text not null default '#22d3ee';
