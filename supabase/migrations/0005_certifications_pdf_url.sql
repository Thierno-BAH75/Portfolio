-- Lien optionnel vers le PDF/justificatif d'une certification, utilisé par
-- le bouton "Voir certification" sur le site public.
alter table public.certifications
  add column if not exists pdf_url text;
