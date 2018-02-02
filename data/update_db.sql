ALTER TABLE saisie.taxon add tax_validation_commentaire varchar(500);
ALTER TABLE saisie.taxon add tax_validation_date DATE;
ALTER TABLE saisie.taxon add tax_validateur int;

ALTER TABLE saisie.population add pop_validation_commentaire varchar(500);
ALTER TABLE saisie.population add pop_validation_date DATE;
ALTER TABLE saisie.population add pop_validateur int;





UPDATE saisie.taxon SET tax_validateur = 48 WHERE tax_statut_validation 'OK (Frantz Hopkins)';
UPDATE saisie.taxon SET tax_validateur = 79 WHERE tax_statut_validation 'OK (Emeric Sulmont)';

UPDATE saisie.population SET pop_validateur = 48 WHERE pop_statut_validation 'OK (Frantz Hopkins)';



ALTER TYPE saisie.enum_statut_validation ADD VALUE 'Inconnu';
ALTER TYPE saisie.enum_statut_validation ADD VALUE 'Non renseigné';
ALTER TYPE saisie.enum_statut_validation ADD VALUE 'En attente de validation';
ALTER TYPE saisie.enum_statut_validation ADD VALUE 'Valide';
ALTER TYPE saisie.enum_statut_validation ADD VALUE 'Non valide';
ALTER TYPE saisie.enum_statut_validation ADD VALUE 'Douteux';

ALTER TYPE saisie.enum_statut_validation ADD VALUE 'A compléter';



UPDATE  saisie.taxon SET tax_statut_validation = 'En attente de validation' WHERE tax_statut_validation = 'à vérifier';
UPDATE  saisie.taxon SET tax_statut_validation = 'A compléter' WHERE tax_statut_validation = 'à compléter';
UPDATE  saisie.taxon SET tax_statut_validation = 'Valide' WHERE tax_statut_validation::text ilike 'OK%';


UPDATE  saisie.population SET pop_statut_validation = 'En attente de validation' WHERE pop_statut_validation = 'à vérifier';
UPDATE  saisie.population SET pop_statut_validation = 'A compléter' WHERE pop_statut_validation = 'à compléter';
UPDATE  saisie.population SET pop_statut_validation = 'Valide' WHERE pop_statut_validation::text ilike 'OK%';



DELETE FROM pg_enum WHERE enumtypid = 689738 AND enumsortorder IN (1,2,3,4,5,6,7);



CREATE OR REPLACE VIEW saisie.validateur AS 
 SELECT DISTINCT r.id_role AS obr_id,
    r.nom_role AS obr_nom,
    r.prenom_role AS obr_prenom
   FROM utilisateurs.v_userslist_forall_menu r 
  WHERE id_menu = 1000009;

ALTER TABLE saisie.validateur
  OWNER TO gr_obs_flore;
GRANT ALL ON TABLE saisie.validateur TO gr_obs_flore;
GRANT ALL ON TABLE saisie.validateur TO obs_flore;

GRANT SELECT ON TABLE utilisateurs.v_userslist_forall_menu TO GROUP gr_obs_flore;

