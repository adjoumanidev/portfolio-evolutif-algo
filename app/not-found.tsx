'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Home,
  Search,
  BookOpen,
  Mail,
  User,
  Sparkles,
  Zap,
  AlertCircle,
} from 'lucide-react'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'

export default function NotFoundPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(30)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // Générer des particules aléatoires
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    // Countdown automatique
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      router.push('/')
    }
  }, [countdown, router])  

  const quickLinks = [
    {
      icon: Home,
      label: 'Accueil',
      href: '/',
      color: 'from-cyan-500 to-blue-600',
      description: 'Retour à la page d\'accueil',
    },
    {
      icon: BookOpen,
      label: 'Mes Leçons',
      href: '/lessons',
      color: 'from-purple-500 to-pink-600',
      description: 'Découvrir mes apprentissages',
    },
    {
      icon: User,
      label: 'À Propos',
      href: '/about',
      color: 'from-green-500 to-emerald-600',
      description: 'En savoir plus sur moi',
    },
    {
      icon: Mail,
      label: 'Contact',
      href: '/contact',
      color: 'from-orange-500 to-red-600',
      description: 'Me contacter',
    },
  ]

  return (
    <>
      <CustomCursor />
      <ModernBackground />

      {/* Particules flottantes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 bg-cyan-400/30 rounded-full blur-sm"
          initial={{ x: `${particle.x}vw`, y: `${particle.y}vh`, opacity: 0 }}
          animate={{
            x: `${particle.x + (Math.random() - 0.5) * 20}vw`,
            y: `${particle.y + (Math.random() - 0.5) * 20}vh`,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="container mx-auto px-6 py-20 relative z-10">
          {/* Icône d'erreur animée */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10"
              >
                <AlertCircle className="w-16 h-16 text-cyan-400" />
              </motion.div>

              {/* Anneaux pulsants */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 border-2 border-cyan-400 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
                className="absolute inset-0 border-2 border-purple-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* Titre 404 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <motion.h1
              className="text-9xl md:text-[12rem] font-bold mb-4 leading-none"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Oups ! Page introuvable
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Il semblerait que cette page ait décidé de prendre des vacances... 
              ou peut-être qu'elle n'a jamais existé ? 🤔
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-3 mb-12"
            >
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              <p className="text-gray-300">
                Redirection automatique dans{' '}
                <span className="text-cyan-400 font-bold text-2xl">{countdown}</span>{' '}
                secondes
              </p>
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            </motion.div>

            {/* Bouton principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-16"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 group"
              >
                <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Retour à l'accueil
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <Search className="w-6 h-6 text-cyan-400" />
              Ou explorez ces pages
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all hover:scale-105 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <link.icon className="w-6 h-6 text-white" />
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {link.label}
                    </h4>

                    <p className="text-sm text-gray-400">{link.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Message fun */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center mt-16"
          >
            <div className="glass rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
              <p className="text-gray-300 italic">
                💡 <span className="font-semibold">Fun fact :</span> Saviez-vous que le code d'erreur 404 
                vient de la pièce 404 du CERN où se trouvait le premier serveur web ? 
                En réalité, c'est un mythe, mais l'histoire est cool ! 😄
              </p>
            </div>
          </motion.div>

          {/* Citation motivante */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            className="text-center mt-8"
          >
            <p className="text-gray-500 italic">
              "Se perdre, c'est parfois le meilleur moyen de se retrouver." 
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}













// 'use client'

// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import {
//   Home,
//   BookOpen,
//   Mail,
//   User,
//   Sparkles,
//   Terminal,
//   Code2,
//   Cpu,
// } from 'lucide-react'
// import ModernBackground from '@/components/ModernBackground'
// import CustomCursor from '@/components/CustomCursor'

// export default function NotFoundPageGlitch() {
//   const router = useRouter()
//   const [glitchText, setGlitchText] = useState('404')
//   const [showMatrix, setShowMatrix] = useState(false)

//   useEffect(() => {
//     // Effet glitch sur le texte
//     const glitchInterval = setInterval(() => {
//       const chars = '!@#$%^&*()404ERRORNOTFOUND'
//       const randomText = Array.from({ length: 3 })
//         .map(() => chars[Math.floor(Math.random() * chars.length)])
//         .join('')
      
//       setGlitchText(randomText)
      
//       setTimeout(() => setGlitchText('404'), 100)
//     }, 3000)

//     // Effet matrix
//     setShowMatrix(true)

//     return () => clearInterval(glitchInterval)
//   }, [])

//   const consoleCommands = [
//     { command: '$ npm run find-page', output: 'Error: Page not found (404)', status: 'error' },
//     { command: '$ git status', output: 'On branch main\nNothing to commit', status: 'success' },
//     { command: '$ cd /', output: 'Returning to home...', status: 'success' },
//   ]

//   const quickLinks = [
//     { icon: Home, label: 'Home', href: '/', color: 'cyan' },
//     { icon: BookOpen, label: 'Lessons', href: '/lessons', color: 'purple' },
//     { icon: User, label: 'About', href: '/about', color: 'green' },
//     { icon: Mail, label: 'Contact', href: '/contact', color: 'orange' },
//   ]

//   return (
//     <>
//       <CustomCursor />
//       <ModernBackground />

//       <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
//         {/* Matrix effect background */}
//         {showMatrix && (
//           <div className="absolute inset-0 opacity-5">
//             {Array.from({ length: 20 }).map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute text-cyan-400 font-mono text-xs"
//                 initial={{ y: -100, x: `${i * 5}%` }}
//                 animate={{ y: '100vh' }}
//                 transition={{
//                   duration: 5 + Math.random() * 5,
//                   repeat: Infinity,
//                   ease: 'linear',
//                   delay: Math.random() * 2,
//                 }}
//               >
//                 {Array.from({ length: 30 })
//                   .map(() => Math.random().toString(36)[2])
//                   .join('\n')}
//               </motion.div>
//             ))}
//           </div>
//         )}

//         <div className="container mx-auto px-6 py-20 relative z-10">
//           <div className="max-w-6xl mx-auto">
//             {/* Terminal-style header */}
//             <motion.div
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="glass rounded-t-2xl p-4 border border-white/10 border-b-0 flex items-center gap-2"
//             >
//               <div className="flex gap-2">
//                 <div className="w-3 h-3 rounded-full bg-red-500" />
//                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
//                 <div className="w-3 h-3 rounded-full bg-green-500" />
//               </div>
//               <Terminal className="w-4 h-4 text-gray-400 ml-4" />
//               <span className="text-sm text-gray-400 font-mono">terminal — 404 error</span>
//             </motion.div>

//             {/* Terminal content */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="glass rounded-b-2xl p-8 border border-white/10 font-mono"
//             >
//               {/* Glitch 404 */}
//               <motion.div
//                 className="text-center mb-12"
//                 animate={{
//                   textShadow: [
//                     '0 0 10px rgba(6, 182, 212, 0.5)',
//                     '2px 2px 0 rgba(6, 182, 212, 0.8), -2px -2px 0 rgba(236, 72, 153, 0.8)',
//                     '0 0 10px rgba(6, 182, 212, 0.5)',
//                   ],
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   repeat: Infinity,
//                   repeatDelay: 3,
//                 }}
//               >
//                 <h1 className="text-8xl md:text-9xl font-bold text-cyan-400 mb-4 select-none">
//                   {glitchText}
//                 </h1>
//                 <div className="flex items-center justify-center gap-3 text-xl text-gray-300">
//                   <Code2 className="w-6 h-6 text-red-400" />
//                   <span>ERROR: PAGE_NOT_FOUND</span>
//                   <Code2 className="w-6 h-6 text-red-400" />
//                 </div>
//               </motion.div>

//               {/* Console commands simulation */}
//               <div className="space-y-4 mb-8">
//                 {consoleCommands.map((cmd, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5 + index * 0.3 }}
//                     className="space-y-1"
//                   >
//                     <div className="flex items-center gap-2 text-cyan-400">
//                       <span>→</span>
//                       <span>{cmd.command}</span>
//                     </div>
//                     <div
//                       className={`pl-4 ${
//                         cmd.status === 'error' ? 'text-red-400' : 'text-green-400'
//                       }`}
//                     >
//                       {cmd.output}
//                     </div>
//                   </motion.div>
//                 ))}

//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: [0, 1, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                   className="flex items-center gap-2 text-cyan-400 pt-4"
//                 >
//                   <span>→</span>
//                   <span className="inline-block w-2 h-5 bg-cyan-400" />
//                 </motion.div>
//               </div>

//               {/* Error details box */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.4 }}
//                 className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8"
//               >
//                 <div className="flex items-start gap-3">
//                   <Cpu className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
//                   <div className="flex-1">
//                     <h3 className="text-red-400 font-bold mb-2">SYSTEM ERROR REPORT</h3>
//                     <div className="text-sm text-gray-300 space-y-1">
//                       <p>
//                         <span className="text-gray-500">Status Code:</span>{' '}
//                         <span className="text-red-400">404</span>
//                       </p>
//                       <p>
//                         <span className="text-gray-500">Error Type:</span> NOT_FOUND
//                       </p>
//                       <p>
//                         <span className="text-gray-500">Message:</span> The requested resource could
//                         not be found on this server
//                       </p>
//                       <p>
//                         <span className="text-gray-500">Suggestion:</span> Navigate back to a valid
//                         route
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Navigation options */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1.6 }}
//               >
//                 <p className="text-gray-400 mb-4">AVAILABLE_ROUTES:</p>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {quickLinks.map((link, index) => (
//                     <motion.div
//                       key={link.label}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 1.8 + index * 0.1 }}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Link
//                         href={link.href}
//                         className={`block bg-${link.color}-500/10 hover:bg-${link.color}-500/20 border border-${link.color}-500/30 rounded-lg p-4 transition-all group`}
//                       >
//                         <link.icon
//                           className={`w-8 h-8 text-${link.color}-400 mb-2 group-hover:scale-110 transition-transform`}
//                         />
//                         <div className={`text-sm text-${link.color}-400 font-semibold`}>
//                           /{link.label.toLowerCase()}
//                         </div>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Bottom action */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 2.2 }}
//                 className="mt-8 text-center"
//               >
//                 <Link
//                   href="/"
//                   className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 group"
//                 >
//                   <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//                   <span className="font-mono">cd ~/home</span>
//                   <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform" />
//                 </Link>
//               </motion.div>

//               {/* Fun fact */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 2.5 }}
//                 className="mt-8 pt-8 border-t border-white/10"
//               >
//                 <p className="text-xs text-gray-500 text-center">
//                   <span className="text-cyan-400">#</span> Did you know? The first documented case
//                   of a 404 error was at CERN in 1992. Actually, that's debatable, but who's
//                   checking? 😉
//                 </p>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }