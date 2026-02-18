import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FileText, AlertCircle, CreditCard, RefreshCcw, Ban, Scale, Mail } from 'lucide-react';

const CGV = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <FileText className="w-4 h-4 mr-2" />
            CGV
          </Badge>
          <h1 className="text-5xl font-bold text-[#0f1f3d] mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-xl text-gray-600">
            Applicables aux formations proposées par Saint-Georges Academy
          </p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Objet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                1. Objet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
                <strong> Saint-Georges Academy</strong> (ci-après « l'Organisme ») et toute personne physique 
                ou morale (ci-après « le Client ») souhaitant s'inscrire à une formation.
              </p>
            </CardContent>
          </Card>

          {/* Section 2: Identification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                2. Identification de l'organisme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700"><strong>Raison sociale :</strong> Saint-Georges Academy</p>
              <p className="text-gray-700"><strong>Adresse :</strong> 2 venelle des Amandiers, 86200 Loudun – France</p>
              <p className="text-gray-700"><strong>SIRET :</strong> 528 616 113 00023</p>
              <p className="text-gray-700"><strong>Téléphone :</strong> +33 (0)5 49 22 75 10</p>
              <p className="text-gray-700"><strong>Email :</strong> contact@saint-georges.academy</p>
            </CardContent>
          </Card>

          {/* Section 3: Offre de formation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                3. Offre de formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                L'Organisme propose des formations en présentiel et en ligne, notamment :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>CCNA 1 – Introduction to Networks</li>
                <li>CCNA 2 – Switching, Routing, and Wireless Essentials</li>
                <li>CCNA 3 – Enterprise Networking, Security, and Automation</li>
                <li>CyberOps Associate</li>
                <li>Unreal Engine Fundamentals</li>
                <li>75 Vidéos de Préparation CCNA</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Le détail des programmes, durées, tarifs et modalités est disponible sur le site internet 
                de l'Organisme ou sur demande.
              </p>
            </CardContent>
          </Card>

          {/* Section 4: Inscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                4. Inscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                L'inscription est réputée définitive après :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Réception du bulletin d'inscription ou de la commande en ligne</li>
                <li>Validation par l'Organisme de la candidature (le cas échéant)</li>
                <li>Signature de la convention de formation (pour les financements entreprise ou OPCO)</li>
                <li>Paiement ou accord de prise en charge</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5: Tarifs et paiement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <CreditCard className="w-5 h-5 text-[#d4af37]" />
                5. Tarifs et modalités de paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">5.1 Tarifs</h3>
                <p className="text-gray-700">
                  Les prix sont indiqués en euros TTC (TVA non applicable – article 261-4-4°a du CGI pour 
                  les organismes de formation). Les tarifs sont ceux en vigueur au moment de l'inscription.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">5.2 Modes de paiement</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Carte bancaire via Stripe</li>
                  <li>Virement bancaire</li>
                  <li>Prise en charge employeur / OPCO</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">5.3 Conditions de règlement</h3>
                <p className="text-gray-700">
                  Le paiement est exigible à la commande pour les particuliers. Pour les entreprises et OPCO, 
                  le paiement intervient selon les conditions convenues dans la convention.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Droit de rétractation */}
          <Card className="border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <RefreshCcw className="w-5 h-5 text-[#d4af37]" />
                6. Droit de rétractation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-4 rounded-lg mb-4">
                <p className="text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Important :</strong> Conformément à l'article L221-18 du Code de la consommation, 
                    le Client particulier dispose d'un délai de 14 jours à compter de la conclusion du contrat 
                    pour exercer son droit de rétractation, sans avoir à motiver sa décision.
                  </span>
                </p>
              </div>
              <p className="text-gray-700">
                Pour exercer ce droit, le Client doit notifier sa décision par email à 
                <strong> contact@saint-georges.academy</strong> ou par courrier recommandé. 
                En cas de rétractation, l'Organisme rembourse les sommes versées dans un délai de 14 jours.
              </p>
              <p className="text-gray-700 mt-3">
                <strong>Exception :</strong> Si la formation a commencé avant la fin du délai de rétractation 
                avec l'accord exprès du Client, ce dernier renonce à son droit de rétractation.
              </p>
            </CardContent>
          </Card>

          {/* Section 7: Annulation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Ban className="w-5 h-5 text-[#d4af37]" />
                7. Annulation et report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">7.1 Annulation par le Client</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Plus de 14 jours avant le début :</strong> remboursement intégral</li>
                  <li><strong>Entre 14 et 7 jours :</strong> 50% du montant retenu</li>
                  <li><strong>Moins de 7 jours :</strong> aucun remboursement (sauf cas de force majeure)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">7.2 Annulation par l'Organisme</h3>
                <p className="text-gray-700">
                  L'Organisme se réserve le droit d'annuler ou de reporter une session en cas de nombre 
                  insuffisant de participants ou de circonstances exceptionnelles. Le Client sera alors 
                  remboursé intégralement ou reporté sur une session ultérieure.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Certification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                8. Certification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                Les examens de certification Cisco (CCNA, CyberOps) ne sont pas inclus dans le tarif de la 
                formation. Ils sont à la charge du stagiaire et passés dans un centre agréé PearsonVUE.
              </p>
              <p className="text-gray-700">
                L'Organisme peut proposer l'achat d'un voucher d'examen à un tarif préférentiel.
              </p>
            </CardContent>
          </Card>

          {/* Section 9: Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                9. Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                L'ensemble des supports pédagogiques, documents, vidéos et contenus fournis dans le cadre 
                de la formation sont protégés par le droit d'auteur. Toute reproduction, diffusion ou 
                utilisation à des fins commerciales est strictement interdite sans autorisation préalable.
              </p>
            </CardContent>
          </Card>

          {/* Section 10: Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                10. Responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                L'Organisme s'engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution 
                de la formation. Il s'agit d'une obligation de moyens.
              </p>
              <p className="text-gray-700">
                L'Organisme ne saurait être tenu responsable des dommages directs ou indirects résultant 
                de l'utilisation des compétences acquises pendant la formation.
              </p>
            </CardContent>
          </Card>

          {/* Section 11: Protection des données */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                11. Protection des données personnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Les données personnelles collectées sont traitées conformément au RGPD. 
                Pour plus d'informations, consultez notre{' '}
                <a href="/rgpd" className="text-blue-600 hover:underline font-medium">
                  Politique de Confidentialité
                </a>.
              </p>
            </CardContent>
          </Card>

          {/* Section 12: Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Scale className="w-5 h-5 text-[#d4af37]" />
                12. Droit applicable et litiges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                Les présentes CGV sont soumises au droit français.
              </p>
              <p className="text-gray-700 mb-3">
                En cas de litige, les parties s'engagent à rechercher une solution amiable. 
                À défaut, le litige sera porté devant les tribunaux compétents de Poitiers.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Médiation :</strong> Conformément à l'article L612-1 du Code de la consommation, 
                  le Client peut recourir gratuitement à un médiateur de la consommation en cas de litige.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a5f] text-white">
            <CardContent className="pt-6 text-center">
              <Mail className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Des questions sur nos CGV ?</h3>
              <p className="text-gray-200 mb-4">
                Notre équipe est à votre disposition pour toute question.
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

export default CGV;
