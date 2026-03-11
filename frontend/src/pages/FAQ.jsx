import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { 
  HelpCircle,
  GraduationCap,
  Video,
  Award,
  CreditCard,
  BookOpen,
  Clock,
  Globe,
  Accessibility,
  ClipboardList,
  Lock,
  Briefcase,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '../components/ui/button';

const FAQ = () => {
  const faqItems = [
    {
      id: '1',
      icon: GraduationCap,
      question: 'Quelle est la différence entre la formation en ligne et la formation en présentiel ?',
      answer: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-bold text-[#0f1f3d] mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Formation en ligne (2290 €)
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Accès officiel Cisco NetAcad</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>1 session visio de 45 minutes par semaine avec instructeur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Travail autonome encadré</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Flexibilité</span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-bold text-[#0f1f3d] mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                Formation en présentiel (3290 €)
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>35 heures intensives (1 semaine)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Encadrement permanent</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Travaux pratiques supervisés</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Immersion totale</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '2',
      icon: Video,
      question: 'Les 75 vidéos sont-elles incluses dans la formation en ligne ?',
      answer: (
        <div>
          <p className="text-red-600 font-semibold mb-3">Non.</p>
          <p className="text-gray-700 mb-3">
            L'accès aux 75 vidéos de préparation est une <strong>option distincte</strong> au tarif de <strong>150 €</strong>.
          </p>
          <p className="text-gray-700">
            Elles peuvent être achetées indépendamment.
          </p>
          <div className="mt-4">
            <Link to="/videos" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
              Voir les 75 vidéos CCNA <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )
    },
    {
      id: '3',
      icon: Award,
      question: 'La certification Cisco est-elle incluse ?',
      answer: (
        <div>
          <p className="text-red-600 font-semibold mb-3">Non.</p>
          <div className="bg-gray-50 rounded-lg p-4 border mb-4">
            <p className="font-semibold text-[#0f1f3d] mb-2">L'examen officiel :</p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Coût :</strong> 630 €</li>
              <li><strong>Passage via :</strong> Centre agréé Pearson VUE</li>
            </ul>
          </div>
          <p className="text-gray-700">
            La formation prépare à l'examen, mais <strong>ne garantit pas la réussite</strong>.
          </p>
          <div className="mt-4">
            <Link to="/certification" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
              Acheter un voucher d'examen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )
    },
    {
      id: '4',
      icon: CreditCard,
      question: 'Les formations sont-elles finançables ?',
      answer: (
        <div>
          <p className="text-gray-700 mb-4">Les formations peuvent être financées via :</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Financement personnel</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Employeur</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>OPCO</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-3 border border-amber-200">
              <CheckCircle className="w-5 h-5 text-amber-600" />
              <span>France Travail (AIF – sous réserve)</span>
            </div>
          </div>
          <p className="text-gray-700">
            Un <strong>accompagnement administratif</strong> est proposé.
          </p>
          <div className="mt-4">
            <Link to="/funding" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
              Voir les options de financement <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )
    },
    {
      id: '5',
      icon: BookOpen,
      question: 'Dois-je avoir un niveau préalable ?',
      answer: (
        <div>
          <p className="text-gray-700 mb-4">Oui, selon la formation :</p>
          <div className="space-y-2">
            <div className="bg-gray-50 rounded-lg p-3 border flex justify-between items-center">
              <span className="font-medium text-[#0f1f3d]">CCNA 1</span>
              <span className="text-gray-600 text-sm">Aucun prérequis réseau</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border flex justify-between items-center">
              <span className="font-medium text-[#0f1f3d]">CCNA 2</span>
              <span className="text-gray-600 text-sm">Validation CCNA 1</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border flex justify-between items-center">
              <span className="font-medium text-[#0f1f3d]">CCNA 3</span>
              <span className="text-gray-600 text-sm">Validation CCNA 1 & 2</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border flex justify-between items-center">
              <span className="font-medium text-[#0f1f3d]">CyberOps</span>
              <span className="text-gray-600 text-sm">Niveau CCNA 1 minimum</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border flex justify-between items-center">
              <span className="font-medium text-[#0f1f3d]">Unreal Beginner</span>
              <span className="text-gray-600 text-sm">Aucun prérequis technique</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border flex justify-between items-center">
              <span className="font-medium text-[#0f1f3d]">Unreal Intermediate</span>
              <span className="text-gray-600 text-sm">Maîtrise Blueprint requise</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '6',
      icon: Clock,
      question: 'Combien de temps dure une formation ?',
      answer: (
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-[#0f1f3d]">Online</span>
            </div>
            <span className="text-gray-700">Rythme flexible (8 à 12 semaines recommandées)</span>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-amber-600" />
              <span className="font-medium text-[#0f1f3d]">Présentiel</span>
            </div>
            <span className="text-gray-700">35 heures sur 1 semaine</span>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-[#0f1f3d]">Unreal Engine</span>
            </div>
            <span className="text-gray-700">35 heures intensives</span>
          </div>
        </div>
      )
    },
    {
      id: '7',
      icon: Globe,
      question: 'Puis-je suivre la formation depuis l\'étranger ?',
      answer: (
        <div>
          <p className="text-green-600 font-semibold mb-3">Oui, pour le format en ligne.</p>
          <p className="text-gray-700">
            Un <strong>accès Internet stable</strong> est nécessaire.
          </p>
        </div>
      )
    },
    {
      id: '8',
      icon: Accessibility,
      question: 'Les formations sont-elles accessibles aux personnes en situation de handicap ?',
      answer: (
        <div>
          <p className="text-green-600 font-semibold mb-3">Oui.</p>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Un <strong>référent handicap</strong> est désigné</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Des <strong>adaptations</strong> sont étudiées au cas par cas</span>
            </li>
          </ul>
          <Link to="/accessibilite" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
            Voir la page Accessibilité <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )
    },
    {
      id: '9',
      icon: ClipboardList,
      question: 'Comment s\'inscrire ?',
      answer: (
        <div>
          <div className="space-y-3">
            {[
              'Contact ou demande de devis',
              'Analyse du besoin',
              'Validation des prérequis',
              'Signature contrat/convention',
              'Paiement ou validation financement'
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0f1f3d] text-[#d4af37] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/inscription" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
              Voir la procédure complète <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )
    },
    {
      id: '10',
      icon: Lock,
      question: 'Mes données sont-elles protégées ?',
      answer: (
        <div>
          <p className="text-green-600 font-semibold mb-3">Oui.</p>
          <p className="text-gray-700">
            Les données sont traitées conformément au{' '}
            <Link to="/rgpd" className="text-blue-600 hover:underline font-medium">
              Règlement général sur la protection des données (RGPD)
            </Link>.
          </p>
        </div>
      )
    },
    {
      id: '11',
      icon: Briefcase,
      question: 'Quels débouchés après la formation ?',
      answer: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-[#0f1f3d] mb-2">Après CCNA :</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Technicien réseau</li>
              <li>• Administrateur junior</li>
              <li>• Support IT</li>
            </ul>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h4 className="font-bold text-[#0f1f3d] mb-2">Après CyberOps :</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Analyste SOC</li>
              <li>• Technicien cybersécurité</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-bold text-[#0f1f3d] mb-2">Après Unreal :</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Développeur gameplay junior</li>
              <li>• Créateur de prototype interactif</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: '12',
      icon: BarChart3,
      question: 'Les indicateurs de performance sont-ils disponibles ?',
      answer: (
        <div>
          <p className="text-green-600 font-semibold mb-3">Oui.</p>
          <p className="text-gray-700 mb-4">
            Taux de satisfaction, réussite et insertion sont publiés dans la rubrique "Indicateurs de performance".
          </p>
          <Link to="/indicateurs" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
            Voir les indicateurs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Foire Aux Questions
          </h1>
          <p className="text-xl text-gray-600">
            Retrouvez les réponses aux questions les plus fréquentes sur nos formations.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} data-testid={`faq-item-${item.id}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <span className="font-semibold text-[#0f1f3d] pr-4">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-6 pl-[52px]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <HelpCircle className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Vous avez une autre question ?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans votre projet de formation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d]">
                  <Link to="/contact">
                    <Mail className="w-5 h-5 mr-2" />
                    Nous contacter
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0f1f3d]">
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

export default FAQ;
