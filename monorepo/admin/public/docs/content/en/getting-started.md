# Getting Started

Welcome to the Petfolioo Admin Portal. This guide walks you through your first login, explains the interface layout, and helps you understand how role-based access controls determine what you can see and do within the platform.

The admin portal is a web-based management console for the Petfolioo pet health and breeding platform. From here, administrators can manage users, pets, categories, health records, breeding programs, and platform settings.

![Login Page](/docs/screenshots/login.png)

---

## Logging In

The admin portal uses email and password authentication. Only accounts with an assigned admin role can access the portal.

### Steps to Log In

1. Open your browser and navigate to the admin portal URL.
2. You will be presented with the **Login** page at the `/login` route.
3. Enter your **Email Address** in the first field.
4. Enter your **Password** in the second field.
5. Click the **Sign In** button.
6. If your credentials are valid and your account has admin access, you will be redirected to the **Dashboard**.

> **Note:** If you see an "Unauthorized" error after entering valid credentials, your account may not have an admin role assigned. Contact a super administrator to have your role updated.

### Resetting Your Password

If you have forgotten your password:

1. On the Login page, click the **Forgot Password?** link below the password field.
2. Enter the email address associated with your admin account.
3. Click **Send Reset Link**.
4. Check your email inbox for a password reset message from Petfolioo.
5. Click the link in the email to open the password reset form.
6. Enter and confirm your new password.
7. Return to the login page and sign in with your new credentials.

> **Tip:** Password reset links expire after 1 hour. If your link has expired, request a new one from the login page.

---

## Understanding the Dashboard Layout

Once logged in, the admin portal presents a consistent layout across all pages.

### Sidebar Navigation

The left sidebar contains the primary navigation menu. It includes links to all major modules:

| Menu Item | Description |
|-----------|-------------|
| Dashboard | Platform overview with KPIs and analytics |
| Users | Manage app users, roles, and accounts |
| Pets | Browse and manage the pet registry |
| Categories | Define and manage pet categories |
| Health Records | Review pet health certifications |
| Breeding | Manage breeding programs and lineage |
| Vaccinations | Track vaccination records |
| Pregnancy | Monitor pregnancy tracking entries |
| Verifications | Review pending verification requests |
| Settings | Platform configuration |

The sidebar can be collapsed by clicking the toggle icon at the top to give more screen space to content areas.

### Header Bar

The top header bar contains:

| Element | Location | Purpose |
|---------|----------|---------|
| Search | Center | Global search across users, pets, and records |
| Notifications Bell | Right | Alerts for pending actions and system events |
| Profile Avatar | Far Right | Account menu with profile settings and logout |

### Content Area

The main content area occupies the remaining space to the right of the sidebar and below the header. This is where tables, forms, detail drawers, and analytics are displayed.

---

## Role-Based Access

The admin portal enforces role-based access control (RBAC). Each admin account is assigned one of the following roles, which determines what actions are available.

### Role Definitions

| Role | Access Level | Description |
|------|-------------|-------------|
| `super_admin` | Full | Complete access to all modules, settings, and user management. Can assign and revoke admin roles. |
| `admin` | High | Access to all operational modules. Can manage users, pets, and records. Cannot modify platform settings or assign super_admin roles. |
| `moderator` | Medium | Can review and moderate content, approve verifications, and manage pet listings. Cannot create or delete admin accounts. |
| `viewer` | Read-Only | Can view all data across modules but cannot create, edit, or delete any records. Useful for auditing and reporting. |

### Permission Matrix

| Action | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View dashboard | Yes | Yes | Yes | Yes |
| Manage users | Yes | Yes | No | No |
| Create admin accounts | Yes | No | No | No |
| Ban/Unban users | Yes | Yes | Yes | No |
| Manage pets | Yes | Yes | Yes | No |
| Approve verifications | Yes | Yes | Yes | No |
| Manage categories | Yes | Yes | No | No |
| Edit platform settings | Yes | No | No | No |
| View reports | Yes | Yes | Yes | Yes |

> **Note:** If a navigation item is not visible in your sidebar, your role does not have access to that module.

---

## Navigation Overview

Below is a complete list of modules available in the admin portal, organized by functional area.

### Core Modules

1. **Dashboard** - Platform health overview, KPIs, and analytics charts.
2. **Users** - App user management including profiles, roles, and account status.
3. **Pets** - The pet registry with full detail views and moderation tools.
4. **Categories** - Pet species/type categorization system.

### Health and Records

5. **Health Records** - Health certification documents and their verification status.
6. **Vaccinations** - Vaccination schedules and completion records.
7. **Pregnancy** - Pregnancy tracking for breeding animals.

### Platform Operations

8. **Verifications** - Queue of pending user and pet verification requests.
9. **Breeding** - Breeding program management and lineage tracking.
10. **Settings** - Platform-wide configuration and feature flags.

---

## First-Time Setup Tips

When you first access the admin portal, follow these recommendations to get oriented.

### Recommended First Steps

1. **Review your profile** - Click your avatar in the top-right corner and select "Profile" to verify your account details are correct.
2. **Explore the dashboard** - Familiarize yourself with the KPI cards and analytics to understand current platform metrics.
3. **Check pending verifications** - Navigate to the Verifications module to see if there are items awaiting review.
4. **Browse active users** - Visit the Users module and sort by "Join Date" descending to see the most recent registrations.
5. **Review categories** - Ensure the pet categories are configured correctly for your region.

### Browser Recommendations

The admin portal works best on modern browsers:

| Browser | Minimum Version |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Tip:** Enable browser notifications when prompted to receive real-time alerts for pending verifications and important system events.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus the global search bar |
| `Esc` | Close open drawers and modals |

---

## Troubleshooting Login Issues

| Problem | Solution |
|---------|----------|
| "Invalid credentials" error | Double-check your email and password. Use the Forgot Password flow if needed. |
| "Account disabled" message | Your account has been deactivated. Contact a super administrator. |
| Page loads but login form is blank | Clear your browser cache and cookies, then reload. |
| Redirected back to login after signing in | Your session may have expired. Try signing in again. If persistent, check that cookies are enabled. |

---

## Getting Help

If you encounter issues not covered in this guide:

1. Check the other sections of this user manual for module-specific help.
2. Contact your organization's super administrator for role and access issues.
3. For technical problems, reach out to the platform support team.

---

*Next: [Dashboard](./dashboard.md) - Learn about the analytics and KPI overview.*
