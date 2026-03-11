# Saint-Georges Academy - Product Requirements Document

## Project Overview
Official Cisco Networking Academy training platform for Saint-Georges Academy in Loudun, France.

**Organization Details:**
- Name: Saint-Georges Academy
- Location: 2 venelle des Amandiers, 86200 Loudun, France
- Phone: +33 (0)5 49 22 75 10
- SIRET: 528 616 113 00023
- Website: https://saint-georges.academy/

## Core Requirements

### Training Programs
1. **CCNA 1, 2, 3** - Network fundamentals (3 separate courses)
2. **CyberOps Associate** - Cybersecurity operations
3. **Unreal Engine** - Game development (in-class only)
4. **75 CCNA Preparation Videos** - Standalone product

### Delivery Formats
- **Online Format** (2290€): NetAcad access, weekly 45-min live sessions, labs, support
- **In-Class Format** (3290€): 35 hours intensive, on-site equipment, instructor-led
- **Videos Only** (150€): 75 videos, self-paced, 12-month access
- **Unreal Engine** (3750€): In-class only, 35 hours

### Certification
- Cisco exams: 630€ (not included in course price)
- Via PearsonVUE centers
- Internal certificate for Unreal Engine

### Funding Options
- Personal financing
- Employer funding
- OPCO
- NOT CPF eligible (yet)

---

## What's Been Implemented

### Phase 1 - Completed (Dec 2024)
✅ **Frontend Landing Page** with mock data
- Home page with hero, stats, features
- Course catalog with filtering
- Individual course detail pages with format selection
- 75 Videos product page
- Funding information page
- Contact page with form
- Responsive navbar and footer
- Professional institutional design (navy #0f1f3d + gold #d4af37)
- Toast notifications

### Phase 1.5 - Completed (Jan 2026)
✅ **Multilingual Support**
- French, English, Croatian languages
- i18next integration with language switcher

✅ **Legal Pages**
- RGPD (Politique de Confidentialité) - /rgpd
- CGV (Conditions Générales de Vente) - /cgv
- Mentions Légales - /mentions-legales
- Indicateurs de Performance (Qualiopi) - /indicateurs
- Footer updated with legal links section

✅ **Certification Purchase Feature**
- Dedicated page at /certification
- Certification selection (CCNA, CyberOps)
- Date picker for exam scheduling (14+ days in future)
- Complete billing form
- RGPD and CGV consent checkboxes
- Stripe payment integration
- Detailed receipt generation with print option

✅ **PDF Program Downloads**
- Professional PDF generation for each course
- Includes: Objectives, Skills, Modules, Prerequisites, Target Audience, Modalities
- Branded with Saint-Georges Academy colors
- Download button on all course detail pages

✅ **Additional Pages**
- Procédure d'Inscription (/inscription)
- Accessibilité & Référent Handicap (/accessibilite)
- FAQ Page (/faq)
- About Page (/about)

✅ **Stripe Payment Integration**
- Real Stripe Checkout (test mode)
- 12 products configured (all courses, videos, certifications)
- Backend API: /api/payments/checkout, /api/payments/status, /api/payments/products
- Webhook handler for payment confirmation
- Payment success/cancel pages
- Transaction tracking in MongoDB

### Phase 2 - Session Selection (Feb 2026)
✅ **Course Session Selection Feature**
- Session selector dropdown on all course detail pages
- Format-specific date generation
- Dynamic session generation based on current date
- Selected session info passed to Stripe checkout

### Phase 3 - P0 Features (Feb 2026) ✅ NEW
✅ **Database Migration**
- Migrated all course data from mock.js to MongoDB
- Seed endpoint: POST /api/courses/seed
- 6 courses + 1 video product in database (including Extreme CCNA Boot Camp)
- API endpoints:
  - GET /api/courses - List all courses
  - GET /api/courses/{id} - Get course details
  - GET /api/courses/videos - Get video product
  - POST /api/courses/add-bootcamp - Add bootcamp course
  - POST /api/courses/update-inclass-features - Update meal features

✅ **User Authentication System**
- User registration with email/password
- JWT token-based authentication (24-hour expiry)
- Password hashing with bcrypt
- Login/logout functionality
- Profile management
- Password change
- Password reset request
- Email verification (placeholder)
- API endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me
  - PUT /api/auth/me
  - POST /api/auth/change-password
  - POST /api/auth/request-password-reset
  - POST /api/auth/reset-password
  - POST /api/auth/verify-email
  - GET /api/auth/users (admin only)
  - PUT /api/auth/users/{id}/role (admin only)

✅ **Student Dashboard**
- Protected route (requires authentication)
- Dashboard summary with stats
- My Courses section (purchased courses)
- Video Access section (75 CCNA videos)
- Orders history
- Profile settings
- API endpoints:
  - GET /api/dashboard/summary
  - GET /api/dashboard/my-courses
  - GET /api/dashboard/video-access
  - GET /api/dashboard/course/{id}/progress
  - POST /api/dashboard/course/{id}/progress
  - GET /api/dashboard/orders

✅ **Frontend Auth Components**
- Auth page (/auth) with login/register tabs
- AuthContext for state management
- ProtectedRoute component
- Navbar integration (shows user name when logged in)
- Dashboard page with multiple sections

### Phase 3.5 - New Course & Updates (Feb 2026) ✅ NEW
✅ **Extreme CCNA Boot Camp**
- New course: "Extreme CCNA Boot Camp"
- In-class only: 3290€
- Duration: 35 hours (1 week intensive)
- 75 labs on Packet Tracer
- Highlighted with "Intensif" badge on courses page
- Full course detail page with modules, objectives, skills

✅ **Meal Service for In-Class Courses**
- All in-class courses now include:
  - Petit-déjeuner continental (Continental breakfast)
  - Déjeuner (Lunch)
- Visible in course detail pages for in-class format
- Added to inClassFeatures for all courses

✅ **Frontend API Integration**
- Courses page now fetches from /api/courses (not mock.js)
- CourseDetail page fetches individual course from API
- Proper loading states and error handling

### Phase 4 - Institutional Bootcamp Page (Feb 2026) ✅ NEW
✅ **Extreme CCNA Boot Camp Institutional Page** - /extreme-bootcamp
Created professional, Qualiopi-compliant institutional page with:

**1. Hero Section**
- Title: EXTREME CCNA BOOT CAMP
- Price: 3 290 €
- Duration: 35 heures
- 75+ Labs indicator
- Cisco CCNA certification badge
- Checkout card with exam option (+630€)

**2. Objectifs Professionnels**
12 professional objectives including:
- Configure Cisco routers and switches
- VLAN and inter-VLAN routing
- OSPF, EIGRP, RIP configuration
- ACL standard and extended
- NAT (static, dynamic, PAT)
- IPv6 (SLAAC, DHCPv6)
- HSRP configuration
- ASA Firewall (ACL, NAT, inspection)
- VPN GRE and IPSec
- VoIP and Voice VLAN
- Enterprise WLAN
- Network security

**3. Programme Détaillé (5 Modules)**
- Module 1: Configuration & Sécurisation des Équipements
- Module 2: Switching Avancé
- Module 3: Routage Entreprise
- Module 4: WAN, VoIP & VPN
- Module 5: Cisco ASA Firewall
- Projet Final Intégrateur (multi-site architecture)

**4. Modalités Pédagogiques**
- 80% Pratique / 20% Théorie
- 75+ Laboratoires
- 1:8 Encadrement formateur
- Plateau technique Cisco

**5. Prérequis**
- Modèle OSI
- Bases IPv4
- CLI recommandée
- Niveau CCNA1 conseillé
- Entretien de positionnement

**6. Certification**
- Certificat de participation Saint-Georges Academy
- Option examen Cisco: 630€ (PearsonVUE)
- Accès NetAcad inclus selon niveau

**7. Moyens Techniques**
- Routeurs Cisco
- Switches L2 & L3
- Cisco ASA Firewall
- Packet Tracer
- Plateforme pédagogique sécurisée

**8. Modalités d'Évaluation**
- Évaluation continue
- Grille de compétences
- Projet final
- Attestation de fin de formation

**9. Accessibilité Handicap**
- Engagement d'adaptation
- Référent Handicap mentionné

**10. Indicateurs de Performance**
- Taux de satisfaction: 98%
- Taux de réussite: 95%
- Taux certification: 85%
- Taux insertion: 92%

**11. Informations Réglementaires**
- Links to CGV, RGPD, Mentions Légales
- Modalités de rétractation
- Contact administratif

**12. CTA Final**
- Checkout buttons
- Contact link

---

## Tech Stack
- **Frontend**: React 19, React Router, TailwindCSS, Shadcn UI, i18next
- **Backend**: FastAPI, MongoDB, JWT, bcrypt
- **Payments**: Stripe (test mode)
- **Deployment**: Supervisor, Nginx

---

## Next Phase - P1 Features

### P1 Features (Important)
1. **Course Access Integration**
   - Grant course access after successful payment
   - Link purchased courses to user dashboard
   - NetAcad integration links

2. **Email Notifications**
   - Welcome email on registration
   - Purchase confirmation emails
   - Password reset emails

3. **Admin Dashboard**
   - User management
   - Course management
   - Transaction overview
   - Analytics

4. **Live Session Booking System**
   - Weekly session scheduling
   - Instructor availability
   - Video call integration

### P2 Features (Nice to Have)
- Review/testimonial system
- Blog/news section
- Certificate generation
- Advanced analytics
- Student progress tracking

---

## API Contracts

### Authentication
- POST /api/auth/register ✅
- POST /api/auth/login ✅
- GET /api/auth/me ✅
- PUT /api/auth/me ✅
- POST /api/auth/change-password ✅
- POST /api/auth/request-password-reset ✅
- POST /api/auth/reset-password ✅
- POST /api/auth/verify-email ✅

### Courses
- GET /api/courses ✅
- GET /api/courses/{id} ✅
- GET /api/courses/videos ✅
- POST /api/courses/seed ✅

### Payments
- POST /api/payments/checkout ✅
- GET /api/payments/status/{session_id} ✅
- GET /api/payments/products ✅
- GET /api/payments/transactions ✅
- POST /api/webhook/stripe ✅

### Dashboard
- GET /api/dashboard/summary ✅
- GET /api/dashboard/my-courses ✅
- GET /api/dashboard/video-access ✅
- GET /api/dashboard/course/{id}/progress ✅
- POST /api/dashboard/course/{id}/progress ✅
- GET /api/dashboard/orders ✅

---

## Design Guidelines
- Institutional professional aesthetic
- Navy blue (#0f1f3d) and gold (#d4af37)
- No dark colorful gradients
- Cisco Networking Academy branding
- Clean, spacious layouts
- Smooth transitions and micro-interactions

---

## Important Notes
- Certification exams NOT sold directly (user arranges via PearsonVUE)
- Clearly state what's included vs. not included
- Qualiopi certification in progress
- NOT CPF eligible currently
- Live sessions only for online full courses (not videos-only)
- France Travail funding removed until validated

---

## File Structure
```
/app/
├── backend/
│   ├── server.py           # Main FastAPI application
│   ├── routes/
│   │   ├── auth.py         # Authentication routes
│   │   ├── courses.py      # Course routes
│   │   ├── dashboard.py    # Dashboard routes
│   │   ├── payments.py     # Payment routes
│   │   └── webhooks.py     # Webhook handlers
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ui/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Courses.jsx
│   │   │   └── ...
│   │   ├── data/
│   │   │   └── mock.js
│   │   ├── locales/
│   │   └── App.js
│   └── package.json
└── memory/
    └── PRD.md
```

---

## Test Credentials
- Email: test@saint-georges.academy
- Password: TestPass123!

---

### Phase 5 - Edge Computing Course (Mar 2026) ✅ NEW
✅ **Edge Computing for Smart Towns Course**
- New course page at /edge-computing
- 3-month hybrid online programme
- Real-world case study: Metković, Croatia
- Dedicated Stormshield Firewall module

**Page Sections:**
1. Hero with badges (3 Months, Beginner, Hybrid Online)
2. Why This Course Matters
3. Who This Course Is For (Target Audience)
4. What Participants Will Learn
5. Metković Lab Project (8 use cases)
6. Course Structure (3 months with 12 weeks)
7. Stormshield Firewall Integration Module
8. Key Practical Outcomes
9. Pricing Options (€3,000 individual / €20,000 group)
10. Certification Section
11. Why Saint-Georges Academy
12. Final CTA with contact info

**Pricing:**
- Individual: €3,000
- Private Group (up to 10): €20,000

**Target Audience:**
- Municipalities & Town Halls
- Local Authorities
- SMEs & IT Companies
- Cybersecurity Providers
- Schools & Training Centres
- Smart City Teams

**Certificate:**
Saint-Georges Academy Certificate in Edge Computing Fundamentals for Smart Towns

---

## Last Updated
March 2026 - Full System Verification + Email System Implementation

## Verification Summary (March 2026)
✅ All courses display correctly on /courses page
✅ Course filtering by category works (CCNA, Cybersécurité, Développement, Infrastructure)
✅ All course detail pages load with correct pricing and information
✅ Session selection works for all courses (online and in-class)
✅ Stripe payment integration fully functional
✅ Payment amounts verified:
   - CCNA 1/2/3 Online: €2,290
   - CCNA 1/2/3 In-Class: €3,290
   - CyberOps Online: €2,290
   - CyberOps In-Class: €3,290
   - Unreal Engine: €3,750
   - Edge Computing: €3,000 (contact form)
   - 75 CCNA Videos: €150
✅ Auth page (login/register) works
✅ Contact page works
✅ All navigation links functional

## Email System (March 2026)
✅ Resend email integration implemented
✅ Automatic enrollment confirmation emails after payment
✅ Professional HTML email templates with:
   - Course details (name, format, session dates)
   - Payment confirmation (amount, date, transaction ID)
   - Legal information (droit de rétractation, RGPD, CGV)
   - Academy contact information
✅ Admin notification emails to:
   - contact@saint-georges.academy
   - thierry.paul@saint-georges.academy
   - thierrypaul72@gmail.com (for testing)
✅ Email test endpoint: POST /api/emails/test
✅ Email configuration endpoint: GET /api/emails/config

**Note:** Domain verification required in Resend dashboard to send to recipients other than thierrypaul72@gmail.com

---

### Phase 6 - World of Haiku Reseller Page (Mar 2026) ✅ NEW
✅ **World of Haiku - European Reseller Page**
- New dedicated page at /world-of-haiku
- Saint-Georges Academy positioned as official (non-exclusive) European reseller for The World of Haiku cybersecurity training platform

**Page Sections:**
1. **Hero Section**
   - Title: "World of Haiku in Europe through Saint-Georges Academy"
   - Badges: Cybersecurity Training, Game-Based Learning, Available in Europe
   - Clear statement: "Reseller status is non-exclusive"
   - Key value points: Engaging Gameplay, Security Awareness, Team Deployment, Progress Tracking
   - Price preview: Individual €19/month, Companies/Education Custom Quote

2. **What is World of Haiku?**
   - Product features: Game-Based Learning, Real-World Scenarios, Practical Skills, Progress Tracking, Team Deployment, Recognised Training

3. **Who is World of Haiku For?**
   - Individual Learners
   - Companies & SMEs
   - Large Enterprises
   - Educational Institutions
   - Higher Education
   - Public Sector

4. **Why Game-Based Cybersecurity Learning**
   - Higher Engagement, Better Retention, Safe Environment, Measurable Results
   - Learning Through Play card: Threat Recognition, Security Best Practices, Incident Response

5. **Pricing & Licence Options**
   - Individual: €19/month (Start Now CTA)
   - Companies: Custom Quote (Request a Quote CTA) - marked "MOST POPULAR"
   - Educational Institutions: Custom Quote (Request a Quote CTA)

6. **Quote Request Form** (id: quote-form)
   - Organisation Name, Contact Name, Email, Country
   - Organisation Type (dropdown with 8 options)
   - Estimated Number of Licences (dropdown: 1-10 to 500+)
   - Intended Use (dropdown: Employee Training, Onboarding, Compliance, Curriculum, Professional Development)
   - Additional Information (textarea)
   - Submit Quote Request button

7. **SGA as European Contact**
   - Saint-Georges Academy logo and contact information
   - "Official Reseller in Europe for The World of Haiku"
   - Contact details: email and phone

8. **FAQ Section**
   - 6 frequently asked questions about the product and partnership

9. **Final CTA**
   - "Start as an Individual — €19/month" button
   - "Request a Company or Education Quote" button

**Backend API:**
- POST /api/quotes/haiku - Submit quote request (stores in MongoDB)
- GET /api/quotes/haiku - Get all quote requests (admin)

**Database Collection:**
- quote_requests: { id, product, organisation_name, contact_name, email, country, organisation_type, estimated_licences, intended_use, message, status, created_at, updated_at }

**Key Positioning:**
- SGA is an official reseller (NOT exclusive)
- SGA is the commercial contact point in Europe
- No ownership claims about World of Haiku
- No false compliance or certification claims

**Navigation:**
- Footer link added to World of Haiku page
