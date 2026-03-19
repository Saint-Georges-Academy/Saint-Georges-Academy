import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { 
  CheckCircle, 
  Shield,
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
  Terminal,
  Lock,
  Sparkles,
  BookOpen,
  Award,
  TrendingUp,
  Globe,
  MessageCircle,
  Monitor,
  Layers,
  Cpu,
  Eye,
  Clock,
  BarChart3,
  Lightbulb,
  Rocket,
  Volume2,
  VolumeX,
  Pause
} from 'lucide-react';

const WorldOfHaiku = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Benefits for individuals
  const individualBenefits = [
    { icon: TrendingUp, title: "Affordable Monthly Access", desc: "Just €19/month for full platform access — a fraction of traditional training costs" },
    { icon: Target, title: "Practical & Engaging Learning", desc: "Learn by doing, not just watching. Every action builds real cybersecurity skills" },
    { icon: Rocket, title: "Accessible Entry Point", desc: "No prerequisites needed. Start your cybersecurity journey from zero" },
    { icon: Lightbulb, title: "Modern Learning Alternative", desc: "Escape passive video courses. Immersive learning that actually sticks" },
    { icon: Terminal, title: "Real Linux Skills", desc: "Develop practical command-line and system administration abilities" },
    { icon: Trophy, title: "Track Your Progress", desc: "Clear progression metrics and achievements to celebrate your growth" }
  ];

  // Benefits for institutions
  const institutionBenefits = [
    { icon: Sparkles, title: "Innovative Cyber Education", desc: "Bring cutting-edge pedagogy to your cybersecurity curriculum" },
    { icon: Users, title: "Unmatched Student Engagement", desc: "Transform passive learners into motivated cybersecurity practitioners" },
    { icon: Layers, title: "Flexible Deployment", desc: "Scale from a single classroom to entire institutions with ease" },
    { icon: BookOpen, title: "Modern Teaching Support", desc: "Complement lectures with hands-on, immersive lab experiences" },
    { icon: BarChart3, title: "Analytics & Reporting", desc: "Track student progress with detailed performance dashboards" },
    { icon: Shield, title: "Safe Learning Sandbox", desc: "Students practice real techniques in a controlled, secure environment" }
  ];

  // Why immersive learning works
  const immersiveBenefits = [
    { stat: "90%", label: "Knowledge Retention", desc: "Learning by doing retains 90% vs 10% for reading" },
    { stat: "3x", label: "Higher Engagement", desc: "Immersive platforms increase engagement by 300%" },
    { stat: "2x", label: "Faster Skill Acquisition", desc: "Achieve competency in weeks, not months" },
    { stat: "∞", label: "Motivation Factor", desc: "Gamification keeps learners coming back" }
  ];

  // Why Saint-Georges Academy
  const academyBenefits = [
    { icon: Award, title: "Official Reseller", desc: "Authorized partner with direct publisher relationship and support" },
    { icon: MessageCircle, title: "Local Expert Support", desc: "French and English language assistance, personalized guidance" },
    { icon: Globe, title: "Integrated Training Path", desc: "Combine with our CCNA, CyberOps, and other cybersecurity programmes" },
    { icon: GraduationCap, title: "Educational Expertise", desc: "Over a decade of Cisco Networking Academy experience" }
  ];

  // FAQ data
  const faqs = [
    {
      q: "What exactly is The World of Haiku?",
      a: "The World of Haiku is a professional cybersecurity learning platform that uses immersive, game-based mechanics to teach real-world security skills. Unlike passive video courses, learners actively engage with realistic scenarios, developing practical Linux, networking, and security competencies through hands-on challenges."
    },
    {
      q: "Who should use this platform?",
      a: "The World of Haiku serves two primary audiences: individuals seeking an engaging path into cybersecurity (students, career changers, IT professionals), and educational institutions looking to modernize their cyber curriculum with practical, immersive learning experiences."
    },
    {
      q: "Is this just a video game?",
      a: "No. While The World of Haiku incorporates game mechanics to enhance engagement, it's fundamentally a serious learning platform. The immersive format is a pedagogical choice — research shows that active, experiential learning dramatically outperforms passive instruction for technical skill development."
    },
    {
      q: "What skills will learners develop?",
      a: "Learners build practical competencies including Linux command line, network security fundamentals, system hardening, threat detection, penetration testing concepts, and defensive security strategies. All skills are industry-relevant and transfer directly to professional practice."
    },
    {
      q: "Do learners need prior experience?",
      a: "No prior cybersecurity or Linux experience is required. The platform is designed with progressive challenges that take learners from complete beginner to proficient practitioner."
    },
    {
      q: "How does institutional pricing work?",
      a: "Educational institutions receive customized volume pricing based on learner count and deployment scope. Contact Saint-Georges Academy for a tailored quote that includes implementation support, analytics dashboards, and curriculum integration guidance."
    },
    {
      q: "Why purchase through Saint-Georges Academy?",
      a: "As an official reseller, we provide local support, bilingual assistance (French/English), expertise in educational deployment, and the ability to integrate Haiku into a broader cybersecurity training pathway including Cisco certifications."
    },
    {
      q: "Can institutions try before committing?",
      a: "Yes. Contact Saint-Georges Academy to discuss pilot programmes and demonstration options for educational partners."
    },
    {
      q: "Does this replace traditional cybersecurity training?",
      a: "The World of Haiku excels as both a standalone learning path and a complement to traditional instruction. Many institutions use it alongside existing curriculum to add the practical, hands-on component that lectures inherently lack."
    },
    {
      q: "What support is included?",
      a: "Individual subscribers receive platform access and community support. Institutional clients receive dedicated onboarding, deployment assistance, analytics access, and ongoing Saint-Georges Academy support."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#1a0a2e] to-[#0a0f1a]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badges */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
              <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-1.5">
                <Shield className="w-4 h-4 mr-2" />
                Cybersecurity Learning
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5">
                <Cpu className="w-4 h-4 mr-2" />
                Immersive Platform
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-1.5">
                <Terminal className="w-4 h-4 mr-2" />
                Practical Skills
              </Badge>
            </div>
            
            {/* Logo */}
            <img 
              src="https://customer-assets.emergentagent.com/job_sga-preview/artifacts/3ftzj0fb_image.png"
              alt="Haiku Inc."
              className="h-28 md:h-36 w-auto mx-auto mb-6"
            />
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">
                Cybersecurity Learning
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
              Master cybersecurity through immersive, hands-on experience
            </p>
            
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              The World of Haiku transforms cybersecurity education into an engaging, practical journey. 
              Develop real skills through an innovative platform designed for modern learners and forward-thinking institutions.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg shadow-lg shadow-red-500/25"
                asChild
              >
                <a href="#pricing">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Learning — €19/month
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg"
                asChild
              >
                <a href="#institutions">
                  <Building2 className="w-5 h-5 mr-2" />
                  Institutional Solutions
                </a>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No experience required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Industry-relevant skills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Official reseller support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Central Sales Element */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-red-500/20 text-red-400 border border-red-500/30">
              <Play className="w-4 h-4 mr-2" />
              See It In Action
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience The World of Haiku
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch how immersive learning transforms cybersecurity education
            </p>
          </div>
          
          {/* Video Player */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
            <div className="relative aspect-video bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl overflow-hidden border-2 border-red-500/30 shadow-2xl shadow-red-500/10">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="https://customer-assets.emergentagent.com/job_sga-preview/artifacts/3ftzj0fb_image.png"
                muted={isMuted}
                playsInline
                onEnded={() => setIsPlaying(false)}
              >
                <source src="https://customer-assets.emergentagent.com/job_2e4d9af3-45cd-47a7-9716-49578471fb53/artifacts/5gmhxpiu_HaikuGamePromo.mov" type="video/quicktime" />
                <source src="https://customer-assets.emergentagent.com/job_2e4d9af3-45cd-47a7-9716-49578471fb53/artifacts/5gmhxpiu_HaikuGamePromo.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls Overlay */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group"
                  onClick={handlePlayVideo}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-500/50">
                    <Play className="w-12 h-12 text-white ml-2" />
                  </div>
                </div>
              )}
              
              {/* Control buttons */}
              {isPlaying && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={handlePlayVideo}
                    className="p-3 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
                  >
                    <Pause className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    onClick={toggleMute}
                    className="p-3 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            The World of Haiku — Where cybersecurity learning meets innovation
          </p>
        </div>
      </section>

      {/* What is The World of Haiku */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-orange-500/20 text-orange-400 border border-orange-500/30">
                The Platform
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What is The World of Haiku?
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                The World of Haiku is a <span className="text-orange-400 font-semibold">professional cybersecurity learning platform</span> that revolutionizes how security skills are developed.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Unlike traditional courses that rely on passive video consumption, Haiku immerses learners in realistic scenarios where every action builds genuine competency. It's not a game pretending to teach — it's a serious learning platform leveraging immersive mechanics for maximum effectiveness.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Whether you're an individual seeking an accessible entry into cybersecurity or an institution looking to modernize your curriculum, The World of Haiku delivers practical, engaging, and measurable learning outcomes.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Monitor, text: "Immersive learning environment" },
                  { icon: Terminal, text: "Real Linux & security skills" },
                  { icon: Target, text: "Practical, hands-on challenges" },
                  { icon: TrendingUp, text: "Clear progression pathway" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#1e293b] rounded-xl">
                    <item.icon className="w-5 h-5 text-orange-400" />
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-orange-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">A Serious Learning Platform</h3>
                  <p className="text-gray-400 mb-6">
                    Immersive format. Professional outcomes. Real-world skills.
                  </p>
                  <div className="space-y-3 text-left">
                    {[
                      "Industry-relevant competencies",
                      "Progressive skill building",
                      "Practical cybersecurity experience",
                      "Modern digital pedagogy"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Immersive Learning Works */}
      <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#1a0a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-red-500/20 text-red-400 border border-red-500/30">
              <Brain className="w-4 h-4 mr-2" />
              The Science of Learning
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Immersive Learning Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Traditional cybersecurity training fails because it's passive. Immersive platforms engage active learning — 
              the most effective way to develop technical skills that transfer to real-world practice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {immersiveBenefits.map((item, i) => {
              const colors = ['red', 'orange', 'amber', 'yellow'];
              const color = colors[i % colors.length];
              return (
                <Card key={i} className={`bg-gradient-to-br from-${color}-500/20 to-${color}-500/5 border-${color}-500/30 border text-center`}>
                  <CardContent className="p-8">
                    <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-${color}-400 to-orange-400 mb-2`}>
                      {item.stat}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 max-w-2xl mx-auto">
              Research consistently shows that <span className="text-orange-400 font-semibold">learning by doing</span> dramatically 
              outperforms passive instruction. The World of Haiku applies this principle to cybersecurity education.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Sections */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Who Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Designed for Two Audiences
            </h2>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'individual'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                  : 'bg-[#1e293b] text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Individual Learners
            </button>
            <button
              onClick={() => setActiveTab('institution')}
              id="institutions"
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'institution'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                  : 'bg-[#1e293b] text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5 inline mr-2" />
              Educational Institutions
            </button>
          </div>
          
          {/* Individual Benefits */}
          {activeTab === 'individual' && (
            <div>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">For Individual Learners</h3>
                <p className="text-gray-400">
                  Looking for an engaging, affordable path into cybersecurity? The World of Haiku offers 
                  a modern alternative to passive online courses — practical learning that actually sticks.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {individualBenefits.map((benefit, i) => (
                  <Card key={i} className="bg-[#111827]/50 border-gray-700/50 hover:border-orange-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                          <p className="text-sm text-gray-400">{benefit.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Institution Benefits */}
          {activeTab === 'institution' && (
            <div>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">For Educational Institutions</h3>
                <p className="text-gray-400">
                  Transform your cybersecurity curriculum with an innovative platform that engages students 
                  and delivers measurable learning outcomes. Flexible deployment, modern pedagogy, and dedicated support.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutionBenefits.map((benefit, i) => (
                  <Card key={i} className="bg-[#111827]/50 border-gray-700/50 hover:border-red-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                          <p className="text-sm text-gray-400">{benefit.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#0f172a] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-red-500/20 text-red-400 border border-red-500/30">
              Simple Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-400">
              Accessible for individuals. Flexible for institutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Individual Plan */}
            <Card className="bg-[#111827]/80 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
              <CardHeader className="text-center pb-4 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Individual Licence</CardTitle>
                <p className="text-gray-400">For personal cybersecurity learning</p>
              </CardHeader>
              <CardContent className="text-center relative">
                <div className="mb-6">
                  <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">€19</span>
                  <span className="text-gray-400 text-xl">/month</span>
                </div>
                
                <p className="text-gray-400 text-sm mb-6">
                  Full platform access at an accessible price point
                </p>
                
                <ul className="space-y-3 text-left mb-8">
                  {[
                    "Complete platform access",
                    "All challenges & scenarios",
                    "Progress tracking & analytics",
                    "Achievement system",
                    "Community access",
                    "Regular content updates",
                    "Cancel anytime"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-lg">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-gray-500 text-xs mt-4">
                  Secure payment • Instant access
                </p>
              </CardContent>
            </Card>
            
            {/* Institution Plan */}
            <Card className="bg-[#111827]/80 border-2 border-red-500/30 hover:border-red-500/50 transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-500 text-white">
                  <Building2 className="w-3 h-3 mr-1" />
                  Enterprise
                </Badge>
              </div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
              <CardHeader className="text-center pb-4 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Educational Institution</CardTitle>
                <p className="text-gray-400">For schools, universities & training centres</p>
              </CardHeader>
              <CardContent className="text-center relative">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Custom Quote</span>
                  <p className="text-gray-400 text-sm mt-2">Pricing adapted to your scale & needs</p>
                </div>
                
                <p className="text-gray-400 text-sm mb-6">
                  Volume licensing with dedicated institutional support
                </p>
                
                <ul className="space-y-3 text-left mb-8">
                  {[
                    "Volume-based licensing",
                    "Admin dashboard & analytics",
                    "Student progress tracking",
                    "Curriculum integration support",
                    "Dedicated onboarding",
                    "Priority support channel",
                    "Pilot programme available"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-6 text-lg" asChild>
                  <Link to="/contact">
                    Request a Quote
                    <MessageCircle className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <p className="text-gray-500 text-xs mt-4">
                  Speak with Saint-Georges Academy
                </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Buy Through Saint-Georges Academy?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              As an official reseller, we provide more than just a licence — 
              we provide expertise, support, and integration into a broader cybersecurity learning pathway.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academyBenefits.map((item, i) => (
              <div key={i} className="text-center p-6 bg-[#111827]/50 rounded-2xl border border-gray-700/50 hover:border-[#d4af37]/30 transition-all">
                <div className="w-14 h-14 bg-[#d4af37]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-block bg-[#111827]/80 border border-[#d4af37]/30 rounded-2xl p-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_ccna-loudun/artifacts/klaxr3o2_logo%20saint%20georges.webp"
                alt="Saint-Georges Academy"
                className="h-16 w-auto mx-auto bg-white rounded-xl p-3"
              />
              <p className="text-gray-400 text-sm mt-4">
                Cisco Networking Academy Partner Since 2010
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Questions & Answers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#111827]/50 border border-gray-700/50 rounded-xl px-6">
                <AccordionTrigger className="text-white text-left hover:text-orange-400 py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-red-900/30 via-orange-900/20 to-amber-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Shield className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Cybersecurity Learning?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the future of cybersecurity education. Whether you're starting your personal journey 
            or bringing innovation to your institution, The World of Haiku delivers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-12 py-7 text-xl shadow-lg shadow-red-500/25"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Get Your Licence — €19/month
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-12 py-7 text-xl"
              asChild
            >
              <Link to="/contact">
                <Building2 className="w-6 h-6 mr-2" />
                Bring Haiku to Your Institution
              </Link>
            </Button>
          </div>
          
          <p className="text-gray-400 text-sm">
            Questions? <Link to="/contact" className="text-orange-400 hover:underline">Speak with Saint-Georges Academy</Link>
          </p>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 bg-[#0a0f1a] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>2 venelle des Amandiers, 86200 Loudun, France</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-400" />
              <a href="mailto:contact@saint-georges.academy" className="hover:text-orange-400">contact@saint-georges.academy</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" />
              <span>+33 (0)5 49 22 75 10</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorldOfHaiku;
