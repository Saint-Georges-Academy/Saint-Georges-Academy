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
  ThumbsUp,
  BookOpen,
  Shield,
  RefreshCcw,
  Star
} from 'lucide-react';

const Indicateurs = () => {
  // Key performance indicators with real values
  const mainIndicators = [
    {
      icon: Star,
      value: '96',
      suffix: '%',
      label: 'Taux de satisfaction',
      description: 'des apprenants',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: Target,
      value: '92',
      suffix: '%',
      label: 'Taux de complétion',
      description: 'des formations',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Users,
      value: '10',
      suffix: '',
      label: 'Apprenants',
      description: 'accompagnés',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: ThumbsUp,
      value: '94',
      suffix: '%',
      label: 'Taux de recommandation',
      description: 'de nos formations',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  ];

  const certifications = [
    { name: 'Cisco', description: 'CCNA, CyberOps Associate' },
    { name: 'Stormshield', description: 'Sécurité réseau' },
    { name: 'Cybersécurité appliquée', description: 'Compétences pratiques' }
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
            Nos Indicateurs Qualité
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chez Saint-Georges Academy, nous suivons attentivement la satisfaction des apprenants, 
            la complétion des parcours et la qualité de l'accompagnement proposé. 
            Ces indicateurs participent à notre démarche d'amélioration continue.
          </p>
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainIndicators.map((indicator, index) => (
            <Card 
              key={index} 
              className={`${indicator.bgColor} ${indicator.borderColor} border-2 hover:shadow-lg transition-all overflow-hidden`}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${indicator.color} flex items-center justify-center`}>
                  <indicator.icon className="w-6 h-6 text-white" />
                </div>
                <div className="mb-2">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${indicator.color} bg-clip-text text-transparent`}>
                    {indicator.value}
                  </span>
                  <span className={`text-3xl font-bold bg-gradient-to-r ${indicator.color} bg-clip-text text-transparent`}>
                    {indicator.suffix}
                  </span>
                </div>
                <p className="text-gray-900 font-semibold text-sm">{indicator.label}</p>
                <p className="text-gray-600 text-xs">{indicator.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications Section */}
        <Card className="border-2 border-[#d4af37] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-[#0f1f3d]">
              <Award className="w-6 h-6 text-[#d4af37]" />
              Certifications préparées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] rounded-xl p-4"
                >
                  <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#0f1f3d]" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{cert.name}</p>
                    <p className="text-sm text-gray-300">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Indicators Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-[#0f1f3d]">
              <GraduationCap className="w-6 h-6 text-[#d4af37]" />
              Détail des indicateurs pédagogiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-[#0f1f3d] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Indicateur</th>
                    <th className="px-6 py-4 text-center font-semibold">Valeur</th>
                    <th className="px-6 py-4 text-left font-semibold hidden md:table-cell">Méthode de calcul</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-emerald-500" />
                        <span className="font-medium text-gray-900">Taux de satisfaction des apprenants</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold text-emerald-600">96%</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm hidden md:table-cell">
                      Enquête anonyme transmise en fin de formation
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-900">Taux de complétion des formations</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold text-blue-600">92%</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm hidden md:table-cell">
                      Ratio apprenants ayant terminé / inscrits
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-gray-900">Nombre d'apprenants accompagnés</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold text-purple-600">10</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm hidden md:table-cell">
                      Nombre total de stagiaires formés
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ThumbsUp className="w-5 h-5 text-amber-500" />
                        <span className="font-medium text-gray-900">Taux de recommandation</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold text-amber-600">94%</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm hidden md:table-cell">
                      Apprenants prêts à recommander nos formations
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Data Source Note */}
            <div className="mt-6 bg-gray-100 rounded-lg p-4 flex items-start gap-3">
              <RefreshCcw className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                <strong>Source :</strong> Données issues du suivi interne des apprenants et des actions de formation. 
                Indicateurs mis à jour annuellement.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Qualité */}
        <Card className="border-2 border-[#d4af37] bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <TrendingUp className="w-7 h-7 text-[#d4af37]" />
              Notre engagement qualité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Saint-Georges Academy s'engage dans une démarche d'amélioration continue :
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

        {/* Qualiopi Note */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Conformité au Référentiel National Qualité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Ces indicateurs sont publiés dans le cadre de notre démarche qualité, 
              conforme aux exigences du <strong>Référentiel National Qualité (RNQ)</strong> et 
              aux critères de la certification <strong>Qualiopi</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Mesure régulière des résultats',
                'Publication transparente',
                'Analyse des retours apprenants',
                'Actions d\'amélioration continue'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-blue-100">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <RefreshCcw className="w-4 h-4" />
          <p>Dernière mise à jour : Mars 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Indicateurs;
