'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { fetchLessons, fetchProfile, Profile, Lesson } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'
import ProfilePhoto from '@/components/ProfilePhoto'
import LessonTimeline from '@/components/LessonTimeline'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [profileData, lessonsData] = await Promise.all([
        fetchProfile(),
        fetchLessons()
      ])
      
      setProfile(profileData)
      setLessons(lessonsData)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      toast.error('Erreur de connexion à la base de données')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <CustomCursor />
      <ModernBackground />

      <div className="relative min-h-screen text-white overflow-hidden">
        {/* Header glassmorphism */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
        >
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AKW Courses Portfolio
              </span>
            </motion.div>

            <div className="flex items-center space-x-6">
              <Link href="/about" className="hover:text-cyan-400 transition-colors relative group">
                À propos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
              <Link href="/lessons" className="hover:text-cyan-400 transition-colors relative group">
                Leçons
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
              <Link href="/contact" className="hover:text-cyan-400 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section avec Photo */}
        <section id="about" className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo de profil avec effet de bordure animé */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, type: 'spring' }}
                className="flex justify-center"
              >
                <ProfilePhoto
                  photoUrl={profile?.photo_url || '/images/profile.jpg'}
                  name={profile?.name || 'Votre Nom'}
                  size="large"
                />
              </motion.div>

              {/* Informations personnelles */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="inline-block">
                    {profile?.name?.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-3"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {i === profile.name.split(' ').length - 1 ? (
                          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            {word}
                          </span>
                        ) : (
                          word
                        )}
                      </motion.span>
                    ))}
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-4 mb-8"
                >
                  <h2 className="text-2xl md:text-3xl text-cyan-400 font-semibold">
                    {profile?.title}
                  </h2>
                  
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Disponible pour des opportunités</span>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {profile?.bio}
                  </p>
                </motion.div>

                {/* Statistiques animées */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                  {[
                    { 
                      label: 'Leçons', 
                      value: lessons.length, 
                      color: 'from-green-500 to-emerald-500' 
                    },
                    { 
                      label: 'Semaines', 
                      value: lessons.length > 0 ? Math.max(...lessons.map(l => l.week_number || 0)) : 0, 
                      color: 'from-orange-500 to-amber-500' 
                    },
                    { 
                      label: 'Réflexions', 
                      value: lessons.filter(l => l.journal_reflexif && l.journal_reflexif.length > 100).length, 
                      color: 'from-blue-500 to-cyan-500' 
                    },
                    { 
                      label: 'Synthèses', 
                      value: lessons.filter(l => l.synthese_personnelle && l.synthese_personnelle.length > 50).length, 
                      color: 'from-purple-500 to-pink-500' 
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
                    >
                      <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Boutons d'action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <Link
                    href="/lessons"
                    className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Explorer les Leçons</span>
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button className="px-8 py-4 border-2 border-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-all duration-300 flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Télécharger CV</span>
                  </button>
                </motion.div>

                {/* Réseaux sociaux */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="flex space-x-4"
                >
                  {[
                    { icon: Github, url: profile?.github_url, label: 'GitHub' },
                    { icon: Linkedin, url: profile?.linkedin_url, label: 'LinkedIn' },
                    { icon: Mail, url: `mailto:${profile?.email}`, label: 'Email' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors group"
                      title={social.label}
                    >
                      <social.icon className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Timeline des leçons */}
        <section id="lessons" className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                Parcours d'
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Apprentissage
                </span>
              </motion.h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Découvrez mes réflexions, applications pratiques et auto-évaluations
                pour chaque leçon du cours d'Algorithmique et Complexité
              </p>
            </motion.div>

            <LessonTimeline lessons={lessons} />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 backdrop-blur-xl bg-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400">
                  © 2025 {profile?.name} - Courses Portfolio
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Université Virtuelle de Côte d'Ivoire (UVCI) | Master Big Data Analytics
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Propulsé par</span>
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 font-semibold">Next.js</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-blue-400 font-semibold">Supabase</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-purple-400 font-semibold">Three.js</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}