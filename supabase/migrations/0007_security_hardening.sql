-- Durcissement de sécurité (suite à l'audit).
--
-- 1. RLS : les policies d'écriture (et de lecture des tables sensibles)
--    utilisaient `auth.role() = 'authenticated'`, qui accorde l'accès à
--    N'IMPORTE QUEL compte authentifié — pas seulement l'admin. L'inscription
--    publique ayant été ouverte, un tiers pouvait se créer un compte et
--    écrire partout. On la restreint à l'UID unique de l'administrateur
--    (défense en profondeur : même si l'inscription est réactivée par erreur,
--    un compte lambda ne peut plus rien écrire ni lire de sensible).
--
--    Toutes les écritures légitimes de l'app passent par des server actions
--    utilisant le client service_role, qui contourne la RLS — ce durcissement
--    ne casse donc aucun flux admin. Les lectures publiques (`using (true)`)
--    restent inchangées : le site public et le Realtime continuent de lire.
--
-- 2. Storage : retrait des policies de LISTING public des buckets (les URLs
--    publiques directes continuent de fonctionner, cf. buckets `public=true`).
--
-- 3. Fonctions : figer `search_path` sur les 2 RPC de réordonnancement.
--
-- ⚠️ Si le compte admin est un jour recréé, son UID change : mettre à jour
--    la constante ci-dessous et rejouer une migration équivalente.

-- UID de l'administrateur (unique compte, thierno-abdoul.bah@hotmail.com).

-- ── 1. RLS tables de contenu : écriture réservée à l'admin ────────────
drop policy if exists "authenticated write projects" on public.projects;
create policy "admin write projects" on public.projects
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write experiences" on public.experiences;
create policy "admin write experiences" on public.experiences
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write skills" on public.skills;
create policy "admin write skills" on public.skills
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write education" on public.education;
create policy "admin write education" on public.education
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write certifications" on public.certifications;
create policy "admin write certifications" on public.certifications
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write personal_info" on public.personal_info;
create policy "admin write personal_info" on public.personal_info
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write veille_sources" on public.veille_sources;
create policy "admin write veille_sources" on public.veille_sources
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write veille_bookmarks" on public.veille_bookmarks;
create policy "admin write veille_bookmarks" on public.veille_bookmarks
  for all using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

-- ── 1b. contact_messages : insertion publique conservée (formulaire),
--        lecture/modification/suppression réservées à l'admin ──────────
drop policy if exists "authenticated read contact_messages" on public.contact_messages;
create policy "admin read contact_messages" on public.contact_messages
  for select using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated update contact_messages" on public.contact_messages;
create policy "admin update contact_messages" on public.contact_messages
  for update using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098')
  with check (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated delete contact_messages" on public.contact_messages;
create policy "admin delete contact_messages" on public.contact_messages
  for delete using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');
-- (policy "public insert contact_messages" intentionnellement conservée)

-- ── 1c. Journaux : lecture réservée à l'admin ─────────────────────────
drop policy if exists "authenticated read chat_logs" on public.chat_logs;
create policy "admin read chat_logs" on public.chat_logs
  for select using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated read connection_logs" on public.connection_logs;
create policy "admin read connection_logs" on public.connection_logs
  for select using (auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

-- ── 2. Storage : retrait du LISTING public des buckets ────────────────
-- Les buckets sont `public = true` : l'accès à un fichier par son URL
-- publique directe (CV, images projets, certifs) ne dépend PAS de cette
-- policy et continue de fonctionner. Seule l'énumération de tout le contenu
-- du bucket (indésirable) est supprimée. Les policies d'écriture/suppression
-- authentifiées des buckets restent en place (uploads via service_role).
drop policy if exists "public read cv bucket" on storage.objects;
drop policy if exists "public read project-images bucket" on storage.objects;

-- Écriture/màj/suppression des buckets : mêmes que les tables, on passe de
-- « tout compte authentifié » à l'admin seul (les uploads applicatifs passent
-- par service_role, qui contourne la RLS — aucun flux légitime cassé).
drop policy if exists "authenticated write cv bucket" on storage.objects;
create policy "admin write cv bucket" on storage.objects
  for insert with check (bucket_id = 'cv' and auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');
drop policy if exists "authenticated update cv bucket" on storage.objects;
create policy "admin update cv bucket" on storage.objects
  for update using (bucket_id = 'cv' and auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');
drop policy if exists "authenticated delete cv bucket" on storage.objects;
create policy "admin delete cv bucket" on storage.objects
  for delete using (bucket_id = 'cv' and auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

drop policy if exists "authenticated write project-images bucket" on storage.objects;
create policy "admin write project-images bucket" on storage.objects
  for insert with check (bucket_id = 'project-images' and auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');
drop policy if exists "authenticated update project-images bucket" on storage.objects;
create policy "admin update project-images bucket" on storage.objects
  for update using (bucket_id = 'project-images' and auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');
drop policy if exists "authenticated delete project-images bucket" on storage.objects;
create policy "admin delete project-images bucket" on storage.objects
  for delete using (bucket_id = 'project-images' and auth.uid() = '9ddb0e89-6b4e-4639-b4aa-4142fe8b2098');

-- ── 3. Fonctions RPC : figer search_path (advisor Supabase) ────────────
alter function public.reorder_projects(uuid[]) set search_path = '';
alter function public.reorder_skills(uuid[]) set search_path = '';
