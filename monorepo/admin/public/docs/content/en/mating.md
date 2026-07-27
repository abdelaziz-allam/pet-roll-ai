# Mating Marketplace

The Mating Marketplace module provides administrators with oversight of the platform's pet breeding matchmaking system. Monitor match requests, track successful pairings, and view breeder performance rankings.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Navigation Tabs

The Mating Marketplace page is organized into two main tabs:

| Tab | Description |
|-----|-------------|
| Matches & Requests | View and manage all mating matches and pending requests |
| Breeder Rankings | Leaderboards showing top-performing breeders |

Switch between tabs by clicking the tab header at the top of the page.

---

## Matches & Requests Tab

This tab displays all mating matches as visual cards, providing an intuitive overview of breeding activity on the platform.

### Match Cards

Each match is represented as a card showing two pets connected by a visual heart connector.

#### Card Layout

```
+------------------------------------------+
|  [Pet A Photo]  <3  [Pet B Photo]        |
|  Pet A Name          Pet B Name          |
|  Breed               Breed               |
|  Owner               Owner               |
|                                          |
|  Status: [Badge]     Listed: [Date]      |
|  Species: [Tag]      Location: [City]    |
+------------------------------------------+
```

#### Card Information

| Element | Description |
|---------|-------------|
| Pet Photos | Profile photos of both pets in the match |
| Heart Connector | Visual link between the two pets (animated for active matches) |
| Pet Names | Names of both pets |
| Breeds | Breed information for each pet |
| Owners | Owner names (clickable to view profiles) |
| Status Badge | Current match status |
| Listing Date | When the match request was created |
| Species Tag | Species of the pets |
| Location | City/country of the listing |

### Match Statuses

| Status | Badge Color | Description |
|--------|-------------|-------------|
| Pending | Orange | Match request sent, awaiting response |
| Accepted | Green | Both parties agreed to the match |
| Declined | Red | One party declined the match |
| Completed | Blue | Mating confirmed as completed |
| Cancelled | Grey | Match was cancelled by either party |
| Expired | Light Grey | Request expired without response |

---

## Filters

The filter bar allows you to narrow down the displayed matches.

### Status Filter

Select one or more statuses to display:

1. Click the **Status** dropdown.
2. Check the statuses you want to see.
3. The card grid updates immediately.

### Species Filter

Filter matches by pet species:

- All Species (default)
- Dog
- Cat
- Bird
- Rabbit
- Other

### Country Filter

Select one or more countries to filter by match location.

### City Filter

Further narrow by selecting specific cities.

> **Tip:** Use Status: Accepted + your country to see successful matches in your region that might need the "Send Wedding Card" action.

---

## Detail Drawer

Click any match card to open the detail drawer on the right side of the screen.

### Pet Photos Section

At the top of the drawer, larger versions of both pet photos are displayed side by side with the heart connector between them.

- Click either photo to view full-size.
- Swipe through additional photos if the pet has a gallery.

### Listing Information

| Field | Description |
|-------|-------------|
| Listing ID | Unique identifier for the match listing |
| Created By | Which pet owner initiated the listing |
| Created Date | Date the listing was first published |
| Match Date | Date the match was proposed |
| Response Date | Date the match was accepted/declined (if applicable) |
| Species | Species of both pets |
| Breeds | Detailed breed information |
| Location | Full location details |
| Notes | Any notes from the listing owner |

### Match Timeline

The drawer includes a chronological timeline of events:

1. **Listing Created** -- Owner published their pet's mating listing
2. **Match Proposed** -- The matching algorithm or manual request initiated the match
3. **Match Viewed** -- The other party viewed the match proposal
4. **Response Given** -- Accept/decline with timestamp
5. **Completion Recorded** -- If mating was confirmed complete
6. **Wedding Card Sent** -- If admin sent a celebratory notification

Each timeline event shows:

- Date and time
- Actor (system, owner A, owner B, or admin)
- Event description
- Additional notes (if any)

> **Tip:** The timeline helps you understand the full context of a match when investigating disputes or issues reported by users.

---

## Send Wedding Card

The "Send Wedding Card" action allows administrators to send a celebratory notification to both pet owners when a match is accepted or completed.

### How to Send a Wedding Card

1. Open the detail drawer for an **Accepted** or **Completed** match.
2. Click the **Send Wedding Card** button at the bottom of the drawer.
3. In the dialog:
   - Preview the notification message (auto-generated with both pet names).
   - Optionally add a custom congratulatory message.
   - Review the recipients (both pet owners).
4. Click **Send**.

### What the Wedding Card Includes

- Congratulatory header with both pet names
- Pet photos arranged with decorative elements
- Match date and location
- Custom admin message (if provided)
- Link to the match details page

### When to Send

- After a match is accepted and both parties confirm they are proceeding.
- After a match is marked as completed.
- Only once per match (the button is disabled after sending).

> **Tip:** Wedding cards are a community engagement tool. Sending them for accepted matches encourages platform participation and creates a positive experience for breeders.

---

## Breeder Rankings Tab

The Breeder Rankings tab showcases the most active and successful breeders on the platform.

### Overall Top 10 Podium

At the top of the Rankings tab, a podium visualization highlights the top 10 breeders across all species.

#### Podium Layout

```
              [1st]
        [2nd]       [3rd]
   [4th]  [5th]  [6th]  [7th]
      [8th]   [9th]   [10th]
```

Each podium position shows:

- Breeder name
- Kennel name
- Profile photo
- Total matches count
- Success rate percentage

#### Podium Scoring

Breeders are ranked by a composite score based on:

| Factor | Weight | Description |
|--------|--------|-------------|
| Total Matches | 30% | Number of matches initiated or received |
| Success Rate | 40% | Percentage of matches that reached Accepted/Completed |
| Active Listings | 15% | Number of currently active mating listings |
| Response Time | 15% | Average time to respond to match proposals |

### Per-Species Top 10 Grid

Below the overall podium, a grid displays the top 10 breeders for each species separately.

#### Grid Layout

Each species has its own card:

```
+-------------------+  +-------------------+  +-------------------+
|    Dogs Top 10    |  |    Cats Top 10    |  |   Birds Top 10   |
| 1. Breeder Name   |  | 1. Breeder Name   |  | 1. Breeder Name   |
| 2. Breeder Name   |  | 2. Breeder Name   |  | 2. Breeder Name   |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Each entry in the species grid shows:

- Rank number
- Breeder name
- Kennel name
- Matches count for that species
- Success rate for that species

> **Tip:** Per-species rankings help identify specialist breeders who may be excellent candidates for platform partnerships or featured listings.

---

## Sortable Rankings Table

Below the visual rankings, a full data table provides detailed breeder statistics.

### Table Columns

| Column | Sortable | Description |
|--------|----------|-------------|
| Rank | Yes | Current position based on default scoring |
| Breeder Name | Yes | Full name of the breeder |
| Kennel | Yes | Kennel name |
| Matches | Yes | Total number of matches (initiated + received) |
| Listings | Yes | Number of mating listings created |
| Success Rate | Yes | Percentage of matches reaching Accepted/Completed status |
| Views | Yes | Total views on their mating listings |
| Species | No | Primary species they breed |
| Location | No | Country and city |

### Sorting the Table

1. Click any sortable column header to sort ascending.
2. Click again to sort descending.
3. A third click removes the sort on that column.
4. You can sort by multiple columns (hold Shift and click).

### Table Interactions

- Click a breeder row to view their full profile and match history.
- Use the search bar above the table to find a specific breeder.
- Export the table data using the **Export CSV** button.

> **Tip:** Sort by Success Rate descending to identify breeders who consistently produce successful matches. These breeders may benefit from premium features or verification fast-tracking.

---

## Understanding Match Metrics

### Success Rate Calculation

```
Success Rate = (Accepted + Completed matches) / Total matches x 100
```

- Only matches where the breeder was the listing owner count toward their success rate.
- Declined and expired matches reduce the success rate.
- Cancelled matches are excluded from the calculation.

### Views Metric

The Views count represents:

- Total unique views on all of a breeder's active mating listings.
- Does not count the breeder's own views.
- Resets per listing (not cumulative across deleted listings).

### Activity Score

The overall ranking considers recency:

- Matches from the last 90 days are weighted 2x.
- Matches from 90-180 days are weighted 1x.
- Matches older than 180 days are weighted 0.5x.

> **Tip:** A breeder with high views but low success rate may have attractive listings but be too selective or slow to respond. Consider reaching out to understand their experience.

---

## Frequently Asked Questions

**Q: Can I manually create a match between two pets?**
A: No. Matches are created by pet owners through the app. Administrators can only monitor and take actions on existing matches.

**Q: What happens to match data when a pet is deleted?**
A: The match record is retained for historical purposes but marked with a "Pet Removed" indicator. The match cannot progress further.

**Q: Can I remove a breeder from the rankings?**
A: Rankings are automatically calculated. To remove a breeder, their account must be suspended or their verification revoked, which excludes them from rankings.

**Q: How often are rankings updated?**
A: Rankings recalculate every 24 hours. The last update timestamp is shown at the top of the Rankings tab.

**Q: Can I send a Wedding Card for a declined match?**
A: No. The Send Wedding Card button is only available for matches with Accepted or Completed status.

**Q: What if both pets in a match are from the same owner?**
A: The system prevents same-owner matches. If you see one, it indicates a data integrity issue that should be reported to the development team.
