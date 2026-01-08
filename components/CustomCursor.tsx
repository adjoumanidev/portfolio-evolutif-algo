'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.closest('a, button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Curseur principal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Point central */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0.8 : 1,
            width: isHovering ? '8px' : '6px',
            height: isHovering ? '8px' : '6px',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />

        {/* Cercle extérieur */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 2 : 1.5,
            width: isHovering ? '48px' : '32px',
            height: isHovering ? '48px' : '32px',
            opacity: isHovering ? 0.8 : 0.6,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />

        {/* Particules orbitales */}
        {isHovering && (
          <>
            {[0, 90, 180, 270].map((angle) => (
              <motion.div
                key={angle}
                className="absolute w-2 h-2 rounded-full bg-cyan-400"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 30,
                  y: Math.sin((angle * Math.PI) / 180) * 30,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}

        {/* Trail effect */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500"
            style={{
              width: `${12 - i * 3}px`,
              height: `${12 - i * 3}px`,
            }}
            animate={{
              scale: [1, 0],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Curseur de suivi retardé (effet de traînée) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 15,
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border border-purple-500/30"
          animate={{
            scale: isHovering ? 1.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.div>

      {/* Style global pour cacher le curseur par défaut */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        a, button, input, textarea, select {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}