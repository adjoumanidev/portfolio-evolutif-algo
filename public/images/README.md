# 📸 Dossier Images

## Photo de Profil

Placez votre photo de profil ici avec le nom **`profile.jpg`** ou **`profile.png`**

### Recommandations :
- **Format** : JPG ou PNG
- **Taille recommandée** : 800x800 pixels minimum
- **Ratio** : Carré (1:1) pour un meilleur rendu
- **Poids** : Moins de 2 MB si possible
- **Qualité** : Haute résolution, fond neutre ou professionnel

### Où la trouver ?
Votre photo sera affichée sur la page d'accueil avec un cadre animé impressionnant !

### Alternative
Si vous n'avez pas de photo, vous pouvez :
1. Utiliser un avatar généré sur https://avatar.iran.liara.run/
2. Utiliser votre photo de profil LinkedIn
3. Créer un avatar sur https://www.behance.net/

## Autres Images

Vous pouvez ajouter d'autres images ici pour :
- Captures d'écran de projets
- Diagrammes algorithmiques
- Illustrations de concepts
- etc.

## Utilisation dans le Code

```typescript
import Image from 'next/image'

<Image 
  src="/images/profile.jpg" 
  alt="Votre Nom"
  width={400}
  height={400}
/>
```

## Upload sur Supabase (Alternative)

Si vous préférez héberger vos images sur Supabase :
1. Allez dans votre projet Supabase
2. Créez un Storage bucket public
3. Uploadez votre photo
4. Copiez l'URL publique
5. Mettez à jour le champ `photo_url` dans votre profil
