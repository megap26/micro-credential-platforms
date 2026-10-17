# SkillPulse AI: Micro-Credential Curriculum Generation Platform Driven by Real-Time Global Job Market Skill Demands

A production-grade, full-stack AI-powered learning and credentialing ecosystem that continuously bridges the gap between employer hiring requirements and learner competencies. SkillPulse ingests real-time job-market data, benchmarks individual skill profiles against market standards, synthesizes personalized micro-credential curricula, evaluates demonstrated mastery via scenario-based examinations, and issues cryptographically sealed, tamper-evident digital credentials.

---

## 🌟 Key Highlights & Engineering Features

1. **Global Job-Market Skill Intelligence**:
   - Ingests structured job postings across 6 major technology domains (*Enterprise SaaS, FinTech, AI Services, HealthTech, E-commerce, Cloud DevOps*).
   - Tracks high-demand, emerging, stable, and declining skills with growth velocity metrics (YoY growth rate, frequency percent, demand index).
   - Standardized taxonomies linked to **ESCO (European Skills, Competences, Qualifications and Occupations)** and **O\*NET (Occupational Information Network)** classification codes.

2. **AI Skill Extraction & Normalization Engine**:
   - Parses raw pasted or uploaded job descriptions using an intelligent NLP normalization engine.
   - Converts synonymous terms (e.g., `React.js`, `ReactJS`, `React 18` → `React`; `K8s` → `Kubernetes`; `Prompt Engineering` → `Prompt Design`).
   - Categorizes extracted competencies into Technical, Cloud & DevOps, AI & Machine Learning, and Soft Skills.

3. **Transparent Skill-Gap Analysis Engine**:
   - Allows learners to benchmark their current skill baseline against targeted industry tracks (*Full Stack Developer, AI Engineer, Cloud DevOps Engineer, Data Analyst, Backend Systems Architect*).
   - Categorizes skills into **Strong Skills**, **Skills to Improve**, **Missing Skills**, and **High-Priority Employer Gaps**.
   - Displays a mathematically transparent match score calculation with exact formula breakdown.

4. **AI-Powered Curriculum Generation with Safe Fallback**:
   - Synthesizes personalized micro-credential curricula tailored to fill identified skill gaps.
   - Integrates real LLM APIs (Google Gemini 1.5 Flash / OpenAI GPT-4) when configured in `.env`.
   - Includes a high-fidelity, domain-specific rule-based fallback generator when an API key is not configured, with honest metadata labeling.
   - Structured curriculum format: Prerequisites, Target Competencies, Learning Outcomes, Ordered Learning Modules, Topics, Practical Hands-on Exercises, Mini-Project with Submission Criteria, and Passing Score benchmarks.
   - One-click export to downloadable printable syllabus / PDF.

5. **Curriculum Versioning & Market Re-Alignment (v1.0 → v1.1)**:
   - Simulates labor market shifts (e.g. rising demand for Vector Embeddings, Strict TypeScript, or OIDC PKCE security).
   - Upgrades curricula across versions with a detailed changelog diff, recording newly added topics and altered skill priorities.

6. **Interactive Learning & Module Progress Tracking**:
   - Checklist-driven learning desk with persistent MongoDB state across user sessions.
   - Code snippet and practical task delivery with GitHub repository submission tracking.
   - Automatic calculation of overall progress percentage.

7. **Server-Side Competency Examination**:
   - Timed multiple-choice certification exam tailored to curriculum outcomes.
   - Anti-cheat server-side scoring: correct answers are strictly shielded on the backend until final submission.
   - Detailed rationale and technical explanations for every question.
   - Confetti celebration upon passing the benchmark (default: 75%).
   - Retake functionality with attempt counter and historical attempt logging.

8. **Tamper-Evident Digital Micro-Credentials**:
   - Issues verified digital certificates with unique credential identifiers (`CRED-2026-XXXX-XXXX`).
   - SHA-256 cryptographic hash seal generated from learner metadata, score, and issue date.
   - Badge tiers based on demonstrated score (*Diamond, Platinum, Gold, Silver*).
   - One-click verification link, copyable badge embed snippet, and high-resolution certificate canvas.

9. **Public Credential Verification Registry**:
   - Publicly accessible page (`/verify` and `/verify/:id`) searchable by any recruiter, employer, or academic visitor.
   - Validates credential authenticity, verifies demonstrated competencies, and reports revoked or non-existent certificates.

10. **Admin & Industry Governance Portal**:
    - Role-based access control (*Learner, Admin, Industry Reviewer*).
    - Platform-wide telemetry (Total learners, curricula created, exams taken, average pass rate, credentials generated).
    - Job postings dataset manager with automated NLP skill extraction.
    - Industry advisory review system: allows industry reviewers to inspect curricula, submit star ratings, relevance scores, and endorsement stamps.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, Canvas-Confetti |
| **Backend** | Node.js (v24), Express.js (v4), RESTful Architecture, JSON Web Tokens (JWT), BcryptJS |
| **Database** | MongoDB Atlas with Mongoose ODM (includes an automatic In-Memory Datastore fallback) |
| **AI Integration**| Google Gemini 1.5 Flash REST API + Domain-Specific Fallback Rule Engine |
| **Security** | Express Rate Limiting, HTTP-only Cookie standard, Bearer JWT Auth, Input Sanitization |

---

## 🚀 Running the Application on Windows PowerShell

### Prerequisites
- Node.js (v18+ or v20+ installed)
- Windows PowerShell

### 1. Terminal 1: Launch Backend API Server
```powershell
cd C:\Users\megap\.gemini\antigravity\scratch\skillpulse-platform\backend
npm.cmd start
```
*The backend starts on port **5000** (`http://localhost:5000`). It automatically connects to MongoDB Atlas if `MONGODB_URI` is provided, or seamlessly runs in resilient In-Memory Database mode with pre-seeded demonstration data.*

### 2. Terminal 2: Launch Frontend Development Server
```powershell
cd C:\Users\megap\.gemini\antigravity\scratch\skillpulse-platform\frontend
npm.cmd run dev -- --port 5173
```
*The React frontend will be accessible at: **`http://localhost:5173`**.*

---

## ⚡ Pre-Configured Demo Accounts (One-Click Login)

The platform includes pre-seeded demonstration accounts with pre-loaded profiles, curricula, and verified credentials for instant review:

| Role | Email | Password | Pre-loaded Content |
|---|---|---|---|
| **Learner** | `alex.dev@example.com` | `Password123!` | Full Stack Profile, 100% Completed Curriculum, Verified Diamond Credential |
| **Admin** | `admin@skillpulse.ai` | `AdminSecret2026!` | Access to System Metrics, Job Postings Indexer, and Platform Analytics |
| **Industry Reviewer** | `reviewer@cloudstandards.org` | `AdminSecret2026!` | Access to Curriculum Endorsement and Industry Rating Panel |

---

## 📡 API Endpoints Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create learner account with target career track.
- `POST /api/auth/login` - Authenticate user and receive JWT Bearer token.
- `GET /api/auth/me` - Fetch authenticated user identity and learner profile.
- `PUT /api/auth/profile` - Update target career track, current skills, and location.

### Skill Intelligence (`/api/skills`)
- `GET /api/skills` - List all standardized taxonomy skills (supports search & filter).
- `GET /api/skills/analytics` - Fetch top in-demand skills, emerging trends, industry and regional breakdowns.
- `POST /api/skills/extract` - Paste or upload job descriptions to extract normalized skills & taxonomy codes.
- `POST /api/skills/gap-analysis` - Benchmark learner skills against role requirements to calculate match score and gap buckets.

### Micro-Curricula (`/api/curricula`)
- `POST /api/curricula/generate` - AI curriculum synthesis (Gemini API or Domain Rule Fallback).
- `POST /api/curricula/save` - Save and enroll learner into generated curriculum.
- `GET /api/curricula` - Fetch all curricula for logged-in learner.
- `GET /api/curricula/:id` - Fetch single curriculum with module details and version history.
- `POST /api/curricula/:id/realign` - Re-analyze live market demand, upgrading curriculum from v1.0 to v1.1.

### Learning Progress (`/api/learning`)
- `GET /api/learning/:curriculumId` - Get module progress, completed checklist, and submissions.
- `POST /api/learning/:curriculumId/module` - Toggle module completion, save mini-project submissions.

### Assessments (`/api/assessments`)
- `GET /api/assessments/curriculum/:curriculumId` - Load competency certification exam (shielding answers).
- `POST /api/assessments/:assessmentId/submit` - Server-side grading of multiple-choice answers, explanations, and score.

### Verified Credentials (`/api/credentials`)
- `POST /api/credentials/issue` - Verify passing score and issue unique cryptographic digital credential.
- `GET /api/credentials/my-credentials` - Fetch all earned credentials for user.
- `GET /api/credentials/verify/:credentialId` - Public verification endpoint (valid, revoked, or not found).

### Admin & Industry Governance (`/api/admin`)
- `GET /api/admin/stats` - Platform telemetry (users, curricula, pass rate, credentials).
- `GET /api/admin/job-postings` - Search and view indexed demonstration job postings.
- `POST /api/admin/job-postings` - Import new job posting with automatic NLP skill extraction.
- `POST /api/admin/curricula/:id/review` - Record industry advisory board review and endorsement stamp.

---

## 🧪 Comprehensive Verification Checklist

- [x] **Backend Health Check**: `GET http://localhost:5000/api/health` returns status `healthy`.
- [x] **Frontend Server**: Vite dev server active on `http://localhost:5173` with proxy to port 5000.
- [x] **Database Resiliency**: Dual-mode engine connects to MongoDB Atlas or runs In-Memory fallback.
- [x] **JWT Authentication**: User registration, password hashing (bcrypt), login, and protected routes.
- [x] **Global Job-Market Intelligence**: Top in-demand skills, emerging trends, industry and geographic breakdowns.
- [x] **Job Description Skill Extraction**: NLP normalization of synonyms into canonical ESCO/O\*NET codes.
- [x] **Skill-Gap Analysis**: Benchmark formula calculates transparent score and categorizes 4 skill buckets.
- [x] **Curriculum Generation**: Structured modules, topics, exercises, mini-projects, duration, passing score.
- [x] **Curriculum Versioning**: Re-align market demand action upgrades v1.0 to v1.1 with changelog diff.
- [x] **Module Progress Tracking**: Checklists, mini-project text/repo submissions, persistent progress state.
- [x] **Competency Assessments**: Server-side grading, anti-cheat question masking, explanation rationale.
- [x] **Credential Issuance**: Unique ID format (`CRED-2026-XXXX-XXXX`), SHA-256 seal, badge tiers.
- [x] **Public Verification**: Recruiter validation lookup confirms authenticity and verified competencies.
- [x] **Admin & Industry Portal**: System telemetry, dataset indexing, and advisory board reviews.
- [x] **UI/UX Aesthetics**: SaaS navy/indigo/cyan color palette, responsive design, and printable certificates.
