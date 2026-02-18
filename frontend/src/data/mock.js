// Mock data for Saint-Georges Academy

export const courses = [
  {
    id: 'ccna1',
    title: 'CCNA 1 – Introduction to Networks',
    category: 'CCNA',
    description: 'Foundational networking concepts including network architecture, IP addressing, and basic configuration.',
    duration: '70 hours',
    level: 'Débutant',
    onlinePrice: 2290,
    inClassPrice: 3290,
    certificationCost: 630,
    features: [
      'Accès au cours officiel Cisco NetAcad',
      'Programme structuré et progressif',
      'Travaux pratiques (Packet Tracer)',
      'Session live hebdomadaire de 45 minutes',
      'Évaluation continue',
      'Support technique'
    ],
    inClassFeatures: [
      'Formation en présentiel à Loudun',
      'Durée : 35 heures (1 semaine intensive)',
      'Travaux pratiques sur équipements réels',
      'Encadrement par instructeur certifié',
      'Évaluation finale'
    ],
    objectives: [
      'Comprendre les fondamentaux des réseaux',
      'Maîtriser l\'adressage IP',
      'Configurer des équipements Cisco',
      'Implémenter des réseaux de petite et moyenne taille'
    ]
  },
  {
    id: 'ccna2',
    title: 'CCNA 2 – Switching, Routing, and Wireless Essentials',
    category: 'CCNA',
    description: 'Advanced routing and switching concepts, VLANs, inter-VLAN routing, and wireless technologies.',
    duration: '70 hours',
    level: 'Intermédiaire',
    onlinePrice: 2290,
    inClassPrice: 3290,
    certificationCost: 630,
    features: [
      'Accès au cours officiel Cisco NetAcad',
      'Programme structuré et progressif',
      'Travaux pratiques (Packet Tracer)',
      'Session live hebdomadaire de 45 minutes',
      'Évaluation continue',
      'Support technique'
    ],
    inClassFeatures: [
      'Formation en présentiel à Loudun',
      'Durée : 35 heures (1 semaine intensive)',
      'Travaux pratiques sur équipements réels',
      'Encadrement par instructeur certifié',
      'Évaluation finale'
    ],
    objectives: [
      'Maîtriser les VLANs et le routage inter-VLAN',
      'Configurer le routage dynamique',
      'Implémenter des réseaux sans fil',
      'Optimiser les performances réseau'
    ]
  },
  {
    id: 'ccna3',
    title: 'CCNA 3 – Enterprise Networking, Security, and Automation',
    category: 'CCNA',
    description: 'Enterprise network architecture, security concepts, and network automation fundamentals.',
    duration: '70 hours',
    level: 'Avancé',
    onlinePrice: 2290,
    inClassPrice: 3290,
    certificationCost: 630,
    features: [
      'Accès au cours officiel Cisco NetAcad',
      'Programme structuré et progressif',
      'Travaux pratiques (Packet Tracer)',
      'Session live hebdomadaire de 45 minutes',
      'Évaluation continue',
      'Support technique'
    ],
    inClassFeatures: [
      'Formation en présentiel à Loudun',
      'Durée : 35 heures (1 semaine intensive)',
      'Travaux pratiques sur équipements réels',
      'Encadrement par instructeur certifié',
      'Évaluation finale'
    ],
    objectives: [
      'Concevoir des architectures réseau d\'entreprise',
      'Implémenter des politiques de sécurité',
      'Automatiser les tâches réseau',
      'Préparer la certification CCNA'
    ]
  },
  {
    id: 'cyberops',
    title: 'CyberOps Associate',
    category: 'Cybersécurité',
    description: 'Security operations, threat detection, incident response, and security monitoring fundamentals.',
    duration: '70 hours',
    level: 'Intermédiaire',
    onlinePrice: 2290,
    inClassPrice: 3290,
    certificationCost: 630,
    features: [
      'Accès au cours officiel Cisco NetAcad',
      'Programme structuré et progressif',
      'Travaux pratiques sur outils de sécurité',
      'Session live hebdomadaire de 45 minutes',
      'Évaluation continue',
      'Support technique'
    ],
    inClassFeatures: [
      'Formation en présentiel à Loudun',
      'Durée : 35 heures (1 semaine intensive)',
      'Travaux pratiques sur outils réels',
      'Encadrement par instructeur certifié',
      'Évaluation finale'
    ],
    objectives: [
      'Surveiller et analyser les menaces de sécurité',
      'Répondre aux incidents de sécurité',
      'Utiliser des outils de cybersécurité',
      'Comprendre les techniques d\'attaque et de défense'
    ]
  },
  {
    id: 'unreal',
    title: 'Unreal Engine Fundamentals',
    category: 'Développement',
    description: 'Complete introduction to Unreal Engine, Blueprint scripting, and game development.',
    duration: '35 hours',
    level: 'Tous niveaux',
    inClassPrice: 3750,
    onlinePrice: null,
    certificationCost: null,
    inClassFeatures: [
      'Formation intensive en présentiel',
      'Durée : 35 heures (1 semaine)',
      'Fondamentaux d\'Unreal Engine',
      'Scripting Blueprint',
      'Développement de projet',
      'Prototype jouable final',
      'Attestation de formation'
    ],
    objectives: [
      'Maîtriser l\'interface Unreal Engine',
      'Créer des Blueprints fonctionnels',
      'Développer un prototype de jeu',
      'Comprendre le workflow de développement'
    ]
  }
];

export const videoProduct = {
  id: 'videos-75',
  title: '75 Vidéos de Préparation CCNA',
  price: 150,
  description: 'Collection complète de 75 vidéos pour préparer efficacement votre certification CCNA.',
  features: [
    'Accès à 75 vidéos de préparation',
    'Visionnage à votre rythme',
    'Suivi de progression',
    'Accès illimité pendant 12 mois',
    'Contenus mis à jour régulièrement'
  ],
  note: 'Ce produit ne comprend pas l\'accès NetAcad, les sessions live, ni l\'examen de certification.'
};

export const fundingOptions = [
  {
    id: 'personal',
    title: 'Financement Personnel',
    icon: 'User',
    description: 'Paiement direct par carte bancaire ou virement.',
    benefits: [
      'Inscription immédiate',
      'Flexibilité totale',
      'Accès instantané'
    ]
  },
  {
    id: 'employer',
    title: 'Financement Employeur',
    icon: 'Building2',
    description: 'Votre entreprise finance votre formation dans le cadre du plan de développement des compétences.',
    benefits: [
      'Prise en charge totale ou partielle',
      'Convention de formation fournie',
      'Facturation entreprise'
    ]
  },
  {
    id: 'opco',
    title: 'OPCO',
    icon: 'FileText',
    description: 'Financement par votre Opérateur de Compétences.',
    benefits: [
      'Prise en charge possible',
      'Accompagnement dans les démarches',
      'Dossier de financement personnalisé'
    ]
  },
  {
    id: 'france-travail',
    title: 'France Travail (AIF)',
    icon: 'Briefcase',
    description: 'Aide Individuelle à la Formation sous réserve d\'acceptation par France Travail.',
    benefits: [
      'Possibilité de financement total',
      'Accompagnement du conseiller',
      'Validation selon votre situation'
    ]
  }
];

export const instructors = [
  {
    id: 'instructor1',
    name: 'Jean-Marc Dubois',
    specialty: 'CCNA & Réseaux',
    availability: [
      { day: 'Lundi', slots: ['10:00', '14:00', '16:00'] },
      { day: 'Mercredi', slots: ['10:00', '15:00'] },
      { day: 'Vendredi', slots: ['14:00', '16:00'] }
    ]
  },
  {
    id: 'instructor2',
    name: 'Sophie Martin',
    specialty: 'CyberOps & Sécurité',
    availability: [
      { day: 'Mardi', slots: ['09:00', '14:00'] },
      { day: 'Jeudi', slots: ['10:00', '15:00', '17:00'] }
    ]
  },
  {
    id: 'instructor3',
    name: 'Pierre Lefebvre',
    specialty: 'Unreal Engine',
    availability: [
      { day: 'Lundi', slots: ['09:00', '11:00'] },
      { day: 'Mercredi', slots: ['14:00', '16:00'] },
      { day: 'Vendredi', slots: ['10:00'] }
    ]
  }
];

// Mock cart and checkout
export const mockCheckout = (items) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        total: items.reduce((sum, item) => sum + item.price, 0),
        message: 'Paiement simulé réussi'
      });
    }, 1500);
  });
};

export const mockBookSession = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        bookingId: `BOOK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        message: 'Session réservée avec succès'
      });
    }, 1000);
  });
};
