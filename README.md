# 🚀 AlgoMaster Pro - Portfolio Évolutif avec Supabase

Portfolio moderne et professionnel avec **persistance des données** via Supabase pour votre cours d'Algorithmique et Complexité - Master Big Data Analytics UVCI.

## ✨ Nouvelles Fonctionnalités PRO

### 🎨 Effets Visuels Éblouissants
- ✅ **Background 3D animé** avec Three.js (étoiles, grilles ondulantes, orbes flottantes)
- ✅ **Curseur personnalisé animé** avec traînée et effets de particules
- ✅ **Photo de profil** avec bordure animée parcourant les 4 côtés en boucle
- ✅ **Particules orbitales** autour de la photo
- ✅ **Effets de glassmorphism** avancés
- ✅ **Animations Framer Motion** ultra-fluides
- ✅ **Dégradés animés** et effets de lueur

### 💾 Persistance des Données avec Supabase
- ✅ **Base de données PostgreSQL gratuite** (500 MB)
- ✅ **Leçons sauvegardées** et accessibles à tous les visiteurs
- ✅ **Profil dynamique** mis à jour en temps réel
- ✅ **API automatique** générée par Supabase
- ✅ **Mises à jour en temps réel** possibles
- ✅ **Accessible aux recruteurs** via URL publique

## 🎯 Comparaison : Avant vs Maintenant

| Fonctionnalité | Version Simple | **Version PRO avec Supabase** |
|----------------|----------------|-------------------------------|
| Stockage données | Fichiers locaux | ✅ **Base de données cloud** |
| Accessible visiteurs | ❌ | ✅ **Oui, en temps réel** |
| Ajout de leçons | Modifier le code | ✅ **Interface admin possible** |
| Backup automatique | ❌ | ✅ **Oui, par Supabase** |
| Partage facile | URL seulement | ✅ **URL + données live** |
| Curseur animé | ❌ | ✅ **Effet professionnel** |
| Background 3D | Particules 2D | ✅ **Three.js avancé** |
| Photo de profil | Image simple | ✅ **Bordure animée 4 côtés** |
| Performance | Bonne | ✅ **Excellente (CDN)** |

## 📦 Technologies Utilisées

- **Framework**: Next.js 14 (React)
- **Base de données**: Supabase (PostgreSQL)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D**: Three.js + React Three Fiber
- **Notifications**: React Hot Toast
- **Icônes**: Lucide React
- **Déploiement**: Vercel (gratuit)

## 🚀 Installation Rapide (10 minutes)

### Prérequis
- Node.js 18+ installé
- Compte Supabase (gratuit)
- Compte Vercel (gratuit, optionnel)

### Étape 1: Installation des dépendances
```bash
npm install
```

### Étape 2: Configuration Supabase

#### A. Créer un compte Supabase
1. Allez sur https://supabase.com
2. Cliquez sur "Start your project"
3. Créez un nouveau projet (choisissez une région proche : Frankfurt ou London)
4. Attendez ~2 minutes que le projet se crée

#### B. Créer les tables
1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Copiez le contenu du fichier `supabase-schema.sql`
3. Collez-le dans l'éditeur SQL
4. Cliquez sur **"Run"**
5. ✅ Vos tables sont créées !

#### C. Récupérer les clés API
1. Allez dans **Settings** > **API**
2. Copiez :
   - `Project URL` (commence par https://xxx.supabase.co)
   - `anon/public key` (longue chaîne de caractères)

#### D. Configurer les variables d'environnement
1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_ici
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_ici
```

### Étape 3: Ajouter votre photo
1. Placez votre photo dans `public/images/profile.jpg`
2. Ou mettez à jour l'URL dans Supabase (table `profile`)

### Étape 4: Lancer le projet
```bash
npm run dev
```

Ouvrez http://localhost:3000 🎉

## 📝 Mettre à Jour Votre Profil

### Via Supabase Dashboard
1. Allez dans **Table Editor** > `profile`
2. Cliquez sur la ligne à modifier
3. Changez :
   - `name` : Votre nom complet
   - `title` : Votre titre (ex: "Étudiant Master 1 Big Data Analytics")
   - `bio` : Votre description (2-3 phrases)
   - `email` : Votre email
   - `github_url` : Votre profil GitHub
   - `linkedin_url` : Votre profil LinkedIn
   - `photo_url` : `/images/profile.jpg` (ou URL Supabase)

### Ou via l'Application (Admin - à implémenter)
_Une interface d'administration peut être ajoutée pour modifier sans toucher à Supabase_

## 📚 Ajouter une Nouvelle Leçon

### Méthode 1: Via Supabase Dashboard (Recommandé)

1. Allez dans **Table Editor** > `lessons`
2. Cliquez sur **"Insert row"**
3. Remplissez les champs :

```json
{
  "title": "Structures de Données Linéaires",
  "subtitle": "Tableaux, Listes, Piles, Files",
  "complexity": "O(1) à O(n)",
  "icon_name": "Code2",
  "color": "from-purple-500 to-pink-500",
  "status": "in-progress",
  "date": "Semaine 2 - Janvier 2025",
  "week_number": 2,
  "journal": "Cette semaine, j'ai exploré...",
  "synthesis": {
    "mainConcepts": [
      {
        "title": "Les Tableaux",
        "description": "Structure de données contiguë en mémoire",
        "examples": ["Accès O(1)", "Insertion O(n)"]
      }
    ]
  },
  "practical_application": {
    "context": "Mon contexte d'application",
    "problem": "Le problème rencontré",
    "solution": "Ma solution",
    "result": "Le résultat obtenu",
    "code": "def ma_fonction():\n    pass"
  },
  "evaluation": {
    "strengths": ["Force 1", "Force 2"],
    "improvements": ["À améliorer 1", "À améliorer 2"],
    "strategies": ["Stratégie 1", "Stratégie 2"]
  },
  "mastery_level": 6
}
```

4. Cliquez sur **"Save"**
5. Rafraîchissez votre site → La leçon apparaît ! ✨

### Méthode 2: Via Code (Développeurs)

Créez un script `scripts/add-lesson.ts` :

```typescript
import { createLesson } from '@/lib/supabase'

const newLesson = {
  title: "Votre titre",
  subtitle: "Votre sous-titre",
  // ... autres champs
}

createLesson(newLesson)
  .then(() => console.log('Leçon ajoutée !'))
  .catch(console.error)
```

## 🎨 Icônes Disponibles

Pour le champ `icon_name` dans les leçons :
- `Brain` - Cerveau (complexité, réflexion)
- `Code2` - Code (programmation)
- `Zap` - Éclair (performance, vitesse)
- `BookOpen` - Livre (apprentissage)
- `Award` - Trophée (accomplissement)
- `TrendingUp` - Graphique (progression)
- `Database` - Base de données
- `Cpu` - Processeur
- `GitBranch` - Branche Git (structures)
- `Network` - Réseau (graphes)
- `Search` - Recherche (algorithmes de recherche)
- `BarChart` - Graphique en barres (analyse)

## 🎭 Personnalisation des Effets Visuels

### Changer les Couleurs de la Bordure Photo

Dans `components/ProfilePhoto.tsx`, modifiez le gradient :
```typescript
<linearGradient id="borderGradient">
  <stop offset="0%" stopColor="#06b6d4" />  // Cyan
  <stop offset="50%" stopColor="#3b82f6" /> // Bleu
  <stop offset="100%" stopColor="#8b5cf6" /> // Violet
</linearGradient>
```

### Modifier le Background 3D

Dans `components/ModernBackground.tsx` :
- Changer le nombre d'étoiles : `particlesPosition = new Float32Array(5000 * 3)`
- Modifier les couleurs : `color="#60a5fa"`
- Ajuster la vitesse de rotation : `autoRotateSpeed={0.5}`

### Personnaliser le Curseur

Dans `components/CustomCursor.tsx` :
- Taille du curseur : `width: '32px'`
- Couleur : `bg-cyan-400`
- Vitesse : `stiffness: 500, damping: 28`

## 📱 Structure du Projet

```
algomaster-portfolio-pro/
├── app/
│   ├── page.tsx                # Page d'accueil avec Supabase
│   ├── layout.tsx              # Layout global
│   ├── globals.css             # Styles globaux avancés
│   └── lessons/
│       └── [id]/
│           └── page.tsx        # Page détaillée de leçon
│
├── components/
│   ├── ModernBackground.tsx    # Background 3D Three.js
│   ├── CustomCursor.tsx        # Curseur animé personnalisé
│   ├── ProfilePhoto.tsx        # Photo avec bordure animée
│   └── LessonTimeline.tsx      # Timeline des leçons
│
├── lib/
│   └── supabase.ts            # Configuration et fonctions Supabase
│
├── public/
│   └── images/
│       └── profile.jpg        # Votre photo de profil
│
├── .env.local                 # Variables d'environnement (à créer)
├── supabase-schema.sql        # Script SQL pour créer les tables
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🌐 Déploiement sur Vercel

### Étape 1: Push sur GitHub
```bash
git init
git add .
git commit -m "Initial commit - Portfolio AlgoMaster Pro"
git remote add origin https://github.com/votre-username/algomaster-portfolio.git
git push -u origin main
```

### Étape 2: Déployer sur Vercel
1. Allez sur https://vercel.com
2. Connectez votre compte GitHub
3. Importez votre repository
4. Ajoutez les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Cliquez sur **"Deploy"**

✅ **Votre site est en ligne en 2 minutes !**

URL : `https://votre-projet.vercel.app`

## 🔒 Sécurité et Permissions

### Configuration Supabase RLS (Row Level Security)

Le fichier SQL inclut déjà les politiques de sécurité :
- **Lecture publique** : Tout le monde peut voir les leçons et le profil
- **Écriture** : À configurer selon vos besoins

Pour une sécurité renforcée (production) :
1. Désactivez l'écriture publique
2. Créez un rôle admin avec mot de passe
3. Ajoutez une interface d'authentification

## 📊 Statistiques et Analytics

Le profil se met automatiquement à jour avec :
- Nombre total de leçons
- Leçons complétées
- Leçons en cours
- Moyenne de maîtrise
- Heures d'étude

Ces stats sont affichées en temps réel sur la page d'accueil !

## 🎯 Avantages pour les Recruteurs

Votre portfolio avec Supabase permet aux recruteurs de :
- ✅ Voir votre progression en temps réel
- ✅ Consulter toutes vos leçons publiées
- ✅ Apprécier vos compétences techniques (React, Supabase, TypeScript)
- ✅ Observer votre capacité d'auto-évaluation
- ✅ Constater votre régularité d'apprentissage

## 💡 Conseils d'Utilisation

### Remplir une Leçon (30 min/semaine)

1. **Journal (5 min)** : Écrivez vos impressions à chaud
2. **Synthèse (10 min)** : Résumez les concepts avec vos mots
3. **Application (10 min)** : Décrivez un cas d'usage réel
4. **Auto-évaluation (5 min)** : Soyez honnête sur vos forces/faiblesses

### Workflow Recommandé

```bash
# Après chaque cours
1. Ouvrir Supabase Dashboard
2. Créer une nouvelle leçon
3. Remplir les champs pendant que c'est frais
4. Vérifier sur votre site local
5. Push sur GitHub (déploiement auto sur Vercel)
```

## 🐛 Résolution de Problèmes

### Erreur de connexion Supabase
**Problème** : "Failed to fetch"
**Solution** :
1. Vérifiez vos variables dans `.env.local`
2. Vérifiez que les tables existent dans Supabase
3. Vérifiez les politiques RLS

### Le curseur ne s'affiche pas
**Problème** : Curseur par défaut visible
**Solution** : Le curseur personnalisé fonctionne uniquement sur desktop

### La photo ne s'affiche pas
**Problème** : Image non trouvée
**Solution** :
1. Vérifiez que `public/images/profile.jpg` existe
2. Ou mettez à jour `photo_url` dans Supabase
3. Vérifiez les domaines autorisés dans `next.config.js`

### Erreur TypeScript
**Problème** : Erreurs de compilation
**Solution** :
```bash
rm -rf node_modules .next
npm install
npm run dev
```

## 📚 Ressources Complémentaires

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Three.js](https://threejs.org/docs/)
- [Documentation Framer Motion](https://www.framer.com/motion/)
- [Tutoriel Supabase + Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

## 🎉 Félicitations !

Vous avez maintenant un portfolio professionnel avec :
- ✅ Effets visuels impressionnants
- ✅ Base de données cloud
- ✅ Données persistantes et accessibles
- ✅ Site déployé et partageable
- ✅ Expérience professionnelle valorisable sur CV

**Temps d'investissement** : ~6 heures sur le semestre
**Valeur ajoutée** : IMMENSE ! 🚀

---

**Fait avec ❤️ pour les étudiants du Master Big Data Analytics UVCI**  
*Cours : Algorithmique et Complexité - 2025*

**Support** : N'hésitez pas à consulter la documentation ou à demander de l'aide !