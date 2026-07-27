# Vaccination Analytics

The Vaccination Analytics module provides administrators with insights into vaccination trends across the platform. Use this dashboard to understand which vaccines are most commonly administered, identify regional patterns, and track overall vaccination coverage.

---

## Dashboard Overview

The Vaccination Analytics page is organized into the following sections:

1. **Summary Stats** -- Key metrics at the top of the page
2. **Top 20 Vaccines Leaderboard** -- Ranked list of most-used vaccines
3. **Podium Visualization** -- Highlight of the top 3 vaccines
4. **Per-Vaccine Breakdown** -- Species distribution for each vaccine
5. **Top Locations** -- Geographic distribution per vaccine

---

## Summary Stats

At the top of the analytics page, three stat cards display aggregate metrics:

| Stat Card | Description | Icon |
|-----------|-------------|------|
| Total Vaccinations | Total number of vaccination records across all pets | Syringe |
| Unique Vaccines | Number of distinct vaccine types administered | Flask |
| Pets Vaccinated | Number of unique pets with at least one vaccination | Paw |

### Reading the Stats

- **Total Vaccinations** counts individual vaccination events (one pet receiving one vaccine = 1 count).
- **Unique Vaccines** shows variety of vaccines in the system (e.g., Rabies, DHPP, FVRCP each count as 1).
- **Pets Vaccinated** is deduplicated -- a pet with 5 vaccinations still counts as 1 pet.

> **Tip:** Compare Total Vaccinations to Pets Vaccinated to understand the average number of vaccinations per pet on the platform.

---

## Filters

The filter bar applies to all sections of the analytics page simultaneously.

### Time Period Filter

Select a time range for the data:

| Option | Description |
|--------|-------------|
| Last 7 days | Past week |
| Last 30 days | Past month |
| Last 90 days | Past quarter |
| Last 12 months | Past year |
| All time | No time restriction |
| Custom range | Date picker for start and end dates |

### Species Filter

Filter vaccination data by pet species:

- All Species (default)
- Dog
- Cat
- Bird
- Rabbit
- Other

### Country Filter

Select one or more countries to see vaccination data only from those regions.

### City Filter

Further narrow results by selecting specific cities within the chosen country.

> **Tip:** Combine filters to answer specific questions. For example: "What are the top vaccines for dogs in the United Kingdom in the last 12 months?"

### Applying Filters

1. Set your desired filter values using the dropdowns.
2. Click **Apply Filters** or the filters apply automatically on change.
3. All dashboard sections update to reflect the filtered data.
4. Active filters are shown as tags below the filter bar.
5. Click the **X** on any filter tag to remove it, or click **Clear All** to reset.

---

## Top 20 Vaccines Leaderboard

The leaderboard displays the 20 most frequently administered vaccines based on the current filter selection.

### Table Columns

| Column | Description |
|--------|-------------|
| Rank | Position from 1 to 20 |
| Vaccine Name | Name of the vaccine |
| Count | Number of times administered |
| Percentage | Share of total vaccinations |
| Trend | Sparkline showing usage trend over the selected period |

### Reading the Leaderboard

1. Vaccines are sorted by count in descending order.
2. The **Percentage** column shows what portion of all vaccinations this vaccine represents.
3. The **Trend** sparkline gives a quick visual of whether usage is increasing, stable, or declining.
4. Hover over the sparkline to see data point values.

### Interacting with the Leaderboard

- Click any vaccine row to scroll down to its detailed breakdown section.
- Use the column headers to re-sort (though default rank order is most useful).
- The table is paginated if filters produce more than 20 results in rare configurations.

> **Tip:** A vaccine trending upward might indicate a regional outbreak response or a new recommendation from veterinary associations.

---

## Podium Visualization

The podium highlights the top 3 vaccines in a visual award-style display.

### Layout

```
        [1st]
   [2nd]     [3rd]
```

- **1st Place (center, tallest):** Gold-colored card with the most administered vaccine.
- **2nd Place (left):** Silver-colored card with the second most administered vaccine.
- **3rd Place (right):** Bronze-colored card with the third most administered vaccine.

### Card Contents

Each podium card displays:

- Rank medal icon (gold, silver, bronze)
- Vaccine name
- Total administration count
- Percentage of all vaccinations
- Primary species (most common species receiving this vaccine)

### Reading the Podium

The podium provides an at-a-glance summary of platform vaccination patterns. Common results include:

- **Dogs:** Rabies, DHPP (Distemper/Parvo), Bordetella often dominate.
- **Cats:** FVRCP, Rabies, FeLV are typical top vaccines.
- **Mixed platforms:** Rabies often leads across all species.

> **Tip:** If the podium shows unexpected results after applying filters, check whether the time period or location filter is producing a small sample size that may skew rankings.

---

## Per-Vaccine Species Breakdown

Below the leaderboard, each vaccine in the top 20 has an expandable section showing species distribution.

### Viewing the Breakdown

1. Click the expand arrow next to any vaccine in the leaderboard.
2. A horizontal stacked bar chart appears showing species distribution.
3. Each segment is color-coded by species:
   - Dogs: Blue
   - Cats: Orange
   - Birds: Green
   - Rabbits: Purple
   - Other: Grey

### Breakdown Table

Alongside the bar chart, a small table shows:

| Species | Count | Percentage |
|---------|-------|------------|
| Dog | 1,234 | 62% |
| Cat | 456 | 23% |
| Bird | 200 | 10% |
| Rabbit | 80 | 4% |
| Other | 20 | 1% |

### Use Cases

- Identify vaccines that are species-specific vs. cross-species.
- Detect unusual patterns (e.g., a dog-specific vaccine appearing in cat records may indicate data entry errors).
- Understand your platform's species composition through vaccination data.

> **Tip:** Species-specific vaccines appearing under the wrong species often indicate data quality issues that should be investigated.

---

## Top Locations Per Vaccine

Each vaccine also shows a geographic breakdown of where it is most frequently administered.

### Viewing Location Data

1. Click the expand arrow next to any vaccine in the leaderboard.
2. Switch to the **Locations** tab within the expanded section.
3. A ranked list of top 10 locations appears.

### Location Table

| Rank | Country | City | Count | Percentage |
|------|---------|------|-------|------------|
| 1 | Germany | Berlin | 543 | 18% |
| 2 | United Kingdom | London | 421 | 14% |
| 3 | France | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Map View

If available, a mini heatmap shows concentration of vaccinations geographically:

- Darker regions indicate higher vaccination counts.
- Hover over a region to see the exact count.
- Click a region to apply it as a location filter.

### Use Cases

- Identify regional vaccination preferences or requirements.
- Detect clusters that may correspond to local veterinary recommendations.
- Plan regional outreach or partnership campaigns.

> **Tip:** Some vaccines are legally required in specific countries (e.g., rabies in Germany). High concentrations in certain regions are expected for mandatory vaccines.

---

## Exporting Data

To export vaccination analytics data:

1. Click the **Export** button in the top-right corner of the page.
2. Choose the export format:
   - **CSV** -- Raw data for spreadsheet analysis
   - **PDF** -- Formatted report with charts
3. The export respects all currently active filters.
4. The file downloads to your browser's default download location.

### Export Contents

The CSV export includes:

- Vaccine name
- Total count
- Species breakdown counts
- Top countries and cities
- Trend data points
- Filter parameters used

> **Tip:** Use CSV exports to create custom visualizations in tools like Excel or Google Sheets, or to share data with veterinary advisory partners.

---

## Dashboard Refresh

Analytics data is computed from vaccination records and cached for performance.

- Data refreshes automatically every 24 hours.
- The last refresh timestamp is shown at the bottom of the page.
- Click the **Refresh** icon next to the timestamp to trigger a manual refresh.
- Manual refresh may take 10-30 seconds depending on data volume.

> **Tip:** If you notice discrepancies between the analytics dashboard and individual pet records, try a manual refresh. Recently added vaccinations may not appear until the next cache refresh.

---

## Frequently Asked Questions

**Q: Why does the total in the leaderboard not match the Summary Stats total?**
A: The leaderboard shows the top 20 vaccines. If there are more than 20 unique vaccines, the remaining ones are not listed but still count toward the total.

**Q: Can I see data for a specific breeder or owner?**
A: No. The analytics page shows aggregate platform data. Individual vaccination records are available on each pet's profile.

**Q: Why do some vaccines show zero trend data?**
A: New vaccines that have only been recorded once may not have enough data points to generate a meaningful trend line.

**Q: How far back does historical data go?**
A: The "All time" filter includes every vaccination record since the platform launched. There is no data retention limit for analytics.

**Q: Can I compare two time periods?**
A: Not directly in the dashboard. Export data for two different time periods and compare them in a spreadsheet.
