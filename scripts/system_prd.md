
**Product Requirements Document (PRD): "Matlabtim B'Limudim" MVP v1.0**

**Version:** 1.0
**Date:** October 26, 2023 (Example Date)
**Author/Owner:** Tsach Ovadia
**Status:** Draft

**1. Introduction & Strategic Context**

*   **1.1. Problem Statement:**
    Prospective students in Israel face a fragmented and overwhelming landscape when researching higher education options. Information about degree programs, admission requirements, and program specifics is scattered across numerous institutional websites, often in inconsistent formats. This makes it difficult for users to find relevant options, compare them effectively, and make informed decisions, leading to confusion, anxiety, and potentially sub-optimal academic choices.
*   **1.2. Product Vision:**
    To become the leading, trusted platform in Israel for personalized academic guidance, empowering users to confidently navigate their higher education choices by providing comprehensive, tailored information, data-driven insights, and community connections.
*   **1.3. MVP Goals & Scope:**
    *   **Primary Goal:** Validate the core value proposition that users will engage with and find utility in a centralized platform offering personalized program recommendations and comparison tools, initially focused on **Bachelor's degrees in Computer Science and Psychology (including their combined/dual-major variants)** in accredited Israeli academic institutions.
    *   **Secondary Goals:**
        1.  Establish a robust, test-covered foundational backend and database capable of storing and serving accurate academic program data and user information for the initial scope.
        2.  Attract an initial cohort of users from the "מתלבטים בלימודים" Facebook group to gather actionable feedback on usability, value, and data accuracy.
        3.  Test the viability of (consensual) user data collection for potential future lead generation models.
*   **1.4. Target Audience (MVP):**
    *   Israeli high school seniors and recently discharged soldiers actively considering Bachelor's degrees in Computer Science or Psychology.
*   **1.5. Guiding Principles for MVP Development:**
    *   **Lean Startup Methodology:** Employ a Build-Measure-Learn iterative cycle.
    *   **Test-Driven Development (TDD):** Backend development will strictly follow TDD principles to ensure code quality, maintainability, and reliability. Unit and integration tests will precede implementation.
    *   **User-Centricity:** Prioritize features that deliver immediate and tangible value to the target user in their decision-making journey.
    *   **Data Accuracy & Trust:** Strive for the highest possible accuracy in program data and maintain transparency with users regarding data usage and privacy.

**2. Assumptions & Success Metrics**

*   **2.1. Key Assumptions & Hypotheses:**
    *   **Value Hypothesis 1:** Users will perceive significant value in inputting academic scores (Bagrut/Psychometric) to receive a filtered/prioritized list of relevant CS/Psychology programs.
    *   **Value Hypothesis 2:** A side-by-side program comparison tool for CS/Psychology will be a highly utilized feature.
    *   **Growth Hypothesis 1:** The existing Facebook community can be leveraged to drive initial MVP adoption and feedback.
    *   **Technical Hypothesis 1:** An initial dataset for CS & Psychology programs can be collated and maintained with sufficient accuracy for MVP utility.
*   **2.2. Key Performance Indicators (KPIs) for MVP Success:**
    *   **Engagement:**
        *   Number of unique visitors & active sessions.
        *   Percentage of visitors completing the initial preference/data input flow.
        *   Average number of programs viewed per user.
        *   Usage rate of the program comparison feature.
    *   **Data & Feedback:**
        *   Number of users providing explicit consent for data storage/lead sharing (if implemented).
        *   Volume and sentiment of qualitative feedback (surveys, direct messages).
    *   **Technical Health (Backend):**
        *   API uptime and response times.
        *   Unit and integration test code coverage percentage (target: >85% for new backend logic).
        *   Successful CI/CD pipeline execution rate.

**3. Detailed Features & User Stories (MVP Scope: Computer Science & Psychology)**

*   All backend components will be developed using a **Test-Driven Development (TDD)** approach, with tests written prior to code implementation.

**EPIC 1: User Onboarding, Data Input, and Personalization Foundation**
*Goal: Provide an engaging entry point, clearly articulate the platform's value, and enable users to securely input their academic data (Bagrut, Psychometric) and initial preferences to receive personalized program recommendations for Computer Science and Psychology.*

*   **Story 1.1: Engaging Welcome & Value Proposition**
    *   **As a** new visitor, **I want to** see a clear, concise, and engaging welcome on the landing page that immediately explains how the site will help me find suitable Computer Science or Psychology degree programs in Israel, **So that** I understand the core value and am encouraged to start the process.
    *   **Acceptance Criteria (AC):**
        1.  Landing page displays a compelling headline and sub-headline (e.g., "Your Smart Path to a CS or Psychology Degree in Israel!").
        2.  A brief (1-3 sentences) text clearly explains the benefit (e.g., "Get personalized recommendations based on your scores and interests, compare programs, and find your fit.").
        3.  A prominent and clear Call to Action (CTA) button (e.g., "Find My Program," "Get Started").

*   **Story 1.2: Initial Interest & Preference Capture**
    *   **As a** new user initiating the process, **I want to** be guided through a short, interactive questionnaire (1-3 questions) about my general academic interests or learning preferences (e.g., "Are you leaning more towards analytical problem-solving or understanding human behavior?", "Interested in a pure degree or a combined program?"), **So that** the platform can begin to tailor the experience immediately and make the interaction feel more personalized and conversational.
    *   **AC:**
        1.  Presents 1-3 engaging, multiple-choice questions after the initial CTA.
        2.  User selections are captured.
        3.  (Backend) User's initial preferences are temporarily stored (e.g., session/local storage for MVP, or associated with a temporary user ID if more advanced backend interaction is planned from the start). Test cases ensure preferences are correctly processed.

*   **Story 1.3: Secure & User-Friendly Bagrut Grades Input (Manual)**
    *   **As a** user, **I want to** be able to easily and accurately enter my Bagrut subjects, units, and grades through a structured and intuitive form, **So that** this data can be used by the system to provide personalized program matches.
    *   **AC:**
        1.  A dedicated, clearly labeled form/section for Bagrut grades.
        2.  Interface allows adding multiple subjects dynamically.
        3.  Input fields for subject name (ideally with autocomplete for common subjects), units (dropdown with standard values like 3, 4, 5), and grade (numeric).
        4.  Client-side validation for grade (e.g., 0-100) and units.
        5.  (Backend) API endpoint to receive and validate Bagrut data. Unit tests cover validation logic (valid/invalid grades, units, subject formats) and secure data handling/storage (if user accounts or persistent sessions are part of MVP).

*   **Story 1.4: Secure Psychometric Score Input**
    *   **As a** user, **I want to** be able to enter my overall Psychometric score, and optionally, my quantitative, verbal, and English sub-scores, in a straightforward manner, **So that** the system can utilize this critical data point for more precise program recommendations.
    *   **AC:**
        1.  Clear input field(s) for Psychometric score(s); overall score is primary.
        2.  Client-side validation for score ranges (e.g., 200-800).
        3.  (Backend) API endpoint to receive and validate Psychometric data. Unit tests cover validation logic and secure data handling/storage.

*   **Story 1.5: Data Privacy & Consent**
    *   **As a** user, **I want to** be clearly informed about how my submitted academic data and preferences will be used, stored, and potentially shared (e.g., as anonymized statistics or as leads *with my explicit consent*), **So that** I can make an informed decision and trust the platform with my sensitive information.
    *   **AC:**
        1.  A clear, easily accessible link to the Privacy Policy is present on all data input pages.
        2.  If lead generation is an MVP feature: An explicit, unchecked opt-in checkbox is required for sharing identifiable data with academic institutions (e.g., "I agree to share my (details) with relevant institutions for program information").
        3.  Privacy Policy briefly outlines data usage for personalization, recommendations, and (if applicable and consented) lead generation.

**EPIC 2: Program Discovery, Personalized Filtering, and Detailed Information (CS & Psychology)**
*Goal: Enable users to discover relevant Computer Science and Psychology programs (including combined degrees) based on their input, view detailed information, and benefit from initial personalized filtering.*

*   **Story 2.1: Browsing & Filtering Program Listings**
    *   **As a** user, **I want to** be able to view distinct, filterable lists of (1) Computer Science programs and (2) Psychology programs (including their respective combined/dual-major options), **So that** I can efficiently explore academic offerings within my chosen field(s) of interest.
    *   **AC:**
        1.  Clear navigation to separate "Computer Science Programs" and "Psychology Programs" views/sections.
        2.  Each program listing displays: Institution Name, Full Program Name (HE/EN), indication if it's a Combined Major and with what.
        3.  Basic filtering options available for each list (e.g., by Institution, by single vs. combined major).
        4.  (Backend) API endpoint (e.g., `GET /api/v1/programs`) supports querying by `field_of_study=['computerscience'|'psychology']` and other basic filters (e.g., `institution_id`, `is_combined`). Unit and integration tests ensure correct data retrieval and filtering logic.

*   **Story 2.2: Personalized Program Matching & Highlighting (Rule-Based MVP)**
    *   **As a** user who has submitted my Bagrut and/or Psychometric scores, **I want to** see the program listings (CS/Psychology) visually indicate or prioritize programs for which my scores suggest a potential match with general admission likelihoods, **So that** I can quickly focus on the most promising options.
    *   **AC:**
        1.  If scores are available, programs in the list receive a visual cue (e.g., "Potential Match," "Good Fit," "High Chance" icon/label, or a simple sorting mechanism).
        2.  (Backend) A `POST /api/v1/recommendations/programs` endpoint accepts user scores (and initial preferences from Story 1.2).
        3.  (Backend) Recommendation logic for MVP is rule-based (e.g., using predefined score thresholds per program type/institution tier for CS/Psychology). Tests cover various score inputs and expected program outputs/rankings.
        4.  The system clearly communicates that these are estimations and not guarantees of admission.

*   **Story 2.3: Accessing Detailed Program Information**
    *   **As a** user, **I want to** be able to click on any program in a list and navigate to a dedicated page displaying comprehensive details about that specific program, **So that** I can thoroughly evaluate its suitability.
    *   **AC:**
        1.  Program Detail Page clearly displays: Institution Name, Full Program Name (HE/EN), Faculty/Department, Program Duration, an Official Program Description (sourced from research), General Admission Requirements (as available and structured in the DB), and a **direct, clickable link to the official program page on the institution's website.**
        2.  (Backend) API endpoint (e.g., `GET /api/v1/programs/{program_id}`) retrieves and serves all relevant details for a specific program. Tests ensure all data fields are correctly returned.

**EPIC 3: Program Comparison and Initial Guidance**
*Goal: Empower users to compare selected programs side-by-side and receive initial forms of technical and community-sourced guidance.*

*   **Story 3.1: Side-by-Side Program Comparison Tool**
    *   **As a** user, **I want to** be able to select two or three Computer Science or Psychology programs (from listings or detail pages), **So that** I can compare their key attributes directly in a side-by-side view to aid my decision.
    *   **AC:**
        1.  Users can select/de-select programs for comparison (e.g., via checkboxes or an "Add to Compare" button). A maximum of 3 programs can be compared at once for MVP.
        2.  A dedicated comparison page displays selected programs in columns.
        3.  Comparable attributes for MVP: Institution, Program Name, Duration, Primary Focus/Keywords from Description, General Admission Score Ranges (if consistently available), Link to Official Page.

*   **Story 3.2: Basic "Technical" Admission Insight**
    *   **As a** user who has provided my scores, when viewing a program detail page or comparison, **I want to** see a simple, contextual textual insight regarding my scores in relation to that program's general admission data (e.g., "Your Psychometric score is within the typical range for this program at [Institution]," or "The math units in your Bagrut align well with this CS program's emphasis"), **So that** I get personalized, data-informed feedback.
    *   **AC:**
        1.  A small, clearly marked section on the program detail/comparison page displays this contextual insight.
        2.  (Backend) Logic (can be part of the recommendation service or a separate utility) generates this text based on comparing user's stored scores with the program's admission data. Tests cover different score/program combinations and expected textual outputs.

*   **Story 3.3: "Community Wisdom" Link/Prompt**
    *   **As a** user exploring a specific program, **I want to** see a prompt or link suggesting how I can find related discussions or student experiences (e.g., "Curious what students think? Search for '[Program Name] at [Institution]' in our Facebook community!" with a pre-constructed search URL to the "מתלבטים בלימודים" group), **So that** I am encouraged to tap into existing community knowledge.
    *   **AC:**
        1.  A non-intrusive, contextually relevant link or CTA is displayed on program detail pages.
        2.  The link directs to the Facebook group, ideally with search parameters if technically feasible and useful.
        3.  *Note: Direct integration of forum/reviews is out of MVP scope.*

**EPIC 4: Core Backend Infrastructure, Data Management, and API Foundation (TDD)**
*Goal: Ensure a robust, scalable, and test-covered backend capable of storing, managing, and serving the necessary data for Computer Science & Psychology programs and supporting all MVP functionalities through well-defined APIs.*

*   **Story 4.1: Database Schema Design & Implementation**
    *   **As a** backend developer, **I will** design and implement a relational database schema (e.g., PostgreSQL) to effectively store and manage data for Institutions, Faculties, Programs (CS & Psychology), Admission Requirements, Users (basic), User Bagrut Grades, User Psychometric Scores, and User Preferences, **So that** the platform has a structured and reliable data foundation.
    *   **AC:**
        1.  Logical and physical database schema is designed and documented.
        2.  Schema is implemented in the chosen RDBMS.
        3.  Relationships (foreign keys, one-to-many, many-to-many where appropriate) are correctly defined.
        4.  Appropriate data types and constraints are used for all fields.
        5.  Initial indexes are created for frequently queried fields to ensure performance.

*   **Story 4.2: Initial Data Collation, Validation, and Seeding**
    *   **As a** data manager/backend developer, **I will** process the research findings (from AI tools and manual checks) on CS & Psychology programs, validate key information (especially program links and general admission trends), structure it, and create a seeding mechanism, **So that** the MVP database is populated with accurate initial content.
    *   **AC:**
        1.  Data from research is consolidated into a structured format (e.g., CSVs).
        2.  Key data points (links, program names) are spot-checked and validated.
        3.  A repeatable seeding script/process is developed and tested to populate the database tables.
        4.  Unit tests for the seeding process verify data integrity after seeding.

*   **Story 4.3: Core API Endpoints Development (TDD)**
    *   **As a** backend developer, **I will** develop, test (using TDD), and document the core RESTful API endpoints required to support all MVP user-facing functionalities (program listing, filtering, details, personalized recommendations, data submission), **So that** the frontend has a reliable and well-defined interface to interact with the backend services.
    *   **AC:**
        1.  **For each endpoint (e.g., `GET /api/v1/programs`, `GET /api/v1/programs/{id}`, `POST /api/v1/users/academic-profile`, `POST /api/v1/recommendations/programs`):**
            *   Comprehensive unit tests are written *before* implementation, covering success cases, error handling (4xx, 5xx errors), input validation, and edge cases.
            *   Integration tests verify interaction with the database layer.
            *   Endpoints adhere to RESTful principles.
            *   Request and response payloads are well-defined (e.g., using JSON schema).
            *   API documentation (e.g., Swagger/OpenAPI) is generated or manually created for frontend developers.
            *   All tests pass in the CI pipeline.

*   **Story 4.4: Backend Deployment & CI/CD Pipeline**
    *   **As a** backend developer, **I will** set up a basic Continuous Integration/Continuous Deployment (CI/CD) pipeline and deploy the initial backend application to a staging/production-like environment, **So that** the application can be tested comprehensively and made accessible.
    *   **AC:**
        1.  CI pipeline (e.g., GitHub Actions) is configured to run tests automatically on code pushes.
        2.  Successful builds (passing tests) are automatically deployable (or deployed) to a designated environment.
        3.  Basic logging and monitoring are configured for the deployed application.

**4. Non-Functional Requirements (NFRs) for MVP**

*   **4.1. Performance:**
    *   API response times for typical queries should be < 500ms.
    *   Frontend page load times (LCP) should be < 3 seconds for key pages.
*   **4.2. Security:**
    *   All PII (grades, scores, contact info if collected) must be stored securely (e.g., encrypted at rest if highly sensitive, though for MVP, focus on secure transport and access controls).
    *   HTTPS must be enforced for all traffic.
    *   Protection against common web vulnerabilities (OWASP Top 10 basics like XSS, SQL Injection through ORM/prepared statements).
    *   Clear data retention and deletion policy outlined in Privacy Policy.
*   **4.3. Usability (Frontend):**
    *   Clean, intuitive, and uncluttered user interface.
    *   Mobile-first responsive design.
    *   Clear error messaging and user guidance.
*   **4.4. Data Accuracy:**
    *   Strive for >95% accuracy for direct program links and official program names in the initial dataset. Admission requirement data will be "best effort" for MVP, with clear disclaimers.
*   **4.5. Scalability (Basic Consideration for MVP):**
    *   The chosen backend stack and database should be capable of handling a moderate increase in users and data without immediate re-architecture, though massive scale is not an MVP goal.

**5. Design & UX Guidelines (Summary)**

*   **Overall Feel:** Modern, trustworthy, empathetic, and empowering.
*   **Visual Design:** Clean, professional, with good use of white space. A calming color palette.
*   **Interaction Design:** Intuitive flows, minimal clicks to achieve tasks. The "conversational" questionnaire should feel natural.
*   **Content:** Clear, concise, and user-focused language (Hebrew). Avoid jargon where possible.

**6. Future Considerations (Out of Scope for MVP v1.0)**

*   Expansion to all academic fields and all accredited institutions in Israel.
*   OCR for Bagrut certificate upload.
*   Advanced AI/ML-driven recommendation algorithms (beyond rule-based).
*   Full user account system (persistent profiles, saved searches, personalized dashboards, notifications).
*   Integrated community forums, student reviews, and direct Q&A features.
*   Direct API integrations with academic institutions (for real-time data).
*   Advanced monetization: Premium user features, sophisticated analytics for institutions.
*   Native mobile applications (iOS/Android).
*   Support for Master's degrees and other certifications.
