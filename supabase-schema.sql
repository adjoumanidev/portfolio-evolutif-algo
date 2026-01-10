-- Script SQL à exécuter dans Supabase SQL Editor
-- Ce script crée toutes les tables nécessaires pour votre portfolio
-- 1. Supprimer l'ancienne table si elle existe
DROP TABLE IF EXISTS lessons CASCADE;
-- 1. Supprimer l'ancienne table si elle existe
DROP TABLE IF EXISTS profile CASCADE;
-- 1. Table des leçons
CREATE TABLE IF NOT EXISTS lessons (
  id BIGSERIAL PRIMARY KEY,
  -- Métadonnées
  title TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  week_number INTEGER,
  
  -- Les 4 sections principales
  journal_reflexif TEXT NOT NULL DEFAULT '',
  synthese_personnelle TEXT NOT NULL DEFAULT '',
  application_pratique TEXT NOT NULL DEFAULT '',
  
  -- Auto-évaluation
  maitrise_bien TEXT NOT NULL DEFAULT '',
  a_ameliorer TEXT NOT NULL DEFAULT '',
  strategie_progression TEXT NOT NULL DEFAULT '',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table du profil
CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  email TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  photo_url TEXT,
  total_lessons INTEGER DEFAULT 12,
  completed_lessons INTEGER DEFAULT 0,
  in_progress_lessons INTEGER DEFAULT 0,
  average_mastery NUMERIC(3,1) DEFAULT 0,
  study_hours INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_profile CHECK (id = 1)
);

-- 3. Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Triggers pour updated_at
DROP TRIGGER IF EXISTS update_lessons_updated_at ON lessons;
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profile_updated_at ON profile;
CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. Activer Row Level Security (RLS)
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- 6. Politiques RLS - Lecture publique
CREATE POLICY "Enable read access for all users" ON lessons
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON profile
  FOR SELECT USING (true);

-- 7. Politiques RLS - Écriture (à ajuster selon vos besoins de sécurité)
-- Pour l'instant, tout le monde peut écrire (à sécuriser en production)
CREATE POLICY "Enable insert for all users" ON lessons
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON lessons
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON lessons
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON profile
  FOR INSERT WITH CHECK (id = 1);

CREATE POLICY "Enable update for all users" ON profile
  FOR UPDATE USING (id = 1);

-- 8. Insertion des données initiales du profil
INSERT INTO profile (
  id,
  name,
  title,
  bio,
  email,
  github_url,
  linkedin_url,
  photo_url,
  total_lessons,
  completed_lessons,
  in_progress_lessons,
  average_mastery,
  study_hours
) VALUES (
  1,
  'Votre Nom Complet',
  'Étudiant Master 1 Big Data Analytics',
  'Passionné par l''algorithmique, la data science et le développement full-stack. Je documente mon parcours d''apprentissage à travers ce portfolio évolutif pour mieux comprendre et maîtriser les concepts fondamentaux de l''informatique.',
  'votre.email@uvci.edu.ci',
  'https://github.com/votre-username',
  'https://linkedin.com/in/votre-profile',
  '/images/profile.jpg',
  12,
  0,
  0,
  0,
  0
) ON CONFLICT (id) DO NOTHING;

-- 9. Insertion d'une leçon exemple
INSERT INTO lessons (
  title,
  date,
  week_number,
  journal_reflexif,
  synthese_personnelle,
  application_pratique,
  maitrise_bien,
  a_ameliorer,
  strategie_progression
) VALUES (
  'Introduction à la Complexité Algorithmique',
  '2025-01-15',
  1,
  'Cette semaine, j''ai découvert le concept fondamental de la complexité algorithmique et la notation Big O. Au début, j''ai eu du mal à comprendre pourquoi on ignore les constantes dans l''analyse asymptotique. Après plusieurs exercices pratiques, j''ai réalisé que l''important est de comprendre comment le temps d''exécution croît avec la taille des données. J''ai particulièrement apprécié l''analogie avec la vie réelle : chercher un mot dans un dictionnaire (recherche dichotomique) vs chercher un livre dans une bibliothèque non triée (recherche linéaire).',
  
  'La complexité algorithmique mesure l''efficacité d''un algorithme en termes de temps et d''espace. La notation Big O (O) décrit le pire cas, Omega (Ω) le meilleur cas, et Theta (Θ) le cas moyen. Les complexités courantes sont :
  - O(1) : Constant - accès direct à un élément
  - O(log n) : Logarithmique - recherche dichotomique
  - O(n) : Linéaire - parcourir tous les éléments
  - O(n²) : Quadratique - boucles imbriquées
  - O(2^n) : Exponentielle - problèmes combinatoires',
  
  'J''ai appliqué ces concepts au système de recherche d''étudiants de mon projet GESTIO-MARKET PRO. Initialement, j''utilisais une recherche linéaire qui prenait environ 2 secondes pour 10 000 étudiants. En implémentant une recherche dichotomique sur une liste triée, j''ai réduit le temps à 0.01 seconde.
  Résultat : amélioration de 200x en performance !',
  
  '- Identifier les complexités simples (O(1), O(n), O(n²))
  - Comprendre la différence entre O(n) et O(n²) sur des exemples concrets
  - Savoir quand utiliser une recherche dichotomique vs linéaire
  - Analyser les boucles imbriquées pour détecter O(n²)',
    
    '- Analyser les algorithmes récursifs (difficile de visualiser les appels)
  - Comprendre les preuves mathématiques formelles
  - Calculer la complexité spatiale (je me concentre trop sur le temps)
  - Identifier les optimisations possibles dans du code existant',
    
    '- Résoudre 2 problèmes algorithmiques par jour sur LeetCode
  - Utiliser VisuAlgo.net pour visualiser les algorithmes
  - Créer un cheat sheet personnel des complexités courantes
  - Réviser les preuves mathématiques 15 min par jour
  - Pratiquer l''analyse de code réel de mes projets'
) ON CONFLICT DO NOTHING;

-- 10. Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_lessons_week_number ON lessons(week_number);
CREATE INDEX IF NOT EXISTS idx_lessons_status ON lessons(status);
CREATE INDEX IF NOT EXISTS idx_lessons_created_at ON lessons(created_at);

-- Fin du script
-- Votre base de données est maintenant prête ! 🎉