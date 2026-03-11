import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Users, Building2, GraduationCap, ArrowRight, CheckCircle, 
  Globe, Target, Gamepad2, Brain, Award, Lock, Mail, Phone,
  Building, School, User, Send, MessageSquare, HelpCircle,
  Landmark, TrendingUp, Zap, Eye
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const WorldOfHaiku = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisation_name: '',
    contact_name: '',
    email: '',
    country: '',
    organisation_type: '',
    estimated_licences: '',
    intended_use: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/quotes/haiku`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Quote request submitted successfully!', {
          description: 'Our team will contact you within 24-48 hours.',
        });
        setFormData({
          organisation_name: '',
          contact_name: '',
          email: '',
          country: '',
          organisation_type: '',
          estimated_licences: '',
          intended_use: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      toast.error('Failed to submit request', {
        description: 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIndividualStart = () => {
    navigate('/contact', { state: { subject: 'World of Haiku - Individual Licence' } });
  };

  const productFeatures = [
    {
      icon: Gamepad2,
      title: 'Immersive Game-Based Learning',
      description: 'Engage with cybersecurity concepts through an interactive video game environment that makes learning memorable and effective.'
    },
    {
      icon: Shield,
      title: 'Real-World Scenarios',
      description: 'Face authentic cybersecurity challenges and learn to identify, prevent, and respond to threats in a safe, simulated environment.'
    },
    {
      icon: Brain,
      title: 'Practical Skill Development',
      description: 'Build hands-on cybersecurity awareness and skills that translate directly to workplace security practices.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor learning progress with detailed analytics and completion tracking for individuals and teams.'
    },
    {
      icon: Users,
      title: 'Team & Organisation Deployment',
      description: 'Scalable deployment options for teams of any size, from small businesses to large enterprises and institutions.'
    },
    {
      icon: Award,
      title: 'Recognised Training',
      description: 'A training approach recognised for its effectiveness in building cybersecurity awareness across organisations.'
    }
  ];

  const targetAudiences = [
    {
      icon: User,
      title: 'Individual Learners',
      description: 'Professionals seeking to enhance their cybersecurity awareness and protect themselves online.'
    },
    {
      icon: Building2,
      title: 'Companies & SMEs',
      description: 'Organisations looking to train their workforce in cybersecurity best practices and threat awareness.'
    },
    {
      icon: Building,
      title: 'Large Enterprises',
      description: 'Corporations requiring scalable cybersecurity training solutions for large employee bases.'
    },
    {
      icon: School,
      title: 'Educational Institutions',
      description: 'Schools and universities integrating cybersecurity training into their curriculum.'
    },
    {
      icon: GraduationCap,
      title: 'Higher Education',
      description: 'Universities and professional training centres preparing students for the digital workplace.'
    },
    {
      icon: Landmark,
      title: 'Public Sector',
      description: 'Government agencies and public institutions requiring compliant cybersecurity training.'
    }
  ];

  const faqs = [
    {
      question: 'What is World of Haiku?',
      answer: 'World of Haiku is an innovative cybersecurity training platform that uses video game mechanics to teach cybersecurity awareness and skills. It provides an immersive learning experience that makes security training engaging and effective.'
    },
    {
      question: 'How does Saint-Georges Academy provide World of Haiku?',
      answer: 'Saint-Georges Academy is an official reseller in Europe for The World of Haiku. We provide licences, support, and guidance to help individuals and organisations deploy and benefit from this training solution. Our reseller status is non-exclusive.'
    },
    {
      question: 'What is included in an individual licence?',
      answer: 'Individual licences provide full access to the World of Haiku training platform for one user at €19 per month, including all learning modules, progress tracking, and completion certificates.'
    },
    {
      question: 'How is pricing determined for companies and educational institutions?',
      answer: 'Pricing for organisations depends on the number of licences required and specific deployment needs. We provide custom quotes based on your organisation\'s size, requirements, and implementation scope. Contact us for a tailored proposal.'
    },
    {
      question: 'Is World of Haiku suitable for compliance training?',
      answer: 'Yes, World of Haiku is used by organisations to support their cybersecurity awareness training programmes. However, specific compliance certifications should be verified with your compliance officers for your industry requirements.'
    },
    {
      question: 'What support does Saint-Georges Academy provide?',
      answer: 'As an official reseller, Saint-Georges Academy provides pre-sales consultation, deployment guidance, and ongoing support for organisations using World of Haiku. We serve as your European point of contact for all licence-related matters.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f1f3d] via-[#1a3a5c] to-[#0f1f3d] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"></div>
        </div>
        
        {/* Cyber Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="container mx-auto px-4 py-20 pt-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-[#8b1538] text-white px-4 py-1.5 text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Cybersecurity Training
              </Badge>
              <Badge className="bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 px-4 py-1.5 text-sm font-medium">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Game-Based Learning
              </Badge>
              <Badge className="bg-white/10 text-white border border-white/20 px-4 py-1.5 text-sm font-medium">
                <Globe className="w-4 h-4 mr-2" />
                Available in Europe
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              World of Haiku in Europe
              <span className="block text-[#d4af37] mt-2">through Saint-Georges Academy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4 font-light">
              Immersive Cybersecurity Training for Individuals and Organisations
            </p>
            
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-6">
              Saint-Georges Academy is an official reseller in Europe for The World of Haiku, 
              a leading cybersecurity video game and training platform. We provide licences for 
              individuals, companies, and educational institutions.
            </p>

            <p className="text-sm text-white/50 mb-10">
              Reseller status is non-exclusive.
            </p>

            {/* Key Value Points */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/80">
                <Gamepad2 className="w-5 h-5 text-[#d4af37]" />
                <span>Engaging Gameplay</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="w-5 h-5 text-[#d4af37]" />
                <span>Security Awareness</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-5 h-5 text-[#d4af37]" />
                <span>Team Deployment</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="w-5 h-5 text-[#d4af37]" />
                <span>Progress Tracking</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] font-semibold px-8 py-6 text-lg"
                onClick={handleIndividualStart}
                data-testid="hero-individual-btn"
              >
                Start as an Individual
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#0f1f3d] px-8 py-6 text-lg"
                onClick={() => document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' })}
                data-testid="hero-company-quote-btn"
              >
                Request a Company Quote
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' })}
                data-testid="hero-education-quote-btn"
              >
                Request an Education Quote
              </Button>
            </div>

            {/* Price Preview */}
            <div className="mt-12 flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Individual</p>
                <p className="text-3xl font-bold text-[#d4af37]">€19<span className="text-lg font-normal">/month</span></p>
              </div>
              <div className="w-px bg-white/20 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Companies</p>
                <p className="text-2xl font-bold text-white">Custom Quote</p>
              </div>
              <div className="w-px bg-white/20 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Education</p>
                <p className="text-2xl font-bold text-white">Custom Quote</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* What is World of Haiku */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#8b1538]/10 text-[#8b1538] mb-4">About the Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              What is World of Haiku?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              World of Haiku is a cybersecurity video game and training platform that transforms 
              security awareness education into an engaging, interactive experience. Through 
              immersive gameplay, learners develop practical cybersecurity skills while navigating 
              real-world scenarios in a safe, simulated environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {productFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5c] rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f1f3d] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#0f1f3d]/10 text-[#0f1f3d] mb-4">Target Audiences</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              Who is World of Haiku For?
            </h2>
            <p className="text-lg text-gray-600">
              World of Haiku is designed for anyone who needs to understand and practice 
              cybersecurity awareness, from individual learners to large organisations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {targetAudiences.map((audience, index) => (
              <Card key={index} className="border border-gray-200 hover:border-[#d4af37] hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0f1f3d] rounded-xl flex items-center justify-center flex-shrink-0">
                      <audience.icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f1f3d] mb-1">{audience.title}</h3>
                      <p className="text-sm text-gray-600">{audience.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Game-Based Learning */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-[#d4af37]/10 text-[#d4af37] mb-4">The Approach</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
                  Why Organisations Choose<br />
                  <span className="text-[#8b1538]">Game-Based Cybersecurity Learning</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Traditional cybersecurity training often fails to engage learners or produce lasting 
                  behaviour change. Game-based learning addresses these challenges by making training 
                  interactive, memorable, and directly applicable to real-world situations.
                </p>

                <div className="space-y-4">
                  {[
                    { title: 'Higher Engagement', description: 'Interactive gameplay maintains learner attention and motivation' },
                    { title: 'Better Retention', description: 'Hands-on practice leads to longer-lasting knowledge retention' },
                    { title: 'Safe Environment', description: 'Learners can make mistakes and learn without real-world consequences' },
                    { title: 'Measurable Results', description: 'Track progress and demonstrate training effectiveness to stakeholders' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0f1f3d] mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5c] rounded-3xl p-8 text-white">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#d4af37] rounded-2xl flex items-center justify-center">
                    <Brain className="w-12 h-12 text-[#0f1f3d]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6">Learning Through Play</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Eye className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Threat Recognition</h4>
                        <p className="text-white/70 text-sm">Learn to identify phishing, social engineering, and other threats</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Security Best Practices</h4>
                        <p className="text-white/70 text-sm">Develop habits for password management, data protection, and safe browsing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Incident Response</h4>
                        <p className="text-white/70 text-sm">Know what to do when security incidents occur</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#0f1f3d]/10 text-[#0f1f3d] mb-4">Licence Options</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              Pricing & Licence Options
            </h2>
            <p className="text-lg text-gray-600">
              Individual licences are available from €19/month. Company and educational pricing 
              is provided on quotation based on the number of licences and deployment needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Individual */}
            <Card className="border-2 border-gray-200 hover:border-[#d4af37] transition-colors relative overflow-hidden" data-testid="pricing-card-individual">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-[#0f1f3d] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-[#d4af37]" />
                </div>
                <CardTitle className="text-2xl text-[#0f1f3d]">Individual</CardTitle>
                <p className="text-gray-600 text-sm mt-2">For individual learners</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="py-6">
                  <span className="text-5xl font-bold text-[#0f1f3d]">€19</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6">
                  Access for individual learners seeking immersive cybersecurity training through World of Haiku.
                </p>
                
                <ul className="text-left space-y-3 mb-8">
                  {[
                    'Full platform access',
                    'All training modules',
                    'Progress tracking',
                    'Completion certificates',
                    'Email support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-[#0f1f3d] hover:bg-[#1a3a5c] text-white py-6"
                  onClick={handleIndividualStart}
                  data-testid="pricing-individual-cta"
                >
                  Start Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Companies */}
            <Card className="border-2 border-[#d4af37] relative overflow-hidden shadow-xl" data-testid="pricing-card-company">
              <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0f1f3d] px-4 py-1 text-sm font-bold">
                MOST POPULAR
              </div>
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-[#0f1f3d]" />
                </div>
                <CardTitle className="text-2xl text-[#0f1f3d]">Companies</CardTitle>
                <p className="text-gray-600 text-sm mt-2">For businesses & enterprises</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="py-6">
                  <span className="text-3xl font-bold text-[#0f1f3d]">Custom Quote</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6">
                  Pricing depends on the number of licences and organisational requirements.
                </p>
                
                <ul className="text-left space-y-3 mb-8">
                  {[
                    'Volume licensing',
                    'Admin dashboard',
                    'Team progress tracking',
                    'Deployment support',
                    'Priority support',
                    'Custom reporting'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] py-6 font-semibold"
                  onClick={() => document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' })}
                  data-testid="pricing-company-cta"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Educational Institutions */}
            <Card className="border-2 border-gray-200 hover:border-[#d4af37] transition-colors relative overflow-hidden" data-testid="pricing-card-education">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-[#8b1538] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#0f1f3d]">Educational Institutions</CardTitle>
                <p className="text-gray-600 text-sm mt-2">For schools & universities</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="py-6">
                  <span className="text-3xl font-bold text-[#0f1f3d]">Custom Quote</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6">
                  Pricing depends on the number of learners, instructors, and deployment scope.
                </p>
                
                <ul className="text-left space-y-3 mb-8">
                  {[
                    'Academic licensing',
                    'Instructor accounts',
                    'Student management',
                    'Curriculum integration',
                    'Academic support',
                    'Usage analytics'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#8b1538] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-[#8b1538] hover:bg-[#6d1029] text-white py-6"
                  onClick={() => document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' })}
                  data-testid="pricing-education-cta"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="py-20 bg-white" id="quote-form">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-[#d4af37]/10 text-[#d4af37] mb-4">Get in Touch</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
                Request a Quote
              </h2>
              <p className="text-lg text-gray-600">
                Complete the form below and our team will provide a customised quote 
                based on your organisation's requirements.
              </p>
            </div>

            <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organisation_name">Organisation Name *</Label>
                      <Input 
                        id="organisation_name"
                        name="organisation_name"
                        value={formData.organisation_name}
                        onChange={handleChange}
                        placeholder="Your organisation"
                        required
                        data-testid="quote-org-name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact_name">Contact Name *</Label>
                      <Input 
                        id="contact_name"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        data-testid="quote-contact-name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        data-testid="quote-email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input 
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        required
                        data-testid="quote-country"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organisation_type">Type of Organisation *</Label>
                      <Select 
                        value={formData.organisation_type} 
                        onValueChange={(value) => handleSelectChange('organisation_type', value)}
                      >
                        <SelectTrigger data-testid="quote-org-type">
                          <SelectValue placeholder="Select organisation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company_small">Small Business (1-50 employees)</SelectItem>
                          <SelectItem value="company_medium">Medium Business (51-250 employees)</SelectItem>
                          <SelectItem value="company_large">Large Enterprise (250+ employees)</SelectItem>
                          <SelectItem value="school">School (K-12)</SelectItem>
                          <SelectItem value="university">University / Higher Education</SelectItem>
                          <SelectItem value="training_centre">Training Centre</SelectItem>
                          <SelectItem value="public_sector">Public Sector / Government</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="estimated_licences">Estimated Number of Licences *</Label>
                      <Select 
                        value={formData.estimated_licences} 
                        onValueChange={(value) => handleSelectChange('estimated_licences', value)}
                      >
                        <SelectTrigger data-testid="quote-licences">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 licences</SelectItem>
                          <SelectItem value="11-50">11-50 licences</SelectItem>
                          <SelectItem value="51-100">51-100 licences</SelectItem>
                          <SelectItem value="101-250">101-250 licences</SelectItem>
                          <SelectItem value="251-500">251-500 licences</SelectItem>
                          <SelectItem value="500+">500+ licences</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="intended_use">Intended Use *</Label>
                    <Select 
                      value={formData.intended_use} 
                      onValueChange={(value) => handleSelectChange('intended_use', value)}
                    >
                      <SelectTrigger data-testid="quote-intended-use">
                        <SelectValue placeholder="How will you use World of Haiku?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee_training">Employee Security Training</SelectItem>
                        <SelectItem value="onboarding">New Employee Onboarding</SelectItem>
                        <SelectItem value="compliance">Compliance Training</SelectItem>
                        <SelectItem value="curriculum">Academic Curriculum</SelectItem>
                        <SelectItem value="professional_development">Professional Development</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your requirements, timeline, or any questions you have..."
                      rows={4}
                      data-testid="quote-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] font-semibold py-6"
                    disabled={isSubmitting}
                    data-testid="quote-submit-btn"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SGA as European Contact */}
      <section className="py-20 bg-gradient-to-br from-[#0f1f3d] via-[#1a3a5c] to-[#0f1f3d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b1538] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <img 
                src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp" 
                alt="Saint-Georges Academy"
                className="h-16 w-auto object-contain"
              />
            </div>
            
            <Badge className="bg-white/10 text-white border border-white/20 mb-6">Your European Contact</Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Saint-Georges Academy
            </h2>
            
            <p className="text-xl text-[#d4af37] font-medium mb-4">
              Official Reseller in Europe for The World of Haiku
            </p>
            
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Saint-Georges Academy serves as your commercial contact point in Europe for 
              World of Haiku licences. We provide pre-sales consultation, deployment guidance, 
              and ongoing support for organisations across Europe.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <a href="mailto:contact@saint-georges.academy" className="flex items-center gap-2 text-white/80 hover:text-[#d4af37] transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@saint-georges.academy</span>
              </a>
              <a href="tel:+33549227510" className="flex items-center gap-2 text-white/80 hover:text-[#d4af37] transition-colors">
                <Phone className="w-5 h-5" />
                <span>+33 (0)5 49 22 75 10</span>
              </a>
            </div>

            <Button 
              size="lg" 
              className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] font-semibold px-8 py-6 text-lg"
              onClick={() => navigate('/contact')}
              data-testid="contact-sga-btn"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Speak with Saint-Georges Academy
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-[#8b1538]/10 text-[#8b1538] mb-4">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#0f1f3d] rounded-lg flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0f1f3d] mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              Ready to Strengthen Your Cybersecurity Awareness?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Whether you're an individual learner or representing an organisation, 
              we're here to help you get started with World of Haiku.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] font-semibold px-8 py-6 text-lg"
                onClick={handleIndividualStart}
                data-testid="final-cta-individual"
              >
                Start as an Individual — €19/month
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-[#0f1f3d] text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white px-8 py-6 text-lg"
                onClick={() => document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' })}
                data-testid="final-cta-quote"
              >
                Request a Company or Education Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorldOfHaiku;
