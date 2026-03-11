import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, AlertTriangle, Clock, CheckCircle, FileText,
  Mail, Phone, Send, User, Building2, BookOpen, Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';

const Reclamations = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    company: '',
    formation: '',
    sessionDate: '',
    subject: '',
    description: '',
    expectation: '',
    consentData: false,
    consentContact: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consentData) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter le traitement de vos données pour soumettre votre réclamation.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Réclamation envoyée",
      description: "Nous avons bien reçu votre réclamation. Vous recevrez un accusé de réception sous 48h."
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <MessageSquare className="w-4 h-4 mr-2" />
              Qualité
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Procédure de Réclamation</h1>
            <p className="text-white/70">
              Votre satisfaction est notre priorité. Si vous n'êtes pas satisfait, 
              nous nous engageons à traiter votre réclamation avec attention.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Engagement */}
          <Card className="border-2 border-[#d4af37]">
            <CardHeader className="bg-[#d4af37]/10">
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <CheckCircle className="w-5 h-5" />
                Notre engagement qualité
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[#0f1f3d] mb-1">48h</h4>
                  <p className="text-sm text-gray-600">Accusé de réception de votre réclamation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[#0f1f3d] mb-1">15 jours</h4>
                  <p className="text-sm text-gray-600">Délai maximum de traitement</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0f1f3d] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[#0f1f3d] mb-1">100%</h4>
                  <p className="text-sm text-gray-600">Des réclamations traitées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <FileText className="w-5 h-5" />
                Comment fonctionne le traitement ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d]">Réception et accusé de réception</h4>
                    <p className="text-sm text-gray-600">
                      Votre réclamation est enregistrée et un accusé de réception vous est envoyé sous 48h ouvrées.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d]">Analyse et instruction</h4>
                    <p className="text-sm text-gray-600">
                      Notre équipe qualité analyse votre réclamation et collecte les informations nécessaires.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d]">Réponse et actions correctives</h4>
                    <p className="text-sm text-gray-600">
                      Vous recevez une réponse motivée sous 15 jours avec les actions correctives envisagées.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#d4af37] text-[#0f1f3d] rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d]">Suivi et amélioration continue</h4>
                    <p className="text-sm text-gray-600">
                      Chaque réclamation contribue à l'amélioration de nos services.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulaire */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Send className="w-5 h-5" />
                Formulaire de réclamation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Type de réclamation */}
                <div className="space-y-2">
                  <Label htmlFor="type">Type de réclamation *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le type de réclamation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pedagogique">Pédagogie / Contenu de formation</SelectItem>
                      <SelectItem value="organisationnel">Organisation / Logistique</SelectItem>
                      <SelectItem value="technique">Problème technique / Plateforme</SelectItem>
                      <SelectItem value="administratif">Administratif / Facturation</SelectItem>
                      <SelectItem value="formateur">Formateur / Accompagnement</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Informations personnelles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise / Organisation</Label>
                  <Input 
                    id="company" 
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                  />
                </div>

                {/* Formation concernée */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="formation">Formation concernée</Label>
                    <Select value={formData.formation} onValueChange={(value) => handleChange('formation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la formation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ccna1">CCNA 1 - Introduction to Networks</SelectItem>
                        <SelectItem value="ccna2">CCNA 2 - Switching & Routing</SelectItem>
                        <SelectItem value="ccna3">CCNA 3 - Enterprise Networking</SelectItem>
                        <SelectItem value="cyberops">CyberOps Associate</SelectItem>
                        <SelectItem value="unreal">Unreal Engine Fundamentals</SelectItem>
                        <SelectItem value="edge-computing">Edge Computing for Smart Towns</SelectItem>
                        <SelectItem value="videos">75 Vidéos CCNA</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionDate">Date de la session</Label>
                    <Input 
                      id="sessionDate" 
                      type="date"
                      value={formData.sessionDate}
                      onChange={(e) => handleChange('sessionDate', e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Objet de la réclamation *</Label>
                  <Input 
                    id="subject" 
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Résumez votre réclamation en une phrase"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée *</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Décrivez votre réclamation de manière détaillée (contexte, faits, dates...)"
                    rows={5}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectation">Vos attentes</Label>
                  <Textarea 
                    id="expectation" 
                    value={formData.expectation}
                    onChange={(e) => handleChange('expectation', e.target.value)}
                    placeholder="Quelle solution attendez-vous ?"
                    rows={3}
                  />
                </div>

                {/* Consentements RGPD */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-[#0f1f3d] text-sm">Protection de vos données</h4>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="consentData"
                      checked={formData.consentData}
                      onCheckedChange={(checked) => handleChange('consentData', checked)}
                    />
                    <label htmlFor="consentData" className="text-sm text-gray-600 cursor-pointer">
                      J'accepte que mes données personnelles soient traitées pour le traitement de ma réclamation, 
                      conformément à la <Link to="/politique-confidentialite" className="text-[#0f1f3d] underline">politique de confidentialité</Link>. *
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="consentContact"
                      checked={formData.consentContact}
                      onCheckedChange={(checked) => handleChange('consentContact', checked)}
                    />
                    <label htmlFor="consentContact" className="text-sm text-gray-600 cursor-pointer">
                      J'accepte d'être recontacté par téléphone si nécessaire pour le traitement de ma réclamation.
                    </label>
                  </div>

                  <p className="text-xs text-gray-500">
                    Vos données seront conservées pendant 5 ans conformément à nos obligations légales. 
                    Vous pouvez exercer vos droits en contactant <a href="mailto:dpo@saint-georges.academy" className="text-[#0f1f3d]">dpo@saint-georges.academy</a>.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#0f1f3d] hover:bg-[#1a3a5c] text-white py-6"
                >
                  {isSubmitting ? (
                    <>Envoi en cours...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer ma réclamation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Autres moyens de contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Phone className="w-5 h-5" />
                Autres moyens de nous contacter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#0f1f3d] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d]">Par email</h4>
                    <a href="mailto:qualite@saint-georges.academy" className="text-gray-600 hover:text-[#0f1f3d]">
                      qualite@saint-georges.academy
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0f1f3d] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#0f1f3d]">Par téléphone</h4>
                    <a href="tel:+33549227510" className="text-gray-600 hover:text-[#0f1f3d]">
                      +33 (0)5 49 22 75 10
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Médiation</strong>
                    <p className="mt-1">
                      Si vous n'êtes pas satisfait de notre réponse, vous pouvez saisir le médiateur de la consommation.
                      Coordonnées disponibles sur demande ou dans nos <Link to="/mentions-legales" className="underline">mentions légales</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Reclamations;
