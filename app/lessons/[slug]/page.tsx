'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Edit3, FileText, Home, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { fetchLessons, fetchLessonBySlug, fetchProfile, fetchFinalAssessment, type Lesson, type Profile, type FinalAssessment } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'
import ProfilePhoto from '@/components/ProfilePhoto'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
import MarkdownRenderer from '@/components/CodeSnapideMarkdown'





export default function LessonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [finalAssessment, setFinalAssessment] = useState<FinalAssessment | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBilan, setShowBilan] = useState(false)

  useEffect(() => {
    loadData()
  }, [params.slug])

  const loadData = async () => {
    try {
      const slug = params.slug as string
      const [lessonsData, lessonData, profileData, bilanData] = await Promise.all([
        fetchLessons(),
        fetchLessonBySlug(slug),
        fetchProfile(),
        fetchFinalAssessment(),
      ])
      
      setLessons(lessonsData)
      setSelectedLesson(lessonData)
      setProfile(profileData)
      setFinalAssessment(bilanData)
    } catch (error) {
      console.error('Erreur chargement:', error)
      toast.error('Leçon introuvable')
      // Si la leçon n'existe pas, rediriger vers la première leçon
      const lessonsData = await fetchLessons()
      if (lessonsData.length > 0) {
        router.push(`/lessons/${lessonsData[0].slug}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Lien copié dans le presse-papier !')
    } catch (error) {
      toast.error('Erreur lors de la copie du lien')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <CustomCursor />
      <ModernBackground />
      
      <div className="relative min-h-screen text-white">
        {/* Header avec Profil */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {profile?.photo_url && (
                  <ProfilePhoto
                    photoUrl={profile.photo_url}
                    name={profile.name}
                    size="small"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold">AlgoMaster Portfolio</h1>
                  <p className="text-sm text-gray-400">{profile?.title}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">Accueil</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation par onglets (Leçons / Bilan Final) */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-4 mb-6 border-b border-white/10">
            <button
              onClick={() => setShowBilan(false)}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                !showBilan
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Leçons
            </button>
            <button
              onClick={() => setShowBilan(true)}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                showBilan
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Bilan Final
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!showBilan ? (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* ✅ Onglets des titres de leçons AVEC LIENS DYNAMIQUES */}
                <div className="mb-6 overflow-x-auto">
                  <div className="flex gap-2 min-w-max pb-2">
                    {lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.slug}`}  
                        className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                          selectedLesson?.id === lesson.id
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {lesson.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contenu de la leçon sélectionnée */}
                {selectedLesson && (
                  <motion.div
                    key={selectedLesson.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass rounded-3xl p-8 border border-white/10"
                  >
                    {/* Header de la leçon */}
                    <div className="mb-8 pb-6 border-b border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                            {selectedLesson.title}
                          </h2>
                          <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(selectedLesson.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                            {selectedLesson.week_number && (
                              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">
                                Semaine {selectedLesson.week_number}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="hidden md:inline">Partager</span>
                          </button>
                          <Link
                            href="/admin/dashboard-v3"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span className="hidden md:inline">Modifier</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* 1. Journal d'apprentissage réflexif */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-cyan-500">
                        1. Journal d'apprentissage réflexif
                      </h3>
                      {/*<p className="text-gray-300 whitespace-pre-line leading-relaxed">
                        {selectedLesson.journal_reflexif}
                      </p> */}
                      <MarkdownRenderer content={selectedLesson.journal_reflexif} />
                    </div>

                    {/* 2. Synthèse personnelle des concepts clés */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-cyan-500">
                        2. Synthèse personnelle des concepts clés
                      </h3>
                      {/*<p className="text-gray-300 whitespace-pre-line leading-relaxed">
                        {selectedLesson.synthese_personnelle}
                      </p> */}
                      <MarkdownRenderer content={selectedLesson.synthese_personnelle} />
                    </div>

                    {/* 3. Application pratique dans mon contexte */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-cyan-500">
                        3. Application pratique dans mon contexte
                      </h3>
                      {/*<p className="text-gray-300 whitespace-pre-line leading-relaxed">
                        {selectedLesson.application_pratique}
                      </p> */}
                      <MarkdownRenderer content={selectedLesson.application_pratique} />
                    </div>

                    {/* 4. Auto-évaluation et méta-cognition */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-cyan-500">
                        4. Auto-évaluation et méta-cognition
                      </h3>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Ce que je maîtrise bien */}
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                          <h4 className="font-bold text-green-400 mb-3">
                            Ce que je maîtrise bien :
                          </h4>
                          {/*<p className="text-gray-300 whitespace-pre-line">
                            {selectedLesson.maitrise_bien}
                          </p>  */}
                          <MarkdownRenderer content={selectedLesson.maitrise_bien} />
                          
                        </div>

                        {/* Ce que je dois améliorer */}
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                          <h4 className="font-bold text-orange-400 mb-3">
                            Ce que je dois améliorer :
                          </h4>
                          {/*<p className="text-gray-300 whitespace-pre-line">
                            {selectedLesson.a_ameliorer}
                          </p> */}
                          <MarkdownRenderer content={selectedLesson.a_ameliorer} />
                        </div>

                        {/* Stratégie pour progresser */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                          <h4 className="font-bold text-blue-400 mb-3">
                            Stratégie pour progresser :
                          </h4>
                          {/*<p className="text-gray-300 whitespace-pre-line">
                            {selectedLesson.strategie_progression}
                          </p> */}
                          <MarkdownRenderer content={selectedLesson.strategie_progression} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {lessons.length === 0 && (
                  <div className="text-center py-20">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">Aucune leçon disponible pour le moment</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="bilan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass rounded-3xl p-8 border border-white/10"
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  Bilan final (à remplir en fin de semestre)
                </h2>
                <p className="text-gray-400 mb-8">
                  Réflexion globale sur l'ensemble du cours
                </p>

                {finalAssessment && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">
                        1. Ce que j'ai le plus appris dans ce cours :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        {/*<p className="text-gray-300 whitespace-pre-line">
                          {finalAssessment.appris_plus}
                        </p>*/}
                        <MarkdownRenderer content={finalAssessment.appris_plus} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">
                        2. Les compétences que je peux réutiliser ailleurs :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        {/*<p className="text-gray-300 whitespace-pre-line">
                          {finalAssessment.competences_reutilisables}
                        </p>*/}
                        <MarkdownRenderer content={finalAssessment.competences_reutilisables} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">
                        3. Mon plus grand défi :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        {/*<p className="text-gray-300 whitespace-pre-line">
                          {finalAssessment.plus_grand_defi}
                        </p>  */}
                        <MarkdownRenderer content={finalAssessment.plus_grand_defi} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">
                        4. Mes prochaines étapes d'apprentissage :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        {/*<p className="text-gray-300 whitespace-pre-line">
                          {finalAssessment.prochaines_etapes}
                        </p>*/}
                        <MarkdownRenderer content={finalAssessment.prochaines_etapes} />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer/>
    </>
  )
}
