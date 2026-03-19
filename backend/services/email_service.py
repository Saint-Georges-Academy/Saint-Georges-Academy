import os
import asyncio
import logging
from datetime import datetime
from typing import Optional
import resend
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Initialize Resend
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


def generate_purchase_email_html(
    customer_name: str,
    customer_email: str,
    course_title: str,
    course_format: str,
    session_date: str,
    price: float,
    transaction_id: str,
    purchase_date: datetime
) -> str:
    """Generate a professional HTML email for purchase confirmation"""
    
    formatted_date = purchase_date.strftime("%d/%m/%Y")
    formatted_time = purchase_date.strftime("%H:%M")
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f5f5;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #0f1f3d 0%, #1a3a5f 100%); padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Saint-Georges Academy</h1>
                                <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px;">Official Cisco Networking Academy</p>
                            </td>
                        </tr>
                        
                        <!-- Success Icon -->
                        <tr>
                            <td style="padding: 30px 40px 20px 40px; text-align: center;">
                                <div style="width: 80px; height: 80px; background-color: #10b981; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 40px; line-height: 80px;">✓</span>
                                </div>
                                <h2 style="color: #0f1f3d; margin: 20px 0 10px 0; font-size: 24px;">Confirmation d'inscription</h2>
                                <p style="color: #666666; margin: 0; font-size: 16px;">Merci pour votre inscription, {customer_name}!</p>
                            </td>
                        </tr>
                        
                        <!-- Invoice Details -->
                        <tr>
                            <td style="padding: 0 40px 30px 40px;">
                                <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <h3 style="color: #0f1f3d; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Détails de la facture</h3>
                                            
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Numéro de transaction:</td>
                                                    <td style="padding: 8px 0; color: #0f1f3d; font-size: 14px; text-align: right; font-weight: bold;">{transaction_id}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Date d'achat:</td>
                                                    <td style="padding: 8px 0; color: #0f1f3d; font-size: 14px; text-align: right;">{formatted_date}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Heure:</td>
                                                    <td style="padding: 8px 0; color: #0f1f3d; font-size: 14px; text-align: right;">{formatted_time}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding: 15px 0 5px 0; border-top: 1px solid #dee2e6;"></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Formation:</td>
                                                    <td style="padding: 8px 0; color: #0f1f3d; font-size: 14px; text-align: right; font-weight: bold;">{course_title}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Format:</td>
                                                    <td style="padding: 8px 0; color: #0f1f3d; font-size: 14px; text-align: right;">{course_format}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Session:</td>
                                                    <td style="padding: 8px 0; color: #0f1f3d; font-size: 14px; text-align: right;">{session_date}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding: 15px 0 5px 0; border-top: 1px solid #dee2e6;"></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0; color: #0f1f3d; font-size: 18px; font-weight: bold;">Total:</td>
                                                    <td style="padding: 8px 0; color: #d4af37; font-size: 24px; text-align: right; font-weight: bold;">{price:.2f} EUR</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Client Information -->
                        <tr>
                            <td style="padding: 0 40px 30px 40px;">
                                <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #fff8e6; border-radius: 8px; border: 1px solid #d4af37;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <h3 style="color: #0f1f3d; margin: 0 0 15px 0; font-size: 16px;">Informations client</h3>
                                            <p style="color: #666666; margin: 0 0 5px 0; font-size: 14px;"><strong>Nom:</strong> {customer_name}</p>
                                            <p style="color: #666666; margin: 0; font-size: 14px;"><strong>Email:</strong> {customer_email}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Next Steps -->
                        <tr>
                            <td style="padding: 0 40px 30px 40px;">
                                <h3 style="color: #0f1f3d; margin: 0 0 15px 0; font-size: 16px;">Prochaines étapes</h3>
                                <ol style="color: #666666; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                                    <li>Vous recevrez un email de bienvenue avec vos accès à la plateforme</li>
                                    <li>Connectez-vous à votre espace étudiant pour accéder aux ressources</li>
                                    <li>Consultez le programme détaillé de votre formation</li>
                                </ol>
                            </td>
                        </tr>
                        
                        <!-- Contact Info -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 30px 40px;">
                                <h3 style="color: #0f1f3d; margin: 0 0 15px 0; font-size: 16px;">Besoin d'aide?</h3>
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="padding: 5px 0;">
                                            <span style="color: #d4af37; font-size: 16px;">📞</span>
                                            <span style="color: #666666; font-size: 14px; margin-left: 10px;">+33 (0)5 49 22 75 10</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;">
                                            <span style="color: #d4af37; font-size: 16px;">✉️</span>
                                            <span style="color: #666666; font-size: 14px; margin-left: 10px;">contact@saint-georges.academy</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;">
                                            <span style="color: #d4af37; font-size: 16px;">📍</span>
                                            <span style="color: #666666; font-size: 14px; margin-left: 10px;">2 venelle des Amandiers, 86200 Loudun, France</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #0f1f3d; padding: 20px 40px; text-align: center;">
                                <p style="color: #999999; margin: 0; font-size: 12px;">
                                    © 2024 Saint-Georges Academy. Tous droits réservés.<br>
                                    SIRET: 528 616 113 00023
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
    
    return html


async def send_purchase_confirmation_email(
    customer_name: str,
    customer_email: str,
    course_title: str,
    course_format: str,
    session_date: str,
    price: float,
    transaction_id: str
) -> dict:
    """Send purchase confirmation email to customer"""
    
    if not RESEND_API_KEY or RESEND_API_KEY == "re_placeholder_key":
        logger.warning("Resend API key not configured - skipping email")
        return {"status": "skipped", "message": "Email service not configured"}
    
    try:
        html_content = generate_purchase_email_html(
            customer_name=customer_name,
            customer_email=customer_email,
            course_title=course_title,
            course_format=course_format,
            session_date=session_date,
            price=price,
            transaction_id=transaction_id,
            purchase_date=datetime.now()
        )
        
        params = {
            "from": SENDER_EMAIL,
            "to": [customer_email],
            "subject": f"Confirmation d'inscription - {course_title} | Saint-Georges Academy",
            "html": html_content
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        email = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Purchase confirmation email sent to {customer_email}")
        return {
            "status": "success",
            "message": f"Email sent to {customer_email}",
            "email_id": email.get("id")
        }
        
    except Exception as e:
        logger.error(f"Failed to send purchase confirmation email: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        }
