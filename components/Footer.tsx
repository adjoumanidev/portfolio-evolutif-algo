'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MapPin, Github, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Accueil', href: '/' },
        { label: 'Leçons', href: '/lessons' },
        { label: 'À propos', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Portfolio', href: '/' },
        { label: 'Projets', href: '/#projects' },
        { label: 'Compétences', href: '/#skills' },
      ],
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Adjoum',
      label: 'GitHub',
      color: 'hover:text-gray-400',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/koffi-wilfried-adjoumani/',
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
    },
    {
      icon: Mail,
      href: 'mailto:adjoumanideveloppeurwebmob@gmail.com',
      label: 'Email',
      color: 'hover:text-cyan-400',
    },
  ]

  return (
    <footer className="relative mt-20 backdrop-blur-xl bg-slate-950/80 border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
              AlgoMaster Portfolio
            </h3>
            <p className="text-gray-400 mb-4">
              Portfolio évolutif documentant mon parcours d'apprentissage en algorithmique et Big Data Analytics.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:scale-110 ${social.color}`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} ADJOUMANI Koffi Wilfried. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Fait avec ressources propres en Côte d'Ivoire 🇨🇮
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}