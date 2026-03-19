import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  CheckCircle, 
  Clock, 
  BarChart, 
  Award, 
  Video, 
  Users,
  ShoppingCart,
  AlertCircle,
  ArrowLeft,
  Download,
  Loader2,
  Calendar,
  Coffee,
  Utensils,
  Globe,
  MapPin,
  BookOpen,
  Target,
  ArrowRight,
  Play,
  ChevronRight
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { generateCoursePDF } from '../utils/generatePDF';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Helper function to generate session dates
const generateSessions = (format) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const sessions = [];
  
  if (format === 'inclass') {
    const inClassMonths = [
      { month: 1, name: 'Février' },
      { month: 3, name: 'Avril' },
      { month: 6, name: 'Juillet' },
      { month: 9, name: 'Octobre' }
    ];
    
    for (let yearOffset = 0; yearOffset <= 1; yearOffset++) {
      const year = currentYear + yearOffset;
      inClassMonths.forEach(({ month, name }) => {
        const sessionDate = new Date(year, month, 1);
        const minDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        if (sessionDate >= minDate) {
          sessions.push({
            id: `inclass-${year}-${month}`,
            label: `${name} ${year}`,
            startDate: sessionDate,
            duration: '1 semaine (35h)',
            format: 'Présentiel intensif'
          });
        }
      });
    }
  } else {
    let startDate = new Date(now);
    startDate.setDate(startDate.getDate() + ((8 - startDate.getDay()) % 7) + 1);
    startDate.setDate(startDate.getDate() + 14);
    
    const referenceDate = new Date(2024, 0, 8);
    const weeksSinceReference = Math.floor((startDate - referenceDate) / (7 * 24 * 60 * 60 * 1000));
    const weeksIntoCurrentCycle = weeksSinceReference % 8;
    if (weeksIntoCurrentCycle > 0) {
      startDate.setDate(startDate.getDate() + (8 - weeksIntoCurrentCycle) * 7);
    }
    
    for (let i = 0; i < 6; i++) {
      const sessionStart = new Date(startDate);
      sessionStart.setDate(sessionStart.getDate() + (i * 8 * 7));
      
      const sessionEnd = new Date(sessionStart);
      sessionEnd.setDate(sessionEnd.getDate() + 27);
      
      const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      
      sessions.push({
        id: `online-${sessionStart.getFullYear()}-${sessionStart.getMonth()}-${sessionStart.getDate()}`,
        label: `${sessionStart.getDate()} ${monthNames[sessionStart.getMonth()]} - ${sessionEnd.getDate()} ${monthNames[sessionEnd.getMonth()]} ${sessionStart.getFullYear()}`,
        startDate: sessionStart,
        endDate: sessionEnd,
        duration: '4 semaines',
        format: 'En ligne'
      });
    }
  }
  
  return sessions;
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);
  
  const isInClassOnly = course?.id === 'unreal' || course?.id === 'extreme-ccna-bootcamp' || !course?.onlinePrice;
  const defaultFormat = isInClassOnly ? 'inclass' : 'online';
  const [selectedFormat, setSelectedFormat] = useState(defaultFormat);
  const [selectedSession, setSelectedSession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (course) {
      const inClassOnly = course.id === 'unreal' || course.id === 'extreme-ccna-bootcamp' || !course.onlinePrice;
      setSelectedFormat(inClassOnly ? 'inclass' : 'online');
    }
  }, [course]);

  const availableSessions = useMemo(() => {
    if (!course) return [];
    const inClassOnly = course.id === 'unreal' || course.id === 'extreme-ccna-bootcamp' || !course.onlinePrice;
    const format = inClassOnly ? 'inclass' : selectedFormat;
    return generateSessions(format);
  }, [selectedFormat, course]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (course && course.id === 'edge-computing') {
    return <Navigate to="/edge-computing" replace />;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Formation non trouvée</h1>
          <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Link to="/courses">Retour aux formations</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getCertificationLogo = () => {
    if (course.category === 'CCNA') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/r2zhdhc3_image.png';
    } else if (course.id === 'cyberops') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/djop92go_image.png';
    } else if (course.id === 'unreal') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/l0g1p6bm_image.png';
    }
    return null;
  };

  const certLogo = getCertificationLogo();
  const selectedSessionDetails = availableSessions.find(s => s.id === selectedSession);

  const handleCheckout = async () => {
    if (!selectedSession) {
      toast({
        title: "Session requise",
        description: "Veuillez sélectionner une session de formation.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const productId = `${courseId}_${selectedFormat === 'online' ? 'online' : 'inclass'}`;
    
    try {
      const response = await fetch(`${API_URL}/api/payments/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          origin_url: window.location.origin,
          session_date: selectedSessionDetails?.label || '',
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create checkout session');
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

  const currentFeatures = (selectedFormat === 'online' && course.features) 
    ? course.features 
    : (course.inClassFeatures || course.features || []);

  // Get accent color based on course category
  const getAccentColors = () => {
    if (course.category === 'CCNA') {
      return {
        primary: 'cyan',
        secondary: 'blue',
        badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        gradient: 'from-cyan-500 to-blue-500',
        text: 'text-cyan-400',
        bgGlow: 'bg-cyan-500/10'
      };
    } else if (course.id === 'cyberops') {
      return {
        primary: 'emerald',
        secondary: 'cyan',
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        gradient: 'from-emerald-500 to-cyan-500',
        text: 'text-emerald-400',
        bgGlow: 'bg-emerald-500/10'
      };
    } else if (course.id === 'unreal') {
      return {
        primary: 'purple',
        secondary: 'pink',
        badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        gradient: 'from-purple-500 to-pink-500',
        text: 'text-purple-400',
        bgGlow: 'bg-purple-500/10'
      };
    }
    return {
      primary: 'cyan',
      secondary: 'emerald',
      badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      gradient: 'from-cyan-500 to-emerald-500',
      text: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10'
    };
  };

  const colors = getAccentColors();

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${colors.bgGlow} rounded-full blur-3xl`}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800">
            <Link to="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux formations
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Course Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className={`${colors.badge} border px-4 py-1.5`}>
                  <Award className="w-4 h-4 mr-2" />
                  {course.category}
                </Badge>
                {course.certificationCost && (
                  <Badge className="bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 px-4 py-1.5">
                    <Award className="w-4 h-4 mr-2" />
                    Certification Cisco
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className={colors.text} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <BarChart className={colors.text} />
                  <span>Niveau: {course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Award className={colors.text} />
                  <span>Certification Cisco</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-bold px-8 py-6 text-lg shadow-lg`}
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  S'inscrire — {selectedFormat === 'online' ? course.onlinePrice : course.inClassPrice}€
                </Button>
                <Button 
                  onClick={() => {
                    try {
                      generateCoursePDF(course);
                      toast({
                        title: "Téléchargement en cours",
                        description: "Le programme PDF est en cours de téléchargement.",
                      });
                    } catch (error) {
                      toast({
                        title: "Erreur",
                        description: "Impossible de générer le PDF.",
                        variant: "destructive"
                      });
                    }
                  }}
                  variant="outline" 
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg"
                  data-testid="download-pdf-btn"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Programme PDF
                </Button>
              </div>
            </div>
            
            {/* Right Column - Certification Logo Card */}
            {certLogo && (
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-20 rounded-3xl blur-xl`}></div>
                <Card className="relative bg-[#111827]/80 backdrop-blur-xl border-gray-700/50 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <img 
                      src={certLogo} 
                      alt={`${course.category} Certification`}
                      className="w-40 h-40 object-contain mx-auto mb-6"
                    />
                    <h3 className="text-xl font-bold text-white mb-2">Certification Officielle</h3>
                    <p className="text-gray-400 mb-4">{course.category}</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Reconnue mondialement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Valeur professionnelle</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Format Selection Section */}
      <section className="py-16 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Format Selection */}
              {course.onlinePrice && course.inClassPrice && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className={`${colors.badge} border`}>
                      Choisissez votre format
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Online Option */}
                    <Card 
                      className={`bg-[#111827]/50 border-2 cursor-pointer transition-all ${
                        selectedFormat === 'online' 
                          ? 'border-cyan-500/50 bg-cyan-500/5' 
                          : 'border-gray-700/50 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedFormat('online')}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedFormat === 'online' ? 'bg-cyan-500/20' : 'bg-gray-700/50'
                            }`}>
                              <Globe className={selectedFormat === 'online' ? 'text-cyan-400' : 'text-gray-400'} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">En Ligne</h3>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedFormat === 'online' ? 'border-cyan-500 bg-cyan-500' : 'border-gray-600'
                          }`}>
                            {selectedFormat === 'online' && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-[#d4af37] mb-2">{course.onlinePrice}€</div>
                        <p className="text-sm text-gray-400">Formation flexible à distance avec sessions live hebdomadaires</p>
                      </CardContent>
                    </Card>
                    
                    {/* In-Class Option */}
                    <Card 
                      className={`bg-[#111827]/50 border-2 cursor-pointer transition-all ${
                        selectedFormat === 'inclass' 
                          ? 'border-emerald-500/50 bg-emerald-500/5' 
                          : 'border-gray-700/50 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedFormat('inclass')}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedFormat === 'inclass' ? 'bg-emerald-500/20' : 'bg-gray-700/50'
                            }`}>
                              <MapPin className={selectedFormat === 'inclass' ? 'text-emerald-400' : 'text-gray-400'} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Présentiel</h3>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedFormat === 'inclass' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-600'
                          }`}>
                            {selectedFormat === 'inclass' && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-[#d4af37] mb-2">{course.inClassPrice}€</div>
                        <p className="text-sm text-gray-400">Formation intensive sur site à Loudun</p>
                        
                        {/* Meals included */}
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-700/50">
                          <div className="flex items-center gap-1 text-emerald-400 text-xs">
                            <Coffee className="w-3 h-3" />
                            <span>Petit-déj</span>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-400 text-xs">
                            <Utensils className="w-3 h-3" />
                            <span>Déjeuner</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* In-class only courses */}
              {(!course.onlinePrice || course.id === 'unreal' || course.id === 'extreme-ccna-bootcamp') && (
                <Card className="bg-[#111827]/50 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <MapPin className="text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Formation Présentiel</h3>
                      </div>
                      <div className="text-3xl font-bold text-[#d4af37]">{course.inClassPrice}€</div>
                    </div>
                    <p className="text-gray-400 mb-4">
                      {course.id === 'extreme-ccna-bootcamp' 
                        ? 'Formation intensive avec 75 labs pratiques sur Packet Tracer.'
                        : 'Formation intensive en présentiel avec équipements professionnels.'}
                    </p>
                    
                    <div className="flex items-center gap-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <Coffee className="w-4 h-4" />
                        <span>Petit-déjeuner inclus</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <Utensils className="w-4 h-4" />
                        <span>Déjeuner inclus</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>2 venelle des Amandiers, 86200 Loudun, France</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* What's Included */}
              {currentFeatures && currentFeatures.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className={`${colors.badge} border`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ce qui est inclus
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-[#111827]/50 rounded-xl border border-gray-700/30">
                        <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Objectives */}
              {course.objectives && course.objectives.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className={`${colors.badge} border`}>
                      <Target className="w-4 h-4 mr-2" />
                      Objectifs de la formation
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {course.objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-[#1e293b]/50 rounded-xl border border-gray-700/30">
                        <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <span className="text-gray-300">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Gallery - Unreal Engine */}
              {course.id === 'unreal' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      <Video className="w-4 h-4 mr-2" />
                      Découvrez Unreal Engine
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 mb-6">
                    Explorez les possibilités infinies d'Unreal Engine à travers ces démonstrations impressionnantes.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Featured Video */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-purple-500 text-white text-xs">FEATURED</Badge>
                        <span className="text-sm text-gray-400">Chopard Metaverse Experience</span>
                      </div>
                      <div className="aspect-video rounded-xl overflow-hidden border border-purple-500/30">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/o9SYdnpmV8Y"
                          title="Chopard Metaverse - Unreal Engine"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                    
                    {/* Secondary Video */}
                    <div className="aspect-video rounded-xl overflow-hidden border border-gray-700/50">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/nWb2Ht7jbrE"
                        title="Unreal Engine Demo 1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    
                    {/* Grid of additional videos */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="aspect-video rounded-xl overflow-hidden border border-gray-700/50">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/7NonJwSJi_U"
                          title="Unreal Engine Demo 2"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      <div className="aspect-video rounded-xl overflow-hidden border border-gray-700/50">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/2rMkr4wh1Ls"
                          title="Unreal Engine Demo 3"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Certification Info */}
              {course.certificationCost && (
                <Card className="bg-gradient-to-br from-[#d4af37]/10 to-amber-500/5 border-2 border-[#d4af37]/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#d4af37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-7 h-7 text-[#d4af37]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Certification Cisco</h3>
                        <p className="text-gray-400 mb-4">
                          À l'issue de cette formation, vous pouvez passer l'examen de certification officiel Cisco.
                        </p>
                        <div className="flex items-center justify-between p-4 bg-[#0a0f1a]/50 rounded-lg">
                          <div>
                            <span className="text-gray-400 text-sm">Examen officiel Cisco</span>
                            <div className="text-2xl font-bold text-[#d4af37]">{course.certificationCost}€</div>
                          </div>
                          <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold">
                            <Link to="/certification" data-testid="buy-certification-btn">
                              <Award className="w-4 h-4 mr-2" />
                              Acheter l'examen
                            </Link>
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          Passé en centre agréé PearsonVUE (non inclus dans le prix de la formation)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Inscription Card */}
            <div className="lg:col-span-1" id="inscription">
              <div className="sticky top-28">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-20 rounded-3xl blur-xl`}></div>
                  <Card className="relative bg-[#111827]/80 backdrop-blur-xl border-gray-700/50 rounded-3xl overflow-hidden">
                    <CardHeader className={`bg-gradient-to-r ${colors.gradient} text-white`}>
                      <CardTitle className="text-2xl">Inscription</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Prix de la formation</div>
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-400">
                          {course.id === 'unreal' 
                            ? `${course.inClassPrice}€`
                            : `${selectedFormat === 'online' ? course.onlinePrice : course.inClassPrice}€`
                          }
                        </div>
                        {course.id !== 'unreal' && course.onlinePrice && course.inClassPrice && (
                          <div className="text-sm text-gray-400 mt-1">
                            Format {selectedFormat === 'online' ? 'en ligne' : 'présentiel'}
                          </div>
                        )}
                      </div>

                      {/* Session Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Calendar className={colors.text} />
                          Sélectionnez votre session
                        </label>
                        <Select 
                          value={selectedSession} 
                          onValueChange={setSelectedSession}
                          data-testid="session-selector"
                        >
                          <SelectTrigger className="w-full bg-[#1e293b] border-gray-600 text-white focus:border-cyan-500" data-testid="session-selector-trigger">
                            <SelectValue placeholder="Choisir une date de début" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1e293b] border-gray-600">
                            {availableSessions.map((session) => (
                              <SelectItem 
                                key={session.id} 
                                value={session.id}
                                className="text-gray-300 focus:bg-cyan-500/20 focus:text-white"
                                data-testid={`session-option-${session.id}`}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">{session.label}</span>
                                  <span className="text-xs text-gray-500">{session.duration} • {session.format}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {selectedSession && selectedSessionDetails && (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mt-2">
                            <div className="flex items-center gap-2 text-emerald-400">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Session sélectionnée</span>
                            </div>
                            <p className="text-sm text-emerald-300 mt-1">
                              {selectedSessionDetails.label}
                            </p>
                          </div>
                        )}
                        
                        {!selectedSession && (
                          <p className="text-xs text-amber-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Veuillez sélectionner une session pour continuer
                          </p>
                        )}
                      </div>

                      <Button 
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-bold py-6 text-lg`}
                        data-testid="checkout-btn"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Redirection...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            S'inscrire maintenant
                          </>
                        )}
                      </Button>

                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-gray-300">
                            <strong className="block mb-1 text-white">Options de financement</strong>
                            OPCO, employeur et financement personnel disponibles.
                            <Link to="/funding" className="text-cyan-400 hover:text-cyan-300 block mt-2">
                              En savoir plus →
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-4 space-y-3 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>Places limitées</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>Démarrage rapide</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>Certification reconnue</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 bg-[#0a0f1a] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className={colors.text} />
              <span>2 venelle des Amandiers, 86200 Loudun, France</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={colors.text}>✉</span>
              <a href="mailto:contact@saint-georges.academy" className={`hover:${colors.text}`}>contact@saint-georges.academy</a>
            </div>
            <div className="flex items-center gap-2">
              <span className={colors.text}>☎</span>
              <span>+33 (0)5 49 22 75 10</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
