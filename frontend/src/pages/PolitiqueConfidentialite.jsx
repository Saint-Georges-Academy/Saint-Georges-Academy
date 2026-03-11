import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Eye, FileText, Users, Mail, Clock, 
  CheckCircle, AlertTriangle, Database, Globe, Settings,
  Download, Trash2, Edit, XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const PolitiqueConfidentialite = () => {
  const lastUpdate = "11 mars 2026";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <Shield className="w-4 h-4 mr-2" />
              RGPD
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Politique de Confidentialité</h1>
            <p className="text-white/70">
              Comment nous collectons, utilisons et protégeons vos données personnelles, 
              conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
            <p className="text-white/50 text-sm mt-4">
              Dernière mise à jour : {lastUpdate}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Résumé rapide */}
          <Card className="border-2 border-[#d4af37]">
            <CardHeader className="bg-[#d4af37]/10">
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Eye className="w-5 h-5" />
                En résumé
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#0f1f3d]">Données collectées</p>
                    <p className="text-sm text-gray-600">Uniquement les données nécessaires à la formation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#0f1f3d]">Conservation</p>
                    <p className="text-sm text-gray-600">Durée limitée selon les obligations légales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#0f1f3d]">Vos droits</p>
                    <p className="text-sm text-gray-600">Accès, rectification, suppression, portabilité</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#0f1f3d]">Sécurité</p>
                    <p className="text-sm text-gray-600">Données chiffrées et sécurisées</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responsable du traitement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Users className="w-5 h-5" />
                1. Responsable du traitement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Le responsable du traitement des données personnelles est :
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="font-bold text-[#0f1f3d]">Saint-Georges Academy</p>
                <p className="text-gray-600">2 venelle des Amandiers, 86200 Loudun, France</p>
                <p className="text-gray-600">SIRET : 528 616 113 00023</p>
                <p className="text-gray-600 mt-4">
                  <strong>Contact DPO :</strong>{' '}
                  <a href="mailto:dpo@saint-georges.academy" className="text-[#0f1f3d] hover:underline">
                    dpo@saint-georges.academy
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Données collectées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Database className="w-5 h-5" />
                2. Données personnelles collectées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Nous collectons uniquement les données nécessaires aux finalités décrites ci-dessous, 
                dans le respect du principe de minimisation des données.
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-[#0f1f3d] mb-2">Données d'identification</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Nom et prénom</li>
                    <li>• Adresse email</li>
                    <li>• Numéro de téléphone (optionnel)</li>
                    <li>• Adresse postale (pour la facturation)</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-[#0f1f3d] mb-2">Données professionnelles</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Entreprise / Organisation (optionnel)</li>
                    <li>• Fonction / Poste (optionnel)</li>
                    <li>• Niveau d'études / Diplômes</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-[#0f1f3d] mb-2">Données de formation</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Formations suivies et dates</li>
                    <li>• Résultats aux évaluations</li>
                    <li>• Attestations et certifications obtenues</li>
                    <li>• Suivi pédagogique et progression</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-[#0f1f3d] mb-2">Données de paiement</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Historique des transactions</li>
                    <li>• Factures émises</li>
                    <li className="text-amber-600">
                      Note : Les données bancaires sont traitées par notre prestataire de paiement 
                      sécurisé (Stripe) et ne sont jamais stockées sur nos serveurs.
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-[#0f1f3d] mb-2">Données techniques</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Adresse IP</li>
                    <li>• Type de navigateur et appareil</li>
                    <li>• Pages visitées et durée de navigation</li>
                    <li>• Cookies (voir notre <Link to="/politique-cookies" className="text-[#0f1f3d] hover:underline">politique de cookies</Link>)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finalités */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <FileText className="w-5 h-5" />
                3. Finalités et bases légales du traitement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-[#0f1f3d]">Finalité</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#0f1f3d]">Base légale</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#0f1f3d]">Conservation</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="py-3 px-4">Gestion des inscriptions aux formations</td>
                      <td className="py-3 px-4">Exécution du contrat</td>
                      <td className="py-3 px-4">Durée de la formation + 5 ans</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Suivi pédagogique et évaluations</td>
                      <td className="py-3 px-4">Exécution du contrat</td>
                      <td className="py-3 px-4">Durée de la formation + 5 ans</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Émission des attestations et certificats</td>
                      <td className="py-3 px-4">Obligation légale</td>
                      <td className="py-3 px-4">Illimitée (archivage)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Facturation et comptabilité</td>
                      <td className="py-3 px-4">Obligation légale</td>
                      <td className="py-3 px-4">10 ans (Code de commerce)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Réponse aux demandes de contact</td>
                      <td className="py-3 px-4">Intérêt légitime</td>
                      <td className="py-3 px-4">3 ans après le dernier contact</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Envoi de newsletters et informations</td>
                      <td className="py-3 px-4">Consentement</td>
                      <td className="py-3 px-4">Jusqu'au retrait du consentement</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Amélioration du site et statistiques</td>
                      <td className="py-3 px-4">Consentement (cookies)</td>
                      <td className="py-3 px-4">13 mois maximum</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Gestion des réclamations</td>
                      <td className="py-3 px-4">Intérêt légitime</td>
                      <td className="py-3 px-4">5 ans</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Vos droits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Shield className="w-5 h-5" />
                4. Vos droits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-[#0f1f3d]" />
                    <h4 className="font-semibold text-[#0f1f3d]">Droit d'accès</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Obtenir la confirmation que vos données sont traitées et en recevoir une copie.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Edit className="w-5 h-5 text-[#0f1f3d]" />
                    <h4 className="font-semibold text-[#0f1f3d]">Droit de rectification</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Corriger ou compléter vos données personnelles inexactes ou incomplètes.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="w-5 h-5 text-[#0f1f3d]" />
                    <h4 className="font-semibold text-[#0f1f3d]">Droit à l'effacement</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Demander la suppression de vos données (sous réserve des obligations légales).
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-5 h-5 text-[#0f1f3d]" />
                    <h4 className="font-semibold text-[#0f1f3d]">Droit à la portabilité</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Recevoir vos données dans un format structuré et les transférer.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-[#0f1f3d]" />
                    <h4 className="font-semibold text-[#0f1f3d]">Droit d'opposition</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Vous opposer au traitement pour des motifs légitimes ou à la prospection.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-[#0f1f3d]" />
                    <h4 className="font-semibold text-[#0f1f3d]">Droit à la limitation</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Limiter temporairement le traitement de vos données.
                  </p>
                </div>
              </div>

              <div className="bg-[#0f1f3d] text-white rounded-lg p-6">
                <h4 className="font-semibold mb-3">Exercer vos droits</h4>
                <p className="text-white/80 text-sm mb-4">
                  Pour exercer vos droits, contactez notre Délégué à la Protection des Données :
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:dpo@saint-georges.academy" className="inline-flex items-center gap-2 bg-white text-[#0f1f3d] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <Mail className="w-4 h-4" />
                    dpo@saint-georges.academy
                  </a>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0f1f3d] px-4 py-2 rounded-lg hover:bg-[#c4a030] transition-colors text-sm">
                    <FileText className="w-4 h-4" />
                    Formulaire de contact
                  </Link>
                </div>
                <p className="text-white/60 text-xs mt-4">
                  Réponse sous 30 jours. Une pièce d'identité pourra vous être demandée.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Destinataires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Globe className="w-5 h-5" />
                5. Destinataires des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Vos données personnelles peuvent être transmises aux destinataires suivants :
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>Personnel habilité</strong> de Saint-Georges Academy (formateurs, administratifs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>Prestataires techniques</strong> : hébergeur, prestataire de paiement (Stripe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>Partenaires pédagogiques</strong> : Cisco Networking Academy (pour les certifications)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>Organismes de financement</strong> : OPCO, France Travail (si financement demandé)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span><strong>Autorités compétentes</strong> : en cas d'obligation légale</span>
                </li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Transferts hors UE</strong>
                    <p className="mt-1">
                      Certains de nos prestataires peuvent être situés hors de l'Union Européenne. 
                      Dans ce cas, des garanties appropriées sont mises en place (clauses contractuelles 
                      types de la Commission Européenne).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Lock className="w-5 h-5" />
                6. Sécurité des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données personnelles :
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Chiffrement des données en transit (HTTPS/TLS)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Chiffrement des mots de passe
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Accès restreint aux données (besoin d'en connaître)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Sauvegardes régulières
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Journalisation des accès
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Réclamation CNIL */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <AlertTriangle className="w-5 h-5" />
                7. Réclamation auprès de la CNIL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Si vous estimez que le traitement de vos données personnelles constitue une violation 
                du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL :
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="font-semibold text-[#0f1f3d]">Commission Nationale de l'Informatique et des Libertés (CNIL)</p>
                <p className="text-gray-600">3 Place de Fontenoy, TSA 80715</p>
                <p className="text-gray-600">75334 Paris Cedex 07</p>
                <p className="text-gray-600 mt-2">
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#0f1f3d] hover:underline">
                    www.cnil.fr
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Clock className="w-5 h-5" />
                8. Modifications de la politique
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-gray-600">
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                En cas de modification substantielle, nous vous en informerons par email ou par une 
                notification sur notre site.
              </p>
              <p>
                La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
