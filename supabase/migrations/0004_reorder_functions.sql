-- Réordonnancement en une seule requête réseau (RPC) — un upsert partiel
-- {id, display_order} échoue sur les colonnes NOT NULL sans défaut (slug,
-- title, name…) car Postgres valide la ligne insérée avant de retomber sur
-- la branche ON CONFLICT DO UPDATE. Une fonction dédiée qui ne touche qu'à
-- display_order évite complètement le problème.
create or replace function public.reorder_projects(ids uuid[])
returns void
language sql
as $$
  update public.projects p
  set display_order = o.idx - 1, updated_at = now()
  from unnest(ids) with ordinality as o(id, idx)
  where p.id = o.id;
$$;

create or replace function public.reorder_skills(ids uuid[])
returns void
language sql
as $$
  update public.skills s
  set display_order = o.idx - 1, updated_at = now()
  from unnest(ids) with ordinality as o(id, idx)
  where s.id = o.id;
$$;
