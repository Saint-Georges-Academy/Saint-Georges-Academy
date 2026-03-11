import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Users, ArrowRight, Shield, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  
  const stats = [
    { label: t('hero.stats.courses'), value: '5+' },
    { label: t('hero.stats.hours'), value: '350+' },
    { label: t('hero.stats.success'), value: '94%' },
    { label: t('hero.stats.experience'), value: '15+' }
  ];

  const features = [
    {
      icon: Award,
      title: t('features.cisco.title'),
      description: t('features.cisco.description')
    },
    {
      icon: Users,
      title: t('features.instructors.title'),
      description: t('features.instructors.description')
    },
    {
      icon: BookOpen,
      title: t('features.format.title'),
      description: t('features.format.description')
    },
    {
      icon: Shield,
      title: t('features.quality.title'),
      description: t('features.quality.description')
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
      <section className="relative bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#001a33] text-white pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-5xl mx-auto">
            {/* Large Saint-Georges Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
                  alt="Saint-Georges Academy"
                  className="h-40 w-auto object-contain bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-4 border-[#d4af37]"
                />
              </div>
            </div>

            {/* Academy Name */}
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl font-bold mb-3 text-white drop-shadow-lg">
                Saint-Georges Academy
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                <p className="text-2xl text-[#d4af37] font-semibold tracking-wide">International School</p>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
              </div>
            </div>
            
            <Badge className="mb-8 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-3 text-lg shadow-lg">
              {t('hero.badge')}
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              {t('hero.title')}
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-4xl mx-auto">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-10 py-7 text-xl shadow-xl hover:scale-105 transition-transform">
                <Link to="/courses">
                  {t('hero.exploreBtn')}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-3 border-white/80 text-white hover:bg-white hover:text-[#0f1f3d] px-10 py-7 text-xl backdrop-blur-sm hover:scale-105 transition-transform">
                <Link to="/funding">
                  {t('hero.fundingBtn')}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-5xl font-bold text-[#d4af37] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
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
              {t('features.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
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
              {t('coursesPreview.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('coursesPreview.subtitle')}
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
                      {t('coursesPreview.learnMore')}
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
                {t('coursesPreview.allCourses')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#001f3f] to-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-20 h-20 text-[#d4af37] mx-auto mb-8" />
          <h2 className="text-5xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-2xl text-gray-200 mb-10">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-10 py-7 text-xl shadow-xl">
              <Link to="/courses">
                {t('cta.chooseBtn')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-[#0f1f3d] px-10 py-7 text-xl">
              <Link to="/contact">
                {t('cta.contactBtn')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Official Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 px-4 py-1.5">
              <Shield className="w-4 h-4 mr-2" />
              Partenaires Officiels
            </Badge>
            <h2 className="text-3xl font-bold text-[#0f1f3d] mb-4">
              Nos Partenariats
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Saint-Georges Academy collabore avec des acteurs majeurs de la formation et de la cybersécurité
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {/* Cisco Partner */}
            <div className="flex flex-col items-center">
              <div className="bg-[#0f1f3d] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-[#d4af37]/20">
                <img 
                  src="https://customer-assets.emergentagent.com/job_288e3385-608d-4caa-ae86-50c9ee822e33/artifacts/628w7ac8_image.png"
                  alt="Cisco Networking Academy"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-gray-700">Cisco Networking Academy</p>
              <Badge className="mt-1 bg-blue-100 text-blue-700 text-xs">
                Partenaire Académique
              </Badge>
            </div>

            {/* World of Haiku Partner */}
            <Link to="/world-of-haiku" className="flex flex-col items-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#d4af37] transition-all group-hover:shadow-xl">
                <img 
                  src="https://customer-assets.emergentagent.com/job_288e3385-608d-4caa-ae86-50c9ee822e33/artifacts/qdtdlhwi_image.png"
                  alt="World of Haiku - Cybersecurity Training"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-gray-700">World of Haiku</p>
              <Badge className="mt-1 bg-green-100 text-green-700 text-xs">
                Revendeur Officiel Europe
              </Badge>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-[#0f1f3d] text-[#0f1f3d]">
              <Link to="/world-of-haiku">
                Découvrir World of Haiku
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
