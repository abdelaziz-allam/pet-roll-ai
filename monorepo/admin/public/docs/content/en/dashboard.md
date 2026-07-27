# Dashboard

The Dashboard is the first screen you see after logging in to the Petfolioo Admin Portal. It provides a real-time overview of platform health through key performance indicators (KPIs), interactive charts, and recent activity feeds. Use the dashboard to monitor growth trends, identify areas needing attention, and track platform engagement at a glance.

![Dashboard](/docs/screenshots/dashboard.png)

---

## KPI Cards

At the top of the dashboard, four summary cards display the platform's most important metrics. Each card shows the current total and a percentage change indicator compared to the previous period.

### Card Definitions

| Card | Metric | Description |
|------|--------|-------------|
| Total Users | Count of registered app users | All users who have created an account on the platform |
| Total Pets | Count of registered pets | All pets added to the registry regardless of status |
| Pending Verifications | Items awaiting review | Verification requests that have not yet been approved or rejected |
| Active Listings | Currently visible listings | Pets marked as available for breeding or adoption |

### Growth Percentage

Each KPI card includes a growth indicator:

- A **green arrow up** with a percentage indicates growth compared to the previous period.
- A **red arrow down** with a percentage indicates a decline compared to the previous period.
- The comparison period matches the selected time range (see Time Range Selector below).

> **Tip:** Hover over a KPI card to see the exact numbers for the current and previous periods in a tooltip.

### Reading the Cards

1. The **large number** is the current total count.
2. The **percentage badge** below it shows period-over-period change.
3. The **label** at the top identifies which metric is displayed.
4. Click any card to navigate directly to the corresponding module (e.g., clicking "Total Users" opens the Users list).

---

## Time Range Selector

The time range selector controls the data window for all dashboard analytics and KPI comparisons.

### Available Ranges

| Option | Period | Comparison Against |
|--------|--------|--------------------|
| 7d | Last 7 days | Previous 7 days |
| 30d | Last 30 days | Previous 30 days |
| 90d | Last 90 days | Previous 90 days |
| All Time | Since platform launch | No comparison (growth percentage hidden) |

### How to Change the Time Range

1. Locate the **time range selector** in the top-right area of the dashboard, above the KPI cards.
2. Click on one of the period buttons: **7d**, **30d**, **90d**, or **All Time**.
3. The entire dashboard will refresh to reflect the selected period.
4. KPI growth percentages will recalculate based on the new comparison window.

> **Note:** The "All Time" option hides growth percentages since there is no prior period to compare against.

---

## Pet Analytics Section

Below the KPI cards, the Pet Analytics section presents visual breakdowns of the pet registry data. Three chart types provide different perspectives on the pet population.

### Species Distribution (Pie Chart)

The pie chart displays the proportional breakdown of pets by species.

| Element | Description |
|---------|-------------|
| Chart type | Donut/Pie chart |
| Data source | All registered pets grouped by species |
| Segments | One segment per species (e.g., Dog, Cat, Bird, Rabbit, Reptile) |
| Labels | Species name and count displayed on hover |
| Legend | Color-coded legend below or beside the chart |

**Interacting with the Pie Chart:**

1. Hover over any segment to see the exact count and percentage for that species.
2. Click a segment to filter other dashboard charts to that species only.
3. The legend items are clickable - click a species name to toggle its visibility in the chart.

### Gender Distribution (Bar Chart)

The vertical bar chart shows the distribution of pets by gender.

| Element | Description |
|---------|-------------|
| Chart type | Vertical bar chart |
| X-axis | Gender categories (Male, Female, Unknown) |
| Y-axis | Pet count |
| Bars | One bar per gender, color-coded |
| Labels | Count displayed above each bar |

**Reading the Gender Chart:**

1. Each bar represents one gender category.
2. The height of the bar corresponds to the total number of pets of that gender.
3. The exact count is displayed as a label above each bar.
4. Hover for additional detail including percentage of total.

### Country Distribution (Horizontal Bar Chart)

The horizontal bar chart ranks countries by the number of registered pets.

| Element | Description |
|---------|-------------|
| Chart type | Horizontal bar chart |
| Y-axis | Country names (sorted by count, descending) |
| X-axis | Pet count |
| Bars | One horizontal bar per country |
| Display | Top 10 countries shown by default |

**Reading the Country Chart:**

1. Countries are sorted from most pets (top) to fewest (bottom).
2. By default, only the top 10 countries are displayed.
3. Hover over a bar to see the exact count and percentage of total.
4. The bar length is proportional to the count relative to other countries.

---

## Geo and Species Filters

Above the analytics charts, filter controls allow you to narrow the data displayed.

### Available Filters

| Filter | Type | Options |
|--------|------|---------|
| Species | Dropdown select | All species available in the platform (e.g., Dog, Cat, Bird, etc.) |
| Country | Dropdown select | All countries with registered pets |

### Applying Filters

1. Click the **Species** dropdown to select a specific pet species.
2. Click the **Country** dropdown to select a specific country.
3. Charts and tables below will update immediately to reflect the filter.
4. Filters can be combined - select both a species and country to narrow results further.
5. To reset, select "All" from each dropdown or click the **Reset Filters** button.

> **Tip:** Use the species filter on the pie chart view to drill into breed distributions within a single species.

### Filter Behavior

| Scenario | Effect |
|----------|--------|
| No filters selected | All data displayed globally |
| Species selected only | Charts show data for that species across all countries |
| Country selected only | Charts show data for all species in that country |
| Both selected | Charts show data for the selected species in the selected country |

---

## Recent User Registrations Table

Below the analytics charts, a table displays the most recent user registrations on the platform.

### Table Columns

| Column | Description |
|--------|-------------|
| Avatar | User profile picture thumbnail |
| Name | User's display name |
| Email | User's registered email address |
| Join Date | Date and time the account was created |
| Status | Account status (Active, Pending, Banned) |
| Pets | Number of pets registered by this user |

### Table Features

1. **Sorting** - Click any column header to sort by that column. Click again to reverse the sort order.
2. **Pagination** - The table shows 10 entries per page by default. Use the pagination controls at the bottom to navigate.
3. **Quick Actions** - Hover over a row to reveal a "View" button that opens the user detail drawer.

### Understanding Status Indicators

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| Active | Green | Account is in good standing and fully functional |
| Pending | Orange | Account created but email not yet verified |
| Banned | Red | Account has been suspended by an administrator |

> **Note:** The recent registrations table always shows the newest users first, regardless of the time range selector setting. It displays registrations from the last 30 days.

---

## Dashboard Best Practices

### Daily Monitoring Checklist

1. Check the **Pending Verifications** KPI card - a high number may indicate a backlog.
2. Review the **growth percentages** on all four cards for unexpected drops.
3. Scan the **Recent User Registrations** table for suspicious accounts.
4. Note any significant shifts in the **Country Distribution** chart.

### Interpreting Trends

| Trend | Possible Meaning | Recommended Action |
|-------|-------------------|-------------------|
| Sudden spike in registrations | Marketing campaign success or bot activity | Check recent users for suspicious patterns |
| Drop in active listings | Seasonal change or policy issue | Review recent ban actions and listing expirations |
| High pending verifications | Understaffed moderation | Assign additional moderators |
| Species imbalance shift | Regional trend or category misconfiguration | Review category settings |

---

## Dashboard Performance

The dashboard loads data asynchronously. Each section loads independently:

1. **KPI cards** load first (fastest query).
2. **Charts** load next with a brief loading spinner.
3. **Recent registrations table** loads last.

If any section shows a loading error:

1. Check your internet connection.
2. Try refreshing the page.
3. If the error persists, the backend service may be experiencing issues.

> **Tip:** The dashboard auto-refreshes every 5 minutes. You can manually refresh by clicking the refresh icon in the header or pressing `F5`.

---

*Previous: [Getting Started](./getting-started.md) | Next: [Pet Registry](./pets.md)*
