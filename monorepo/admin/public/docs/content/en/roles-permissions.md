# Roles & Permissions

The Petfolioo Admin Portal uses a role-based access control (RBAC) system to manage what each administrator can see and do. Every admin user is assigned a role, and each role defines a set of page-level access and action-level permissions.

---

## Role Overview

The platform supports four admin roles, each with a progressively broader set of capabilities:

| Role | Description | Typical Use Case |
|------|-------------|-----------------|
| **Super Admin** | Full unrestricted access to all pages and actions | Platform owner, CTO, lead administrator |
| **Admin** | Broad access to operational pages; no access to system settings or admin user management | Platform manager, operations lead |
| **Moderator** | Focused access to content moderation tasks (verification, mating, pets) | Community manager, content reviewer |
| **Viewer** | Read-only access to most pages; cannot create, edit, or delete anything | Support agent, stakeholder, auditor |

---

## Permission Structure

Permissions are defined at two levels:

### 1. Page Access

Each role is granted or denied access to specific pages. If a role does not have access to a page, the page does not appear in their sidebar navigation and direct URL access is blocked.

### 2. Action Permissions

Within a page that a role can access, specific actions may be enabled or disabled. For example, a Moderator can **view** pets but not **delete** them.

---

## Permissions Matrix

The following matrix shows exactly what each role can do on each page.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Page Visibility by Role

This table summarizes which pages appear in the sidebar navigation for each role:

| Page | Super Admin | Admin | Moderator | Viewer |
|------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## How Permissions Affect the UI

When a user lacks permission for a specific action, the admin portal adapts the interface accordingly:

| Scenario | UI Behavior |
|----------|-------------|
| No page access | Page removed from sidebar; URL returns 403 |
| View-only (no edit/delete) | Action buttons hidden; table rows not clickable for editing |
| No create permission | "Create" / "Add" button hidden |
| No delete permission | Delete option removed from action menus |
| No export permission | Export button hidden |
| No approve/reject | Verification action buttons hidden; status shown as read-only |

> **Note:** The UI hides unavailable actions rather than showing disabled buttons. This keeps the interface clean and avoids confusion about what is and isn't allowed.

---

## Managing Permissions

Only **Super Admin** users can create, edit, or delete admin accounts and modify their permissions.

### Assigning a Role

1. Navigate to **Admin Users** in the sidebar.
2. Click **Create Admin User** or edit an existing user.
3. Select the desired role from the Role dropdown.
4. If selecting **Super Admin**, all permissions are automatically granted and cannot be customized.
5. For other roles, customize page access and actions using the permissions editor.

### Custom Permissions

While each role has typical permissions, the system supports per-user customization:

- An **Admin** can be granted Settings access if needed.
- A **Moderator** can be given Analytics view access.
- A **Viewer** can be restricted to fewer pages than the default.

Custom permissions override the role defaults. The role label remains the same but the actual access is what matters.

### Permission Editor

The permissions editor displays a checklist interface:

1. Each page appears as a section with a toggle for page access.
2. When page access is enabled, the available actions for that page appear as checkboxes.
3. Check or uncheck individual actions to fine-tune the user's capabilities.
4. Click **Save** to apply changes immediately.

> **Important:** Changes to permissions take effect on the user's next page load. If the user is currently logged in, they will see the updated permissions after refreshing their browser.

---

## Role Comparison Quick Reference

### Super Admin
- Can do everything
- Only role that can manage admin users and system settings
- Only role that can delete app users and notifications
- Only role that can export user data
- Cannot be deleted if it's the last super admin account

### Admin
- Full operational access to content and user management
- Can approve/reject verifications
- Can manage mating marketplace
- Can send notifications
- Cannot access Settings or Admin Users pages
- Cannot delete app users (only ban)

### Moderator
- Focused on content quality and community safety
- Can approve/reject breeder verifications
- Can moderate mating listings
- Can edit pets (fix incorrect information)
- Can ban problematic users
- Cannot access Analytics, Settings, or Admin Users
- Cannot create or delete content

### Viewer
- Read-only access for oversight purposes
- Can view dashboards, users, pets, analytics
- Cannot modify any data
- Cannot send notifications or approve verifications
- Useful for stakeholders who need visibility without risk

---

## Security Considerations

| Practice | Description |
|----------|-------------|
| Least privilege | Assign the minimum role needed for the user's responsibilities |
| Regular audit | Review admin user list quarterly; disable unused accounts |
| Separate accounts | Each administrator should have their own account (no shared logins) |
| Super Admin limit | Keep the number of Super Admins to 2-3 maximum |
| Suspend don't delete | When an admin leaves, suspend their account rather than deleting (preserves audit trail) |

---

## Frequently Asked Questions

**Q: Can I create a custom role?**
A: The system has four fixed roles (Super Admin, Admin, Moderator, Viewer). However, you can customize the permissions of any individual user regardless of their role label.

**Q: What happens if I remove page access for a user who is currently viewing that page?**
A: The user will see a 403 error on their next navigation or page refresh. Their session is not interrupted.

**Q: Can a Super Admin demote themselves?**
A: A Super Admin can change their own role, but the system prevents removing the last Super Admin account entirely.

**Q: Do permissions affect the User Manual?**
A: No. All admin users can access the User Manual regardless of their role or permissions. Documentation is always available.

**Q: Can I see an audit log of permission changes?**
A: Permission changes are recorded with a timestamp and the ID of the admin who made the change. These are stored in the `updatedBy` and `updatedAt` fields on each admin user record.
