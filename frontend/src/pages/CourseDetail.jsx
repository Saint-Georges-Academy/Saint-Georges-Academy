import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  FileText,
  Loader2,
  Calendar,
  Coffee,
  Utensils,
  Play,
  Youtube
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { generateCoursePDF } from '../utils/generatePDF';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Unreal Engine course videos
const unrealVideos = [
  {
    id: 1,
    title: "Blueprint Visual Scripting",
    url: "https://www.youtube.com/watch?v=7NonJwSJi_U",
    embedId: "7NonJwSJi_U",
    description: "Apprenez la programmation visuelle avec les Blueprints"
  },
  {
    id: 2,
    title: "Création d'Environnements 3D",
    url: "https://www.youtube.com/watch?v=nWb2Ht7jbrE",
    embedId: "nWb2Ht7jbrE",
    description: "Techniques de création d'environnements immersifs"
  },
  {
    id: 3,
    title: "Introduction à Unreal Engine 5",
    url: "https://www.youtube.com/watch?v=2rMkr4wh1Ls",
    embedId: "2rMkr4wh1Ls",
    description: "Découvrez les bases d'Unreal Engine 5 et son interface"
  }
];

// Helper function to generate session dates
const generateSessions = (format) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const sessions = [];
  
  if (format === 'inclass') {
    // In-class sessions: October, February, April, July
    const inClassMonths = [
      { month: 1, name: 'Février' },    // February
      { month: 3, name: 'Avril' },      // April
      { month: 6, name: 'Juillet' },    // July
      { month: 9, name: 'Octobre' }     // October
    ];
    
    // Generate sessions for current and next year
    for (let yearOffset = 0; yearOffset <= 1; yearOffset++) {
      const year = currentYear + yearOffset;
      inClassMonths.forEach(({ month, name }) => {
        const sessionDate = new Date(year, month, 1);
        // Only show future sessions (at least 2 weeks from now)
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
    // Online sessions: Every 8 weeks (4 weeks course + 4 weeks break)
    // Start from next available Monday
    let startDate = new Date(now);
    startDate.setDate(startDate.getDate() + ((8 - startDate.getDay()) % 7) + 1); // Next Monday
    
    // Add 2 weeks buffer for registration
    startDate.setDate(startDate.getDate() + 14);
    
    // Align to 8-week cycle
    const referenceDate = new Date(2024, 0, 8); // First Monday of 2024
    const weeksSinceReference = Math.floor((startDate - referenceDate) / (7 * 24 * 60 * 60 * 1000));
    const weeksIntoCurrentCycle = weeksSinceReference % 8;
    if (weeksIntoCurrentCycle > 0) {
      startDate.setDate(startDate.getDate() + (8 - weeksIntoCurrentCycle) * 7);
    }
    
    // Generate next 6 online sessions
    for (let i = 0; i < 6; i++) {
      const sessionStart = new Date(startDate);
      sessionStart.setDate(sessionStart.getDate() + (i * 8 * 7)); // Every 8 weeks
      
      const sessionEnd = new Date(sessionStart);
      sessionEnd.setDate(sessionEnd.getDate() + 27); // 4 weeks duration
      
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
  
  // For Unreal Engine or Bootcamp (no online option), default to inclass
  const isInClassOnly = course?.id === 'unreal' || course?.id === 'extreme-ccna-bootcamp' || !course?.onlinePrice;
  const defaultFormat = isInClassOnly ? 'inclass' : 'online';
  const [selectedFormat, setSelectedFormat] = useState(defaultFormat);
  const [selectedSession, setSelectedSession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Update default format when course loads
  useEffect(() => {
    if (course) {
      const inClassOnly = course.id === 'unreal' || course.id === 'extreme-ccna-bootcamp' || !course.onlinePrice;
      setSelectedFormat(inClassOnly ? 'inclass' : 'online');
    }
  }, [course]);

  // Generate available sessions based on selected format
  const availableSessions = useMemo(() => {
    if (!course) return [];
    // For in-class only courses, always use inclass format
    const inClassOnly = course.id === 'unreal' || course.id === 'extreme-ccna-bootcamp' || !course.onlinePrice;
    const format = inClassOnly ? 'inclass' : selectedFormat;
    return generateSessions(format);
  }, [selectedFormat, course]);

  // Reset session selection when format changes
  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    setSelectedSession('');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0f1f3d]" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Formation non trouvée</h1>
          <Button asChild>
            <Link to="/courses">Retour aux formations</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Determine which certification logo to show
  const getCertificationLogo = () => {
    if (course.category === 'CCNA') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/r2zhdhc3_image.png';
    } else if (course.id === 'cyberops') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/djop92go_image.png';
    } else if (course.id === 'unreal') {
      return 'https://customer-assets.emergentagent.com/job_preview-demo-54/artifacts/xqpq43nf_image.png';
    }
    return null;
  };

  const certLogo = getCertificationLogo();

  // Get selected session details
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
    
    // Build the product_id based on course and format
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
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create checkout session');
      }
      
      // Redirect to Stripe Checkout
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

  // For courses with only in-class option, use inClassFeatures
  const currentFeatures = (selectedFormat === 'online' && course.features) 
    ? course.features 
    : (course.inClassFeatures ?? course.features ?? []);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/courses">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux formations
          </Link>
        </Button>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f]">
                {course.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>
            </div>
            
            {/* Certification Logo */}
            {certLogo && (
              <div className="flex-shrink-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <img 
                    src={certLogo} 
                    alt={`${course.category} Certification`}
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#d4af37]" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-[#d4af37]" />
              <span>Niveau: {course.level}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-[#d4af37]" />
              <span>Certification Cisco</span>
            </div>
            
            {/* Download PDF Button */}
            <Button 
              onClick={() => generateCoursePDF(course)}
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold ml-auto"
              data-testid="download-pdf-btn"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger le programme PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Format Selection */}
            {course.onlinePrice && course.inClassPrice && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0f1f3d]">Choisissez votre format</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedFormat} onValueChange={setSelectedFormat}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="online">En ligne</TabsTrigger>
                      <TabsTrigger value="inclass">Présentiel</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="online" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-2xl font-bold text-[#0f1f3d]">Format En Ligne</h3>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-[#d4af37]">{course.onlinePrice}€</div>
                            <div className="text-sm text-gray-600">Durée: {course.duration}</div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Formation flexible à distance avec accès complet à la plateforme Cisco NetAcad et sessions live hebdomadaires.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="inclass" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-2xl font-bold text-[#0f1f3d]">Format Présentiel</h3>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-[#d4af37]">{course.inClassPrice}€</div>
                            <div className="text-sm text-gray-600">Intensive - 1 semaine</div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Formation intensive en présentiel à Loudun avec accès aux équipements réseau professionnels.
                        </p>
                        
                        {/* Meals included notice */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2 text-green-700">
                              <Coffee className="w-5 h-5" />
                              <span className="text-sm font-medium">Petit-déjeuner continental inclus</span>
                            </div>
                            <div className="flex items-center space-x-2 text-green-700">
                              <Utensils className="w-5 h-5" />
                              <span className="text-sm font-medium">Déjeuner inclus</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                          <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-blue-900">
                            <strong>Formation sur site:</strong> 2 venelle des Amandiers, 86200 Loudun, France
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* In-class only courses (Unreal or Bootcamp or no online price) */}
            {(!course.onlinePrice || course.id === 'unreal' || course.id === 'extreme-ccna-bootcamp') && (
              <Card className={course.id === 'extreme-ccna-bootcamp' ? 'border-2 border-[#d4af37]' : ''}>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0f1f3d]">
                    {course.id === 'extreme-ccna-bootcamp' ? 'Boot Camp Intensif' : 'Formation Présentiel Uniquement'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-[#0f1f3d]">{course.title}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#d4af37]">{course.inClassPrice}€</div>
                        <div className="text-sm text-gray-600">Durée: {course.duration}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {course.id === 'extreme-ccna-bootcamp' 
                        ? 'Formation intensive avec 75 labs pratiques sur Packet Tracer. Idéal pour une préparation rapide et complète à la certification CCNA.'
                        : 'Formation intensive en présentiel uniquement, avec accès aux équipements professionnels.'}
                    </p>
                    
                    {/* Meals included notice for in-class */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2 text-green-700">
                          <Coffee className="w-5 h-5" />
                          <span className="text-sm font-medium">Petit-déjeuner continental inclus</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-700">
                          <Utensils className="w-5 h-5" />
                          <span className="text-sm font-medium">Déjeuner inclus</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-900">
                        <strong>Formation sur site:</strong> 2 venelle des Amandiers, 86200 Loudun, France
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#0f1f3d]">Ce qui est inclus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(currentFeatures ?? []).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Objectives */}
            {(course.objectives ?? []).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#0f1f3d]">Objectifs de la formation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(course.objectives ?? []).map((objective, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            )}

            {/* Unreal Engine Course Videos */}
            {course.id === 'unreal' && (
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0f1f3d] flex items-center space-x-2">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <span>Vidéos de présentation</span>
                  </CardTitle>
                  <p className="text-gray-600 text-sm mt-2">
                    Découvrez un aperçu du contenu de la formation avec ces vidéos introductives
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {unrealVideos.map((video) => (
                    <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="aspect-video w-full">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.embedId}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-[#0f1f3d] mb-1">{video.title}</h4>
                        <p className="text-sm text-gray-600">{video.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-purple-100 rounded-lg p-4 flex items-start space-x-3">
                    <Play className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-purple-900">
                      <strong>Formation complète:</strong> Ces vidéos sont un aperçu du programme. 
                      La formation inclut des dizaines d'heures de contenu pratique et théorique.
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certification Info */}
            {course.certificationCost && (
              <Card className="border-2 border-[#d4af37] bg-gradient-to-br from-amber-50 to-yellow-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0f1f3d] flex items-center space-x-2">
                    <Award className="w-6 h-6 text-[#d4af37]" />
                    <span>Certification Cisco</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    À l'issue de cette formation, vous pouvez passer l'examen de certification officiel Cisco.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">Examen officiel Cisco</span>
                      <span className="text-2xl font-bold text-[#d4af37]">{course.certificationCost}€</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Passé en centre agréé PearsonVUE (non inclus dans le prix de la formation)
                    </p>
                    <Button asChild className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold">
                      <Link to="/certification" data-testid="buy-certification-btn">
                        <Award className="w-4 h-4 mr-2" />
                        Acheter l'examen de certification
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 border-2 border-[#d4af37]">
              <CardHeader className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white rounded-t-lg">
                <CardTitle className="text-2xl">Inscription</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Prix de la formation</div>
                  <div className="text-4xl font-bold text-[#d4af37]">
                    {course.id === 'unreal' 
                      ? `${course.inClassPrice}€`
                      : `${selectedFormat === 'online' ? course.onlinePrice : course.inClassPrice}€`
                    }
                  </div>
                  {course.id !== 'unreal' && (
                    <div className="text-sm text-gray-600 mt-1">
                      Format {selectedFormat === 'online' ? 'en ligne' : 'présentiel'}
                    </div>
                  )}
                </div>

                {/* Session Selection Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    Sélectionnez votre session
                  </label>
                  <Select 
                    value={selectedSession} 
                    onValueChange={setSelectedSession}
                    data-testid="session-selector"
                  >
                    <SelectTrigger className="w-full border-2 border-gray-200 focus:border-[#d4af37]" data-testid="session-selector-trigger">
                      <SelectValue placeholder="Choisir une date de début" />
                    </SelectTrigger>
                    <SelectContent>
                      {(availableSessions ?? []).map((session) => (
                        <SelectItem 
                          key={session.id} 
                          value={session.id}
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
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Session sélectionnée</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        {selectedSessionDetails.label}
                      </p>
                    </div>
                  )}
                  {!selectedSession && (
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Veuillez sélectionner une session pour continuer
                    </p>
                  )}
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold text-lg py-6"
                  data-testid="checkout-btn"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Redirection vers le paiement...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      S'inscrire maintenant
                    </>
                  )}
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <strong className="block mb-1">Options de financement</strong>
                      OPCO, employeur et financement personnel disponibles.
                      <Link to="/funding" className="text-blue-700 underline hover:text-blue-800 block mt-2">
                        En savoir plus →
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Places limitées</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Démarrage rapide</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Certification reconnue</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
