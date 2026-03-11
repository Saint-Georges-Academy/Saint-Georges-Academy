import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cookie, Settings, BarChart3, Shield, CheckCircle, XCircle,
  Info, ExternalLink, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

const PolitiqueCookies = () => {
  const lastUpdate = "11 mars 2026";
  
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, can't be disabled
    functional: true,
    analytics: false,
    marketing: false
  });

  const handleSavePreferences = () => {
    // Save to localStorage
    localStorage.setItem('cookie_preferences', JSON.stringify(cookiePreferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    alert('Vos préférences ont été enregistrées.');
  };

  const handleAcceptAll = () => {
    const all = { necessary: true, functional: true, analytics: true, marketing: true };
    setCookiePreferences(all);
    localStorage.setItem('cookie_preferences', JSON.stringify(all));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    alert('Tous les cookies ont été acceptés.');
  };

  const handleRejectAll = () => {
    const minimal = { necessary: true, functional: false, analytics: false, marketing: false };
    setCookiePreferences(minimal);
    localStorage.setItem('cookie_preferences', JSON.stringify(minimal));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    alert('Seuls les cookies essentiels sont activés.');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <Cookie className="w-4 h-4 mr-2" />
              Cookies
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Politique de Cookies</h1>
            <p className="text-white/70">
              Informations sur l'utilisation des cookies sur notre site et gestion de vos préférences.
            </p>
            <p className="text-white/50 text-sm mt-4">
              Dernière mise à jour : {lastUpdate}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Gestion des préférences */}
          <Card className="border-2 border-[#d4af37]">
            <CardHeader className="bg-[#d4af37]/10">
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Settings className="w-5 h-5" />
                Gérer vos préférences de cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Cookies essentiels */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-[#0f1f3d]">Cookies essentiels</h4>
                    <Badge className="bg-green-100 text-green-700 text-xs">Requis</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Nécessaires au fonctionnement du site. Ils permettent la navigation, 
                    la sécurité et l'accès aux zones sécurisées.
                  </p>
                </div>
                <Switch checked={true} disabled className="ml-4" />
              </div>

              {/* Cookies fonctionnels */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-[#0f1f3d]">Cookies fonctionnels</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Améliorent votre expérience en mémorisant vos préférences (langue, région).
                  </p>
                </div>
                <Switch 
                  checked={cookiePreferences.functional}
                  onCheckedChange={(checked) => setCookiePreferences(prev => ({...prev, functional: checked}))}
                  className="ml-4"
                />
              </div>

              {/* Cookies analytiques */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    <h4 className="font-semibold text-[#0f1f3d]">Cookies analytiques</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Nous aident à comprendre comment les visiteurs utilisent le site 
                    pour l'améliorer (statistiques anonymes).
                  </p>
                </div>
                <Switch 
                  checked={cookiePreferences.analytics}
                  onCheckedChange={(checked) => setCookiePreferences(prev => ({...prev, analytics: checked}))}
                  className="ml-4"
                />
              </div>

              {/* Cookies marketing */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <ExternalLink className="w-4 h-4 text-orange-600" />
                    <h4 className="font-semibold text-[#0f1f3d]">Cookies marketing</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Permettent d'afficher des publicités personnalisées et de mesurer 
                    l'efficacité des campagnes.
                  </p>
                </div>
                <Switch 
                  checked={cookiePreferences.marketing}
                  onCheckedChange={(checked) => setCookiePreferences(prev => ({...prev, marketing: checked}))}
                  className="ml-4"
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button onClick={handleAcceptAll} className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0f1f3d]">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tout accepter
                </Button>
                <Button onClick={handleRejectAll} variant="outline">
                  <XCircle className="w-4 h-4 mr-2" />
                  Tout refuser
                </Button>
                <Button onClick={handleSavePreferences} variant="outline" className="bg-[#0f1f3d] text-white hover:bg-[#1a3a5c]">
                  <Settings className="w-4 h-4 mr-2" />
                  Enregistrer mes choix
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Qu'est-ce qu'un cookie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Info className="w-5 h-5" />
                Qu'est-ce qu'un cookie ?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-gray-600">
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, 
                smartphone) lors de la consultation d'un site internet. Il permet au site de mémoriser 
                des informations sur votre visite, comme votre langue préférée et d'autres paramètres.
              </p>
              <p>
                Les cookies peuvent être déposés par le site que vous visitez (cookies "first party") 
                ou par des tiers (cookies "third party") comme des prestataires d'analyse ou de publicité.
              </p>
            </CardContent>
          </Card>

          {/* Liste détaillée des cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Cookie className="w-5 h-5" />
                Cookies utilisés sur ce site
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-[#0f1f3d]">Nom</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#0f1f3d]">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#0f1f3d]">Finalité</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#0f1f3d]">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-xs">auth_token</td>
                      <td className="py-3 px-4"><Badge className="bg-green-100 text-green-700">Essentiel</Badge></td>
                      <td className="py-3 px-4">Maintien de la session utilisateur</td>
                      <td className="py-3 px-4">Session</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-xs">cookie_preferences</td>
                      <td className="py-3 px-4"><Badge className="bg-green-100 text-green-700">Essentiel</Badge></td>
                      <td className="py-3 px-4">Mémorisation de vos choix de cookies</td>
                      <td className="py-3 px-4">12 mois</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-xs">i18n_language</td>
                      <td className="py-3 px-4"><Badge className="bg-blue-100 text-blue-700">Fonctionnel</Badge></td>
                      <td className="py-3 px-4">Langue préférée</td>
                      <td className="py-3 px-4">12 mois</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-xs">_ga, _gid</td>
                      <td className="py-3 px-4"><Badge className="bg-purple-100 text-purple-700">Analytique</Badge></td>
                      <td className="py-3 px-4">Google Analytics - statistiques de visite</td>
                      <td className="py-3 px-4">2 ans / 24h</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-xs">__stripe_*</td>
                      <td className="py-3 px-4"><Badge className="bg-green-100 text-green-700">Essentiel</Badge></td>
                      <td className="py-3 px-4">Sécurité des paiements (Stripe)</td>
                      <td className="py-3 px-4">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Comment gérer les cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Settings className="w-5 h-5" />
                Gestion des cookies dans votre navigateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Vous pouvez également gérer les cookies directement depuis les paramètres de votre navigateur :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-[#0f1f3d]">Google Chrome</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-[#0f1f3d]">Mozilla Firefox</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-[#0f1f3d]">Safari</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-[#0f1f3d]">Microsoft Edge</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <strong>Attention</strong>
                    <p className="mt-1">
                      Le refus ou la suppression de certains cookies peut affecter votre expérience 
                      de navigation et limiter l'accès à certaines fonctionnalités du site.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-[#0f1f3d] text-white">
            <CardContent className="py-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Questions sur les cookies ?</h3>
                  <p className="text-white/70 text-sm">Contactez notre Délégué à la Protection des Données</p>
                </div>
                <a href="mailto:dpo@saint-georges.academy" className="inline-flex items-center gap-2 bg-white text-[#0f1f3d] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  dpo@saint-georges.academy
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default PolitiqueCookies;
