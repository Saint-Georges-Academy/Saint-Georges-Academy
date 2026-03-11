import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Accessibility as AccessibilityIcon, Eye, Ear, Hand, Brain, 
  CheckCircle, Phone, Mail, MessageSquare, FileText, Users,
  AlertTriangle, ArrowRight, Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const Accessibilite = () => {
  const lastUpdate = "11 mars 2026";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <AccessibilityIcon className="w-4 h-4 mr-2" />
              Inclusion
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Accessibilité & Handicap</h1>
            <p className="text-white/70">
              Notre engagement pour rendre la formation accessible à tous, 
              quels que soient vos besoins spécifiques.
            </p>
            <p className="text-white/50 text-sm mt-4">
              Dernière mise à jour : {lastUpdate}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Engagement */}
          <Card className="border-2 border-[#d4af37]">
            <CardHeader className="bg-[#d4af37]/10">
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Heart className="w-5 h-5" />
                Notre engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 leading-relaxed">
                Saint-Georges Academy s'engage à rendre ses formations accessibles au plus grand nombre. 
                Conformément à la loi du 11 février 2005 pour l'égalité des droits et des chances, 
                nous mettons tout en œuvre pour accueillir les personnes en situation de handicap 
                dans les meilleures conditions.
              </p>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Référent Handicap</strong>
                    <p className="mt-1">
                      Un référent handicap est à votre disposition pour étudier vos besoins 
                      et mettre en place les adaptations nécessaires.
                    </p>
                    <a href="mailto:handicap@saint-georges.academy" className="text-blue-700 hover:underline mt-2 inline-block">
                      handicap@saint-georges.academy
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types de handicap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <AccessibilityIcon className="w-5 h-5" />
                Accompagnement selon le type de handicap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-6">
                Nous adaptons nos formations pour répondre aux différents types de handicap :
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-[#0f1f3d]">Handicap visuel</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Documents en formats accessibles</li>
                    <li>• Compatibilité lecteurs d'écran</li>
                    <li>• Agrandissement des supports</li>
                    <li>• Description des images</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Ear className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-[#0f1f3d]">Handicap auditif</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sous-titrage des vidéos</li>
                    <li>• Supports écrits complets</li>
                    <li>• Communication par écrit</li>
                    <li>• Interprète LSF sur demande</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Hand className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-[#0f1f3d]">Handicap moteur</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Locaux accessibles PMR</li>
                    <li>• Aménagement du poste de travail</li>
                    <li>• Pauses adaptées</li>
                    <li>• Formation à distance possible</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-[#0f1f3d]">Troubles cognitifs / DYS</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Temps supplémentaire</li>
                    <li>• Supports simplifiés</li>
                    <li>• Méthodes pédagogiques adaptées</li>
                    <li>• Accompagnement personnalisé</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibilité numérique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <FileText className="w-5 h-5" />
                Accessibilité numérique du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Nous nous efforçons de rendre ce site accessible conformément au 
                Référentiel Général d'Amélioration de l'Accessibilité (RGAA).
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <strong>État de conformité</strong>
                    <p className="mt-1">
                      [À compléter après audit d'accessibilité : conformité partielle / totale / non conforme]
                    </p>
                    <p className="mt-2 text-amber-700">
                      Un audit d'accessibilité est prévu pour améliorer notre conformité au RGAA.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-[#0f1f3d] mt-6">Fonctionnalités d'accessibilité</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Navigation au clavier
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Contrastes de couleurs suffisants
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Textes alternatifs sur les images
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Structure sémantique des pages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Responsive design (mobile/tablette)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Démarche */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <ArrowRight className="w-5 h-5" />
                Comment bénéficier d'un accompagnement ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-[#0f1f3d]">Signalez vos besoins</h4>
                  <p className="text-sm text-gray-600">
                    Contactez notre référent handicap dès votre projet de formation pour 
                    nous faire part de vos besoins spécifiques.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-[#0f1f3d]">Évaluation des besoins</h4>
                  <p className="text-sm text-gray-600">
                    Nous analysons ensemble vos besoins et étudions les adaptations possibles 
                    (pédagogiques, techniques, organisationnelles).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-[#0f1f3d]">Mise en place des adaptations</h4>
                  <p className="text-sm text-gray-600">
                    Nous mettons en œuvre les aménagements nécessaires avant et pendant 
                    votre formation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-[#0f1f3d]">Suivi personnalisé</h4>
                  <p className="text-sm text-gray-600">
                    Un suivi régulier est assuré tout au long de votre parcours pour 
                    ajuster les adaptations si nécessaire.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partenaires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Users className="w-5 h-5" />
                Ressources et partenaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Nous travaillons en partenariat avec des organismes spécialisés pour 
                vous accompagner au mieux :
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>AGEFIPH</strong> - Association de Gestion du Fonds pour l'Insertion Professionnelle des Personnes Handicapées</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>Cap Emploi</strong> - Accompagnement vers l'emploi des personnes handicapées</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>MDPH</strong> - Maison Départementale des Personnes Handicapées</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>Ressource Handicap Formation</strong> - Accompagnement des organismes de formation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-[#0f1f3d] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Contactez notre référent handicap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80">
                N'hésitez pas à nous contacter pour toute question relative à l'accessibilité 
                de nos formations ou pour signaler un problème d'accessibilité sur ce site.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:handicap@saint-georges.academy" className="inline-flex items-center gap-2 bg-white text-[#0f1f3d] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Mail className="w-4 h-4" />
                  handicap@saint-georges.academy
                </a>
                <a href="tel:+33549227510" className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0f1f3d] px-4 py-2 rounded-lg hover:bg-[#c4a030] transition-colors">
                  <Phone className="w-4 h-4" />
                  +33 (0)5 49 22 75 10
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Accessibilite;
