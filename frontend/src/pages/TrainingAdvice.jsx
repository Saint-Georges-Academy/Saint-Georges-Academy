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
  UserCircle,
  Mail,
  Phone,
  Target,
  Briefcase,
  GraduationCap,
  Calendar,
  Globe,
  Accessibility,
  CheckCircle,
  ArrowRight,
  Send,
  Shield,
  Info
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TrainingAdvice = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    target_course: '',
    current_level: '',
    professional_background: '',
    learner_objective: '',
    expected_outcomes: '',
    preferred_format: '',
    schedule_constraints: '',
    language_preference: 'french',
    accessibility_needs: '',
    specific_support_needs: '',
    prior_experience: '',
    reason_for_choosing: '',
    gdpr_consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const courses = [
    { value: 'ccna1', label: 'CCNA 1 - Introduction aux réseaux' },
    { value: 'ccna2', label: 'CCNA 2 - Commutation et routage' },
    { value: 'ccna3', label: 'CCNA 3 - Réseaux d\'entreprise' },
    { value: 'cyberops', label: 'CyberOps Associate' },
    { value: 'unreal', label: 'Unreal Engine' },
    { value: 'bootcamp', label: 'Extreme CCNA Boot Camp' },
    { value: 'edge-computing', label: 'Edge Computing for Smart Towns' },
    { value: 'videos', label: '75 Vidéos CCNA' },
    { value: 'other', label: 'Autre / Je ne sais pas' }
  ];

  const levels = [
    { value: 'debutant', label: 'Débutant - Aucune expérience' },
    { value: 'notions', label: 'Notions de base acquises' },
    { value: 'intermediaire', label: 'Intermédiaire - Pratique régulière' },
    { value: 'avance', label: 'Avancé - Expérience professionnelle' }
  ];

  const formats = [
    { value: 'online', label: 'En ligne (distanciel)' },
    { value: 'in_class', label: 'En présentiel (Loudun)' },
    { value: 'hybrid', label: 'Hybride' },
    { value: 'undecided', label: 'Je ne sais pas encore' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({ ...prev, gdpr_consent: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.gdpr_consent) {
      toast.error('Veuillez accepter le traitement de vos données');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/admissions/individual-needs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setReferenceNumber(data.reference_number);
        setIsSubmitted(true);
        toast.success('Demande envoyée avec succès!');
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
                Demande envoyée
              </h1>
              <p className="text-gray-600 mb-6">
                Votre demande de conseil en formation a été enregistrée.
                Notre équipe vous contactera sous 48 heures ouvrées.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200 mb-6">
                <p className="text-sm text-gray-500 mb-1">Numéro de référence</p>
                <p className="text-xl font-mono font-bold text-[#0f1f3d]">{referenceNumber}</p>
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
          <Badge className="mb-4 bg-[#d4af37] text-[#0f1f3d] hover:bg-[#b8941f] text-base font-bold px-6 py-2">
            <UserCircle className="w-4 h-4 mr-2" />
            Conseil en Formation
          </Badge>
          <h1 className="text-4xl font-bold text-[#0f1f3d] mb-4">
            Analyse de vos besoins de formation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complétez ce formulaire pour nous permettre de vous conseiller 
            la formation la plus adaptée à vos objectifs professionnels.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <UserCircle className="w-6 h-6 text-[#d4af37]" />
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
                    data-testid="advice-first-name"
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
                    data-testid="advice-last-name"
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
                    data-testid="advice-email"
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
                    data-testid="advice-phone"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Target className="w-6 h-6 text-[#d4af37]" />
                Formation visée
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Formation souhaitée *</Label>
                  <Select 
                    value={formData.target_course} 
                    onValueChange={(v) => handleSelectChange('target_course', v)}
                  >
                    <SelectTrigger data-testid="advice-course">
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
                <div className="space-y-2">
                  <Label>Niveau actuel *</Label>
                  <Select 
                    value={formData.current_level} 
                    onValueChange={(v) => handleSelectChange('current_level', v)}
                  >
                    <SelectTrigger data-testid="advice-level">
                      <SelectValue placeholder="Votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Modalité préférée *</Label>
                <Select 
                  value={formData.preferred_format} 
                  onValueChange={(v) => handleSelectChange('preferred_format', v)}
                >
                  <SelectTrigger data-testid="advice-format">
                    <SelectValue placeholder="Comment souhaitez-vous suivre la formation ?" />
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
            </CardContent>
          </Card>

          {/* Professional Background */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Briefcase className="w-6 h-6 text-[#d4af37]" />
                Contexte professionnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="professional_background">Parcours professionnel *</Label>
                <Textarea
                  id="professional_background"
                  name="professional_background"
                  value={formData.professional_background}
                  onChange={handleChange}
                  placeholder="Décrivez brièvement votre parcours (poste actuel, secteur, expérience...)"
                  rows={3}
                  required
                  data-testid="advice-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prior_experience">Expérience préalable dans le domaine</Label>
                <Textarea
                  id="prior_experience"
                  name="prior_experience"
                  value={formData.prior_experience}
                  onChange={handleChange}
                  placeholder="Formations, certifications, ou expériences en lien avec la formation visée"
                  rows={2}
                  data-testid="advice-experience"
                />
              </div>
            </CardContent>
          </Card>

          {/* Objectives */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <GraduationCap className="w-6 h-6 text-[#d4af37]" />
                Objectifs et attentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="learner_objective">Objectif de la formation *</Label>
                <Textarea
                  id="learner_objective"
                  name="learner_objective"
                  value={formData.learner_objective}
                  onChange={handleChange}
                  placeholder="Que souhaitez-vous accomplir grâce à cette formation ? (reconversion, montée en compétences, certification...)"
                  rows={3}
                  required
                  data-testid="advice-objective"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected_outcomes">Résultats attendus *</Label>
                <Textarea
                  id="expected_outcomes"
                  name="expected_outcomes"
                  value={formData.expected_outcomes}
                  onChange={handleChange}
                  placeholder="Quelles compétences concrètes souhaitez-vous acquérir ?"
                  rows={2}
                  required
                  data-testid="advice-outcomes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason_for_choosing">Pourquoi Saint-Georges Academy ? *</Label>
                <Textarea
                  id="reason_for_choosing"
                  name="reason_for_choosing"
                  value={formData.reason_for_choosing}
                  onChange={handleChange}
                  placeholder="Comment avez-vous connu notre académie ? Pourquoi nous choisir ?"
                  rows={2}
                  required
                  data-testid="advice-reason"
                />
              </div>
            </CardContent>
          </Card>

          {/* Constraints & Support */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Calendar className="w-6 h-6 text-[#d4af37]" />
                Contraintes et accompagnement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule_constraints">Contraintes de planning</Label>
                <Textarea
                  id="schedule_constraints"
                  name="schedule_constraints"
                  value={formData.schedule_constraints}
                  onChange={handleChange}
                  placeholder="Disponibilités, contraintes horaires, dates préférées..."
                  rows={2}
                  data-testid="advice-schedule"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Langue de formation</Label>
                  <Select 
                    value={formData.language_preference} 
                    onValueChange={(v) => handleSelectChange('language_preference', v)}
                  >
                    <SelectTrigger data-testid="advice-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="french">Français</SelectItem>
                      <SelectItem value="english">Anglais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessibility_needs">
                  <span className="flex items-center gap-2">
                    <Accessibility className="w-4 h-4" />
                    Besoins en accessibilité
                  </span>
                </Label>
                <Textarea
                  id="accessibility_needs"
                  name="accessibility_needs"
                  value={formData.accessibility_needs}
                  onChange={handleChange}
                  placeholder="Indiquez tout besoin spécifique (situation de handicap, aménagements...)"
                  rows={2}
                  data-testid="advice-accessibility"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specific_support_needs">Besoins d'accompagnement particuliers</Label>
                <Textarea
                  id="specific_support_needs"
                  name="specific_support_needs"
                  value={formData.specific_support_needs}
                  onChange={handleChange}
                  placeholder="Accompagnement administratif, aide au financement, autres besoins..."
                  rows={2}
                  data-testid="advice-support"
                />
              </div>
            </CardContent>
          </Card>

          {/* GDPR Consent */}
          <Card className="mb-6 border-2 border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="gdpr_consent"
                  checked={formData.gdpr_consent}
                  onCheckedChange={handleCheckboxChange}
                  data-testid="advice-gdpr-consent"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="gdpr_consent"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    J'accepte le traitement de mes données personnelles *
                  </label>
                  <p className="text-sm text-gray-500">
                    Les informations recueillies font l'objet d'un traitement informatique destiné à 
                    l'analyse de vos besoins de formation. Conformément au RGPD, vous disposez d'un 
                    droit d'accès, de rectification et de suppression de vos données.{' '}
                    <Link to="/rgpd" className="text-blue-600 hover:underline">
                      Politique de confidentialité
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
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0f1f3d] font-semibold"
              disabled={isSubmitting}
              data-testid="advice-submit"
            >
              {isSubmitting ? (
                <>Envoi en cours...</>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer ma demande
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#0f1f3d] mb-2">Prochaines étapes</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Notre équipe analyse votre demande sous 48 heures</li>
                  <li>• Un conseiller vous contactera pour un entretien personnalisé</li>
                  <li>• Vos prérequis seront évalués si nécessaire</li>
                  <li>• Vous recevrez une proposition de formation adaptée</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingAdvice;
