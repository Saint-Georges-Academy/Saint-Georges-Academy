import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Shield, Mail, Phone, MapPin, FileText, Lock, Cookie, AlertCircle } from 'lucide-react';

const RGPD = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <Shield className="w-4 h-4 mr-2" />
            RGPD
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-gray-600">
            Conformément au Règlement général sur la protection des données (RGPD – UE 2016/679)
          </p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Responsable du traitement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <MapPin className="w-5 h-5 text-[#d4af37]" />
                1. Responsable du traitement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Saint-Georges Academy</p>
                <p className="text-gray-700">2 venelle des Amandiers</p>
                <p className="text-gray-700">86200 Loudun – France</p>
                <p className="text-gray-700">SIRET : 528 616 113 00023</p>
                <p className="text-gray-700">Téléphone : +33 (0)5 49 22 75 10</p>
              </div>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Responsable du traitement des données :</strong> Direction Saint-Georges Academy
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Email de contact RGPD :</strong>{' '}
                  <a href="mailto:contact@saint-georges.academy" className="text-blue-600 hover:underline">
                    contact@saint-georges.academy
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Données collectées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <FileText className="w-5 h-5 text-[#d4af37]" />
                2. Données collectées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">Selon l'usage du site, les données suivantes peuvent être collectées :</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Données d'identification</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Nom et Prénom</li>
                    <li>Email</li>
                    <li>Téléphone</li>
                    <li>Adresse</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Données pédagogiques</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Formation suivie</li>
                    <li>Progression</li>
                    <li>Résultats</li>
                    <li>Attestation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Données financières</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Facturation</li>
                    <li>Paiements via Stripe</li>
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                    <p className="text-sm text-amber-900">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      <strong>Important :</strong> Les données bancaires ne sont jamais stockées par Saint-Georges Academy.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Données techniques</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Adresse IP</li>
                    <li>Cookies</li>
                    <li>Données de navigation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Finalité du traitement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                3. Finalité du traitement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">Les données sont collectées pour :</p>
              <ul className="space-y-2">
                {[
                  'Gestion des inscriptions',
                  'Gestion pédagogique',
                  'Génération de devis et conventions',
                  'Facturation',
                  'Organisation des sessions en visio',
                  'Suivi qualité (satisfaction)',
                  'Obligations légales liées à la formation professionnelle'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Section 4: Base légale */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                4. Base légale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">Les traitements sont fondés sur :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>L'exécution d'un contrat (inscription formation)</li>
                <li>Le consentement (formulaires, cookies)</li>
                <li>L'obligation légale (formation professionnelle)</li>
                <li>L'intérêt légitime (amélioration des services)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5: Durée de conservation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                5. Durée de conservation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Données pédagogiques</p>
                  <p className="text-[#d4af37] text-2xl font-bold">5 ans</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Données comptables</p>
                  <p className="text-[#d4af37] text-2xl font-bold">10 ans</p>
                  <p className="text-xs text-gray-600">(obligation légale)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Données prospects</p>
                  <p className="text-[#d4af37] text-2xl font-bold">3 ans</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Cookies</p>
                  <p className="text-[#d4af37] text-2xl font-bold">13 mois</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Hébergement & Sous-traitants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                6. Hébergement & Sous-traitants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">Les données peuvent être traitées via :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hébergeur web sécurisé</li>
                <li>Stripe (paiement)</li>
                <li>Plateforme Cisco NetAcad</li>
                <li>Outils visio (Zoom / équivalent)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                Ces prestataires sont conformes aux normes de sécurité internationales.
              </p>
            </CardContent>
          </Card>

          {/* Section 7: Droits des utilisateurs */}
          <Card className="border-2 border-[#d4af37]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Shield className="w-5 h-5 text-[#d4af37]" />
                7. Droits des utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, chaque utilisateur dispose des droits suivants :
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Droit d\'accès',
                  'Droit de rectification',
                  'Droit à l\'effacement',
                  'Droit à la limitation',
                  'Droit à la portabilité',
                  'Droit d\'opposition'
                ].map((right, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-900 font-medium">{right}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-900 mb-2">
                  <strong>Demande à adresser à :</strong>
                </p>
                <p className="text-blue-600 font-semibold">contact@saint-georges.academy</p>
                <p className="text-sm text-gray-600 mt-2">Réponse sous 30 jours.</p>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Cookie className="w-5 h-5 text-[#d4af37]" />
                8. Cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">Le site utilise :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Cookies techniques nécessaires</li>
                <li>Cookies statistiques (si activés)</li>
              </ul>
              <p className="text-gray-700 mb-3">
                Un bandeau de consentement doit apparaître lors de la première visite.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  Options : <strong>"Accepter"</strong> / <strong>"Refuser"</strong> / <strong>"Personnaliser"</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 9: Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Lock className="w-5 h-5 text-[#d4af37]" />
                9. Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">Saint-Georges Academy met en œuvre :</p>
              <ul className="space-y-2">
                {[
                  'Connexion HTTPS',
                  'Stockage sécurisé',
                  'Accès restreint aux données',
                  'Sauvegardes régulières',
                  'Authentification sécurisée'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Section 10: Procédure de réclamation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                10. Procédure de réclamation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                En cas de litige non résolu, l'utilisateur peut saisir :
              </p>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">
                  Commission nationale de l'informatique et des libertés (CNIL)
                </p>
                <a 
                  href="https://www.cnil.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  www.cnil.fr
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
            <CardContent className="pt-6 text-center">
              <Mail className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Des questions sur vos données ?</h3>
              <p className="text-gray-200 mb-4">
                Notre équipe est à votre disposition pour toute question relative à la protection de vos données.
              </p>
              <a
                href="mailto:contact@saint-georges.academy"
                className="inline-block bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Nous contacter
              </a>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-sm text-gray-600 mt-8">
            <p>Dernière mise à jour : Janvier 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RGPD;
