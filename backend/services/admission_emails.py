"""
Admission Workflow Email Service for Saint-Georges Academy
Handles automated email notifications at each admission workflow stage
"""

import os
import asyncio
import logging
import resend
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

# Configure logging
logger = logging.getLogger(__name__)

# Load environment variables
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAILS = os.environ.get('ADMIN_EMAILS', 'contact@saint-georges.academy').split(',')

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


class AdmissionEmailData(BaseModel):
    recipient_email: EmailStr
    recipient_name: Optional[str] = None
    reference_number: str
    application_type: str
    course_name: Optional[str] = None
    status: str
    notes: Optional[str] = None


def get_greeting(name: Optional[str]) -> str:
    """Helper to build greeting"""
    if name:
        return f" {name}"
    return ""


def get_base_email_html(title: str, content: str, year: int) -> str:
    """Base email template wrapper"""
    return f"""
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #0f1f3d 0%, #1a3a5c 100%); padding: 25px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Saint-Georges Academy</h1>
                            <p style="color: #d4af37; margin: 8px 0 0 0; font-size: 13px;">Formation Professionnelle</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #d4af37; padding: 12px 20px; text-align: center;">
                            <h2 style="color: #0f1f3d; margin: 0; font-size: 16px;">{title}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            {content}
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e9ecef;">
                            <p style="color: #666666; font-size: 13px; margin: 0; text-align: center;">
                                <strong>Contact :</strong> contact@saint-georges.academy | +33 (0)5 49 22 75 10
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #0f1f3d; padding: 15px; text-align: center;">
                            <p style="color: #ffffff; font-size: 11px; margin: 0;">
                                &copy; {year} Saint-Georges Academy - 2 venelle des Amandiers, 86200 Loudun
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
"""


def get_enquiry_received_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    type_labels = {
        "individual": "demande de conseil en formation",
        "organisation": "demande d'analyse des besoins",
        "pre_enrolment": "demande de pre-inscription"
    }
    type_label = type_labels.get(data.application_type, "demande")
    greeting = get_greeting(data.recipient_name)
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Nous avons bien recu votre <strong>{type_label}</strong> et nous vous en remercions.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f7ff; border-radius: 8px; border: 1px solid #cce5ff; margin: 20px 0;">
        <tr>
            <td style="padding: 20px;">
                <p style="color: #004085; font-size: 14px; margin: 0 0 10px 0;"><strong>Numero de reference :</strong></p>
                <p style="color: #0f1f3d; font-size: 18px; font-family: monospace; font-weight: bold; margin: 0;">{data.reference_number}</p>
            </td>
        </tr>
    </table>
    <h3 style="color: #0f1f3d; font-size: 15px; margin: 25px 0 15px 0;">Prochaines etapes :</h3>
    <ol style="color: #333333; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>Notre equipe analyse votre demande (sous 48 heures ouvrees)</li>
        <li>Un conseiller vous contactera pour un entretien personnalise</li>
        <li>Vos prerequis seront evalues si necessaire</li>
        <li>Vous recevrez une proposition adaptee a vos besoins</li>
    </ol>
    <p style="color: #666666; font-size: 13px; line-height: 1.6; margin: 25px 0 0 0;">
        Conservez ce numero de reference pour suivre l'avancement de votre demande.
    </p>
    """
    return get_base_email_html("Demande Recue", content, year)


def get_needs_analysed_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    notes_section = ""
    if data.notes:
        notes_section = f'<p style="color: #333333; font-size: 14px; margin: 20px 0;"><strong>Observations :</strong> {data.notes}</p>'
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Suite a votre demande (ref. <strong>{data.reference_number}</strong>), nous avons analyse vos besoins de formation.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; border: 1px solid #c8e6c9; margin: 20px 0;">
        <tr>
            <td style="padding: 20px;">
                <h3 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 16px;">Analyse des besoins effectuee</h3>
                <p style="color: #333333; font-size: 14px; margin: 0;">Votre projet de formation a ete etudie par notre equipe pedagogique.</p>
            </td>
        </tr>
    </table>
    {notes_section}
    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        <strong>Prochaine etape :</strong> Verification des prerequis pour la formation envisagee.
    </p>
    """
    return get_base_email_html("Analyse des Besoins Complete", content, year)


def get_prerequisites_validated_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    notes_section = ""
    if data.notes:
        notes_section = f'<p style="color: #333333; font-size: 14px; margin: 20px 0;"><strong>Commentaires :</strong> {data.notes}</p>'
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonne nouvelle ! Vos prerequis ont ete valides pour votre demande de formation.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; border: 1px solid #c8e6c9; margin: 20px 0;">
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h3 style="color: #2e7d32; margin: 10px 0 0 0; font-size: 18px;">Prerequis Valides</h3>
                <p style="color: #333333; font-size: 14px; margin: 10px 0 0 0;">Reference : <strong>{data.reference_number}</strong></p>
            </td>
        </tr>
    </table>
    {notes_section}
    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        <strong>Prochaine etape :</strong> Vous allez recevoir un devis personnalise ainsi qu'une proposition de convention de formation.
    </p>
    """
    return get_base_email_html("Prerequis Valides", content, year)


def get_admission_approved_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    course_section = ""
    if data.course_name:
        course_section = f'<p style="color: #0f1f3d; font-size: 16px; margin: 15px 0 0 0; font-weight: bold;">{data.course_name}</p>'
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Nous avons le plaisir de vous informer que votre admission a la formation a ete <strong>approuvee</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; border: 2px solid #4caf50; margin: 20px 0;">
        <tr>
            <td style="padding: 25px; text-align: center;">
                <h3 style="color: #2e7d32; margin: 15px 0 0 0; font-size: 20px;">Admission Approuvee</h3>
                <p style="color: #333333; font-size: 14px; margin: 10px 0 0 0;">Reference : <strong>{data.reference_number}</strong></p>
                {course_section}
            </td>
        </tr>
    </table>
    <h3 style="color: #0f1f3d; font-size: 15px; margin: 25px 0 15px 0;">Prochaines etapes :</h3>
    <ol style="color: #333333; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>Vous allez recevoir un devis officiel</li>
        <li>Une convention de formation vous sera envoyee</li>
        <li>Apres signature et reglement, votre inscription sera confirmee</li>
    </ol>
    """
    return get_base_email_html("Admission Approuvee", content, year)


def get_quotation_sent_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Suite a votre demande (ref. <strong>{data.reference_number}</strong>), nous vous avons transmis un devis pour votre formation.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff8e1; border-radius: 8px; border: 1px solid #ffecb3; margin: 20px 0;">
        <tr>
            <td style="padding: 20px;">
                <h3 style="color: #f57c00; margin: 0 0 10px 0; font-size: 16px;">Devis Envoye</h3>
                <p style="color: #333333; font-size: 14px; margin: 0;">Veuillez consulter le devis en piece jointe ou dans un email separe.</p>
            </td>
        </tr>
    </table>
    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        Le devis est valable 30 jours. N'hesitez pas a nous contacter pour toute question.
    </p>
    """
    return get_base_email_html("Devis Envoye", content, year)


def get_agreement_sent_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Nous vous avons envoye la convention de formation correspondant a votre demande.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e3f2fd; border-radius: 8px; border: 1px solid #bbdefb; margin: 20px 0;">
        <tr>
            <td style="padding: 20px;">
                <h3 style="color: #1565c0; margin: 0 0 10px 0; font-size: 16px;">Convention de Formation</h3>
                <p style="color: #333333; font-size: 14px; margin: 0 0 10px 0;">Reference : <strong>{data.reference_number}</strong></p>
                <p style="color: #333333; font-size: 14px; margin: 0;">Merci de lire attentivement ce document, de le signer et de nous le retourner.</p>
            </td>
        </tr>
    </table>
    """
    return get_base_email_html("Convention de Formation Envoyee", content, year)


def get_enrolment_confirmed_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    course_section = ""
    if data.course_name:
        course_section = f'<p style="color: #0f1f3d; font-size: 16px; margin: 15px 0 0 0; font-weight: bold;">{data.course_name}</p>'
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Felicitations ! Votre inscription est maintenant <strong>confirmee</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; border: 2px solid #4caf50; margin: 20px 0;">
        <tr>
            <td style="padding: 25px; text-align: center;">
                <h3 style="color: #2e7d32; margin: 15px 0 0 0; font-size: 22px;">Inscription Confirmee</h3>
                <p style="color: #333333; font-size: 14px; margin: 10px 0 0 0;">Reference : <strong>{data.reference_number}</strong></p>
                {course_section}
            </td>
        </tr>
    </table>
    <h3 style="color: #0f1f3d; font-size: 15px; margin: 25px 0 15px 0;">Prochaines etapes :</h3>
    <ol style="color: #333333; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>Vous recevrez vos identifiants d'acces a la plateforme avant le debut de la formation</li>
        <li>Pour les formations en presentiel, une convocation vous sera envoyee</li>
        <li>Un email de bienvenue avec toutes les informations pratiques suivra</li>
    </ol>
    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        Bienvenue a la Saint-Georges Academy !
    </p>
    """
    return get_base_email_html("Inscription Confirmee", content, year)


def get_training_access_sent_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    course_section = ""
    if data.course_name:
        course_section = f'<p style="color: #0f1f3d; font-size: 16px; margin: 15px 0 0 0; font-weight: bold;">{data.course_name}</p>'
    access_info = ""
    if data.notes:
        access_info = f'<div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;"><p style="color: #333333; font-size: 14px; margin: 0;"><strong>Informations d acces :</strong></p><p style="color: #333333; font-size: 14px; margin: 10px 0 0 0;">{data.notes}</p></div>'
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Vos acces a la formation ont ete crees. Vous pouvez maintenant demarrer !
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; border: 2px solid #4caf50; margin: 20px 0;">
        <tr>
            <td style="padding: 25px; text-align: center;">
                <h3 style="color: #2e7d32; margin: 15px 0 0 0; font-size: 22px;">Acces Formation Active</h3>
                {course_section}
            </td>
        </tr>
    </table>
    {access_info}
    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        Bon apprentissage ! N'hesitez pas a nous contacter si vous rencontrez des difficultes.
    </p>
    """
    return get_base_email_html("Acces Formation Envoye", content, year)


def get_admission_refused_html(data: AdmissionEmailData) -> str:
    year = datetime.now().year
    greeting = get_greeting(data.recipient_name)
    notes_section = ""
    if data.notes:
        notes_section = f'<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3e0; border-radius: 8px; border: 1px solid #ffe0b2; margin: 20px 0;"><tr><td style="padding: 20px;"><h3 style="color: #e65100; margin: 0 0 10px 0; font-size: 16px;">Motif :</h3><p style="color: #333333; font-size: 14px; margin: 0;">{data.notes}</p></td></tr></table>'
    
    content = f"""
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Bonjour{greeting},
    </p>
    <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Suite a l'examen de votre demande (ref. <strong>{data.reference_number}</strong>), nous avons le regret de vous informer que nous ne pouvons pas donner suite favorablement a votre demande d'admission.
    </p>
    {notes_section}
    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        Cette decision ne remet pas en question vos competences. Elle est basee sur l'adequation entre les prerequis de la formation et votre profil actuel.
    </p>
    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        Nous vous invitons a nous contacter pour discuter d'autres formations qui pourraient correspondre a votre projet professionnel.
    </p>
    """
    return get_base_email_html("Decision d'Admission", content, year)


async def send_admission_email(data: AdmissionEmailData) -> dict:
    """Send admission workflow email based on status"""
    
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured, skipping admission email")
        return {"status": "skipped", "reason": "API key not configured"}
    
    templates = {
        "enquiry_received": {"func": get_enquiry_received_html, "subject": f"Demande recue - Ref. {data.reference_number}"},
        "needs_analysed": {"func": get_needs_analysed_html, "subject": f"Analyse des besoins complete - Ref. {data.reference_number}"},
        "prerequisites_reviewed": {"func": get_prerequisites_validated_html, "subject": f"Prerequis valides - Ref. {data.reference_number}"},
        "admission_approved": {"func": get_admission_approved_html, "subject": f"Admission approuvee - Ref. {data.reference_number}"},
        "admission_refused": {"func": get_admission_refused_html, "subject": f"Decision d'admission - Ref. {data.reference_number}"},
        "quotation_sent": {"func": get_quotation_sent_html, "subject": f"Devis envoye - Ref. {data.reference_number}"},
        "agreement_sent": {"func": get_agreement_sent_html, "subject": f"Convention de formation - Ref. {data.reference_number}"},
        "enrolment_confirmed": {"func": get_enrolment_confirmed_html, "subject": f"Inscription confirmee - Ref. {data.reference_number}"},
        "training_access_sent": {"func": get_training_access_sent_html, "subject": f"Acces formation - Ref. {data.reference_number}"}
    }
    
    if data.status not in templates:
        logger.warning(f"No email template for status: {data.status}")
        return {"status": "skipped", "reason": f"No template for status: {data.status}"}
    
    template = templates[data.status]
    html_content = template["func"](data)
    
    params = {
        "from": f"Saint-Georges Academy <{SENDER_EMAIL}>",
        "to": [data.recipient_email],
        "subject": template["subject"],
        "html": html_content,
        "reply_to": "contact@saint-georges.academy"
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Admission email ({data.status}) sent to {data.recipient_email}")
        return {"status": "success", "recipient": data.recipient_email, "email_status": data.status, "email_id": email.get("id")}
    except Exception as e:
        logger.error(f"Failed to send admission email: {str(e)}")
        return {"status": "error", "recipient": data.recipient_email, "error": str(e)}


async def send_admin_admission_notification(data: AdmissionEmailData) -> dict:
    """Send notification to admin when new application is received"""
    
    if not RESEND_API_KEY:
        return {"status": "skipped", "reason": "API key not configured"}
    
    type_labels = {"individual": "Demande individuelle", "organisation": "Demande organisation", "pre_enrolment": "Pre-inscription"}
    current_datetime = datetime.now().strftime("%d/%m/%Y a %H:%M")
    name_row = ""
    if data.recipient_name:
        name_row = f'<tr><td style="color: #666;">Nom :</td><td>{data.recipient_name}</td></tr>'
    
    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #0f1f3d;">Nouvelle demande d'admission</h2>
        <p>Une nouvelle demande a ete recue le <strong>{current_datetime}</strong>.</p>
        <table style="background: #f8f9fa; padding: 15px; border-radius: 8px; width: 100%;">
            <tr><td style="color: #666;">Type :</td><td><strong>{type_labels.get(data.application_type, data.application_type)}</strong></td></tr>
            <tr><td style="color: #666;">Reference :</td><td><strong>{data.reference_number}</strong></td></tr>
            <tr><td style="color: #666;">Email :</td><td>{data.recipient_email}</td></tr>
            {name_row}
        </table>
        <p style="color: #666; margin-top: 20px;">
            Connectez-vous au tableau de bord pour traiter cette demande.
        </p>
    </body>
    </html>
    """
    
    params = {
        "from": f"Saint-Georges Academy <{SENDER_EMAIL}>",
        "to": ADMIN_EMAILS,
        "subject": f"Nouvelle demande - {type_labels.get(data.application_type, 'Admission')} - {data.reference_number}",
        "html": html
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Admin notification sent for {data.reference_number}")
        return {"status": "success", "email_id": email.get("id")}
    except Exception as e:
        logger.error(f"Failed to send admin notification: {str(e)}")
        return {"status": "error", "error": str(e)}
