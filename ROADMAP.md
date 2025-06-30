# Clairly MVP Development Roadmap

This document outlines the development tasks required to achieve the Minimum Viable Product (MVP). We will track progress by checking off items as they are completed.

---

### Phase 1: Core Setup & Onboarding

- [x] **1.1: Project & Auth Setup**
    - [x] 1.1.1: Integrate Clerk SDK for Next.js and configure environment variables.
    - [x] 1.1.2: Set up Clerk middleware for role-based protected routes (`/tenant`, `/landlord`, `/agency`).
    - [x] 1.1.3: Customize the UI of default Clerk sign-in/sign-up pages to align with the brand.
- [x] **1.2: Onboarding Flow**
    - [x] 1.2.1: Create the initial role selection page at `/onboarding/role`.
    - [x] 1.2.2: Implement the server action to update a user's Clerk metadata with their selected role.
    - [ ] 1.2.3: Build the tenant onboarding form (e.g., personal info).
    - [ ] 1.2.4: Build the landlord onboarding form (e.g., company info).
    - [ ] 1.2.5: Build the agency onboarding form (e.g., SIRET validation).
    - [ ] 1.2.6: Connect onboarding forms to the database to store role-specific user data.

---

### Phase 2: Tenant-Facing Features

- [ ] **2.1: Document Management & Storage**
    - [ ] 2.1.1: Configure UploadThing with AWS S3 for secure file storage.
    - [ ] 2.1.2: Implement the file upload UI in the tenant's dossier section.
    - [ ] 2.1.3: Ensure uploaded documents are securely linked to the tenant's user ID and stored in the database.
- [ ] **2.2: Third-Party Integrations**
    - [ ] 2.2.1: Implement the DossierFacile Connect flow (OAuth) for tenants.
    - [ ] 2.2.2: Create a secure mechanism to store and refresh DossierFacile API tokens.
    - [ ] 2.2.3: Implement the Tink Open Banking connection flow for tenants.
    - [ ] 2.2.4: Fetch and process financial data from Tink to verify income.
- [ ] **2.3: Trust Score System**
    - [ ] 2.3.1: Finalize and implement the Trust Score algorithm logic (weighted: Payment 50%, Documents 40%, Profile 10%).
    - [ ] 2.3.2: Create a service/hook to calculate and display the score on the tenant dashboard.
    - [ ] 2.3.3: Implement real-time updates to the score when underlying data changes (e.g., new document uploaded).
- [ ] **2.4: Secure Sharing**
    - [ ] 2.4.1: Develop functionality for a tenant to generate a unique, shareable link to their verified profile.
    - [ ] 2.4.2: Build the public, read-only view of the shared profile.
    - [ ] 2.4.3: Add simple analytics to track views on shared links.

---

### Phase 3: UI/UX & Finalization

- [ ] **3.1: Core UI & Dashboards**
    - [ ] 3.1.1: Build the main layout for the tenant dashboard.
    - [ ] 3.1.2: Build the main layout for the landlord dashboard.
    - [ ] 3.1.3: Build the main layout for the agency dashboard.
- [ ] **3.2: Internationalization (i18n)**
    - [ ] 3.2.1: Integrate `next-intl` and set up `fr` and `en` locale files.
    - [ ] 3.2.2: Implement a language switcher component.
    - [ ] 3.2.3: Refactor all UI components to use translation keys instead of hardcoded text.
- [ ] **3.3: Responsiveness & Polish**
    - [ ] 3.3.1: Conduct a full review of the application on mobile, tablet, and desktop screen sizes.
    - [ ] 3.3.2: Fix all identified responsiveness issues.
    - [ ] 3.3.3: Perform a final UI/UX polish pass.
