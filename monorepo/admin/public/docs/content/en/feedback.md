# Feedback Management

The Feedback Management page allows administrators to view, respond to, and organize user feedback submitted through the Petfolioo mobile application. This is your central hub for understanding user needs, tracking bugs, and managing feature suggestions.

---

## Overview

When you navigate to the Feedback page, you will see a stats row at the top summarizing the current state of all feedback, followed by tabbed content areas and filtering controls.

---

## Stats Row

At the top of the page, four metric cards display real-time counts:

| Metric | Description |
|--------|-------------|
| **Total** | The total number of feedback entries received across all statuses |
| **Open** | Feedback entries that have not yet been replied to or closed |
| **Replied** | Feedback entries where an admin has posted at least one response |
| **TODO** | Feedback entries pinned by an admin for follow-up action |

> **Tip:** Use the TODO count as a quick indicator of outstanding items that need attention. If this number grows, consider triaging with your team.

---

## Tabs

The Feedback page is organized into two tabs:

### All Feedback

1. Click the **All Feedback** tab (selected by default).
2. This view displays every feedback entry in the system regardless of status.
3. Entries are sorted by date, with the most recent appearing first.
4. Use the filters (described below) to narrow down results.

### TODO List

1. Click the **TODO List** tab.
2. This view shows only feedback entries that have been pinned as TODO by an admin.
3. Use this tab during team triage meetings or daily reviews.
4. Items remain here until they are unpinned.

---

## Filters

Below the tabs, a filter bar provides several controls to narrow the displayed feedback entries.

### Status Filter

1. Locate the **Status** dropdown on the filter bar.
2. Click to expand and select one of the following:
   - **All** -- Shows feedback in any status
   - **Open** -- Shows only unresolved feedback
   - **Replied** -- Shows feedback with at least one admin reply
   - **Closed** -- Shows feedback marked as resolved
3. The list updates immediately upon selection.

### Type Filter

1. Locate the **Type** dropdown on the filter bar.
2. Select the category of feedback you want to view:
   - **All Types** -- No type filter applied
   - **Bug** -- Issues or defects reported by users
   - **Suggestion** -- Feature requests and improvement ideas
   - **General** -- General comments or questions
3. Each feedback entry is tagged with its type badge for quick visual identification.

### Date Range Filter

1. Click the **Date Range** picker on the filter bar.
2. Select a start date and end date from the calendar widget.
3. Only feedback submitted within the selected range will be displayed.
4. To clear the date filter, click the clear icon on the date picker.

### TODOs-Only Toggle

1. Locate the **TODOs only** toggle switch on the filter bar.
2. Enable it to show only feedback entries pinned as TODO.
3. This provides a quick alternative to switching to the TODO List tab while staying in the All Feedback view with other filters applied.

> **Tip:** Combine filters for powerful queries. For example, set Type to "Bug" and Status to "Open" to see all unresolved bug reports.

---

## Feedback Entries

Each feedback entry in the list displays the following information:

| Field | Description |
|-------|-------------|
| **User Info** | The submitting user's display name, email, and avatar |
| **Message** | The full text of the feedback submitted by the user |
| **Type Badge** | A colored badge indicating Bug (red), Suggestion (blue), or General (gray) |
| **Date** | The date and time the feedback was submitted |
| **Status** | Current status indicator (Open, Replied, or Closed) |
| **TODO Pin** | A pin icon indicating whether this entry is marked for follow-up |

### Viewing a Feedback Entry

1. Locate the feedback entry in the list.
2. Click on the entry row or the expand icon to open the detail view.
3. The detail view shows the full message, user information, and any previous admin replies.

---

## Replying to Feedback

Administrators can respond to user feedback. Replies are visible to the user within the mobile application.

### Steps to Reply

1. Open the feedback entry you want to respond to.
2. Locate the **Reply** text area at the bottom of the detail view.
3. Type your response message in the text area.
4. Review your message for clarity and professionalism.
5. Click the **Send Reply** button.
6. A confirmation message will appear indicating the reply was sent successfully.
7. The feedback status automatically changes to **Replied**.

> **Important:** Your reply will be visible to the user in the Petfolioo mobile app. Ensure your response is helpful, professional, and addresses the user's concern directly.

### Best Practices for Replies

- Acknowledge the user's feedback before providing a solution.
- If the issue is a known bug, let the user know it is being worked on.
- For suggestions, thank the user and explain whether the feature is being considered.
- Avoid technical jargon that end users may not understand.
- Keep replies concise but thorough.

---

## Previous Admin Replies

When viewing a feedback entry that has received responses, all previous admin replies are displayed inline in chronological order.

1. Open the feedback entry detail view.
2. Scroll down to see the conversation thread.
3. Each reply shows:
   - The admin's name who posted the reply
   - The date and time of the reply
   - The full reply text
4. New replies appear at the bottom of the thread.

> **Tip:** Review previous replies before posting a new one to avoid duplicate or contradictory responses.

---

## Closing Feedback

When a feedback item has been fully addressed, you can close it to indicate no further action is needed.

### Steps to Close

1. Open the feedback entry you want to close.
2. Click the **Close** button (or select "Close" from the actions menu).
3. A confirmation dialog will appear asking you to confirm.
4. Click **Confirm** to close the feedback.
5. The entry's status changes to **Closed**.
6. Closed entries remain in the system and can be viewed by setting the status filter to "Closed."

> **Note:** Closing feedback does not delete it. You can still view closed entries and reopen them if needed.

---

## Pin / Unpin as TODO

The TODO pin feature allows admins to flag specific feedback entries for follow-up. Pinned items appear in the TODO List tab and contribute to the TODO count in the stats row.

### Pinning Feedback as TODO

1. Locate the feedback entry you want to flag for follow-up.
2. Click the **Pin** icon (pushpin) on the entry row, or open the detail view and click **Pin as TODO**.
3. The entry is immediately added to the TODO List.
4. The TODO counter in the stats row increments by one.
5. A pin icon appears on the entry indicating its TODO status.

### Unpinning Feedback

1. Locate the pinned feedback entry (use the TODO List tab or the TODOs-only filter).
2. Click the **Unpin** icon on the entry row, or open the detail view and click **Remove from TODO**.
3. The entry is removed from the TODO List.
4. The TODO counter in the stats row decrements by one.

### When to Use TODO Pins

- A feedback item requires investigation before replying.
- You need input from another team member before responding.
- The issue is related to an upcoming release and should be tracked.
- A suggestion needs to be discussed in the next planning meeting.

---

## Workflow Summary

The recommended workflow for handling feedback is:

1. **Review** -- Check the stats row daily for new open feedback.
2. **Triage** -- Use filters to prioritize bugs over suggestions.
3. **Pin** -- Mark complex items as TODO for later follow-up.
4. **Reply** -- Respond to straightforward items immediately.
5. **Collaborate** -- Use the TODO List tab in team reviews.
6. **Close** -- Mark resolved items as closed after confirming the user's issue is addressed.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Open selected feedback entry |
| `R` | Focus the reply text area (when entry is open) |
| `T` | Toggle TODO pin on selected entry |
| `Esc` | Close the detail view |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Reply not sending | Check your network connection and try again. Ensure the message is not empty. |
| Filters not updating | Refresh the page. If the issue persists, clear browser cache. |
| TODO count incorrect | The count refreshes on page load. Navigate away and return to update. |
| Cannot see closed feedback | Set the Status filter to "Closed" or "All" to view closed entries. |

---

## Related Pages

- [Notifications](./notifications.md) -- Send announcements to users
- [Admin Users](./admin-users.md) -- Manage who can respond to feedback
- [Settings](./settings.md) -- Configure system-wide preferences
