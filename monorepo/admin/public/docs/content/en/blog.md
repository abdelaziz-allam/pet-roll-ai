# Blog CMS

The Blog CMS module allows administrators to create, edit, publish, and manage blog posts displayed on the Petfolioo public website. Use this tool to share pet care tips, platform news, breeder spotlights, and educational content with your community.

---

## Blog Posts Table

The main view displays all blog posts in a searchable, sortable table.

| Column | Description |
|--------|-------------|
| Title | Post title with clickable link to edit |
| Status | Publication status badge |
| Author | Name of the admin who created the post |
| Views | Total page views since publication |
| Date | Creation date (or publication date if published) |

### Status Badges

| Status | Badge Color | Description |
|--------|-------------|-------------|
| Draft | Grey | Post is saved but not visible to the public |
| Published | Green | Post is live and visible on the website |
| Featured | Gold | Post is published and pinned to the top |

### Table Actions

- Click a post title to open it for editing.
- Use the action menu (three dots) on each row for quick actions: Publish, Unpublish, Pin, Unpin, Delete.
- Sort by any column by clicking the column header.
- Use the search bar to filter posts by title or content keywords.

> **Tip:** Sort by Views descending to identify your most popular content. Use these insights to plan future posts on similar topics.

---

## Creating a Post

To create a new blog post:

1. Click the **Create Post** button in the top-right corner of the Blog Posts table.
2. The post editor opens with the following fields.

### Title

- Enter the post title in the title field at the top.
- Maximum 200 characters.
- The title appears as the main heading on the published page.
- Choose descriptive, engaging titles that include relevant keywords.

### Slug

- The URL slug is auto-generated from the title.
- Format: lowercase, hyphens replace spaces, special characters removed.
- Example: "Top 10 Tips for New Puppy Owners" becomes `top-10-tips-for-new-puppy-owners`.
- You can manually edit the slug if the auto-generated version is too long or unclear.
- The slug must be unique across all posts.

> **Tip:** Keep slugs short and keyword-rich for better SEO. Manually shorten auto-generated slugs that exceed 5-6 words.

### HTML Content

- The main content area accepts HTML for rich formatting.
- Use the rich text editor toolbar for common formatting:
  - Bold, italic, underline
  - Headings (H2, H3, H4)
  - Ordered and unordered lists
  - Links
  - Images (inline)
  - Block quotes
  - Code blocks
- Switch to **Source Mode** to edit raw HTML directly.
- Content supports all standard HTML tags.

#### Content Best Practices

| Do | Do Not |
|----|--------|
| Use H2 for main sections, H3 for subsections | Use H1 (reserved for the title) |
| Include images to break up long text | Post walls of unformatted text |
| Keep paragraphs short (3-4 sentences) | Write paragraphs longer than 5 sentences |
| Use lists for multiple related items | Embed external scripts or iframes |
| Add alt text to all images | Use inline styles for colors |

### Excerpt

- Write a short summary of the post (maximum 500 characters).
- The excerpt appears in blog listing pages, search results, and social media previews.
- If left empty, the first 500 characters of the content are used automatically.
- Character counter shows remaining characters as you type.

> **Tip:** Write the excerpt as a compelling teaser that makes readers want to click through. It should stand alone as a complete thought, not end mid-sentence.

### Cover Image Upload

1. Click the **Upload Cover Image** area or drag and drop an image file.
2. Supported formats: JPEG, PNG, WebP.
3. Recommended dimensions: 1200 x 630 pixels (optimized for social sharing).
4. Maximum file size: 5 MB.
5. After upload, a preview of the image appears.
6. Click **Remove** to delete the current cover image and upload a different one.

#### Cover Image Guidelines

- Use high-quality, relevant images that represent the post content.
- Avoid text overlays on cover images (they may be cropped on different devices).
- Ensure you have rights to use the image (original photos or properly licensed stock).
- Images are automatically optimized for web delivery after upload.

### Tags

- Enter tags as comma-separated values in the tags field.
- Example: `puppy care, training, nutrition, new owners`
- Tags help categorize posts and improve discoverability.
- Existing tags auto-suggest as you type.
- There is no limit on the number of tags, but 3-7 tags per post is recommended.

> **Tip:** Use consistent tag naming across posts. Check existing tags before creating new variations (e.g., use "puppy care" consistently rather than alternating with "puppy-care" or "Puppy Care").

### SEO Settings

The SEO section allows you to optimize how the post appears in search engines.

#### Meta Title

- Maximum 60 characters.
- Appears as the clickable headline in search results.
- If left empty, the post title is used.
- Character counter turns red when approaching or exceeding 60 characters.
- Best practice: Include primary keyword near the beginning.

#### Meta Description

- Maximum 160 characters.
- Appears as the description snippet below the title in search results.
- If left empty, the excerpt is used.
- Character counter turns red when approaching or exceeding 160 characters.
- Best practice: Include a call to action and primary keyword.

#### SEO Preview

Below the meta fields, a preview shows how the post will appear in Google search results:

```
+--------------------------------------------------+
| Meta Title (or Post Title if blank)              |
| https://petfolioo.com/blog/your-slug-here        |
| Meta Description (or Excerpt if blank) appears   |
| here as it would in search results...            |
+--------------------------------------------------+
```

> **Tip:** Always fill in both meta title and meta description manually. Auto-generated values from the title and excerpt may not be optimized for search intent.

### Saving a Draft

1. After filling in the desired fields, click **Save Draft**.
2. The post is saved with Draft status.
3. You can return to edit it at any time from the Blog Posts table.
4. Drafts are not visible to the public.

---

## Publishing a Post

To publish a draft post and make it visible on the website:

1. Open the post from the Blog Posts table.
2. Review all content, images, and SEO settings.
3. Click the **Publish** button in the top-right corner.
4. In the confirmation dialog:
   - Review the post title and slug.
   - Confirm the publication.
5. Click **Confirm Publish**.

### What Happens After Publishing

- The post status changes to **Published**.
- The post becomes immediately visible on the public blog page.
- The publication date is recorded (used for sorting on the blog).
- The post URL becomes active: `https://petfolioo.com/blog/[slug]`.
- Search engines can now index the post.

### Publishing Checklist

Before publishing, verify:

- [ ] Title is clear, engaging, and free of typos
- [ ] Content is complete and properly formatted
- [ ] All images load correctly
- [ ] Links work and open in appropriate tabs
- [ ] Cover image is uploaded and looks good
- [ ] Excerpt is written and under 500 characters
- [ ] Tags are added and properly formatted
- [ ] Meta title is under 60 characters
- [ ] Meta description is under 160 characters
- [ ] Slug is clean and keyword-rich

---

## Unpublishing a Post

To remove a published post from the public website:

1. Find the post in the Blog Posts table.
2. Click the action menu (three dots) on the row.
3. Select **Unpublish**.
4. Confirm the action in the dialog.

### What Happens After Unpublishing

- The post status changes back to **Draft**.
- The post is immediately removed from the public blog page.
- The URL returns a 404 page.
- View count is preserved.
- You can republish the post at any time.

> **Tip:** Unpublish rather than delete if you want to temporarily remove content. Unpublished posts retain all their data and can be restored instantly.

---

## Pin/Unpin as Featured

Featured posts appear prominently at the top of the blog page, above chronological listings.

### Pinning a Post

1. Find a published post in the Blog Posts table.
2. Click the action menu (three dots).
3. Select **Pin as Featured**.
4. The status badge changes to **Featured** (gold).

### Unpinning a Post

1. Find the featured post in the table.
2. Click the action menu (three dots).
3. Select **Unpin**.
4. The status reverts to **Published** (green).

### Featured Post Rules

- Only published posts can be pinned.
- Multiple posts can be featured simultaneously.
- Featured posts display in the order they were pinned (most recent pin first).
- Unpinning a post does not unpublish it; it remains published.

> **Tip:** Limit featured posts to 2-3 at a time. Too many featured posts dilute the emphasis and push regular content below the fold.

---

## View on Site

To preview how a published post looks on the public website:

1. Open the post from the Blog Posts table.
2. Click the **View on Site** link in the top-right area (next to the Publish button).
3. A new browser tab opens showing the post on the live website.

### Notes

- The View on Site link is only available for Published and Featured posts.
- Draft posts cannot be previewed on the live site.
- The link opens the current live version; unsaved changes in the editor are not reflected.

> **Tip:** Always view on site after publishing to verify formatting, images, and layout appear correctly in the public theme.

---

## Deleting a Post

To permanently delete a blog post:

1. Find the post in the Blog Posts table.
2. Click the action menu (three dots).
3. Select **Delete**.
4. A confirmation dialog appears:
   - Shows the post title.
   - Warns that deletion is permanent.
   - Asks you to type the post title to confirm (for published posts).
5. Click **Confirm Delete**.

### What Happens After Deletion

- The post is permanently removed from the system.
- The URL returns a 404 page.
- The post cannot be recovered after deletion.
- View statistics are lost.
- The slug becomes available for reuse.

### When to Delete vs. Unpublish

| Scenario | Action |
|----------|--------|
| Temporary content removal | Unpublish |
| Outdated content that may be updated later | Unpublish |
| Test posts or accidental duplicates | Delete |
| Content that should never have been created | Delete |
| Legally problematic content | Delete |

> **Tip:** Deletion is irreversible. When in doubt, unpublish instead. You can always delete an unpublished post later, but you cannot recover a deleted post.

---

## Image Upload for Cover Photos

The cover image upload component supports the following workflow:

### Upload Methods

1. **Click to Upload:** Click the upload area to open your file browser.
2. **Drag and Drop:** Drag an image file from your desktop directly onto the upload area.

### Upload Process

1. Select or drop your image file.
2. The upload progress bar appears.
3. Once complete, the image preview displays in the upload area.
4. The image URL is automatically saved with the post.

### Image Requirements

| Requirement | Value |
|-------------|-------|
| Formats | JPEG, PNG, WebP |
| Minimum dimensions | 600 x 315 pixels |
| Recommended dimensions | 1200 x 630 pixels |
| Maximum file size | 5 MB |
| Aspect ratio | 1.91:1 recommended (social media optimized) |

### Managing Uploaded Images

- **Replace:** Click the **Remove** button below the preview, then upload a new image.
- **Preview:** Click the image preview to see it full-size.
- **Alt text:** Enter descriptive alt text in the field below the image (important for accessibility and SEO).

### Image Optimization

Uploaded images are automatically:

- Compressed for web delivery (preserving quality).
- Served via CDN for fast loading.
- Converted to WebP format for browsers that support it.
- Resized to multiple dimensions for responsive display.

> **Tip:** Prepare your cover images at 1200 x 630 pixels before uploading. This is the optimal size for both the blog display and social media sharing (Open Graph).

---

## Frequently Asked Questions

**Q: Can multiple admins edit the same post?**
A: Yes, but there is no real-time collaboration. The last person to save overwrites previous changes. Coordinate with your team to avoid conflicts.

**Q: Is there a revision history?**
A: No. Each save overwrites the previous version. Copy important content elsewhere before making major changes.

**Q: Can I schedule a post to publish at a future date?**
A: Not currently. Posts are either drafts or immediately published. Save as draft and publish manually at the desired time.

**Q: What happens to SEO if I change a published post's slug?**
A: The old URL will return 404. Search engines will eventually deindex the old URL and index the new one. Avoid changing slugs on established posts.

**Q: Can I embed videos in blog posts?**
A: Yes, use the HTML source mode to embed video iframes from YouTube or Vimeo within the content area.

**Q: Is there a word or character limit for post content?**
A: There is no hard limit on content length. However, posts between 800-2000 words tend to perform best for SEO and reader engagement.
