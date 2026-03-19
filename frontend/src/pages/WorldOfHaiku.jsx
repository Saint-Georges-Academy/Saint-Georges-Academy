import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { 
  CheckCircle, 
  Shield,
  Gamepad2,
  GraduationCap,
  Users,
  Building2,
  Zap,
  Target,
  Brain,
  Trophy,
  Play,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Star,
  Monitor,
  Terminal,
  Lock,
  Sparkles,
  BookOpen,
  Award,
  TrendingUp,
  Globe,
  MessageCircle
} from 'lucide-react';

const WorldOfHaiku = () => {
  const [activeTab, setActiveTab] = useState('individual');

  // Benefits for individuals
  const individualBenefits = [
    { icon: Gamepad2, title: "Learn by Playing", desc: "Master cybersecurity concepts through engaging gameplay, not boring lectures" },
    { icon: Terminal, title: "Real Linux Skills", desc: "Develop practical command-line and system administration abilities" },
    { icon: TrendingUp, title: "Track Progress", desc: "Monitor your skill development with clear progression metrics" },
    { icon: Trophy, title: "Earn Achievements", desc: "Unlock badges and certifications as you advance" },
    { icon: Brain, title: "Retain Knowledge", desc: "Game-based learning improves long-term retention by up to 90%" },
    { icon: Zap, title: "Stay Motivated", desc: "Gamification keeps you engaged and coming back for more" }
  ];

  // Benefits for institutions
  const institutionBenefits = [
    { icon: Users, title: "Engage Students", desc: "Transform passive learners into active cybersecurity practitioners" },
    { icon: BookOpen, title: "Curriculum Integration", desc: "Seamlessly integrate into existing cybersecurity programmes" },
    { icon: Target, title: "Measurable Outcomes", desc: "Track student progress with detailed analytics and reporting" },
    { icon: Award, title: "Recognized Skills", desc: "Students develop industry-relevant competencies" },
    { icon: Building2, title: "Scalable Deployment", desc: "Deploy across classrooms, departments, or entire institutions" },
    { icon: Shield, title: "Safe Learning Environment", desc: "Practice real attacks and defenses in a controlled sandbox" }
  ];

  // FAQ data
  const faqs = [
    {
      q: "What is The World of Haiku?",
      a: "The World of Haiku is an immersive cybersecurity learning platform that combines video game mechanics with professional skill development. Players learn real-world cybersecurity and Linux skills through engaging gameplay, challenges, and missions."
    },
    {
      q: "Who is this platform for?",
      a: "The World of Haiku is designed for anyone interested in cybersecurity — from complete beginners to intermediate learners looking to strengthen their skills. It's perfect for students, career changers, IT professionals, and educational institutions."
    },
    {
      q: "Do I need prior experience?",
      a: "No prior cybersecurity or Linux experience is required. The platform is designed to take you from zero to proficient through progressive challenges that build on each other."
    },
    {
      q: "What skills will I learn?",
      a: "You'll develop practical skills including Linux command line, network security, system hardening, threat detection, penetration testing concepts, and defensive security strategies — all through hands-on gameplay."
    },
    {
      q: "How does institutional licensing work?",
      a: "Educational institutions receive volume pricing based on the number of learners. Contact Saint-Georges Academy for a customized quote that includes deployment support, analytics dashboards, and curriculum integration guidance."
    },
    {
      q: "Why purchase through Saint-Georges Academy?",
      a: "As an official reseller, Saint-Georges Academy provides local support, French-language assistance, integration with our broader cybersecurity training offerings, and expertise in educational deployment."
    },
    {
      q: "Is there a free trial?",
      a: "Contact Saint-Georges Academy to discuss trial options for individuals and institutions. We can arrange demonstrations and pilot programmes for educational partners."
    },
    {
      q: "Can this replace traditional cybersecurity training?",
      a: "The World of Haiku is an excellent complement to traditional training, providing the practical, hands-on component that lectures often lack. Many institutions use it alongside their existing curriculum to boost engagement and skill retention."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#1a0a2e] to-[#0a0f1a]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
              <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-4 py-1.5">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Game-Based Learning
              </Badge>
              <Badge className="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-4 py-1.5">
                <Shield className="w-4 h-4 mr-2" />
                Cybersecurity
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-4 py-1.5">
                <Terminal className="w-4 h-4 mr-2" />
                Linux Skills
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <img 
                src="https://customer-assets.emergentagent.com/job_sga-preview/artifacts/3ftzj0fb_image.png"
                alt="Haiku Inc."
                className="h-32 md:h-40 w-auto mx-auto mb-6"
              />
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-pink-400">
                The World of Haiku
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Master Cybersecurity Through Play
            </p>
            
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              An immersive game-based learning platform that transforms cybersecurity education into an engaging adventure. Develop real-world skills while having fun.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-6 text-lg shadow-lg shadow-purple-500/25"
                asChild
              >
                <a href="#pricing">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Your Licence — €19/month
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg"
                asChild
              >
                <a href="#video">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Video
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No experience required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Real cybersecurity skills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is The World of Haiku */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Revolutionary Learning
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                What is The World of Haiku?
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                The World of Haiku is a <span className="text-purple-400 font-semibold">groundbreaking cybersecurity learning platform</span> that reimagines how security skills are taught and acquired.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Unlike traditional courses with passive video watching, The World of Haiku drops you into an immersive game environment where every action teaches real cybersecurity concepts. You'll learn Linux commands, network security, threat detection, and defensive strategies — all while completing engaging missions and challenges.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Gamepad2, text: "Immersive game experience" },
                  { icon: Terminal, text: "Real Linux environment" },
                  { icon: Shield, text: "Practical security skills" },
                  { icon: Trophy, text: "Achievement system" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#1e293b] rounded-xl">
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-purple-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Gamepad2 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Learn. Play. Master.</h3>
                  <p className="text-gray-400 mb-6">
                    Transform your cybersecurity journey from boring to brilliant.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-400">100+</div>
                      <div className="text-xs text-gray-500">Challenges</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-pink-400">50+</div>
                      <div className="text-xs text-gray-500">Skills</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">∞</div>
                      <div className="text-xs text-gray-500">Replay Value</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-24 bg-[#0a0f1a] scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-pink-500/20 text-pink-400 border border-pink-500/30">
              See It In Action
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Discover The World of Haiku
            </h2>
            <p className="text-xl text-gray-400">
              Watch how game-based learning transforms cybersecurity education
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative aspect-video bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl overflow-hidden border-2 border-purple-500/30">
              {/* Placeholder for video - will be replaced with actual video URL */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-gray-400">Promotional Video</p>
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Game-Based Learning */}
      <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#1a0a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              The Science of Learning
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Game-Based Learning Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Traditional cybersecurity training fails because it's passive. Games engage active learning — the most effective way to develop real skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "90% Retention", desc: "Learning by doing retains 90% vs 10% for reading", color: "purple" },
              { icon: Zap, title: "3x Engagement", desc: "Gamification increases engagement by 300%", color: "pink" },
              { icon: Target, title: "Immediate Feedback", desc: "Know instantly if your approach works", color: "cyan" },
              { icon: TrendingUp, title: "Faster Progress", desc: "Achieve competency in weeks, not months", color: "green" }
            ].map((item, i) => {
              const colors = {
                purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
                pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400",
                cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
                green: "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400"
              };
              return (
                <Card key={i} className={`bg-gradient-to-br ${colors[item.color]} border`}>
                  <CardContent className="p-6 text-center">
                    <item.icon className={`w-10 h-10 mx-auto mb-4 ${colors[item.color].split(' ').pop()}`} />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Who Benefits
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Perfect For Everyone
            </h2>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'individual'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-[#1e293b] text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Individual Learners
            </button>
            <button
              onClick={() => setActiveTab('institution')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'institution'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-[#1e293b] text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5 inline mr-2" />
              Schools & Institutions
            </button>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'individual' ? individualBenefits : institutionBenefits).map((benefit, i) => (
              <Card key={i} className="bg-[#111827]/50 border-gray-700/50 hover:border-purple-500/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#0f172a] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-pink-500/20 text-pink-400 border border-pink-500/30">
              Simple Pricing
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-400">
              Start your cybersecurity journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual Plan */}
            <Card className="bg-[#111827]/80 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Individual Licence</CardTitle>
                <p className="text-gray-400">For personal learning</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">€19</span>
                  <span className="text-gray-400">/month</span>
                </div>
                
                <ul className="space-y-3 text-left mb-8">
                  {[
                    "Full game access",
                    "All challenges & missions",
                    "Progress tracking",
                    "Achievement badges",
                    "Community access",
                    "Regular updates"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6">
                  Get Started — €19/month
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Institution Plan */}
            <Card className="bg-[#111827]/80 border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-cyan-500 text-white">
                  <Building2 className="w-3 h-3 mr-1" />
                  Education
                </Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Educational Institution</CardTitle>
                <p className="text-gray-400">For schools & training centres</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Custom Quote</span>
                  <p className="text-gray-400 text-sm mt-1">Volume-based pricing</p>
                </div>
                
                <ul className="space-y-3 text-left mb-8">
                  {[
                    "Volume licensing",
                    "Admin dashboard",
                    "Student progress analytics",
                    "Curriculum integration",
                    "Dedicated support",
                    "Pilot programme available"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-6" asChild>
                  <Link to="/contact">
                    Request a Quote
                    <MessageCircle className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Saint-Georges Academy */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
              Official Reseller
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Saint-Georges Academy?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              As an official reseller, we provide more than just a licence — we provide a complete learning partnership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Official Partner", desc: "Authorized reseller with direct publisher relationship" },
              { icon: MessageCircle, title: "Local Support", desc: "French-language assistance and guidance" },
              { icon: Globe, title: "Integrated Training", desc: "Combine with our broader cybersecurity programmes" },
              { icon: Award, title: "Educational Expertise", desc: "Cisco Networking Academy experience since 2010" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-[#111827]/50 rounded-2xl border border-gray-700/50">
                <div className="w-14 h-14 bg-[#d4af37]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp"
              alt="Saint-Georges Academy"
              className="h-24 w-auto mx-auto bg-white rounded-xl p-4"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Questions & Answers
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#111827]/50 border border-gray-700/50 rounded-xl px-6">
                <AccordionTrigger className="text-white text-left hover:text-purple-400 py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Gamepad2 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Master Cybersecurity?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their cybersecurity skills through The World of Haiku.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-12 py-7 text-xl shadow-lg shadow-purple-500/25"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Start Learning — €19/month
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-12 py-7 text-xl"
              asChild
            >
              <Link to="/contact">
                <Building2 className="w-6 h-6 mr-2" />
                Institutional Quote
              </Link>
            </Button>
          </div>
          
          <p className="text-gray-400 text-sm">
            Questions? <Link to="/contact" className="text-purple-400 hover:underline">Contact Saint-Georges Academy</Link>
          </p>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 bg-[#0a0f1a] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>2 venelle des Amandiers, 86200 Loudun, France</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <a href="mailto:contact@saint-georges.academy" className="hover:text-purple-400">contact@saint-georges.academy</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-400" />
              <span>+33 (0)5 49 22 75 10</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorldOfHaiku;
