// lib/transformers.ts
import type { Lesson } from '@/lib/supabase'

export interface LessonFormData {
  title: string
  date: string
  week_number: number | null
  journal_reflexif: string
  synthese_personnelle: string
  application_pratique: string
  maitrise_bien: string
  a_ameliorer: string
  strategie_progression: string
}

// Aucune transformation nécessaire ! 
// Les noms du formulaire = les noms de la base de données
export function transformFormToSQL(formData: Partial<LessonFormData>): Partial<Lesson> {
  return {
    ...formData,
    // Assurer que la date est au bon format
    date: formData.date || new Date().toISOString().split('T')[0],
  }
}

export function transformSQLToForm(lesson: Lesson): LessonFormData {
  return {
    title: lesson.title,
    date: lesson.date.split('T')[0],
    week_number: lesson.week_number,
    journal_reflexif: lesson.journal_reflexif,
    synthese_personnelle: lesson.synthese_personnelle,
    application_pratique: lesson.application_pratique,
    maitrise_bien: lesson.maitrise_bien,
    a_ameliorer: lesson.a_ameliorer,
    strategie_progression: lesson.strategie_progression,
  }
}