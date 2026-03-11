"""
Email Service for Saint-Georges Academy
Handles enrollment confirmation emails, payment notifications, and admin alerts
"""

import os
import asyncio
import logging
import resend
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

# Configure logging
logger = logging.getLogger(__name__)

# Load environment variables
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'contact@saint-georges.academy')
ADMIN_EMAILS = os.environ.get('ADMIN_EMAILS', 'contact@saint-georges.academy').split(',')

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# =============================================================================
# Models
# =============================================================================

class EnrollmentEmailData(BaseModel):
    student_email: EmailStr
    student_name: Optional[str] = None
    course_name: str
    course_format: str  # "En ligne" or "Présentiel"
    session_date: str
    amount: float
    currency: str = "EUR"
    transaction_id: str
    payment_date: str

# =============================================================================
# Email Templates
# =============================================================================

def get_enrollment_email_html(data: EnrollmentEmailData) -> str:
    """Generate professional enrollment confirmation email HTML"""
    
    current_year = datetime.now().year
    
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
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0f1f3d 0%, #1a3a5c 100%); padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Saint-Georges Academy</h1>
                            <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px;">Cisco Networking Academy Partner</p>
                        </td>
                    </tr>
                    
                    <!-- Confirmation Banner -->
                    <tr>
                        <td style="background-color: #d4af37; padding: 15px; text-align: center;">
                            <h2 style="color: #0f1f3d; margin: 0; font-size: 18px;">✓ Confirmation d'Inscription</h2>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Bonjour{f' {data.student_name}' if data.student_name else ''},
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Nous avons le plaisir de vous confirmer votre inscription à la formation suivante :
                            </p>
                            
                            <!-- Course Details Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #0f1f3d; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                                            Détails de la Formation
                                        </h3>
                                        <table width="100%" cellpadding="5" cellspacing="0">
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; width: 40%;">Formation :</td>
                                                <td style="color: #0f1f3d; font-size: 14px; font-weight: bold;">{data.course_name}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px;">Format :</td>
                                                <td style="color: #0f1f3d; font-size: 14px; font-weight: bold;">{data.course_format}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px;">Session :</td>
                                                <td style="color: #0f1f3d; font-size: 14px; font-weight: bold;">{data.session_date}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Payment Details Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; border: 1px solid #c8e6c9; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #2e7d32; margin: 0 0 15px 0; font-size: 18px;">
                                            ✓ Paiement Confirmé
                                        </h3>
                                        <table width="100%" cellpadding="5" cellspacing="0">
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; width: 40%;">Montant payé :</td>
                                                <td style="color: #2e7d32; font-size: 16px; font-weight: bold;">{data.amount:.2f} {data.currency}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px;">Date de paiement :</td>
                                                <td style="color: #333333; font-size: 14px;">{data.payment_date}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px;">Référence :</td>
                                                <td style="color: #333333; font-size: 14px; font-family: monospace;">{data.transaction_id}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Next Steps -->
                            <h3 style="color: #0f1f3d; margin: 25px 0 15px 0; font-size: 16px;">Prochaines étapes :</h3>
                            <ol style="color: #333333; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                <li>Vous recevrez un email avec vos identifiants d'accès à la plateforme NetAcad avant le début de la session.</li>
                                <li>Pour les formations en présentiel, vous recevrez une convocation avec les informations pratiques.</li>
                                <li>Conservez cet email comme justificatif de paiement.</li>
                            </ol>
                        </td>
                    </tr>
                    
                    <!-- Legal Information -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3e0; border-radius: 8px; border: 1px solid #ffe0b2;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #e65100; margin: 0 0 15px 0; font-size: 16px;">
                                            Informations Légales
                                        </h3>
                                        <p style="color: #333333; font-size: 13px; line-height: 1.6; margin: 0 0 10px 0;">
                                            <strong>Droit de rétractation :</strong> Conformément à l'article L.221-18 du Code de la consommation, 
                                            vous disposez d'un délai de 14 jours à compter de la conclusion du contrat pour exercer votre droit de rétractation, 
                                            sans avoir à justifier de motifs ni à payer de pénalités. Ce droit ne s'applique pas si la formation a déjà commencé 
                                            avec votre accord exprès.
                                        </p>
                                        <p style="color: #333333; font-size: 13px; line-height: 1.6; margin: 0 0 10px 0;">
                                            <strong>Protection des données :</strong> Vos données personnelles sont traitées conformément au RGPD. 
                                            Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
                                        </p>
                                        <p style="color: #666666; font-size: 12px; line-height: 1.6; margin: 10px 0 0 0;">
                                            Pour exercer vos droits ou pour toute question : 
                                            <a href="mailto:contact@saint-georges.academy" style="color: #0f1f3d;">contact@saint-georges.academy</a>
                                        </p>
                                        <p style="color: #666666; font-size: 12px; line-height: 1.6; margin: 5px 0 0 0;">
                                            <a href="https://saint-georges.academy/cgv" style="color: #0f1f3d;">Conditions Générales de Vente</a> | 
                                            <a href="https://saint-georges.academy/rgpd" style="color: #0f1f3d;">Politique de Confidentialité</a> | 
                                            <a href="https://saint-georges.academy/mentions-legales" style="color: #0f1f3d;">Mentions Légales</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Contact Information -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e9ecef;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="width: 50%; vertical-align: top;">
                                        <h4 style="color: #0f1f3d; margin: 0 0 10px 0; font-size: 14px;">Saint-Georges Academy</h4>
                                        <p style="color: #666666; font-size: 13px; line-height: 1.6; margin: 0;">
                                            2 venelle des Amandiers<br>
                                            86200 Loudun, France<br>
                                            SIRET : 528 616 113 00023
                                        </p>
                                    </td>
                                    <td style="width: 50%; vertical-align: top; text-align: right;">
                                        <p style="color: #666666; font-size: 13px; line-height: 1.8; margin: 0;">
                                            <strong>Téléphone :</strong> +33 (0)5 49 22 75 10<br>
                                            <strong>Email :</strong> contact@saint-georges.academy<br>
                                            <strong>Web :</strong> saint-georges.academy
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0f1f3d; padding: 20px; text-align: center;">
                            <p style="color: #ffffff; font-size: 12px; margin: 0;">
                                © {current_year} Saint-Georges Academy - Tous droits réservés
                            </p>
                            <p style="color: #d4af37; font-size: 11px; margin: 10px 0 0 0;">
                                Organisme de formation déclaré sous le numéro 75 86 01243 86
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


def get_admin_notification_html(data: EnrollmentEmailData) -> str:
    """Generate admin notification email HTML"""
    
    current_datetime = datetime.now().strftime("%d/%m/%Y à %H:%M")
    
    return f"""
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0f1f3d; padding: 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">🔔 Nouvelle Inscription</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 25px;">
                            <p style="color: #333333; font-size: 14px; margin: 0 0 20px 0;">
                                Une nouvelle inscription a été enregistrée le <strong>{current_datetime}</strong>.
                            </p>
                            
                            <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px;">
                                <tr style="border-bottom: 1px solid #e9ecef;">
                                    <td style="color: #666666; font-size: 13px; width: 35%;">Étudiant :</td>
                                    <td style="color: #0f1f3d; font-size: 13px; font-weight: bold;">{data.student_name or 'Non spécifié'}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e9ecef;">
                                    <td style="color: #666666; font-size: 13px;">Email :</td>
                                    <td style="color: #0f1f3d; font-size: 13px;"><a href="mailto:{data.student_email}">{data.student_email}</a></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e9ecef;">
                                    <td style="color: #666666; font-size: 13px;">Formation :</td>
                                    <td style="color: #0f1f3d; font-size: 13px; font-weight: bold;">{data.course_name}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e9ecef;">
                                    <td style="color: #666666; font-size: 13px;">Format :</td>
                                    <td style="color: #0f1f3d; font-size: 13px;">{data.course_format}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e9ecef;">
                                    <td style="color: #666666; font-size: 13px;">Session :</td>
                                    <td style="color: #0f1f3d; font-size: 13px;">{data.session_date}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e9ecef;">
                                    <td style="color: #666666; font-size: 13px;">Montant :</td>
                                    <td style="color: #2e7d32; font-size: 14px; font-weight: bold;">{data.amount:.2f} {data.currency}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666666; font-size: 13px;">Référence :</td>
                                    <td style="color: #333333; font-size: 12px; font-family: monospace;">{data.transaction_id}</td>
                                </tr>
                            </table>
                            
                            <p style="color: #666666; font-size: 12px; margin: 20px 0 0 0; text-align: center;">
                                Cet email a été envoyé automatiquement par le système de paiement.
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


# =============================================================================
# Email Sending Functions
# =============================================================================

async def send_enrollment_confirmation(data: EnrollmentEmailData) -> dict:
    """Send enrollment confirmation email to student"""
    
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured, skipping email")
        return {"status": "skipped", "reason": "API key not configured"}
    
    html_content = get_enrollment_email_html(data)
    
    params = {
        "from": f"Saint-Georges Academy <{SENDER_EMAIL}>",
        "to": [data.student_email],
        "subject": f"✓ Confirmation d'inscription - {data.course_name}",
        "html": html_content,
        "reply_to": "contact@saint-georges.academy"
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Enrollment email sent to {data.student_email}")
        return {
            "status": "success",
            "recipient": data.student_email,
            "email_id": email.get("id")
        }
    except Exception as e:
        logger.error(f"Failed to send enrollment email: {str(e)}")
        return {
            "status": "error",
            "recipient": data.student_email,
            "error": str(e)
        }


async def send_admin_notification(data: EnrollmentEmailData) -> dict:
    """Send notification email to admin team"""
    
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured, skipping admin notification")
        return {"status": "skipped", "reason": "API key not configured"}
    
    html_content = get_admin_notification_html(data)
    
    params = {
        "from": f"Saint-Georges Academy <{SENDER_EMAIL}>",
        "to": ADMIN_EMAILS,
        "subject": f"🔔 Nouvelle inscription - {data.course_name} - {data.student_email}",
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Admin notification sent to {ADMIN_EMAILS}")
        return {
            "status": "success",
            "recipients": ADMIN_EMAILS,
            "email_id": email.get("id")
        }
    except Exception as e:
        logger.error(f"Failed to send admin notification: {str(e)}")
        return {
            "status": "error",
            "recipients": ADMIN_EMAILS,
            "error": str(e)
        }


async def send_all_enrollment_emails(data: EnrollmentEmailData) -> dict:
    """Send both student confirmation and admin notification emails"""
    
    results = {
        "student_email": None,
        "admin_notification": None
    }
    
    # Send student confirmation
    results["student_email"] = await send_enrollment_confirmation(data)
    
    # Send admin notification
    results["admin_notification"] = await send_admin_notification(data)
    
    return results
