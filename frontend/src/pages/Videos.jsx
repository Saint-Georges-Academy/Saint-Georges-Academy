import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { 
  CheckCircle, 
  Video, 
  Clock, 
  TrendingUp, 
  Play,
  ShoppingCart,
  AlertCircle,
  Shield,
  Monitor,
  Lock,
  Wifi,
  Server,
  Globe,
  Settings,
  Zap,
  ArrowRight,
  Loader2,
  LogIn
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Videos = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  };

  // Module data with all 75 videos
  const modules = [
    {
      number: 1,
      title: "Basic Configurations",
      icon: Settings,
      color: "blue",
      videos: [
        "Navigating User Levels",
        "Hostname Configuration",
        "Banner MOTD Message",
        "Enable Password",
        "Console Line Password",
        "VTY Line Password",
        "Exec Timeout",
        "Logging Synchronous",
        "Disabling IP Domain Lookup",
        "IP Domain Name",
        "Username and Password Creation",
        "Encrypting All Passwords",
        "Setting System Clock",
        "Setting Management IP Address (Switch)",
        "Preventing Brute-Force Attacks",
        "Viewing Running & Startup Configurations",
        "Saving Running Configuration to Startup"
      ]
    },
    {
      number: 2,
      title: "Switching Technologies",
      icon: Zap,
      color: "purple",
      videos: [
        "VLAN Fundamentals",
        "VLAN Trunking Protocol (VTP)",
        "Trunk Allowed / Denied VLANs",
        "Configuring Native VLAN",
        "Remote Access – Telnet",
        "Remote Access – SSH",
        "Layer 2 EtherChannel (PAgP / LACP)",
        "Layer 3 EtherChannel (On Mode)",
        "Securing Unused Switch Ports",
        "Disabling CDP on Devices",
        "STP Attack Prevention",
        "VLAN Hopping Attack Prevention",
        "DHCP Snooping",
        "Dynamic ARP Inspection",
        "IP Source Guard",
        "Port Security",
        "ACL for VTY Interfaces"
      ]
    },
    {
      number: 3,
      title: "Routing Technologies",
      icon: Globe,
      color: "green",
      videos: [
        "Understanding Multilayer Switching",
        "Connecting Multiple Networks",
        "Remote Access – Telnet & SSH on Routers",
        "Inter-VLAN Routing (Router & L3 Switch)",
        "DHCP Server Configuration (Router & L3 Switch)",
        "Inter-VLAN + DHCP Integration",
        "DHCP, DNS, Web, Email & FTP Services",
        "DHCP Relay Agent",
        "Static, Floating & Default Routing",
        "RIP, EIGRP, OSPF & BGP Overview",
        "Standard & Extended ACLs",
        "ACL for Remote VTY Access",
        "NAT – Static, Dynamic & PAT",
        "HSRP Configuration",
        "IPv6 Fundamentals",
        "IPv6 DHCPv6 Server & SLAAC",
        "IPv6 Inter-VLAN Routing"
      ]
    },
    {
      number: 4,
      title: "WLAN & VoIP Technologies",
      icon: Wifi,
      color: "amber",
      videos: [
        "Wireless Access Point Configuration",
        "Wireless LAN Controller (WLC)",
        "VoIP Device Selection",
        "VoIP DHCP Configuration",
        "IP Phone Configuration",
        "Voice VLAN Configuration",
        "Routing for VoIP – Dial Peering",
        "RIPng (RIP for IPv6)",
        "EIGRP for IPv6",
        "OSPFv3",
        "BGP for IPv6",
        "WAN PPP – CHAP",
        "WAN GRE VPN",
        "WAN Site-to-Site IPSec VPN",
        "Enterprise Voice Architecture Design",
        "VoIP Troubleshooting"
      ]
    },
    {
      number: 5,
      title: "Cisco ASA Firewall Configurations",
      icon: Shield,
      color: "red",
      videos: [
        "Basic ASA Firewall Configuration",
        "Interface Security Levels",
        "Firewall DHCP Setup",
        "Firewall Routing – Static & OSPF",
        "Firewall AAA & SSH Setup",
        "NAT & Network Objects Configuration",
        "Inspection Policy & ACL Configuration",
        "IPv6 on Cisco ASA"
      ]
    }
  ];

  const totalVideos = modules.reduce((acc, module) => acc + module.videos.length, 0);

  const handlePurchase = async () => {
    // Check if user is logged in first
    if (!isLoggedIn()) {
      toast({
        title: "Connexion requise",
        description: "Veuillez créer un compte ou vous connecter pour acheter les vidéos.",
        variant: "destructive"
      });
      // Store the return URL to redirect back after login
      localStorage.setItem('checkout_return_url', '/videos');
      // Redirect to auth page
      navigate('/auth?redirect=checkout');
      return;
    }
    
    setIsLoading(true);
    
    // Get user info from localStorage
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    
    try {
      const response = await fetch(`${API_URL}/api/payments/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          product_id: 'ccna_videos',
          origin_url: window.location.origin,
          customer_email: userEmail,
          customer_name: userName,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create checkout session');
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de procéder au paiement. Veuillez réessayer.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const getModuleColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', accent: 'bg-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', accent: 'bg-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', accent: 'bg-green-600' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', accent: 'bg-amber-600' },
      red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', accent: 'bg-red-600' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3a5f] to-[#0f1f3d] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-sm px-4 py-1">
                  <Video className="w-4 h-4 mr-1" />
                  Produit Autonome
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white">
                  Préparation CCNA
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                75 Vidéos de<br />
                <span className="text-[#d4af37]">Préparation CCNA</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Collection complète de {totalVideos} vidéos techniques couvrant tous les sujets CCNA. 
                Organisées en 5 modules progressifs, du niveau débutant à avancé.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#d4af37]" />
                  <span>{totalVideos} vidéos HD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <span>~40h de contenu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-[#d4af37]" />
                  <span>Streaming illimité</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#d4af37]" />
                  <span>Accès sécurisé</span>
                </div>
              </div>
              
              {/* Module summary */}
              <div className="grid grid-cols-5 gap-2">
                {modules.map((module) => {
                  const colors = getModuleColorClasses(module.color);
                  return (
                    <div key={module.number} className={`${colors.bg} rounded-lg p-3 text-center`}>
                      <div className={`${colors.text} font-bold text-lg`}>{module.videos.length}</div>
                      <div className={`${colors.text} text-xs`}>M{module.number}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="lg:justify-self-end">
              <Card className="bg-white text-[#0f1f3d] shadow-2xl border-0 w-full max-w-md">
                <CardHeader className="text-center border-b pb-6">
                  <p className="text-sm text-gray-500 mb-2">Accès complet</p>
                  <div className="text-5xl font-bold text-[#d4af37]">150 €</div>
                  <p className="text-gray-600 mt-2">Paiement unique • Accès 12 mois</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{totalVideos} vidéos techniques complètes</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>5 modules progressifs</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Streaming HD illimité</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Portail étudiant sécurisé</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Suivi de progression</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Mises à jour incluses</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold py-6 text-lg"
                    data-testid="videos-checkout-btn"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <ShoppingCart className="w-5 h-5 mr-2" />
                    )}
                    Accéder aux 75 Vidéos – 150 €
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    Paiement sécurisé par Stripe • Accès immédiat
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Module Navigation */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#0f1f3d] text-center mb-8">
            5 Modules Techniques • {totalVideos} Vidéos
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {modules.map((module) => {
              const colors = getModuleColorClasses(module.color);
              return (
                <a 
                  key={module.number}
                  href={`#module-${module.number}`}
                  className={`${colors.bg} ${colors.text} ${colors.border} border rounded-lg px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2`}
                >
                  <module.icon className="w-4 h-4" />
                  Module {module.number}
                  <Badge variant="secondary" className="ml-1">{module.videos.length}</Badge>
                </a>
              );
            })}
          </div>
        </div>

        {/* Modules Detail */}
        <div className="space-y-8 mb-16">
          {modules.map((module) => {
            const colors = getModuleColorClasses(module.color);
            return (
              <Card key={module.number} id={`module-${module.number}`} className="scroll-mt-32 overflow-hidden">
                <CardHeader className={`${colors.accent} text-white`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <module.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-white/70 text-sm">Module {module.number}</span>
                        <h3 className="font-bold">{module.title}</h3>
                      </div>
                    </CardTitle>
                    <Badge className="bg-white/20 text-white hover:bg-white/30 text-lg px-4 py-1">
                      {module.videos.length} vidéos
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {module.videos.map((video, index) => (
                      <div 
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg ${colors.bg} ${colors.border} border transition-all hover:shadow-md`}
                      >
                        <div className={`w-8 h-8 ${colors.accent} text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{video}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Access Model */}
        <Card className="mb-16 border-2 border-[#0f1f3d]">
          <CardHeader className="bg-[#0f1f3d] text-white">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Lock className="w-7 h-7 text-[#d4af37]" />
              Modèle d'Accès
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-[#0f1f3d] mb-1">Prix</h4>
                <p className="text-2xl font-bold text-[#d4af37]">150 €</p>
                <p className="text-sm text-gray-500">Paiement unique</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  <Monitor className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-[#0f1f3d] mb-1">Accès</h4>
                <p className="text-gray-600">Portail étudiant</p>
                <p className="text-sm text-gray-500">Sécurisé</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  <Play className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-[#0f1f3d] mb-1">Streaming</h4>
                <p className="text-gray-600">Illimité</p>
                <p className="text-sm text-gray-500">Pas de téléchargement</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-[#0f1f3d] mb-1">Durée</h4>
                <p className="text-gray-600">12 mois</p>
                <p className="text-sm text-gray-500">À partir de l'achat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Note */}
        <Card className="mb-16 border-2 border-orange-300 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-orange-900 mb-2 text-lg">Important à noter</h3>
                <p className="text-orange-800 mb-3">
                  Ce produit ne comprend pas l'accès à la plateforme Cisco NetAcad, les sessions live avec un instructeur, 
                  ni l'examen de certification officiel.
                </p>
                <p className="text-orange-800">
                  Pour un parcours certifiant complet avec accès NetAcad, encadrement formateur et sessions live, 
                  consultez nos{' '}
                  <Link to="/courses?filter=CCNA" className="underline font-semibold hover:text-orange-900">
                    formations CCNA complètes
                  </Link>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Final */}
        <section className="text-center py-12 bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5f] rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à maîtriser les technologies Cisco ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Accédez immédiatement à {totalVideos} vidéos de formation technique et commencez 
            votre préparation à la certification CCNA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handlePurchase}
              disabled={isLoading}
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-8 py-6 text-lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <ShoppingCart className="w-5 h-5 mr-2" />
              )}
              Accéder aux 75 Vidéos – 150 €
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              <Link to="/courses?filter=CCNA">
                Voir les formations CCNA complètes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Videos;
