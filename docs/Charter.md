# Project Charter: Barthu Method — Personalized Workout Recommendation Web Application

**Document Version:** 1.0
**Date Prepared:** June 2025
**Prepared By:** Business Analysis Team
**Status:** Draft — Pending Stakeholder Review and Sign-Off

---

## Executive Summary

The Barthu Method project is a greenfield web application development initiative commissioned by Sebastian Barthu to serve as the core digital platform for his health and fitness business. The platform will deliver a personalized workout recommendation engine based on the proprietary Barthu NSR (Nervous System Regulation) Method — a structured therapeutic and rehabilitative approach combining neuromuscular principles, stress regulation, and movement optimization.

The application will allow users to complete a structured assessment questionnaire, receive a dynamically generated personalized exercise program assembled from a curated video library, and track their progress over time. The recommendation engine will initially operate on a rule-based logic model, with architectural provisions for future AI-assisted adaptive personalization.

The project is structured across three phases: MVP (core platform and fixed pathways), Personalization Engine (full NSR scoring and dynamic program generation), and Scale and Advanced Features. This charter governs the full project scope with primary focus on authorizing and initiating Phase 1 and Phase 2 delivery.

The intended outcome is a scalable, maintainable, and commercially viable platform that positions the Barthu Method as a differentiated digital health product capable of serving thousands of users while supporting future growth into practitioner certification, B2B licensing, and advanced adaptive personalization.

---

## Project Sponsor & Stakeholders

| Role | Name | Contact | Responsibility |
|---|---|---|---|
| **Project Sponsor / Product Owner** | Sebastian Barthu | [TBD] | Business vision, funding authorization, final product decisions, content and method expertise |
| **Project Manager** | [TBD] | [TBD] | Day-to-day delivery management, milestone tracking, risk management, stakeholder communication |
| **Lead Developer / Technical Architect** | [TBD] | [TBD] | System architecture, technical decision-making, development delivery |
| **Frontend Developer** | [TBD] | [TBD] | User interface and experience implementation |
| **Backend Developer** | [TBD] | [TBD] | Database design, recommendation engine logic, API development |
| **UI/UX Designer** | [TBD] | [TBD] | Wireframes, user flows, interface design |
| **QA Engineer** | [TBD] | [TBD] | Testing strategy, quality assurance, bug tracking |
| **Business Analyst** | [TBD] | [TBD] | Requirements documentation, stakeholder liaison, scope management |
| **Legal / Compliance Advisor** | [TBD] | [TBD] | Data privacy compliance (GDPR, HIPAA), medical software classification review |
| **End Users (B2C)** | General Public / Patients | N/A | Individuals seeking personalized exercise and recovery programs |
| **End Users (B2B — Future)** | Healthcare Practitioners | N/A | Clinicians and therapists potentially licensed to deliver the Barthu Method |

> **Note:** Stakeholder contacts and team assignments are pending finalization. The project team structure above reflects anticipated roles based on project scope. Formal team onboarding and role confirmation to be completed prior to Phase 1 kick-off.

---

## Business Case

### The Opportunity

Sebastian Barthu has developed a proprietary therapeutic method — the Barthu NSR Method — that combines neuromuscular rehabilitation, nervous system regulation, stress management, sleep optimization, and movement restoration into a structured, repeatable protocol. The method has been developed and validated through clinical practice but currently lacks a scalable digital delivery mechanism.

The global physical rehabilitation and telerehabilitation market represents a significant and growing commercial opportunity. The telerehabilitation segment alone is expanding at an estimated 12–15% CAGR, accelerated by post-COVID adoption of remote health services. Proprietary method businesses that successfully combine clinical credibility with digital product sophistication are well-positioned to capture a meaningful share of this market.

### The Problem

Without a dedicated digital platform, the Barthu Method is constrained in its ability to scale. Delivery is dependent on direct practitioner involvement, program personalization is manual and time-intensive, and there is no systematic way to track user outcomes, validate the method's efficacy at scale, or generate recurring digital revenue independent of one-to-one service delivery.

Generic platforms (e.g., Kajabi, Teachable, or standard LMS tools) are insufficient because they do not support the method's core logic: dynamic assessment scoring, tag-based exercise matching, and personalized program generation. A purpose-built platform is required to faithfully encode the Barthu NSR assessment and recommendation framework.

### The Strategic Response

Building a proprietary web application allows Sebastian Barthu to:

- **Encode and protect** the method's intellectual property in a scalable software system
- **Automate personalization** at a level not achievable with generic platforms
- **Generate recurring subscription revenue** through a membership-based access model
- **Scale the user base** from dozens to thousands without proportional increases in delivery cost
- **Establish a foundation** for future B2B practitioner licensing, certification programs, and advanced AI-driven adaptive coaching
- **Generate outcome data** that validates and strengthens the method's evidence base over time

The investment in a purpose-built platform is justified by the long-term commercial upside, the competitive differentiation it creates, and the structural limitations of all available off-the-shelf alternatives.

---

## Project Goals & Objectives

### Primary Goals

1. **Deliver a functional MVP** (Phase 1) that establishes the core web application infrastructure, user account management, and a simplified assessment-to-pathway experience within an agreed timeline.

2. **Deliver a full personalization engine** (Phase 2) that implements the complete NSR assessment scoring model, dynamic tag-based exercise matching, personalized dashboard, progress tracking, and journey-building functionality.

3. **Establish a scalable and maintainable technical foundation** that can support growth to tens of thousands of users without requiring major architectural rebuild.

4. **Integrate commerce, membership, and email marketing capabilities** through third-party services to enable the platform to operate as a commercially viable product from launch.

5. **Position the platform for Phase 3 advanced features** — including adaptive personalization, multi-day and multi-week program generation, and potential AI-driven coaching — without requiring those features to be built in the initial phases.

### Measurable Objectives

| Objective | Target Metric | Timeline |
|---|---|---|
| MVP platform live and accessible to users | Go-live confirmed | End of Phase 1 [TBD] |
| Assessment questionnaire completion rate | ≥ 70% of users who begin complete the full assessment | Within 60 days of launch |
| Personalized program generation accuracy | Programs match stated user goals and assessment outcomes | Validated in QA before launch |
| User account and data retention | User journey records saved and retrievable with 100% accuracy | At launch |
| Platform uptime post-launch | ≥ 99.5% availability | Ongoing |
| Paying membership conversion rate | [TBD — to be defined with client based on pricing model] | Within 90 days of Phase 2 launch |
| Active registered users at 6 months post-launch | [TBD — client to define target] | 6 months post-launch |

---

## Scope

### In Scope

**Phase 1 — MVP**

- Greenfield web application build from scratch
- User registration, login, and account management (authentication and authorization)
- Assessment questionnaire: 5–10 questions covering pain location, stress level, sleep quality, available time, and primary goals
- Fixed pathway logic: mapping questionnaire responses to one of 5–10 predefined program pathways
- Basic exercise library database (initial seed data: up to 50–100 videos with metadata tagging)
- Video playback integration using a third-party video hosting service (e.g., Vimeo, Mux, or equivalent)
- Basic user dashboard displaying assigned program
- Third-party integrations for payments and membership access (e.g., Stripe for payments; membership gating logic)
- Basic email integration via third-party service (e.g., Mailchimp, ActiveCampaign, or equivalent) for onboarding and transactional emails
- Responsive web design suitable for desktop and mobile browsers
- Admin interface for managing exercise library content (add, edit, tag, deactivate exercises)
- Core documentation sufficient for future developer handover

**Phase 2 — Personalization Engine**

- Full NSR assessment engine: expanded questionnaire (up to 15–20 questions), scoring logic, and NSR profile generation
- Dynamic tag-based recommendation engine: rule-based exercise matching using duration, body area, pain type, stress level, intensity, goal, and progression level
- Personalized user dashboard: displaying unique generated program, session progress, and next session
- User Journey Record: saved program state, completion percentage, and return-to-program functionality
- Multi-day and multi-week program generation (e.g., 5-day and 30-day structured programs)
- Progress tracking and reassessment functionality
- Journey builder: system-generated playlists assembled dynamically from the exercise database
- Expanded exercise library support (up to 200–500 exercises)
- Admin tools for managing assessment logic, pathways, and exercise tagging
- Post-session feedback capture (pain, energy, stress ratings) as foundation for future adaptive logic

**General — Both Phases**

- Hosting infrastructure setup and configuration [TBD — provider to be confirmed]
- Basic performance and scalability architecture (database query optimization, video delivery via CDN-backed provider)
- Data privacy compliance foundations: GDPR-aligned data handling, consent management, and privacy policy implementation [jurisdiction to be confirmed with client]
- Technical documentation and code documentation throughout

### Out of Scope

The following items are explicitly excluded from the current project and are deferred to Phase 3 or future initiatives:

- Native mobile application (iOS or Android)
- Offline video access or local video download functionality
- AI-generated or machine-learning-based recommendation logic (beyond rule-based engine)
- Adaptive AI coaching at scale
- Wearable device integration (e.g., Apple Watch, Fitbit)
- Video editing, rendering, or merging of exercise clips into new video files
- Clinical-grade data security or HIPAA-compliant architecture (unless confirmed as required by target market)
- Practitioner certification or B2B LMS (Learning Management System) functionality
- Custom-built landing pages or marketing website (assumed to be handled separately)
- Video production or content creation (exercise videos are provided by client)
- Advanced video analytics
- Complex CRM functionality beyond basic email integration
- Software as a Medical Device (SaMD) regulatory certification [to be reviewed with legal advisor]

> **Note:** The above out-of-scope items should be revisited and formally assessed during Phase 2 completion and prior to any Phase 3 initiation.

---

## Key Deliverables

### Phase 1 — MVP

| # | Deliverable | Description |
|---|---|---|
| D1.1 | Deployed Web Application (MVP) | Fully functional web application accessible via browser |
| D1.2 | User Authentication Module | Registration, login, password management, session handling |
| D1.3 | Assessment Questionnaire | 5–10 question flow with response capture and pathway assignment |
| D1.4 | Fixed Pathway Engine | Logic mapping assessment responses to one of 5–10 predefined program pathways |
| D1.5 | Exercise Library Database | Seeded database with up to 100 exercises and full metadata tagging schema |
| D1.6 | Video Player Integration | Embedded video playback connected to exercise library via third-party provider |
| D1.7 | Basic User Dashboard | Displays assigned program, current session, and basic navigation |
| D1.8 | Commerce & Membership Integration | Payment gateway and membership access gating (third-party services) |
| D1.9 | Email Integration | Onboarding and transactional email flows via third-party email service |
| D1.10 | Admin Content Management Interface | Interface for managing exercise library entries and metadata |
| D1.11 | Technical Architecture Documentation | System design, data model, API contracts, and infrastructure documentation |
| D1.12 | Handover Documentation (Phase 1) | Developer handover pack sufficient for future team continuity |

### Phase 2 — Personalization Engine

| # | Deliverable | Description |
|---|---|---|
| D2.1 | Full NSR Assessment Engine | Expanded questionnaire, scoring logic, and NSR profile generation |
| D2.2 | Dynamic Recommendation Engine | Rule-based tag-matching engine generating personalized exercise playlists |
| D2.3 | User Journey Record System | Saved program state with completion tracking and resume functionality |
| D2.4 | Multi-Day / Multi-Week Program Generator | System for generating and displaying 5-day and 30-day structured programs |
| D2.5 | Progress Tracking Module | Session completion logging, progress visualization, and history |
| D2.6 | Reassessment Functionality | Periodic reassessment flow with program adjustment logic |
| D2.7 | Post-Session Feedback Capture | Pain, energy, and stress rating collection after each session |
| D2.8 | Enhanced Admin Tools | Extended admin interface for assessment logic, pathway, and tagging management |
| D2.9 | Updated Technical Documentation | Revised documentation reflecting Phase 2 architecture and logic |
| D2.10 | Handover Documentation (Phase 2) | Updated developer handover pack |

---

## High-Level Timeline

> **Note:** All dates below are indicative estimates based on project complexity and standard development velocity for a project of this scope. Formal timeline and milestone dates are to be confirmed following technical scoping, team assembly, and client sign-off on Phase 1 requirements.

| Phase | Milestone | Estimated Duration | Target Date |
|---|---|---|---|
| **Pre-Project** | Requirements finalization, team onboarding, technical scoping | 2–3 weeks | [TBD] |
| **Phase 1 — MVP** | | | |
| | Sprint 1: Infrastructure setup, authentication, database schema | Weeks 1–3 | [TBD] |
| | Sprint 2: Assessment questionnaire and pathway logic | Weeks 3–6 | [TBD] |
| | Sprint 3: Exercise library, video player, basic dashboard | Weeks 6–9 | [TBD] |
| | Sprint 4: Commerce/membership integration, email integration | Weeks 9–12 | [TBD] |
| | Sprint 5: Admin interface, QA, bug fix, UAT | Weeks 12–15 | [TBD] |
| | **Phase 1 Go-Live (MVP Launch)** | **~15 weeks** | **[TBD]** |
| **Phase 1→2 Review** | Post-MVP review, Phase 2 scoping and planning | 2–3 weeks | [TBD] |
| **Phase 2 — Personalization Engine** | | | |
| | Sprint 6: NSR scoring engine and profile generation | Weeks 1–3 | [TBD] |
| | Sprint 7: Dynamic recommendation engine (tag-based matching) | Weeks 3–6 | [TBD] |
| | Sprint 8: User journey records, multi-day program generator | Weeks 6–9 | [TBD] |
| | Sprint 9: Progress tracking, reassessment, feedback capture | Weeks 9–12 | [TBD] |
| | Sprint 10: Enhanced admin tools, QA, UAT, performance testing | Weeks 12–15 | [TBD] |
| | **Phase 2 Go-Live (Full Personalization Engine)** | **~15 weeks** | **[TBD]** |
| **Phase 2→3 Review** | Performance review, Phase 3 business case assessment | [TBD] | [TBD] |
| **Phase 3 — Scale & Advanced** | Scope, timeline, and budget to be defined after Phase 2 | [TBD] | [TBD] |

> **Total Estimated Duration (Phase 1 + Phase 2):** Approximately 30–36 weeks from project kick-off, subject to scope confirmation, team availability, and UAT feedback cycles.

---

## Budget & Resources

### Budget

| Item | Estimated Range | Notes |
|---|---|---|
| Phase 1 Development (MVP) | [TBD] | To be detailed in formal proposal from development partner |
| Phase 2 Development (Personalization Engine) | [TBD] | To be scoped following Phase 1 completion |
| Phase 3 Development (Scale & Advanced) | [TBD] | To be scoped following Phase 2 and validated business metrics |