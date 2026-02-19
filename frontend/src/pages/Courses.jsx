import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Clock, BarChart, MapPin, Globe, ArrowRight, Loader2, Zap } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Courses = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const [activeFilter, setActiveFilter] = useState(filterParam || 'all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['all', 'CCNA', 'Cybersécurité', 'Développement'];

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  // Get certification logo based on course
  const getCertificationLogo = (course) => {
    if (course.category === 'CCNA') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/r2zhdhc3_image.png';
    } else if (course.id === 'cyberops') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/djop92go_image.png';
    } else if (course.id === 'unreal') {
      return 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/l0g1p6bm_image.png';
    }
    return null;
  };

  // Check if course is bootcamp
  const isBootcamp = (course) => course.id === 'extreme-ccna-bootcamp';

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0f1f3d]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Nos Formations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Formations certifiantes en réseaux, cybersécurité et développement. 
            Choisissez entre nos formats en ligne flexibles ou nos sessions intensives en présentiel.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <Tabs value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {category === 'all' ? 'Toutes' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const certLogo = getCertificationLogo(course);
            const bootcamp = isBootcamp(course);
            return (
              <Card 
                key={course.id} 
                className={`border-2 hover:border-[#d4af37] transition-all hover:shadow-xl group flex flex-col ${
                  bootcamp ? 'border-[#d4af37] bg-gradient-to-br from-amber-50 to-yellow-50' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      <Badge className="bg-[#0f1f3d] text-white hover:bg-[#1a3a5f]">
                        {course.category}
                      </Badge>
                      {bootcamp && (
                        <Badge className="bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f]">
                          <Zap className="w-3 h-3 mr-1" />
                          Intensif
                        </Badge>
                      )}
                    </div>
                    {certLogo && (
                      <img 
                        src={certLogo} 
                        alt={`${course.category} Logo`}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                  </div>
                  <CardTitle className="text-2xl text-[#0f1f3d] mb-3">
                    {course.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#d4af37]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart className="w-4 h-4 text-[#d4af37]" />
                      <span>Niveau: {course.level}</span>
                    </div>
                    {bootcamp && (
                      <div className="flex items-center space-x-2 text-[#d4af37] font-medium">
                        <Zap className="w-4 h-4" />
                        <span>75 Labs Packet Tracer</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

              <CardContent className="flex-grow flex flex-col justify-end">
                <div className="border-t pt-4 mb-4">
                  {course.onlinePrice && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span>En ligne</span>
                      </div>
                      <span className="font-bold text-[#0f1f3d]">{course.onlinePrice}€</span>
                    </div>
                  )}
                  {course.inClassPrice && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>Présentiel</span>
                      </div>
                      <span className="font-bold text-[#0f1f3d]">{course.inClassPrice}€</span>
                    </div>
                  )}
                </div>

                <Button asChild className={`w-full ${bootcamp ? 'bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]' : 'bg-[#0f1f3d] hover:bg-[#1a3a5f] text-white'}`}>
                  <Link to={`/course/${course.id}`}>
                    Voir les détails
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
        </div>

        {/* Videos CTA */}
        <div className="mt-16">
          <Card className="border-2 border-[#d4af37] bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-3 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f]">
                    Produit autonome
                  </Badge>
                  <h3 className="text-3xl font-bold text-[#0f1f3d] mb-3">
                    75 Vidéos de Préparation CCNA
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Collection complète de vidéos pour préparer votre certification CCNA à votre rythme.
                  </p>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl font-bold text-[#d4af37]">150€</span>
                    <span className="text-sm text-gray-600">Accès pendant 12 mois</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button asChild size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold">
                    <Link to="/videos">
                      En savoir plus
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Courses;
