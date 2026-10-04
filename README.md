# Velora

Concept de site pour une marque de vélos électriques urbains. **Velora est une marque fictive** : ce projet est un exercice de design et de développement.

## Pages

- `/` : hero avec vélo dessiné en SVG et configurateur de couleur en direct
- `/modeles` : la gamme, avec comparateur de deux modèles
- `/essai` : réservation d'un essai, avec validation côté serveur et messages d'erreur par champ

## API (Nitro / Node)

- `GET /api/bikes` · `GET /api/shops`
- `POST /api/test-ride` : valide le formulaire et renvoie une référence (aucune donnée n'est stockée)

## Stack

Nuxt 4 · Vue 3 · TypeScript · SVG · Nitro (Node)

## Lancer le projet

```bash
pnpm install
pnpm dev
```
