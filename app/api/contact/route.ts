// On pourrait uniliser les api pour l'envoi de message dans contact

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Utilise la clé service_role (bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // ⚠️ Clé secrète côté serveur
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Insertion avec service_role (bypass RLS)
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert([{ name, email, subject, message }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}


/*  Et dans contact modifierhandleSubmit par:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setSending(true)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!response.ok) throw new Error('Erreur envoi')

    setSent(true)
    toast.success('Message envoyé avec succès ! 🎉')

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

*/