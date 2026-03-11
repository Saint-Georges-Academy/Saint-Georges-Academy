import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Server, Shield, Radio, School, AlertTriangle, Building2, 
  Users, Globe, Wifi, Cloud, Lock, Monitor, Flame, Waves,
  Thermometer, MapPin, Award, CheckCircle, ArrowRight, 
  BookOpen, Clock, Euro, Building, Landmark, Factory,
  GraduationCap, Network, Database, Cpu, HardDrive,
  Phone, Mail, Calendar, Target, Zap, TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const EdgeComputing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState('individual');

  const handleEnroll = (type) => {
    // Navigate to contact or checkout
    navigate('/contact', { state: { course: 'edge-computing', type } });
  };

  const courseModules = [
    {
      month: 1,
      title: "Foundations of Edge Computing",
      weeks: [
        { week: 1, topic: "Introduction to Edge Computing", description: "Understanding distributed computing, edge vs cloud, and local infrastructure concepts" },
        { week: 2, topic: "Digital Sovereignty & Local Infrastructure", description: "Why local hosting matters for municipalities, data privacy, and regulatory compliance" },
        { week: 3, topic: "Network Architecture Fundamentals", description: "Designing resilient local networks, redundancy patterns, and connectivity solutions" },
        { week: 4, topic: "Hardware & Deployment Strategies", description: "Selecting appropriate hardware, mini data centers, and deployment best practices" }
      ]
    },
    {
      month: 2,
      title: "Municipal Services & Applications",
      weeks: [
        { week: 5, topic: "Municipal Digital Services", description: "E-government platforms, citizen portals, and administrative digitization" },
        { week: 6, topic: "Local Media Infrastructure", description: "Setting up local TV, radio streaming, and community broadcasting systems" },
        { week: 7, topic: "Educational Institution Networks", description: "Connecting schools, e-learning platforms, and educational content delivery" },
        { week: 8, topic: "Tourism & Economic Services", description: "Digital tourism platforms, local business directories, and economic development tools" }
      ]
    },
    {
      month: 3,
      title: "Security, Monitoring & Resilience",
      weeks: [
        { week: 9, topic: "Environmental Monitoring Systems", description: "Flood sensors, fire detection, seismic alerts, and heat wave monitoring" },
        { week: 10, topic: "Stormshield Firewall Integration", description: "Dedicated module on enterprise firewall configuration and network protection" },
        { week: 11, topic: "Emergency Communication Systems", description: "Crisis communication, alert broadcasting, and disaster recovery" },
        { week: 12, topic: "Final Lab Project: Metković Infrastructure", description: "Complete design and simulation of edge infrastructure for Metković" }
      ]
    }
  ];

  const learningOutcomes = [
    { icon: Server, title: "Design Local Infrastructure", description: "Plan and architect edge computing deployments for municipalities and territories" },
    { icon: Shield, title: "Implement Cybersecurity", description: "Configure firewalls, secure networks, and protect critical municipal services" },
    { icon: Radio, title: "Deploy Local Media", description: "Set up community TV, radio, and digital broadcasting infrastructure" },
    { icon: School, title: "Connect Educational Networks", description: "Design and implement school networks with e-learning capabilities" },
    { icon: AlertTriangle, title: "Build Alert Systems", description: "Deploy environmental monitoring for floods, fires, earthquakes, and heat waves" },
    { icon: Wifi, title: "Enable Emergency Comms", description: "Create resilient communication systems for crisis situations" }
  ];

  const targetAudience = [
    { icon: Landmark, title: "Municipalities & Town Halls", description: "Local government IT teams and digital transformation officers" },
    { icon: Building2, title: "Local Authorities", description: "Regional development agencies and public sector innovators" },
    { icon: Factory, title: "SMEs & IT Companies", description: "Local tech providers and system integrators" },
    { icon: Shield, title: "Cybersecurity Providers", description: "Security firms expanding into infrastructure protection" },
    { icon: GraduationCap, title: "Schools & Training Centres", description: "Educational institutions seeking digital infrastructure expertise" },
    { icon: Users, title: "Smart City Teams", description: "Project managers and planners working on territorial digitization" }
  ];

  const stormshieldFeatures = [
    "Network segmentation and VLAN management",
    "Intrusion prevention and detection (IPS/IDS)",
    "Application control and filtering",
    "VPN configuration for remote sites",
    "Traffic analysis and monitoring",
    "High availability and failover setup",
    "Municipal service protection policies",
    "Compliance with European regulations"
  ];

  const metkovicUseCases = [
    { icon: Building, title: "Town Hall Services", description: "Centralized administrative platform with citizen portal" },
    { icon: Radio, title: "Local TV & Radio", description: "Community broadcasting for 15,000+ residents" },
    { icon: School, title: "School Network", description: "Connected classrooms and e-learning infrastructure" },
    { icon: Waves, title: "Flood Monitoring", description: "Neretva river delta sensor network and alerts" },
    { icon: Flame, title: "Fire Detection", description: "Forest fire early warning for surrounding areas" },
    { icon: Thermometer, title: "Climate Monitoring", description: "Heat wave alerts and environmental tracking" },
    { icon: Globe, title: "Tourism Platform", description: "Digital services for visitors and local businesses" },
    { icon: AlertTriangle, title: "Emergency System", description: "Crisis communication and disaster response" }
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
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-[#8b1538] text-white px-4 py-1.5 text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                3 Months Programme
              </Badge>
              <Badge className="bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 px-4 py-1.5 text-sm font-medium">
                <GraduationCap className="w-4 h-4 mr-2" />
                Beginner Level
              </Badge>
              <Badge className="bg-white/10 text-white border border-white/20 px-4 py-1.5 text-sm font-medium">
                <Globe className="w-4 h-4 mr-2" />
                Hybrid Online
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Edge Computing for
              <span className="block text-[#d4af37] mt-2">Smart Towns</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4 font-light">
              Build a Local Digital Infrastructure for Metković
            </p>
            
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-10">
              A comprehensive 3-month programme teaching edge computing fundamentals through a real-world case study: 
              designing local digital infrastructure for the town of Metković, Croatia.
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/80">
                <Server className="w-5 h-5 text-[#d4af37]" />
                <span>Local Infrastructure</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="w-5 h-5 text-[#d4af37]" />
                <span>Stormshield Module</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-5 h-5 text-[#d4af37]" />
                <span>Metković Lab Project</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="w-5 h-5 text-[#d4af37]" />
                <span>SGA Certificate</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] font-semibold px-8 py-6 text-lg"
                onClick={() => handleEnroll('individual')}
                data-testid="enroll-individual-btn"
              >
                Enrol as Individual
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#0f1f3d] px-8 py-6 text-lg"
                onClick={() => handleEnroll('group')}
                data-testid="book-group-btn"
              >
                Book Private Group
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => navigate('/contact')}
                data-testid="request-info-btn"
              >
                Request Information
              </Button>
            </div>

            {/* Price Preview */}
            <div className="mt-12 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Individual Price</p>
                <p className="text-3xl font-bold text-[#d4af37]">€3,000</p>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Private Group (up to 10)</p>
                <p className="text-3xl font-bold text-[#d4af37]">€20,000</p>
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

      {/* Why This Course Matters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#8b1538]/10 text-[#8b1538] mb-4">Why This Course Matters</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              The Future of Territorial Digital Infrastructure
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              As municipalities and territories seek digital sovereignty, edge computing emerges as the cornerstone 
              of resilient, secure, and locally-controlled digital infrastructure. This course prepares you to lead 
              this transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5c] text-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#d4af37]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Digital Sovereignty</h3>
                <p className="text-white/70">
                  Keep critical data and services local. Reduce dependency on distant cloud providers and maintain 
                  control over municipal digital assets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#8b1538]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-[#8b1538]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f1f3d] mb-3">Resilient Services</h3>
                <p className="text-gray-600">
                  Edge infrastructure ensures services remain operational during network outages, natural disasters, 
                  or connectivity disruptions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#d4af37]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f1f3d] mb-3">Economic Development</h3>
                <p className="text-gray-600">
                  Enable local businesses, tourism, and institutions with modern digital tools while keeping 
                  investment and expertise within the territory.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who This Course Is For */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#0f1f3d]/10 text-[#0f1f3d] mb-4">Target Audience</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              Who This Course Is For
            </h2>
            <p className="text-lg text-gray-600">
              Designed for professionals and organisations seeking to understand and implement 
              local digital infrastructure for territories and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {targetAudience.map((audience, index) => (
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

      {/* What Participants Will Learn */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#d4af37]/10 text-[#d4af37] mb-4">Learning Outcomes</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              What Participants Will Learn
            </h2>
            <p className="text-lg text-gray-600">
              Practical skills and knowledge to design, deploy, and manage edge computing 
              infrastructure for municipalities and territories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-[#0f1f3d] transition-colors duration-300">
                  <div className="w-14 h-14 bg-[#d4af37]/10 group-hover:bg-[#d4af37]/20 rounded-xl flex items-center justify-center mb-6">
                    <outcome.icon className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f1f3d] group-hover:text-white mb-3 transition-colors">
                    {outcome.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/70 transition-colors">
                    {outcome.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metković Lab Project */}
      <section className="py-20 bg-gradient-to-br from-[#0f1f3d] via-[#1a3a5c] to-[#0f1f3d] text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b1538] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Real-World Case Study
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Metković Lab Project
            </h2>
            <p className="text-lg text-white/70">
              Throughout the course, you will design a complete edge computing infrastructure for 
              <strong className="text-[#d4af37]"> Metković</strong>, a town of 15,000+ residents in the Neretva Delta, Croatia.
              This hands-on project covers all aspects of territorial digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {metkovicUseCases.map((useCase, index) => (
              <Card key={index} className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#d4af37]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-sm text-white/60">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 text-sm">
              Final project: Present your complete infrastructure design for Metković to receive your certificate
            </p>
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#8b1538]/10 text-[#8b1538] mb-4">Programme Structure</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              Course Structure Over 3 Months
            </h2>
            <p className="text-lg text-gray-600">
              A progressive curriculum building from fundamentals to advanced implementation, 
              culminating in your complete infrastructure design.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="month1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger 
                  value="month1" 
                  className="data-[state=active]:bg-[#0f1f3d] data-[state=active]:text-white rounded-lg py-3"
                >
                  Month 1
                </TabsTrigger>
                <TabsTrigger 
                  value="month2"
                  className="data-[state=active]:bg-[#0f1f3d] data-[state=active]:text-white rounded-lg py-3"
                >
                  Month 2
                </TabsTrigger>
                <TabsTrigger 
                  value="month3"
                  className="data-[state=active]:bg-[#0f1f3d] data-[state=active]:text-white rounded-lg py-3"
                >
                  Month 3
                </TabsTrigger>
              </TabsList>

              {courseModules.map((module, moduleIndex) => (
                <TabsContent key={moduleIndex} value={`month${moduleIndex + 1}`}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-[#0f1f3d] font-bold">
                          {moduleIndex + 1}
                        </div>
                        <div>
                          <p className="text-sm text-white/60 font-normal">Month {moduleIndex + 1}</p>
                          <p className="text-xl">{module.title}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {module.weeks.map((week, weekIndex) => (
                        <div 
                          key={weekIndex} 
                          className={`p-6 flex gap-6 ${weekIndex !== module.weeks.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                              <span className="text-sm font-bold text-[#0f1f3d]">W{week.week}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0f1f3d] mb-1">{week.topic}</h4>
                            <p className="text-gray-600 text-sm">{week.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Stormshield Module */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-[#8b1538] text-white mb-4">
                  <Shield className="w-4 h-4 mr-2" />
                  Dedicated Module
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
                  Stormshield Firewall<br />
                  <span className="text-[#8b1538]">Integration Module</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  A key component of this programme is our dedicated Stormshield firewall module. 
                  Learn to protect municipal infrastructure with enterprise-grade European cybersecurity technology.
                </p>
                <p className="text-gray-600 mb-8">
                  This module covers the essential skills needed to deploy, configure, and manage 
                  Stormshield firewalls in a municipal edge computing environment, ensuring compliance 
                  with European data protection regulations.
                </p>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    What You'll Master
                  </h4>
                  <ul className="space-y-3">
                    {stormshieldFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5c] rounded-3xl p-8 text-white">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#8b1538] rounded-2xl flex items-center justify-center">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6">Why Stormshield?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">European Technology</h4>
                        <p className="text-white/70 text-sm">Built in France, trusted by European institutions and critical infrastructure</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">GDPR Compliant</h4>
                        <p className="text-white/70 text-sm">Designed for European data protection requirements from the ground up</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Certified Solution</h4>
                        <p className="text-white/70 text-sm">ANSSI certified, ideal for public sector and sensitive environments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Practical Outcomes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#d4af37]/10 text-[#d4af37] mb-4">Practical Outcomes</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              What You'll Be Able To Do
            </h2>
            <p className="text-lg text-gray-600">
              Upon completion, you will have the skills and knowledge to lead edge computing 
              projects for municipalities and territories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Design municipal edge architectures", description: "Plan complete infrastructure for towns and territories" },
              { title: "Deploy local hosting solutions", description: "Set up and manage local servers and services" },
              { title: "Configure enterprise firewalls", description: "Implement Stormshield security for municipal networks" },
              { title: "Build environmental monitoring", description: "Deploy sensor networks for floods, fires, and climate" },
              { title: "Create emergency communication systems", description: "Design resilient crisis communication infrastructure" },
              { title: "Integrate local media platforms", description: "Set up community TV, radio, and digital broadcasting" },
              { title: "Connect educational networks", description: "Build school networks with e-learning capabilities" },
              { title: "Present to stakeholders", description: "Communicate technical projects to decision-makers" }
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0f1f3d] mb-1">{outcome.title}</h4>
                  <p className="text-gray-600 text-sm">{outcome.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#0f1f3d]/10 text-[#0f1f3d] mb-4">Investment</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              Pricing Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the format that best fits your organisation's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual Pricing */}
            <Card className="border-2 border-gray-200 hover:border-[#d4af37] transition-colors relative overflow-hidden">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-[#0f1f3d] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#d4af37]" />
                </div>
                <CardTitle className="text-2xl text-[#0f1f3d]">Individual Enrolment</CardTitle>
                <p className="text-gray-600 text-sm mt-2">For professionals and independent learners</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="py-6">
                  <span className="text-5xl font-bold text-[#0f1f3d]">€3,000</span>
                  <span className="text-gray-500 ml-2">/ person</span>
                </div>
                
                <ul className="text-left space-y-3 mb-8">
                  {[
                    "Full 3-month programme access",
                    "Live online sessions",
                    "Stormshield firewall module",
                    "Metković lab project",
                    "Course materials & resources",
                    "SGA Certificate upon completion",
                    "Email support during programme"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-[#0f1f3d] hover:bg-[#1a3a5c] text-white py-6"
                  onClick={() => handleEnroll('individual')}
                  data-testid="pricing-individual-btn"
                >
                  Enrol Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Group Pricing */}
            <Card className="border-2 border-[#d4af37] relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0f1f3d] px-4 py-1 text-sm font-bold">
                BEST VALUE
              </div>
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-[#0f1f3d]" />
                </div>
                <CardTitle className="text-2xl text-[#0f1f3d]">Private Group</CardTitle>
                <p className="text-gray-600 text-sm mt-2">For organisations and institutions</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="py-6">
                  <span className="text-5xl font-bold text-[#0f1f3d]">€20,000</span>
                  <span className="text-gray-500 ml-2">/ group</span>
                </div>
                
                <ul className="text-left space-y-3 mb-8">
                  {[
                    "Up to 10 participants",
                    "Private dedicated sessions",
                    "Customised case studies",
                    "Organisation-specific focus",
                    "Stormshield firewall module",
                    "Flexible scheduling",
                    "Priority support & consulting",
                    "10 SGA Certificates"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] py-6 font-semibold"
                  onClick={() => handleEnroll('group')}
                  data-testid="pricing-group-btn"
                >
                  Book Private Group
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <p className="text-xs text-gray-500 mt-4">
                  €2,000 per participant for groups of 10
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5c] rounded-3xl p-12 text-white text-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8b1538]/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-[#d4af37] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Award className="w-12 h-12 text-[#0f1f3d]" />
                </div>
                
                <Badge className="bg-white/10 text-white border border-white/20 mb-6">Official Certification</Badge>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Saint-Georges Academy Certificate
                </h2>
                
                <p className="text-xl text-[#d4af37] font-medium mb-4">
                  Certificate in Edge Computing Fundamentals<br />for Smart Towns
                </p>
                
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Upon successful completion of the programme and final lab project, 
                  participants receive an official Saint-Georges Academy certificate 
                  validating their competencies in edge computing for territorial digital infrastructure.
                </p>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                    <span>Recognised by industry</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                    <span>Validates practical skills</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                    <span>European standard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Saint-Georges Academy */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-[#8b1538]/10 text-[#8b1538] mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1f3d] mb-6">
              Why Saint-Georges Academy
            </h2>
            <p className="text-lg text-gray-600">
              A European training provider committed to practical, industry-relevant education 
              in emerging technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Certified Training", description: "Professional certifications recognised across Europe" },
              { icon: Target, title: "Practical Focus", description: "Real-world projects and hands-on learning approach" },
              { icon: Users, title: "Expert Instructors", description: "Industry professionals with territorial project experience" },
              { icon: Globe, title: "European Perspective", description: "Aligned with EU digital strategy and regulations" }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#0f1f3d] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <h3 className="font-bold text-[#0f1f3d] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#0f1f3d] font-medium text-lg italic">
              "Training the Digital Infrastructure of Tomorrow"
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0f1f3d] via-[#1a3a5c] to-[#0f1f3d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#8b1538] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build the Digital Infrastructure<br />of Tomorrow?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join our next cohort and learn to design, deploy, and manage edge computing 
              infrastructure for smart towns and territories.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d] font-semibold px-8 py-6 text-lg"
                onClick={() => handleEnroll('individual')}
                data-testid="cta-enroll-btn"
              >
                Enrol as Individual — €3,000
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#0f1f3d] px-8 py-6 text-lg"
                onClick={() => handleEnroll('group')}
                data-testid="cta-group-btn"
              >
                Book Private Group — €20,000
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-white/60">
              <a href="/contact" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@saint-georges.academy</span>
              </a>
              <a href="tel:+33549227510" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
                <Phone className="w-5 h-5" />
                <span>+33 (0)5 49 22 75 10</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EdgeComputing;
