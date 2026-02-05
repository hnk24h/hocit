# Images for "Cuộc Sống Ở Nhật Bản" Article

## Current Images (Placeholder)

This article uses placeholder image paths. To add real images:

### Option 1: Upload to Imgur (Recommended)

```powershell
# Upload each image
.\scripts\upload-to-imgur.ps1 -ImagePath "your-photo.jpg"

# Replace the paths in the article with actual Imgur URLs
```

### Option 2: Add Local Images

1. Copy your images to this folder:
   - `tokyo-skyline.jpg` - Tokyo Tower or city view
   - `office.jpg` - Modern office in Tokyo
   - `ramen.jpg` - Ramen bowl photo
   - `shibuya-crossing.jpg` - Shibuya crossing
   - `konbini.jpg` - 7-Eleven or Lawson storefront
   - `sakura.jpg` - Cherry blossom scene

2. Images will be automatically available at:
   ```
   /images/articles/cuoc-song-o-nhat-ban/filename.jpg
   ```

### Suggested Images to Take/Find:

- [ ] Tokyo skyline with Tokyo Tower
- [ ] Modern IT office workspace
- [ ] Authentic ramen in a bowl
- [ ] Shibuya crossing (pedestrians)
- [ ] Convenience store exterior
- [ ] Cherry blossoms in spring

### Free Stock Photos:

- [Unsplash - Japan](https://unsplash.com/s/photos/japan)
- [Pexels - Tokyo](https://www.pexels.com/search/tokyo/)
- [Pixabay - Japanese](https://pixabay.com/images/search/japanese/)

### Alternative: Use Imgur URLs

If you want to keep the article lightweight without local images, upload to Imgur and update the markdown paths:

```markdown
![Alt text](https://i.imgur.com/abc123.jpg)
```
