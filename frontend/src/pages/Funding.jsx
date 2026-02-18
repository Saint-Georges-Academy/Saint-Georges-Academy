import React from 'react';
import { fundingOptions } from '../data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CheckCircle, FileText, Phone, Mail } from 'lucide-react';
import * as Icons from 'lucide-react';

const Funding = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f]">
            Financement
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Financer Votre Formation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plusieurs options de financement s'offrent à vous pour accéder à nos formations professionnelles.
          </p>
        </div>

        {/* Funding Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {fundingOptions.map((option) => {
            const IconComponent = Icons[option.icon];
            return (
              <Card key={option.id} className="border-2 hover:border-[#d4af37] transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <CardTitle className="text-2xl text-[#0f1f3d]">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{option.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Avantages :</h4>
                    <ul className="space-y-2">
                      {option.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quality Information */}
        <Card className="border-2 border-[#d4af37] bg-gradient-to-br from-amber-50 to-yellow-50 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0f1f3d] flex items-center space-x-2">
              <FileText className="w-6 h-6 text-[#d4af37]" />
              <span>Notre Engagement Qualité</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Cisco Networking Academy Officielle</span>
                </h3>
                <p className="text-sm text-gray-700">
                  Saint-Georges Academy est une Cisco Networking Academy officielle, garantissant un enseignement 
                  conforme aux standards internationaux de Cisco.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Référentiel National Qualité</span>
                </h3>
                <p className="text-sm text-gray-700">
                  Structure pédagogique conforme au Référentiel National Qualité. 
                  Démarche Qualiopi prévue pour garantir l'excellence de nos formations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-amber-200 mt-4">
              <p className="text-sm text-gray-700">
                <strong>Note importante :</strong> L'éligibilité au CPF est actuellement en cours d'évaluation. 
                Contactez-nous pour connaître les dernières mises à jour concernant le financement de votre formation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour le financement ?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Notre équipe est disponible pour vous accompagner dans vos démarches de financement 
              et répondre à toutes vos questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg" 
                className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold"
              >
                <a href="tel:+33549227510">
                  <Phone className="w-5 h-5 mr-2" />
                  +33 (0)5 49 22 75 10
                </a>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#0f1f3d]"
              >
                <a href="mailto:contact@saint-georges.academy">
                  <Mail className="w-5 h-5 mr-2" />
                  Nous contacter
                </a>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-600">
              <p className="text-sm text-gray-400">
                2 venelle des Amandiers, 86200 Loudun, France<br />
                SIRET: 528 616 113 00023
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#0f1f3d] text-center mb-8">
            Comment Procéder ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Choisissez votre formation',
                description: 'Sélectionnez la formation qui correspond à vos objectifs professionnels.'
              },
              {
                step: '2',
                title: 'Contactez-nous',
                description: 'Échangez avec notre équipe sur vos besoins et options de financement.'
              },
              {
                step: '3',
                title: 'Constituez votre dossier',
                description: 'Nous vous accompagnons dans la constitution de votre dossier de financement.'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;
