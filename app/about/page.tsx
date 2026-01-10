'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Code2, 
  Brain, 
  Sparkles, 
  Target, 
  Zap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen
} from 'lucide-react'
import { fetchProfile, type Profile } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'
import ProfilePhoto from '@/components/ProfilePhoto'
import Footer from '@/components/Footer'



export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await fetchProfile()
      setProfile(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
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
      <CustomCursor />
      <ModernBackground />

      <div className="relative min-h-screen text-white">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10"
        >
          <div className="container mx-auto px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </motion.header>

        {/* Hero Section avec Photo */}
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center mb-16"
            >
              {/* Photo de profil animée */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                {/*<ProfilePhoto
                  src={profile?.photo_url || '/images/profile.jpg'}
                  alt={profile?.name || 'Profile'}
                  size="large"
                /> */}
                <ProfilePhoto
                    photoUrl={profile?.photo_url || '/images/profile.jpg'}
                    name={profile?.name || 'Votre Nom'}
                    size="large"
                />

              </motion.div>

              {/* Titre animé */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-6xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {profile?.name || 'Adjoumani'}
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl text-gray-300 mb-8 max-w-3xl"
              >
                {profile?.title || 'Étudiant en Data Analytics & Développeur Full-Stack'}
              </motion.p>

              {/* Icônes sociales */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                {profile?.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Grid de compétences et informations */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Carte Bio */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="glass rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-3xl font-bold">À propos</h2>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {profile?.bio || "Passionné par la data science, l'algorithmique et le développement web. Je documente mon apprentissage à travers ce portfolio évolutif."}
                </p>
              </motion.div>

              {/* Carte Formation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="glass rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                  <h2 className="text-3xl font-bold">Formation</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-bold text-cyan-400 mb-1">
                      Master 1 Big Data Analytics
                    </h3>
                    <p className="text-gray-400 text-sm">UVCI - En cours</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-bold text-cyan-400 mb-1">
                      Licence Data Analysis
                    </h3>
                    <p className="text-gray-400 text-sm">INP-HB Yamoussoukro</p>
                  </div>
                </div>
              </motion.div>

              {/* Carte Compétences Techniques */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="glass rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-8 h-8 text-purple-400" />
                  <h2 className="text-3xl font-bold">Stack Technique</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Python',
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Node.js',
                    'Talend',
                    'SQL',
                    'MongoDB',
                    'Supabase',
                    'Flutter',
                    'Pandas',
                    'NumPy',
                  ].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 + i * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl text-center font-medium"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Carte Objectifs */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="glass rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-green-400" />
                  <h2 className="text-3xl font-bold">Objectifs</h2>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      icon: Sparkles,
                      text: 'Maîtriser les algorithmes et structures de données',
                    },
                    {
                      icon: Zap,
                      text: 'Créer des solutions data-driven pour l\'Afrique',
                    },
                    {
                      icon: Award,
                      text: 'Devenir Data Engineer certifié',
                    },
                    {
                      icon: BookOpen,
                      text: 'Contribuer à des projets open source',
                    },
                  ].map((goal, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <goal.icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{goal.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mt-16 text-center"
            >
              <div className="glass rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">
                  Collaborons ensemble ! 🚀
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Vous avez un projet data ou web ? Je suis ouvert aux opportunités et collaborations.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
                  >
                    Me contacter
                  </Link>
                  <Link
                    href="/lessons"
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    Voir mes leçons
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}