# Notifications

The Notifications page enables administrators to compose and send push notifications to Petfolioo mobile app users. You can target specific audience segments, review notification history, and follow best practices for effective communication.

![Notifications](/docs/screenshots/notifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Send, Delete |
> | Admin | View, Send |
> | Moderator | View |
> | Viewer | View only |

---

## Overview

Push notifications are a direct channel to your users. Use them to announce new features, share important updates, send reminders, or engage specific user segments. This page provides both the composition tools and a history log of all previously sent notifications.

---

## Compose Notification

The notification composer is the primary tool for creating and sending push notifications to app users.

### Accessing the Composer

1. Navigate to the **Notifications** page from the sidebar menu.
2. The compose form is displayed at the top of the page.

### Form Fields

| Field | Description | Requirements |
|-------|-------------|--------------|
| **Title** | The notification headline displayed prominently on the user's device | Required. Maximum 65 characters recommended for full visibility. |
| **Message Body** | The detailed content of the notification | Required. Maximum 240 characters recommended. |
| **Audience** | The target group of users who will receive this notification | Required. Select from predefined segments. |

---

## Composing a Notification

Follow these steps to create and send a notification:

### Step 1: Enter the Title

1. Click on the **Title** input field.
2. Type a concise, attention-grabbing headline.
3. Keep it under 65 characters to avoid truncation on smaller devices.

> **Tip:** Use action-oriented language in titles. "New: Track Your Pet's Vaccinations" is more engaging than "Vaccination Feature Update."

### Step 2: Write the Message Body

1. Click on the **Message Body** text area.
2. Write the detailed message you want users to see.
3. Include relevant information such as what action the user should take.
4. Keep the message under 240 characters for optimal display.

### Step 3: Select the Audience

1. Click the **Audience** dropdown selector.
2. Choose one of the following audience segments:

| Audience | Description |
|----------|-------------|
| **All Users** | Sends the notification to every registered user of the app |
| **Dog Owners** | Targets users who have at least one dog registered in their profile |
| **Cat Owners** | Targets users who have at least one cat registered in their profile |
| **Verified Breeders** | Targets users who have been verified as professional breeders |

3. The selected audience determines who will receive the push notification.

> **Note:** A user may belong to multiple segments. For example, a verified breeder who owns dogs will receive notifications targeted at "Dog Owners," "Verified Breeders," and "All Users."

### Step 4: Review Before Sending

1. Double-check the title for typos and clarity.
2. Review the message body for accuracy and tone.
3. Confirm the audience segment is correct.
4. Verify this is not a duplicate of a recently sent notification.

---

## Send Confirmation

When you are ready to send the notification, a confirmation step ensures you do not accidentally send to the wrong audience.

### Sending Process

1. Click the **Send Notification** button.
2. A confirmation dialog appears displaying:
   - The notification title
   - The message body
   - The selected audience segment
   - The estimated number of recipients
3. Review all details in the confirmation dialog.
4. Click **Confirm Send** to dispatch the notification.
5. Alternatively, click **Cancel** to return to the composer and make changes.
6. Upon successful delivery, a success message appears confirming the notification was queued.

> **Important:** Once confirmed, the notification cannot be recalled. Always double-check the audience and content before confirming.

---

## Notification History

Below the compose form, the Notification History section displays a chronological list of all previously sent notifications.

### History List Columns

| Column | Description |
|--------|-------------|
| **Type Tag** | A colored tag indicating the audience segment (e.g., "All Users" in blue, "Dog Owners" in orange) |
| **Title** | The notification title as it was sent |
| **Message** | A preview of the message body (truncated if long) |
| **Date** | The date and time the notification was sent |
| **Recipient Count** | The number of users who received the notification |

### Viewing History

1. Scroll down below the compose form to see the history list.
2. Notifications are listed in reverse chronological order (most recent first).
3. Each row shows the type tag, title, date, and recipient count at a glance.
4. Click on any row to expand and see the full message body.

### Understanding Type Tags

Type tags are color-coded for quick identification:

| Tag Color | Audience |
|-----------|----------|
| Blue | All Users |
| Orange | Dog Owners |
| Purple | Cat Owners |
| Green | Verified Breeders |

---

## Best Practices for Push Notifications

Effective push notifications drive engagement without annoying users. Follow these guidelines:

### Frequency

1. **Limit frequency** -- Do not send more than 2-3 notifications per week unless urgent.
2. **Batch related updates** -- Combine multiple small updates into a single notification.
3. **Respect time zones** -- Send notifications during reasonable hours (9 AM - 8 PM local time).
4. **Avoid weekends** -- Unless the notification is time-sensitive, prefer weekdays.

### Content Quality

1. **Be concise** -- Get to the point quickly. Users decide in seconds whether to engage.
2. **Be actionable** -- Tell users what they can do: "Check your pet's upcoming vaccinations."
3. **Be relevant** -- Use audience targeting to ensure content matches user interests.
4. **Avoid clickbait** -- Misleading notifications erode trust and increase opt-out rates.
5. **Personalize when possible** -- Reference the audience segment: "Attention Dog Owners" feels more personal.

### Timing and Context

1. **New features** -- Send when the feature is live and accessible.
2. **Health reminders** -- Send a few days before a pet's appointment or vaccination is due.
3. **Seasonal content** -- Align with seasons (e.g., flea/tick reminders in spring).
4. **Emergency updates** -- For urgent issues (maintenance, security), send immediately regardless of timing rules.

### Writing Effective Titles

| Good Example | Why It Works |
|--------------|--------------|
| "Your Pet's Vaccination is Due Soon" | Relevant, creates urgency, clear action |
| "New: Pregnancy Tracking for Breeders" | Highlights new value, targets audience |
| "Maintenance Tonight at 10 PM" | Clear, specific, time-sensitive |

| Bad Example | Why It Fails |
|-------------|--------------|
| "Check this out!" | Vague, no value proposition |
| "Update" | Too generic, users will ignore |
| "Important!!!" | Overuses urgency, feels spammy |

### Measuring Success

After sending notifications, monitor:

- **Open rates** -- Are users engaging with your notifications?
- **Opt-out rates** -- A spike indicates notification fatigue.
- **In-app activity** -- Does a notification drive the intended behavior?
- **Feedback** -- Check the Feedback page for user reactions.

---

## Audience Segment Details

### All Users

- Includes every registered account in the system.
- Use for platform-wide announcements, maintenance notices, or universal features.
- Largest audience -- use sparingly to avoid notification fatigue.

### Dog Owners

- Includes users with at least one dog in their pet profile.
- Use for dog-specific health tips, breed events, or feature updates.
- Example: "Reminder: Annual heartworm prevention for dogs."

### Cat Owners

- Includes users with at least one cat in their pet profile.
- Use for cat-specific content, indoor health tips, or feline features.
- Example: "New: Indoor activity tracking for cats."

### Verified Breeders

- Includes users who have completed breeder verification.
- Use for breeding-specific features, compliance updates, or professional tools.
- Example: "Pregnancy tracker improvements now live."

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Notification not sending | Verify all required fields are filled. Check network connectivity. |
| Recipient count shows 0 | The selected audience segment may be empty. Verify users exist in that segment. |
| Users report not receiving | Users may have disabled push notifications on their device. This is outside admin control. |
| Duplicate notification sent | Check the history list before sending. There is no undo once confirmed. |

---

## Related Pages

- [Feedback](./feedback.md) -- Monitor user reactions to notifications
- [Analytics](./analytics.md) -- Track user engagement trends
- [Settings](./settings.md) -- Configure notification-related system settings
