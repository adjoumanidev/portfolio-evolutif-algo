'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchLessons } from '@/lib/supabase'

export default function LessonsRedirect() {
  const router = useRouter()

  useEffect(() => {
    const redirect = async () => {
      const lessons = await fetchLessons()
      if (lessons.length > 0) {
        router.push(`/lessons/${lessons[0].slug}`)
      }
    }
    redirect()
  }, [router])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}