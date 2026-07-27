# App Users

The App Users module provides complete management of all user accounts on the Petfolioo platform. Administrators can view user profiles, create new accounts, edit details, assign roles, and take moderation actions. This module is accessible to users with `super_admin` or `admin` roles.

---

## User Listing Table

The user listing table displays all registered platform users with key information visible at a glance.

### Table Columns

| Column | Description | Sortable |
|--------|-------------|:--------:|
| Avatar | User's profile picture (circular thumbnail) | No |
| Name | Display name | Yes |
| Email | Registered email address | Yes |
| Role | Assigned platform role (user, moderator, admin) | Yes |
| Status | Account status (Active, Pending, Banned) | Yes |
| Verified Breeder | Badge indicating verified breeder status | Yes |
| Pet Count | Number of pets registered by this user | Yes |
| Join Date | Account creation date | Yes |

### Status Indicators

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| Active | Green | Account is fully functional |
| Pending | Orange | Email verification not completed |
| Banned | Red | Account suspended by an administrator |

### Verified Breeder Badge

| Indicator | Meaning |
|-----------|---------|
| Blue checkmark badge | User has completed breeder verification and is confirmed |
| No badge | User has not applied for or received breeder verification |
| Clock icon | Breeder verification application is pending review |

### Table Navigation

1. **Sort** by clicking any sortable column header. Click again to reverse order.
2. **Search** using the search bar above the table to find users by name or email.
3. **Filter** using the status and role dropdowns to narrow results.
4. **Paginate** using controls at the bottom (10, 20, 50 entries per page).

> **Tip:** Combine the search bar with status filters to quickly find specific users. For example, search "john" with status "Banned" to find banned users named John.

---

## Viewing User Details

The user detail drawer provides a comprehensive view of a user's profile and activity.

### Opening the Detail Drawer

1. Click on any row in the user listing table.
2. The detail drawer slides in from the right side of the screen.
3. The drawer contains multiple sections organized vertically.

### Detail Drawer Sections

| Section | Content |
|---------|---------|
| Profile Header | Large avatar, display name, email, role badge, status badge |
| Account Information | Join date, last login, email verification status, auth provider |
| Personal Details | Phone number, timezone, country, city |
| Breeder Status | Verification status, application date, documents submitted |
| Pet Summary | Count of registered pets with quick links to each |
| Activity Log | Recent actions taken by this user on the platform |

### Profile Header

The top of the drawer shows:

- **Avatar** at full size (or default silhouette if none uploaded)
- **Display Name** in large text
- **Email** below the name
- **Role Badge** color-coded by permission level
- **Status Badge** showing current account status

### Account Information Fields

| Field | Description | Example |
|-------|-------------|---------|
| User ID | Unique system identifier | "usr_a1b2c3d4" |
| Join Date | When the account was created | "2023-01-15 09:30 UTC" |
| Last Login | Most recent login timestamp | "2024-07-20 14:22 UTC" |
| Email Verified | Whether the email has been confirmed | "Yes" / "No" |
| Auth Provider | Authentication method used | "Email/Password" or "Google" |
| Firebase UID | Firebase Authentication user ID | "Abc123Def456" |

---

## Creating a New User

Administrators can create user accounts directly from the admin portal. Since the platform uses Firebase Authentication, no password is set during creation - users will receive an email to set their own password.

### Steps to Create a User

1. Click the **Create User** button in the top-right corner of the Users page.
2. A creation modal or form will appear.
3. Fill in the required fields:

| Field | Required | Description |
|-------|:--------:|-------------|
| Display Name | Yes | The user's full name or chosen display name |
| Email | Yes | A valid email address (must be unique on the platform) |

4. Click **Create** to submit the form.
5. The system will:
   - Create a Firebase Authentication record
   - Send a welcome email to the user with a link to set their password
   - Create the user profile in the platform database
   - Assign the default "user" role
6. The new user will appear in the listing table with "Pending" status until they verify their email.

### Validation Rules

| Field | Rule |
|-------|------|
| Display Name | 2-100 characters, cannot be blank |
| Email | Must be valid email format, must not already exist in the system |

> **Note:** No password field is needed. Firebase Authentication handles password setup via the welcome email sent to the user. This ensures the user chooses their own secure password.

> **Tip:** If you need to create a user who should have elevated permissions, first create them with default settings, then change their role separately (see Changing Role below).

---

## Editing a User

Administrators can modify user profile details when needed. This is commonly used for correcting information or updating details on behalf of a user.

### Steps to Edit a User

1. Open the user's detail drawer by clicking their row in the listing table.
2. Click the **Edit** button (pencil icon) in the drawer header.
3. The drawer switches to edit mode with editable form fields.
4. Modify any of the available fields:

| Field | Editable | Notes |
|-------|:--------:|-------|
| Display Name | Yes | The user's public name |
| Phone | Yes | International format recommended (e.g., +971501234567) |
| Timezone | Yes | Dropdown of IANA timezones (e.g., Asia/Dubai) |
| Country | Yes | Dropdown of all countries |
| City | Yes | Text field, updates suggestions based on country |
| Email | No | Cannot be changed (used as login identifier) |
| User ID | No | System-generated, immutable |

5. Click **Save Changes** to apply your edits.
6. A success notification will confirm the update.
7. The drawer returns to view mode showing the updated information.

### Edit History

All edits made through the admin portal are logged:

| Log Field | Description |
|-----------|-------------|
| Timestamp | When the change was made |
| Admin | Which administrator made the change |
| Field changed | Which field was modified |
| Old value | The previous value |
| New value | The updated value |

> **Important:** Edits to user profiles are visible to the user. They will see the updated information in their app. Consider notifying the user if you make changes on their behalf.

---

## Changing Role

Role changes determine what level of access a user has within the platform and its apps.

### Available Roles

| Role | Description | Capabilities |
|------|-------------|--------------|
| user | Standard platform user | Can manage their own pets, participate in breeding programs, view listings |
| moderator | Community moderator | All user capabilities plus ability to review and flag content |
| admin | Platform administrator | All moderator capabilities plus access to the admin portal |

### Steps to Change a User's Role

1. Open the user's detail drawer by clicking their row.
2. Locate the **Role** section in the drawer.
3. Click the **Change Role** button (or the current role badge).
4. A role selection modal appears with:
   - Radio buttons for each available role
   - Description text explaining each role's permissions
   - A confirmation checkbox acknowledging the change
5. Select the new role.
6. Read the role description to confirm it is appropriate.
7. Check the **confirmation checkbox** ("I understand this will change the user's access level").
8. Click **Confirm Role Change**.
9. The user's role is updated immediately.

### Role Change Restrictions

| Your Role | Can Assign |
|-----------|-----------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Cannot change roles |
| viewer | Cannot change roles |

> **Important:** Promoting a user to "admin" grants them access to the admin portal. Only do this for trusted team members who need administrative access.

> **Note:** Changing a user from "admin" to "user" immediately revokes their admin portal access. If they are currently logged into the portal, their session will end on the next page navigation.

---

## Ban/Unban User

Banning a user suspends their account, preventing them from logging into the app or accessing any platform features.

### Banning a User

1. Open the user's detail drawer.
2. Scroll to the **Actions** section at the bottom of the drawer.
3. Click the **Ban User** button (displayed in red).
4. A confirmation modal appears with:
   - The user's name and email for confirmation
   - A **Reason** text field (required)
   - A **Duration** selector (permanent, 7 days, 30 days, 90 days)
5. Enter a clear, professional reason for the ban.
6. Select the ban duration.
7. Click **Confirm Ban**.

### Ban Effects

| Effect | Description |
|--------|-------------|
| Login blocked | User cannot sign in to the mobile app |
| Profile hidden | User's profile is not visible to other users |
| Pets delisted | All pets owned by this user are hidden from listings |
| Notifications | User receives an email explaining the ban with the reason provided |
| Active sessions | All current sessions are terminated immediately |

### Ban Reason Guidelines

| Guideline | Example |
|-----------|---------|
| Be specific | "Multiple fraudulent breeding listings reported and confirmed" |
| Reference policy | "Violation of Terms of Service section 4.2 regarding authentic listings" |
| Avoid vague language | Do NOT write "bad behavior" - be specific about what occurred |
| Keep professional | The reason is sent directly to the user |

> **Important:** The ban reason is communicated to the user via email and in-app notification. It must be factual, specific, and professional.

### Unbanning a User

1. Use the **Status** filter to select "Banned" to find banned users.
2. Click on the banned user's row to open their detail drawer.
3. The drawer shows a **Ban Information** card with:
   - Ban date
   - Banning administrator
   - Ban reason
   - Ban duration / expiry
4. Click the **Unban User** button (displayed in green).
5. A confirmation modal appears.
6. Optionally enter a note explaining why the ban is being lifted.
7. Click **Confirm Unban**.
8. The user's status returns to "Active" and they regain full platform access.
9. The user receives a notification that their account has been restored.

### Ban History

Every ban and unban action is recorded in the user's history:

| Field | Description |
|-------|-------------|
| Ban Date | When the ban was applied |
| Unban Date | When the ban was lifted (if applicable) |
| Admin | Which administrator took the action |
| Reason | The stated reason for the ban |
| Duration | How long the ban was set to last |
| Resolution | How it ended (manual unban, expiration, appeal) |

---

## Searching and Filtering Users

### Search Bar

The search bar at the top of the Users page supports:

| Search Type | Example | Matches |
|-------------|---------|---------|
| Name search | "Sarah" | All users with "Sarah" in their display name |
| Email search | "gmail.com" | All users with Gmail addresses |
| Partial match | "pet" | Users named "Peter", "Petrov", etc. |

### Filter Dropdowns

| Filter | Options |
|--------|---------|
| Role | All, User, Moderator, Admin |
| Status | All, Active, Pending, Banned |
| Verified Breeder | All, Verified, Not Verified, Pending |

### Combining Search and Filters

1. Enter text in the search bar AND select filter values simultaneously.
2. Results must match ALL criteria (AND logic).
3. Clear individual filters by clicking their X button, or clear all with the **Reset** button.

---

## Exporting User Data

To export user data for reporting or analysis:

1. Apply any desired filters.
2. Click the **Export** button in the top-right area.
3. Select format: **CSV** or **Excel**.
4. Choose scope: **Current filtered view** or **All users**.
5. The download begins automatically.

### Exported Fields

| Field | Included | Notes |
|-------|:--------:|-------|
| Display Name | Yes | |
| Email | Yes | |
| Role | Yes | |
| Status | Yes | |
| Country | Yes | |
| City | Yes | |
| Pet Count | Yes | |
| Join Date | Yes | |
| Last Login | Yes | |
| Phone | No | Excluded for privacy |

> **Note:** Phone numbers and detailed personal information are excluded from exports by default to comply with data protection requirements.

---

*Previous: [Pet Registry](./pets.md) | Next: [Pet Categories](./categories.md)*
