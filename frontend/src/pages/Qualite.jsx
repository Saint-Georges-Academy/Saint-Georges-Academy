import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Target, Users, BookOpen, CheckCircle, TrendingUp,
  Shield, Clock, MessageSquare, Star, FileText, Heart,
  Building2, GraduationCap, Lightbulb, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const Qualite = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-4">
              <Award className="w-4 h-4 mr-2" />
              Notre engagement
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Engagement Qualité</h1>
            <p className="text-white/70 text-lg">
              Saint-Georges Academy s'engage dans une démarche d'amélioration continue 
              pour vous offrir des formations de qualité.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Nos engagements */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f1f3d] mb-6 text-center">Nos 7 Engagements Qualité</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Objectifs clairs",
                  description: "Des objectifs pédagogiques précis et mesurables pour chaque formation"
                },
                {
                  icon: Users,
                  title: "Accompagnement personnalisé",
                  description: "Un suivi individualisé de chaque apprenant tout au long du parcours"
                },
                {
                  icon: BookOpen,
                  title: "Contenu actualisé",
                  description: "Des programmes régulièrement mis à jour selon les évolutions du métier"
                },
                {
                  icon: GraduationCap,
                  title: "Formateurs experts",
                  description: "Des professionnels certifiés et expérimentés dans leur domaine"
                },
                {
                  icon: MessageSquare,
                  title: "Écoute et réactivité",
                  description: "Prise en compte de vos retours pour améliorer nos services"
                },
                {
                  icon: Shield,
                  title: "Transparence",
                  description: "Information claire sur nos formations, tarifs et conditions"
                },
                {
                  icon: Heart,
                  title: "Accessibilité",
                  description: "Adaptation aux besoins spécifiques et situations de handicap"
                }
              ].map((engagement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-4">
                      <engagement.icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <h3 className="font-semibold text-[#0f1f3d] mb-2">{engagement.title}</h3>
                    <p className="text-sm text-gray-600">{engagement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Démarche qualité */}
          <section>
            <Card className="border-2 border-[#d4af37]">
              <CardHeader className="bg-[#d4af37]/10">
                <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                  <TrendingUp className="w-5 h-5" />
                  Notre démarche d'amélioration continue
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-1">Planifier</h4>
                    <p className="text-xs text-gray-600">Définir les objectifs et processus</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-1">Réaliser</h4>
                    <p className="text-xs text-gray-600">Mettre en œuvre les actions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-1">Vérifier</h4>
                    <p className="text-xs text-gray-600">Évaluer les résultats</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">4</div>
                    <h4 className="font-semibold text-[#0f1f3d] mb-1">Améliorer</h4>
                    <p className="text-xs text-gray-600">Ajuster et progresser</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Indicateurs */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f1f3d] mb-6 text-center">Nos indicateurs de performance</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-[#d4af37] mb-2">[XX]%</div>
                  <p className="text-sm text-gray-600">Taux de satisfaction</p>
                  <p className="text-xs text-gray-400 mt-1">[À compléter]</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-[#d4af37] mb-2">[XX]%</div>
                  <p className="text-sm text-gray-600">Taux de réussite aux certifications</p>
                  <p className="text-xs text-gray-400 mt-1">[À compléter]</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-[#d4af37] mb-2">[XX]%</div>
                  <p className="text-sm text-gray-600">Taux de recommandation</p>
                  <p className="text-xs text-gray-400 mt-1">[À compléter]</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-[#d4af37] mb-2">[XX]</div>
                  <p className="text-sm text-gray-600">Stagiaires formés</p>
                  <p className="text-xs text-gray-400 mt-1">[À compléter]</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Indicateurs calculés sur les 12 derniers mois. Mise à jour : [date à compléter]
            </p>
          </section>

          {/* Certifications */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                  <Award className="w-5 h-5" />
                  Reconnaissances et partenariats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Cisco Networking Academy Partner</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Partenaire officiel pour la formation aux certifications CCNA et CyberOps.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Certification Qualiopi</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        [Statut à compléter : en cours / obtenue / non applicable]
                      </p>
                      <p className="text-xs text-amber-600 mt-2">
                        La certification Qualiopi atteste de la qualité du processus de formation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Déclaration d'activité</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Organisme de formation déclaré sous le numéro <strong>75 86 01243 86</strong> 
                        auprès du Préfet de la Région Nouvelle-Aquitaine.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Cette déclaration ne vaut pas agrément de l'État.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h3 className="text-xl font-bold text-[#0f1f3d] mb-4">Une question sur notre démarche qualité ?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-[#0f1f3d] hover:bg-[#1a3a5c]">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Nous contacter
                </Button>
              </Link>
              <Link to="/reclamations">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Faire une réclamation
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Qualite;
