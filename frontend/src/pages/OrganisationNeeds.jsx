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
  Building2,
  Mail,
  Phone,
  Users,
  Target,
  Calendar,
  FileText,
  CheckCircle,
  Send,
  Info,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const OrganisationNeeds = () => {
  const [formData, setFormData] = useState({
    organisation_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    country: 'France',
    organisation_type: '',
    project_context: '',
    target_audience: '',
    number_of_learners: '',
    expected_skills: '',
    current_skill_gaps: '',
    deployment_constraints: '',
    desired_schedule: '',
    preferred_format: '',
    certification_expectations: '',
    reporting_expectations: '',
    gdpr_consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const organisationTypes = [
    { value: 'company_small', label: 'PME (1-50 salariés)' },
    { value: 'company_medium', label: 'ETI (51-250 salariés)' },
    { value: 'company_large', label: 'Grande entreprise (250+ salariés)' },
    { value: 'school', label: 'Établissement scolaire' },
    { value: 'university', label: 'Université / École supérieure' },
    { value: 'training_centre', label: 'Centre de formation' },
    { value: 'public_sector', label: 'Secteur public / Administration' },
    { value: 'other', label: 'Autre' }
  ];

  const learnerCounts = [
    { value: '1-5', label: '1 à 5 personnes' },
    { value: '6-10', label: '6 à 10 personnes' },
    { value: '11-20', label: '11 à 20 personnes' },
    { value: '21-50', label: '21 à 50 personnes' },
    { value: '50+', label: 'Plus de 50 personnes' }
  ];

  const formats = [
    { value: 'online', label: 'En ligne (distanciel)' },
    { value: 'in_class', label: 'En présentiel' },
    { value: 'hybrid', label: 'Hybride' },
    { value: 'on_site', label: 'Intra-entreprise (sur site)' },
    { value: 'flexible', label: 'À définir ensemble' }
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
      const response = await fetch(`${API_URL}/api/admissions/organisation-needs`, {
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
                Votre demande d'analyse des besoins a été enregistrée.
                Notre équipe commerciale vous contactera sous 48 heures ouvrées.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200 mb-6">
                <p className="text-sm text-gray-500 mb-1">Numéro de référence</p>
                <p className="text-xl font-mono font-bold text-[#0f1f3d]">{referenceNumber}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-[#0f1f3d] hover:bg-[#1a3a5f]">
                  <Link to="/courses">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Voir nos formations
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Nous contacter</Link>
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
          <Badge className="mb-4 bg-[#0f1f3d] text-white hover:bg-[#1a3a5f] text-base font-bold px-6 py-2">
            <Building2 className="w-4 h-4 mr-2" />
            Entreprises & Institutions
          </Badge>
          <h1 className="text-4xl font-bold text-[#0f1f3d] mb-4">
            Analyse des besoins de votre organisation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Décrivez votre projet de formation. Notre équipe vous proposera 
            une solution adaptée à vos objectifs et contraintes.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Organisation Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Building2 className="w-6 h-6 text-[#d4af37]" />
                Informations organisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organisation_name">Nom de l'organisation *</Label>
                  <Input
                    id="organisation_name"
                    name="organisation_name"
                    value={formData.organisation_name}
                    onChange={handleChange}
                    required
                    data-testid="org-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type d'organisation *</Label>
                  <Select 
                    value={formData.organisation_type} 
                    onValueChange={(v) => handleSelectChange('organisation_type', v)}
                  >
                    <SelectTrigger data-testid="org-type">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {organisationTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays *</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  data-testid="org-country"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Mail className="w-6 h-6 text-[#d4af37]" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_name">Nom du contact *</Label>
                  <Input
                    id="contact_name"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    data-testid="org-contact-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email *</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    required
                    data-testid="org-contact-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Téléphone</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  data-testid="org-contact-phone"
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Context */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Briefcase className="w-6 h-6 text-[#d4af37]" />
                Contexte du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project_context">Contexte et enjeux *</Label>
                <Textarea
                  id="project_context"
                  name="project_context"
                  value={formData.project_context}
                  onChange={handleChange}
                  placeholder="Décrivez le contexte du projet de formation : besoins de l'entreprise, enjeux stratégiques, problématiques à résoudre..."
                  rows={4}
                  required
                  data-testid="org-context"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target_audience">Public cible *</Label>
                <Textarea
                  id="target_audience"
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleChange}
                  placeholder="Qui sera formé ? (profils, fonctions, niveaux, prérequis actuels...)"
                  rows={2}
                  required
                  data-testid="org-audience"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre de personnes à former *</Label>
                  <Select 
                    value={formData.number_of_learners} 
                    onValueChange={(v) => handleSelectChange('number_of_learners', v)}
                  >
                    <SelectTrigger data-testid="org-learners">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {learnerCounts.map(count => (
                        <SelectItem key={count.value} value={count.value}>
                          {count.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Modalité souhaitée *</Label>
                  <Select 
                    value={formData.preferred_format} 
                    onValueChange={(v) => handleSelectChange('preferred_format', v)}
                  >
                    <SelectTrigger data-testid="org-format">
                      <SelectValue placeholder="Sélectionnez" />
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
              </div>
            </CardContent>
          </Card>

          {/* Skills & Gaps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Target className="w-6 h-6 text-[#d4af37]" />
                Compétences visées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expected_skills">Compétences attendues *</Label>
                <Textarea
                  id="expected_skills"
                  name="expected_skills"
                  value={formData.expected_skills}
                  onChange={handleChange}
                  placeholder="Quelles compétences souhaitez-vous développer chez vos collaborateurs ?"
                  rows={3}
                  required
                  data-testid="org-skills"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current_skill_gaps">Lacunes actuelles identifiées *</Label>
                <Textarea
                  id="current_skill_gaps"
                  name="current_skill_gaps"
                  value={formData.current_skill_gaps}
                  onChange={handleChange}
                  placeholder="Quelles sont les lacunes ou manques de compétences que vous avez identifiés ?"
                  rows={3}
                  required
                  data-testid="org-gaps"
                />
              </div>
            </CardContent>
          </Card>

          {/* Constraints & Logistics */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <Calendar className="w-6 h-6 text-[#d4af37]" />
                Contraintes et planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deployment_constraints">Contraintes de déploiement</Label>
                <Textarea
                  id="deployment_constraints"
                  name="deployment_constraints"
                  value={formData.deployment_constraints}
                  onChange={handleChange}
                  placeholder="Contraintes organisationnelles, techniques, géographiques..."
                  rows={2}
                  data-testid="org-constraints"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desired_schedule">Planning souhaité</Label>
                <Textarea
                  id="desired_schedule"
                  name="desired_schedule"
                  value={formData.desired_schedule}
                  onChange={handleChange}
                  placeholder="Dates souhaitées, périodes à éviter, rythme de formation préféré..."
                  rows={2}
                  data-testid="org-schedule"
                />
              </div>
            </CardContent>
          </Card>

          {/* Expectations */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                <FileText className="w-6 h-6 text-[#d4af37]" />
                Attentes complémentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certification_expectations">Attentes en certification</Label>
                <Textarea
                  id="certification_expectations"
                  name="certification_expectations"
                  value={formData.certification_expectations}
                  onChange={handleChange}
                  placeholder="Certifications visées, attestations, reconnaissance des acquis..."
                  rows={2}
                  data-testid="org-certification"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reporting_expectations">Attentes en reporting</Label>
                <Textarea
                  id="reporting_expectations"
                  name="reporting_expectations"
                  value={formData.reporting_expectations}
                  onChange={handleChange}
                  placeholder="Indicateurs de suivi, rapports, évaluations attendus..."
                  rows={2}
                  data-testid="org-reporting"
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
                  data-testid="org-gdpr-consent"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="gdpr_consent"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    J'accepte le traitement des données de mon organisation *
                  </label>
                  <p className="text-sm text-gray-500">
                    Les informations recueillies font l'objet d'un traitement destiné à 
                    l'élaboration d'une proposition de formation. Conformément au RGPD, 
                    vous disposez d'un droit d'accès, de rectification et de suppression.{' '}
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
              data-testid="org-submit"
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
                <h4 className="font-semibold text-[#0f1f3d] mb-2">Notre processus</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Analyse de votre demande sous 48 heures</li>
                  <li>• Entretien de découverte avec notre équipe commerciale</li>
                  <li>• Proposition de formation sur mesure</li>
                  <li>• Convention de formation et devis personnalisés</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganisationNeeds;
