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
    ],
    modules: [
      {
        number: 1,
        title: 'Networking Today',
        topics: ['Rôle des réseaux dans le monde moderne', 'Types de réseaux (LAN, WAN, MAN, WLAN)', 'Composants réseau (routeur, switch, serveur, client)', 'Convergence réseau']
      },
      {
        number: 2,
        title: 'Basic Switch and End Device Configuration',
        topics: ['Accès CLI Cisco', 'Configuration initiale d\'un switch', 'Nom d\'hôte, Mots de passe, Bannière', 'Configuration d\'adresse IP sur PC', 'Commandes de vérification (ping, ipconfig)']
      },
      {
        number: 3,
        title: 'Protocols and Models',
        topics: ['Modèle OSI (7 couches)', 'Modèle TCP/IP', 'Encapsulation', 'Rôle des protocoles']
      },
      {
        number: 4,
        title: 'Physical Layer',
        topics: ['Types de câbles (UTP, fibre optique)', 'Connecteurs', 'Notion de bande passante', 'Duplex / half-duplex', 'Interférences et atténuation']
      },
      {
        number: 5,
        title: 'Number Systems',
        topics: ['Binaire', 'Décimal', 'Hexadécimal', 'Conversion de bases']
      },
      {
        number: 6,
        title: 'Data Link Layer',
        topics: ['Adresses MAC', 'Trames Ethernet', 'Switch learning process', 'ARP']
      },
      {
        number: 7,
        title: 'Ethernet Switching',
        topics: ['Table MAC', 'Forwarding', 'Collision domain', 'Broadcast domain']
      },
      {
        number: 8,
        title: 'Network Layer',
        topics: ['IPv4', 'Structure d\'une adresse IP', 'Masque de sous-réseau', 'Gateway', 'Introduction au routage']
      },
      {
        number: 9,
        title: 'Address Resolution',
        topics: ['ARP process', 'Communication locale et distante']
      },
      {
        number: 10,
        title: 'Basic Router Configuration',
        topics: ['Configuration interface routeur', 'Adresse IP sur interface', 'no shutdown', 'Default gateway']
      },
      {
        number: 11,
        title: 'IPv4 Addressing',
        topics: ['Classes A, B, C', 'CIDR', 'Subnetting', 'Calcul de sous-réseaux', 'VLSM introduction']
      },
      {
        number: 12,
        title: 'IPv6 Addressing',
        topics: ['Format IPv6', 'Compression', 'Types d\'adresses', 'Configuration simple IPv6']
      },
      {
        number: 13,
        title: 'ICMP',
        topics: ['Ping', 'Traceroute', 'Messages ICMP']
      },
      {
        number: 14,
        title: 'Transport Layer',
        topics: ['TCP vs UDP', 'Ports', 'Fiabilité', 'Three-way handshake']
      },
      {
        number: 15,
        title: 'Application Layer',
        topics: ['HTTP/HTTPS', 'FTP', 'DNS', 'DHCP', 'SMTP']
      }
    ],
    practicalSkills: [
      'Configurer un switch Cisco',
      'Configurer un routeur basique',
      'Attribuer des adresses IPv4',
      'Réaliser un subnetting',
      'Tester la connectivité',
      'Comprendre le modèle OSI',
      'Lire une trame Ethernet',
      'Diagnostiquer un problème simple'
    ],
    note: 'CCNA 1 = Fondations réseau. C\'est le module le plus structurant. Sans maîtrise du CCNA 1, le reste est fragile.'
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
      'Configurer des réseaux commutés (switching)',
      'Mettre en place le routage inter-VLAN',
      'Configurer des réseaux sans fil',
      'Implémenter la sécurité de base',
      'Déployer le routage statique et dynamique'
    ],
    modules: [
      {
        number: 1,
        title: 'Basic Device Configuration Review',
        topics: ['Révision CCNA1', 'Configuration avancée switch', 'Configuration routeur', 'Vérification et dépannage']
      },
      {
        number: 2,
        title: 'Switching Concepts',
        topics: ['VLAN', 'Segmentation réseau', 'Access ports vs trunk ports', '802.1Q encapsulation', 'Native VLAN']
      },
      {
        number: 3,
        title: 'VLAN Configuration',
        topics: ['Création de VLAN', 'Attribution de ports', 'VLAN management', 'Vérification avec show vlan']
      },
      {
        number: 4,
        title: 'Inter-VLAN Routing',
        topics: ['Router-on-a-stick', 'Sous-interfaces', 'Encapsulation dot1Q', 'Configuration IP sur sous-interface', 'Test de connectivité']
      },
      {
        number: 5,
        title: 'STP (Spanning Tree Protocol)',
        topics: ['Boucles réseau', 'Fonctionnement STP', 'Root bridge', 'États des ports', 'RSTP introduction']
      },
      {
        number: 6,
        title: 'EtherChannel',
        topics: ['Agrégation de liens', 'LACP', 'PAgP', 'Configuration pratique']
      },
      {
        number: 7,
        title: 'DHCP',
        topics: ['Configuration DHCP sur routeur', 'Exclusion d\'adresses', 'Pools DHCP', 'DHCP relay']
      },
      {
        number: 8,
        title: 'SLAAC et DHCPv6',
        topics: ['IPv6 auto-configuration', 'DHCPv6 stateless / stateful']
      },
      {
        number: 9,
        title: 'Wireless Concepts',
        topics: ['WLAN', '802.11 standards', 'Fréquences 2.4 GHz / 5 GHz', 'Sécurité Wi-Fi']
      },
      {
        number: 10,
        title: 'WLAN Configuration',
        topics: ['Configuration routeur Wi-Fi', 'SSID', 'WPA2 / WPA3', 'Sécurisation réseau sans fil']
      },
      {
        number: 11,
        title: 'Static Routing',
        topics: ['Route statique', 'Default route', 'Floating static route', 'Configuration avec ip route']
      },
      {
        number: 12,
        title: 'Dynamic Routing (OSPF Single Area)',
        topics: ['Introduction au routage dynamique', 'OSPFv2', 'Router ID', 'Network command', 'Vérification show ip route', 'Dépannage OSPF']
      },
      {
        number: 13,
        title: 'FHRP (Introduction)',
        topics: ['HSRP concept', 'Redondance gateway']
      },
      {
        number: 14,
        title: 'Network Security Basics',
        topics: ['Sécurisation des ports', 'Port security', 'DHCP snooping (introduction)', 'ARP inspection (concept)']
      }
    ],
    practicalSkills: [
      'Créer et configurer des VLAN',
      'Mettre en place un routage inter-VLAN',
      'Configurer un routeur-on-a-stick',
      'Configurer OSPF simple zone',
      'Déployer DHCP',
      'Configurer un réseau Wi-Fi sécurisé',
      'Mettre en place port security',
      'Dépanner un réseau de taille moyenne'
    ],
    note: 'CCNA 2 = Architecture réseau. Si CCNA 1 est la fondation, CCNA 2 est la construction de l\'infrastructure. C\'est le module où l\'étudiant devient réellement opérationnel.'
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
      'Concevoir et configurer un réseau d\'entreprise',
      'Mettre en œuvre le routage avancé',
      'Implémenter des mécanismes de sécurité réseau',
      'Comprendre les bases de l\'automatisation réseau',
      'Diagnostiquer des environnements complexes'
    ],
    modules: [
      {
        number: 1,
        title: 'Network Design Concepts',
        topics: ['Architecture réseau d\'entreprise', 'Modèle hiérarchique (Core / Distribution / Access)', 'Scalabilité', 'Redondance', 'Disponibilité']
      },
      {
        number: 2,
        title: 'Single-Area OSPFv2',
        topics: ['Configuration avancée OSPF', 'Router ID', 'Coût OSPF', 'Passive interfaces', 'Default route propagation', 'Vérification et dépannage']
      },
      {
        number: 3,
        title: 'WAN Concepts',
        topics: ['WAN vs LAN', 'Types de connexions WAN', 'MPLS', 'VPN', 'Internet connectivity']
      },
      {
        number: 4,
        title: 'WAN Configuration',
        topics: ['PPP', 'PPP authentication (PAP / CHAP)', 'Configuration lien WAN', 'Dépannage']
      },
      {
        number: 5,
        title: 'Network Security Concepts',
        topics: ['Threat landscape', 'CIA Triad', 'Attaques réseau', 'Défense en profondeur']
      },
      {
        number: 6,
        title: 'ACL (Access Control Lists)',
        topics: ['Standard ACL', 'Extended ACL', 'Placement stratégique', 'Configuration pratique', 'Vérification et dépannage']
      },
      {
        number: 7,
        title: 'NAT (Network Address Translation)',
        topics: ['NAT statique', 'NAT dynamique', 'PAT (Overload)', 'Configuration et vérification']
      },
      {
        number: 8,
        title: 'VPN & Secure Connectivity',
        topics: ['VPN concepts', 'IPsec (concept)', 'Tunnel sécurisé', 'Introduction GRE']
      },
      {
        number: 9,
        title: 'QoS (Quality of Service)',
        topics: ['Priorisation du trafic', 'Latence', 'Jitter', 'Concepts QoS']
      },
      {
        number: 10,
        title: 'Network Management',
        topics: ['SNMP', 'Syslog', 'NTP', 'Monitoring']
      },
      {
        number: 11,
        title: 'Network Automation',
        topics: ['Introduction à l\'automatisation', 'API', 'REST', 'JSON', 'Introduction Python', 'Concepts DevNet']
      },
      {
        number: 12,
        title: 'Programmability',
        topics: ['Controller-based networking', 'SDN concepts', 'Introduction Cisco DNA Center']
      }
    ],
    practicalSkills: [
      'Concevoir une architecture réseau d\'entreprise',
      'Configurer OSPF avancé',
      'Mettre en place des ACL',
      'Implémenter NAT',
      'Sécuriser un périmètre réseau',
      'Configurer PPP',
      'Comprendre VPN & tunneling',
      'Mettre en œuvre supervision réseau',
      'Comprendre l\'automatisation réseau'
    ],
    note: 'CCNA 3 = Niveau entreprise. C\'est le module qui transforme un technicien réseau en Administrateur réseau junior, Technicien cybersécurité, ou futur ingénieur réseau. Les 3 modules (CCNA 1 + 2 + 3) préparent à l\'examen Cisco Certified Network Associate.'
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
      'Surveiller un réseau et identifier des menaces',
      'Analyser des logs et détecter des anomalies',
      'Réagir aux incidents de sécurité',
      'Appliquer des procédures de cybersécurité',
      'Participer aux opérations d\'un SOC'
    ],
    modules: [
      {
        number: 1,
        title: 'Cybersecurity Foundations',
        topics: ['Principes fondamentaux de la cybersécurité', 'CIA Triad (Confidentialité, Intégrité, Disponibilité)', 'Types de menaces', 'Attaques courantes (phishing, malware, DDoS)', 'Vecteurs d\'attaque']
      },
      {
        number: 2,
        title: 'Operating Systems & Network Basics',
        topics: ['Rappels réseau (IP, ports, protocoles)', 'TCP vs UDP', 'Services réseau (DNS, HTTP, FTP)', 'Linux fundamentals', 'Windows fundamentals', 'Processus et services']
      },
      {
        number: 3,
        title: 'Security Monitoring Concepts',
        topics: ['SOC structure', 'Rôle d\'un analyste SOC', 'Types d\'alertes', 'Triage des incidents', 'Niveaux d\'escalade']
      },
      {
        number: 4,
        title: 'Network Security Monitoring (NSM)',
        topics: ['Analyse de trafic réseau', 'IDS / IPS', 'Wireshark', 'NetFlow', 'Détection d\'anomalies']
      },
      {
        number: 5,
        title: 'Log Analysis',
        topics: ['Types de logs', 'Syslog', 'Windows Event Logs', 'Corrélation d\'événements', 'Indicateurs de compromission (IOC)']
      },
      {
        number: 6,
        title: 'Security Policies & Procedures',
        topics: ['Politique de sécurité', 'Gestion des accès', 'Principe du moindre privilège', 'Segmentation réseau', 'Documentation des incidents']
      },
      {
        number: 7,
        title: 'Endpoint Security',
        topics: ['Antivirus', 'EDR', 'Malware analysis basics', 'Techniques d\'évasion']
      },
      {
        number: 8,
        title: 'Cryptography Fundamentals',
        topics: ['Hashing', 'Encryption symétrique / asymétrique', 'TLS', 'Certificats numériques', 'PKI']
      },
      {
        number: 9,
        title: 'Incident Response',
        topics: ['Cycle de réponse à incident', 'Identification', 'Confinement', 'Éradication', 'Récupération', 'Rapport d\'incident']
      },
      {
        number: 10,
        title: 'Digital Forensics Basics',
        topics: ['Collecte de preuves', 'Intégrité des données', 'Chaîne de conservation', 'Analyse post-incident']
      },
      {
        number: 11,
        title: 'SIEM Concepts',
        topics: ['Introduction SIEM', 'Corrélation', 'Analyse centralisée', 'Détection automatisée']
      }
    ],
    practicalSkills: [
      'Identifier des menaces réseau',
      'Analyser du trafic avec Wireshark',
      'Lire et interpréter des logs',
      'Détecter des comportements suspects',
      'Appliquer des procédures SOC',
      'Réagir à un incident',
      'Comprendre la cryptographie de base',
      'Participer à une investigation'
    ],
    careerProfiles: [
      'Analyste SOC Niveau 1',
      'Technicien cybersécurité',
      'Administrateur sécurité junior',
      'Analyste sécurité réseau'
    ],
    note: 'CyberOps est le complément naturel du CCNA. CCNA → Infrastructure, CyberOps → Défense. Ensemble, cela crée un profil très attractif pour les entreprises, ESN, SOC et PME.'
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
