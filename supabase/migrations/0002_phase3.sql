-- Phase 3 : CV en base, buckets Storage (CV + visuels projets), Realtime
-- sur la disponibilité.

-- ── personal_info.cv_url ─────────────────────────────────────────────
alter table public.personal_info add column cv_url text;

-- ── Buckets Storage ──────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values
  ('cv', 'cv', true),
  ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Lecture publique, écriture réservée aux utilisateurs authentifiés —
-- les uploads passent par des server actions avec le client service_role,
-- qui contourne RLS de toute façon ; ces policies couvrent aussi tout
-- accès direct futur depuis le navigateur.
create policy "public read cv bucket" on storage.objects
  for select using (bucket_id = 'cv');
create policy "authenticated write cv bucket" on storage.objects
  for insert with check (bucket_id = 'cv' and auth.role() = 'authenticated');
create policy "authenticated update cv bucket" on storage.objects
  for update using (bucket_id = 'cv' and auth.role() = 'authenticated');
create policy "authenticated delete cv bucket" on storage.objects
  for delete using (bucket_id = 'cv' and auth.role() = 'authenticated');

create policy "public read project-images bucket" on storage.objects
  for select using (bucket_id = 'project-images');
create policy "authenticated write project-images bucket" on storage.objects
  for insert with check (bucket_id = 'project-images' and auth.role() = 'authenticated');
create policy "authenticated update project-images bucket" on storage.objects
  for update using (bucket_id = 'project-images' and auth.role() = 'authenticated');
create policy "authenticated delete project-images bucket" on storage.objects
  for delete using (bucket_id = 'project-images' and auth.role() = 'authenticated');

-- ── Realtime sur la disponibilité ────────────────────────────────────
-- Le badge "Disponible" du header s'abonne aux UPDATE de cette ligne pour
-- se mettre à jour sans rechargement de page.
alter publication supabase_realtime add table public.personal_info;
