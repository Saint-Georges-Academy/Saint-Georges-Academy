import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  BarChart, 
  Award, 
  Video, 
  Users,
  ShoppingCart,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const [selectedFormat, setSelectedFormat] = useState('online');
  const { toast } = useToast();

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
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/l0g1p6bm_image.png';
    }
    return null;
  };

  const certLogo = getCertificationLogo();

  const handleAddToCart = () => {
    const price = selectedFormat === 'online' ? course.onlinePrice : course.inClassPrice;
    const format = selectedFormat === 'online' ? 'En ligne' : 'Présentiel';
    
    toast({
      title: "Ajouté au panier",
      description: `${course.title} - Format ${format} (${price}€)`,
    });
  };

  // For courses with only in-class option, use inClassFeatures
  const currentFeatures = (selectedFormat === 'online' && course.features) 
    ? course.features 
    : course.inClassFeatures;

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
          
          <div className="flex flex-wrap gap-6">
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

            {course.id === 'unreal' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0f1f3d]">Formation Présentiel Uniquement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-[#0f1f3d]">Unreal Engine</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#d4af37]">{course.inClassPrice}€</div>
                        <div className="text-sm text-gray-600">Durée: {course.duration}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Formation intensive en présentiel uniquement, avec accès aux stations de travail professionnelles.
                    </p>
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
                  {currentFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#0f1f3d]">Objectifs de la formation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.objectives.map((objective, index) => (
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

                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold text-lg py-6"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  S'inscrire maintenant
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
