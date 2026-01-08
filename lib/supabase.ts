import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// TYPES BASÉS SUR LE CAHIER DES CHARGES
// ============================================

// Type pour les leçons (model Django Lesson)
export interface Lesson {
  id: string
  title: string
  date: string
  week_number: number | null
  
  // 1. Journal d'apprentissage réflexif
  journal_reflexif: string
  
  // 2. Synthèse personnelle des concepts clés
  synthese_personnelle: string
  
  // 3. Application pratique dans mon contexte
  application_pratique: string
  
  // 4. Auto-évaluation et méta-cognition
  maitrise_bien: string
  a_ameliorer: string
  strategie_progression: string
  
  created_at: string
  updated_at: string
}

// Type pour le bilan final (model Django FinalAssessment)
export interface FinalAssessment {
  id: number
  appris_plus: string
  competences_reutilisables: string
  plus_grand_defi: string
  prochaines_etapes: string
  created_at: string
  updated_at: string
}

// Type pour le profil admin
export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  email: string
  github_url: string
  linkedin_url: string
  photo_url: string
  created_at: string
  updated_at: string
}

// ============================================
// FONCTIONS POUR LES LEÇONS
// ============================================

// Récupérer toutes les leçons (triées par semaine puis date)
export const fetchLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('week_number', { ascending: true })
    .order('date', { ascending: true })
  
  if (error) throw error
  return data as Lesson[]
}

// Récupérer une leçon par ID
export const fetchLesson = async (id: string) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Lesson
}

// Créer une nouvelle leçon
export const createLesson = async (lesson: Partial<Lesson>) => {
  const { data, error } = await supabase
    .from('lessons')
    .insert([lesson])
    .select()
    .single()
  
  if (error) throw error
  return data as Lesson
}

// Mettre à jour une leçon
export const updateLesson = async (id: string, lesson: Partial<Lesson>) => {
  const { data, error } = await supabase
    .from('lessons')
    .update(lesson)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Lesson
}

// Supprimer une leçon
export const deleteLesson = async (id: string) => {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// ============================================
// FONCTIONS POUR LE BILAN FINAL
// ============================================

// Récupérer le bilan final
export const fetchFinalAssessment = async () => {
  const { data, error } = await supabase
    .from('final_assessment')
    .select('*')
    .eq('id', 1)
    .single()
  
  if (error) throw error
  return data as FinalAssessment
}

// Mettre à jour le bilan final
export const updateFinalAssessment = async (assessment: Partial<FinalAssessment>) => {
  const { data, error } = await supabase
    .from('final_assessment')
    .update(assessment)
    .eq('id', 1)
    .select()
    .single()
  
  if (error) throw error
  return data as FinalAssessment
}

// ============================================
// FONCTIONS POUR LE PROFIL
// ============================================

// Récupérer le profil
export const fetchProfile = async () => {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', 1)
    .single()
  
  if (error) throw error
  return data as Profile
}

// Mettre à jour le profil
export const updateProfile = async (profile: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profile')
    .update(profile)
    .eq('id', 1)
    .select()
    .single()
  
  if (error) throw error
  return data as Profile
}

// ============================================
// STATISTIQUES
// ============================================

// Obtenir le nombre total de leçons
export const getTotalLessons = async () => {
  const { count, error } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true })
  
  if (error) throw error
  return count || 0
}

// Obtenir les leçons paginées
export const fetchLessonsPaginated = async (page: number, pageSize: number = 10) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  
  const { data, error, count } = await supabase
    .from('lessons')
    .select('*', { count: 'exact' })
    .order('week_number', { ascending: true })
    .order('date', { ascending: true })
    .range(from, to)
  
  if (error) throw error
  
  return {
    lessons: data as Lesson[],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
    currentPage: page
  }
}