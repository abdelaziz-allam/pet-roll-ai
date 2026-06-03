# Due Diligence Preparation

## What Investors Will Request

When an investor says "yes" to a meeting or moves to due diligence, they'll ask for these documents. Prepare them BEFORE you start pitching.

---

## Data Room Checklist

### Priority 1: Must Have Before First Pitch

| Document | Status | Action Needed |
|----------|--------|---------------|
| Pitch deck (PDF, 15 slides) | TODO | Create in Figma/Pitch.com |
| 1-page executive summary | TODO | Condense pitch into 1 page |
| Product demo video (2 min) | TODO | Screen record app flow |
| Financial model (spreadsheet) | TODO | Build in Google Sheets |
| Cap table (current) | TODO | Create (solo founder = 100%) |
| Company registration docs | TODO | See Legal Structure doc |

### Priority 2: Must Have Before Due Diligence

| Document | Status | Action Needed |
|----------|--------|---------------|
| Technical architecture diagram | TODO | Document current stack |
| Team bios / LinkedIn profiles | TODO | Update LinkedIn |
| Market research summary | DONE | See 03-MARKET-RESEARCH.md |
| Competitive analysis matrix | DONE | In pitch deck |
| User research / validation data | TODO | Run Swedish user interviews |
| Key metrics dashboard | TODO | Set up analytics |
| IP disclosure (trademarks, code ownership) | TODO | Confirm sole ownership |
| Terms of Service / Privacy Policy | DONE | On landing page |

### Priority 3: Nice to Have (Strengthens Position)

| Document | Status | Action Needed |
|----------|--------|---------------|
| Letters of intent from Swedish breeders | TODO | Get 3-5 signed LOIs |
| Vet clinic partnership interest | TODO | Approach 2-3 Swedish clinics |
| NPS survey results | TODO | Survey closed testing users |
| Regulatory compliance summary | TODO | Document EU Animal Health Law fit |
| Advisory board confirmations | TODO | Recruit 2-3 advisors |
| Customer testimonials | TODO | From beta testers |

---

## Technical Due Diligence Preparation

Investors (especially technical ones) will ask about your stack. Be ready.

### Architecture Summary

```
Platform: Petfolioo
Frontend: Flutter (iOS + Android + Web)
Backend: Node.js / Fastify on Google Cloud Run
Database: PostgreSQL (Cloud SQL)
Auth: Firebase Authentication (Google, Apple, Email)
Storage: Google Cloud Storage (pet photos, documents)
Admin: React SPA
Hosting: Google Cloud Platform (petroll-production)
CI/CD: GitHub Actions + Cloud Build
Domains: petfolioo.com, api.petfolioo.com, admin.petfolioo.com
```

### Key Technical Strengths to Highlight

1. **Full product already built** - Not a mockup, fully functional app
2. **Scalable architecture** - Cloud Run auto-scales, serverless-first
3. **Security** - Firebase Auth, role-based access, admin moderation
4. **Mobile-first** - Flutter enables iOS + Android from single codebase
5. **Cost-efficient** - GCP free tier covers initial users, scales linearly

### Technical Risks to Address Proactively

| Risk | Mitigation |
|------|-----------|
| Solo technical founder | Hiring plan included in funding ask |
| No automated tests | Add CI/CD test suite in Phase 1 |
| Single cloud provider | GCP is reliable, migration path exists |
| Flutter maturity | Proven at scale (Google Pay, BMW, Alibaba) |

---

## Financial Due Diligence

### What to Prepare

1. **Bank statements** - Company account (once incorporated)
2. **Burn rate history** - Monthly spend since inception
3. **Revenue** - Even EUR 0 is fine at pre-seed, just be transparent
4. **Cap table** - Current ownership structure
5. **Previous funding** - Self-funded/bootstrapped amount
6. **Outstanding debts** - Should be none
7. **Financial projections** - 3-year model (see 02-FINANCIAL-MODEL.md)

### Key Financial Metrics Investors Want

| Metric | What They Check | Your Answer |
|--------|----------------|-------------|
| Monthly burn | How fast you spend | EUR 2-5K currently (pre-funding) |
| Runway | How long current money lasts | Self-funded, seeking funding |
| Revenue | Any validation of willingness to pay | Pre-revenue (pre-seed stage) |
| Previous investment | Who else believes in you | Self-funded bootstrap |
| Use of funds breakdown | Where money goes | 40% eng, 25% GTM, 20% team, 15% ops |

---

## Legal Due Diligence

### Documents to Prepare

| Document | Purpose | Action |
|----------|---------|--------|
| Company incorporation | Proves legal entity exists | Incorporate in Sweden (AB) |
| Shareholder agreement | Shows ownership structure | Draft with lawyer |
| IP assignment | Proves company owns the code | Sign IP assignment to company |
| Employee/contractor agreements | Shows clean labor structure | Template from Swedish lawyer |
| Privacy policy (GDPR) | Compliance with EU law | Already exists |
| Terms of service | User agreement | Already exists |
| Trademark registration | Brand protection | File "Petfolioo" in EU |

### IP Ownership Checklist

| Asset | Owner | Documented? |
|-------|-------|-------------|
| Source code (app) | Founder -> Company | Need IP assignment |
| Source code (backend) | Founder -> Company | Need IP assignment |
| Source code (admin) | Founder -> Company | Need IP assignment |
| Domain: petfolioo.com | Company | Transfer to company entity |
| Firebase project | Company | Transfer to company account |
| GCP infrastructure | Company | Already on company account |
| App Store listings | Company | Under company account |
| Logo/brand assets | Company | Need IP assignment |

---

## Metrics Dashboard to Build

Set up before pitching (shows professionalism):

### User Metrics

| Metric | Tool | Target Before Pitch |
|--------|------|-------------------|
| Total registered users | Firebase Analytics | 50-100 real users |
| Daily active users (DAU) | Firebase Analytics | Track trend |
| Weekly retention | Firebase Analytics | >40% week 1 |
| Session duration | Firebase Analytics | >3 minutes |
| Feature usage breakdown | Custom events | Top 3 features |

### Engagement Metrics

| Metric | Target |
|--------|--------|
| Pets created per user | >1.5 |
| Health records logged | >3 per active user |
| Breeding listings viewed | Track volume |
| Messages sent | Track any chat usage |
| App store rating | >4.0 stars |

---

## Red Flags to Fix Before Fundraising

| Issue | Risk Level | Fix |
|-------|-----------|-----|
| No company entity | HIGH | Incorporate immediately |
| No IP assignment | HIGH | Sign before first meeting |
| No user data/metrics | MEDIUM | Get 50+ real users |
| No advisory board | LOW | Recruit 1-2 advisors |
| No trademark | LOW | File EU trademark |
| Solo founder | MEDIUM | Show hiring plan + advisor commitment |
| No revenue | ACCEPTABLE | Normal for pre-seed |

---

## Data Room Tool Recommendation

Use one of these for sharing due diligence documents:

| Tool | Cost | Features |
|------|------|----------|
| **Notion** (recommended) | Free | Easy to organize, shareable links |
| Google Drive | Free | Simple, everyone has access |
| DocSend | $45/month | Track who views what, analytics |
| Dealroom.co | Varies | Purpose-built for fundraising |

### Data Room Structure

```
/ Petfolioo Data Room
  /1-Company
    - Executive Summary (1-pager)
    - Pitch Deck
    - Company Registration
    - Cap Table
  /2-Product
    - Product Demo Video
    - Technical Architecture
    - Roadmap
    - App Store Links
  /3-Market
    - Market Research
    - Competitive Analysis
    - Customer Validation
  /4-Financials
    - Financial Model (3-year)
    - Use of Funds
    - Unit Economics
  /5-Legal
    - IP Assignment
    - Privacy Policy
    - Terms of Service
    - Trademark
  /6-Team
    - Founder Bio
    - Hiring Plan
    - Advisory Board
```
