# Settings

The Settings page provides system-wide configuration options for the Petfolioo platform. Settings are organized into three tabs: General, Notifications, and Security. Changes made here affect the behavior of both the admin portal and the mobile application.

![Settings](/docs/screenshots/settings.png)

---

## Overview

Only administrators with super_admin or admin role (with Settings page access) can view and modify settings. All changes require explicit saving and take effect immediately upon save.

---

## Accessing Settings

1. Click **Settings** in the sidebar navigation menu.
2. The Settings page loads with three tabs at the top.
3. The **General** tab is selected by default.

---

## General Tab

The General tab contains core application configuration options that define how the platform presents itself and operates.

### Fields

| Field | Description | Default |
|-------|-------------|---------|
| **App Name** | The display name of the application shown in notifications and emails | Petfolioo |
| **Support Email** | The contact email address shown to users for support inquiries | -- |
| **Default Language** | The default language for new users and system communications | English |
| **Maintenance Mode** | Toggle to enable or disable maintenance mode | Off |

### Configuring General Settings

#### App Name

1. Locate the **App Name** field.
2. Clear the existing value and type the desired application name.
3. This name appears in push notifications, email headers, and the mobile app's about section.

#### Support Email

1. Locate the **Support Email** field.
2. Enter the email address where users should direct support inquiries.
3. This email is displayed on the mobile app's help/contact screen.

> **Tip:** Use a shared team email (e.g., support@petfolioo.com) rather than a personal address so multiple team members can respond.

#### Default Language

1. Click the **Default Language** dropdown.
2. Select the language that will be used as the default for:
   - New user account creation
   - System-generated notifications
   - Email templates
3. Users can override this in their individual mobile app settings.

#### Maintenance Mode

Maintenance mode is a critical feature that signals to users that the platform is temporarily unavailable.

1. Locate the **Maintenance Mode** toggle.
2. Click the toggle to enable maintenance mode.
3. A warning dialog appears confirming the action.

**When Maintenance Mode is enabled:**

| Effect | Description |
|--------|-------------|
| Admin Portal Warning | A prominent banner appears at the top of the admin portal indicating maintenance mode is active |
| Mobile App Impact | The mobile application displays a maintenance screen to users, preventing normal usage |
| API Behavior | API endpoints return maintenance status responses |
| Admin Access | Administrators can still access the admin portal normally |

4. To disable maintenance mode, click the toggle again.
5. Confirm the action in the dialog.
6. The platform returns to normal operation immediately.

> **Warning:** Enabling maintenance mode immediately affects all mobile app users. Only enable it during planned maintenance windows and communicate the schedule in advance via push notification.

---

## Notifications Tab

The Notifications tab controls automated notification behaviors -- the system-generated alerts sent to users based on their pet data.

### Fields

| Field | Description | Type | Default |
|-------|-------------|------|---------|
| **Vaccination Reminders** | Send automatic reminders when a pet's vaccination is approaching due date | Toggle | On |
| **Pregnancy Alerts** | Send alerts for pregnancy milestone dates and expected delivery | Toggle | On |
| **Mating Updates** | Send updates about mating schedule events and confirmations | Toggle | On |
| **Reminder Days Before Due** | Number of days before a due date to send the reminder notification | Number input | 7 |

### Configuring Notification Settings

#### Vaccination Reminders

1. Locate the **Vaccination Reminders** toggle.
2. When **enabled** (default):
   - Users receive push notifications before their pet's vaccination due dates.
   - The notification is sent based on the "Reminder Days Before Due" setting.
   - Example: If set to 7 days, users get a reminder one week before vaccination is due.
3. When **disabled**:
   - No automatic vaccination reminders are sent.
   - Users must manually check their pet's vaccination schedule.

#### Pregnancy Alerts

1. Locate the **Pregnancy Alerts** toggle.
2. When **enabled** (default):
   - Users tracking a pregnancy receive milestone notifications.
   - Alerts include expected delivery date reminders and stage transitions.
   - Breeders receive additional professional tracking notifications.
3. When **disabled**:
   - No automatic pregnancy-related alerts are sent.

#### Mating Updates

1. Locate the **Mating Updates** toggle.
2. When **enabled** (default):
   - Users receive notifications about scheduled mating events.
   - Confirmation notifications are sent when mating records are logged.
   - Breeders receive match suggestions and schedule reminders.
3. When **disabled**:
   - No automatic mating-related notifications are sent.

#### Reminder Days Before Due

1. Locate the **Reminder Days Before Due** number input.
2. Enter the number of days before a due date when reminders should be sent.
3. This value applies to all date-based reminders (vaccinations, appointments).
4. Valid range: 1 to 30 days.

> **Tip:** A value of 7 days works well for most users. For breeders managing multiple pets, consider setting it to 14 days to give more preparation time.

### Notification Interaction Table

| Setting | Affects | User Impact |
|---------|---------|-------------|
| Vaccination Reminders ON + 7 days | Users with pets having upcoming vaccinations | "Rex's rabies vaccination is due in 7 days" |
| Pregnancy Alerts ON | Users with active pregnancy records | "Luna's pregnancy has entered week 6" |
| Mating Updates ON | Users with scheduled matings | "Mating appointment with Max confirmed for Friday" |
| All toggles OFF | All users | No automated notifications; only manual admin notifications |

---

## Security Tab

The Security tab contains settings that control API rate limiting, authentication token lifetimes, and file upload restrictions.

### Fields

| Field | Description | Type | Default |
|-------|-------------|------|---------|
| **Rate Limit Per Minute** | Maximum API requests allowed per user per minute | Number | 60 |
| **Access Token Expiry (Hours)** | How long an access token remains valid | Number | 24 |
| **Refresh Token Expiry (Days)** | How long a refresh token remains valid | Number | 30 |
| **Max Photo Size (MB)** | Maximum allowed file size for pet photos | Number | 5 |
| **Max Avatar Size (MB)** | Maximum allowed file size for user avatars | Number | 2 |
| **Allowed File Types** | Comma-separated list of MIME types accepted for uploads | Text | image/jpeg,image/png,image/webp |

### Configuring Security Settings

#### Rate Limit Per Minute

1. Locate the **Rate Limit Per Minute** field.
2. Enter the maximum number of API requests a single user can make per minute.
3. Requests exceeding this limit receive a 429 (Too Many Requests) response.
4. Recommended range: 30-120 depending on expected usage patterns.

> **Important:** Setting this too low may cause the mobile app to malfunction for active users. Setting it too high may leave the system vulnerable to abuse. The default of 60 is suitable for most deployments.

#### Access Token Expiry (Hours)

1. Locate the **Access Token Expiry** field.
2. Enter the number of hours an access token remains valid after issuance.
3. When a token expires, the app uses the refresh token to obtain a new one.
4. Shorter values are more secure; longer values reduce login friction.

| Value | Security | User Experience |
|-------|----------|-----------------|
| 1 hour | High | Frequent re-authentication |
| 24 hours | Medium | Good balance (recommended) |
| 72 hours | Lower | Minimal interruption |

#### Refresh Token Expiry (Days)

1. Locate the **Refresh Token Expiry** field.
2. Enter the number of days a refresh token remains valid.
3. When the refresh token expires, the user must log in again with their credentials.
4. Recommended range: 7-90 days.

> **Tip:** For a consumer app like Petfolioo, 30 days is a good balance. Users who open the app at least monthly will never need to re-login. For higher-security deployments, consider 7 days.

#### Max Photo Size (MB)

1. Locate the **Max Photo Size** field.
2. Enter the maximum file size in megabytes for pet photo uploads.
3. Photos exceeding this size are rejected with an error message.
4. Consider storage costs and upload times for users on slow connections.

| Value | Suitable For |
|-------|-------------|
| 2 MB | Low storage, fast uploads, lower quality |
| 5 MB | Balanced (recommended) |
| 10 MB | High quality photos, more storage usage |

#### Max Avatar Size (MB)

1. Locate the **Max Avatar Size** field.
2. Enter the maximum file size in megabytes for user profile avatar uploads.
3. Avatars are typically smaller than pet photos since they are displayed at reduced resolution.
4. Recommended: 1-3 MB.

#### Allowed File Types

1. Locate the **Allowed File Types** field.
2. Enter a comma-separated list of MIME types that the system accepts for uploads.
3. Each MIME type should be in the format `type/subtype`.
4. Do not add spaces between entries unless you intentionally want them in the MIME type string.

**Common MIME types for image uploads:**

| MIME Type | Format | Notes |
|-----------|--------|-------|
| `image/jpeg` | JPEG | Most common photo format, good compression |
| `image/png` | PNG | Lossless, supports transparency |
| `image/webp` | WebP | Modern format, excellent compression |
| `image/heic` | HEIC | Apple's format, used by iPhone cameras |
| `image/gif` | GIF | Animated images, larger file sizes |

**Example configurations:**

```
Standard:     image/jpeg,image/png,image/webp
Extended:     image/jpeg,image/png,image/webp,image/heic,image/gif
Minimal:      image/jpeg,image/png
```

> **Warning:** Adding unsupported MIME types may allow uploads that the system cannot process. Only add types that your image processing pipeline supports.

---

## Saving Settings

All settings changes require an explicit save action.

### Steps to Save

1. Make your desired changes across any of the three tabs.
2. Click the **Save Settings** button at the bottom of the page.
3. A loading indicator appears while changes are being applied.
4. A success notification confirms the settings were saved.
5. Changes take effect immediately across the platform.

### Important Notes About Saving

- Changes are **not** auto-saved. If you navigate away without saving, changes are lost.
- You can modify settings across multiple tabs before saving -- all changes are saved together.
- If a validation error occurs, the specific field is highlighted with an error message.
- Only fields that have changed are sent to the server (optimistic partial update).

> **Tip:** After saving security-related changes (rate limits, token expiry), monitor the system for a short period to ensure no unexpected behavior occurs.

---

## Settings Change Audit

All settings modifications are logged for security and accountability:

| Logged Information | Description |
|--------------------|-------------|
| Admin name | Who made the change |
| Timestamp | When the change was made |
| Field changed | Which setting was modified |
| Previous value | The value before the change |
| New value | The value after the change |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot access Settings page | Verify your role is super_admin or admin with Settings permission granted. |
| Save button disabled | No changes have been made. Modify at least one field to enable saving. |
| Validation error on save | Check the highlighted field for the specific error message and correct the value. |
| Maintenance mode not affecting app | Allow 1-2 minutes for the change to propagate to all mobile app instances. |
| Rate limit too restrictive | Increase the value and save. Affected users will be unblocked within one minute. |
| File upload errors after type change | Ensure the MIME types are correctly formatted with no trailing commas or spaces. |

---

## Related Pages

- [Admin Users](./admin-users.md) -- Manage who can access and modify settings
- [Notifications](./notifications.md) -- Send manual notifications to users
- [Analytics](./analytics.md) -- Monitor platform health and usage
