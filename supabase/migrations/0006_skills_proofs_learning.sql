-- Compétences reliées à des preuves (choisies en admin, jamais déduites
-- automatiquement) + drapeau "en cours d'apprentissage" :
-- - proof_experience_id : l'expérience professionnelle qui atteste de la
--   compétence ("Utilisé chez KISS")
-- - is_certified / related_certification_id : certification qui la valide
--   ("Certifié Cisco CCNA v7")
-- - is_learning : affichée dans la sous-section distincte "En cours
--   d'apprentissage" du site public, hors grille des compétences maîtrisées
alter table public.skills
  add column if not exists proof_experience_id uuid references public.experiences(id) on delete set null,
  add column if not exists is_certified boolean not null default false,
  add column if not exists related_certification_id uuid references public.certifications(id) on delete set null,
  add column if not exists is_learning boolean not null default false;
