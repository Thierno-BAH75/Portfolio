-- Limite de taille native au niveau des buckets Storage (suite au pentest
-- actif : file_size_limit était null, donc seule la validation applicative
-- (MAX_CV_BYTES / MAX_IMAGE_BYTES dans src/lib/actions/uploads.ts) empêchait
-- les fichiers trop volumineux — contournable en frappant Storage
-- directement. Valeurs alignées sur ces mêmes constantes applicatives.
update storage.buckets set file_size_limit = 5242880 where id = 'cv'; -- 5 Mo
update storage.buckets set file_size_limit = 2097152 where id = 'project-images'; -- 2 Mo
