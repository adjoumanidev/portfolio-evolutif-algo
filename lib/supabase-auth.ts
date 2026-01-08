import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client pour l'authentification
export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Types pour l'authentification
export interface AuthUser {
  id: string
  email: string
  role?: string
}

// Fonction de connexion
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// Fonction de déconnexion
export const signOut = async () => {
  const { error } = await supabaseAuth.auth.signOut()
  if (error) throw error
}

// Fonction pour obtenir l'utilisateur actuel
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabaseAuth.auth.getUser()
  if (error) throw error
  return user
}

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser()
    return !!user
  } catch {
    return false
  }
}

// Fonction pour créer un utilisateur admin (à utiliser une seule fois)
export const createAdminUser = async (email: string, password: string) => {
  const { data, error } = await supabaseAuth.auth.signUp({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// Fonction pour uploader une image de profil
export const uploadProfilePhoto = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `profile-${Date.now()}.${fileExt}`
  const filePath = `profiles/${fileName}`

  const { data, error } = await supabaseAuth.storage
    .from('photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) throw error

  // Obtenir l'URL publique
  const { data: { publicUrl } } = supabaseAuth.storage
    .from('photos')
    .getPublicUrl(filePath)

  return publicUrl
}

// Fonction pour supprimer une photo
export const deletePhoto = async (photoUrl: string) => {
  // Extraire le chemin du fichier depuis l'URL
  const path = photoUrl.split('/photos/')[1]
  
  if (!path) return
  
  const { error } = await supabaseAuth.storage
    .from('photos')
    .remove([path])

  if (error) throw error
}