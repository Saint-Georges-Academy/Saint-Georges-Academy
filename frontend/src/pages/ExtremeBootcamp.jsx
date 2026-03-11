import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Award, 
  Users,
  BookOpen,
  Target,
  Layers,
  Shield,
  Server,
  Wifi,
  Globe,
  FileText,
  GraduationCap,
  Accessibility,
  BarChart,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Download,
  Coffee,
  Utensils,
  Calendar,
  AlertCircle,
  ChevronRight,
  Monitor,
  Network,
  Lock,
  Zap
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ExtremeBootcamp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [includeExam, setIncludeExam] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/payments/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: 'extreme-ccna-bootcamp_inclass',
          origin_url: window.location.origin,
          include_certification: includeExam
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      window.location.href = url;
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de procéder au paiement. Veuillez réessayer.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Program modules data
  const modules = [
    {
      number: 1,
      title: "Configuration & Sécurisation des Équipements",
      topics: [
        "User levels",
        "Hostname",
        "Password encryption",
        "SSH",
        "Gestion des configurations",
        "Sauvegarde running-config",
        "Paramétrage IP"
      ]
    },
    {
      number: 2,
      title: "Switching Avancé",
      topics: [
        "VLAN",
        "Trunk 802.1Q",
        "VTP",
        "Native VLAN",
        "Inter-VLAN Routing",
        "Multilayer switching",
        "EtherChannel (LACP / PAgP)",
        "STP sécurisation",
        "DHCP Snooping",
        "Dynamic ARP Inspection",
        "IP Source Guard",
        "Port Security"
      ]
    },
    {
      number: 3,
      title: "Routage Entreprise",
      topics: [
        "Static & Default Routing",
        "RIP",
        "EIGRP",
        "OSPF",
        "Introduction BGP",
        "ACL Standard & Extended",
        "NAT statique / dynamique / PAT",
        "HSRP",
        "IPv6",
        "Inter-VLAN IPv6"
      ]
    },
    {
      number: 4,
      title: "WAN, VoIP & VPN",
      topics: [
        "Wireless AP configuration",
        "Voice VLAN",
        "IP Phone configuration",
        "Dial Peering",
        "PPP CHAP",
        "GRE Tunnel",
        "Site-to-Site IPSec VPN"
      ]
    },
    {
      number: 5,
      title: "Cisco ASA Firewall",
      topics: [
        "Configuration initiale ASA",
        "Security Levels",
        "NAT & Network Objects",
        "ACL Firewall",
        "Inspection Policies",
        "OSPF sur ASA",
        "IPv6 Firewall"
      ]
    }
  ];

  // Professional objectives
  const objectives = [
    "Configurer routeurs et switches Cisco",
    "Mettre en place VLAN et routage inter-VLAN",
    "Configurer OSPF, EIGRP, RIP",
    "Mettre en œuvre ACL standard et étendues",
    "Configurer NAT (statique, dynamique, PAT)",
    "Déployer IPv6 (SLAAC, DHCPv6)",
    "Mettre en place HSRP",
    "Configurer ASA Firewall (ACL, NAT, inspection)",
    "Déployer VPN GRE et IPSec",
    "Configurer VoIP et Voice VLAN",
    "Mettre en place WLAN entreprise",
    "Sécuriser l'infrastructure réseau"
  ];

  // Prerequisites
  const prerequisites = [
    "Connaissance du modèle OSI",
    "Bases IPv4",
    "CLI recommandée",
    "Niveau CCNA1 conseillé"
  ];

  // Technical means
  const technicalMeans = [
    { icon: Server, text: "Routeurs Cisco" },
    { icon: Network, text: "Switches L2 & L3" },
    { icon: Shield, text: "Cisco ASA Firewall" },
    { icon: Monitor, text: "Packet Tracer" },
    { icon: Lock, text: "Plateforme pédagogique sécurisée" }
  ];

  // Performance indicators
  const indicators = [
    { label: "Taux de satisfaction", value: "98%", description: "Moyenne 2024" },
    { label: "Taux de réussite", value: "95%", description: "Validation des compétences" },
    { label: "Taux de passage certification", value: "85%", description: "Examen Cisco" },
    { label: "Taux d'insertion professionnelle", value: "92%", description: "À 6 mois" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3a5f] to-[#0f1f3d] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-sm px-4 py-1">
                  <Zap className="w-4 h-4 mr-1" />
                  Formation Intensive
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white">
                  Cisco Networking Academy
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                EXTREME CCNA<br />
                <span className="text-[#d4af37]">BOOT CAMP</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Formation présentielle intensive de 35 heures, orientée pratique avec 75+ laboratoires, 
                destinée à former des professionnels capables de configurer et sécuriser des 
                infrastructures Cisco en environnement entreprise.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <span>35 heures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#d4af37]" />
                  <span>75+ Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  <span>Présentiel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#d4af37]" />
                  <span>Certification</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/r2zhdhc3_image.png"
                  alt="Cisco CCNA Certification"
                  className="h-20 w-auto"
                />
                <div>
                  <p className="text-sm text-gray-400">Délivré par</p>
                  <p className="font-semibold">Saint-Georges Academy</p>
                  <p className="text-sm text-[#d4af37]">Cisco Networking Academy officielle</p>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="lg:justify-self-end">
              <Card className="bg-white text-[#0f1f3d] shadow-2xl border-0 w-full max-w-md">
                <CardHeader className="text-center border-b pb-6">
                  <p className="text-sm text-gray-500 mb-2">Prix de la formation</p>
                  <div className="text-5xl font-bold text-[#d4af37]">3 290 €</div>
                  <p className="text-gray-600 mt-2">Formation présentielle - 35 heures</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>75+ laboratoires pratiques</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Accès Cisco NetAcad inclus</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Équipements Cisco réels</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Formateur certifié Cisco</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Coffee className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Petit-déjeuner continental inclus</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Utensils className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Déjeuner inclus</span>
                    </div>
                  </div>
                  
                  {/* Exam option */}
                  <div className="border-t pt-4 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={includeExam}
                        onChange={(e) => setIncludeExam(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#d4af37] focus:ring-[#d4af37]"
                      />
                      <div className="flex-1">
                        <span className="font-medium">Ajouter examen Cisco</span>
                        <span className="text-[#d4af37] font-bold ml-2">+ 630 €</span>
                      </div>
                    </label>
                    <p className="text-xs text-gray-500 ml-8">Voucher PearsonVUE - CCNA 200-301</p>
                  </div>
                  
                  {/* Total */}
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-3xl font-bold text-[#0f1f3d]">
                      {includeExam ? '3 920' : '3 290'} €
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold py-6 text-lg"
                    data-testid="bootcamp-checkout-btn"
                  >
                    {isLoading ? 'Chargement...' : "S'inscrire maintenant"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    Paiement sécurisé par Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section Navigation */}
        <nav className="mb-12 sticky top-24 bg-white/95 backdrop-blur-sm z-40 py-4 -mx-4 px-4 border-b">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: "#objectifs", label: "Objectifs" },
              { href: "#programme", label: "Programme" },
              { href: "#modalites", label: "Modalités" },
              { href: "#prerequis", label: "Prérequis" },
              { href: "#certification", label: "Certification" },
              { href: "#moyens", label: "Moyens" },
              { href: "#evaluation", label: "Évaluation" },
              { href: "#accessibilite", label: "Accessibilité" },
              { href: "#indicateurs", label: "Indicateurs" }
            ].map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0f1f3d] hover:bg-gray-100 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Objectifs professionnels */}
        <section id="objectifs" className="mb-16 scroll-mt-32">
          <Card className="border-2 border-[#0f1f3d]">
            <CardHeader className="bg-[#0f1f3d] text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="w-7 h-7 text-[#d4af37]" />
                Objectifs Professionnels
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-gray-600 mb-6">
                À l'issue de la formation, le stagiaire sera capable de :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Programme détaillé */}
        <section id="programme" className="mb-16 scroll-mt-32">
          <Card>
            <CardHeader className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5f] text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BookOpen className="w-7 h-7 text-[#d4af37]" />
                Programme Détaillé
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {modules.map((module) => (
                  <AccordionItem key={module.number} value={`module-${module.number}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 bg-[#d4af37] text-[#0f1f3d] rounded-lg flex items-center justify-center font-bold">
                          {module.number}
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">Module {module.number}</span>
                          <h3 className="font-semibold text-[#0f1f3d]">{module.title}</h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-14 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {module.topics.map((topic, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {/* Projet final */}
              <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-t-2 border-[#d4af37]">
                <h4 className="font-bold text-[#0f1f3d] mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#d4af37]" />
                  Projet Final Intégrateur
                </h4>
                <p className="text-gray-700 mb-4">
                  Déploiement d'une architecture complète multi-sites incluant :
                </p>
                <div className="flex flex-wrap gap-2">
                  {['VLAN', 'OSPF', 'NAT', 'ASA Firewall', 'VPN', 'IPv6', 'VoIP'].map((item) => (
                    <Badge key={item} variant="outline" className="border-[#d4af37] text-[#0f1f3d]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Modalités pédagogiques */}
        <section id="modalites" className="mb-16 scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
                <Layers className="w-7 h-7 text-[#d4af37]" />
                Modalités Pédagogiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">80%</div>
                  <p className="text-gray-700 font-medium">Pratique</p>
                  <p className="text-sm text-gray-500">Labs & exercices</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">20%</div>
                  <p className="text-gray-700 font-medium">Théorie</p>
                  <p className="text-sm text-gray-500">Concepts & méthodologie</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-600 mb-2">75+</div>
                  <p className="text-gray-700 font-medium">Laboratoires</p>
                  <p className="text-sm text-gray-500">Packet Tracer & réel</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <div className="text-4xl font-bold text-amber-600 mb-2">1:8</div>
                  <p className="text-gray-700 font-medium">Encadrement</p>
                  <p className="text-sm text-gray-500">Formateur dédié</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-[#0f1f3d] mb-4">Plateau technique Cisco</h4>
                <p className="text-gray-600">
                  Formation dispensée sur plateau technique équipé de matériel Cisco professionnel : 
                  routeurs, switches L2/L3, ASA Firewall. Chaque stagiaire dispose d'un poste de travail 
                  individuel avec accès à Packet Tracer et aux équipements réseau.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Prérequis */}
        <section id="prerequis" className="mb-16 scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
                <AlertCircle className="w-7 h-7 text-[#d4af37]" />
                Prérequis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-[#0f1f3d] mb-4">Connaissances requises</h4>
                  <ul className="space-y-3">
                    {prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Entretien de positionnement
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Un entretien de positionnement est réalisé avant l'entrée en formation afin de 
                    valider les prérequis et adapter le parcours aux besoins du stagiaire.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Certification */}
        <section id="certification" className="mb-16 scroll-mt-32">
          <Card className="border-2 border-[#d4af37]">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
                <GraduationCap className="w-7 h-7 text-[#d4af37]" />
                Certification & Accès NetAcad
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-[#0f1f3d] mb-4">À l'issue de la formation</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Certificat de participation</strong> délivré par Saint-Georges Academy
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        La certification officielle Cisco (PearsonVUE) <strong>n'est pas incluse</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Option examen Cisco :</strong> 630 € (voucher PearsonVUE)
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                  <h4 className="font-semibold text-[#0f1f3d] mb-4">Accès Cisco NetAcad inclus</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    L'accès à la plateforme NetAcad est inclus selon votre niveau :
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-gray-700">
                      <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                      Aucun module obtenu → accès <strong>CCNA1</strong>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                      CCNA1 validé → accès <strong>CCNA2</strong>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                      CCNA2 validé → accès <strong>CCNA3</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Moyens techniques */}
        <section id="moyens" className="mb-16 scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
                <Server className="w-7 h-7 text-[#d4af37]" />
                Moyens Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-6">
                {technicalMeans.map((item, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                    <item.icon className="w-10 h-10 text-[#0f1f3d] mx-auto mb-3" />
                    <p className="font-medium text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Modalités d'évaluation */}
        <section id="evaluation" className="mb-16 scroll-mt-32">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
                <FileText className="w-7 h-7 text-[#d4af37]" />
                Modalités d'Évaluation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { title: "Évaluation continue", desc: "Tout au long de la formation" },
                  { title: "Grille de compétences", desc: "Validation des acquis" },
                  { title: "Projet final", desc: "Mise en situation réelle" },
                  { title: "Attestation", desc: "Fin de formation" }
                ].map((item, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl text-center">
                    <div className="w-12 h-12 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accessibilité Handicap */}
        <section id="accessibilite" className="mb-16 scroll-mt-32">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
                <Accessibility className="w-7 h-7 text-blue-500" />
                Accessibilité Handicap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Saint-Georges Academy s'engage à adapter la formation aux personnes en situation de handicap 
                après étude des besoins spécifiques.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">
                  Référent Handicap : M. Krešimir Penavić
                </p>
                <p className="text-blue-700 text-sm">
                  Contact : <a href="mailto:handicap@saint-georges.academy" className="underline">handicap@saint-georges.academy</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Indicateurs de performance */}
        <section id="indicateurs" className="mb-16 scroll-mt-32">
          <Card>
            <CardHeader className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5f] text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BarChart className="w-7 h-7 text-[#d4af37]" />
                Indicateurs de Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                {indicators.map((indicator, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-4xl font-bold text-[#d4af37] mb-2">{indicator.value}</div>
                    <p className="font-medium text-[#0f1f3d]">{indicator.label}</p>
                    <p className="text-sm text-gray-500">{indicator.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-6">
                * Données issues des sessions 2024. Mise à jour annuelle.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Éléments réglementaires */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
                <FileText className="w-7 h-7 text-[#d4af37]" />
                Informations Réglementaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/mentions-legales" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                  <FileText className="w-6 h-6 text-[#0f1f3d] mx-auto mb-2" />
                  <span className="text-sm font-medium text-[#0f1f3d]">Mentions Légales</span>
                </Link>
                <Link to="/cgv" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                  <FileText className="w-6 h-6 text-[#0f1f3d] mx-auto mb-2" />
                  <span className="text-sm font-medium text-[#0f1f3d]">CGV</span>
                </Link>
                <Link to="/rgpd" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                  <Shield className="w-6 h-6 text-[#0f1f3d] mx-auto mb-2" />
                  <span className="text-sm font-medium text-[#0f1f3d]">Politique RGPD</span>
                </Link>
                <Link to="/inscription" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                  <Users className="w-6 h-6 text-[#0f1f3d] mx-auto mb-2" />
                  <span className="text-sm font-medium text-[#0f1f3d]">Procédure d'inscription</span>
                </Link>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Modalités de rétractation :</strong> Conformément à l'article L221-18 du Code de la consommation, 
                  vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation. 
                  Voir nos <Link to="/cgv" className="underline">Conditions Générales de Vente</Link> pour plus de détails.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <Card className="bg-[#0f1f3d] text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Contact Administratif</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#d4af37]" />
                      <span>2 venelle des Amandiers, 86200 Loudun, France</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#d4af37]" />
                      <span>+33 (0)5 49 22 75 10</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#d4af37]" />
                      <a href="mailto:contact@saint-georges.academy" className="hover:text-[#d4af37]">
                        contact@saint-georges.academy
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-2">SIRET : 528 616 113 00023</p>
                  <p className="text-gray-400 text-sm">N° Déclaration d'activité : En cours</p>
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp"
                    alt="Saint-Georges Academy"
                    className="h-20 w-auto ml-auto mt-4 bg-white rounded-lg p-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Final */}
        <section className="text-center py-12 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-[#0f1f3d] mb-4">
            Prêt à devenir expert Cisco ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez notre prochaine session Extreme CCNA Boot Camp et maîtrisez les technologies 
            réseau Cisco en seulement une semaine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleCheckout}
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-8 py-6 text-lg"
            >
              S'inscrire – 3 290 €
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button asChild variant="outline" className="border-[#0f1f3d] text-[#0f1f3d] px-8 py-6 text-lg">
              <Link to="/contact">
                <Phone className="mr-2 w-5 h-5" />
                Nous contacter
              </Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ExtremeBootcamp;
