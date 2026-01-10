'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Mail,
  Send,
  User,
  MessageSquare,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'
import { createContact } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'




export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      // ✅ Envoyer à Supabase
      await createContact(formData)
      
      setSent(true)
      toast.success('Message envoyé avec succès ! 🎉')

      // Reset après 3 secondes
      setTimeout(() => {
        setSent(false)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    } catch (error) {
      console.error('Erreur envoi:', error)
      toast.error('Erreur lors de l\'envoi du message. Réessayez.')
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'adjoumanideveloppeurwebmob@gmail.com',
      href: 'mailto:adjoumanideveloppeurwebmob@gmail.com',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+225 07 78 28 88 68',
      href: 'tel:+225077828868',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'San-Pedro, Côte d\'Ivoire',
      href: 'https://maps.google.com/?q=San-pedro',
      color: 'from-purple-500 to-pink-600',
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Adjoum',
      color: 'hover:text-gray-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/koffi-wilfried-adjoumani/',
      color: 'hover:text-blue-400',
    },
  ]

  return (
    <>
      <Toaster position="top-right" />
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

        <div className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            {/* Titre */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Contactez-moi
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                Une question ? Un projet ? N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais ! ⚡
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="md:col-span-3 glass rounded-3xl p-8 border border-white/10"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Send className="w-8 h-8 text-cyan-400" />
                  Envoyez un message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="votre.email@example.com"
                    />
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Sujet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="Ex: Proposition de collaboration"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  {/* Bouton Envoyer */}
                  <button
                    type="submit"
                    disabled={sending || sent}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : sent ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2 space-y-6"
              >
                {/* Cartes de contact */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="block glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all hover:scale-105 group"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                          <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Réseaux sociaux */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="glass rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="font-bold text-white mb-4">Suivez-moi</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110 ${social.color}`}
                        title={social.label}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Disponibilité */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="glass rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="font-bold text-white mb-3">Disponibilité</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-gray-300">Actuellement disponible</span>
                    </div>
                    <p className="text-gray-400">
                      Temps de réponse : <span className="text-cyan-400">24-48h</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-16 text-center"
            >
              <div className="glass rounded-3xl p-8 border border-white/10 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Vous préférez discuter en direct ? 💬
                </h3>
                <p className="text-gray-300 mb-6">
                  Je suis disponible pour un appel ou une visioconférence pour discuter de vos projets.
                </p>
                <a
                  href="https://wa.me/225077828868"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all hover:scale-105"
                >
                  Discuter sur WhatsApp 💬
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}