# PARTIE 4 — FEUILLE DE ROUTE DE LANCEMENT (4 semaines)

> Objectif : passer de zéro à premiers clients encaissés en 28 jours.
> Chaque tâche est assignée à une responsabilité. Ajuster selon vos rôles réels.

---

## SEMAINE 1 — FONDATIONS LÉGALES & TECHNIQUES (J1→J7)

### Légal & Administratif

| Jour | Action | Responsable | Durée |
|---|---|---|---|
| J1 | Déclaration micro-entreprise sur autoentrepreneur.urssaf.fr (activité : prestation de services artisanale) | 1 personne | 1h |
| J1 | Choisir le nom commercial (vérifier disponibilité INPI) | Tous | 30min |
| J2 | Ouvrir un compte bancaire dédié (Shine, Qonto, ou Sumeria Pro — ~0€/mois) | 1 personne | 1h |
| J2 | Souscrire assurance RC Professionnelle (Hiscox ou April — ~20€/mois) | 1 personne | 1h |
| J3 | Rédiger CGV simples (template gratuit sur service-public.fr) | 1 personne | 2h |
| J3 | Créer adresse email professionnelle (contact@votre-nom.fr via Namecheap) | 1 personne | 30min |

> **Point bloquant** : La déclaration URSSAF peut prendre 8-15 jours pour recevoir le SIRET. Faire J1 immédiatement. Vous pouvez facturer avant la réception, la date d'effet est la date de déclaration.

---

### Setup Technique (infrastructure)

| Jour | Action | Responsable | Durée |
|---|---|---|---|
| J1 | Acheter nom de domaine (OVH ou Namecheap — ~12€/an) | 1 personne | 15min |
| J1 | Créer compte Supabase (plan Free → passer Pro si > 500 req/j) | 1 personne | 30min |
| J1 | Créer compte Vercel | 1 personne | 15min |
| J2 | Initialiser repo GitHub + projet Next.js 16 (`npx create-next-app@latest`) | Lead Dev | 1h |
| J2 | Configurer Supabase : créer les 6 tables (schéma Partie 3) + activer RLS | Lead Dev | 3h |
| J3 | Configurer Supabase Auth (email/password) + créer les 3 comptes membres | Lead Dev | 1h |
| J3 | Créer compte Stripe + activer paiements + configurer webhook local (Stripe CLI) | Lead Dev | 2h |
| J4 | Créer compte Resend + configurer domaine email + template confirmation | Lead Dev | 2h |
| J5 | Déployer le squelette Next.js sur Vercel + brancher domaine | Lead Dev | 1h |
| J6 | Générer les types Supabase : `npx supabase gen types typescript` | Lead Dev | 30min |
| J7 | Buffer / rattrapage | — | — |

---

### Contenu & Branding

| Jour | Action | Responsable | Durée |
|---|---|---|---|
| J1 | Décider du nom + couleurs (ex: vert foncé + blanc = sérieux + propre) | Tous | 1h |
| J2 | Créer logo simple sur Canva (version PNG + SVG) | 1 personne | 2h |
| J3 | Trouver / filmer 2-3 voitures de proches pour les photos avant/après | Tous | 2h |
| J4 | Créer compte Instagram + Facebook Page + Google My Business | 1 personne | 2h |
| J5 | Monter le premier Reel avant/après (CapCut — gratuit) | 1 personne | 3h |

---

## SEMAINE 2 — DÉVELOPPEMENT SITE CLIENT & DASHBOARD (J8→J14)

### Priorité développement : Site client en premier (génère les réservations)

| Jour | Tâche dev | Priorité |
|---|---|---|
| J8 | Landing page : Hero + Section formules + CTA | CRITIQUE |
| J9 | Page /nos-formules : tableau comparatif détaillé | HAUTE |
| J9 | Composants UI partagés : Button, Card, Badge, Modal | HAUTE |
| J10 | Tunnel /reserver : Étape 1 (choix formule) + Étape 2 (calendrier) | CRITIQUE |
| J10 | API `/api/availability` : lire les créneaux libres depuis Supabase | CRITIQUE |
| J11 | Tunnel /reserver : Étape 3 (formulaire client) + validation Zod | HAUTE |
| J11 | API `/api/clients` : créer ou retrouver un client existant | HAUTE |
| J12 | Tunnel /reserver : Étape 4 (Stripe Checkout) + webhook + création booking | CRITIQUE |
| J12 | Page /reserver/confirmation | HAUTE |
| J13 | Email de confirmation automatique (Resend) au client + à l'équipe | HAUTE |
| J13 | Landing page : section témoignages + FAQ + galerie avant/après | MOYENNE |
| J14 | Tests end-to-end du tunnel complet + correction bugs | CRITIQUE |

---

### Dashboard (parallèle si vous êtes 2 devs)

| Jour | Tâche dev | Priorité |
|---|---|---|
| J8 | Layout dashboard + sidebar + auth guard (redirect si non connecté) | CRITIQUE |
| J9 | Page /dashboard : KPIs du mois (CA, net, réservations) | HAUTE |
| J10 | Page /dashboard/reservations : liste + filtres + actions (accepter/refuser) | CRITIQUE |
| J11 | Page /dashboard/disponibilites : grille hebdomadaire modifiable | HAUTE |
| J12 | Page /dashboard/calendrier : vue mensuelle avec couleurs par membre | HAUTE |
| J13 | Page /dashboard/clients : liste + fiche client avec historique | MOYENNE |
| J14 | Page /dashboard/finances : résumé + ajout dépenses | HAUTE |

---

## SEMAINE 3 — LANCEMENT MARKETING & ACQUISITION (J15→J21)

### Pré-lancement (J15-J16)

| Action | Détail | Durée |
|---|---|---|
| Test complet tunnel réservation | Faire 3 réservations tests avec des proches. Corriger les bugs UX. | 2h |
| Installer Pixel Meta sur le site | Via Google Tag Manager ou directement dans `layout.tsx` | 1h |
| Installer Google Analytics 4 | Tracking conversions (event "reservation_completed") | 1h |
| Configurer Google My Business | Horaires, photos, catégorie "Lavage et nettoyage de véhicules" | 1h |
| Préparer créatifs Meta | 3 Reels différents (intérieur, sièges, extérieur) + 2 visuels statiques | 4h |
| Commander les flyers | Vistaprint 200 flyers A5 recto-verso (~30 €) livraison 3-5j | 15min |

---

### Lancement Google Ads (J17)

```
Actions dans Google Ads :
1. Créer compte + lier Google My Business
2. Créer campagne "Nettoyage Auto Local" (structure Partie 2)
3. Ajouter les mots-clés négatifs EN PREMIER (sinon budget brûlé)
4. Configurer extensions d'annonce (appel, liens, prix)
5. Budget : 7€/jour
6. Lancer → surveiller les 48 premières heures (CTR, impressions)
```

---

### Lancement Meta Ads (J17)

```
Actions dans Meta Business Suite :
1. Créer Business Manager + Page Facebook
2. Créer compte publicitaire + connecter Pixel
3. Créer campagne Phase 1 "Notoriété" (Reel 30s)
4. Audience : [Ville] rayon 15km, 22-55 ans, intérêts auto
5. Budget : 5€/jour
6. Lancer le meilleur Reel en test A/B contre le 2e
```

---

### Prospection B2B (J18-J19)

| Action | Cible | Volume |
|---|---|---|
| Appels téléphoniques | Comités d'entreprise PME locales (DRH/représentant CE) | 10 contacts |
| Emails prospection | Concessionnaires automobiles locaux | 5 contacts |
| Visite physique | 2-3 garages de quartier avec plaquette | 3 visites |
| Dépôt flyers | Parkings supermarchés + résidences | 100 flyers |

---

### Réseaux sociaux organiques (J15→J21)

| Jour | Post |
|---|---|
| J15 | Reel teaser : "On arrive bientôt à [Ville] 👀" |
| J17 | LANCEMENT : Reel avant/après complet + "Réservez dès maintenant" |
| J19 | Post carrousel : "Pourquoi un lavage automatique abîme votre voiture" (contenu éducatif) |
| J21 | Reel : coulisses du service (préparation du matériel, départ en intervention) |

---

## SEMAINE 4 — PREMIERS CLIENTS & ITÉRATION (J22→J28)

### Objectif : 5 premières réservations payantes

| Action | Détail |
|---|---|
| Traiter chaque réservation comme une démonstration | Photos avant/après systématiques pour chaque client. Contenu = carburant marketing. |
| Demander un avis Google immédiatement | SMS automatique avec le lien direct (à configurer dans le dashboard) |
| Activer le programme parrainage | Annoncer par SMS à chaque client terminé |
| Analyser Google Ads J22-J28 | Identifier les 3 mots-clés qui convertissent. Couper les autres. |
| Analyser Meta Ads | Quel Reel a le meilleur coût/clic ? Doubler son budget. |
| Premier bilan financier | Saisir toutes les dépenses dans le dashboard. Calculer le vrai net S1. |
| Retour d'expérience équipe | Qu'est-ce qui prend plus de temps que prévu ? Ajuster les durées des formules si nécessaire. |

---

## Checklist de lancement — Go/No-go

Avant d'activer la publicité, cocher chaque point :

```
LÉGAL
[ ] SIRET reçu (ou déclaration faite en attente)
[ ] RC Pro souscrite
[ ] CGV en ligne sur le site
[ ] Mentions légales présentes sur le site

TECHNIQUE
[ ] Tunnel de réservation testé de bout en bout (mobile + desktop)
[ ] Paiement Stripe fonctionnel (test mode d'abord, puis live)
[ ] Email de confirmation reçu après test
[ ] Dashboard accessible pour les 3 membres
[ ] Créneaux de disponibilité saisis dans le dashboard

MARKETING
[ ] Google My Business actif avec photos
[ ] Instagram + Facebook Page créés
[ ] Pixel Meta installé et vérifié (Meta Pixel Helper Chrome)
[ ] Google Analytics 4 installé avec event "reservation_completed"
[ ] Flyers commandés

OPÉRATIONNEL
[ ] Matériel vérifié et complet (voir liste Partie 1)
[ ] Produits achetés pour ~5 premières interventions
[ ] Transport organisé (qui conduit le matériel ?)
[ ] Numéro de téléphone professionnel actif (ou renvoi sur personnel)
```

---

## Mois 2 et au-delà — Évolutions prévues

| Priorité | Fonctionnalité | Impact |
|---|---|---|
| HIGH | SMS de rappel automatique J-1 (API Twilio ou Vonage) | Réduit no-shows |
| HIGH | Lookalike audience Meta sur liste clients (>20 clients) | Baisse du CAC |
| MEDIUM | Programme fidélité (5e prestation = -20%) | Augmente LTV |
| MEDIUM | Option paiement en ligne total (pas juste acompte) | UX meilleure |
| MEDIUM | Application PWA (accès dashboard mobile offline) | Confort terrain |
| LOW | Système de notation interne après chaque intervention | Qualité |
| LOW | Export comptable mensuel (PDF) pour déclaration URSSAF | Administratif |

---

## Budget total lancement estimé

| Poste | Montant |
|---|---|
| Nom de domaine (1 an) | 12 € |
| RC Professionnelle (1 mois) | 20 € |
| Compte bancaire pro | 0 € |
| Flyers (200 unités) | 30 € |
| Google Ads (S2+S3+S4) | 200 € |
| Meta Ads (S2+S3+S4) | 200 € |
| Buffer guérilla | 38 € |
| **TOTAL** | **500 €** |

> Supabase Free Tier + Vercel Hobby sont suffisants pour les 3 premiers mois (< 500 MAU).
> Stripe prend 1,4% + 0,25€ par transaction (coût réel ~0,94€ par acompte Express).
