# PARTIE 3 — ARCHITECTURE TECHNIQUE (Next.js + Supabase)

---

## 3.1 — Vue d'ensemble du système

```
┌─────────────────────────────────────────────────────────┐
│                      INTERNET                           │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┴──────────────┐
         │                              │
   ┌─────▼──────┐                ┌──────▼──────┐
   │ SITE CLIENT│                │  DASHBOARD  │
   │  (Public)  │                │  (Privé /3) │
   └─────┬──────┘                └──────┬──────┘
         │                              │
         └───────────────┬──────────────┘
                         │
                  ┌──────▼──────┐
                  │   SUPABASE  │
                  │  PostgreSQL │
                  │    Auth     │
                  │   Storage   │
                  │   Realtime  │
                  └─────────────┘
```

**Stack :**
- Next.js 16 (App Router) — `app/` directory
- Supabase — BDD + Auth + Storage (photos avant/après) + Realtime (calendrier live)
- Tailwind CSS v4 — Styling
- Framer Motion — Transitions
- React Hook Form + Zod — Formulaires & validation
- Stripe — Paiement acompte 30 %
- Resend — Emails transactionnels (confirmation réservation)
- Vercel — Déploiement

---

## 3.2 — Site Client (Public)

### Arborescence

```
/                           → Landing page (Hero + Formules + Témoignages + CTA)
/nos-formules               → Page détaillée des 3 formules + tableau comparatif
/reserver                   → Tunnel de réservation multi-étapes
  /reserver?step=1          → Choix de la formule
  /reserver?step=2          → Sélection date & heure (calendrier dispo réelle)
  /reserver?step=3          → Coordonnées client + adresse exacte + infos véhicule
  /reserver?step=4          → Récapitulatif + Paiement acompte 30%
  /reserver/confirmation    → Page de confirmation + instructions
/contact                    → Formulaire de contact simple
/mentions-legales           → Obligatoire (micro-entreprise)
```

---

### UX du tunnel de réservation (priorité absolue)

#### ÉTAPE 1 — Choix de la formule

```
┌─────────────────────────────────────────────────────────┐
│  Quelle prestation souhaitez-vous ?                     │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   EXPRESS    │  │  DEEP CLEAN  │  │  INTÉGRALE   │  │
│  │  INTÉRIEUR   │  │              │  │  PREMIUM     │  │
│  │              │  │              │  │              │  │
│  │    45 €      │  │    85 €      │  │   130 €      │  │
│  │   ~1h30      │  │    ~3h       │  │    ~5h       │  │
│  │              │  │  ⭐ Populaire │  │              │  │
│  │  [Choisir]   │  │  [Choisir]   │  │  [Choisir]  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ℹ️  Véhicule > 5m (SUV, van) ? Majoration +20 €       │
│  [ ] Oui, mon véhicule est grand format                 │
└─────────────────────────────────────────────────────────┘
```

#### ÉTAPE 2 — Date & Heure

- Calendrier mensuel avec les créneaux disponibles calculés en temps réel depuis Supabase
- Créneaux affichés uniquement si au moins 1 membre de l'équipe est disponible
- Plages autorisées : Lun-Ven 18h00→21h00, Sam-Dim 09h00→19h00
- Durée du créneau bloqué = durée de la formule choisie + 30 min de trajet
- Si formule Intégrale (5h) → afficher uniquement les créneaux matin week-end

```
Règle d'affichage : slot visible SI
  → disponibility.is_available = true pour au moins 1 user
  → aucun booking existant sur ce slot (statut ≠ 'cancelled')
  → heure actuelle + 24h minimum (pas de réservation last-minute)
```

#### ÉTAPE 3 — Informations client

```
Champs requis :
  - Prénom + Nom
  - Téléphone (obligatoire — SMS de rappel)
  - Email (confirmation)
  - Adresse complète d'intervention (Google Places Autocomplete)
  - Marque / Modèle / Couleur du véhicule
  - Immatriculation (optionnel)
  - Notes spéciales (ex: "taches de café sur siège avant droit")
  - Comment avez-vous entendu parler de nous ? (tracking acquisition)
```

#### ÉTAPE 4 — Récapitulatif + Acompte

```
Récap complet + bouton Payer l'acompte (30%)
  → Express (45€)   : acompte 13,50 €
  → Deep Clean (85€): acompte 25,50 €  
  → Intégrale (130€): acompte 39,00 €

Paiement via Stripe Checkout (redirection sécurisée)
Après paiement : webhook Stripe → création booking dans Supabase → email confirmation
```

---

### Landing Page — Sections & Contenu

```
1. HERO
   - Headline : "Votre voiture, impeccable. Sans bouger de chez vous."
   - Sous-titre : "Service de detailing mobile professionnel à [Ville]. 
                   On vient chez vous, on repart, vous profitez du résultat."
   - CTA principal : [Réserver maintenant] → /reserver
   - Visuel : Photo ou vidéo loop avant/après impactante

2. SOCIAL PROOF BAR (sticky)
   - ⭐ 4.9/5 sur Google (32 avis) · 🛡️ Produits Koch Chemie · 🚗 +150 voitures traitées

3. NOS FORMULES (aperçu)
   - 3 cartes tarifaires avec CTA "Réserver"
   - Lien "Voir le détail complet" → /nos-formules

4. COMMENT ÇA MARCHE (3 étapes)
   - 1️⃣ Choisissez votre formule en ligne
   - 2️⃣ On arrive chez vous à l'heure choisie
   - 3️⃣ Récupérez une voiture comme neuve

5. GALERIE AVANT/APRÈS
   - Slider d'images avec draggable reveal (bibliothèque : react-before-after-slider)
   - 6 exemples minimum (intérieur, sièges, extérieur)

6. TÉMOIGNAGES
   - 5-6 avis clients avec nom, prénom, formule choisie
   - Lien vers profil Google My Business

7. FAQ
   - "Vous avez besoin d'eau chez moi ?" → Non, on apporte tout
   - "Combien de temps ça prend ?" → Selon formule : 1h30 à 5h
   - "Et si je dois partir ?" → Vous nous laissez les clés, on vous contacte à la fin
   - "Quelles zones couvrez-vous ?" → Rayon 20 km autour de [Ville]

8. CTA FINAL
   - Bloc contrasté + bouton principal [Réserver ma prestation]
```

---

## 3.3 — Dashboard Privé (3 associés)

### Accès & Authentification

```
Route protégée : /dashboard/*
Auth : Supabase Auth (email/password)
Rôles : 
  - 'admin' → accès complet (modifier, supprimer, stats)
  - 'membre' → accès complet sauf suppression et stats financières globales
```

### Arborescence dashboard

```
/dashboard                  → Vue d'ensemble (KPIs du mois)
/dashboard/reservations     → Liste + gestion des réservations
/dashboard/calendrier       → Calendrier partagé temps réel
/dashboard/clients          → Base clients + historique
/dashboard/finances         → Suivi CA, net, dépenses
/dashboard/disponibilites   → Gérer ses propres créneaux
```

---

### Page /dashboard — Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────┐
│  Bonjour Louis 👋  |  Mai 2026                               │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│   CA BRUT    │  NET ESTIMÉ  │ RÉSERVATIONS │  PROCHAINE RDV  │
│   1 840 €    │    967 €     │  23/27 obj.  │  Sam 18 mai 10h │
├──────────────┴──────────────┴──────────────┴─────────────────┤
│  AGENDA AUJOURD'HUI                                           │
│  ───────────────────                                          │
│  14h00 — Dupont Marie — Deep Clean — 12 rue des Lilas        │
│  [Voir détail]  [Naviguer]  [Marquer terminé]                │
├───────────────────────────────────────────────────────────────┤
│  RÉSERVATIONS EN ATTENTE DE VALIDATION (2)                   │
│  → Martin Paul — Express — Sam 20 mai 9h  [✓ Accepter] [✗]  │
│  → Durand L.  — Intégrale — Dim 21 mai    [✓ Accepter] [✗]  │
└───────────────────────────────────────────────────────────────┘
```

---

### Page /dashboard/reservations

**Statuts possibles d'une réservation :**
```
pending    → En attente de validation manuelle
confirmed  → Acceptée, client notifié
in_progress → Intervention en cours
completed  → Terminée + paiement soldé
cancelled  → Annulée (client ou équipe)
no_show    → Client absent
```

**Actions par réservation :**
- Accepter → passe en `confirmed` + email automatique au client
- Refuser + raison → passe en `cancelled` + email au client + remboursement acompte
- Modifier (date/heure) → email de notification au client
- Assigner à un membre
- Ajouter une note interne
- Marquer terminée + montant réel encaissé

---

### Page /dashboard/calendrier

- Vue mensuelle + hebdomadaire + journalière
- Code couleur par membre (ex: Louis = bleu, Célian = vert, 3e = rouge)
- Affichage simultané : réservations confirmées + disponibilités de chacun
- Clic sur un créneau libre → modale "Marquer comme non disponible"
- Synchro temps réel via Supabase Realtime (pas besoin de refresh)

---

### Page /dashboard/finances

```
┌─────────────────────────────────────────────────────────────┐
│  FINANCES — Mai 2026                                         │
├──────────────┬────────────────────┬─────────────────────────┤
│  CA BRUT     │  URSSAF (21.2%)    │  NET AVANT CHARGES VAR  │
│  2 200 €     │  − 466 €           │  = 1 734 €              │
├──────────────┴────────────────────┴─────────────────────────┤
│  DÉPENSES VARIABLES                                          │
│  Consommables (produits)    − 340 €                         │
│  Carburant                  − 189 €                         │
│  Autre                      −  50 €                         │
│  TOTAL DÉPENSES             − 579 €                         │
├─────────────────────────────────────────────────────────────┤
│  NET GROUPE                 = 1 155 €                        │
│  NET PAR PERSONNE           =   385 €  ← Objectif ✅        │
├─────────────────────────────────────────────────────────────┤
│  [+ Ajouter une dépense]                                    │
│  Catégorie: [Produits/Carburant/Matériel/Autre]             │
│  Montant: [   ] €  Date: [   ]  Note: [            ]        │
└─────────────────────────────────────────────────────────────┘
```

**Graphiques :**
- Évolution CA mensuel sur 6 mois (line chart)
- Répartition des formules vendues (donut)
- CA par membre assigné (bar chart)

---

## 3.4 — Schéma Base de Données Supabase

### Tables PostgreSQL

```sql
-- ============================================
-- TABLE : profiles
-- Extension de auth.users (Supabase Auth)
-- ============================================
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  phone       TEXT,
  role        TEXT NOT NULL DEFAULT 'membre' CHECK (role IN ('admin', 'membre')),
  color       TEXT DEFAULT '#3B82F6',  -- couleur calendrier
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : clients
-- Chaque client est créé à la première réservation
-- ============================================
CREATE TABLE clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  address         TEXT NOT NULL,
  city            TEXT NOT NULL,
  postal_code     TEXT NOT NULL,
  vehicle_brand   TEXT,
  vehicle_model   TEXT,
  vehicle_color   TEXT,
  vehicle_plate   TEXT,
  vehicle_type    TEXT DEFAULT 'standard' CHECK (vehicle_type IN ('standard', 'large')),
  notes           TEXT,            -- observations permanentes sur le véhicule
  source          TEXT,            -- 'google_ads' | 'meta_ads' | 'bouche_a_oreille' | 'autre'
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : formulas
-- Les 3 formules (données statiques, modifiables)
-- ============================================
CREATE TABLE formulas (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,             -- 'Express Intérieur'
  slug            TEXT NOT NULL UNIQUE,      -- 'express' | 'deep-clean' | 'integrale'
  price_standard  INTEGER NOT NULL,          -- en centimes (4500 = 45€)
  price_large     INTEGER NOT NULL,          -- tarif grand format
  duration_min    INTEGER NOT NULL,          -- en minutes
  description     TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : bookings
-- Cœur du système
-- ============================================
CREATE TABLE bookings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id           UUID NOT NULL REFERENCES clients(id),
  formula_id          UUID NOT NULL REFERENCES formulas(id),
  assigned_to         UUID REFERENCES profiles(id),  -- membre assigné
  
  -- Planification
  booking_date        DATE NOT NULL,
  booking_time        TIME NOT NULL,
  duration_min        INTEGER NOT NULL,  -- copié depuis formula au moment de la réservation
  
  -- Statut
  status              TEXT NOT NULL DEFAULT 'pending' 
                        CHECK (status IN ('pending','confirmed','in_progress','completed','cancelled','no_show')),
  
  -- Financier
  price_charged       INTEGER NOT NULL,   -- en centimes (peut différer si geste commercial)
  deposit_amount      INTEGER,            -- acompte versé (centimes)
  deposit_paid        BOOLEAN DEFAULT FALSE,
  stripe_payment_id   TEXT,               -- référence Stripe
  final_paid          BOOLEAN DEFAULT FALSE,
  
  -- Notes
  client_notes        TEXT,              -- notes visibles du client (formulaire)
  internal_notes      TEXT,              -- notes internes équipe
  
  -- Tracking
  cancellation_reason TEXT,
  cancelled_by        TEXT,              -- 'client' | 'equipe'
  
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : availability
-- Disponibilités individuelles de chaque membre
-- ============================================
CREATE TABLE availability (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date            DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  is_available    BOOLEAN DEFAULT TRUE,  -- false = bloqué / indispo
  note            TEXT,                  -- ex: "partiellement dispo"
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, date, start_time)    -- pas de doublon
);

-- ============================================
-- TABLE : expenses
-- Dépenses de l'activité (consommables, carburant, etc.)
-- ============================================
CREATE TABLE expenses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category    TEXT NOT NULL CHECK (category IN ('produits','carburant','materiel','marketing','autre')),
  amount      INTEGER NOT NULL,       -- en centimes
  date        DATE NOT NULL,
  description TEXT,
  receipt_url TEXT,                   -- photo du ticket (Supabase Storage)
  created_by  UUID REFERENCES profiles(id),
  booking_id  UUID REFERENCES bookings(id),  -- lié à une réservation si applicable
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : booking_photos
-- Photos avant/après par réservation
-- ============================================
CREATE TABLE booking_photos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('before', 'after')),
  url         TEXT NOT NULL,         -- URL Supabase Storage
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Relations (diagramme)

```
auth.users ──── profiles (1:1)
                    │
                    ├──── availability (1:N)
                    ├──── expenses (1:N)
                    └──── bookings.assigned_to (1:N)

clients ──── bookings (1:N)
                │
                ├──── formulas (N:1)
                ├──── expenses.booking_id (1:N)
                └──── booking_photos (1:N)
```

---

### Row Level Security (RLS)

```sql
-- clients : lecture/écriture réservée aux membres authentifiés
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Membres only" ON clients
  USING (auth.role() = 'authenticated');

-- bookings : même logique
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Membres only" ON bookings
  USING (auth.role() = 'authenticated');

-- availability : un membre ne voit que ses propres dispos en écriture
-- mais peut LIRE celles de tous (pour le calendrier partagé)
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read all" ON availability FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "Write own" ON availability FOR INSERT WITH CHECK
  (auth.uid() = user_id);
CREATE POLICY "Update own" ON availability FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 3.5 — API Routes Next.js (côté serveur)

```
app/api/
  bookings/
    route.ts          → GET (liste) + POST (création côté client)
    [id]/route.ts     → GET + PATCH (statut, assignation) + DELETE
  availability/
    route.ts          → GET (créneaux libres pour le tunnel)
    [userId]/route.ts → PATCH (mettre à jour ses dispos)
  stripe/
    webhook/route.ts  → Réception webhook paiement (créer booking après acompte)
    checkout/route.ts → Créer session Stripe Checkout
  clients/
    route.ts          → GET (liste) + POST
    [id]/route.ts     → GET (fiche client) + PATCH
  finances/
    route.ts          → GET (résumé mensuel + graphiques)
    expenses/route.ts → POST (ajouter dépense)
  emails/
    confirm/route.ts  → Envoi email confirmation (Resend)
    reminder/route.ts → Rappel J-1 (cron Vercel)
```

---

## 3.6 — Variables d'environnement (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend (emails)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NEXT_PUBLIC_COMPANY_NAME=ShineUp Detailing
NEXT_PUBLIC_COMPANY_PHONE=
NEXT_PUBLIC_COMPANY_CITY=
```

---

## 3.7 — Structure du projet Next.js

```
src/
  app/
    (public)/              → Layout public (header/footer)
      page.tsx             → Landing page
      nos-formules/
        page.tsx
      reserver/
        page.tsx           → Tunnel multi-étapes (client component)
      contact/
        page.tsx
      mentions-legales/
        page.tsx
    (dashboard)/           → Layout dashboard (sidebar + auth guard)
      dashboard/
        page.tsx           → Vue d'ensemble
        reservations/
          page.tsx
          [id]/page.tsx
        calendrier/
          page.tsx
        clients/
          page.tsx
          [id]/page.tsx
        finances/
          page.tsx
        disponibilites/
          page.tsx
    api/                   → Routes API (voir 3.5)
    layout.tsx
    globals.css
  
  components/
    ui/                    → Composants réutilisables (Button, Card, Badge, Modal)
    booking/               → Composants du tunnel réservation
      StepFormula.tsx
      StepDateTime.tsx
      StepClientInfo.tsx
      StepPayment.tsx
    dashboard/             → Composants spécifiques dashboard
      BookingCard.tsx
      CalendarView.tsx
      FinanceSummary.tsx
      AvailabilityGrid.tsx
  
  lib/
    supabase/
      client.ts            → createBrowserClient
      server.ts            → createServerClient
    stripe.ts
    resend.ts
    utils.ts               → Calculs URSSAF, formatage prix, etc.
  
  types/
    database.types.ts      → Types générés par Supabase CLI
    index.ts               → Types métier
```
