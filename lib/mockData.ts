import type { Booking, Formula, Quest, TeamMember } from './types'

export const FORMULAS: Formula[] = [
  {
    slug: 'express',
    name: 'Express Intérieur',
    price: 45,
    durationMin: 60,
    description: 'Nettoyage complet de l\'habitacle en 1h. Parfait pour un entretien régulier.',
    features: [
      'Aspiration complète (sièges, moquettes, coffre)',
      'Nettoyage plastiques & tableau de bord',
      'Vitres intérieures dégraissées',
      'Nettoyage jantes (rapide)',
      'Désodorisation incluse',
    ],
    xpReward: 30,
  },
  {
    slug: 'deep-clean',
    name: 'Deep Clean',
    price: 85,
    durationMin: 105,
    description: 'Nettoyage profond intérieur & extérieur. Notre formule la plus populaire.',
    features: [
      'Tout le contenu Express Intérieur',
      'Shampouinage sièges tissu (injecteur-extracteur)',
      'Shampouinage moquettes sol',
      'Nettoyage joints de portes (pinceaux pro)',
      'Lavage extérieur carrosserie & jantes',
      'Protection plastiques extérieurs',
    ],
    xpReward: 60,
    popular: true,
  },
  {
    slug: 'premium',
    name: 'Intégrale Premium',
    price: 125,
    durationMin: 150,
    description: 'La prestation complète. Votre voiture retrouve son état showroom.',
    features: [
      'Tout le contenu Deep Clean',
      'Décontamination carrosserie (argile)',
      'Polissage léger une passe',
      'Protection cire ou sealant',
      'Traitement hydrophobe vitres',
      'Photos avant/après livrées',
    ],
    xpReward: 100,
  },
]

export const MOCK_TEAM: TeamMember[] = [
  { id: 'u1', name: 'Louis', initials: 'LO', color: '#00ff88', completedJobs: 9, totalNetEarned: 378 },
  { id: 'u2', name: 'Alexandre', initials: 'AL', color: '#00d4ff', completedJobs: 7, totalNetEarned: 289 },
  { id: 'u3', name: 'Nicolas', initials: 'NI', color: '#a855f7', completedJobs: 0, totalNetEarned: 0 },
]

// Calcul net: prix × 0.788 − consommables − carburant
// Express: 45×0.788 − 8 − 7 = 35.46 − 15 = 20.46 ≈ 20
// Deep Clean: 85×0.788 − 20 − 7 = 67 − 27 = 40
// Deep Clean SUV (+20): 105×0.788 − 22 − 7 = 82.7 − 29 = 53.7 ≈ 54
// Premium: 125×0.788 − 30 − 7 = 98.5 − 37 = 61.5 ≈ 62
// Premium SUV (+20): 145×0.788 − 32 − 7 = 114.3 − 39 = 75.3 ≈ 75

export const MOCK_BOOKINGS: Booking[] = [
  // ── Semaine 1 (Mai 3-9) : 10 jobs ──
  {
    id: 'bk-001', clientName: 'Marie Dupont', clientPhone: '06 12 34 56 78',
    address: '14 Rue des Lilas, Bordeaux', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Peugeot 508',
    date: '2026-05-03', time: '10:00', status: 'completed',
    assignedTo: 'Louis', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 60,
    createdAt: '2026-05-01T14:22:00Z',
  },
  {
    id: 'bk-002', clientName: 'Julien Martin', clientPhone: '07 23 45 67 89',
    address: '8 Avenue Carnot, Bordeaux', formulaSlug: 'express',
    vehicleSize: 'citadine', vehicleBrand: 'Renault Clio',
    date: '2026-05-03', time: '14:00', status: 'completed',
    assignedTo: 'Célian', revenue: 45, netRevenue: 20, durationHours: 1.5, xpEarned: 38,
    createdAt: '2026-05-02T09:10:00Z',
  },
  {
    id: 'bk-003', clientName: 'Sophie Mercier', clientPhone: '06 34 56 78 90',
    address: '22 Rue Sainte-Catherine, Bordeaux', formulaSlug: 'premium',
    vehicleSize: 'suv', vehicleBrand: 'BMW X5',
    date: '2026-05-04', time: '09:30', status: 'completed',
    assignedTo: 'Louis', revenue: 145, netRevenue: 75, durationHours: 5, xpEarned: 125,
    createdAt: '2026-05-02T16:00:00Z',
  },
  {
    id: 'bk-004', clientName: 'Pierre Leblanc', clientPhone: '07 45 67 89 01',
    address: '5 Impasse des Chênes, Mérignac', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Volkswagen Passat',
    date: '2026-05-04', time: '15:00', status: 'completed',
    assignedTo: 'Célian', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 68,
    createdAt: '2026-05-03T11:00:00Z',
  },
  {
    id: 'bk-005', clientName: 'Claire Thomas', clientPhone: '06 56 78 90 12',
    address: '31 Rue du Palais, Mérignac', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Toyota Corolla',
    date: '2026-05-05', time: '18:30', status: 'completed',
    assignedTo: 'Louis', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 68,
    createdAt: '2026-05-04T19:00:00Z',
  },
  {
    id: 'bk-006', clientName: 'Kevin Rousseau', clientPhone: '07 67 89 01 23',
    address: '9 Rue Alsace-Lorraine, Bordeaux', formulaSlug: 'express',
    vehicleSize: 'citadine', vehicleBrand: 'Citroën C3',
    date: '2026-05-06', time: '19:00', status: 'completed',
    assignedTo: 'Célian', revenue: 45, netRevenue: 20, durationHours: 1.5, xpEarned: 38,
    createdAt: '2026-05-05T10:00:00Z',
  },
  {
    id: 'bk-007', clientName: 'Isabelle Girard', clientPhone: '06 78 90 12 34',
    address: '47 Avenue du Médoc, Bordeaux', formulaSlug: 'premium',
    vehicleSize: 'berline', vehicleBrand: 'Mercedes Classe C',
    date: '2026-05-07', time: '18:00', status: 'completed',
    assignedTo: 'Louis', revenue: 125, netRevenue: 62, durationHours: 5, xpEarned: 108,
    createdAt: '2026-05-06T09:30:00Z',
  },
  {
    id: 'bk-008', clientName: 'Franck Petit', clientPhone: '07 89 01 23 45',
    address: '2 Chemin de la Forêt, Pessac', formulaSlug: 'deep-clean',
    vehicleSize: 'suv', vehicleBrand: 'Renault Koleos',
    date: '2026-05-08', time: '18:30', status: 'completed',
    assignedTo: 'Célian', revenue: 105, netRevenue: 54, durationHours: 3.5, xpEarned: 85,
    createdAt: '2026-05-07T14:00:00Z',
  },
  {
    id: 'bk-009', clientName: 'Nathalie Simon', clientPhone: '06 90 12 34 56',
    address: '18 Rue Victor Hugo, Bordeaux', formulaSlug: 'express',
    vehicleSize: 'citadine', vehicleBrand: 'Peugeot 208',
    date: '2026-05-09', time: '19:30', status: 'completed',
    assignedTo: 'Louis', revenue: 45, netRevenue: 20, durationHours: 1.5, xpEarned: 38,
    createdAt: '2026-05-08T11:00:00Z',
  },
  {
    id: 'bk-010', clientName: 'Antoine Morel', clientPhone: '07 01 23 45 67',
    address: '64 Avenue de la Marne, Bordeaux', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Audi A4',
    date: '2026-05-09', time: '20:00', status: 'completed',
    assignedTo: 'Célian', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 68,
    createdAt: '2026-05-08T17:00:00Z',
  },

  // ── Semaine 2 (Mai 10-16) : 7 jobs → alerte déclenchée ──
  {
    id: 'bk-011', clientName: 'Emma Bernard', clientPhone: '06 11 22 33 44',
    address: '3 Rue de la Paix, Bordeaux', formulaSlug: 'deep-clean',
    vehicleSize: 'citadine', vehicleBrand: 'Fiat 500',
    date: '2026-05-10', time: '11:00', status: 'completed',
    assignedTo: 'Louis', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 60,
    createdAt: '2026-05-09T15:00:00Z',
  },
  {
    id: 'bk-012', clientName: 'Nicolas Faure', clientPhone: '07 22 33 44 55',
    address: '77 Rue du Tondu, Bordeaux', formulaSlug: 'express',
    vehicleSize: 'berline', vehicleBrand: 'Honda Civic',
    date: '2026-05-11', time: '18:30', status: 'completed',
    assignedTo: 'Célian', revenue: 45, netRevenue: 20, durationHours: 1.5, xpEarned: 38,
    createdAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 'bk-013', clientName: 'Laure Chevalier', clientPhone: '06 33 44 55 66',
    address: '12 Allée de Tourny, Bordeaux', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Ford Focus',
    date: '2026-05-12', time: '18:00', status: 'completed',
    assignedTo: 'Louis', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 60,
    createdAt: '2026-05-11T09:00:00Z',
  },
  {
    id: 'bk-014', clientName: 'Sébastien Laurent', clientPhone: '07 44 55 66 77',
    address: '29 Rue Judaïque, Bordeaux', formulaSlug: 'express',
    vehicleSize: 'citadine', vehicleBrand: 'Opel Corsa',
    date: '2026-05-14', time: '19:00', status: 'completed',
    assignedTo: 'Célian', revenue: 45, netRevenue: 20, durationHours: 1.5, xpEarned: 30,
    createdAt: '2026-05-13T12:00:00Z',
  },
  {
    id: 'bk-015', clientName: 'Audrey Roux', clientPhone: '06 55 66 77 88',
    address: '41 Avenue de la Victoire, Bordeaux', formulaSlug: 'premium',
    vehicleSize: 'suv', vehicleBrand: 'Volvo XC60',
    date: '2026-05-15', time: '18:00', status: 'completed',
    assignedTo: 'Louis', revenue: 145, netRevenue: 75, durationHours: 5.5, xpEarned: 115,
    createdAt: '2026-05-14T10:00:00Z',
  },
  {
    id: 'bk-016', clientName: 'Maxime Blanc', clientPhone: '07 66 77 88 99',
    address: '6 Place Gambetta, Bordeaux', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Citroën C5',
    date: '2026-05-16', time: '10:00', status: 'completed',
    assignedTo: 'Célian', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 60,
    createdAt: '2026-05-15T14:00:00Z',
  },
  {
    id: 'bk-017', clientName: 'Camille Dubois', clientPhone: '06 77 88 99 00',
    address: '52 Rue Notre-Dame, Bordeaux', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Renault Mégane',
    date: '2026-05-16', time: '14:00', status: 'completed',
    assignedTo: 'Louis', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 60,
    createdAt: '2026-05-15T17:00:00Z',
  },

  // ── À venir ──
  {
    id: 'bk-018', clientName: 'Paul Fontaine', clientPhone: '07 88 99 00 11',
    address: '15 Rue des Arts, Bordeaux', formulaSlug: 'deep-clean',
    vehicleSize: 'berline', vehicleBrand: 'Peugeot 508',
    date: '2026-05-18', time: '10:00', status: 'pending',
    assignedTo: 'Célian', revenue: 85, netRevenue: 40, durationHours: 3, xpEarned: 0,
    createdAt: '2026-05-16T20:00:00Z',
  },
  {
    id: 'bk-019', clientName: 'Léa Garnier', clientPhone: '06 99 00 11 22',
    address: '88 Avenue du Général Leclerc, Mérignac', formulaSlug: 'express',
    vehicleSize: 'citadine', vehicleBrand: 'Toyota Yaris',
    date: '2026-05-20', time: '19:00', status: 'confirmed',
    assignedTo: 'Louis', revenue: 45, netRevenue: 20, durationHours: 1.5, xpEarned: 0,
    createdAt: '2026-05-16T21:30:00Z',
  },
]

export const MOCK_QUESTS: Quest[] = [
  // Daily
  {
    id: 'q-d1', type: 'daily', icon: '🌙',
    title: 'Nettoyage Nocturne',
    description: 'Réaliser 1 prestation après 18h en semaine',
    xpReward: 20, completed: true, progress: 1, target: 1,
  },
  {
    id: 'q-d2', type: 'daily', icon: '📸',
    title: 'Chasseur de Feedback',
    description: 'Demander un avis Google après chaque prestation',
    xpReward: 15, completed: false, progress: 0, target: 1,
  },
  // Weekly
  {
    id: 'q-w1', type: 'weekly', icon: '💧',
    title: 'Réservoir Vide',
    description: 'Vider un réservoir complet d\'injecteur-extracteur sur la semaine',
    xpReward: 80, completed: false, progress: 1, target: 2,
  },
  {
    id: 'q-w2', type: 'weekly', icon: '💼',
    title: 'Prospection B2B',
    description: 'Contacter 5 entreprises pour un partenariat CE',
    xpReward: 150, completed: false, progress: 2, target: 5,
  },
  {
    id: 'q-w3', type: 'weekly', icon: '📦',
    title: 'Flyers en Zone Stratégique',
    description: 'Déposer 50 flyers dans des parkings ou résidences',
    xpReward: 50, completed: true, progress: 50, target: 50,
  },
  // Boss
  {
    id: 'q-b1', type: 'boss', icon: '🚙',
    title: 'LE SUV BOUEUX DE L\'EXTRÊME',
    description: 'Réaliser une formule Premium sur un SUV cette semaine. Bonus +20% sur le revenu net de ce job.',
    xpReward: 200, completed: true, progress: 1, target: 1,
  },
]
