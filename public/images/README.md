# Images Directory

## Structure

```
images/
  articles/          # Images for blog articles
    post-slug/       # One folder per article
      image1.png
      image2.jpg
  common/            # Shared images
    logo.png
    avatar.jpg
  og/                # Open Graph images for social sharing
```

## Usage in Markdown

```markdown
![Alt text](/images/articles/post-slug/image1.png)
```

## Guidelines

1. **File naming**: Use descriptive names with hyphens
   - ✅ `nextjs-installation-screenshot.png`
   - ❌ `IMG_1234.png`

2. **Optimization**: Compress images before adding
   - Use TinyPNG, ImageOptim, or similar tools
   - Target < 500KB per image

3. **Organization**: Create a folder per article
   ```bash
   mkdir public\images\articles\my-article-slug
   ```

4. **Format**: Prefer WebP or PNG for quality, JPG for photos

5. **Alt text**: Always include descriptive alt text for accessibility

## Alternative: External CDN

For large images or high traffic, consider:
- Imgur (free, unlimited)
- Cloudinary (25GB free tier)

See `docs/IMAGE_MANAGEMENT.md` for upload scripts.
