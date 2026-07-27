# Analytics

The Analytics page provides visual insights into platform usage, user growth, pet demographics, and health activity. Use these charts to understand trends, measure engagement, and make data-driven decisions about the Petfolioo platform.

---

## Overview

The Analytics dashboard presents four primary visualizations along with a time range selector that controls the data window for all charts. Each chart updates dynamically when you change the selected time range.

---

## Accessing Analytics

1. Click **Analytics** in the sidebar navigation menu.
2. The dashboard loads with all charts displayed on a single scrollable page.
3. The default time range is **30 days**.

---

## Time Range Selector

At the top of the Analytics page, a time range selector allows you to control the period of data displayed across all charts.

### Available Ranges

| Option | Period | Best For |
|--------|--------|----------|
| **7d** | Last 7 days | Monitoring recent activity and short-term trends |
| **30d** | Last 30 days | Monthly reporting and general trend analysis (default) |
| **90d** | Last 90 days | Quarterly reviews and medium-term pattern identification |
| **1 Year** | Last 365 days | Annual reviews, seasonal patterns, and long-term growth |

### Changing the Time Range

1. Locate the time range selector at the top of the page.
2. Click on one of the range buttons: **7d**, **30d**, **90d**, or **1 Year**.
3. The selected button becomes highlighted to indicate the active range.
4. All charts on the page refresh to display data for the chosen period.
5. Chart axes and labels adjust automatically to fit the new time window.

> **Tip:** Start with 30d for a general overview, then narrow to 7d to investigate recent anomalies or expand to 1 Year for board-level reporting.

---

## User Growth Chart

### Chart Type

Line chart displaying user registration trends over time.

### What It Shows

The User Growth chart visualizes the number of new user registrations plotted over the selected time period. Each data point represents the cumulative or daily count of new users.

### Reading the Chart

| Element | Description |
|---------|-------------|
| **X-axis** | Time (dates or weeks depending on the selected range) |
| **Y-axis** | Number of new user registrations |
| **Line** | A continuous line connecting data points showing the growth trajectory |
| **Data Points** | Hoverable markers on the line showing exact values |
| **Tooltip** | Appears on hover showing the date and exact registration count |

### Interpreting the Data

1. **Upward trend** -- Consistent growth in user acquisition. The platform is attracting new users steadily.
2. **Flat line** -- User acquisition has plateaued. Consider marketing efforts or feature launches to reignite growth.
3. **Spikes** -- Sudden increases may correlate with marketing campaigns, press coverage, or app store features.
4. **Dips** -- Decreases in daily registrations may indicate seasonal patterns or technical issues.

### Time Range Behavior

| Range | X-axis Granularity | Notes |
|-------|-------------------|-------|
| 7d | Daily | Each day shown individually |
| 30d | Daily | Each day shown, good for identifying weekly patterns |
| 90d | Weekly | Data aggregated by week for readability |
| 1 Year | Monthly | Data aggregated by month to show annual trajectory |

> **Tip:** Compare the 7d view with the 30d view. If the last 7 days trend above the 30-day average, growth is accelerating.

---

## Species Distribution Chart

### Chart Type

Pie chart (or donut chart) showing the proportion of pets by species.

### What It Shows

The Species Distribution chart breaks down all registered pets by their species category, showing the relative proportion of each.

### Reading the Chart

| Element | Description |
|---------|-------------|
| **Slices** | Each slice represents a species (e.g., Dog, Cat, Bird, Rabbit) |
| **Colors** | Each species is assigned a distinct color for identification |
| **Labels** | Species name and percentage shown on or near each slice |
| **Legend** | A legend maps colors to species names |
| **Tooltip** | Hover over a slice to see exact count and percentage |

### Interpreting the Data

1. **Dominant species** -- The largest slice indicates your primary user base's pet type. Use this to prioritize features.
2. **Small slices** -- Species with very small percentages may indicate opportunity for growth in underserved segments.
3. **Balance** -- A roughly even distribution suggests broad appeal across pet owner types.

### Use Cases

- **Feature prioritization** -- If 70% of pets are dogs, prioritize dog-specific features.
- **Content planning** -- Create educational content proportional to species distribution.
- **Marketing targeting** -- Understand which audience segments are largest for ad campaigns.
- **Notification targeting** -- The audience segments in Notifications (Dog Owners, Cat Owners) correlate directly with this chart.

> **Tip:** If you notice a species growing faster than others over time (compare 30d vs 1 Year), consider investing in species-specific features to capitalize on the trend.

---

## Popular Breeds Chart

### Chart Type

Horizontal bar chart ranking the most popular breeds.

### What It Shows

The Popular Breeds chart displays the top breeds registered on the platform, ranked by count. Bars extend horizontally, making it easy to compare popularity across breeds.

### Reading the Chart

| Element | Description |
|---------|-------------|
| **Y-axis** | Breed names, ordered from most popular (top) to least popular (bottom) |
| **X-axis** | Count of registered pets of that breed |
| **Bars** | Horizontal bars whose length represents the number of pets |
| **Labels** | Count value displayed at the end of each bar |
| **Tooltip** | Hover for exact count and percentage of total |

### Interpreting the Data

1. **Top breeds** -- The longest bars represent the most common breeds on the platform. These users are your core audience.
2. **Long tail** -- Many breeds with small counts indicate diverse user interests.
3. **Breed concentration** -- If a few breeds dominate (e.g., top 3 account for 50%+), your platform has a concentrated user base.

### Typical Insights

| Pattern | Insight | Action |
|---------|---------|--------|
| Golden Retriever dominates | Large family-dog audience | Prioritize features for medium/large dog breeds |
| Persian Cat in top 5 | Strong cat owner segment | Invest in cat-specific health tracking |
| Exotic breeds appearing | Niche breeders joining | Consider breeder-specific premium features |
| Even distribution | Diverse user base | Build general features rather than breed-specific ones |

### Chart Limits

- The chart displays the **top 10-15 breeds** by default.
- Remaining breeds are grouped under "Other" if applicable.
- The number of visible breeds may vary by time range.

> **Tip:** Cross-reference popular breeds with health activity data. If a popular breed has low health record activity, those users may need engagement nudges.

---

## Health Activity Chart

### Chart Type

Grouped bar chart showing health-related activities categorized by type.

### What It Shows

The Health Activity chart displays the volume of health-related actions taken on the platform, grouped by activity type. This helps you understand how actively users are engaging with health features.

### Reading the Chart

| Element | Description |
|---------|-------------|
| **X-axis** | Time periods (days, weeks, or months depending on range) |
| **Y-axis** | Count of health activities |
| **Bar Groups** | Multiple bars per time period, one for each activity type |
| **Colors** | Each activity type has a distinct color |
| **Legend** | Maps colors to activity types (Vaccinations, Check-ups, Medications, etc.) |
| **Tooltip** | Hover for exact count per activity type per period |

### Activity Types

| Activity | Description | Color (typical) |
|----------|-------------|-----------------|
| **Vaccinations** | Vaccination records created or updated | Blue |
| **Health Records** | General health records logged | Green |
| **Weight Tracking** | Weight measurements recorded | Orange |
| **Medications** | Medication entries added | Purple |

### Interpreting the Data

1. **High vaccination bars** -- Users are actively tracking vaccinations. The reminder system is likely driving engagement.
2. **Low health record bars** -- Users may not be aware of the health records feature. Consider in-app prompts.
3. **Seasonal patterns** -- Some health activities peak seasonally (e.g., flea treatments in spring).
4. **Growing bars over time** -- Health feature adoption is increasing, indicating good user engagement.
5. **Declining bars** -- Users may be losing interest or encountering friction in logging health data.

### Comparing Activity Types

The grouped format lets you visually compare:

- Which health features are most used vs. underutilized.
- Whether one activity type is growing while others decline.
- How different time ranges reveal different patterns.

> **Tip:** If vaccination activity is high but other health tracking is low, consider adding cross-feature prompts: "You logged a vaccination -- would you also like to record Rex's weight?"

---

## Dashboard Layout

The four charts are arranged on the Analytics page in a grid layout:

```
+---------------------------+---------------------------+
|                           |                           |
|    User Growth            |    Species Distribution   |
|    (Line Chart)           |    (Pie Chart)            |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Popular Breeds         |    Health Activity        |
|    (Horizontal Bar)       |    (Grouped Bar)          |
|                           |                           |
+---------------------------+---------------------------+
```

Each chart occupies a card with:
- A title header
- The chart visualization
- Interactive tooltips on hover
- Responsive sizing that adapts to screen width

---

## Interacting with Charts

### Hover Tooltips

1. Move your cursor over any data point, bar, or chart slice.
2. A tooltip appears showing:
   - The exact value
   - The label (date, breed name, species, etc.)
   - Percentage where applicable

### Responsive Behavior

1. On larger screens, charts display in a 2x2 grid.
2. On smaller screens, charts stack vertically for readability.
3. Chart elements resize proportionally.

### Data Refresh

1. Analytics data is refreshed when the page loads.
2. Changing the time range triggers a new data fetch.
3. There is no auto-refresh -- reload the page manually for the latest data.

---

## Common Analytics Workflows

### Monthly Reporting

1. Select the **30d** time range.
2. Note the User Growth trend (up, flat, or down).
3. Check Species Distribution for any shifts.
4. Review Popular Breeds for emerging trends.
5. Examine Health Activity for engagement levels.
6. Screenshot or export data for reports.

### Investigating a Drop

1. Start with **30d** to identify when the drop occurred.
2. Switch to **7d** to examine the most recent period in detail.
3. Check if the drop correlates with:
   - A system issue (check Settings > Maintenance Mode history)
   - A notification sent (check Notification history)
   - A seasonal pattern (compare with 1 Year view)

### Quarterly Review

1. Select the **90d** time range.
2. Compare the growth trajectory against previous quarters.
3. Identify which health activities grew the most.
4. Note any new breeds appearing in the Popular Breeds chart.
5. Use Species Distribution to validate marketing strategy alignment.

### Annual Planning

1. Select the **1 Year** time range.
2. Identify seasonal patterns in User Growth (e.g., holiday spikes).
3. Track year-over-year breed popularity changes.
4. Measure health feature adoption over the full year.
5. Use insights to inform the product roadmap.

---

## Understanding Data Freshness

| Aspect | Detail |
|--------|--------|
| Data source | Platform database (aggregated) |
| Update frequency | Real-time on page load |
| Historical accuracy | Complete back to platform launch |
| Time zone | Server time (UTC) |
| Missing data | Gaps shown as zero values, not interpolated |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Charts not loading | Check your network connection. Refresh the page. |
| Data appears stale | Analytics load on page visit. Navigate away and return, or refresh. |
| Zero values for all metrics | Verify the selected time range has data. Try expanding to 1 Year. |
| Chart tooltips not appearing | Try a different browser. Ensure JavaScript is enabled. |
| Time range not changing | Click directly on the range button. If unresponsive, refresh the page. |
| Cannot access Analytics | Verify your role and permissions include Analytics page access. |

---

## Related Pages

- [Settings](./settings.md) -- Configure platform settings that affect user behavior
- [Notifications](./notifications.md) -- Send notifications that may impact engagement metrics
- [Feedback](./feedback.md) -- Correlate user feedback with analytics trends
- [Admin Users](./admin-users.md) -- Grant analytics access to team members
