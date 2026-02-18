import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Users, CheckCircle, ArrowRight, Shield, Globe, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Home = () => {
  const stats = [
    { label: 'Formations certifiantes', value: '5+' },
    { label: 'Heures de formation', value: '350+' },
    { label: 'Taux de réussite', value: '94%' },
    { label: 'Années d\'expérience', value: '15+' }
  ];

  const features = [
    {
      icon: Award,
      title: 'Cisco Networking Academy Officielle',
      description: 'Accès direct aux ressources et certifications Cisco reconnues mondialement.'
    },
    {
      icon: Users,
      title: 'Instructeurs Certifiés',
      description: 'Formateurs experts avec une expérience terrain significative en entreprise.'
    },
    {
      icon: BookOpen,
      title: 'Double Format',
      description: 'Formations en ligne flexibles ou intensives en présentiel selon vos besoins.'
    },
    {
      icon: Shield,
      title: 'Qualité Garantie',
      description: 'Structure pédagogique conforme au Référentiel National Qualité.'
    }
  ];

  const courses = [
    {
      title: 'CCNA',
      description: 'Certification réseau Cisco complète en 3 modules progressifs',
      level: 'Tous niveaux',
      path: '/courses?filter=CCNA',
      color: 'from-blue-50 to-blue-100',
      logo: 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/r2zhdhc3_image.png'
    },
    {
      title: 'CyberOps',
      description: 'Opérations de cybersécurité et détection des menaces',
      level: 'Intermédiaire',
      path: '/course/cyberops',
      color: 'from-red-50 to-red-100',
      logo: 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/djop92go_image.png'
    },
    {
      title: 'Unreal Engine',
      description: 'Développement de jeux et applications 3D interactives',
      level: 'Tous niveaux',
      path: '/course/unreal',
      color: 'from-purple-50 to-purple-100',
      logo: 'https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/l0g1p6bm_image.png'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f1f3d] via-[#1a3a5f] to-[#0f1f3d] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Saint-Georges Logo */}
            <div className="mb-6 flex justify-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
                alt="Saint-Georges Academy"
                className="h-24 w-auto object-contain bg-white/10 backdrop-blur-sm rounded-lg p-3"
              />
            </div>
            
            <Badge className="mb-6 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-sm font-semibold px-4 py-2">
              Official Cisco Networking Academy
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Devenez Expert en Réseaux et Cybersécurité
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Formations professionnelles certifiantes en présentiel et en ligne. 
              Cisco CCNA, CyberOps et Unreal Engine à Loudun, France.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold px-8 py-6 text-lg">
                <Link to="/courses">
                  Explorer les formations
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#0f1f3d] px-8 py-6 text-lg">
                <Link to="/funding">
                  Options de financement
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-[#d4af37] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0f1f3d] mb-4">
              Pourquoi Choisir Saint-Georges Academy ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une formation d'excellence reconnue par les professionnels du secteur
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-[#d4af37] transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <CardTitle className="text-xl text-[#0f1f3d]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0f1f3d] mb-4">
              Nos Formations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Formations professionnelles reconnues avec certifications internationales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="border-2 hover:border-[#d4af37] transition-all hover:shadow-xl group">
                <div className={`h-3 bg-gradient-to-r ${course.color}`}></div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {course.level}
                    </Badge>
                    <img 
                      src={course.logo} 
                      alt={`${course.title} Logo`}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <CardTitle className="text-2xl text-[#0f1f3d] mb-2">{course.title}</CardTitle>
                  <p className="text-gray-600">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-[#0f1f3d] hover:bg-[#1a3a5f] text-white">
                    <Link to={course.path}>
                      En savoir plus
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-2 border-[#0f1f3d] text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white">
              <Link to="/courses">
                Voir toutes les formations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Lancer Votre Carrière ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez des centaines de professionnels formés chez Saint-Georges Academy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold px-8 py-6 text-lg">
              <Link to="/courses">
                Choisir ma formation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#0f1f3d] px-8 py-6 text-lg">
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
