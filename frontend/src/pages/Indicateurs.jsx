import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  BarChart3, 
  GraduationCap, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Award, 
  Target,
  ClipboardCheck,
  RefreshCcw,
  BookOpen,
  Briefcase,
  AlertCircle
} from 'lucide-react';

const Indicateurs = () => {
  const indicators = [
    {
      icon: CheckCircle,
      title: 'Taux de satisfaction',
      value: 'En cours de consolidation',
      description: 'Taux de satisfaction globale des apprenants',
      method: 'Enquête anonyme transmise en fin de formation.'
    },
    {
      icon: Target,
      title: 'Taux de réussite',
      value: 'En cours de consolidation',
      description: 'Taux de validation des objectifs pédagogiques',
      method: 'Évaluation finale + validation des compétences acquises.'
    },
    {
      icon: Users,
      title: 'Taux d\'abandon',
      value: 'En cours de consolidation',
      description: 'Taux d\'interruption en cours de formation',
      method: 'Nombre de participants ayant interrompu la formation avant son terme.'
    },
    {
      icon: ClipboardCheck,
      title: 'Taux de présentation à la certification',
      value: 'En cours de consolidation',
      description: 'Taux de stagiaires se présentant à l\'examen officiel Cisco Certified Network Associate ou Cisco Certified CyberOps Associate',
      method: 'Suivi des inscriptions aux examens via Pearson VUE.'
    },
    {
      icon: Award,
      title: 'Taux de réussite à la certification',
      value: 'En cours de consolidation',
      description: 'Taux de réussite aux examens Cisco passés via Pearson VUE',
      method: 'Retour des résultats d\'examen par les stagiaires.'
    },
    {
      icon: Briefcase,
      title: 'Taux d\'insertion professionnelle',
      value: 'En cours de consolidation',
      description: 'Taux d\'insertion dans un emploi ou une alternance dans les 6 mois suivant la formation',
      method: 'Enquête de suivi à 6 mois post-formation.'
    }
  ];

  const engagements = [
    'Analyser systématiquement les retours apprenants',
    'Mettre en œuvre des actions d\'amélioration',
    'Adapter les contenus aux évolutions technologiques',
    'Maintenir un haut niveau d\'exigence pédagogique'
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <BarChart3 className="w-4 h-4 mr-2" />
            Qualité
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Indicateurs de Performance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dans une démarche d'amélioration continue conforme au{' '}
            <span className="font-semibold text-[#0f1f3d]">Qualiopi</span> et au{' '}
            <span className="font-semibold text-[#0f1f3d]">Référentiel National Qualité (RNQ)</span>, 
            Saint-Georges Academy publie ses indicateurs de performance.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Ces indicateurs sont mis à jour annuellement.
          </p>
        </div>

        {/* Indicateurs pédagogiques */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-[#d4af37]" />
            <h2 className="text-3xl font-bold text-[#0f1f3d]">
              Indicateurs pédagogiques
            </h2>
            <Badge variant="outline" className="ml-2">
              Année en cours
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {indicators.map((indicator, index) => (
              <Card key={index} className="border-2 hover:border-[#d4af37] transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start gap-3 text-[#0f1f3d]">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] rounded-lg flex items-center justify-center flex-shrink-0">
                      <indicator.icon className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <span className="text-lg">{indicator.title}</span>
                      <p className="text-sm text-gray-600 font-normal mt-1">
                        {indicator.description}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
                    <p className="text-lg font-semibold text-[#d4af37] text-center">
                      {indicator.value}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Méthode de calcul :</span>{' '}
                    {indicator.method}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Engagement Qualité */}
        <Card className="border-2 border-[#d4af37] bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <TrendingUp className="w-7 h-7 text-[#d4af37]" />
              Engagement Qualité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Saint-Georges Academy s'engage à :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {engagements.map((engagement, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span className="text-white">{engagement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Note Qualiopi */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Important pour Qualiopi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              L'auditeur ne demande pas des chiffres parfaits. Il vérifie :
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Que tu mesures',
                'Que tu publies',
                'Que tu analyses',
                'Que tu améliores'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-blue-100">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-white border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-900">
                <strong>Note :</strong> Même avec 10 stagiaires, vous pouvez produire des indicateurs valides. 
                L'important est la démarche d'amélioration continue.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mise à jour */}
        <div className="text-center mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <RefreshCcw className="w-4 h-4" />
          <p>Dernière mise à jour : Janvier 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Indicateurs;
