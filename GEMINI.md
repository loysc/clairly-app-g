## PROJECT OVERVIEW

Clairly is a trust-first SaaS platform modernizing the European rental market by establishing tenant credibility through verified rental reputation profiles, easing landlord risk, and empowering tenant mobility.

- **Launch Market**: France
- **Expansion**: EU-wide (planned)
- **Core Users**: Tenants, Landlords, Agencies

---

## TECH STACK

| Category            | Technologies (Latest as of June 2025)                         |
| ------------------- | ------------------------------------------------------------- |
| **Frontend**        | Next.js 15.3 (App Router), React 19.1, TypeScript 5.8.3       |
| **Styling/UI**      | Tailwind CSS 4.1, Shadcn/ui (latest), Geist Font              |
| **Database**        | Supabase (PostgreSQL 16), Direct client                       |
| **Authentication**  | Clerk 6.12.1 (role-based)                                     |
| **Storage**         | AWS S3, UploadThing 8.1.2                                     |
| **Integrations**    | DossierFacile (OAuth), Tink (Open Banking), INSEE (SIRET API) |
| **Deployment**      | Vercel (Edge runtime optimized), Node.js 22.15.0 LTS          |
| **Package Manager** | pnpm 9.18.2                                                   |

---

## DETAILED FOLDER & ROUTE STRUCTURE

clairly/
├── app/
│ ├── layout.tsx # Root layout (ClerkProvider, i18n)
│ ├── page.tsx # Role-based redirect
│ ├── globals.css # Global styles
│ ├── not-found.tsx # 404 page
│ ├── error.tsx # Error boundary
│ │
│ ├── (auth)/ # Clerk auth pages
│ │ ├── sign-in/
│ │ │ └── page.tsx
│ │ └── sign-up/
│ │ └── page.tsx
│ │
│ ├── onboarding/ # Centralized onboarding
│ │ ├── choose-role/
│ │ │ └── page.tsx
│ │ ├── tenant/
│ │ │ ├── step-1/
│ │ │ │ └── page.tsx # Personal info
│ │ │ └── step-2/
│ │ │ └── page.tsx # Context questions
│ │ ├── landlord/
│ │ │ └── setup/
│ │ │ └── page.tsx
│ │ └── agency/
│ │ └── setup/
│ │ └── page.tsx
│ │
│ ├── tenant/ # Tenant-specific routes
│ │ ├── dashboard/
│ │ │ ├── page.tsx
│ │ │ ├── empty-state.tsx
│ │ │ └── components/ # Dashboard cards
│ │ ├── profile/
│ │ │ ├── page.tsx
│ │ │ └── trust-score/
│ │ │ └── page.tsx # Integrated trust score
│ │ ├── dossier/
│ │ │ ├── page.tsx
│ │ │ ├── create/
│ │ │ │ └── page.tsx
│ │ │ ├── import/
│ │ │ │ └── page.tsx # DossierFacile integration
│ │ │ └── preview/
│ │ │ └── page.tsx
│ │ ├── applications/
│ │ │ ├── page.tsx # List of applications
│ │ │ ├── start/
│ │ │ │ └── page.tsx
│ │ │ └── [id]/
│ │ │ ├── page.tsx
│ │ │ ├── status/
│ │ │ │ └── page.tsx
│ │ │ └── share/
│ │ │ └── page.tsx
│ │ ├── payments/ # Payment history & disputes
│ │ │ ├── page.tsx
│ │ │ └── [id]/dispute/
│ │ │ └── page.tsx
│ │ ├── share/ # Document sharing center
│ │ │ ├── page.tsx
│ │ │ ├── create/
│ │ │ │ └── page.tsx
│ │ │ └── history/
│ │ │ └── page.tsx
│ │ └── settings/
│ │ └── page.tsx
│ │
│ ├── landlord/ # Landlord-specific routes
│ │ ├── dashboard/
│ │ │ └── page.tsx
│ │ ├── properties/
│ │ │ ├── page.tsx
│ │ │ ├── new/
│ │ │ │ └── page.tsx
│ │ │ └── [id]/
│ │ │ ├── page.tsx
│ │ │ ├── invite/
│ │ │ │ └── page.tsx
│ │ │ └── payments/
│ │ │ └── page.tsx
│ │ ├── applications/ # Review applications
│ │ │ ├── page.tsx
│ │ │ └── [id]/review/
│ │ │ └── page.tsx
│ │ ├── tenants/ # Manage current tenants
│ │ │ ├── page.tsx
│ │ │ └── [id]/sync/
│ │ │ └── page.tsx
│ │ ├── payments/ # Payment tracking
│ │ │ └── page.tsx
│ │ ├── disputes/ # Review disputes
│ │ │ ├── page.tsx
│ │ │ └── [id]/review/
│ │ │ └── page.tsx
│ │ └── settings/
│ │ └── page.tsx
│ │
│ ├── agency/ # Agency-specific routes
│ │ ├── dashboard/
│ │ │ └── page.tsx
│ │ ├── setup/ # SIRET registration & setup
│ │ │ └── page.tsx
│ │ ├── landlords/ # Manage landlords
│ │ │ ├── page.tsx
│ │ │ ├── invite/
│ │ │ │ └── page.tsx
│ │ │ └── [id]/
│ │ │ └── page.tsx
│ │ ├── properties/ # All properties management
│ │ │ ├── page.tsx
│ │ │ ├── new/
│ │ │ │ └── page.tsx
│ │ │ └── [id]/
│ │ │ └── page.tsx
│ │ ├── applications/ # All applications overview
│ │ │ ├── page.tsx
│ │ │ └── [id]/review/
│ │ │ └── page.tsx
│ │ ├── payments/ # Agency-wide payment tracking
│ │ │ └── page.tsx
│ │ ├── disputes/ # Agency dispute management
│ │ │ ├── page.tsx
│ │ │ └── [id]/review/
│ │ │ └── page.tsx
│ │ ├── analytics/ # Agency analytics dashboard
│ │ │ └── page.tsx
│ │ └── settings/
│ │ ├── page.tsx
│ │ ├── billing/
│ │ │ └── page.tsx
│ │ ├── notifications/
│ │ │ └── page.tsx
│ │ └── team/ # Future: agent management
│ │ └── page.tsx
│ │
│ ├── admin/ # Admin routes (dispute escalation)
│ │ ├── dashboard/
│ │ │ └── page.tsx
│ │ └── disputes/
│ │ ├── page.tsx
│ │ └── [id]/resolve/
│ │ └── page.tsx
│ │
│ ├── share/ # Public sharing pages
│ │ └── [linkId]/
│ │ └── page.tsx # Public dossier/report view
│ │
│ └── api/ # API routes
│ ├── auth/
│ │ └── clerk/
│ │ └── route.ts
│ ├── dossierfacile/
│ │ ├── connect/
│ │ │ └── route.ts
│ │ └── sync/
│ │ └── route.ts
│ ├── tink/
│ │ ├── connect/
│ │ │ └── route.ts
│ │ └── transactions/
│ │ └── route.ts
│ ├── insee/
│ │ └── lookup/
│ │ └── route.ts
│ ├── share/
│ │ ├── create/
│ │ │ └── route.ts
│ │ └── revoke/
│ │ └── route.ts
│ ├── upload/
│ │ └── documents/
│ │ └── route.ts
│ ├── payments/
│ │ ├── report/
│ │ │ └── route.ts
│ │ ├── dispute/
│ │ │ └── route.ts
│ │ └── resolve/
│ │ └── route.ts
│ ├── sync/
│ │ └── tenant-landlord/
│ │ └── route.ts
│ ├── trust-score/
│ │ └── calculate/
│ │ └── route.ts
│ └── webhook/ # Webhook handlers
│ ├── stripe/
│ │ └── route.ts
│ ├── dossierfacile/
│ │ └── route.ts
│ └── tink/
│ └── route.ts
│
├── components/ # SIMPLE, SCALABLE COMPONENT STRUCTURE
│ ├── ui/ # Shadcn base components (Button, Card, Input...)
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── input.tsx
│ │ ├── modal.tsx
│ │ ├── tabs.tsx
│ │ └── ...
│ ├── layout/ # Layout components (Header, Sidebar, Footer)
│ │ ├── header.tsx
│ │ ├── sidebar.tsx
│ │ ├── footer.tsx
│ │ └── navigation.tsx
│ ├── dashboard/ # Dashboard components
│ │ ├── dashboard-layout.tsx # Shared layout, role-aware
│ │ ├── stats-card.tsx # Reusable stats display
│ │ ├── progress-card.tsx # Progress indicators
│ │ └── empty-state.tsx # Empty states
│ ├── property/ # All property-related components
│ │ ├── property-card.tsx # Single component, role variants
│ │ ├── property-form.tsx # Create/edit properties
│ │ └── property-list.tsx # List views
│ ├── application/ # All application-related components
│ │ ├── application-card.tsx # Single component, role variants
│ │ ├── application-form.tsx # Application creation
│ │ ├── application-status.tsx # Status displays
│ │ └── application-review.tsx # Review interface
│ ├── payment/ # All payment-related components
│ │ ├── payment-card.tsx # Payment display
│ │ ├── payment-tracker.tsx # Payment tracking
│ │ └── payment-dispute.tsx # Dispute handling
│ ├── dossier/ # All dossier-related components
│ │ ├── dossier-builder.tsx # Dossier creation
│ │ ├── dossier-viewer.tsx # View dossiers
│ │ ├── document-upload.tsx # Document handling
│ │ └── document-share.tsx # Sharing functionality
│ ├── onboarding/ # All onboarding components
│ │ ├── role-selector.tsx # Choose role
│ │ ├── step-wrapper.tsx # Step container
│ │ └── progress-indicator.tsx # Progress tracking
│ └── shared/ # Cross-feature shared components
│ ├── status-badge.tsx # Status indicators
│ ├── user-avatar.tsx # User displays
│ ├── date-picker.tsx # Date inputs
│ └── file-uploader.tsx # File handling
│
├── lib/ # Utility modules
│ ├── supabase/
│ │ ├── client.ts
│ │ ├── queries/
│ │ │ ├── tenant.ts
│ │ │ ├── landlord.ts
│ │ │ ├── property.ts
│ │ │ └── application.ts
│ │ └── types.ts
│ ├── auth/
│ │ ├── clerk.ts
│ │ └── middleware.ts
│ ├── integrations/ # External API clients
│ │ ├── dossierfacile.ts
│ │ ├── tink.ts
│ │ ├── insee.ts
│ │ ├── stripe.ts # Payment processing
│ │ └── aws-s3.ts
│ ├── hooks/ # Custom React hooks
│ │ ├── use-tenant.ts
│ │ ├── use-properties.ts
│ │ ├── use-applications.ts
│ │ └── use-user.ts # User management hook
│ ├── trust-score/
│ │ ├── calculator.ts
│ │ └── types.ts
│ ├── encryption/
│ │ └── secure-share.ts
│ ├── email/ # Email utilities
│ │ └── resend.ts # Email service
│ ├── validations/ # Zod schemas
│ │ ├── tenant.ts
│ │ ├── landlord.ts
│ │ ├── property.ts
│ │ ├── application.ts
│ │ └── payment.ts
│ └── utils.ts # Generic utilities
│
├── models/ # TypeScript types (non-Prisma)
│ ├── user.ts
│ ├── tenant.ts
│ ├── landlord.ts
│ ├── property.ts
│ ├── application.ts
│ ├── payment.ts
│ └── shared.ts
│
├── messages/ # Internationalization
│ ├── fr.json
│ └── en.json
│
├── public/ # Static assets
│ ├── assets/
│ │ ├── images/
│ │ └── illustrations/
│ ├── icons/
│ │ ├── favicon.ico
│ │ ├── apple-touch-icon.png
│ │ └── android-chrome-192x192.png
│ ├── robots.txt
│ └── sitemap.xml
│
├── styles/ # Styling
│ ├── globals.css # Tailwind base + resets
│ └── theme.css # Design tokens (colors, fonts)
│
├── docs/ # Documentation
│ ├── architecture/
│ │ ├── overview.md
│ │ └── auth-flow.md
│ ├── api-specifications/
│ │ ├── endpoints.md
│ │ └── integrations.md
│ ├── database-schema/
│ │ ├── prisma-schema.md
│ │ └── relationships.md
│ └── deployment-guide/
│ ├── setup.md
│ └── environment.md
│
├── .env.local # Environment variables
├── .env.example # Environment template
├── .gitignore # Git ignore file
├── package.json # NPM package definition
├── package-lock.json # NPM package lock
├── next.config.js # Next.js configuration
├── postcss.config.js # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── .eslintrc.json # ESLint configuration
├── next-sitemap.config.js # Sitemap generation config
└── README.md # Project documentation

```


## Key Decisions Made:

1. **Centralized Onboarding**: `/onboarding/` with role-specific sub-routes for better UX
2. **Detailed Payment/Dispute Flow**: Kept granular routes for payment management
3. **Role-based Components**: Organized by role for better maintainability
4. **Trust Score Integration**: Integrated into profile rather than separate section
5. **Public Share Routes**: Added `/share/[linkId]` for public document viewing
6. **Comprehensive API Structure**: Organized by feature/integration
7. **Analytics for Agencies**: Dedicated analytics section for agencies
8. **Admin Escalation**: Kept admin routes for dispute resolution

## Benefits:

- Clear role separation with logical hierarchy
- Scalable component organization
- Comprehensive API structure
- Future-ready for team management and analytics
- Proper internationalization setup
- Clean separation of concerns

## ️ DATABASE SCHEMA

- **Roles**: TENANT, LANDLORD, AGENCY, ADMIN
- **Tables**: users, tenants, landlords, agencies, properties, dossiers, dossier_facile_integrations, tink_integrations, trust_scores, shared_links, applications, documents, payment_history

---

## AUTH & SECURITY

- Clerk role-based auth
- AES-256 encryption for OAuth tokens
- AWS S3 secured uploads
- Supabase Row-Level Security policies
- GDPR compliance (consent management, data deletion workflows)

---

## INTERNATIONALIZATION

- Locales: `fr` (default), `en`
- Tooling: `next-intl`
- Translation files: `messages/fr.json`, `messages/en.json`
- Component: `LanguageSwitcher`

---

## COMPLETE MVP FEATURE SET

- Tenant, landlord, agency onboarding
- Dashboards with key metrics
- Clerk authentication
- DossierFacile OAuth integration
- Tink Open Banking integration
- Trust Score algorithm (weighted: Payment 50%, Documents 40%, Profile 10%)
- Real-time Trust Score updates and transparency
- Secure sharing with analytics
- Multi-language support
- Secure AWS S3 document storage
- Responsive and clean UI

---

## UPDATED DOCUMENTATION & REFERENCES

| Technology            | Documentation Links                                                                                                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js 15            | [https://nextjs.org/docs](https://nextjs.org/docs)                                                                                                                                                 |
| Clerk Authentication  | [https://clerk.com/docs/quickstarts/nextjs](https://clerk.com/docs/quickstarts/nextjs)                                                                                                             |
| Supabase              | [https://supabase.com/docs/reference/javascript](https://supabase.com/docs/reference/javascript)                                                                                                   |
| Tailwind CSS          | [https://tailwindcss.com/docs](https://tailwindcss.com/docs)                                                                                                                                       |
| Shadcn UI Components  | [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)                                                                                                                                           |
| next-intl (i18n)      | [https://next-intl-docs.vercel.app/docs/getting-started](https://next-intl-docs.vercel.app/docs/getting-started)                                                                                   |
| DossierFacile Connect | [https://partenaire.dossierfacile.logement.gouv.fr/documentation-technique/dossierfacile-connect](https://partenaire.dossierfacile.logement.gouv.fr/documentation-technique/dossierfacile-connect) |
| Tink API              | [https://docs.tink.com](https://docs.tink.com)                                                                                                                                                     |
| INSEE SIRET API       | [https://portail-api.insee.fr/catalog/api/2ba0e549-5587-3ef1-9082-99cd865de66f/doc](https://portail-api.insee.fr/catalog/api/2ba0e549-5587-3ef1-9082-99cd865de66f/doc)                             |

### Environment Variables to Configure (DossierFacile)

- `DOSSIER_FACILE_CLIENT_ID`: Your DossierFacile client ID.
- `DOSSIER_FACILE_CLIENT_SECRET`: Your DossierFacile client secret.
- `DOSSIER_FACILE_REDIRECT_URI`: The URI where DossierFacile will redirect after authentication (e.g., `http://localhost:3000/api/dossierfacile/callback`).

### Clerk & Supabase Integration Note

For Supabase Row Level Security (RLS) to function correctly with Clerk authentication in server-side contexts (e.g., server actions), ensure your Clerk instance is configured to provide session tokens that Supabase can use for RLS. When initializing the Supabase client in server actions, pass the Clerk session token as the `Authorization` header (e.g., `Authorization: Bearer ${await session?.getToken()}`). Refer to the official Supabase documentation for Clerk integration for detailed setup: [https://supabase.com/docs/guides/auth/third-party/clerk](https://supabase.com/docs/guides/auth/third-party/clerk)

---

