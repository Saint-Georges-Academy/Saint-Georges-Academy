import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Building2, Globe, Server, User, Mail, Phone, MapPin } from 'lucide-react';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <Building2 className="w-4 h-4 mr-2" />
            Informations légales
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Mentions Légales
          </h1>
          <p className="text-xl text-gray-600">
            Informations légales du site saint-georges.academy
          </p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Éditeur du site */}
          <Card className="border-2 border-[#d4af37]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Building2 className="w-5 h-5 text-[#d4af37]" />
                1. Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Raison sociale :</strong><br />
                    Saint-Georges Academy
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Forme juridique :</strong><br />
                    Organisme de formation professionnelle
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-gray-900">SIRET :</strong><br />
                    528 616 113 00023
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">Adresse :</strong><br />
                      2 venelle des Amandiers<br />
                      86200 Loudun – France
                    </span>
                  </p>
                  <p className="text-gray-700 flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">Téléphone :</strong><br />
                      +33 (0)5 49 22 75 10
                    </span>
                  </p>
                  <p className="text-gray-700 flex items-start gap-2">
                    <Mail className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">Email :</strong><br />
                      contact@saint-georges.academy
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Directeur de publication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <User className="w-5 h-5 text-[#d4af37]" />
                2. Directeur de la publication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Le directeur de la publication est le représentant légal de Saint-Georges Academy.
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Contact :</strong> contact@saint-georges.academy
              </p>
            </CardContent>
          </Card>

          {/* Section 3: Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Server className="w-5 h-5 text-[#d4af37]" />
                3. Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                Le site est hébergé par un prestataire technique conforme aux normes de sécurité 
                et de protection des données en vigueur.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  Pour toute question relative à l'hébergement, veuillez contacter :<br />
                  <strong>contact@saint-georges.academy</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                4. Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                L'ensemble du contenu du site (textes, images, vidéos, logos, graphismes, icônes, 
                etc.) est la propriété exclusive de Saint-Georges Academy ou de ses partenaires, 
                et est protégé par les lois françaises et internationales relatives à la propriété 
                intellectuelle.
              </p>
              <p className="text-gray-700">
                Toute reproduction, représentation, modification, publication, adaptation de tout 
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
                interdite, sauf autorisation écrite préalable de Saint-Georges Academy.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 text-sm">
                  <strong>Marques et logos :</strong> Les logos Cisco, CCNA, CyberOps et Unreal Engine 
                  sont des marques déposées appartenant à leurs propriétaires respectifs. Leur 
                  utilisation sur ce site est effectuée dans le cadre du partenariat Cisco Networking Academy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Conditions d'utilisation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Globe className="w-5 h-5 text-[#d4af37]" />
                5. Conditions d'utilisation du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                L'utilisation du site implique l'acceptation pleine et entière des conditions 
                générales d'utilisation décrites ci-après. Ces conditions sont susceptibles d'être 
                modifiées à tout moment.
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">L'utilisateur s'engage à :</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Ne pas utiliser le site à des fins illicites</li>
                  <li>Ne pas tenter de porter atteinte au bon fonctionnement du site</li>
                  <li>Ne pas collecter d'informations sur les autres utilisateurs</li>
                  <li>Respecter les droits de propriété intellectuelle</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Limitation de responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                6. Limitation de responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Saint-Georges Academy s'efforce d'assurer l'exactitude et la mise à jour des 
                informations diffusées sur ce site. Toutefois, l'Organisme ne peut garantir 
                l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
              </p>
              <p className="text-gray-700">
                Saint-Georges Academy décline toute responsabilité :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Pour toute interruption du site</li>
                <li>Pour toute survenance de bugs ou virus</li>
                <li>Pour tout dommage résultant d'une intrusion frauduleuse d'un tiers</li>
                <li>Pour l'utilisation qui serait faite des informations du site</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 7: Liens hypertextes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                7. Liens hypertextes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Liens sortants</h3>
                <p className="text-gray-700">
                  Le site peut contenir des liens vers d'autres sites internet. Saint-Georges Academy 
                  n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Liens entrants</h3>
                <p className="text-gray-700">
                  Toute création de lien hypertexte vers le site saint-georges.academy est soumise 
                  à l'autorisation préalable de l'éditeur.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Données personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                8. Données personnelles et cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                Pour toute information relative à la collecte et au traitement des données personnelles, 
                ainsi qu'à l'utilisation des cookies, veuillez consulter notre :
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="/rgpd" 
                  className="inline-flex items-center px-4 py-2 bg-[#0f1f3d] text-white rounded-lg hover:bg-[#1a3a5f] transition-colors"
                >
                  Politique de Confidentialité (RGPD)
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Section 9: Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                9. Droit applicable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Les présentes mentions légales sont soumises au droit français. En cas de litige, 
                et après échec de toute tentative de recherche d'une solution amiable, les tribunaux 
                français seront seuls compétents.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
            <CardContent className="pt-6 text-center">
              <Mail className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Une question ?</h3>
              <p className="text-gray-200 mb-4">
                Pour toute question concernant ces mentions légales, contactez-nous.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:contact@saint-georges.academy"
                  className="inline-block bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  contact@saint-georges.academy
                </a>
                <a
                  href="tel:+33549227510"
                  className="inline-block border-2 border-white hover:bg-white hover:text-[#0f1f3d] text-white font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  +33 (0)5 49 22 75 10
                </a>
              </div>
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

export default MentionsLegales;
