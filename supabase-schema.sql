-- Script SQL à exécuter dans Supabase SQL Editor
-- Ce script crée toutes les tables nécessaires pour votre portfolio

-- 1. Table des leçons
CREATE TABLE IF NOT EXISTS lessons (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  complexity TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('completed', 'in-progress', 'upcoming')),
  date TEXT,
  week_number INTEGER NOT NULL,
  journal TEXT,
  synthesis JSONB DEFAULT '{}',
  practical_application JSONB DEFAULT '{}',
  evaluation JSONB DEFAULT '{}',
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 10),
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
  subtitle,
  complexity,
  icon_name,
  color,
  status,
  date,
  week_number,
  journal,
  synthesis,
  practical_application,
  evaluation,
  mastery_level
) VALUES (
  'Introduction à la Complexité Algorithmique',
  'Comprendre Big O, Omega et Theta',
  'O(1) à O(2^n)',
  'Brain',
  'from-blue-500 to-cyan-500',
  'completed',
  'Semaine 1 - Janvier 2025',
  1,
  'Cette semaine, j''ai découvert le concept fondamental de la complexité algorithmique et la notation Big O. Au début, j''ai eu du mal à comprendre pourquoi on ignore les constantes dans l''analyse asymptotique.',
  '{"mainConcepts": [{"title": "La Complexité Algorithmique", "description": "Mesure l''efficacité d''un algorithme", "examples": ["O(1): Constant", "O(log n): Logarithmique", "O(n): Linéaire"]}]}',
  '{"context": "Système de recherche d''étudiants", "problem": "Recherche trop lente", "solution": "Recherche dichotomique", "result": "Temps réduit de 2s à 0.01s", "code": "def recherche_dichotomique(arr, x):\n    l, r = 0, len(arr)-1\n    while l <= r:\n        m = (l+r)//2\n        if arr[m] == x: return m\n        elif arr[m] < x: l = m+1\n        else: r = m-1\n    return -1"}',
  '{"strengths": ["Identifier complexité simples", "Comprendre O(n) vs O(n²)"], "improvements": ["Analyser récursivité", "Preuves mathématiques"], "strategies": ["Résoudre 2 problèmes/jour", "Utiliser VisuAlgo"]}',
  7
) ON CONFLICT DO NOTHING;

-- 10. Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_lessons_week_number ON lessons(week_number);
CREATE INDEX IF NOT EXISTS idx_lessons_status ON lessons(status);
CREATE INDEX IF NOT EXISTS idx_lessons_created_at ON lessons(created_at);

-- Fin du script
-- Votre base de données est maintenant prête ! 🎉