from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import os
import uuid
from motor.motor_asyncio import AsyncIOMotorClient

# Create router
course_router = APIRouter(prefix="/api/courses", tags=["courses"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# =============================================================================
# Models
# =============================================================================
class ModuleModel(BaseModel):
    number: int
    title: str
    topics: List[str]

class CourseBase(BaseModel):
    id: str
    title: str
    category: str
    description: str
    duration: str
    level: str
    onlinePrice: Optional[float] = None
    inClassPrice: Optional[float] = None
    certificationCost: Optional[float] = None
    features: Optional[List[str]] = None
    inClassFeatures: Optional[List[str]] = None
    objectives: Optional[List[str]] = None
    modules: Optional[List[ModuleModel]] = None
    practicalSkills: Optional[List[str]] = None
    targetAudience: Optional[Any] = None
    prerequisites: Optional[Any] = None
    note: Optional[str] = None
    careerProfiles: Optional[List[str]] = None
    levels: Optional[List[Dict[str, Any]]] = None

class CourseResponse(CourseBase):
    pass

class VideoProductResponse(BaseModel):
    id: str
    title: str
    price: float
    description: str
    features: List[str]
    note: str

# =============================================================================
# API Endpoints
# =============================================================================

@course_router.get("", response_model=List[CourseResponse])
async def get_courses(category: Optional[str] = None):
    """Get all courses, optionally filtered by category"""
    query = {}
    if category:
        query["category"] = category
    
    courses = await db.courses.find(query, {"_id": 0}).to_list(100)
    return courses

@course_router.get("/videos", response_model=VideoProductResponse)
async def get_video_product():
    """Get the 75 CCNA videos product"""
    video_product = await db.video_product.find_one({}, {"_id": 0})
    if not video_product:
        raise HTTPException(status_code=404, detail="Video product not found")
    return video_product

@course_router.get("/{course_id}", response_model=CourseResponse)
async def get_course(course_id: str):
    """Get a specific course by ID"""
    course = await db.courses.find_one({"id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail=f"Course {course_id} not found")
    return course

# =============================================================================
# Seed Data Endpoint (for initial setup)
# =============================================================================

@course_router.post("/seed")
async def seed_courses():
    """Seed the database with course data"""
    
    # Check if data already exists
    existing_count = await db.courses.count_documents({})
    if existing_count > 0:
        return {"message": f"Database already has {existing_count} courses. Skipping seed."}
    
    # Course data
    courses = [
        {
            "id": "ccna1",
            "title": "CCNA 1 – Introduction to Networks",
            "category": "CCNA",
            "description": "Foundational networking concepts including network architecture, IP addressing, and basic configuration.",
            "duration": "70 hours",
            "level": "Débutant",
            "onlinePrice": 2290,
            "inClassPrice": 3290,
            "certificationCost": 630,
            "features": [
                "Accès au cours officiel Cisco NetAcad",
                "Programme structuré et progressif",
                "Travaux pratiques (Packet Tracer)",
                "Session live hebdomadaire de 45 minutes",
                "Évaluation continue",
                "Support technique"
            ],
            "inClassFeatures": [
                "Formation en présentiel à Loudun",
                "Durée : 35 heures (1 semaine intensive)",
                "Travaux pratiques sur équipements réels",
                "Encadrement par instructeur certifié",
                "Évaluation finale"
            ],
            "objectives": [
                "Comprendre les fondamentaux des réseaux",
                "Maîtriser l'adressage IP",
                "Configurer des équipements Cisco",
                "Implémenter des réseaux de petite et moyenne taille"
            ],
            "modules": [
                {"number": 1, "title": "Networking Today", "topics": ["Rôle des réseaux dans le monde moderne", "Types de réseaux (LAN, WAN, MAN, WLAN)", "Composants réseau (routeur, switch, serveur, client)", "Convergence réseau"]},
                {"number": 2, "title": "Basic Switch and End Device Configuration", "topics": ["Accès CLI Cisco", "Configuration initiale d'un switch", "Nom d'hôte, Mots de passe, Bannière", "Configuration d'adresse IP sur PC", "Commandes de vérification (ping, ipconfig)"]},
                {"number": 3, "title": "Protocols and Models", "topics": ["Modèle OSI (7 couches)", "Modèle TCP/IP", "Encapsulation", "Rôle des protocoles"]},
                {"number": 4, "title": "Physical Layer", "topics": ["Types de câbles (UTP, fibre optique)", "Connecteurs", "Notion de bande passante", "Duplex / half-duplex", "Interférences et atténuation"]},
                {"number": 5, "title": "Number Systems", "topics": ["Binaire", "Décimal", "Hexadécimal", "Conversion de bases"]},
                {"number": 6, "title": "Data Link Layer", "topics": ["Adresses MAC", "Trames Ethernet", "Switch learning process", "ARP"]},
                {"number": 7, "title": "Ethernet Switching", "topics": ["Table MAC", "Forwarding", "Collision domain", "Broadcast domain"]},
                {"number": 8, "title": "Network Layer", "topics": ["IPv4", "Structure d'une adresse IP", "Masque de sous-réseau", "Gateway", "Introduction au routage"]},
                {"number": 9, "title": "Address Resolution", "topics": ["ARP process", "Communication locale et distante"]},
                {"number": 10, "title": "Basic Router Configuration", "topics": ["Configuration interface routeur", "Adresse IP sur interface", "no shutdown", "Default gateway"]},
                {"number": 11, "title": "IPv4 Addressing", "topics": ["Classes A, B, C", "CIDR", "Subnetting", "Calcul de sous-réseaux", "VLSM introduction"]},
                {"number": 12, "title": "IPv6 Addressing", "topics": ["Format IPv6", "Compression", "Types d'adresses", "Configuration simple IPv6"]},
                {"number": 13, "title": "ICMP", "topics": ["Ping", "Traceroute", "Messages ICMP"]},
                {"number": 14, "title": "Transport Layer", "topics": ["TCP vs UDP", "Ports", "Fiabilité", "Three-way handshake"]},
                {"number": 15, "title": "Application Layer", "topics": ["HTTP/HTTPS", "FTP", "DNS", "DHCP", "SMTP"]}
            ],
            "practicalSkills": [
                "Configurer un switch Cisco",
                "Configurer un routeur basique",
                "Attribuer des adresses IPv4",
                "Réaliser un subnetting",
                "Tester la connectivité",
                "Comprendre le modèle OSI",
                "Lire une trame Ethernet",
                "Diagnostiquer un problème simple"
            ],
            "targetAudience": [
                "Débutants en informatique",
                "Étudiants post-bac",
                "Personnes en reconversion professionnelle",
                "Demandeurs d'emploi",
                "Autodidactes souhaitant structurer leurs bases"
            ],
            "prerequisites": [
                "Maîtrise basique d'un ordinateur",
                "Compréhension simple de l'anglais technique (lecture)",
                "Aucune connaissance réseau requise",
                "Motivation et capacité de travail autonome"
            ],
            "note": "CCNA 1 = Fondations réseau. C'est le module le plus structurant. Sans maîtrise du CCNA 1, le reste est fragile. Validation du niveau possible via entretien ou test de positionnement."
        },
        {
            "id": "ccna2",
            "title": "CCNA 2 – Switching, Routing, and Wireless Essentials",
            "category": "CCNA",
            "description": "Advanced routing and switching concepts, VLANs, inter-VLAN routing, and wireless technologies.",
            "duration": "70 hours",
            "level": "Intermédiaire",
            "onlinePrice": 2290,
            "inClassPrice": 3290,
            "certificationCost": 630,
            "features": [
                "Accès au cours officiel Cisco NetAcad",
                "Programme structuré et progressif",
                "Travaux pratiques (Packet Tracer)",
                "Session live hebdomadaire de 45 minutes",
                "Évaluation continue",
                "Support technique"
            ],
            "inClassFeatures": [
                "Formation en présentiel à Loudun",
                "Durée : 35 heures (1 semaine intensive)",
                "Travaux pratiques sur équipements réels",
                "Encadrement par instructeur certifié",
                "Évaluation finale"
            ],
            "objectives": [
                "Configurer des réseaux commutés (switching)",
                "Mettre en place le routage inter-VLAN",
                "Configurer des réseaux sans fil",
                "Implémenter la sécurité de base",
                "Déployer le routage statique et dynamique"
            ],
            "modules": [
                {"number": 1, "title": "Basic Device Configuration Review", "topics": ["Révision CCNA1", "Configuration avancée switch", "Configuration routeur", "Vérification et dépannage"]},
                {"number": 2, "title": "Switching Concepts", "topics": ["VLAN", "Segmentation réseau", "Access ports vs trunk ports", "802.1Q encapsulation", "Native VLAN"]},
                {"number": 3, "title": "VLAN Configuration", "topics": ["Création de VLAN", "Attribution de ports", "VLAN management", "Vérification avec show vlan"]},
                {"number": 4, "title": "Inter-VLAN Routing", "topics": ["Router-on-a-stick", "Sous-interfaces", "Encapsulation dot1Q", "Configuration IP sur sous-interface", "Test de connectivité"]},
                {"number": 5, "title": "STP (Spanning Tree Protocol)", "topics": ["Boucles réseau", "Fonctionnement STP", "Root bridge", "États des ports", "RSTP introduction"]},
                {"number": 6, "title": "EtherChannel", "topics": ["Agrégation de liens", "LACP", "PAgP", "Configuration pratique"]},
                {"number": 7, "title": "DHCP", "topics": ["Configuration DHCP sur routeur", "Exclusion d'adresses", "Pools DHCP", "DHCP relay"]},
                {"number": 8, "title": "SLAAC et DHCPv6", "topics": ["IPv6 auto-configuration", "DHCPv6 stateless / stateful"]},
                {"number": 9, "title": "Wireless Concepts", "topics": ["WLAN", "802.11 standards", "Fréquences 2.4 GHz / 5 GHz", "Sécurité Wi-Fi"]},
                {"number": 10, "title": "WLAN Configuration", "topics": ["Configuration routeur Wi-Fi", "SSID", "WPA2 / WPA3", "Sécurisation réseau sans fil"]},
                {"number": 11, "title": "Static Routing", "topics": ["Route statique", "Default route", "Floating static route", "Configuration avec ip route"]},
                {"number": 12, "title": "Dynamic Routing (OSPF Single Area)", "topics": ["Introduction au routage dynamique", "OSPFv2", "Router ID", "Network command", "Vérification show ip route", "Dépannage OSPF"]},
                {"number": 13, "title": "FHRP (Introduction)", "topics": ["HSRP concept", "Redondance gateway"]},
                {"number": 14, "title": "Network Security Basics", "topics": ["Sécurisation des ports", "Port security", "DHCP snooping (introduction)", "ARP inspection (concept)"]}
            ],
            "practicalSkills": [
                "Créer et configurer des VLAN",
                "Mettre en place un routage inter-VLAN",
                "Configurer un routeur-on-a-stick",
                "Configurer OSPF simple zone",
                "Déployer DHCP",
                "Configurer un réseau Wi-Fi sécurisé",
                "Mettre en place port security",
                "Dépanner un réseau de taille moyenne"
            ],
            "targetAudience": [
                "Étudiants ayant validé CCNA 1",
                "Techniciens IT débutants",
                "Alternants",
                "Administrateurs systèmes juniors"
            ],
            "prerequisites": [
                "Maîtrise des notions CCNA 1",
                "Compréhension IPv4 et subnetting",
                "Configuration basique routeur/switch",
                "Connaissance modèle OSI",
                "Capacité à travailler en ligne de commande (CLI)"
            ],
            "note": "CCNA 2 = Architecture réseau. Si CCNA 1 est la fondation, CCNA 2 est la construction de l'infrastructure. C'est le module où l'étudiant devient réellement opérationnel. Validation du niveau possible via entretien ou test de positionnement."
        },
        {
            "id": "ccna3",
            "title": "CCNA 3 – Enterprise Networking, Security, and Automation",
            "category": "CCNA",
            "description": "Enterprise network architecture, security concepts, and network automation fundamentals.",
            "duration": "70 hours",
            "level": "Avancé",
            "onlinePrice": 2290,
            "inClassPrice": 3290,
            "certificationCost": 630,
            "features": [
                "Accès au cours officiel Cisco NetAcad",
                "Programme structuré et progressif",
                "Travaux pratiques (Packet Tracer)",
                "Session live hebdomadaire de 45 minutes",
                "Évaluation continue",
                "Support technique"
            ],
            "inClassFeatures": [
                "Formation en présentiel à Loudun",
                "Durée : 35 heures (1 semaine intensive)",
                "Travaux pratiques sur équipements réels",
                "Encadrement par instructeur certifié",
                "Évaluation finale"
            ],
            "objectives": [
                "Concevoir et configurer un réseau d'entreprise",
                "Mettre en œuvre le routage avancé",
                "Implémenter des mécanismes de sécurité réseau",
                "Comprendre les bases de l'automatisation réseau",
                "Diagnostiquer des environnements complexes"
            ],
            "modules": [
                {"number": 1, "title": "Network Design Concepts", "topics": ["Architecture réseau d'entreprise", "Modèle hiérarchique (Core / Distribution / Access)", "Scalabilité", "Redondance", "Disponibilité"]},
                {"number": 2, "title": "Single-Area OSPFv2", "topics": ["Configuration avancée OSPF", "Router ID", "Coût OSPF", "Passive interfaces", "Default route propagation", "Vérification et dépannage"]},
                {"number": 3, "title": "WAN Concepts", "topics": ["WAN vs LAN", "Types de connexions WAN", "MPLS", "VPN", "Internet connectivity"]},
                {"number": 4, "title": "WAN Configuration", "topics": ["PPP", "PPP authentication (PAP / CHAP)", "Configuration lien WAN", "Dépannage"]},
                {"number": 5, "title": "Network Security Concepts", "topics": ["Threat landscape", "CIA Triad", "Attaques réseau", "Défense en profondeur"]},
                {"number": 6, "title": "ACL (Access Control Lists)", "topics": ["Standard ACL", "Extended ACL", "Placement stratégique", "Configuration pratique", "Vérification et dépannage"]},
                {"number": 7, "title": "NAT (Network Address Translation)", "topics": ["NAT statique", "NAT dynamique", "PAT (Overload)", "Configuration et vérification"]},
                {"number": 8, "title": "VPN & Secure Connectivity", "topics": ["VPN concepts", "IPsec (concept)", "Tunnel sécurisé", "Introduction GRE"]},
                {"number": 9, "title": "QoS (Quality of Service)", "topics": ["Priorisation du trafic", "Latence", "Jitter", "Concepts QoS"]},
                {"number": 10, "title": "Network Management", "topics": ["SNMP", "Syslog", "NTP", "Monitoring"]},
                {"number": 11, "title": "Network Automation", "topics": ["Introduction à l'automatisation", "API", "REST", "JSON", "Introduction Python", "Concepts DevNet"]},
                {"number": 12, "title": "Programmability", "topics": ["Controller-based networking", "SDN concepts", "Introduction Cisco DNA Center"]}
            ],
            "practicalSkills": [
                "Concevoir une architecture réseau d'entreprise",
                "Configurer OSPF avancé",
                "Mettre en place des ACL",
                "Implémenter NAT",
                "Sécuriser un périmètre réseau",
                "Configurer PPP",
                "Comprendre VPN & tunneling",
                "Mettre en œuvre supervision réseau",
                "Comprendre l'automatisation réseau"
            ],
            "targetAudience": [
                "Étudiants ayant validé CCNA 1 & 2",
                "Techniciens réseau",
                "Administrateurs IT",
                "Profils évoluant vers ingénierie réseau"
            ],
            "prerequisites": [
                "Maîtrise VLAN et inter-VLAN",
                "Routage statique",
                "Bases OSPF",
                "Subnetting avancé",
                "Bonne compréhension TCP/IP",
                "Rigueur technique"
            ],
            "note": "CCNA 3 = Niveau entreprise. C'est le module qui transforme un technicien réseau en Administrateur réseau junior, Technicien cybersécurité, ou futur ingénieur réseau. Les 3 modules (CCNA 1 + 2 + 3) préparent à l'examen Cisco Certified Network Associate. Validation du niveau possible via entretien ou test de positionnement."
        },
        {
            "id": "cyberops",
            "title": "CyberOps Associate",
            "category": "Cybersécurité",
            "description": "Security operations, threat detection, incident response, and security monitoring fundamentals.",
            "duration": "70 hours",
            "level": "Intermédiaire",
            "onlinePrice": 2290,
            "inClassPrice": 3290,
            "certificationCost": 630,
            "features": [
                "Accès au cours officiel Cisco NetAcad",
                "Programme structuré et progressif",
                "Travaux pratiques sur outils de sécurité",
                "Session live hebdomadaire de 45 minutes",
                "Évaluation continue",
                "Support technique"
            ],
            "inClassFeatures": [
                "Formation en présentiel à Loudun",
                "Durée : 35 heures (1 semaine intensive)",
                "Travaux pratiques sur outils réels",
                "Encadrement par instructeur certifié",
                "Évaluation finale"
            ],
            "objectives": [
                "Surveiller un réseau et identifier des menaces",
                "Analyser des logs et détecter des anomalies",
                "Réagir aux incidents de sécurité",
                "Appliquer des procédures de cybersécurité",
                "Participer aux opérations d'un SOC"
            ],
            "modules": [
                {"number": 1, "title": "Cybersecurity Foundations", "topics": ["Principes fondamentaux de la cybersécurité", "CIA Triad (Confidentialité, Intégrité, Disponibilité)", "Types de menaces", "Attaques courantes (phishing, malware, DDoS)", "Vecteurs d'attaque"]},
                {"number": 2, "title": "Operating Systems & Network Basics", "topics": ["Rappels réseau (IP, ports, protocoles)", "TCP vs UDP", "Services réseau (DNS, HTTP, FTP)", "Linux fundamentals", "Windows fundamentals", "Processus et services"]},
                {"number": 3, "title": "Security Monitoring Concepts", "topics": ["SOC structure", "Rôle d'un analyste SOC", "Types d'alertes", "Triage des incidents", "Niveaux d'escalade"]},
                {"number": 4, "title": "Network Security Monitoring (NSM)", "topics": ["Analyse de trafic réseau", "IDS / IPS", "Wireshark", "NetFlow", "Détection d'anomalies"]},
                {"number": 5, "title": "Log Analysis", "topics": ["Types de logs", "Syslog", "Windows Event Logs", "Corrélation d'événements", "Indicateurs de compromission (IOC)"]},
                {"number": 6, "title": "Security Policies & Procedures", "topics": ["Politique de sécurité", "Gestion des accès", "Principe du moindre privilège", "Segmentation réseau", "Documentation des incidents"]},
                {"number": 7, "title": "Endpoint Security", "topics": ["Antivirus", "EDR", "Malware analysis basics", "Techniques d'évasion"]},
                {"number": 8, "title": "Cryptography Fundamentals", "topics": ["Hashing", "Encryption symétrique / asymétrique", "TLS", "Certificats numériques", "PKI"]},
                {"number": 9, "title": "Incident Response", "topics": ["Cycle de réponse à incident", "Identification", "Confinement", "Éradication", "Récupération", "Rapport d'incident"]},
                {"number": 10, "title": "Digital Forensics Basics", "topics": ["Collecte de preuves", "Intégrité des données", "Chaîne de conservation", "Analyse post-incident"]},
                {"number": 11, "title": "SIEM Concepts", "topics": ["Introduction SIEM", "Corrélation", "Analyse centralisée", "Détection automatisée"]}
            ],
            "practicalSkills": [
                "Identifier des menaces réseau",
                "Analyser du trafic avec Wireshark",
                "Lire et interpréter des logs",
                "Détecter des comportements suspects",
                "Appliquer des procédures SOC",
                "Réagir à un incident",
                "Comprendre la cryptographie de base",
                "Participer à une investigation"
            ],
            "careerProfiles": [
                "Analyste SOC Niveau 1",
                "Technicien cybersécurité",
                "Administrateur sécurité junior",
                "Analyste sécurité réseau"
            ],
            "targetAudience": [
                "Étudiants CCNA",
                "Techniciens réseau",
                "Personnes en reconversion vers la cybersécurité",
                "Profils analytiques"
            ],
            "prerequisites": [
                "Connaissances réseau niveau CCNA 1 minimum",
                "Compréhension TCP/IP",
                "Bases systèmes (Windows ou Linux)",
                "Intérêt pour la sécurité informatique",
                "Capacité d'analyse"
            ],
            "note": "CyberOps est le complément naturel du CCNA. CCNA → Infrastructure, CyberOps → Défense. Ensemble, cela crée un profil très attractif pour les entreprises, ESN, SOC et PME. Validation du niveau possible via entretien ou test de positionnement."
        },
        {
            "id": "unreal",
            "title": "Unreal Engine Fundamentals",
            "category": "Développement",
            "description": "Complete introduction to Unreal Engine, Blueprint scripting, and game development.",
            "duration": "35 hours",
            "level": "Tous niveaux",
            "inClassPrice": 3750,
            "onlinePrice": None,
            "certificationCost": None,
            "inClassFeatures": [
                "Formation intensive en présentiel",
                "Durée : 35 heures (1 semaine)",
                "Fondamentaux d'Unreal Engine",
                "Scripting Blueprint",
                "Développement de projet",
                "Prototype jouable final",
                "Attestation de formation"
            ],
            "objectives": [
                "Maîtriser l'interface Unreal Engine",
                "Créer des Blueprints fonctionnels",
                "Développer un prototype de jeu",
                "Comprendre le workflow de développement"
            ],
            "levels": [
                {
                    "name": "Beginner",
                    "subtitle": "Introduction to Real-Time 3D & Game Development",
                    "modules": [
                        {"number": 1, "title": "Introduction au moteur Unreal", "topics": ["Présentation de l'interface", "Viewport", "World Outliner", "Content Browser", "Actors et Components"]},
                        {"number": 2, "title": "Création d'un projet", "topics": ["Templates (First Person / Third Person)", "Structure d'un projet", "Organisation des dossiers"]},
                        {"number": 3, "title": "Environnement 3D", "topics": ["Import d'assets", "Static Mesh", "Collision", "Matériaux de base", "Lighting (lumière statique / dynamique)"]},
                        {"number": 4, "title": "Blueprint – Bases", "topics": ["Logique visuelle", "Variables", "Events", "Nodes", "Branch / Conditions", "Timeline"]},
                        {"number": 5, "title": "Gameplay de base", "topics": ["Mouvement du personnage", "Caméra", "Interactions simples", "Détection de collision"]},
                        {"number": 6, "title": "UI Basics", "topics": ["Widgets", "HUD", "Boutons", "Affichage score"]},
                        {"number": 7, "title": "Introduction au Level Design", "topics": ["Organisation d'un niveau", "Trigger volumes", "Spawn d'objets"]},
                        {"number": 8, "title": "Export et Build", "topics": ["Packaging du projet", "Génération d'un exécutable"]}
                    ],
                    "skills": [
                        "Naviguer dans Unreal Engine",
                        "Créer un environnement 3D simple",
                        "Programmer en Blueprint",
                        "Construire un prototype jouable",
                        "Comprendre la logique événementielle"
                    ],
                    "finalProject": "Création d'un mini-jeu jouable comprenant : Déplacement, Interaction, Score, Interface utilisateur, Export fonctionnel"
                },
                {
                    "name": "Intermediate",
                    "subtitle": "Advanced Blueprint & Game Systems",
                    "modules": [
                        {"number": 1, "title": "Architecture avancée", "topics": ["Game Mode", "Game State", "Player Controller", "Pawn vs Character", "Blueprint Classes"]},
                        {"number": 2, "title": "Blueprint avancé", "topics": ["Functions", "Macros", "Interfaces", "Event Dispatchers", "Data Structures (Arrays, Maps)"]},
                        {"number": 3, "title": "Intelligence Artificielle", "topics": ["Navigation Mesh", "Behavior Tree (introduction)", "AI Controller", "Détection joueur"]},
                        {"number": 4, "title": "Système d'inventaire", "topics": ["Struct", "Data Table", "Système d'objets", "Sauvegarde données"]},
                        {"number": 5, "title": "Animation System", "topics": ["Animation Blueprint", "Blend Space", "State Machine", "Transitions"]},
                        {"number": 6, "title": "Physics & Interaction", "topics": ["Rigid Body", "Forces", "Triggers complexes", "Destruction system"]},
                        {"number": 7, "title": "Optimisation", "topics": ["LOD", "Nanite (concept)", "Gestion mémoire", "Performance debugging"]},
                        {"number": 8, "title": "Introduction au Multijoueur", "topics": ["Concepts replication", "Client / Server", "RPC basics"]}
                    ],
                    "skills": [
                        "Structurer un projet professionnel",
                        "Développer des systèmes complexes",
                        "Implémenter IA basique",
                        "Optimiser un jeu",
                        "Comprendre logique multijoueur"
                    ],
                    "finalProject": "Création d'un jeu prototype avancé avec : IA simple, Système d'inventaire, Animations dynamiques, UI complète, Optimisation, Architecture structurée"
                }
            ],
            "targetAudience": {
                "beginner": [
                    "Débutants passionnés par le jeu vidéo",
                    "Étudiants créatifs",
                    "Designers",
                    "Reconversions vers le game development"
                ],
                "intermediate": [
                    "Étudiants ayant validé Unreal Beginner",
                    "Développeurs gameplay juniors",
                    "Profils techniques créatifs"
                ]
            },
            "prerequisites": {
                "beginner": [
                    "Maîtrise basique d'un ordinateur",
                    "Aisance dans un environnement 3D recommandée",
                    "Aucun prérequis en programmation",
                    "Créativité et motivation"
                ],
                "intermediate": [
                    "Bonne maîtrise Blueprint",
                    "Compréhension logique de programmation",
                    "Capacité à structurer un projet",
                    "Connaissances de base en mathématiques 3D (recommandé)"
                ]
            },
            "note": "Formation présentiel uniquement. Bootcamp intensif de 35h. Certificat interne de réussite. Unreal Beginner → Découverte & fondations. Unreal Intermediate → Développeur gameplay junior. Validation du niveau possible via entretien ou test de positionnement."
        }
    ]
    
    # Video product
    video_product = {
        "id": "videos-75",
        "title": "75 Vidéos de Préparation CCNA",
        "price": 150,
        "description": "Collection complète de 75 vidéos pour préparer efficacement votre certification CCNA.",
        "features": [
            "Accès à 75 vidéos de préparation",
            "Visionnage à votre rythme",
            "Suivi de progression",
            "Accès illimité pendant 12 mois",
            "Contenus mis à jour régulièrement"
        ],
        "note": "Ce produit ne comprend pas l'accès NetAcad, les sessions live, ni l'examen de certification."
    }
    
    # Insert courses
    await db.courses.insert_many(courses)
    
    # Insert video product
    await db.video_product.insert_one(video_product)
    
    return {"message": f"Seeded {len(courses)} courses and 1 video product"}
