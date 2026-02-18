import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Accessibility,
  Heart,
  User,
  Mail,
  Phone,
  Settings,
  Building2,
  Globe,
  Handshake,
  ClipboardList,
  Lock,
  CheckCircle,
  BookOpen,
  MessageCircle,
  Search,
  FileText,
  Users,
  MonitorPlay,
  Headphones,
  Clock,
  ArrowRight
} from 'lucide-react';

const AccessibiliteHandicap = () => {
  const engagements = [
    'Analyser les besoins spécifiques du stagiaire',
    'Adapter les modalités pédagogiques',
    'Proposer des solutions d\'aménagement',
    'Assurer un accompagnement individualisé'
  ];

  const amenagements = [
    { icon: FileText, text: 'Adaptation des supports pédagogiques' },
    { icon: Clock, text: 'Temps supplémentaire lors des évaluations' },
    { icon: CheckCircle, text: 'Modalités d\'examen adaptées' },
    { icon: Settings, text: 'Adaptation du rythme' },
    { icon: MonitorPlay, text: 'Mise à disposition de supports numériques' },
    { icon: Globe, text: 'Organisation spécifique en distanciel' }
  ];

  const accessibiliteNumerique = [
    'Accès via plateformes sécurisées',
    'Supports numériques',
    'Possibilité d\'enregistrement des sessions',
    'Assistance technique disponible'
  ];

  const partenariats = [
    'Organismes spécialisés',
    'Structures d\'accompagnement locales',
    'Dispositifs d\'aide au financement spécifique'
  ];

  const procedure = [
    { number: 1, text: 'Le candidat informe l\'académie de sa situation' },
    { number: 2, text: 'Un entretien confidentiel est organisé' },
    { number: 3, text: 'Une analyse des besoins est réalisée' },
    { number: 4, text: 'Un plan d\'adaptation est proposé' },
    { number: 5, text: 'Un suivi est assuré pendant la formation' }
  ];

  const qualiopiChecks = [
    'Existence d\'un référent identifié',
    'Procédure écrite',
    'Capacité d\'adaptation',
    'Preuve d\'analyse des besoins'
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <Accessibility className="w-4 h-4 mr-2" />
            Accessibilité
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Accessibilité & Référent Handicap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Saint-Georges Academy s'engage à garantir l'accessibilité de ses formations aux personnes 
            en situation de handicap, conformément aux principes d'égalité des chances et au cadre du{' '}
            <span className="font-semibold text-[#0f1f3d]">Qualiopi</span>.
          </p>
        </div>

        {/* Notre Engagement */}
        <Card className="border-2 border-[#d4af37] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <Heart className="w-7 h-7 text-[#d4af37]" />
              Notre engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Nous mettons tout en œuvre pour :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {engagements.map((engagement, index) => (
                <div key={index} className="flex items-start gap-3 bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">{engagement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Référent Handicap */}
        <Card className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <User className="w-7 h-7 text-[#d4af37]" />
              Référent Handicap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white/10 rounded-xl p-6 mb-4">
                  <p className="text-[#d4af37] text-sm font-semibold mb-2">Référent Handicap</p>
                  <p className="text-2xl font-bold">Thierry Paul</p>
                </div>
                <div className="space-y-3">
                  <a href="mailto:contact@saint-georges.academy" className="flex items-center gap-3 text-gray-200 hover:text-[#d4af37] transition-colors">
                    <Mail className="w-5 h-5 text-[#d4af37]" />
                    contact@saint-georges.academy
                  </a>
                  <a href="tel:+33549227510" className="flex items-center gap-3 text-gray-200 hover:text-[#d4af37] transition-colors">
                    <Phone className="w-5 h-5 text-[#d4af37]" />
                    +33 (0)5 49 22 75 10
                  </a>
                </div>
              </div>
              <div>
                <p className="text-gray-300 mb-4">
                  Le référent handicap est votre interlocuteur privilégié pour :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37]" />
                    <span>Étudier les besoins spécifiques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37]" />
                    <span>Mettre en place des aménagements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37]" />
                    <span>Coordonner les adaptations nécessaires</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aménagements possibles */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <Settings className="w-7 h-7 text-[#d4af37]" />
              Aménagements possibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Selon la situation, les adaptations peuvent inclure :
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {amenagements.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border hover:border-[#d4af37] transition-colors">
                  <item.icon className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Note :</strong> Chaque situation est étudiée individuellement pour proposer 
                les adaptations les plus appropriées.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Grid: Locaux & Numérique */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Accessibilité des locaux */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-[#0f1f3d]">
                <Building2 className="w-6 h-6 text-[#d4af37]" />
                Accessibilité des locaux
              </CardTitle>
              <Badge variant="outline">Présentiel</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Pour les formations en présentiel à Loudun :
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Une étude des besoins est réalisée en amont</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Si nécessaire, des solutions alternatives peuvent être proposées</span>
                </li>
              </ul>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-amber-800 text-sm">
                  Les candidats sont invités à signaler toute situation nécessitant un aménagement 
                  dès la phase d'inscription.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Accessibilité numérique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-[#0f1f3d]">
                <Globe className="w-6 h-6 text-[#d4af37]" />
                Accessibilité numérique
              </CardTitle>
              <Badge variant="outline">En ligne</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Pour les formations en ligne :
              </p>
              <ul className="space-y-3">
                {accessibiliteNumerique.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Partenariats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <Handshake className="w-7 h-7 text-[#d4af37]" />
              Partenariats possibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Si besoin, Saint-Georges Academy peut orienter vers :
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {partenariats.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 border">
                  <ArrowRight className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Procédure */}
        <Card className="mb-8 border-2 border-[#d4af37]">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <ClipboardList className="w-7 h-7 text-[#d4af37]" />
              Procédure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {procedure.map((step, index) => (
                <div key={step.number} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0f1f3d] text-[#d4af37] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div className={`flex-1 p-4 rounded-lg ${index === procedure.length - 1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <p className="text-gray-800">{step.text}</p>
                  </div>
                  {index < procedure.length - 1 && (
                    <div className="hidden md:block w-8">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Confidentialité */}
        <Card className="mb-8 bg-gradient-to-r from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-[#0f1f3d]">
              <Lock className="w-7 h-7 text-[#d4af37]" />
              Confidentialité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Toutes les informations communiquées sont <strong>strictement confidentielles</strong> et 
              traitées conformément au{' '}
              <Link to="/rgpd" className="text-blue-600 hover:underline font-medium">
                Règlement général sur la protection des données (RGPD)
              </Link>.
            </p>
          </CardContent>
        </Card>

        {/* Ce que Qualiopi vérifie */}
        <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Ce que Qualiopi vérifie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              L'auditeur contrôle :
            </p>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {qualiopiChecks.map((check, index) => (
                <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-blue-100">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{check}</span>
                </div>
              ))}
            </div>
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 text-sm">
                <strong>Important :</strong> L'auditeur ne demande pas que vous soyez un centre spécialisé, 
                mais que vous soyez <strong>structuré et engagé</strong> dans votre démarche d'accessibilité.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-[#0f1f3d]">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <Accessibility className="w-12 h-12 mx-auto mb-4 text-[#0f1f3d]" />
              <h3 className="text-2xl font-bold mb-4">Besoin d'un aménagement ?</h3>
              <p className="text-[#0f1f3d]/80 mb-6 max-w-2xl mx-auto">
                N'hésitez pas à contacter notre référent handicap pour discuter de vos besoins. 
                Toutes les demandes sont traitées avec confidentialité et bienveillance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#0f1f3d] hover:bg-[#1a3a5f] text-white">
                  <a href="mailto:contact@saint-georges.academy">
                    <Mail className="w-5 h-5 mr-2" />
                    Contacter le référent
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#0f1f3d] text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white">
                  <a href="tel:+33549227510">
                    <Phone className="w-5 h-5 mr-2" />
                    +33 (0)5 49 22 75 10
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessibiliteHandicap;
