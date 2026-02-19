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
- 5 courses + 1 video product in database
- API endpoints:
  - GET /api/courses - List all courses
  - GET /api/courses/{id} - Get course details
  - GET /api/courses/videos - Get video product

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

## Last Updated
February 2026 - P0 Features Completed
