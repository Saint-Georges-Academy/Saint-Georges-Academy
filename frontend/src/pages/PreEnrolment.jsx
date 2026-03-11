import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { 
  ClipboardCheck,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  CreditCard,
  Accessibility,
  CheckCircle,
  Send,
  Info,
  ArrowRight,
  FileText
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PreEnrolment = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'France',
    company: '',
    job_title: '',
    target_course: '',
    preferred_format: '',
    preferred_session_date: '',
    funding_type: '',
    funding_details: '',
    accessibility_needs: '',
    gdpr_consent: false,
    cgv_accepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const courses = [
    { value: 'ccna1', label: 'CCNA 1 - Introduction aux réseaux - 2 290€ (en ligne) / 3 290€ (présentiel)' },
    { value: 'ccna2', label: 'CCNA 2 - Commutation et routage - 2 290€ (en ligne) / 3 290€ (présentiel)' },
    { value: 'ccna3', label: 'CCNA 3 - Réseaux d\'entreprise - 2 290€ (en ligne) / 3 290€ (présentiel)' },
    { value: 'cyberops', label: 'CyberOps Associate - 2 290€ (en ligne) / 3 290€ (présentiel)' },
    { value: 'unreal', label: 'Unreal Engine - 3 750€ (présentiel uniquement)' },
    { value: 'bootcamp', label: 'Extreme CCNA Boot Camp - 3 290€ (présentiel uniquement)' },
    { value: 'edge-computing', label: 'Edge Computing for Smart Towns - 3 000€' },
    { value: 'videos', label: '75 Vidéos CCNA - 150€' }
  ];

  const formats = [
    { value: 'online', label: 'En ligne (distanciel)' },
    { value: 'in_class', label: 'En présentiel (Loudun)' }
  ];

  const fundingTypes = [
    { value: 'personal', label: 'Financement personnel' },
    { value: 'employer', label: 'Employeur' },
    { value: 'opco', label: 'OPCO' },
    { value: 'france_travail', label: 'France Travail (AIF)' },
    { value: 'other', label: 'Autre' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.gdpr_consent) {
      toast.error('Veuillez accepter le traitement de vos données');
      return;
    }
    
    if (!formData.cgv_accepted) {
      toast.error('Veuillez accepter les conditions générales de vente');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/admissions/pre-enrolment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setReferenceNumber(data.reference_number);
        setIsSubmitted(true);
        toast.success('Pré-inscription envoyée avec succès!');
      } else {
        throw new Error(data.detail || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi', {
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-[#0f1f3d] mb-4">
                Pré-inscription reçue
              </h1>
              <p className="text-gray-600 mb-6">
                Votre demande de pré-inscription a été enregistrée.
                Notre équipe la traitera sous 48 heures ouvrées.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200 mb-6">
                <p className="text-sm text-gray-500 mb-1">Numéro de référence</p>
                <p className="text-xl font-mono font-bold text-[#0f1f3d]">{referenceNumber}</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-[#0f1f3d] mb-2">Prochaines étapes :</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Analyse de votre demande et vérification des prérequis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Entretien de validation si nécessaire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Envoi du devis et de la convention de formation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
                    <span>Confirmation de votre inscription après validation</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-[#0f1f3d] hover:bg-[#1a3a5f]">
                  <Link to="/courses">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Voir les formations
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-[#8b1538] text-white hover:bg-[#6d1029] text-base font-bold px-6 py-2">
            <ClipboardCheck className="w-4 h-4 mr-2" />
            Pré-inscription
          </Badge>
          <h1 className="text-4xl font-bold text-[#0f1f3d] mb-4">
            Formulaire de pré-inscription
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complétez ce formulaire pour soumettre votre demande d'inscription.
            Notre équipe validera les prérequis et vous contactera.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <User className="w-6 h-6 text-[#d4af37]" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Prénom *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    data-testid="enrol-first-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Nom *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    data-testid="enrol-last-name"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="enrol-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    data-testid="enrol-phone"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <MapPin className="w-6 h-6 text-[#d4af37]" />
                Adresse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  data-testid="enrol-address"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    data-testid="enrol-city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Code postal</Label>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    data-testid="enrol-postal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    data-testid="enrol-country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Briefcase className="w-6 h-6 text-[#d4af37]" />
                Situation professionnelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    data-testid="enrol-company"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job_title">Poste actuel</Label>
                  <Input
                    id="job_title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    data-testid="enrol-job"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <GraduationCap className="w-6 h-6 text-[#d4af37]" />
                Formation souhaitée
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Formation *</Label>
                <Select 
                  value={formData.target_course} 
                  onValueChange={(v) => handleSelectChange('target_course', v)}
                >
                  <SelectTrigger data-testid="enrol-course">
                    <SelectValue placeholder="Sélectionnez une formation" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.value} value={course.value}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Modalité *</Label>
                  <Select 
                    value={formData.preferred_format} 
                    onValueChange={(v) => handleSelectChange('preferred_format', v)}
                  >
                    <SelectTrigger data-testid="enrol-format">
                      <SelectValue placeholder="En ligne ou présentiel" />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map(format => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred_session_date">Session souhaitée</Label>
                  <Input
                    id="preferred_session_date"
                    name="preferred_session_date"
                    value={formData.preferred_session_date}
                    onChange={handleChange}
                    placeholder="Ex: Janvier 2026, Mars 2026..."
                    data-testid="enrol-date"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <CreditCard className="w-6 h-6 text-[#d4af37]" />
                Financement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mode de financement *</Label>
                <Select 
                  value={formData.funding_type} 
                  onValueChange={(v) => handleSelectChange('funding_type', v)}
                >
                  <SelectTrigger data-testid="enrol-funding">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {fundingTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="funding_details">Précisions sur le financement</Label>
                <Textarea
                  id="funding_details"
                  name="funding_details"
                  value={formData.funding_details}
                  onChange={handleChange}
                  placeholder="Nom de l'OPCO, numéro de dossier, accord de prise en charge..."
                  rows={2}
                  data-testid="enrol-funding-details"
                />
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Accessibility className="w-6 h-6 text-[#d4af37]" />
                Accessibilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="accessibility_needs">Besoins spécifiques</Label>
                <Textarea
                  id="accessibility_needs"
                  name="accessibility_needs"
                  value={formData.accessibility_needs}
                  onChange={handleChange}
                  placeholder="Situation de handicap, aménagements nécessaires... Notre référent handicap vous contactera."
                  rows={2}
                  data-testid="enrol-accessibility"
                />
              </div>
            </CardContent>
          </Card>

          {/* Consents */}
          <Card className="mb-6 border-2 border-gray-200">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="gdpr_consent"
                  checked={formData.gdpr_consent}
                  onCheckedChange={(checked) => handleCheckboxChange('gdpr_consent', checked)}
                  data-testid="enrol-gdpr"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="gdpr_consent"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    J'accepte le traitement de mes données personnelles *
                  </label>
                  <p className="text-sm text-gray-500">
                    Conformément au RGPD.{' '}
                    <Link to="/rgpd" className="text-blue-600 hover:underline">
                      Politique de confidentialité
                    </Link>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="cgv_accepted"
                  checked={formData.cgv_accepted}
                  onCheckedChange={(checked) => handleCheckboxChange('cgv_accepted', checked)}
                  data-testid="enrol-cgv"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="cgv_accepted"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    J'accepte les conditions générales de vente *
                  </label>
                  <p className="text-sm text-gray-500">
                    <Link to="/cgv" className="text-blue-600 hover:underline">
                      Lire les CGV
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              type="submit" 
              size="lg"
              className="bg-[#8b1538] hover:bg-[#6d1029] text-white font-semibold"
              disabled={isSubmitting}
              data-testid="enrol-submit"
            >
              {isSubmitting ? (
                <>Envoi en cours...</>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer ma pré-inscription
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#0f1f3d] mb-2">Important</h4>
                <p className="text-sm text-gray-700">
                  Cette pré-inscription n'est pas une inscription définitive. 
                  Votre admission sera confirmée après vérification des prérequis 
                  et validation de votre financement. Un devis et une convention 
                  de formation vous seront envoyés avant confirmation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreEnrolment;
