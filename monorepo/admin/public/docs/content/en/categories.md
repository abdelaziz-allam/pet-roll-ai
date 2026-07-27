# Pet Categories

The Pet Categories module allows administrators to define and manage the classification system used for organizing pets on the Petfolioo platform. Categories represent pet species or types and are used across the application for filtering, search, and organization. Each category includes a name, label, emoji icon, description, and active status.

![Pet Categories](/docs/screenshots/categories.png)

---

## Categories Listing

The categories page displays all defined pet categories in a table format with management controls.

### Table Columns

| Column | Description | Sortable |
|--------|-------------|:--------:|
| Name Slug | Machine-readable identifier (e.g., `dog`, `cat`, `bird`) | Yes |
| Label | Human-readable display name (e.g., "Dog", "Cat", "Bird") | Yes |
| Emoji Icon | Visual icon representing the category | No |
| Description | Brief description of what this category includes | No |
| Active | Toggle switch showing whether the category is active | Yes |
| Actions | Edit and Delete buttons | No |

### Status Indicators

| Active State | Display | Meaning |
|-------------|---------|---------|
| Active | Green toggle (on position) | Category is available for pet registration and visible in filters |
| Inactive | Grey toggle (off position) | Category is hidden from users but existing pets retain their category |

### Table Features

1. **Sort** by clicking the Name Slug, Label, or Active column headers.
2. **Quick toggle** by clicking the Active switch directly in the table row.
3. **Inline actions** via Edit (pencil icon) and Delete (trash icon) buttons in each row.
4. **Pagination** at the bottom for browsing when many categories exist.

> **Tip:** Inactive categories are displayed with a slightly faded row style to visually distinguish them from active ones.

---

## Creating a Category

New categories can be created to support additional pet species or types on the platform.

### Steps to Create a Category

1. Click the **Add Category** button in the top-right corner of the Categories page.
2. A creation form appears (either as a modal or inline form).
3. Fill in the required fields:

| Field | Required | Description | Example |
|-------|:--------:|-------------|---------|
| Name Slug | Yes | Machine-readable identifier | `golden_fish` |
| Label | Yes | Display name shown to users | "Golden Fish" |
| Emoji Icon | Yes | Visual icon for the category | "fish" |
| Description | No | Brief explanation of the category | "Freshwater and saltwater fish species" |
| Active | No | Whether to activate immediately (defaults to active) | On |

4. Select an emoji icon from the **Emoji Picker** (see below).
5. Review your entries.
6. Click **Create Category** to save.
7. The new category appears in the listing table.

### Name Slug Convention

The name slug must follow these rules:

| Rule | Description | Example |
|------|-------------|---------|
| Lowercase only | No uppercase characters allowed | `dog` not `Dog` |
| Underscores for spaces | Use underscores to separate words | `guinea_pig` not `guinea pig` |
| Alphanumeric + underscore | Only letters, numbers, and underscores | `cat_1` is valid, `cat-1` is not |
| Unique | Must not duplicate an existing category slug | System will reject duplicates |
| No leading/trailing underscores | Cannot start or end with underscore | `_dog_` is invalid |
| Maximum 50 characters | Keep slugs concise | Short, descriptive identifiers |

> **Important:** The name slug cannot be changed after creation. It is used as the permanent identifier in the database and API. Choose carefully.

### Emoji Picker

The emoji picker provides over 100 animal and nature icons for category identification.

| Feature | Description |
|---------|-------------|
| Search | Type to filter available emojis by keyword |
| Categories | Emojis organized by group (Animals, Nature, Objects) |
| Preview | Selected emoji shown in large preview before confirming |
| Recent | Previously used emojis shown at the top for quick access |

**Using the Emoji Picker:**

1. Click the **emoji icon field** to open the picker.
2. Browse categories or type a keyword in the search (e.g., "dog", "fish", "bird").
3. Click the desired emoji to select it.
4. The selected emoji appears in the form field as a preview.
5. To change your selection, click the field again to reopen the picker.

Available emoji categories include:

| Group | Example Emojis |
|-------|---------------|
| Domestic Animals | Dog, Cat, Hamster, Rabbit, Mouse |
| Farm Animals | Horse, Cow, Pig, Sheep, Goat, Chicken |
| Birds | Parrot, Eagle, Owl, Duck, Flamingo, Peacock |
| Reptiles | Lizard, Snake, Turtle, Crocodile, Dinosaur |
| Aquatic | Fish, Tropical Fish, Whale, Dolphin, Octopus, Shark |
| Insects | Butterfly, Bee, Beetle, Ant, Cricket |
| Wildlife | Lion, Tiger, Bear, Monkey, Elephant, Giraffe |
| Paw/Generic | Paw prints, Bone, Heart, Star |

---

## Editing Categories

Existing categories can be modified to update their label, icon, description, or active status.

### Steps to Edit a Category

1. Locate the category you want to edit in the listing table.
2. Click the **Edit** button (pencil icon) in the row's Actions column.
3. An edit form appears pre-filled with the current values.
4. Modify any of the editable fields:

| Field | Editable | Notes |
|-------|:--------:|-------|
| Name Slug | No | Cannot be changed after creation |
| Label | Yes | Update the display name |
| Emoji Icon | Yes | Select a new emoji from the picker |
| Description | Yes | Update or add a description |
| Active | Yes | Toggle active/inactive status |

5. Make your changes.
6. Click **Save Changes** to apply.
7. A success notification confirms the update.
8. The listing table reflects the changes immediately.

### Edit Considerations

| Consideration | Detail |
|---------------|--------|
| Label changes | Immediately reflected across the app for all users |
| Emoji changes | Updated in all UI locations where the category appears |
| Description changes | Visible in category selection screens within the app |
| Existing pets | Pets already assigned to this category are not affected by edits |

> **Note:** Changing a category's label does not change its slug. The slug remains the permanent identifier. Users and pets reference categories by slug internally.

---

## Activating and Deactivating Categories

Categories can be toggled between active and inactive states without deletion.

### Activating a Category

1. Find the inactive category in the listing (shown with grey toggle).
2. Click the **toggle switch** in the Active column to flip it to the on position.
3. Alternatively, click Edit and toggle the Active field in the edit form.
4. Confirm the action if prompted.
5. The category becomes available for pet registration immediately.

### Deactivating a Category

1. Find the active category in the listing (shown with green toggle).
2. Click the **toggle switch** to flip it to the off position.
3. A confirmation dialog appears explaining the impact.
4. Click **Confirm Deactivate**.
5. The category is hidden from new pet registrations.

### Impact of Deactivation

| Impact Area | Effect |
|-------------|--------|
| New registrations | Category no longer appears in species selection dropdowns |
| Existing pets | Pets already assigned to this category retain their assignment |
| Filters | Category no longer appears in filter dropdowns for public users |
| Admin portal | Category still visible in admin with inactive styling |
| API responses | Category excluded from active category lists |
| Reactivation | Can be re-enabled at any time, restoring full functionality |

> **Tip:** Deactivation is preferred over deletion when you want to temporarily hide a category or when existing pets still use it. It preserves data integrity while limiting new usage.

---

## Seed Defaults Button

The Seed Defaults feature populates the categories table with a predefined set of common pet categories. This is useful for initial platform setup or restoring standard categories.

### Using Seed Defaults

1. Click the **Seed Defaults** button located above or below the categories table.
2. A confirmation modal appears listing the categories that will be created.
3. Review the list of default categories.
4. Click **Confirm Seed** to proceed.
5. Default categories are created and appear in the listing.

### Default Category Set

The seed creates the following standard categories (if they do not already exist):

| Name Slug | Label | Emoji | Description |
|-----------|-------|:-----:|-------------|
| `dog` | Dog | Dog face | Domestic dogs of all breeds |
| `cat` | Cat | Cat face | Domestic cats of all breeds |
| `bird` | Bird | Bird | Pet birds including parrots, canaries, and finches |
| `rabbit` | Rabbit | Rabbit face | Domestic rabbits |
| `hamster` | Hamster | Hamster face | Hamsters, gerbils, and similar small rodents |
| `fish` | Fish | Fish | Freshwater and saltwater aquarium fish |
| `turtle` | Turtle | Turtle | Turtles and tortoises |
| `snake` | Snake | Snake | Non-venomous pet snakes |
| `lizard` | Lizard | Lizard | Geckos, iguanas, and other pet lizards |
| `horse` | Horse | Horse face | Horses and ponies |
| `guinea_pig` | Guinea Pig | Guinea pig | Guinea pigs and cavies |
| `ferret` | Ferret | Ferret | Domestic ferrets |

### Seed Behavior

| Scenario | Behavior |
|----------|----------|
| Empty table | All defaults created |
| Some defaults exist | Only missing defaults are created (no duplicates) |
| All defaults exist | No changes made, confirmation message displayed |
| Custom categories exist | Custom categories are not affected |

> **Note:** The Seed Defaults button does not delete or modify existing categories. It only adds missing default entries. Your custom categories are safe.

---

## Deleting a Category

Categories can be permanently deleted when they are no longer needed. This action requires careful consideration due to its impact on existing data.

### Steps to Delete a Category

1. Locate the category in the listing table.
2. Click the **Delete** button (trash icon) in the row's Actions column.
3. A warning modal appears with:
   - The category name and current pet count using this category
   - A warning about the impact on existing pets
   - A text confirmation field (type the category slug to confirm)
4. Read the warning carefully.
5. Type the category's **name slug** in the confirmation field.
6. Click **Delete Category** to permanently remove it.

### Impact of Deletion

| Impact Area | Effect |
|-------------|--------|
| Category record | Permanently removed from the database |
| Existing pets | Pets previously in this category become **uncategorized** |
| Pet profiles | Species field shows "Uncategorized" or empty |
| Filters | Category is removed from all filter dropdowns |
| Analytics | Historical data may show "Unknown Category" for past records |
| Reversibility | Cannot be undone (must recreate manually if needed) |

### Pets Become Uncategorized

When a category is deleted:

1. All pets assigned to that category lose their category assignment.
2. These pets appear with an "Uncategorized" label in the Pet Registry.
3. Pet owners are **not** automatically notified.
4. Administrators can reassign uncategorized pets to a different category through bulk edit.
5. The pet count for the deleted category is shown in the deletion confirmation modal.

> **Important:** Deleting a category with active pets assigned to it will leave those pets uncategorized. Consider deactivating the category instead, or reassigning pets before deletion.

### Deletion Restrictions

| Restriction | Description |
|-------------|-------------|
| Default categories | Seeded default categories can be deleted (they can be re-seeded) |
| Active pets | Categories with pets can be deleted (pets become uncategorized) |
| Confirmation required | Slug must be typed to confirm deletion |
| Role requirement | Only `super_admin` and `admin` roles can delete categories |

---

## Best Practices

### Category Management Guidelines

1. **Use clear, simple labels** - Category labels should be immediately understandable to all users regardless of language proficiency.
2. **Choose representative emojis** - Select emojis that clearly represent the animal type to aid quick visual recognition.
3. **Write helpful descriptions** - Descriptions help users choose the correct category when registering their pet.
4. **Deactivate before deleting** - If unsure whether a category is needed, deactivate it first. Delete only when certain.
5. **Keep slugs descriptive** - Since slugs cannot be changed, choose them carefully during creation.
6. **Monitor uncategorized pets** - Regularly check for pets without categories and assign them appropriately.

### Category Naming Examples

| Good | Bad | Why |
|------|-----|-----|
| `guinea_pig` | `gp` | Descriptive and readable |
| `tropical_fish` | `tropicalFish` | Follows underscore convention |
| `parrot` | `Parrot_1` | Lowercase, no numbers needed |
| `persian_cat` | `cat_breed_persian` | Concise, breed-level when needed |

---

## Frequently Asked Questions

**Q: Can I merge two categories?**
A: There is no built-in merge function. To consolidate categories, reassign pets from one category to another, then delete the empty category.

**Q: What happens to filters when I deactivate a category?**
A: The category is removed from user-facing filter dropdowns but remains accessible in the admin portal filters for management purposes.

**Q: Can I reorder categories?**
A: Categories are displayed alphabetically by label in user-facing interfaces. The admin table can be sorted by any column header.

**Q: Is there a limit to how many categories I can create?**
A: There is no hard technical limit, but for usability, keep the total number manageable (under 30 is recommended) so users can easily find the correct category.

---

*Previous: [App Users](./users.md)*
