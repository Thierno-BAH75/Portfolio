-- Lien optionnel vers la page de vérification officielle de la certification
-- (Credly, page de vérification Cisco, etc.) — distinct de pdf_url qui pointe
-- vers le justificatif uploadé et alimente la modale de visualisation.
alter table public.certifications
  add column if not exists verification_url text;
