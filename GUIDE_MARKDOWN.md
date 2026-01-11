# Guide Markdown - AlgoMaster Portfolio

## Texte formaté

**Gras** : `**texte**`
*Italique* : `*texte*`
~~Barré~~ : `~~texte~~`

## Code inline

Variable : `x = 10`

## Blocs de code

\```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
\```

**Langages supportés :** python, javascript, java, cpp, c, ruby, go, rust, sql, bash, etc.

## Titres

# Titre 1
## Titre 2
### Titre 3

## Listes

- Item 1
- Item 2
  - Sous-item

1. Première étape
2. Deuxième étape

## Liens

[Texte du lien](https://example.com)

## Citations

> Ceci est une citation importante

## Tableaux

| Algorithme | Complexité | Espace |
|------------|-----------|---------|
| Bubble Sort | O(n²) | O(1) |
| Quick Sort | O(n log n) | O(log n) |

## Ligne horizontale

---