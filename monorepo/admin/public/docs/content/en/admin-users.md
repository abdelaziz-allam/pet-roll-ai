# Admin Users

The Admin Users page allows you to manage the administrator accounts that have access to the Petfolioo admin portal. Here you can create new admins, assign roles, configure granular permissions, and control account status.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Overview

Access control is critical for maintaining security and operational integrity. The Admin Users system supports role-based access with additional per-page permission granularity, ensuring each team member has exactly the access they need.

---

## Admin Users Table

The main view displays a table of all administrator accounts in the system.

### Table Columns

| Column | Description |
|--------|-------------|
| **Name** | The admin's display name shown throughout the portal |
| **Email** | The login email address for the admin account |
| **Role** | The assigned role determining base permission level |
| **Status** | Current account status: Active or Suspended |
| **Actions** | Edit and Delete action buttons |

### Table Features

1. The table is sortable by clicking on column headers.
2. A search box above the table allows filtering by name or email.
3. Pagination controls appear at the bottom for large admin teams.
4. Active accounts show a green status badge; suspended accounts show a red badge.

---

## Roles

Each admin account is assigned one of four roles. Roles define the baseline level of access before any granular permission overrides are applied.

### Role Definitions

| Role | Access Level | Description |
|------|-------------|-------------|
| **super_admin** | Full unrestricted | Complete access to all pages, features, and system settings. Cannot be deleted or have permissions restricted. |
| **admin** | All content and users | Full access to content management, user management, feedback, notifications, and analytics. Cannot access system-level settings. |
| **moderator** | Review and moderate | Can review and moderate content such as feedback, reported profiles, and flagged entries. Cannot create or delete resources. |
| **viewer** | Read-only | Can view all pages they have access to but cannot create, edit, or delete any records. Ideal for stakeholders who need visibility. |

### Role Hierarchy

The role hierarchy determines which roles can manage other roles:

1. **super_admin** can manage all other roles (admin, moderator, viewer).
2. **admin** can manage moderator and viewer accounts.
3. **moderator** cannot manage any admin accounts.
4. **viewer** cannot manage any admin accounts.

> **Important:** You cannot assign a role higher than your own. Only a super_admin can create another super_admin.

---

## Creating an Admin

To add a new administrator account to the portal:

### Steps

1. Click the **Add Admin** button in the top-right corner of the Admin Users page.
2. A creation form dialog appears with the following fields:

| Field | Description | Requirements |
|-------|-------------|--------------|
| **Email** | The login email for the new admin | Required. Must be a valid, unique email address. |
| **Display Name** | The name shown in the portal UI | Required. 2-50 characters. |
| **Password** | The initial login password | Required. Minimum 8 characters, must include uppercase, lowercase, and a number. |
| **Role** | The access role for this admin | Required. Select from the dropdown. |

3. Fill in the **Email** field with the new admin's email address.
4. Enter a **Display Name** that will identify this admin in the portal.
5. Set an initial **Password** that meets the complexity requirements.
6. Select the appropriate **Role** from the dropdown.
7. Click **Create** to add the admin account.
8. A success message confirms the account was created.
9. The new admin appears in the table and can now log in.

> **Tip:** After creating an account, inform the new admin of their credentials through a secure channel. Recommend they change their password upon first login.

---

## Editing an Admin

You can modify an existing admin's display name, role, and status.

### Steps

1. Locate the admin in the Admin Users table.
2. Click the **Edit** button (pencil icon) in the Actions column.
3. An edit form dialog appears with the current values pre-filled.

### Editable Fields

| Field | Description | Notes |
|-------|-------------|-------|
| **Display Name** | Update the admin's visible name | 2-50 characters |
| **Role** | Change the admin's access level | Cannot assign a role higher than your own |
| **Status** | Set to Active or Suspended | Suspended admins cannot log in |

4. Modify the fields as needed.
5. Click **Save Changes** to apply the updates.
6. A success message confirms the changes were saved.

### Changing Status

- **Active** -- The admin can log in and use the portal normally.
- **Suspended** -- The admin cannot log in. Existing sessions are terminated immediately.

> **Note:** Suspending an admin is reversible. Use it when you need to temporarily revoke access without deleting the account.

### Restrictions

- You cannot edit your own role (to prevent accidental self-demotion).
- You cannot change a super_admin's role unless you are also a super_admin.
- Email cannot be changed after account creation.

---

## Granular Per-Page Permission Configuration

Beyond roles, the admin portal supports fine-grained permission control on a per-page basis. This allows you to customize exactly which pages and actions each admin can access.

### Accessing Permission Configuration

1. Click the **Edit** button on the admin you want to configure.
2. In the edit dialog, navigate to the **Permissions** section (or tab).
3. A permission matrix is displayed showing all portal pages.

### Permission Matrix Structure

The permission matrix displays each portal page as a row with the following controls:

| Control | Description |
|---------|-------------|
| **Access Toggle** | A switch that enables or disables access to the entire page |
| **Action Multi-Select** | A dropdown allowing you to select which specific actions are permitted on that page |

### Available Pages in the Matrix

| Page | Possible Actions |
|------|-----------------|
| Dashboard | View |
| Users | View, Create, Edit, Delete, Suspend |
| Pets | View, Create, Edit, Delete |
| Health Records | View, Create, Edit, Delete |
| Vaccinations | View, Create, Edit, Delete |
| Breeding | View, Create, Edit, Delete |
| Feedback | View, Reply, Close, Pin |
| Notifications | View, Send |
| Analytics | View, Export |
| Settings | View, Edit |
| Admin Users | View, Create, Edit, Delete |

### Configuring Permissions

1. For each page row, toggle the **Access** switch:
   - **ON** -- The admin can access this page (specific actions controlled below).
   - **OFF** -- The admin cannot see or navigate to this page at all.
2. For pages with access enabled, click the **Actions** multi-select dropdown.
3. Select the specific actions this admin is allowed to perform:
   - Check each action you want to grant.
   - Uncheck actions you want to restrict.
4. Repeat for each page as needed.
5. Click **Save Changes** to apply the permission configuration.

### How Permissions Interact with Roles

- Role permissions serve as the **baseline**.
- Per-page permissions can **restrict** access below the role baseline.
- Per-page permissions **cannot grant** access beyond what the role allows.
- For example: An admin-role user has access to all content pages by default. You can restrict their access to the Breeding page by toggling it off, but you cannot grant them Settings access (reserved for super_admin).

> **Tip:** Use granular permissions when you have team members who need a specific subset of admin capabilities. For example, a customer support agent might be an "admin" role but restricted to only Feedback and Users pages.

---

## Deleting an Admin

Removing an admin account permanently deletes it from the system.

### Steps

1. Locate the admin in the Admin Users table.
2. Click the **Delete** button (trash icon) in the Actions column.
3. A confirmation dialog appears with the admin's name and email.
4. Type the admin's email address to confirm deletion (safety measure).
5. Click **Confirm Delete** to permanently remove the account.
6. A success message confirms the deletion.
7. The admin is removed from the table and can no longer log in.

### Deletion Restrictions

| Restriction | Reason |
|-------------|--------|
| Cannot delete a super_admin | Prevents accidental lockout of the system |
| Cannot delete your own account | Prevents self-removal |
| Cannot delete if you lack sufficient role | Role hierarchy rules apply |

> **Warning:** Deletion is permanent and cannot be undone. If you need to temporarily remove access, use the Suspend status instead.

---

## Permission Matrix Explanation

The permission system in Petfolioo uses a layered approach:

### Layer 1: Role-Based Access Control (RBAC)

Each role has a predefined set of permissions that serve as the starting point:

```
super_admin  -->  All pages, all actions, no restrictions
admin        -->  All content/user pages, all actions (except Settings)
moderator    -->  Content review pages, limited actions (view, reply, close)
viewer       -->  All accessible pages, view-only
```

### Layer 2: Per-Page Overrides

Granular permissions add a second layer on top of RBAC:

```
Role permissions  (baseline)
    |
    v
Per-page toggles  (can restrict, cannot expand beyond role)
    |
    v
Final effective permissions  (what the admin actually sees)
```

### Example Scenarios

**Scenario 1: Customer Support Agent**
- Role: admin
- Override: Disable access to Pets, Health Records, Breeding, Analytics, Admin Users
- Result: Can only access Dashboard, Users, Feedback, and Notifications

**Scenario 2: Content Reviewer**
- Role: moderator
- Override: Enable Feedback (View, Reply, Close), Users (View only)
- Result: Can review feedback and look up user profiles but cannot modify users

**Scenario 3: Analytics Observer**
- Role: viewer
- Override: Enable only Dashboard and Analytics
- Result: Can view charts and metrics but nothing else

### Viewing Effective Permissions

1. Open the edit dialog for any admin.
2. The Permissions section shows the current effective state.
3. Toggles and action selections reflect what is currently granted.
4. Disabled (grayed out) actions indicate those beyond the role's allowance.

---

## Security Best Practices

1. **Principle of least privilege** -- Assign the minimum role and permissions needed for each admin's job function.
2. **Regular audits** -- Review admin accounts quarterly. Remove accounts that are no longer needed.
3. **Suspend before delete** -- When offboarding, suspend first to ensure no disruption, then delete after a grace period.
4. **Limit super_admins** -- Keep the number of super_admin accounts to a minimum (ideally 1-2).
5. **Strong passwords** -- Enforce complex passwords and recommend password managers.
6. **Monitor activity** -- Check who is logging in and when through the system logs.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot create admin | Verify you have sufficient role privileges. Check that the email is not already in use. |
| Cannot see Edit/Delete buttons | Your role does not have permission to manage admins at or above the target's role level. |
| Admin cannot log in after creation | Verify the account status is Active. Confirm the password was entered correctly. |
| Permission changes not taking effect | The admin may need to log out and log back in for permission changes to apply. |
| Cannot delete a super_admin | This is by design. Super_admin accounts cannot be deleted through the UI. |

---

## Related Pages

- [Settings](./settings.md) -- Configure system security settings
- [Feedback](./feedback.md) -- Manage user feedback (requires Feedback page access)
- [Analytics](./analytics.md) -- View platform metrics (requires Analytics page access)
