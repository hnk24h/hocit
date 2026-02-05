# Image Management Guide

## 📂 Cấu Trúc Thư Mục

```
public/
  images/
    articles/          # Images cho từng bài viết
      my-post/
        screenshot-1.png
        diagram.jpg
    common/            # Images dùng chung
      logo.png
      avatar.jpg
```

## 🎯 3 Cách Lưu Images

### 1. Local Storage (Trong Project)

**Khi nào dùng:**
- Ảnh quan trọng (diagrams, screenshots)
- Ảnh nhỏ < 500KB
- Muốn đảm bảo ảnh không bao giờ mất

**Cách sử dụng:**

1. Copy ảnh vào thư mục:
```bash
# Tạo folder cho bài viết
mkdir public\images\articles\my-post

# Copy ảnh vào
copy screenshot.png public\images\articles\my-post\
```

2. Sử dụng trong Markdown:
```markdown
![Screenshot](/images/articles/my-post/screenshot.png)
```

**Ưu điểm:**
✅ Tốc độ nhanh nhất
✅ SEO tốt
✅ Không phụ thuộc bên thứ 3
✅ Miễn phí

**Nhược điểm:**
❌ Tăng kích thước repo
❌ Phải commit images

---

### 2. Imgur Upload (Đơn Giản Nhất)

**Khi nào dùng:**
- Ảnh lớn > 500KB
- Không muốn commit ảnh vào git
- Cần upload nhanh

**Cách sử dụng:**

```powershell
# Upload ảnh
.\scripts\upload-to-imgur.ps1 -ImagePath "path\to\image.jpg"

# URL sẽ tự động copy vào clipboard
# Paste vào markdown file
```

**Ưu điểm:**
✅ Cực kỳ đơn giản
✅ Không cần đăng ký
✅ Miễn phí không giới hạn
✅ Script tự động copy markdown syntax

**Nhược điểm:**
❌ Không control được ảnh
❌ Có thể bị xóa (hiếm)

---

### 3. Cloudinary (Professional)

**Khi nào dùng:**
- Production site với traffic cao
- Cần optimize ảnh tự động
- Cần resize on-the-fly
- Cần transform ảnh

**Setup:**

1. Đăng ký [Cloudinary](https://cloudinary.com/) (Free tier: 25GB/tháng)

2. Thêm credentials vào `.env.local`:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Upload ảnh:
```powershell
.\scripts\upload-to-cloudinary.ps1 -ImagePath "path\to\image.jpg" -Folder "articles/my-post"
```

**Ưu điểm:**
✅ Auto optimization
✅ Global CDN
✅ Transform API
✅ Analytics

**Nhược điểm:**
❌ Cần setup account
❌ Có giới hạn bandwidth (25GB free)

---

## 🚀 Quick Start Examples

### Example 1: Upload và Sử Dụng Local Image

```powershell
# Copy ảnh vào project
copy my-screenshot.png public\images\articles\nextjs-tutorial\

# Trong markdown file
![Next.js Dashboard](/images/articles/nextjs-tutorial/my-screenshot.png)
```

### Example 2: Upload lên Imgur

```powershell
# Upload
.\scripts\upload-to-imgur.ps1 -ImagePath "my-photo.jpg"

# Output:
# Success! Image uploaded to Imgur
# URL: https://i.imgur.com/abc123.png
# Markdown syntax copied to clipboard!

# Paste vào markdown (Ctrl+V)
![My Photo](https://i.imgur.com/abc123.png)
```

### Example 3: Upload lên Cloudinary

```powershell
# Upload vào folder articles/python-guide
.\scripts\upload-to-cloudinary.ps1 -ImagePath "diagram.png" -Folder "articles/python-guide"

# URL tự động copy vào clipboard
```

---

## 📊 So Sánh

| Feature | Local | Imgur | Cloudinary |
|---------|-------|-------|------------|
| Setup | ⭐⭐⭐ Dễ | ⭐⭐⭐ Dễ | ⭐⭐ Trung bình |
| Speed | ⭐⭐⭐ Nhanh | ⭐⭐ Tốt | ⭐⭐⭐ Rất nhanh |
| Cost | 💰 Free | 💰 Free | 💰 Free (25GB) |
| Reliability | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Control | ⭐⭐⭐ Full | ⭐ Ít | ⭐⭐⭐ Full |
| Features | ⭐ Basic | ⭐ Basic | ⭐⭐⭐ Advanced |

---

## 💡 Best Practices

### 1. Optimize Images Trước Khi Upload

```powershell
# Sử dụng TinyPNG hoặc ImageOptim
# Compress ảnh trước khi upload
```

### 2. Đặt Tên File Rõ Ràng

```
❌ IMG_1234.png
❌ screenshot.png
✅ nextjs-installation-ubuntu.png
✅ python-data-structure-diagram.png
```

### 3. Organize Theo Bài Viết

```
public/images/articles/
  nextjs-tutorial/
    step-1-install.png
    step-2-config.png
  python-guide/
    syntax-example.png
```

### 4. Alt Text Descriptive

```markdown
❌ ![image](url)
✅ ![Next.js installation terminal output on Ubuntu](url)
```

### 5. Responsive Images (Advanced)

```markdown
<!-- Sử dụng Cloudinary transform -->
![Screenshot](https://res.cloudinary.com/account/image/upload/w_800,f_auto,q_auto/my-image.jpg)
```

---

## 🛠️ Troubleshooting

### Imgur Upload Fails
```powershell
# Kiểm tra kích thước file (max 10MB cho free)
# Kiểm tra format: PNG, JPG, GIF

# Retry với timeout cao hơn
$PSDefaultParameterValues['Invoke-RestMethod:TimeoutSec']=300
.\scripts\upload-to-imgur.ps1 -ImagePath "large-image.jpg"
```

### Cloudinary Upload Fails
```powershell
# Kiểm tra credentials
Get-Content .env.local | Select-String "CLOUDINARY"

# Test API key
curl https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
```

### Local Image Not Showing
```markdown
# Đảm bảo path bắt đầu với /
❌ ![Alt](images/photo.png)
✅ ![Alt](/images/photo.png)

# Kiểm tra file tồn tại
Test-Path public\images\photo.png
```

---

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Imgur API](https://apidocs.imgur.com/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [TinyPNG](https://tinypng.com/) - Compress images online

---

## 🎯 Recommended Strategy

**Cho Blog Ikagi:**

1. **Screenshots, diagrams** → Local (`public/images/articles/`)
2. **Large images** → Imgur (script upload)
3. **Production với nhiều traffic** → Migrate to Cloudinary

**Workflow:**

```powershell
# Viết bài mới
New-Item content\articles\my-post.md

# Upload ảnh
.\scripts\upload-to-imgur.ps1 -ImagePath screenshots\demo.png

# Paste URL vào markdown (Ctrl+V)
# Done!
```

Simple, fast, và hoàn toàn miễn phí! 🚀
