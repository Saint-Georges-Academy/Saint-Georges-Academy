import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Award,
  Target,
  Globe,
  Network,
  Shield,
  Gamepad2,
  GraduationCap,
  Users,
  Building2,
  Rocket,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  BookOpen,
  Briefcase,
  Star,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const expertiseAreas = [
    {
      icon: Network,
      color: 'blue',
      title: 'Networking Infrastructure',
      subtitle: 'CCNA 1, 2, 3 – Enterprise Networking',
      description: 'Official Cisco curriculum via NetAcad.'
    },
    {
      icon: Shield,
      color: 'green',
      title: 'Cybersecurity Operations',
      subtitle: 'CyberOps',
      description: 'Security monitoring, incident response, and network defense.'
    },
    {
      icon: Gamepad2,
      color: 'purple',
      title: 'Real-Time Development',
      subtitle: 'Unreal Engine',
      description: 'Bootcamps focused on interactive systems and immersive environments.'
    }
  ];

  const netacadBenefits = [
    'Official NetAcad access',
    'Structured lab environments',
    'Preparation for Cisco certification exams',
    'Alignment with international standards'
  ];

  const onlineFeatures = [
    'Weekly live instructor sessions',
    'Structured follow-up',
    'Continuous assessment',
    'Technical support'
  ];

  const commitments = [
    'Transparency',
    'Structured pedagogy',
    'Continuous improvement',
    'Compliance with national quality standards'
  ];

  const targetAudience = [
    { icon: Briefcase, text: 'Career changers' },
    { icon: Users, text: 'Job seekers' },
    { icon: BookOpen, text: 'IT beginners' },
    { icon: Network, text: 'Technical professionals' },
    { icon: Gamepad2, text: 'Creative developers' },
    { icon: Globe, text: 'International students' }
  ];

  const educationPrinciples = [
    'Structured',
    'Demanding',
    'Practical',
    'Aligned with industry standards'
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <Award className="w-4 h-4 mr-2" />
            About Us
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            About Saint-Georges Academy
          </h1>
          <p className="text-2xl text-[#d4af37] font-semibold mb-6">
            Elite European Technology Training
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Saint-Georges Academy is a professional training institute based in Loudun, France, 
            dedicated to excellence in networking, cybersecurity, and real-time development.
          </p>
          <div className="mt-6 inline-flex items-center bg-white border-2 border-[#d4af37] rounded-lg px-6 py-3">
            <img 
              src="https://www.netacad.com/sites/default/files/images/careers/internships_for_companies.jpg" 
              alt="Cisco NetAcad"
              className="h-8 w-auto mr-3"
              onError={(e) => e.target.style.display = 'none'}
            />
            <span className="font-semibold text-[#0f1f3d]">Official Cisco Networking Academy</span>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 border-2 border-[#d4af37] overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-10 h-10 text-[#d4af37]" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-200 leading-relaxed">
                To provide rigorous, structured, instructor-led training that transforms 
                motivated learners into competent IT professionals.
              </p>
            </div>
            <CardContent className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-gray-700 mb-6">
                We believe technical education must be:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {educationPrinciples.map((principle, index) => (
                  <div key={index} className="flex items-center gap-2 bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                    <span className="font-medium text-[#0f1f3d]">{principle}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-700 font-medium">
                Saint-Georges Academy bridges academic discipline with real-world application.
              </p>
            </CardContent>
          </div>
        </Card>

        {/* Areas of Expertise */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-[#d4af37]" />
              <h2 className="text-3xl font-bold text-[#0f1f3d]">Our Areas of Expertise</h2>
            </div>
            <p className="text-gray-600">We specialize in three strategic pillars:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {expertiseAreas.map((area, index) => (
              <Card key={index} className={`border-2 hover:border-${area.color}-400 transition-all hover:shadow-lg`}>
                <CardHeader>
                  <div className={`w-14 h-14 bg-${area.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                    <area.icon className={`w-7 h-7 text-${area.color}-600`} />
                  </div>
                  <CardTitle className="text-xl text-[#0f1f3d]">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-[#d4af37] mb-2">{area.subtitle}</p>
                  <p className="text-gray-600">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Official Cisco Networking Academy */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-2 border-blue-300 shadow-lg">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                  <span>Official Cisco Networking Academy</span>
                </h2>
                <p className="text-gray-700 mb-4">
                  Saint-Georges Academy is recognized as an official Cisco Networking Academy, 
                  providing access to Cisco's global curriculum and structured learning pathways.
                </p>
                <p className="font-semibold text-[#0f1f3d] mb-3">Our students benefit from:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {netacadBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructor-Led Excellence */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <GraduationCap className="w-8 h-8 text-[#d4af37]" />
              Instructor-Led Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg mb-6">
              Unlike mass online platforms, Saint-Georges Academy prioritizes <strong>human guidance</strong>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Online Programs Include:
                </h3>
                <ul className="space-y-3">
                  {onlineFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-600" />
                  In-Class Bootcamps:
                </h3>
                <p className="text-gray-700">
                  Immersive, high-intensity training in a controlled learning environment with 
                  direct access to professional equipment and hands-on practice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Structure */}
        <Card className="mb-12 border-2 border-[#d4af37]">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <Building2 className="w-8 h-8 text-[#d4af37]" />
              Professional Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Saint-Georges Academy operates as a professional training organization registered in France.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-[#0f1f3d] mb-4">We are committed to:</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3 border">
                    <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-gray-700">{commitment}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900">
                Our programs are structured in accordance with the <strong>French National Quality Framework (RNQ)</strong>, 
                with a quality certification approach in progress.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Who We Train */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <Users className="w-8 h-8 text-[#d4af37]" />
              Who We Train
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">We support:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {targetAudience.map((audience, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 border hover:border-[#d4af37] transition-colors">
                  <div className="w-10 h-10 bg-[#0f1f3d] rounded-lg flex items-center justify-center">
                    <audience.icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <span className="font-medium text-[#0f1f3d]">{audience.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5f] text-white rounded-xl p-6 text-center">
              <Star className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <p className="text-lg">
                Our learners share one common trait:<br />
                <strong className="text-[#d4af37]">They are motivated to master complex technologies.</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Our Vision */}
        <Card className="mb-12 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <Rocket className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-6">
                Saint-Georges Academy aims to become a recognized European center of excellence in:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge className="bg-white/10 text-white border border-white/20 text-base px-4 py-2">
                  <Network className="w-4 h-4 mr-2" />
                  Network Engineering
                </Badge>
                <Badge className="bg-white/10 text-white border border-white/20 text-base px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Cyber Defense
                </Badge>
                <Badge className="bg-white/10 text-white border border-white/20 text-base px-4 py-2">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Real-Time Interactive Systems
                </Badge>
              </div>
              <div className="bg-white/10 rounded-xl p-6 max-w-xl mx-auto">
                <p className="text-lg">
                  We do not aim to be the largest academy.<br />
                  <strong className="text-[#d4af37]">We aim to be one of the most rigorous.</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="border-2 border-[#d4af37]">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <MapPin className="w-8 h-8 text-[#d4af37]" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#0f1f3d] text-xl mb-2">Saint-Georges Academy</h3>
                  <p className="text-gray-700">
                    2 venelle des Amandiers<br />
                    86200 Loudun – France
                  </p>
                </div>
                <div className="space-y-3">
                  <a href="tel:+33549227510" className="flex items-center gap-3 text-gray-700 hover:text-[#d4af37] transition-colors">
                    <Phone className="w-5 h-5 text-[#d4af37]" />
                    +33 (0)5 49 22 75 10
                  </a>
                  <a href="mailto:contact@saint-georges.academy" className="flex items-center gap-3 text-gray-700 hover:text-[#d4af37] transition-colors">
                    <Mail className="w-5 h-5 text-[#d4af37]" />
                    contact@saint-georges.academy
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]">
                    <Link to="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Nous contacter
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-[#0f1f3d] text-[#0f1f3d]">
                    <Link to="/courses">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Voir les formations
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
