'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Calendar, Hash } from 'lucide-react'
import type { Lesson } from '@/lib/supabase'

export function LessonModalV3({
  lesson,
  onClose,
  onSave,
}: {
  lesson: Lesson | null
  onClose: () => void
  onSave: (data: Partial<Lesson>) => Promise<void>
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Lesson>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    week_number: 1,
    journal_reflexif: '',
    synthese_personnelle: '',
    application_pratique: '',
    maitrise_bien: '',
    a_ameliorer: '',
    strategie_progression: '',
  })

  useEffect(() => {
    if (lesson) {
      setFormData({
        ...lesson,
        date: lesson.date.split('T')[0], // Format YYYY-MM-DD
      })
    }
  }, [lesson])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass rounded-3xl p-8 w-full max-w-4xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {lesson ? 'Modifier la leçon' : 'Ajouter une leçon'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre de la leçon */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre de la leçon *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="ex: BI Business Intelligente - Nov. 24, 2025"
              />
            </div>

            {/* Date et Semaine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Hash className="w-4 h-4 inline mr-1" />
                  Semaine (optionnel)
                </label>
                <input
                  type="number"
                  value={formData.week_number || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, week_number: parseInt(e.target.value) || null })
                  }
                  min="1"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="1, 2, 3..."
                />
              </div>
            </div>

            {/* 1. Journal d'apprentissage réflexif */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                1. Journal d'apprentissage réflexif *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Décrivez en 5-10 lignes ce que vous avez appris cette semaine, vos réussites, vos difficultés et vos ressentis.
              </p>
              <textarea
                value={formData.journal_reflexif}
                onChange={(e) => setFormData({ ...formData, journal_reflexif: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Exemple : Comprendre la BI Différence entre le système OLTP et OLAP..."
              />
            </div>

            {/* 2. Synthèse personnelle des concepts clés */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                2. Synthèse personnelle des concepts clés *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Écrivez un résumé clair, avec vos propres mots, des notions principales abordées dans la leçon.
              </p>
              <textarea
                value={formData.synthese_personnelle}
                onChange={(e) => setFormData({ ...formData, synthese_personnelle: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Résumé des concepts principaux..."
              />
            </div>

            {/* 3. Application pratique dans mon contexte */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                3. Application pratique dans mon contexte *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Expliquez comment vous pourriez appliquer ces concepts à un problème réel.
              </p>
              <textarea
                value={formData.application_pratique}
                onChange={(e) => setFormData({ ...formData, application_pratique: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Comment appliquer ces concepts dans un contexte réel..."
              />
            </div>

            {/* 4. Auto-évaluation et méta-cognition */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">
                4. Auto-évaluation et méta-cognition
              </h3>

              {/* Ce que je maîtrise bien */}
              <div>
                <label className="block text-sm font-medium text-green-400 mb-2">
                  Ce que je maîtrise bien *
                </label>
                <textarea
                  value={formData.maitrise_bien}
                  onChange={(e) => setFormData({ ...formData, maitrise_bien: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-green-500/5 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Les points que je maîtrise bien..."
                />
              </div>

              {/* Ce que je dois améliorer */}
              <div>
                <label className="block text-sm font-medium text-orange-400 mb-2">
                  Ce que je dois améliorer *
                </label>
                <textarea
                  value={formData.a_ameliorer}
                  onChange={(e) => setFormData({ ...formData, a_ameliorer: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-orange-500/5 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Les points à améliorer..."
                />
              </div>

              {/* Stratégie pour progresser */}
              <div>
                <label className="block text-sm font-medium text-blue-400 mb-2">
                  Stratégie pour progresser *
                </label>
                <textarea
                  value={formData.strategie_progression}
                  onChange={(e) => setFormData({ ...formData, strategie_progression: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ma stratégie pour progresser..."
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}