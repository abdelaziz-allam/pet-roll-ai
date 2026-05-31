# Phase 1: Feedback System + Swedish Localization + Play Store Rating

## Overview

Three features to support the Sweden launch:
1. **Swedish language support** (i18n with English + Swedish)
2. **In-app feedback & suggestions** (users submit, admin manages, reply, close, mark as TODO)
3. **Play Store rating prompt** (in-app review dialog)

---

## Feature 1: Swedish Language Support (i18n)

### Scope
- Add Flutter localization infrastructure (ARB files)
- Support English (default) + Swedish (sv)
- User can switch language from settings
- All user-facing strings extracted to ARB files

### Implementation
- **App:** Add `l10n.yaml`, create `app_en.arb` + `app_sv.arb`
- **App:** Configure MaterialApp with localizationsDelegates
- **App:** Add language picker in settings/profile

---

## Feature 2: Feedback & Suggestions

### User Flow (Mobile App)
1. User taps "Feedback" from profile/settings menu
2. Sees list of their past feedback submissions
3. Can submit new feedback (type: bug/suggestion/general, message, optional screenshot)
4. Can see admin replies on their feedback
5. Status visible: open, replied, closed

### Admin Flow (Admin Portal)
1. Dashboard shows recent feedback (time-framed: today, this week, this month)
2. Admin can view all feedback with filters (status, type, date range)
3. Admin can reply to feedback (user sees it in-app)
4. Admin marks feedback as "closed" after replying
5. Admin can mark feedback as "TODO" (appears in a separate TODO list)
6. TODO list shows actionable feedback items for product improvement

### Backend
- Collection: `feedback`
- Fields: userId, userDisplayName, type (bug/suggestion/general), message, screenshot?, status (open/replied/closed), isTodo, adminReply?, adminRepliedAt?, createdAt, updatedAt
- Endpoints:
  - POST /feedback - user creates feedback
  - GET /feedback - user gets their own feedback
  - GET /admin/feedback - admin lists all (with filters: status, type, date range, isTodo)
  - PUT /admin/feedback/:id/reply - admin replies
  - PUT /admin/feedback/:id/status - admin changes status (close)
  - PUT /admin/feedback/:id/todo - admin marks as TODO / removes TODO

---

## Feature 3: Play Store Rating

### Implementation
- Use `in_app_review` Flutter package
- Trigger after user has used app for 7+ days AND completed 3+ actions
- Show native Play Store review dialog
- Track if user has been prompted (don't repeat within 30 days)

---

## Implementation Order

1. Backend: Feedback endpoints
2. Admin: Feedback page with filters, reply, close, TODO
3. Mobile: i18n setup + Swedish strings
4. Mobile: Feedback feature (submit + view + replies)
5. Mobile: Play Store rating prompt

---

## Data Model

```
feedback {
  id: string (auto)
  userId: string
  userDisplayName: string
  userEmail: string
  type: 'bug' | 'suggestion' | 'general'
  message: string
  screenshotUrl?: string
  status: 'open' | 'replied' | 'closed'
  isTodo: boolean
  adminReply?: string
  adminRepliedBy?: string
  adminRepliedAt?: timestamp
  createdAt: timestamp
  updatedAt: timestamp
}
```
