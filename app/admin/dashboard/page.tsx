'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  LogOut,
  User,
  Upload,
  Save,
  Award,
  Clock,
  FileText,
} from 'lucide-react'
import { getCurrentUser, signOut, uploadProfilePhoto } from '@/lib/supabase-auth'
import {
  fetchLessons,
  fetchProfile,
  fetchFinalAssessment,
  createLesson,
  updateLesson,
  deleteLesson,
  updateProfile,
  updateFinalAssessment,
  type Lesson,
  type Profile,
  type FinalAssessment,
} from '@/lib/supabase'
import { LessonModalV3 } from '@/components/LessonModal'
import { transformFormToSQL} from '@/lib/transformers'
import type { LessonFormData } from '@/lib/transformers'
import Footer from '@/components/Footer'
import toast, { Toaster } from 'react-hot-toast'


export default function AdminDashboardV3() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [finalAssessment, setFinalAssessment] = useState<FinalAssessment | null>(null)
  const [activeTab, setActiveTab] = useState<'lessons' | 'profile' | 'bilan'>('lessons')
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          router.push('/admin/login')
          return
        }
        await loadData()
      } catch (error) {
        router.push('/admin/login')
      }
    }
    checkAuth()
  }, [router])

  const loadData = async () => {
    setLoading(true)
    try {
      const [lessonsData, profileData, bilanData] = await Promise.all([
        fetchLessons(),
        fetchProfile(),
        fetchFinalAssessment(),
      ])
      setLessons(lessonsData)
      setProfile(profileData)
      setFinalAssessment(bilanData)
    } catch (error) {
      console.error('Erreur chargement données:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Erreur déconnexion:', error)
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return

    setUploadingPhoto(true)
    try {
      const photoUrl = await uploadProfilePhoto(file)
      await updateProfile({ photo_url: photoUrl })
      setProfile({ ...profile, photo_url: photoUrl })
    } catch (error) {
      console.error('Erreur upload photo:', error)
      alert('Erreur lors de l\'upload de la photo')
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleDeleteLesson = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?')) return

    try {
      await deleteLesson(id)
      setLessons(lessons.filter((l) => l.id !== id))
    } catch (error) {
      console.error('Erreur suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Administration</h1>
              <p className="text-sm text-gray-400">Portfolio Évolutif Algorithmique</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            label="Total Leçons"
            value={lessons.length}
            color="cyan"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            label="Semaines Couvertes"
            value={new Set(lessons.map(l => l.week_number).filter(Boolean)).size}
            color="purple"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            label="Progrès"
            value={`${Math.round((lessons.length / 12) * 100)}%`}
            color="green"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'lessons'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Leçons
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-5 h-5 inline mr-2" />
            Profil
          </button>
          <button
            onClick={() => setActiveTab('bilan')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'bilan'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            Bilan Final
          </button>
        </div>

        {/* Contenu */}
        {activeTab === 'lessons' ? (
          <LessonsTab
            lessons={lessons}
            onAdd={() => {
              setEditingLesson(null)
              setShowLessonModal(true)
            }}
            onEdit={(lesson) => {
              setEditingLesson(lesson)
              setShowLessonModal(true)
            }}
            onDelete={handleDeleteLesson}
          />
        ) : activeTab === 'profile' ? (
          <ProfileTab
            profile={profile}
            onPhotoUpload={handlePhotoUpload}
            uploadingPhoto={uploadingPhoto}
            onUpdate={async (data) => {
              if (!profile) return
              const updated = await updateProfile(data)
              setProfile(updated)
            }}
          />
        ) : (
          <BilanFinalTab
            bilan={finalAssessment}
            onUpdate={async (data) => {
              if (!finalAssessment) return
              const updated = await updateFinalAssessment(data)
              setFinalAssessment(updated)
            }}
          />
        )}
      </div>

      {/* Modal Leçon */}
      <AnimatePresence>
        {showLessonModal && (
          <LessonModalV3
            lesson={editingLesson}
            onClose={() => setShowLessonModal(false)}
            onSave={async (formData: LessonFormData) => {
              try {
                const sqlData = transformFormToSQL(formData)
                console.log('📤 Données à envoyer:', sqlData)
                
                if (editingLesson) {
                  const updated = await updateLesson(editingLesson.id, sqlData)
                  setLessons(lessons.map((l) => (l.id === updated.id ? updated : l)))
                } else {
                  const created = await createLesson(sqlData)
                  setLessons([...lessons, created])
                }
                
                setShowLessonModal(false)
                await loadData()
              } catch (error) {
                console.error('❌ Erreur sauvegarde:', error)
                alert('Erreur lors de la sauvegarde')
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Composant StatCard
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-pink-600',
  }

  return (
    <div className="glass rounded-2xl p-6 border border-white/10">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center mb-4 text-white`}
      >
        {icon}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

// Composant LessonsTab
function LessonsTab({
  lessons,
  onAdd,
  onEdit,
  onDelete,
}: {
  lessons: Lesson[]
  onAdd: () => void
  onEdit: (lesson: Lesson) => void
  onDelete: (id: string) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestion des Leçons</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Leçon
        </button>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {lesson.week_number && (
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
                      Semaine {lesson.week_number}
                    </span>
                  )}
                  <span className="text-sm text-gray-400">
                    {new Date(lesson.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {lesson.journal_reflexif.substring(0, 150)}...
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(lesson)}
                  className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(lesson.id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {lessons.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Aucune leçon pour le moment</p>
            <p className="text-sm">Cliquez sur "Nouvelle Leçon" pour commencer</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Composant ProfileTab
// function ProfileTab({
//   profile,
//   onPhotoUpload,
//   uploadingPhoto,
//   onUpdate,
// }: {
//   profile: Profile | null
//   onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
//   uploadingPhoto: boolean
//   onUpdate: (data: Partial<Profile>) => void
// }) {
//   const [formData, setFormData] = useState<Partial<Profile>>(profile || {})

//   useEffect(() => {
//     if (profile) {
//       setFormData(profile)
//     }
//   }, [profile])

//   if (!profile) return null

//   return (
//     <div className="glass rounded-2xl p-8 border border-white/10">
//       <h2 className="text-2xl font-bold text-white mb-6">Gestion du Profil</h2>

//       {/* Photo de profil */}
//       <div className="mb-8">
//         <label className="block text-sm font-medium text-gray-300 mb-4">
//           Photo de profil
//         </label>
//         <div className="flex items-center gap-6">
//           <div className="relative">
//             <img
//               src={profile.photo_url || '/images/default-avatar.png'}
//               alt={profile.name}
//               className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500/30"
//             />
//             {uploadingPhoto && (
//               <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
//                 <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               </div>
//             )}
//           </div>
//           <label className="cursor-pointer">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={onPhotoUpload}
//               className="hidden"
//               disabled={uploadingPhoto}
//             />
//             <div className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl transition-colors">
//               <Upload className="w-5 h-5" />
//               {uploadingPhoto ? 'Upload en cours...' : 'Changer la photo'}
//             </div>
//           </label>
//         </div>
//       </div>

//       {/* Formulaire */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
//           <input
//             type="text"
//             value={formData.name || ''}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
//           <input
//             type="text"
//             value={formData.title || ''}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
//           <textarea
//             value={formData.bio || ''}
//             onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//             rows={4}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
//           <input
//             type="email"
//             value={formData.email || ''}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
//           <input
//             type="url"
//             value={formData.github_url || ''}
//             onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
//           <input
//             type="url"
//             value={formData.linkedin_url || ''}
//             onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//       </div>

//       <button
//         onClick={() => onUpdate(formData)}
//         className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
//       >
//         <Save className="w-5 h-5" />
//         Enregistrer les modifications
//       </button>
//     </div>
//   )
// }


// Modifie le composant ProfileTab
function ProfileTab({
  profile,
  onPhotoUpload,
  uploadingPhoto,
  onUpdate,
}: {
  profile: Profile | null
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploadingPhoto: boolean
  onUpdate: (data: Partial<Profile>) => void
}) {
  const [formData, setFormData] = useState<Partial<Profile>>(profile || {})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      setFormData(profile)
    }
  }, [profile])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onUpdate(formData)
      toast.success('Profil mis à jour avec succès ! 🎉')
    } catch (error) {
      console.error('Erreur mise à jour profil:', error)
      toast.error('Erreur lors de la mise à jour du profil')
    } finally {
      setSaving(false)
    }
  }

  if (!profile) return null

  return (
    <div className="glass rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Gestion du Profil</h2>

      {/* Photo de profil */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Photo de profil
        </label>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profile.photo_url || '/images/default-avatar.png'}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500/30"
            />
            {uploadingPhoto && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoUpload}
              className="hidden"
              disabled={uploadingPhoto}
            />
            <div className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl transition-colors">
              <Upload className="w-5 h-5" />
              {uploadingPhoto ? 'Upload en cours...' : 'Changer la photo'}
            </div>
          </label>
        </div>
      </div>

      {/* Formulaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
          <input
            type="url"
            value={formData.github_url || ''}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
          <input
            type="url"
            value={formData.linkedin_url || ''}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enregistrement...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Enregistrer les modifications
          </>
        )}
      </button>
    </div>
  )
}

// Composant BilanFinalTab
// function BilanFinalTab({
//   bilan,
//   onUpdate,
// }: {
//   bilan: FinalAssessment | null
//   onUpdate: (data: Partial<FinalAssessment>) => void
// }) {
//   const [formData, setFormData] = useState<Partial<FinalAssessment>>(bilan || {})

//   useEffect(() => {
//     if (bilan) {
//       setFormData(bilan)
//     }
//   }, [bilan])

//   if (!bilan) return null

//   return (
//     <div className="glass rounded-2xl p-8 border border-white/10">
//       <h2 className="text-2xl font-bold text-white mb-2">Bilan Final de Semestre</h2>
//       <p className="text-gray-400 mb-6">À remplir en fin de semestre</p>

//       <div className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             1. Ce que j'ai le plus appris dans ce cours
//           </label>
//           <textarea
//             value={formData.appris_plus || ''}
//             onChange={(e) => setFormData({ ...formData, appris_plus: e.target.value })}
//             rows={4}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             2. Les compétences que je peux réutiliser ailleurs
//           </label>
//           <textarea
//             value={formData.competences_reutilisables || ''}
//             onChange={(e) => setFormData({ ...formData, competences_reutilisables: e.target.value })}
//             rows={4}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             3. Mon plus grand défi
//           </label>
//           <textarea
//             value={formData.plus_grand_defi || ''}
//             onChange={(e) => setFormData({ ...formData, plus_grand_defi: e.target.value })}
//             rows={4}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             4. Mes prochaines étapes d'apprentissage
//           </label>
//           <textarea
//             value={formData.prochaines_etapes || ''}
//             onChange={(e) => setFormData({ ...formData, prochaines_etapes: e.target.value })}
//             rows={4}
//             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//       </div>

//       <button
//         onClick={() => onUpdate(formData)}
//         className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
//       >
//         <Save className="w-5 h-5" />
//         Enregistrer le bilan
//       </button>
//       
//     </div>
//   )
// }

// Modifie le composant BilanFinalTab
function BilanFinalTab({
  bilan,
  onUpdate,
}: {
  bilan: FinalAssessment | null
  onUpdate: (data: Partial<FinalAssessment>) => void
}) {
  const [formData, setFormData] = useState<Partial<FinalAssessment>>(bilan || {})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (bilan) {
      setFormData(bilan)
    }
  }, [bilan])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onUpdate(formData)
      toast.success('Bilan final mis à jour avec succès ! 🎉')
    } catch (error) {
      console.error('Erreur mise à jour bilan:', error)
      toast.error('Erreur lors de la mise à jour du bilan')
    } finally {
      setSaving(false)
    }
  }

  if (!bilan) return null

  return (
    <>
      <div className="glass rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">Bilan Final de Semestre</h2>
        <p className="text-gray-400 mb-6">À remplir en fin de semestre</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              1. Ce que j'ai le plus appris dans ce cours
            </label>
            <textarea
              value={formData.appris_plus || ''}
              onChange={(e) => setFormData({ ...formData, appris_plus: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              2. Les compétences que je peux réutiliser ailleurs
            </label>
            <textarea
              value={formData.competences_reutilisables || ''}
              onChange={(e) => setFormData({ ...formData, competences_reutilisables: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              3. Mon plus grand défi
            </label>
            <textarea
              value={formData.plus_grand_defi || ''}
              onChange={(e) => setFormData({ ...formData, plus_grand_defi: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              4. Mes prochaines étapes d'apprentissage
            </label>
            <textarea
              value={formData.prochaines_etapes || ''}
              onChange={(e) => setFormData({ ...formData, prochaines_etapes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Enregistrer le bilan
            </>
          )}
        </button>
      </div>
      <Footer />
    </>
  )
}