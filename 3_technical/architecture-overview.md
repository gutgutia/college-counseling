# Sesame3 Technical Architecture — Overview

## Summary

Sesame3 is a conversation-first college counseling platform. This document captures the high-level technical decisions for the MVP and future scaling.

---

## Core Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 15+ (App Router) | Already in use, great for streaming, SSR/SSG |
| **Styling** | TailwindCSS 4 | Already in use, rapid development |
| **Language** | TypeScript | Type safety, better DX |
| **Database** | PostgreSQL | Relational data, JSONB flexibility, strong tooling |
| **ORM** | Prisma or Drizzle | Type-safe queries, migrations |
| **Auth** | Supabase Auth or NextAuth | OAuth + email, session management |
| **AI** | OpenAI / Anthropic APIs | GPT-4o or Claude 3.5 with function calling |
| **Hosting** | Vercel | Seamless Next.js deployment, edge functions |
| **Database Hosting** | Supabase / Neon / Vercel Postgres | Serverless PostgreSQL |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    Next.js Application                       │    │
│  │   • React UI (Chat, Dashboard, Profile, Schools, Plan)      │    │
│  │   • PWA-enabled for mobile                                   │    │
│  │   • Capacitor wrapper for App Store (future)                │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        EDGE LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                  Vercel Edge Functions                       │    │
│  │   • Tier 1 parsing (regex) — instant response               │    │
│  │   • Request routing                                          │    │
│  │   • Auth token validation                                    │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API LAYER                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │               Next.js API Routes / Server Actions            │    │
│  │   • Profile CRUD                                             │    │
│  │   • School list management                                   │    │
│  │   • Goals and tasks                                          │    │
│  │   • AI chat orchestration (streaming)                        │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
┌───────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│    PostgreSQL     │ │   OpenAI /      │ │  File Storage   │
│                   │ │   Anthropic     │ │  (S3 / R2)      │
│ • User data       │ │                 │ │                 │
│ • Profiles        │ │ • Chat (GPT-4o) │ │ • Transcripts   │
│ • Conversations   │ │ • Summarization │ │ • Documents     │
│ • Schools         │ │ • Parsing       │ │                 │
└───────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## Key Architectural Decisions

### 1. Conversation Latency Strategy

Most user inputs don't need full LLM processing. Use a tiered approach:

| Tier | Latency | Use Case |
|------|---------|----------|
| **Tier 1: Regex** | <20ms | Simple patterns ("GPA 3.9", "SAT 1520") |
| **Tier 2: Keywords** | <50ms | Activity/award detection via keywords |
| **Tier 3: LLM** | 1-3s | Complex narratives, ambiguous input |

**Result**: 80%+ of inputs feel instant.

### 2. Streaming Responses

When LLM is needed, stream the response:
- Show typing indicator immediately
- Stream text as it arrives
- Render widget at the end

**Technology**: Vercel AI SDK with Server-Sent Events (SSE)

### 3. AI Memory Architecture

```
Sent to LLM each call (~1,700 tokens):
├── System prompt (~300 tokens)
├── Profile facts (~200 tokens)
├── Rolling summary (~400 tokens)
└── Recent 5-10 messages (~800 tokens)

NOT sent (stored for reference):
└── Full conversation history (all messages ever)
```

**Summarization**: Run periodically with GPT-4o-mini (cheap model).

### 4. Mobile Strategy

| Phase | Approach |
|-------|----------|
| **Phase 1** | PWA (Next.js, works on all devices) |
| **Phase 2** | Capacitor wrapper → App Store presence |
| **Phase 3** | Native features via Capacitor plugins |

No React Native needed. Same codebase for web and mobile.

### 5. Access Control Model

```
StudentProfile (owned by User)
        │
        ▼
AccessGrant (explicit permissions)
        │
        └── "User X can access Profile Y with permission Z"
```

Simple, auditable, revocable. Organizations layer on top for counselors.

---

## Data Flow: Chat Message

```
User types message
        │
        ▼
┌───────────────────────────────────┐
│ 1. Edge: Tier 1 regex check       │ ──▶ If match → instant response
└───────────────────────────────────┘
        │ No match
        ▼
┌───────────────────────────────────┐
│ 2. API: Load context              │
│    • Profile facts                │
│    • Rolling summary              │
│    • Recent messages              │
└───────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────┐
│ 3. LLM: Call with streaming       │
│    • Function calling for widgets │
│    • Stream text response         │
└───────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────┐
│ 4. Store: Save message            │
│    • Check if summarization due   │
│    • Extract facts to profile     │
└───────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────┐
│ 5. Client: Render response        │
│    • Text streams in              │
│    • Widget appears at end        │
└───────────────────────────────────┘
```

---

## Hosting & Infrastructure

### MVP (Simple)

| Service | Provider |
|---------|----------|
| **App Hosting** | Vercel (free tier to start) |
| **Database** | Supabase (free tier: 500MB) |
| **Auth** | Supabase Auth (included) |
| **AI** | OpenAI API (pay-per-use) |
| **Domain** | Cloudflare (DNS + CDN) |

**Estimated cost**: ~$0-50/month for early users

### Scaling

| Service | Provider |
|---------|----------|
| **App Hosting** | Vercel Pro |
| **Database** | Supabase Pro or Neon |
| **File Storage** | Cloudflare R2 or S3 |
| **Background Jobs** | Inngest or Trigger.dev |
| **Monitoring** | Vercel Analytics + Sentry |

---

## Security Considerations

| Concern | Approach |
|---------|----------|
| **Auth** | OAuth (Google/Apple) + email/password via Supabase Auth |
| **Data at rest** | PostgreSQL encryption (Supabase default) |
| **Data in transit** | HTTPS everywhere (Vercel default) |
| **API keys** | Environment variables, never client-side |
| **Row-level security** | Supabase RLS policies for data access |
| **FERPA compliance** | Student data is protected; ensure proper consent flows |

---

## Implementation Phases

### Phase 1: MVP (Weeks 1-4)
- [ ] Set up database schema (Prisma + PostgreSQL)
- [ ] Implement auth (Supabase Auth)
- [ ] Build core API routes (profile CRUD)
- [ ] Connect AI chat with streaming
- [ ] Deploy to Vercel

### Phase 2: Polish (Weeks 5-6)
- [ ] Onboarding flow (database-backed)
- [ ] Full profile pages (all pillars)
- [ ] Schools page with real data
- [ ] Plan page with goals/tasks

### Phase 3: AI Enhancement (Weeks 7-8)
- [ ] Conversation summarization
- [ ] Context management
- [ ] Function calling for all widget types
- [ ] Tier 1 parsing at edge

### Phase 4: Mobile & Sharing (Weeks 9-10)
- [ ] PWA optimization
- [ ] Capacitor wrapper (if app store needed)
- [ ] Parent sharing (AccessGrant)

---

## Open Questions

1. **Auth provider**: Supabase Auth vs NextAuth vs Clerk?
2. **Database**: Supabase (batteries-included) vs Neon (pure DB)?
3. **AI provider**: Start with OpenAI or Anthropic?
4. **Analytics**: Vercel Analytics, PostHog, or Mixpanel?

---

## References

- [Data Model](./data-model.md) — Detailed entity descriptions
- [Information Architecture](../02_app/docs/information-architecture.md) — Product structure
- [Design System](../02_app/docs/product-design-system.md) — UI/UX guidelines

