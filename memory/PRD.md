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
- Cisco exams: 630€ (not included)
- Via PearsonVUE centers
- Internal certificate for Unreal Engine

### Funding Options
- Personal financing
- Employer funding
- OPCO
- France Travail (AIF)
- NOT CPF eligible (yet)

## What's Been Implemented (Phase 1)

### Completed (Dec 2024)
✅ **Frontend Landing Page** with mock data
- Home page with hero, stats, features
- Course catalog with filtering
- Individual course detail pages with format selection
- 75 Videos product page
- Funding information page
- Contact page with form
- Responsive navbar and footer
- Professional institutional design (navy #0f1f3d + gold #d4af37)
- Mock payment flow
- Toast notifications

### Tech Stack
- **Frontend**: React 19, React Router, TailwindCSS, Shadcn UI
- **Backend**: FastAPI, MongoDB (template ready)
- **Deployment**: Supervisor, Nginx

## Next Phase - Backend & Authentication

### P0 Features (Critical)
1. **Authentication System**
   - User registration/login
   - Email verification
   - Password reset
   - JWT tokens
   
2. **Real Stripe Integration**
   - Product creation
   - Checkout sessions
   - Payment webhooks
   - Order management

3. **Student Dashboard**
   - Course access based on purchase
   - NetAcad links (online courses)
   - Video library (video product)
   - Progress tracking
   - Document downloads

4. **Live Session Booking**
   - Calendar system
   - Instructor availability
   - Session scheduling
   - Email notifications

### P1 Features (Important)
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

## Design Guidelines
- Institutional professional aesthetic
- Navy blue (#0f1f3d) and gold (#d4af37)
- No dark colorful gradients
- Cisco Networking Academy branding
- Clean, spacious layouts
- Smooth transitions and micro-interactions

## Mock Data Location
`/app/frontend/src/data/mock.js`
- All course information
- Video product details
- Funding options
- Mock checkout/booking functions

## Important Notes
- Certification exams NOT sold directly (user arranges via PearsonVUE)
- Clearly state what's included vs. not included
- Qualiopi certification in progress
- NOT CPF eligible currently
- Live sessions only for online full courses (not videos-only)
