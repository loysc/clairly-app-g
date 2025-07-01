# Clairly MVP Development Roadmap

This document outlines the development tasks required to achieve the Minimum Viable Product (MVP). We will track progress by checking off items as they are completed.

---

### Phase 1: Core Setup, Security & Onboarding

- [x] **1.1: Project & Auth Setup**
  - [x] 1.1.1: Integrate Clerk SDK for Next.js and configure environment variables.
  - [x] 1.1.2: Set up Clerk middleware for role-based protected routes (`/tenant`, `/landlord`, `/agency`).
  - [x] 1.1.3: Customize the UI of default Clerk sign-in/sign-up pages to align with the brand.
  - [x] 1.1.4: Implement & Enable Supabase Row Level Security (RLS) policies.
- [x] **1.2: Onboarding Flow**
  - [x] 1.2.1: Create the initial role selection page at `/onboarding/role`.
  - [x] 1.2.2: Implement the server action to update Clerk metadata and programmatically create a `tenant` record in Supabase upon role selection.
  - [ ] **1.2.3: Implement Agency Onboarding Workflow (Multi-step UI)**
    - [x] 1.2.3.1: **Step 1: Agency Information & SIRET Lookup Page.** (Title: "Agency information", Input: "Company name or SIREN/SIRET number", Buttons: "Search", "Back").
    - [ ] - [x] 1.2.3.2: **Step 2: Agency Confirmation Page.** (Title: "Agency information", Display API result card, Buttons: "Enter my details manually", "Back").
    - [x] 1.2.3.3: **Step 3: Address Confirmation Page.** (Title: "Agency address", Pre-filled Address, Additional details, Zip Code, City, Buttons: "Continue", "Back").
    - [x] 1.2.3.4: Build the "Manual Creation: Agency Information" page (Legal Name, Legal Form checkboxes: SAS, SARL, SASU, SIRET/SIREN, Registration Date (DD/MM/YYYY auto-format), Proof of Registration upload).
    - [x] 1.2.3.5: Build the "Agency Address Form" page (for manual path: Address, Additional details, Zip code, City).
    - [x] 1.2.3.6: Build the "Finishing Setup" page (Rental Software dropdown: Sweepbright, Hecktor, AC3, Other; Units Managed radio buttons: 10-100, 100-300, 300+).
    - [ ] 1.2.3.7: Implement multi-step form navigation and state management across these pages.
  - [ ] **1.2.4: Integrate INSEE API & Persist Agency Data**
    - [ ] 1.2.4.1: Create server action to call INSEE API for SIRET/SIREN lookup.
    - [ ] 1.2.4.2: Implement secure file upload for "Proof of Registration" using UploadThing.
    - [ ] 1.2.4.3: Create server actions to save agency data from each step to the Supabase `agencies` table.
    - [ ] 1.2.4.4: Update `agencies` table schema to include new fields (legal form, registration date, rental software, units managed).

---

### Phase 2: Tenant & Landlord Core Features

- [ ] **2.1: Tenant Document Management**
  - [ ] 2.1.1: Configure secure file storage (e.g., AWS S3).
  - [ ] 2.1.2: Implement the DossierFacile Connect flow (OAuth) for tenants to import their verified dossier.
  - [ ] 2.1.3: Build the manual dossier creation flow with file uploads.
  - [ ] 2.1.4: Ensure all documents (imported or uploaded) are securely linked to the tenant's user ID.
- [ ] **2.2: Third-Party Integrations**
  - [ ] 2.2.1: Implement the Tink Open Banking connection flow for tenants to verify rent history.
  - [ ] 2.2.2: Develop functionality for a tenant to generate a unique, shareable link to their verified profile/dossier.
  - [ ] 2.2.3: Add simple analytics to track views on shared links.
- [ ] **2.3: Landlord/Agency MVP Features**
  - [ ] 2.3.1: Build the public, read-only view of a shared profile that a landlord/agency sees when clicking a link.
  - [ ] 2.3.2: Create a basic dashboard for landlords/agencies to view a list of received applications/dossiers.
  - [ ] 2.3.3: Implement "Accept" and "Reject" actions on a received application.

---

### Phase 3: UI/UX & Finalization

- [ ] **3.1: Core UI & Dashboards**
  - [ ] 3.1.1: Build the main layout for the tenant dashboard, showing dossier status and a "Share" button.
  - [ ] 3.1.2: Build the main layout for the landlord/agency dashboard.
  - [ ] 3.1.3: Perform a final UI/UX polish pass across the application.
- [ ] **3.2: Internationalization (i18n)**
  - [ ] 3.2.1: Integrate `next-intl` and set up `fr` and `en` locale files.
  - [ ] 3.2.2: Implement a language switcher component.
  - [ ] 3.2.3: Refactor all UI components to use translation keys instead of hardcoded text.
- [ ] **3.3: Responsiveness & Testing**
  - [ ] 3.3.1: Conduct a full review of the application on mobile, tablet, and desktop screen sizes.
  - [ ] 3.3.2: Write unit and integration tests for critical functions (e.g., server actions, API integrations).
  - [ ] 3.3.3: Perform E2E (End-to-End) testing on the complete user flow (Tenant shares -> Landlord views).
