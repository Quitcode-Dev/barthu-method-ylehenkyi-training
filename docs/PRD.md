# Product Requirements Document (PRD)
## Barthu Method — Personalized Workout Recommendation Web Application

---

**Document Version:** 1.0
**Date Prepared:** June 2025
**Prepared By:** Business Analysis Team
**Client:** Sebastian Barthu
**Industry:** Healthcare — Specialized Rehabilitation / Neuromuscular Method
**Project Type:** Greenfield Web Application
**Status:** Draft — Pending Stakeholder Review and Sign-Off
**Classification:** Confidential

---

## Document Control

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | June 2025 | Business Analysis Team | Initial draft based on Project Charter and source documentation |

---

## Table of Contents

1. Business Case
2. Business Context & Goals
3. Current State Analysis
4. Users & Stakeholders
5. Desired Future State
6. Hypothesis
7. Functional Requirements
8. Non-Functional Requirements
9. Technical Environment & Constraints
10. Success Metrics
11. Appendices

---

---

# 1. Business Case

## Why This Product Is Being Built

Sebastian Barthu has developed a proprietary therapeutic and rehabilitative approach known as the **Barthu NSR (Nervous System Regulation) Method**. The method integrates neuromuscular rehabilitation, nervous system regulation, stress management, sleep optimization, and movement restoration into a structured, repeatable clinical protocol validated through direct practice.

The method presently lacks a scalable digital delivery mechanism. All program personalization is manual, delivery is constrained by direct practitioner involvement, and there is no systematic mechanism to track user outcomes at scale, validate method efficacy through data, or generate recurring digital revenue independent of one-to-one service delivery.

Generic off-the-shelf platforms — including Kajabi, Teachable, or standard LMS tools — are structurally inadequate for this use case. They do not support the core operational logic of the Barthu Method: dynamic assessment scoring, tag-based exercise matching, and rule-driven personalized program generation. A purpose-built platform is required to faithfully encode the Barthu NSR assessment and recommendation framework.

## The Business Problem

The absence of a dedicated digital platform creates four compounding constraints:

1. **Scalability ceiling:** Program delivery is bottlenecked by practitioner time. Growth is directly tied to headcount and cannot be decoupled from manual delivery without a digital system.
2. **Personalization bottleneck:** Generating tailored programs manually is time-intensive and does not scale. The value proposition of the NSR method — individualized, responsive programming — is currently inaccessible at volume.
3. **Revenue model limitation:** Without a digital platform, recurring subscription or membership revenue is not achievable. The business is dependent on one-to-one service fees.
4. **Data and evidence gap:** There is no structured mechanism to capture outcome data at scale, which limits the ability to build an evidence base that validates and commercially differentiates the Barthu Method against competing therapeutic approaches.

## The Opportunity

The global physical rehabilitation market is valued at approximately USD $26–30 billion (2023), growing at ~6–7% CAGR. The telerehabilitation segment is growing significantly faster at an estimated 12–15% CAGR, accelerated by structural post-COVID adoption of remote health services.

Proprietary method businesses that combine clinical credibility with digital product sophistication are well-positioned within this market. The Barthu Method, if digitized and scaled correctly, can compete on specialization and clinical differentiation — not on the general fitness content volume model used by mainstream apps — and capture a meaningful segment of the growing demand for structured, evidence-grounded remote rehabilitation.

Building a purpose-built platform enables Barthu to:

- Encode and protect the method's intellectual property in a defensible software system
- Automate personalization at a level not achievable with generic platforms
- Generate recurring subscription revenue through a membership-based access model
- Scale the user base from dozens to thousands without proportional increases in delivery cost
- Establish a technical foundation for future B2B practitioner licensing, certification programs, and advanced AI-driven adaptive coaching
- Capture longitudinal outcome data that strengthens the method's clinical evidence base over time

The investment in a proprietary platform is justified by the long-term commercial upside, the competitive differentiation it creates, and the structural limitations of all available off-the-shelf alternatives.

---

---

# 2. Business Context & Goals

## Goals and Objectives

The project is structured across three phases. This PRD governs **Phase 1 (MVP)** and **Phase 2 (Personalization Engine)** as the primary authorized scope.

### Phase 1 — MVP Goals

| ID | Goal | Description |
|---|---|---|
| G1.1 | Establish core platform infrastructure | Build a production-ready web application with user authentication, database architecture, and hosting infrastructure sufficient to support all subsequent phases |
| G1.2 | Deliver a functional assessment-to-pathway experience | Users complete a structured assessment questionnaire and receive an assigned exercise program from a set of predefined fixed pathways |
| G1.3 | Enable commercial operation from launch | Integrate payment processing and membership access gating so the platform can generate revenue from day one |
| G1.4 | Provide foundational content management capability | Admin interface enabling Sebastian Barthu and authorized staff to manage the exercise library, video metadata, and content tagging without developer involvement |
| G1.5 | Establish technical and documentation standards | Codebase, architecture, and documentation structured sufficiently for developer continuity and future extension |

### Phase 2 — Personalization Engine Goals

| ID | Goal | Description |
|---|---|---|
| G2.1 | Implement the full NSR assessment and scoring engine | Expanded 15–20 question assessment generating a scored NSR profile that captures pain, stress, sleep, mobility, available time, and primary goal dimensions |
| G2.2 | Deliver a dynamic tag-based recommendation engine | Rule-based engine matching NSR profile scores to exercises from the database using multi-dimensional tag criteria, generating unique personalized playlists |
| G2.3 | Provide a personalized user journey experience | Users have a persistent, resumable program record with progress tracking, session completion logging, and next-session visibility |
| G2.4 | Support multi-day and multi-week structured programs | System generates and displays 5-day and 30-day structured programs assembled dynamically from the exercise database |
| G2.5 | Capture post-session feedback as an adaptive data foundation | Collect pain, energy, and stress ratings after each session to build the data layer required for future adaptive personalization |
| G2.6 | Enable reassessment and program adjustment | Users can retake the assessment periodically to receive updated programs that reflect changes in their condition and goals |

## The "Why" — Strategic Rationale

The Barthu Method's core value proposition is **individualized, clinically-grounded programming** delivered without requiring a practitioner to be present. The platform must encode this value proposition in software — not as a content repository, but as a **personalization engine** that makes each user feel their program was specifically designed for them.

The strategic sequencing — fixed pathways first, then dynamic personalization — is intentional. Phase 1 validates the commercial model and user experience with lower technical risk. Phase 2 delivers the full differentiated product. This approach reduces build risk while ensuring the platform reaches its intended state within a defined timeframe.

The long-term strategic rationale includes:

- **IP protection:** Encoding the NSR method in software creates a proprietary digital asset that competitors cannot easily replicate
- **Recurring revenue:** Subscription/membership model decouples revenue growth from practitioner time
- **Data flywheel:** Outcome data collected at scale improves the method, strengthens evidence claims, and creates a compounding competitive advantage
- **Platform extensibility:** B2B practitioner licensing, certification tools, and advanced adaptive coaching are all enabled by the infrastructure built in Phases 1 and 2

## Key Performance Indicators (KPIs)

| KPI | Metric | Target | Measurement Period |
|---|---|---|---|
| KPI-01 | Assessment completion rate | ≥ 70% of users who begin complete the full assessment | Within 60 days of Phase 1 launch |
| KPI-02 | Personalized program generation accuracy | 100% of generated programs match stated user goals and NSR assessment profile — validated in QA before launch | Pre-launch |
| KPI-03 | User data integrity | User journey records saved and retrievable with 100% accuracy across sessions and devices | At launch and ongoing |
| KPI-04 | Platform availability | ≥ 99.5% uptime | Ongoing post-launch |
| KPI-05 | Paying membership conversion rate | [TBD — to be defined with client based on confirmed pricing model] | Within 90 days of Phase 2 launch |
| KPI-06 | Active registered users | [TBD — client to define target] | 6 months post-Phase 2 launch |
| KPI-07 | Session completion rate | ≥ 60% of started sessions completed per user per week | Within 90 days of Phase 2 launch |
| KPI-08 | 30-day user retention | ≥ 40% of registered users active at 30 days post-registration | Ongoing |
| KPI-09 | Post-session feedback capture rate | ≥ 50% of completed sessions followed by feedback submission | Within 60 days of Phase 2 launch |
| KPI-10 | Admin content management adoption | 100% of exercise library updates completed via admin interface without developer involvement | Within 30 days of Phase 1 launch |

## Definition of Success

**Phase 1 is successful when:**
- The web application is live, accessible via browser, and stable at ≥ 99.5% uptime
- Users can register, complete the assessment, receive an assigned program, and view assigned exercises with video playback — end to end — without errors
- At least one paying membership tier is active and processing payments via the integrated payment gateway
- The exercise library contains a minimum of 50 tagged exercises seeded in the database
- The admin interface enables content management without developer involvement
- Technical documentation is sufficient for a new developer to onboard within 5 business days

**Phase 2 is successful when:**
- The NSR assessment generates a scored profile and dynamically assembled exercise playlist for every user, with no two users with different profiles receiving identical programs
- Users can complete a full session, submit post-session feedback, and return to find their progress recorded and their next session ready
- Multi-day and 30-day programs are generated and navigable from the user dashboard
- Assessment completion rate reaches ≥ 70% within 60 days of Phase 2 launch
- Post-session feedback is captured and stored for a minimum of 50% of completed sessions

---

---

# 3. Current State Analysis

## Manual Processes — How Things Work Today

Based on the Project Charter and domain knowledge, the Barthu Method currently operates through the following manual workflows:

| Process | Current State |
|---|---|
| **Patient/user intake and assessment** | Conducted manually by Sebastian Barthu or authorized practitioners during direct consultations. Assessment responses are recorded individually, not in a structured digital system. |
| **Program personalization** | Programs are assembled manually by the practitioner based on clinical judgment informed by the NSR assessment framework. There is no automated matching or generation system. |
| **Exercise delivery** | Exercises and instructional content are delivered directly during sessions or via informal means (e.g., emailed video links, PDF instructions). There is no unified media platform. |
| **Progress tracking** | Progress is tracked manually — via practitioner notes, verbal check-ins, or informal client self-reporting. There is no systematic outcome data capture. |
| **Reassessment** | Reassessments are conducted during scheduled sessions, with no automated prompts or structured comparative scoring. |
| **Commerce and membership management** | Payments and access are managed through existing tools [TBD — to be confirmed with client]. No integrated membership gating or subscription management system is in place. |
| **Email and client communication** | Client communication is handled through standard email [TBD — to be confirmed with client]. No automated onboarding sequences or engagement workflows are in place. |
| **Content management** | Exercise content and metadata are managed informally, likely in documents or spreadsheets. No structured database or CMS exists for the exercise library. |

## Software Currently Used

> ⚠️ **BA Action Required:** The following is an estimated baseline. The BA must confirm existing tooling with Sebastian Barthu during discovery sessions.

| Category | Assumed Current Tool(s) | Notes |
|---|---|---|
| Assessment / intake | Paper forms or informal digital docs [TBD] | To be confirmed |
| Exercise delivery | Email, video links (Vimeo/YouTube), PDF documents [TBD] | To be confirmed |
| Progress tracking | Practitioner notes, spreadsheets [TBD] | To be confirmed |
| Commerce / payments | [TBD] | To be confirmed with client |
| Email / communication | Standard email client [TBD] | To be confirmed |
| Video hosting | [TBD — Vimeo or equivalent suspected] | To be confirmed |
| Content management | Spreadsheets or documents [TBD] | To be confirmed |

## Top Three Pain Points

### Pain Point 1 — Scalability Is Structurally Blocked by Manual Personalization

Every personalized program requires direct practitioner involvement. There is no mechanism to generate, assign, or deliver a program without Sebastian Barthu or a licensed practitioner physically or virtually present. This creates a hard ceiling on how many users the business can serve simultaneously, and means revenue growth is directly tied to practitioner time — an inherently finite resource.

**Impact:** The business cannot grow beyond the personal capacity of its practitioners. Digital revenue at scale is not possible without the platform.

### Pain Point 2 — No Systematic Outcome Data Capture

There is no structured mechanism to collect, store, or analyze user outcome data across the population of people using the NSR method. Without this, the business cannot: demonstrate efficacy at scale, refine the method based on aggregated evidence, satisfy potential institutional or B2B partners who require outcome data, or build the evidence base needed to differentiate the Barthu Method in a competitive market.

**Impact:** Clinical credibility and commercial differentiation are constrained. The method cannot improve systematically based on data.

### Pain Point 3 — No Persistent, Resumable User Experience

Users do not have a persistent digital record of their program. If a session is missed or a user returns after an absence, there is no system to restore their program state, track where they left off, or identify the appropriate next step. The user experience is episodic and dependent on practitioner memory or manual record-keeping rather than a system-maintained journey record.

**Impact:** User retention, engagement, and completion rates are lower than they could be with a digital product that remembers the user and resumes their journey automatically.

---

---

# 4. Users & Stakeholders

## Primary User Personas

### Persona 1 — The Recovery-Focused Individual (B2C Primary)

| Attribute | Detail |
|---|---|
| **Name (Representative)** | "Recovering Rachel" |
| **Who they are** | An adult aged 30–60 experiencing chronic or recurring pain (neck, back, shoulder, knee, hip), elevated stress, or sleep disruption. May have previously engaged with physiotherapy, chiropractors, or online fitness programs with mixed results. |
| **Context** | Seeks a structured, credible program they can follow independently at home without requiring ongoing practitioner appointments. Has limited time (10–30 minutes per session). |
| **Goals** | Reduce pain, manage stress, improve sleep, restore mobility and function, feel a sense of progress. Wants a program that feels designed for them, not a generic routine. |
| **Technical comfort** | Moderate. Comfortable with web browsing, video streaming, and basic online accounts. Does not expect or want a technically complex interface. |
| **Key needs from the platform** | Simple, guided onboarding; a program that clearly reflects their stated pain areas and goals; easy video playback; visible progress; the ability to resume their program after a break; reassurance that the program is safe and appropriate. |
| **Frustrations with existing alternatives** | Generic fitness apps don't address clinical pain or stress. Practitioner appointments are expensive and infrequent. YouTube is overwhelming and unstructured. No existing tool connects assessment to personalized program delivery. |

### Persona 2 — The Performance-Oriented User (B2C Secondary)

| Attribute | Detail |
|---|---|
| **Name (Representative)** | "Optimizing Owen" |
| **Who they are** | An active adult aged 25–50, likely with a background in sport, gym training, or structured fitness. May not have acute pain but is interested in performance, recovery, mobility optimization, stress regulation, and sleep quality. |
| **Context** | Uses the platform as a structured supplement to their existing training regime. Has higher baseline fitness but is drawn to the neuroscience and nervous system regulation angle of the method. |
| **Goals** | Optimize recovery between training sessions, improve stress resilience, enhance sleep quality, maintain mobility as a long-term health investment. |
| **Technical comfort** | High. Comfortable with digital products, tracking tools, and app-based experiences. |
| **Key needs from the platform** | More advanced program options; progression over time; data on their journey; the ability to reassess and adjust as their fitness and stress levels change. |
| **Frustrations with existing alternatives** | Most rehabilitation tools are aimed at injured or sedentary populations. Lacks a structured, clinically credible protocol for nervous system optimization tailored to active individuals. |

### Persona 3 — The Platform Administrator (Internal — Sebastian Barthu and Staff)

| Attribute | Detail |
|---|---|
| **Name (Representative)** | "Admin Alex" |
| **Who they are** | Sebastian Barthu himself, or a staff member authorized to manage platform content and operations. |
| **Context** | Responsible for maintaining the exercise library, adding new video content, managing metadata tags, updating assessment logic, and monitoring platform activity. Not necessarily a developer. |
| **Goals** | Maintain a current, well-tagged exercise library without requiring developer involvement. Manage platform content reliably and confidently. |
| **Technical comfort** | Moderate. Comfortable with web-based admin interfaces but not with code, database queries, or deployment processes. |
| **Key needs from the platform** | An intuitive admin content management interface; the ability to add, edit, tag, and deactivate exercises; tools to manage assessment pathways and logic; basic visibility into user activity. |

### Persona 4 — The Healthcare Practitioner (B2B — Future Phase 3)

> **Note:** This persona is out of scope for Phase 1 and Phase 2. Documented here for architectural awareness and future requirements planning.

| Attribute | Detail |
|---|---|
| **Who they are** | A physiotherapist, osteopath, sports therapist, or other licensed healthcare practitioner who has been trained and certified to deliver the Barthu Method with their own patients. |
| **Future needs** | A practitioner portal to assign programs to patients, view progress data, manage patient relationships, and access certified Barthu Method training materials. |

## Stakeholders

| Role | Name | Responsibility | Decision Authority |
|---|---|---|---|
| **Project Sponsor / Product Owner** | Sebastian Barthu | Business vision, funding, final product decisions, content and method expertise | Final sign-off on scope, design, and acceptance |
| **Project Manager** | [TBD] | Delivery management, milestone tracking, risk management, stakeholder communication | Operational decisions within agreed scope |
| **Lead Developer / Technical Architect** | [TBD] | System architecture, technical decision-making, development delivery | Technical approach and tooling decisions |
| **Frontend Developer** | [TBD] | UI/UX implementation | UI implementation decisions |
| **Backend Developer** | [TBD] | Database design, recommendation engine logic, API development | Backend implementation decisions |
| **UI/UX Designer** | [TBD] | Wireframes, user flows, interface design | Design decisions pending client approval |
| **QA Engineer** | [TBD] | Testing strategy, quality assurance, bug tracking | Quality gate decisions |
| **Business Analyst** | [TBD] | Requirements documentation, stakeholder liaison, scope management | Requirements clarification and documentation |
| **Legal / Compliance Advisor** | [TBD] | Data privacy compliance (GDPR, HIPAA), medical software classification review | Compliance-related decisions and sign-off |
| **End Users (B2C)** | General public / patients | Platform users; primary value recipients | Feedback and UAT participation |

## Decision Maker

**Sebastian Barthu** is the sole project sponsor and product owner. All major scope decisions, product design approvals, content approvals, and go-live authorizations require his explicit sign-off.

---

---

# 5. Desired Future State

## Ideal Process — How Things Should Work After the Platform Is Built

### Phase 1 Future State — Fixed Pathway Experience

```
User discovers Barthu Method platform
        ↓
User registers account (email + password)
        ↓
User completes 5–10 question assessment questionnaire
(pain location, stress level, sleep quality, available time, primary goal)
        ↓
System maps responses to one of 5–10 predefined pathways
        ↓
User is assigned a program pathway and directed to their dashboard
        ↓
Dashboard displays assigned program: exercise list with video playback
        ↓
User completes session / watches exercises
        ↓
User returns — account persists, program is waiting
        ↓
Platform operates commercially: payment processed, membership gated
```

### Phase 2 Future State — Full Personalization Engine Experience

```
User registers and completes expanded NSR assessment (15–20 questions)
        ↓
System calculates scores across dimensions:
pain location, stress, sleep, available time, primary goal, intensity preference
        ↓
System generates NSR Profile (e.g., "Overloaded Regulator", "Recovery Deficit")
        ↓
Dynamic recommendation engine queries exercise database:
matches NSR profile scores to exercises using tag-based rules
(body area, duration, intensity, pain type, stress reduction weighting, progression level)
        ↓
System assembles personalized exercise playlist (e.g., 10-min session)
        ↓
User receives personalized dashboard:
— Today's session (playlist)
— 5-day program view
— 30-day journey (if applicable)
— Progress tracking (sessions completed, % of program)
        ↓
User completes session
        ↓
Post-session feedback prompt: Pain / Energy / Stress ratings (1–10)
        ↓
System stores feedback; updates User Journey Record
        ↓
User returns → dashboard shows next session, progress status
        ↓
At defined interval: reassessment prompt
        ↓
User retakes NSR assessment → system generates updated program
```

## Key Data Needs — What the System Must Capture and Provide

### User Data

| Data Entity | Fields Required | Purpose |
|---|---|---|
| User Account | User ID, name, email, hashed password, registration date, account status, subscription tier | Authentication, authorization, membership gating |
| Assessment Response | User ID, question ID, response value, assessment date, assessment version | NSR scoring, program generation, reassessment comparison |
| NSR Profile | User ID, profile type/name, dimension scores (pain, stress, sleep, mobility, goal), profile generation date | Recommendation engine input |
| User Journey Record | User ID, program ID, exercise sequence, date created, status (active/completed/paused), completion percentage | Program persistence and resume functionality |
| Session Log | User ID, session ID, date, exercises viewed/completed, duration | Progress tracking, completion rate calculation |
| Post-Session Feedback | User ID, session ID, date, pain rating (1–10), energy rating (1–10), stress rating (1–10), optional free text | Adaptive engine foundation, outcome data capture |

### Exercise Library Data

| Data Entity | Fields Required | Purpose |
|---|---|---|
| Exercise | Exercise ID, name, description, video URL, duration (minutes), intensity (low/medium/high), progression level (beginner/intermediate/advanced), active/inactive status | Core content unit |
| Exercise Tags | Exercise ID, body area (neck/back/shoulder/hip/knee/other), pain relief categories, stress reduction (yes/weighting), sleep optimization (yes/weighting), digestion (yes/weighting), mindset (yes/weighting), mobility (yes/weighting), contraindications | Tag-based matching in recommendation engine |
| Program Pathway | Pathway ID, name, description, assessment criteria mapping, exercise sequence, target audience | Phase 1 fixed pathway assignment |
| Dynamic Program | Program ID, user ID, generation date, exercise sequence (ordered list of exercise IDs), total duration, NSR profile input, generation rules used | Phase 2 personalized program |

### Operational Data

| Data Entity | Fields Required | Purpose |
|---|---|---|
| Subscription / Membership | User ID, plan type, start date, end date, status, payment reference | Access control and commercial operation |
| Assessment Version | Version ID, question set, scoring logic version, effective date | Reproducible scoring and reassessment comparison |
| Admin Audit Log | Admin user ID, action type, entity modified, timestamp | Content management accountability |

---

---

# 6. Hypothesis

## Pain Points Addressed

| Pain Point | How the Platform Addresses It |
|---|---|
|