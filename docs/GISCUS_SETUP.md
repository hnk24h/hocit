# Cấu hình Giscus Comments

Hướng dẫn cài đặt hệ thống bình luận Giscus cho blog.

## Yêu cầu

1. **GitHub Repository công khai** (hoặc private với Discussions enabled)
2. **GitHub Discussions** đã được kích hoạt
3. **Giscus app** đã được cài đặt trên repository

## Bước 1: Cài đặt Giscus App

1. Truy cập https://github.com/apps/giscus
2. Click **Install**
3. Chọn repository bạn muốn sử dụng
4. Cho phép quyền truy cập

## Bước 2: Kích hoạt GitHub Discussions

1. Vào repository của bạn trên GitHub
2. Vào **Settings** → **General**
3. Scroll xuống phần **Features**
4. Tích chọn **Discussions**

## Bước 3: Tạo Discussion Category

1. Vào tab **Discussions** trong repository
2. Click biểu tượng bánh răng (⚙️) bên cạnh **Categories**
3. Click **New category**
4. Tạo category mới (ví dụ: "Blog Comments")
5. Chọn format là **Announcement** (quan trọng!)

## Bước 4: Lấy thông tin cấu hình

1. Truy cập https://giscus.app/
2. Điền thông tin repository của bạn (username/repo)
3. Chọn Discussion Category bạn vừa tạo
4. Trong phần **Discussion Mapping**, chọn **specific term**
5. Copy các giá trị sau từ code snippet được tạo:
   - `data-repo` → `NEXT_PUBLIC_GISCUS_REPO`
   - `data-repo-id` → `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `data-category` → `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `data-category-id` → `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## Bước 5: Cấu hình Environment Variables

### Development (Local)

Tạo file `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Giscus Comments
NEXT_PUBLIC_GISCUS_REPO=username/repo-name
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Blog Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxxx
```

### Production (Vercel/Netlify)

Thêm environment variables vào deployment platform:

**Vercel:**
1. Vào project settings
2. Environment Variables
3. Thêm các biến trên

**Netlify:**
1. Site settings
2. Build & deploy
3. Environment
4. Thêm các biến trên

## Bước 6: Test

1. Build và chạy project:
   ```bash
   npm run build
   npm run dev
   ```

2. Mở bất kỳ article nào
3. Scroll xuống cuối trang
4. Bạn sẽ thấy widget Giscus comments

## Tùy chỉnh

Bạn có thể tùy chỉnh component `GiscusComments.tsx`:

```tsx
<Giscus
  // ... other props
  theme="dark" // Thay đổi theme
  lang="en" // Thay đổi ngôn ngữ
  reactionsEnabled="0" // Tắt reactions
/>
```

## Các theme có sẵn

- `light` (default)
- `dark`
- `preferred_color_scheme` (auto)
- `dark_dimmed`
- `transparent_dark`
- `noborder_light`
- `noborder_dark`

## Troubleshooting

### Comments không hiển thị

1. Kiểm tra repository có public không
2. Kiểm tra Discussions đã được enable
3. Kiểm tra Giscus app đã được cài đặt
4. Kiểm tra environment variables đã đúng

### Lỗi "Discussion not found"

- Discussion sẽ được tự động tạo khi có comment đầu tiên
- Đảm bảo category type là "Announcement"

### Comments bị duplicate

- Mỗi slug ánh xạ đến một discussion
- Nếu thay đổi slug, comments cũ sẽ không hiển thị

## Tắt comments cho article cụ thể

Thêm vào frontmatter của article:

```yaml
---
title: "My Article"
commentsEnabled: false
---
```

Sau đó update article page để truyền prop:

```tsx
<GiscusComments 
  slug={article.slug} 
  title={article.title}
  enabled={article.commentsEnabled !== false}
/>
```

## Lợi ích của Giscus

- ✅ **Miễn phí 100%** - GitHub-powered
- ✅ **Không cần backend** - Tích hợp trực tiếp
- ✅ **GitHub authentication** - Người dùng login qua GitHub
- ✅ **Moderation** - Quản lý comments qua GitHub Discussions
- ✅ **Markdown support** - Full markdown trong comments
- ✅ **Reactions** - Emoji reactions
- ✅ **SEO friendly** - Comments được index bởi search engines

## Resources

- [Giscus Official Site](https://giscus.app/)
- [Giscus GitHub](https://github.com/giscus/giscus)
- [@giscus/react Documentation](https://github.com/giscus/giscus-component)
