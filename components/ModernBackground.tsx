'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedStars() {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Génération de 5000 étoiles aléatoires
  const particlesPosition = new Float32Array(5000 * 3)
  
  for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 10
    const y = (Math.random() - 0.5) * 10
    const z = (Math.random() - 0.5) * 10
    
    particlesPosition.set([x, y, z], i * 3)
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.075
    }
  })

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      const positions = meshRef.current.geometry.attributes.position

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        
        const waveX = Math.sin(x + time) * 0.2
        const waveY = Math.sin(y + time * 0.5) * 0.2
        
        positions.setZ(i, waveX + waveY)
      }
      
      positions.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[10, 10, 50, 50]} />
      <meshStandardMaterial
        color="#06b6d4"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

function FloatingOrbs() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <FloatingOrb key={i} position={[
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ]} />
      ))}
    </>
  )
}

function FloatingOrb({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.001
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

export default function ModernBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient de base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
      
      {/* Overlay avec animation */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-purple-500/5 animate-pulse-slow" />
      
      {/* Canvas Three.js */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <AnimatedStars />
        <WaveGrid />
        <FloatingOrbs />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Effet de vignette */}
      <div className="absolute inset-0 bg-radial-gradient opacity-50" />

      {/* Grille animée en overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Faisceaux lumineux */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-500/20 to-transparent blur-xl animate-pulse" />
      <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-purple-500/20 to-transparent blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}