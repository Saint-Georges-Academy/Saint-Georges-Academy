import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, FileText, Scale, Users, Phone, Mail, MapPin, 
  Clock, Building2, CheckCircle, AlertTriangle, ExternalLink,
  Accessibility, MessageSquare, BookOpen, Award, Euro
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const MentionsLegales = () => {
  const lastUpdate = "11 mars 2026";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <Scale className="w-4 h-4 mr-2" />
              Informations légales
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Mentions Légales</h1>
            <p className="text-white/70">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 
              pour la Confiance dans l'économie numérique (LCEN).
            </p>
            <p className="text-white/50 text-sm mt-4">
              Dernière mise à jour : {lastUpdate}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Éditeur du site */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Building2 className="w-5 h-5" />
                1. Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-[#0f1f3d] mb-4">Saint-Georges Academy</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Forme juridique</p>
                    <p className="font-medium">[À compléter : SAS / SARL / Association]</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Capital social</p>
                    <p className="font-medium">[À compléter]</p>
                  </div>
                  <div>
                    <p className="text-gray-500">SIRET</p>
                    <p className="font-medium">528 616 113 00023</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Numéro TVA intracommunautaire</p>
                    <p className="font-medium">[À compléter]</p>
                  </div>
                  <div>
                    <p className="text-gray-500">RCS</p>
                    <p className="font-medium">[À compléter : RCS Poitiers]</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Code APE/NAF</p>
                    <p className="font-medium">[À compléter]</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-[#0f1f3d] mb-3">Siège social</h4>
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                    <div>
                      <p>2 venelle des Amandiers</p>
                      <p>86200 Loudun, France</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-[#0f1f3d] mb-3">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>+33 (0)5 49 22 75 10</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>contact@saint-georges.academy</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-[#0f1f3d] mb-3">Directeur de la publication</h4>
                  <p className="text-gray-700">[Nom du représentant légal à compléter]</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organisme de formation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Award className="w-5 h-5" />
                2. Activité de formation professionnelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Déclaration d'activité</strong>
                    <p className="mt-1">
                      Saint-Georges Academy est un organisme de formation déclaré sous le numéro 
                      <strong> 75 86 01243 86</strong> auprès du Préfet de la Région Nouvelle-Aquitaine.
                    </p>
                    <p className="mt-2 text-blue-700">
                      Cette déclaration ne vaut pas agrément de l'État.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <strong>Certification Qualiopi</strong>
                    <p className="mt-1">
                      [Statut de la certification Qualiopi à compléter une fois obtenue. 
                      En l'absence de certification, ne pas mentionner l'éligibilité aux financements publics.]
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm">
                Partenaire officiel <strong>Cisco Networking Academy</strong> pour la formation aux certifications CCNA et CyberOps.
              </p>
            </CardContent>
          </Card>

          {/* Hébergeur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Shield className="w-5 h-5" />
                3. Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">Le site est hébergé par :</p>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">[Nom de l'hébergeur à compléter]</p>
                  <p className="text-gray-600">[Adresse de l'hébergeur]</p>
                  <p className="text-gray-600">[Téléphone de l'hébergeur]</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <FileText className="w-5 h-5" />
                4. Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-gray-600">
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, 
                base de données, etc.) est protégé par le droit d'auteur et le droit des marques, 
                conformément aux dispositions du Code de la Propriété Intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, transmission, dénaturation, 
                totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur 
                quelque support que ce soit, est interdite sans l'autorisation écrite préalable de 
                Saint-Georges Academy.
              </p>
              <p>
                Les marques et logos figurant sur ce site sont des marques déposées. Toute reproduction 
                totale ou partielle de ces marques ou logos, effectuée à partir des éléments du site, 
                est prohibée.
              </p>
              <p className="text-sm text-gray-500">
                Cisco®, CCNA®, CyberOps® sont des marques déposées de Cisco Systems, Inc.
              </p>
            </CardContent>
          </Card>

          {/* Données personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Users className="w-5 h-5" />
                5. Protection des données personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
                Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez de droits sur vos 
                données personnelles.
              </p>
              <p className="text-gray-600">
                Pour plus d'informations sur la collecte et le traitement de vos données, 
                veuillez consulter notre :
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/politique-confidentialite" 
                  className="inline-flex items-center gap-2 bg-[#0f1f3d] text-white px-4 py-2 rounded-lg hover:bg-[#1a3a5c] transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Politique de confidentialité
                </Link>
                <Link 
                  to="/politique-cookies" 
                  className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Politique de cookies
                </Link>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-[#0f1f3d] mb-2">Délégué à la Protection des Données (DPO)</h4>
                <p className="text-sm text-gray-600">
                  Pour toute question relative à vos données personnelles :<br />
                  <a href="mailto:dpo@saint-georges.academy" className="text-[#0f1f3d] hover:underline">
                    dpo@saint-georges.academy
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <FileText className="w-5 h-5" />
                6. Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-gray-600">
              <p>
                Ce site utilise des cookies pour améliorer votre expérience de navigation. 
                Conformément à la réglementation en vigueur, nous vous informons de leur utilisation 
                et vous permettons de gérer vos préférences.
              </p>
              <p>
                Pour en savoir plus sur les cookies utilisés et gérer vos préférences, consultez notre{' '}
                <Link to="/politique-cookies" className="text-[#0f1f3d] hover:underline">
                  politique de cookies
                </Link>.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <AlertTriangle className="w-5 h-5" />
                7. Limitation de responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-gray-600">
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site 
                est périodiquement mis à jour, mais peut toutefois contenir des inexactitudes, des 
                omissions ou des lacunes.
              </p>
              <p>
                Saint-Georges Academy ne pourra être tenue responsable des dommages directs ou indirects 
                résultant de l'accès ou de l'utilisation du site, y compris l'inaccessibilité, les pertes 
                de données, détériorations, destructions ou virus qui pourraient affecter l'équipement 
                informatique de l'utilisateur.
              </p>
              <p>
                Les liens hypertextes présents sur ce site peuvent renvoyer vers d'autres sites internet. 
                La responsabilité de Saint-Georges Academy ne saurait être engagée si le contenu de ces 
                sites contrevient aux législations en vigueur.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Scale className="w-5 h-5" />
                8. Droit applicable et juridiction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-gray-600">
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, 
                et après échec de toute tentative de recherche d'une solution amiable, les tribunaux 
                français seront seuls compétents.
              </p>
              <p>
                Pour tout litige relatif à la formation professionnelle, le médiateur de la consommation 
                compétent est :
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm">
                  [Coordonnées du médiateur à compléter]<br />
                  <span className="text-gray-500">
                    Conformément à l'article L.612-1 du Code de la consommation
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Accessibilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Accessibility className="w-5 h-5" />
                9. Accessibilité
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-gray-600">
              <p>
                Saint-Georges Academy s'engage à rendre son site internet accessible conformément à 
                l'article 47 de la loi n°2005-102 du 11 février 2005.
              </p>
              <p>
                Pour plus d'informations sur notre politique d'accessibilité et nos engagements envers 
                les personnes en situation de handicap, consultez notre{' '}
                <Link to="/accessibilite" className="text-[#0f1f3d] hover:underline">
                  déclaration d'accessibilité
                </Link>.
              </p>
            </CardContent>
          </Card>

          {/* Liens utiles */}
          <Card className="bg-[#0f1f3d] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Documents complémentaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/cgv" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                  Conditions Générales de Vente
                </Link>
                <Link to="/politique-confidentialite" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Shield className="w-4 h-4" />
                  Politique de confidentialité
                </Link>
                <Link to="/politique-cookies" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                  Politique de cookies
                </Link>
                <Link to="/accessibilite" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Accessibility className="w-4 h-4" />
                  Accessibilité
                </Link>
                <Link to="/reclamations" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Procédure de réclamation
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
