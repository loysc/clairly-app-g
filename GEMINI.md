# GEMINI.md - Clairly Project Context (Updated June 2025)

##  PROJECT OVERVIEW

Clairly is a trust-first SaaS platform modernizing the European rental market by establishing tenant credibility through verified rental reputation profiles, easing landlord risk, and empowering tenant mobility.

* **Launch Market**: France
* **Expansion**: EU-wide (planned)
* **Core Users**: Tenants, Landlords, Agencies

---

##  TECH STACK

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

##  DETAILED FOLDER & ROUTE STRUCTURE

```
clairly/
├── app/
│   ├── (auth)/[sign-in, sign-up]
│   ├── onboarding/[tenant, landlord, agency]
│   ├── tenant/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── dossier/
│   │   ├── applications/
│   │   ├── share/
│   │   ├── trust-score/
│   │   └── settings/
│   ├── landlord/
│   │   ├── dashboard/
│   │   ├── properties/
│   │   ├── applications/
│   │   ├── tenants/
│   │   └── settings/
│   ├── agency/
│   │   ├── dashboard/
│   │   ├── setup/
│   │   ├── landlords/
│   │   ├── properties/
│   │   ├── applications/
│   │   ├── analytics/
│   │   └── settings/
│   └── api/
│       ├── auth/
│       ├── dossierfacile/
│       ├── tink/
│       ├── insee/
│       ├── share/
│       ├── upload/
│       └── trust-score/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── tenant/
│   ├── landlord/
│   ├── agency/
│   └── shared/
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── encryption/
│   ├── aws-s3/
│   ├── api-integrations/
│   ├── hooks/
│   └── trust-score/
├── messages/
│   ├── fr.json
│   └── en.json
├── public/
│   ├── assets/
│   ├── icons/
│   └── illustrations/
├── styles/
├── docs/
│   ├── architecture/
│   ├── api-specifications/
│   ├── database-schema/
│   └── deployment-guide/
```

---

## ️ DATABASE SCHEMA

* **Roles**: TENANT, LANDLORD, AGENCY, ADMIN
* **Tables**: users, tenants, landlords, agencies, properties, dossiers, dossier\_facile\_integrations, tink\_integrations, trust\_scores, shared\_links, applications, documents, payment\_history

---

##  AUTH & SECURITY

* Clerk role-based auth
* AES-256 encryption for OAuth tokens
* AWS S3 secured uploads
* Supabase Row-Level Security policies
* GDPR compliance (consent management, data deletion workflows)

---

##  INTERNATIONALIZATION

* Locales: `fr` (default), `en`
* Tooling: `next-intl`
* Translation files: `messages/fr.json`, `messages/en.json`
* Component: `LanguageSwitcher`

---

##  COMPLETE MVP FEATURE SET

* Tenant, landlord, agency onboarding
* Dashboards with key metrics
* Clerk authentication
* DossierFacile OAuth integration
* Tink Open Banking integration
* Trust Score algorithm (weighted: Payment 50%, Documents 40%, Profile 10%)
* Real-time Trust Score updates and transparency
* Secure sharing with analytics
* Multi-language support
* Secure AWS S3 document storage
* Responsive and clean UI

---

##  UPDATED DOCUMENTATION & REFERENCES

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
| INSEE API Key (SIREN) | `fccbca49-672f-435f-8bca-49672f235f25` (store securely)                                                                                                                                            |

---