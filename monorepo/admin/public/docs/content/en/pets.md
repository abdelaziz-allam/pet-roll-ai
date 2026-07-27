# Pet Registry

The Pet Registry is the central module for viewing and managing all pets registered on the Petfolioo platform. From this module, administrators can browse the complete pet catalog, view detailed profiles, review health certification statuses, and take moderation actions such as banning pets that violate platform policies.

![Pet Registry](/docs/screenshots/pets.png)

---

## Pet Listing Table

The pet listing table displays all registered pets in a paginated, sortable, and filterable format.

### Table Columns

| Column | Description | Sortable |
|--------|-------------|:--------:|
| Name | The pet's registered name | Yes |
| Species | Species category (e.g., Dog, Cat, Bird) | Yes |
| Breed | Specific breed within the species | Yes |
| Status | Current status (Active, Banned, Pending) | Yes |
| Gender | Male, Female, or Unknown | Yes |
| Location | Country and city of the pet's registered address | Yes |

### Status Indicators

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| Active | Green | Pet profile is live and visible to other users |
| Banned | Red | Pet profile has been hidden due to a policy violation |
| Pending | Orange | Pet profile is awaiting review or owner verification |

### Table Interactions

1. **Click a column header** to sort the table by that column. An arrow indicates sort direction.
2. **Click a row** to open the pet detail drawer on the right side of the screen.
3. **Pagination controls** at the bottom allow you to navigate between pages and change page size (10, 20, 50 entries per page).

> **Tip:** Hold `Shift` and click a second column header to apply a secondary sort.

---

## Filters

The filter bar above the pet listing table provides multiple ways to narrow down the displayed results.

### Available Filters

| Filter | Type | Description |
|--------|------|-------------|
| Species | Dropdown select | Filter by pet species (Dog, Cat, Bird, Rabbit, Reptile, etc.) |
| Status | Dropdown select | Filter by pet status (Active, Banned, Pending) |
| Gender | Dropdown select | Filter by gender (Male, Female, Unknown) |
| Country | Dropdown select | Filter by the pet's registered country |
| City | Dropdown select | Filter by city (options update based on country selection) |
| Search | Text input | Free text search across pet name, breed, and microchip number |

### Applying Filters

1. Locate the **filter bar** above the table.
2. Click any **dropdown filter** to see available options.
3. Select one or more values from the dropdowns.
4. Type in the **Search** field to perform a free text search.
5. Results update automatically as filters are applied.
6. Active filters are shown as tags below the filter bar.
7. Click the **X** on any filter tag to remove it.
8. Click **Clear All** to reset all filters at once.

### Filter Combinations

Filters are combined with AND logic. For example:

| Selected Filters | Result |
|-----------------|--------|
| Species: Dog | All dogs regardless of status, gender, or location |
| Species: Dog + Gender: Female | All female dogs |
| Species: Dog + Country: UAE + Status: Active | All active dogs located in the UAE |
| Search: "Rex" | All pets whose name, breed, or microchip contains "Rex" |

> **Note:** The city dropdown is dependent on the country selection. Select a country first to see available cities.

---

## Pet Detail Drawer

Clicking on any pet row opens a detail drawer that slides in from the right side of the screen. This drawer contains the complete pet profile organized into sections.

### Photos Grid

At the top of the detail drawer, a photo grid displays the pet's uploaded images.

| Element | Description |
|---------|-------------|
| Primary photo | Displayed larger, marked with a star icon |
| Additional photos | Shown in a grid layout (up to 6 thumbnails) |
| Click action | Clicking any photo opens it in a full-screen lightbox |
| No photos | A placeholder silhouette is shown |

### Pet Information Section

Below the photos, the pet's core details are displayed in a structured layout.

| Field | Description | Example |
|-------|-------------|---------|
| Name | Registered pet name | "Bella" |
| Species | Species category | "Dog" |
| Breed | Specific breed | "Golden Retriever" |
| Color | Coat/body color | "Golden" |
| Weight | Weight with unit | "28.5 kg" |
| Date of Birth | Pet's birthday | "2021-03-15" |
| Age | Calculated from DOB | "2 years, 4 months" |
| Gender | Male or Female | "Female" |
| Microchip Number | Unique microchip ID if implanted | "900118000123456" |
| Neutered/Spayed | Neuter or spay status | "Yes" / "No" / "Unknown" |
| Registration Date | When the pet was added to the platform | "2023-07-20" |

### Health Certification Status

The health certification section shows whether the pet has valid health documentation on file.

| Element | Description |
|---------|-------------|
| Certification badge | Green checkmark (valid), Yellow warning (expiring soon), Red X (expired/missing) |
| Certificate type | Name of the health certificate |
| Issue date | When the certificate was issued |
| Expiry date | When the certificate expires |
| Validity progress bar | Visual indicator of remaining validity period |

**Reading the Validity Progress Bar:**

1. A **full green bar** indicates the certificate was recently issued and has most of its validity remaining.
2. A **partial yellow bar** (below 30% remaining) indicates the certificate is approaching expiration.
3. A **red empty bar** indicates the certificate has expired.
4. The percentage remaining is displayed as text next to the bar.

> **Tip:** Certificates expiring within 30 days are automatically flagged in the Pending Verifications module for the pet owner to be notified.

### Owner Information

The owner section displays details about the pet's registered owner.

| Field | Description |
|-------|-------------|
| Owner name | Display name of the pet's owner |
| Email | Owner's email address |
| Phone | Phone number if provided |
| Verified breeder | Whether the owner holds verified breeder status |
| Total pets | How many pets this owner has registered |
| Member since | Owner's registration date |

Clicking the owner's name navigates to their full profile in the Users module.

### Location Section

The location section shows where the pet is registered.

| Field | Description |
|-------|-------------|
| Country | Country name with flag icon |
| City | City name |
| Address | Street address if provided (may be partially hidden for privacy) |

---

## Ban/Unban Pet Action

Administrators and moderators can ban a pet whose profile violates platform policies. Banning hides the pet from public view and notifies the owner.

### Banning a Pet

1. Open the pet's detail drawer by clicking its row in the listing table.
2. Scroll to the bottom of the drawer or locate the **Actions** section.
3. Click the **Ban Pet** button (shown in red).
4. A confirmation modal will appear.
5. In the **Reason** text field, enter a clear explanation for why this pet is being banned.
6. Select a **violation category** from the dropdown (e.g., Fraudulent listing, Inappropriate content, Duplicate profile, Policy violation).
7. Click **Confirm Ban**.
8. The pet's status will change to "Banned" and the owner will receive a notification with the reason provided.

### Ban Reason Requirements

| Requirement | Description |
|-------------|-------------|
| Minimum length | At least 20 characters |
| Language | Must be professional and clear |
| Specificity | Should reference the specific violation |
| Visibility | The reason is shown directly to the pet owner |

> **Important:** The ban reason you provide will be displayed to the pet owner in their app notification and email. Ensure it is professional, specific, and does not contain internal jargon.

### Unbanning a Pet

1. Use the **Status** filter to select "Banned" to find banned pets.
2. Click on the banned pet's row to open the detail drawer.
3. Locate the **Unban Pet** button (shown in green) in the Actions section.
4. A confirmation modal will appear showing the original ban reason and date.
5. Optionally add a note explaining why the ban is being lifted.
6. Click **Confirm Unban**.
7. The pet's status will return to "Active" and the owner will be notified.

### Ban History

Each pet's detail drawer includes a **Ban History** section if the pet has ever been banned:

| Column | Description |
|--------|-------------|
| Date | When the ban was applied |
| Admin | Which administrator performed the action |
| Reason | The ban reason provided |
| Duration | How long the ban lasted |
| Resolution | How it was resolved (unbanned, appealed, etc.) |

---

## Bulk Operations

For large-scale moderation tasks, the pet listing table supports bulk selection.

### Using Bulk Selection

1. Check the **checkbox** on the left side of each row you want to select.
2. Or click the **header checkbox** to select all visible rows on the current page.
3. A **bulk actions bar** appears at the top of the table showing the count of selected items.
4. Available bulk actions include:
   - **Export** - Download selected pets as a CSV file
   - **Change Status** - Apply a status change to all selected pets

> **Note:** Bulk banning is not available through this interface. Bans must be applied individually to ensure each one includes a specific reason.

---

## Exporting Pet Data

To export pet registry data:

1. Apply any desired filters to narrow the dataset.
2. Click the **Export** button in the top-right corner of the table.
3. Select the export format (CSV or Excel).
4. Choose whether to export **filtered results** or **all records**.
5. The file will download to your browser's default download location.

### Exported Fields

| Field | Included |
|-------|:--------:|
| Pet name | Yes |
| Species | Yes |
| Breed | Yes |
| Gender | Yes |
| Status | Yes |
| Country | Yes |
| City | Yes |
| Owner email | Yes |
| Registration date | Yes |
| Microchip number | Yes |
| Health cert status | Yes |

> **Note:** Photos and detailed health records are not included in exports. Only summary data is exported.

---

*Previous: [Dashboard](./dashboard.md) | Next: [App Users](./users.md)*
