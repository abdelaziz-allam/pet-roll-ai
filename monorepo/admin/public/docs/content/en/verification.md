# Breeder Verification

The Breeder Verification module allows administrators to review, approve, reject, and revoke breeder verification requests. Verified breeders receive a trust badge visible to buyers, signaling that their kennel meets platform standards.

![Verification](/docs/screenshots/verification.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Approve, Reject |
> | Admin | View, Approve, Reject |
> | Moderator | View, Approve, Reject |
> | Viewer | View only |

---

## Verification Requests Table

The main view displays all verification submissions in a searchable, sortable table.

| Column | Description |
|--------|-------------|
| Breeder Name | Full name of the breeder who submitted the request |
| Kennel | Registered kennel name associated with the breeder |
| Submission # | Auto-incremented submission number (resubmissions get a new number) |
| Document Count | Number of uploaded documents attached to the submission |
| Status | Current verification status badge |
| Expiry | Verification expiry date (only shown for approved submissions) |

### Filtering the Table

1. Use the **Status** dropdown to filter by: Pending, Approved, Rejected, Revoked, or Expired.
2. Use the **Search** field to find a breeder by name or kennel.
3. Click any column header to sort ascending or descending.

> **Tip:** The default view shows Pending submissions first so you can prioritize new requests.

---

## Status Workflow

Verification requests follow a defined lifecycle:

```
Pending --> Approved --> Expired (automatic, after expiry date)
   |            |
   |            +--> Revoked (manual admin action)
   |
   +--> Rejected (breeder may resubmit)
```

### Status Definitions

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| Pending | Orange | Awaiting admin review |
| Approved | Green | Breeder is verified and badge is active |
| Rejected | Red | Submission did not meet requirements |
| Revoked | Dark Red | Admin manually removed verified status |
| Expired | Grey | Verification period ended; breeder must resubmit |

### Transitions

- **Pending** can transition to **Approved** or **Rejected**.
- **Approved** can transition to **Revoked** (manual) or **Expired** (automatic).
- **Rejected** and **Expired** allow the breeder to create a new submission (new Pending entry).
- **Revoked** is a terminal state for that submission.

---

## Reviewing a Submission

To review a breeder verification request:

1. Locate the submission in the Verification Requests table.
2. Click the row or the **Review** action button on the right side.
3. The **Submission Detail Modal** opens with two tabs:
   - **Current Submission** -- Shows the active documents and breeder details.
   - **Submission History** -- Shows all previous submissions from this breeder.

### Current Submission Tab

This tab displays:

- Breeder profile information (name, email, phone, kennel registration number)
- Uploaded documents in a grid layout
- Submission date and time
- Any notes the breeder included with the submission

### Submission History Tab

This tab shows a chronological list of all submissions from the same breeder, including:

- Submission number
- Date submitted
- Final status
- Reviewer name
- Rejection reason (if applicable)

> **Tip:** Use the Submission History tab to check whether a breeder has addressed previous rejection reasons before approving a resubmission.

---

## Document Preview

Each uploaded document appears as a thumbnail in the documents grid.

1. Click any document thumbnail to open a full-size image preview.
2. Use the zoom controls to inspect document details.
3. Navigate between documents using the left/right arrows in the preview overlay.
4. Press **Escape** or click the close button to return to the detail modal.

Supported document formats include:

- JPEG and PNG images
- PDF documents (rendered as page images)

> **Tip:** Look for clarity, authenticity, and completeness when reviewing uploaded documents. Blurry or partial documents should be rejected with clear instructions for resubmission.

---

## Approving a Submission

To approve a breeder verification request:

1. Open the submission detail modal by clicking the row in the table.
2. Review all uploaded documents carefully.
3. Click the **Approve** button at the bottom of the modal.
4. In the confirmation dialog:
   - Set the **Expiry Date** for the verification. The default is 1 year from today.
   - Optionally adjust the date if a shorter or longer period is appropriate.
5. Click **Confirm Approval**.

### What Happens After Approval

- The breeder's profile receives the verified badge immediately.
- The breeder is notified via email and in-app notification.
- The submission status changes to **Approved** in the table.
- The expiry date appears in the Expiry column.
- When the expiry date passes, the status automatically transitions to **Expired**.

> **Tip:** For new breeders with limited documentation, consider setting a shorter expiry (6 months) to prompt an earlier re-verification.

---

## Rejecting a Submission

To reject a breeder verification request:

1. Open the submission detail modal.
2. Review the documents and identify the issue(s).
3. Click the **Reject** button at the bottom of the modal.
4. In the rejection dialog:
   - Enter a **Rejection Reason** in the text area. This field is required.
   - Be specific about what is missing or inadequate.
5. Click **Confirm Rejection**.

### What Happens After Rejection

- The submission status changes to **Rejected**.
- The rejection reason is visible to the breeder in their dashboard.
- The breeder receives a notification explaining the rejection.
- The breeder may create a new submission to address the issues.

### Writing Good Rejection Reasons

| Do | Do Not |
|----|--------|
| "Kennel registration document is expired (2019). Please upload a current registration." | "Documents not good enough." |
| "Photo of facility is too blurry to verify conditions. Please resubmit with clearer images." | "Bad photos." |
| "Missing vaccination records for breeding animals." | "Incomplete." |

> **Tip:** Clear rejection reasons reduce back-and-forth and help breeders submit complete applications on their next attempt.

---

## Revoking Verification

Revocation immediately removes a breeder's verified status. Use this for policy violations or fraudulent documentation discovered after approval.

1. Navigate to the Verification Requests table.
2. Filter by **Status: Approved** to find active verifications.
3. Click the row to open the submission detail.
4. Click the **Revoke** button (appears only for Approved submissions).
5. In the revocation dialog:
   - Enter the **Reason for Revocation**. This is required.
   - Confirm that you understand the action is immediate.
6. Click **Confirm Revocation**.

### What Happens After Revocation

- The verified badge is removed from the breeder's profile immediately.
- The breeder is notified via email with the revocation reason.
- All active listings from the breeder display a warning indicator.
- The submission status changes to **Revoked** (terminal state).
- The breeder cannot resubmit against the same submission; they must start fresh.

> **Tip:** Revocation is a serious action. Document the reason thoroughly in case of disputes. Consider reaching out to the breeder before revoking if the issue is minor.

---

## Timeline View

The Timeline View provides a visual history of a breeder's verification journey.

1. Open any submission detail modal.
2. Switch to the **Submission History** tab.
3. The timeline displays events in chronological order:
   - Submission created
   - Documents uploaded
   - Admin review started
   - Status changed (with reviewer name)
   - Expiry warnings sent
   - Resubmissions linked

### Reading the Timeline

Each timeline entry shows:

- **Date and time** of the event
- **Event type** icon (document, status change, notification)
- **Actor** (breeder name or admin name)
- **Details** (reason text, document names, expiry date set)

### Timeline Use Cases

- **Dispute resolution:** See the full history when a breeder contests a rejection.
- **Audit trail:** Track which admin reviewed and approved/rejected each submission.
- **Pattern detection:** Identify breeders who repeatedly submit inadequate documentation.

> **Tip:** The timeline is read-only. All actions (approve, reject, revoke) must be performed from the Current Submission tab.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Open selected submission |
| Escape | Close modal |
| Tab | Switch between modal tabs |
| Arrow keys | Navigate between documents in preview |

---

## Frequently Asked Questions

**Q: Can I approve a submission with conditions?**
A: No. Approvals are unconditional. If documents are partially acceptable, reject with specific instructions for what to fix, then approve the resubmission.

**Q: What happens to a breeder's listings when their verification expires?**
A: Listings remain active but the verified badge is removed. The breeder is notified 30 days before expiry to encourage resubmission.

**Q: Can a revoked breeder reapply?**
A: Yes, but they must create an entirely new submission. The previous revoked submission remains in the history for audit purposes.

**Q: Who can perform verification actions?**
A: Only administrators with the Verification Manager role can approve, reject, or revoke submissions.
