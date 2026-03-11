import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, ChevronDown, BookOpen, Euro, Clock, Award,
  Users, FileText, Shield, Phone, MessageSquare, CreditCard,
  Building2, GraduationCap, Laptop, MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const FAQ = () => {
  const faqCategories = [
    {
      title: "Inscription et admission",
      icon: Users,
      questions: [
        {
          q: "Comment s'inscrire à une formation ?",
          a: "Pour vous inscrire, créez un compte sur notre site, sélectionnez la formation souhaitée, choisissez une session et procédez au paiement. Un email de confirmation vous sera envoyé avec toutes les informations pratiques."
        },
        {
          q: "Quels sont les prérequis pour les formations CCNA ?",
          a: "Le CCNA 1 ne nécessite aucun prérequis technique, seulement des connaissances de base en informatique. Pour les CCNA 2 et 3, il est recommandé d'avoir suivi et validé le module précédent ou de justifier d'une expérience équivalente."
        },
        {
          q: "Y a-t-il des tests de positionnement ?",
          a: "Oui, un entretien et/ou un test de positionnement peuvent être proposés pour valider l'adéquation entre votre profil et la formation choisie, et adapter le parcours si nécessaire."
        },
        {
          q: "Peut-on s'inscrire en cours de session ?",
          a: "Les inscriptions sont généralement closes 7 jours avant le début de la formation. Contactez-nous pour étudier les possibilités selon les places disponibles."
        }
      ]
    },
    {
      title: "Financement",
      icon: Euro,
      questions: [
        {
          q: "Quels sont les modes de paiement acceptés ?",
          a: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard) via notre plateforme sécurisée Stripe, ainsi que les virements bancaires pour les entreprises."
        },
        {
          q: "Les formations sont-elles finançables par les OPCO ?",
          a: "[Information à compléter selon le statut Qualiopi] Contactez votre OPCO ou notre service administratif pour étudier les possibilités de prise en charge."
        },
        {
          q: "Proposez-vous des facilités de paiement ?",
          a: "Des facilités de paiement peuvent être étudiées au cas par cas pour les particuliers. Contactez-nous pour en discuter."
        },
        {
          q: "Les formations sont-elles éligibles au CPF ?",
          a: "[Information à compléter] Les certifications Cisco peuvent être éligibles au CPF. Consultez votre compte CPF ou contactez-nous pour vérifier l'éligibilité."
        }
      ]
    },
    {
      title: "Déroulement des formations",
      icon: BookOpen,
      questions: [
        {
          q: "Quelle est la durée des formations CCNA ?",
          a: "Chaque module CCNA (1, 2 ou 3) dure environ 4 semaines en ligne ou 5 jours intensifs en présentiel. La durée totale du parcours CCNA complet est d'environ 3 mois."
        },
        {
          q: "Comment se déroulent les formations en ligne ?",
          a: "Les formations en ligne combinent sessions live avec le formateur, travaux pratiques sur simulateur (Packet Tracer), ressources sur la plateforme NetAcad, et accompagnement individuel."
        },
        {
          q: "Quel matériel est nécessaire pour les formations en ligne ?",
          a: "Un ordinateur avec connexion internet stable, un navigateur récent, et le logiciel Cisco Packet Tracer (gratuit). Les spécifications détaillées sont envoyées avant la formation."
        },
        {
          q: "Les supports de cours sont-ils fournis ?",
          a: "Oui, tous les supports pédagogiques sont inclus : accès à la plateforme NetAcad, documentation, exercices pratiques, labs virtuels."
        }
      ]
    },
    {
      title: "Certifications et évaluations",
      icon: Award,
      questions: [
        {
          q: "Comment obtenir la certification Cisco CCNA ?",
          a: "Après avoir suivi les 3 modules CCNA, vous pouvez passer l'examen de certification 200-301 dans un centre Pearson VUE. Nous vous préparons à cet examen mais le passage reste à votre charge."
        },
        {
          q: "Quel est le taux de réussite à l'examen CCNA ?",
          a: "[Taux à compléter] Nos formations préparent efficacement à l'examen. Le taux de réussite dépend également de l'investissement personnel de chaque apprenant."
        },
        {
          q: "Une attestation est-elle délivrée en fin de formation ?",
          a: "Oui, une attestation de fin de formation est systématiquement délivrée. Pour les formations Cisco, un certificat NetAcad est également fourni après validation des évaluations."
        },
        {
          q: "Comment se passent les évaluations ?",
          a: "Les évaluations comprennent des QCM, des travaux pratiques sur Packet Tracer, et un examen final. Elles sont intégrées tout au long de la formation."
        }
      ]
    },
    {
      title: "Modalités pratiques",
      icon: MapPin,
      questions: [
        {
          q: "Où se déroulent les formations en présentiel ?",
          a: "Les formations en présentiel se déroulent à Loudun (86) dans nos locaux équipés. L'adresse exacte et les informations pratiques sont communiquées à l'inscription."
        },
        {
          q: "Les repas sont-ils inclus pour les formations en présentiel ?",
          a: "Les déjeuners et pauses café sont inclus dans le tarif des formations en présentiel. L'hébergement reste à la charge du stagiaire."
        },
        {
          q: "Quels sont les horaires des formations ?",
          a: "En présentiel : 9h-12h30 et 13h30-17h. En ligne : les horaires sont communiqués avant chaque session, généralement en journée (fuseau horaire Paris)."
        },
        {
          q: "Puis-je annuler mon inscription ?",
          a: "Vous disposez d'un délai de rétractation de 14 jours après inscription. Au-delà, des frais peuvent s'appliquer selon nos CGV. Reportez-vous à nos conditions générales de vente."
        }
      ]
    },
    {
      title: "Accessibilité et handicap",
      icon: Users,
      questions: [
        {
          q: "Les formations sont-elles accessibles aux personnes handicapées ?",
          a: "Oui, nous nous engageons à adapter nos formations aux personnes en situation de handicap. Contactez notre référent handicap pour étudier les aménagements possibles."
        },
        {
          q: "Comment signaler un besoin d'aménagement ?",
          a: "Contactez-nous dès votre projet de formation à handicap@saint-georges.academy. Nous étudierons ensemble les adaptations nécessaires."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              Aide
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Questions Fréquentes</h1>
            <p className="text-white/70">
              Retrouvez les réponses aux questions les plus courantes sur nos formations.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {faqCategories.map((category, catIndex) => (
            <Card key={catIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0f1f3d]">
                  <category.icon className="w-5 h-5" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${catIndex}-${index}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium text-[#0f1f3d]">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}

          {/* Contact */}
          <Card className="bg-[#0f1f3d] text-white">
            <CardContent className="py-8 text-center">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-[#d4af37]" />
              <h3 className="text-xl font-bold mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
              <p className="text-white/70 mb-6">
                Notre équipe est à votre disposition pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0f1f3d] px-6 py-3 rounded-lg hover:bg-[#c4a030] transition-colors font-medium">
                  <MessageSquare className="w-4 h-4" />
                  Nous contacter
                </Link>
                <a href="tel:+33549227510" className="inline-flex items-center gap-2 bg-white text-[#0f1f3d] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  <Phone className="w-4 h-4" />
                  +33 (0)5 49 22 75 10
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default FAQ;
