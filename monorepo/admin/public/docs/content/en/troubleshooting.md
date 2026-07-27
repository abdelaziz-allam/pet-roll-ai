# Troubleshooting

Solutions to common issues you may encounter while using the Petfolioo Admin Portal.

---

## Login Issues

### I can't log in

**Problem:** You enter your credentials but the login fails or you see an error message.

**Possible causes:**
- Incorrect email address or password
- Your account has been deactivated by a Super Admin
- The authentication service is temporarily unavailable
- Your account has not yet been created in the Admin Portal

**Solution:**
1. Double-check that you are using the email address associated with your admin account (not your personal or app user email).
2. Ensure Caps Lock is off and there are no trailing spaces in your password.
3. Try resetting your password using the "Forgot Password" link.
4. If the problem persists, contact a Super Admin to confirm your account exists and is active.
5. If the service appears to be down, wait a few minutes and try again.

---

### I forgot my password

**Problem:** You cannot remember your Admin Portal password.

**Possible causes:**
- Password was changed and not saved
- Using credentials from a different system

**Solution:**
1. On the login page, click "Forgot Password."
2. Enter the email address associated with your admin account.
3. Check your inbox (and spam folder) for the password reset email.
4. Click the reset link and create a new password.
5. If you do not receive the email within 5 minutes, contact a Super Admin to manually reset your account.

---

### My session expired

**Problem:** You were logged in but suddenly got redirected to the login page.

**Possible causes:**
- Your session exceeded the automatic timeout period (typically 30 minutes of inactivity)
- A Super Admin changed your account settings or role
- The server was restarted during a deployment

**Solution:**
1. Log in again with your credentials. Your unsaved work may be lost.
2. If sessions expire very frequently, ensure your browser is not blocking cookies for the Admin Portal domain.
3. Keep your work saved regularly to avoid data loss from session timeouts.

---

## Permission Issues

### I can't see a page that I should have access to

**Problem:** A navigation link or page that you expect to have access to is not visible or returns a blank screen.

**Possible causes:**
- Your role does not include permission to view that page
- Your role was recently changed and the change has not taken effect yet
- A browser cache issue is serving a stale version of the navigation

**Solution:**
1. Check your current role by looking at your profile or asking a Super Admin. Refer to the Roles & Permissions guide to see which pages your role can access.
2. If your role was recently changed, log out and log back in to refresh your permissions.
3. Clear your browser cache or try opening the portal in a private/incognito window.
4. If you believe your role should grant access to the page, contact a Super Admin to review your permissions.

---

### Buttons are missing from a page

**Problem:** You can see a page but certain action buttons (Edit, Delete, Approve, etc.) are not displayed.

**Possible causes:**
- Your role has read-only access to that page (e.g., Viewer role)
- The item is in a state where those actions are not available (e.g., already approved)
- A UI rendering issue

**Solution:**
1. Check the Roles & Permissions documentation to confirm whether your role has write access to that feature.
2. Verify that the item's current status allows the action you expect (e.g., you cannot approve an already-approved verification).
3. Refresh the page. If buttons still don't appear, try a different browser.
4. If your role should have those buttons, contact a Super Admin.

---

### I get a 403 error

**Problem:** The portal displays a "403 Forbidden" error when you try to access a page or perform an action.

**Possible causes:**
- You are attempting an action that your role explicitly does not permit
- Your session token has become invalid
- Your role was downgraded while you were logged in

**Solution:**
1. Note which page or action triggered the error.
2. Log out and log back in to refresh your session and permissions.
3. If the error persists, your role does not have access to that resource. Contact a Super Admin if you need elevated permissions.

---

## Data Issues

### Changes I made aren't showing up

**Problem:** You edited a record (pet, user, blog post, etc.) but the changes are not reflected in the portal.

**Possible causes:**
- The save operation failed silently due to a network issue
- Your browser is displaying a cached version of the page
- Another admin overwrote your changes simultaneously

**Solution:**
1. Refresh the page using Ctrl+Shift+R (or Cmd+Shift+R on Mac) to bypass the cache.
2. Check if the record shows your changes. If not, re-apply the edit and watch for any error messages when saving.
3. Ensure you have a stable internet connection.
4. If working on shared records, coordinate with other admins to avoid conflicting edits.

---

### Export is not working

**Problem:** Clicking the Export button does nothing, or the downloaded file is empty or corrupted.

**Possible causes:**
- Your browser is blocking the download (pop-up blocker or download restrictions)
- The dataset is too large and the export timed out
- Your role does not have export permissions

**Solution:**
1. Check if your browser blocked a download or pop-up. Look for a notification in the address bar.
2. Disable any pop-up blockers for the Admin Portal domain.
3. If the dataset is very large, try applying filters to reduce the number of records before exporting.
4. Try a different export format (e.g., CSV instead of PDF) as it may process faster.
5. If the issue persists, contact a Super Admin to verify your role includes export permissions.

---

### Search returns no results

**Problem:** You search for a record that you know exists but get an empty result set.

**Possible causes:**
- A typo or extra space in the search query
- The search field is filtering on a specific column (e.g., searching by name when you entered an ID)
- The record was deleted or is in a different status than expected

**Solution:**
1. Remove any extra spaces from your search query.
2. Try searching with fewer characters or a partial match.
3. Check which field the search is filtering on and ensure your query matches that field type.
4. Remove any active filters that might be excluding the record.
5. If searching for a pet by microchip ID, ensure you are entering the full numeric ID without dashes.

---

## Notification Issues

### Push notification wasn't delivered

**Problem:** You sent a push notification but the target users report they did not receive it.

**Possible causes:**
- The user has disabled push notifications on their device
- The user's device token has expired (app was uninstalled and reinstalled)
- The notification was sent to the wrong user segment
- There is a delay in the push notification delivery service

**Solution:**
1. Check the notification delivery log in the Notifications page to see the send status.
2. Verify that you selected the correct target audience (specific user, segment, or all users).
3. Note that push notifications may take a few minutes to deliver depending on device and network conditions.
4. If a specific user consistently does not receive notifications, their device token may be invalid. They should open the app and re-enable notifications in their device settings.
5. For broadcast notifications, allow up to 15 minutes for delivery to complete across all users.

---

### I can't send notifications

**Problem:** The "Send Notification" button is disabled or you receive an error when attempting to send.

**Possible causes:**
- Your role does not have notification send permissions (Viewers and some Moderators)
- Required fields (title, body, target audience) are not filled in
- The notification service is temporarily unavailable

**Solution:**
1. Ensure all required fields are completed: title, message body, and at least one target audience selection.
2. Check that your role has permission to send notifications (Admin or Super Admin role required).
3. If all fields are filled and you have the correct role, try refreshing the page and attempting again.
4. If the error mentions a service issue, wait a few minutes and retry. If the problem persists for more than 30 minutes, report it to the technical team.

---

## Browser Issues

### The page won't load

**Problem:** The Admin Portal shows a blank page, a loading spinner that never completes, or a connection error.

**Possible causes:**
- Internet connectivity issue
- The Admin Portal service is down or restarting
- Browser extensions interfering with page load
- DNS or firewall blocking the portal domain

**Solution:**
1. Check your internet connection by visiting another website.
2. Try refreshing the page with Ctrl+Shift+R (or Cmd+Shift+R on Mac).
3. Try opening the portal in a private/incognito window to rule out extension conflicts.
4. Clear your browser cache and cookies for the portal domain.
5. If using a corporate network, check if a firewall or proxy is blocking access.
6. If the portal is down for everyone, a deployment may be in progress. Wait 5-10 minutes and try again.

---

### Images/screenshots are broken

**Problem:** Images in the portal (pet photos, blog images, screenshots in documentation) appear as broken icons or fail to load.

**Possible causes:**
- The image storage service is temporarily unavailable
- The image was deleted from storage but the reference remains
- A content security policy is blocking image loading
- Slow network connection causing image load timeouts

**Solution:**
1. Refresh the page to retry loading the images.
2. Check if the issue affects all images or only specific ones. If only specific images are broken, they may have been deleted from storage.
3. Right-click a broken image and select "Open image in new tab." If it loads separately, a browser extension may be blocking inline images.
4. Disable ad blockers or security extensions temporarily to test.
5. If the issue affects all images across the portal, report it to the technical team as the storage service may need attention.

---

### The portal is slow

**Problem:** Pages take a long time to load, actions feel sluggish, or the portal becomes unresponsive.

**Possible causes:**
- Slow internet connection
- The browser has too many open tabs consuming memory
- Large datasets being loaded without pagination
- The server is under heavy load

**Solution:**
1. Test your internet speed to rule out a connectivity issue.
2. Close unnecessary browser tabs to free up memory.
3. If a specific page is slow (e.g., Pet Registry with thousands of records), apply filters to reduce the dataset size.
4. Clear your browser cache, which may have grown large over time.
5. Try a different browser to see if the issue is browser-specific.
6. If the slowness is consistent across multiple admins, it may be a server-side issue. Report it to the technical team with the specific pages affected and approximate response times.
