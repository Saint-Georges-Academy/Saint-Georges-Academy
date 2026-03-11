import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  ClipboardList,
  MessageCircle,
  Search,
  CheckSquare,
  FileText,
  CreditCard,
  Mail,
  GraduationCap,
  Shield,
  CheckCircle,
  Phone,
  Video,
  FileCheck,
  Users,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const ProcedureInscription = () => {
  const steps = [
    {
      number: 1,
      icon: MessageCircle,
      title: 'Prise de contact',
      description: 'Le candidat peut :',
      items: [
        'Remplir le formulaire en ligne',
        'Demander un devis',
        'Contacter l\'académie par téléphone',
        'Envoyer un email'
      ],
      note: 'Un accusé de réception est envoyé sous 48 heures ouvrées.',
      noteType: 'info'
    },
    {
      number: 2,
      icon: Search,
      title: 'Analyse du besoin',
      description: 'Un échange (téléphonique ou visioconférence) est organisé afin de :',
      items: [
        'Comprendre le projet professionnel',
        'Identifier le niveau du candidat',
        'Vérifier l\'adéquation formation / objectif',
        'Déterminer les modalités de financement'
      ],
      note: 'Cette étape est obligatoire pour toute demande financée.',
      noteType: 'warning'
    },
    {
      number: 3,
      icon: CheckSquare,
      title: 'Vérification des prérequis',
      description: 'Selon la formation choisie :',
      items: [
        'Test de positionnement technique (si nécessaire)',
        'Validation des connaissances antérieures',
        'Vérification du niveau requis'
      ],
      note: 'L\'entrée en formation est conditionnée à la validation des prérequis.',
      noteType: 'warning'
    },
    {
      number: 4,
      icon: FileText,
      title: 'Envoi des documents contractuels',
      description: 'Après validation, le candidat reçoit :',
      items: [
        'Programme détaillé',
        'Devis',
        'Convention de formation (B2B) ou contrat (B2C)',
        'CGV',
        'Règlement intérieur'
      ],
      subSection: {
        title: 'L\'inscription est effective après :',
        items: [
          'Signature des documents',
          'Validation du financement ou paiement'
        ]
      }
    },
    {
      number: 5,
      icon: CreditCard,
      title: 'Modalités de financement',
      description: 'Les options possibles :',
      items: [
        'Financement personnel',
        'Employeur',
        'OPCO',
        'France Travail (AIF – sous réserve d\'acceptation)'
      ],
      note: 'Un accompagnement administratif est proposé pour les dossiers financés.',
      noteType: 'info'
    },
    {
      number: 6,
      icon: Mail,
      title: 'Confirmation d\'inscription',
      description: 'Une fois le dossier validé :',
      items: [
        'Email de confirmation envoyé',
        'Informations logistiques communiquées',
        'Accès aux plateformes transmis (si formation en ligne)'
      ]
    },
    {
      number: 7,
      icon: GraduationCap,
      title: 'Entrée en formation',
      description: 'Avant le démarrage :',
      items: [
        'Remise des supports',
        'Présentation des objectifs',
        'Rappel du règlement intérieur',
        'Information sur les modalités d\'évaluation'
      ]
    }
  ];

  const engagements = [
    'Transparence des informations',
    'Adéquation formation / projet',
    'Accompagnement administratif',
    'Respect des délais',
    'Confidentialité des données (RGPD)'
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <ClipboardList className="w-4 h-4 mr-2" />
            Inscription
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Procédure d'Inscription
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Saint-Georges Academy vous accompagne à chaque étape de votre parcours, 
            de la prise de contact jusqu'à l'entrée en formation.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-6 mb-12">
          {steps.map((step, index) => (
            <Card 
              key={step.number} 
              className="border-2 hover:border-[#d4af37] transition-all hover:shadow-lg overflow-hidden"
              data-testid={`step-${step.number}`}
            >
              <div className="flex">
                {/* Step Number Sidebar */}
                <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white p-6 flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-4xl font-bold text-[#d4af37]">{step.number}</span>
                  <step.icon className="w-8 h-8 mt-2 text-white/80" />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6">
                  <h3 className="text-2xl font-bold text-[#0f1f3d] mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {step.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {step.subSection && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <p className="font-semibold text-gray-900 mb-2">{step.subSection.title}</p>
                      <ul className="space-y-1">
                        {step.subSection.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.note && (
                    <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${
                      step.noteType === 'warning' 
                        ? 'bg-amber-50 border border-amber-200' 
                        : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        step.noteType === 'warning' ? 'text-amber-600' : 'text-blue-600'
                      }`} />
                      <span className={`text-sm ${
                        step.noteType === 'warning' ? 'text-amber-800' : 'text-blue-800'
                      }`}>
                        {step.note}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex justify-center -mb-3">
                  <div className="w-1 h-6 bg-[#d4af37]"></div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Engagement Qualité */}
        <Card className="border-2 border-[#d4af37] bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Shield className="w-7 h-7 text-[#d4af37]" />
              Engagement Qualité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Saint-Georges Academy garantit :
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {engagements.map((engagement, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span className="text-white">{engagement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section - Forms */}
        <Card className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-[#0f1f3d] mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Commencez votre parcours</h3>
              <p className="text-[#0f1f3d]/80 mb-6 max-w-2xl mx-auto">
                Choisissez le formulaire adapté à votre situation pour démarrer votre projet de formation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#0f1f3d] hover:bg-[#1a3a5f] text-white">
                  <Link to="/conseil-formation">
                    <Users className="w-5 h-5 mr-2" />
                    Particulier - Demander un conseil
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#0f1f3d] text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white">
                  <Link to="/besoins-organisation">
                    <FileCheck className="w-5 h-5 mr-2" />
                    Entreprise / Institution
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                <Button asChild variant="link" className="text-[#0f1f3d]">
                  <Link to="/pre-inscription">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Accéder au formulaire de pré-inscription
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Quick Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="text-center p-6">
            <Phone className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
            <h4 className="font-semibold text-[#0f1f3d] mb-1">Téléphone</h4>
            <a href="tel:+33549227510" className="text-gray-600 hover:text-[#d4af37]">
              +33 (0)5 49 22 75 10
            </a>
          </Card>
          <Card className="text-center p-6">
            <Mail className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
            <h4 className="font-semibold text-[#0f1f3d] mb-1">Email</h4>
            <a href="mailto:contact@saint-georges.academy" className="text-gray-600 hover:text-[#d4af37]">
              contact@saint-georges.academy
            </a>
          </Card>
          <Card className="text-center p-6">
            <Video className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
            <h4 className="font-semibold text-[#0f1f3d] mb-1">Visioconférence</h4>
            <p className="text-gray-600">Sur rendez-vous</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProcedureInscription;
