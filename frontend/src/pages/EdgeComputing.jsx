import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { 
  CheckCircle, 
  Clock, 
  Award, 
  Users,
  BookOpen,
  Target,
  Shield,
  Server,
  Wifi,
  Globe,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Loader2,
  Video,
  Cpu,
  Cloud,
  Activity,
  Radio,
  Thermometer,
  TreePine,
  Building2,
  Ambulance,
  Tv,
  Landmark,
  FileCheck,
  Briefcase,
  Star,
  Zap,
  Lock,
  MessageCircle,
  CalendarCheck,
  ChevronRight,
  Play
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const EdgeComputing = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/payments/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: 'edge_computing_online',
          origin_url: window.location.origin,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      window.location.href = url;
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Unable to process. Please try again or contact us.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Programme modules
  const programmeModules = [
    {
      title: "Edge Computing Fundamentals",
      topics: ["Distributed computing architecture", "Edge vs Cloud paradigms", "Latency optimization", "Local data processing", "Offline-first design patterns"]
    },
    {
      title: "Smart City Infrastructure",
      topics: ["IoT sensor networks", "Municipal service integration", "Public infrastructure connectivity", "Smart lighting & utilities", "Citizen service platforms"]
    },
    {
      title: "Environmental Monitoring Systems",
      topics: ["Flood detection & early warning", "Fire risk monitoring", "Water quality analysis", "Salinity & acidity sensors", "Air pollution tracking", "Temperature monitoring networks"]
    },
    {
      title: "Advanced Monitoring Applications",
      topics: ["Sound pollution measurement", "Traffic flow regulation", "Wildlife & forest monitoring", "Smart agriculture systems", "Border-area situational awareness"]
    },
    {
      title: "Critical Communications",
      topics: ["Hospital emergency systems", "First responder networks", "Resilient offline communications", "Local TV & radio continuity", "Wi-Fi-based geolocation"]
    },
    {
      title: "Cybersecurity & Stormshield",
      topics: ["Network perimeter security", "Stormshield firewall deployment", "Threat detection & response", "Secure municipal networks", "CSNA certification preparation"]
    }
  ];

  // Skills acquired
  const skills = [
    "Design edge computing architectures for territorial resilience",
    "Deploy environmental monitoring sensor networks",
    "Configure Stormshield firewalls for municipal security",
    "Build crisis-mode communication systems",
    "Implement smart city service platforms",
    "Develop offline-capable territorial infrastructure",
    "Create real-time monitoring dashboards",
    "Secure critical municipal communications",
    "Plan and execute smart territory projects"
  ];

  // Who is this for
  const targetAudience = [
    { icon: Building2, title: "Municipal IT Directors", desc: "Leading digital transformation in local government" },
    { icon: Landmark, title: "Local Authorities", desc: "Planning smart territory initiatives" },
    { icon: Shield, title: "Cybersecurity Professionals", desc: "Expanding into critical infrastructure" },
    { icon: Server, title: "Network Engineers", desc: "Transitioning to edge architectures" },
    { icon: Users, title: "Technical Consultants", desc: "Advising public sector clients" },
    { icon: GraduationCap, title: "Career Changers", desc: "Entering the smart city sector" }
  ];

  // FAQ data
  const faqs = [
    {
      q: "Why is this programme priced at €4,500?",
      a: "This is a premium professional programme combining rare expertise, a real-world case study, weekly live tutoring with an expert instructor, practical project work, portfolio-producing deliverables, and official certification preparation. The investment reflects the strategic value and career advancement potential this programme delivers."
    },
    {
      q: "What makes the Metković case study valuable?",
      a: "Metković represents a perfect microcosm of smart territory challenges: environmental monitoring (floods, fires), critical communications, border-area awareness, and municipal service resilience. Learning through this real case study means you work on actual problems that translate directly to professional practice."
    },
    {
      q: "How does the weekly tutoring work?",
      a: "Every week, you have a scheduled 1-hour live video session with your instructor. These sessions cover concept clarification, project guidance, progress review, and personalized support. You are never left alone in your learning journey."
    },
    {
      q: "What is the Stormshield CSNA certification?",
      a: "CSNA (Certified Stormshield Network Administrator) is an industry-recognized certification validating your ability to deploy and manage Stormshield firewall solutions. This programme prepares you fully, and you can sit the official exam at the end."
    },
    {
      q: "What will my capstone project look like?",
      a: "You will design a complete edge computing infrastructure for a territorial scenario, including sensor networks, communication systems, cybersecurity architecture, and resilience planning. This becomes a portfolio piece demonstrating your professional capabilities."
    },
    {
      q: "Is prior experience required?",
      a: "Basic networking knowledge and IT familiarity are recommended. The programme is designed for professionals looking to specialize, not absolute beginners. If unsure, contact us for a positioning assessment."
    },
    {
      q: "Can my organization fund this programme?",
      a: "Yes. Many employers and public institutions fund professional development. We provide documentation for OPCO funding, employer reimbursement, and institutional procurement processes."
    },
    {
      q: "What certificate do I receive?",
      a: "Upon successful completion, you receive a Certificate of Achievement from Saint-Georges Academy documenting your competencies. Additionally, you can pursue the official Stormshield CSNA certification."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-4 py-1.5">
                  <Cpu className="w-4 h-4 mr-2" />
                  Premium Programme
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5">
                  <Shield className="w-4 h-4 mr-2" />
                  Stormshield CSNA Prep
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Edge Computing for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Smart Territories
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                Resilience, Smart City Services & Cybersecurity
              </p>
              
              <p className="text-lg text-gray-400 mb-8">
                Through the <span className="text-cyan-400 font-semibold">Metković Case Study</span> — A real territorial transformation in Croatia
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>3 Months</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Video className="w-5 h-5 text-cyan-400" />
                  <span>Weekly Live Tutoring</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>Certificate + CSNA</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleEnroll}
                  disabled={isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold px-8 py-6 text-lg shadow-lg shadow-cyan-500/25"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                  Enroll Now — €4,500
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg"
                  asChild
                >
                  <a href="#programme">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Programme
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Hero Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl"></div>
              <Card className="relative bg-[#111827]/80 backdrop-blur-xl border-gray-700/50 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_sga-preview/artifacts/n98ve9w4_image.png"
                      alt="Stormshield"
                      className="h-16 w-auto mx-auto mb-4 object-contain"
                    />
                    <h3 className="text-2xl font-bold text-white mb-2">Professional Investment</h3>
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2">
                      €4,500
                    </div>
                    <p className="text-gray-400">Complete 3-month programme</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "12 weeks of structured learning",
                      "12 hours of live 1-on-1 tutoring",
                      "Practical labs & exercises",
                      "Real-world capstone project",
                      "Certificate of Achievement",
                      "Stormshield CSNA preparation",
                      "Portfolio-ready deliverables"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleEnroll}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold py-6 text-lg"
                  >
                    Secure Your Place
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Secure payment via Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What is Edge Computing */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Understanding the Foundation
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              What is Edge Computing?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Edge computing is a model where data is processed <span className="text-cyan-400 font-semibold">closer to where it is produced</span>, rather than relying only on distant cloud servers.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                For a town like <span className="text-emerald-400 font-semibold">Metković</span>, this means sensors, local services, and communication systems can:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Zap, text: "React faster to events" },
                  { icon: Wifi, text: "Work during internet outages" },
                  { icon: Shield, text: "Reduce external dependence" },
                  { icon: Activity, text: "Support critical services" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-[#1e293b] rounded-xl">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border border-gray-700/50">
              <h4 className="text-lg font-semibold text-white mb-6">Critical Services Enabled:</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Thermometer, text: "Environmental Monitoring" },
                  { icon: Ambulance, text: "Emergency Response" },
                  { icon: Building2, text: "Hospital Communications" },
                  { icon: Activity, text: "Traffic Management" },
                  { icon: Tv, text: "Local Media Continuity" },
                  { icon: Lock, text: "Secure Infrastructure" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400">
                    <item.icon className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Programme Matters */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Strategic Relevance
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Why This Programme Matters
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Smart territories are the future of municipal governance. This programme positions you at the intersection of technology, resilience, and public service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Rare Expertise",
                desc: "Edge computing for territories is an emerging field with few qualified professionals. Position yourself as an expert in a high-demand niche."
              },
              {
                icon: Target,
                title: "Real-World Application",
                desc: "Learn through the Metković case study — a genuine territorial transformation, not theoretical exercises."
              },
              {
                icon: Shield,
                title: "Cybersecurity Integration",
                desc: "Master Stormshield firewall deployment and prepare for the CSNA certification — a critical skill for securing public infrastructure."
              }
            ].map((item, i) => (
              <Card key={i} className="bg-[#111827]/50 border-gray-700/50 hover:border-cyan-500/30 transition-all">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Metković Case Study */}
      <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Real-World Case Study
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Metković?
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Metković, a town in Croatia's Neretva Delta near the Bosnian border, presents a 
                <span className="text-cyan-400 font-semibold"> perfect microcosm of smart territory challenges</span>:
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Activity, title: "Environmental Vulnerability", desc: "Flood-prone delta requiring advanced monitoring" },
                  { icon: MapPin, title: "Border Proximity", desc: "Situational awareness near Bosnia and Herzegovina" },
                  { icon: Radio, title: "Communication Resilience", desc: "Critical services must work during outages" },
                  { icon: TreePine, title: "Natural Heritage", desc: "Wildlife and ecosystem monitoring needs" },
                  { icon: Building2, title: "Municipal Services", desc: "Schools, hospitals, local media infrastructure" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-[#1e293b]/50 rounded-xl border border-gray-700/30">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-[#111827]/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Metković, Croatia
                </h3>
                <div className="aspect-video bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl flex items-center justify-center mb-6 border border-gray-700/30">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-cyan-400/50 mx-auto mb-3" />
                    <p className="text-gray-500">Neretva Delta Region</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Your capstone project will design real infrastructure for this territory — creating portfolio-ready deliverables with genuine professional value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Content */}
      <section id="programme" className="py-24 bg-[#0a0f1a] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Comprehensive Curriculum
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              What You Will Learn
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Six intensive modules covering edge infrastructure, smart city services, environmental monitoring, and cybersecurity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmeModules.map((module, i) => (
              <Card key={i} className="bg-[#111827]/50 border-gray-700/50 hover:border-emerald-500/30 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <CardTitle className="text-lg text-white">{module.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <ChevronRight className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Acquired */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Professional Competencies
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                Skills You Will Acquire
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Leave this programme with demonstrable, portfolio-ready capabilities that translate directly to professional practice.
              </p>
            </div>
            
            <div className="space-y-3">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#1e293b]/50 rounded-xl border border-gray-700/30">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Tutoring Support */}
      <section className="py-24 bg-gradient-to-br from-cyan-900/20 to-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Premium Support
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              You Are Never Alone
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every week, you receive <span className="text-cyan-400 font-semibold">1 hour of live video tutoring</span> with an expert instructor throughout the full 3-month programme.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: BookOpen, title: "Concept Clarification", desc: "Understand difficult topics with personalized explanation" },
              { icon: Target, title: "Project Guidance", desc: "Expert direction for your capstone and labs" },
              { icon: CalendarCheck, title: "Progress Review", desc: "Regular check-ins to keep you on track" },
              { icon: MessageCircle, title: "Motivation", desc: "Accountability and encouragement throughout" },
              { icon: Users, title: "Personalized Help", desc: "Tailored support for your specific needs" }
            ].map((item, i) => (
              <Card key={i} className="bg-[#111827]/80 border-gray-700/50 text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-[#111827]/80 border border-cyan-500/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <Video className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">12 Hours of Direct Expert Access</h3>
            <p className="text-gray-400">
              Over 3 months, you accumulate <span className="text-cyan-400 font-semibold">12 hours of personalized tutoring</span> — a premium mentoring experience that justifies alone a significant portion of the programme value.
            </p>
          </div>
        </div>
      </section>

      {/* Certificate of Achievement */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-amber-500/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-2 border-[#d4af37]/50 rounded-3xl p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Certificate of Achievement</h3>
                  <p className="text-[#d4af37] font-semibold mb-4">Saint-Georges Academy</p>
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-gray-400 text-sm">
                      Edge Computing for Smart Territories
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Awarded upon successful completion
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Badge className="mb-6 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                Professional Credential
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                Certificate of Achievement
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Evidence your learning with a <span className="text-[#d4af37] font-semibold">Certificate of Achievement</span> from Saint-Georges Academy upon successful completion of the course.
              </p>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Documents your professional competencies in edge computing and smart territories</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Validates completion of practical labs and capstone project</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>Enhances your CV and professional portfolio</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stormshield CSNA Certification */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-red-500/20 text-red-400 border border-red-500/30">
                Industry Certification
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                Stormshield CSNA Preparation
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                This programme includes comprehensive preparation for the <span className="text-red-400 font-semibold">Stormshield Certified Network Administrator (CSNA)</span> certification.
              </p>
              <p className="text-gray-400 mb-8">
                Upon completion, you have the option to sit the official CSNA exam — a recognized industry certification that validates your ability to deploy, configure, and manage Stormshield firewall solutions.
              </p>
              
              <div className="bg-[#1e293b]/50 rounded-xl p-6 border border-gray-700/30">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  Employability Benefits
                </h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Industry-recognized cybersecurity credential
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Validates practical firewall deployment skills
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Strong differentiator for security roles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Recognized by enterprises and public sector
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-[#111827]/80 border border-gray-700/50 rounded-3xl p-8 text-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_sga-preview/artifacts/n98ve9w4_image.png"
                  alt="Stormshield"
                  className="h-32 w-auto mx-auto mb-6 object-contain"
                />
                <h3 className="text-xl font-bold text-white mb-2">CSNA Certification</h3>
                <p className="text-gray-400 mb-6">Stormshield Certified Network Administrator</p>
                <div className="bg-[#1e293b] rounded-lg p-4 text-left">
                  <p className="text-sm text-gray-300">
                    <span className="text-emerald-400">✓</span> Full exam preparation included
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    <span className="text-emerald-400">✓</span> Option to sit official exam
                  </p>
                  <p className="text-sm text-gray-400 mt-2 text-xs">
                    * Exam fee not included in programme price
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capstone Project */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Portfolio-Ready Deliverable
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Final Capstone Project
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Design a complete edge computing infrastructure for a smart territory — a genuine professional deliverable that demonstrates your capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Server, title: "Infrastructure Design", desc: "Edge node architecture and sensor networks" },
              { icon: Radio, title: "Communication Systems", desc: "Resilient offline-capable networks" },
              { icon: Shield, title: "Security Architecture", desc: "Stormshield firewall deployment" },
              { icon: FileCheck, title: "Documentation", desc: "Professional technical documentation" }
            ].map((item, i) => (
              <Card key={i} className="bg-[#111827]/50 border-gray-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Target Audience
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Who This Programme Is For
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((item, i) => (
              <Card key={i} className="bg-[#111827]/50 border-gray-700/50 hover:border-cyan-500/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Format */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Programme Structure
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Learning Format & Duration
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Clock, value: "3 Months", label: "Programme Duration" },
              { icon: Globe, value: "100% Online", label: "Learning Format" },
              { icon: Video, value: "12 Hours", label: "Live Tutoring" },
              { icon: BookOpen, value: "6 Modules", label: "Comprehensive Content" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-[#111827]/50 rounded-xl border border-gray-700/50">
                <item.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why The Investment Is Justified */}
      <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
              Value Proposition
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Why This Investment Makes Sense
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              €4,500 is a <span className="text-[#d4af37] font-semibold">strategic professional investment</span> that delivers exceptional value across multiple dimensions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Rare Expertise", desc: "Edge computing for territories is an emerging field with few training options" },
              { title: "Real Case Study", desc: "Metković provides genuine, transferable professional experience" },
              { title: "Premium Support", desc: "12 hours of live expert tutoring — direct access to knowledge" },
              { title: "Portfolio Value", desc: "Capstone project becomes a professional asset" },
              { title: "Dual Certification", desc: "Academy certificate + CSNA preparation" },
              { title: "Career Positioning", desc: "Enter the smart territory and cybersecurity sectors" },
              { title: "Practical Labs", desc: "Hands-on experience with real technologies" },
              { title: "Strategic Relevance", desc: "Smart cities are the future of public infrastructure" },
              { title: "Professional Network", desc: "Connect with experts in the field" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-[#1e293b]/30 rounded-xl border border-gray-700/30">
                <div className="w-8 h-8 bg-[#d4af37]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Questions & Answers
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#111827]/50 border border-gray-700/50 rounded-xl px-6">
                <AccordionTrigger className="text-white text-left hover:text-cyan-400 py-6">
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
      <section className="py-24 bg-gradient-to-br from-cyan-900/30 to-emerald-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Lead Smart Territory Transformation?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join an elite cohort of professionals mastering edge computing, smart city infrastructure, and cybersecurity for the territories of tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleEnroll}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold px-12 py-7 text-xl shadow-lg shadow-cyan-500/25"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <ArrowRight className="w-6 h-6 mr-2" />}
              Enroll Now — €4,500
            </Button>
          </div>
          
          <p className="text-gray-400 text-sm">
            Secure payment via Stripe • Questions? <Link to="/contact" className="text-cyan-400 hover:underline">Contact us</Link>
          </p>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 bg-[#0a0f1a] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>2 venelle des Amandiers, 86200 Loudun, France</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <a href="mailto:contact@saint-georges.academy" className="hover:text-cyan-400">contact@saint-georges.academy</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>+33 (0)5 49 22 75 10</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EdgeComputing;
