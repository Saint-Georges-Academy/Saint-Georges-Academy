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

### Funding Options (Updated)
- Personal financing
- Employer funding
- OPCO
- ~~France Travail (AIF)~~ - REMOVED (not yet validated)
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
- Mock Stripe payment (2.5s simulation)
- Detailed receipt generation with print option

✅ **PDF Program Downloads**
- Professional PDF generation for each course
- Includes: Objectives, Skills, Modules, Prerequisites, Target Audience, Modalities
- Branded with Saint-Georges Academy colors
- Download button on all course detail pages

✅ **Procédure d'Inscription Page** (/inscription)
- 7-step enrollment process (France Travail & Qualiopi compliant)
- Visual timeline with icons
- Quality engagement section
- Qualiopi audit checklist
- CTA buttons and contact info
- Linked from "Register" button in navbar

✅ **Accessibilité & Référent Handicap** (/accessibilite)
- Disability referent contact (Thierry Paul)
- 4 engagement commitments
- 6 possible accommodations
- Physical & digital accessibility info
- Partnership options
- 5-step procedure
- Confidentiality notice
- Qualiopi compliance checklist

✅ **Bug Fixes**
- Removed "France Travail (AIF)" from funding options
- Updated page title to "Saint-Georges Academy | Cisco Networking Academy"

---

## Tech Stack
- **Frontend**: React 19, React Router, TailwindCSS, Shadcn UI, i18next
- **Backend**: FastAPI, MongoDB (template ready)
- **Deployment**: Supervisor, Nginx

---

## Next Phase - Backend & Real Payments

### P0 Features (Critical)
1. **Real Stripe Integration**
   - Replace mock payment with real Stripe Checkout
   - Product creation in Stripe dashboard
   - Webhook handling for payment confirmation
   - Order storage in database

2. **User Authentication System**
   - User registration/login
   - Email verification
   - Password reset
   - JWT tokens

3. **Student Dashboard**
   - Course access based on purchase
   - NetAcad links (online courses)
   - Video library (video product)
   - Progress tracking
   - Document downloads

### P1 Features (Important)
- Live Session Booking System
- Admin dashboard
- Course content management
- User management
- Analytics and reporting
- Email automation

### P2 Features (Nice to Have)
- Review/testimonial system
- Blog/news section
- Certificate generation
- Advanced analytics

---

## API Contracts (To Implement)

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/verify-email
- POST /api/auth/reset-password

### Courses
- GET /api/courses
- GET /api/courses/:id
- GET /api/videos (75 videos product)

### Payments
- POST /api/payments/create-checkout
- POST /api/payments/webhook
- GET /api/payments/orders

### Bookings
- GET /api/bookings/availability
- POST /api/bookings/create
- GET /api/bookings/my-bookings

### User Dashboard
- GET /api/dashboard/my-courses
- GET /api/dashboard/my-videos
- GET /api/dashboard/progress

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
/app/frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx (with legal links)
│   ├── LanguageSwitcher.jsx
│   └── ui/ (Shadcn components)
├── pages/
│   ├── Home.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   ├── Videos.jsx
│   ├── Funding.jsx
│   ├── Contact.jsx
│   ├── RGPD.jsx
│   ├── CGV.jsx
│   ├── MentionsLegales.jsx
│   ├── Indicateurs.jsx
│   ├── ProcedureInscription.jsx
│   ├── AccessibiliteHandicap.jsx
│   └── CertificationCheckout.jsx
├── data/
│   └── mock.js (course data)
├── locales/
│   ├── en.json
│   ├── fr.json
│   └── hr.json
├── App.js
└── i18n.js
```

---

## Mocked Features (Awaiting Real Integration)
- **Stripe Payment**: Currently simulated with setTimeout. Needs real API keys.
- **Email Notifications**: Receipt/confirmation emails not implemented yet.
- **Course Data**: All course info in frontend mock.js, not from backend.
