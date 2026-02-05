---
title: "Xây Dựng Static Blog với Next.js 14 - Hướng Dẫn Chi Tiết"
description: "Hướng dẫn từng bước xây dựng một hệ thống blog tĩnh hoàn chỉnh với Next.js 14, Markdown, PrismJS và Giscus comments. Deploy miễn phí trên Vercel."
date: "2026-02-05"
category: "web-development"
slug: "build-static-blog-nextjs-14"
---

# Xây Dựng Static Blog với Next.js 14 - Hướng Dẫn Chi Tiết

Bạn muốn xây dựng một blog cá nhân nhanh, SEO-friendly và hoàn toàn miễn phí? Trong bài viết này, tôi sẽ hướng dẫn chi tiết cách build hệ thống blog giống **Ikagi** - từ setup đến deployment.

## 🎯 Tổng Quan Hệ Thống

### Tính Năng Chính
- ✅ Static Site Generation (SSG) - tốc độ load cực nhanh
- ✅ Viết bài bằng Markdown
- ✅ Syntax highlighting cho code blocks
- ✅ Table of Contents tự động
- ✅ Phân loại theo categories
- ✅ Comments với Giscus (GitHub Discussions)
- ✅ SEO optimization (sitemap, robots.txt, meta tags)
- ✅ Responsive design
- ✅ Deploy miễn phí trên Vercel

### Tech Stack
```
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Markdown (gray-matter + remark)
- PrismJS (syntax highlighting)
- Giscus (comments)
```

## 📦 Bước 1: Setup Project

### 1.1 Khởi Tạo Next.js Project

```bash
npx create-next-app@latest my-blog --typescript --tailwind --app
cd my-blog
```

### 1.2 Cài Đặt Dependencies

```bash
npm install gray-matter remark remark-html prismjs @giscus/react
npm install --save-dev @types/prismjs
```

### 1.3 Cấu Hình `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
```

**Giải thích:**
- `output: 'export'` - export ra static files
- `images.unoptimized` - không optimize images (cần cho static export)
- `trailingSlash: true` - thêm trailing slash vào URLs

## 📝 Bước 2: Content System

### 2.1 Cấu Trúc Thư Mục

```
content/
  articles/
    my-first-post.md
    javascript-tips.md
```

### 2.2 Format Markdown File

```markdown
---
title: "Tiêu đề bài viết"
description: "Mô tả ngắn"
date: "2026-02-05"
category: "javascript"
slug: "javascript-tips"
---

# Nội dung bài viết

Viết nội dung ở đây...

\`\`\`javascript
const hello = () => console.log('Hello World');
\`\`\`
```

### 2.3 Content Loader - `src/lib/articles.ts`

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  category: string;
  slug: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}

// Lấy tất cả slugs (cho static generation)
export function getAllArticleSlugs(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// Lấy 1 bài viết theo slug
export function getArticleBySlug(slug: string): Article {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    content,
  };
}

// Lấy tất cả metadata (cho homepage)
export function getAllArticlesMetadata(): ArticleMetadata[] {
  const slugs = getAllArticleSlugs();
  const articles = slugs.map(slug => {
    const article = getArticleBySlug(slug);
    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.date,
      category: article.category,
    };
  });

  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
```

## 🎨 Bước 3: Article Detail Page

### 3.1 Dynamic Route - `src/app/articles/[slug]/page.tsx`

```typescript
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';
import { markdownToHtml } from '@/lib/markdown';
import PrismLoader from '@/components/PrismLoader';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ArticlePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const article = getArticleBySlug(params.slug);
  const htmlContent = await markdownToHtml(article.content);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="text-gray-600">
          <time>{article.date}</time> • {article.category}
        </div>
      </header>

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <PrismLoader />
    </article>
  );
}
```

### 3.2 Markdown to HTML - `src/lib/markdown.ts`

```typescript
import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown);
  
  return result.toString();
}
```

## 🎨 Bước 4: Syntax Highlighting

### 4.1 TypeScript Declarations - `src/types/prism.d.ts`

```typescript
declare module 'prismjs' {
  export const highlightAll: () => void;
}

declare module 'prismjs/components/prism-javascript' {}
declare module 'prismjs/components/prism-typescript' {}
declare module 'prismjs/components/prism-python' {}
declare module 'prismjs/components/prism-bash' {}
declare module 'prismjs/components/prism-sql' {}
declare module 'prismjs/components/prism-json' {}
```

### 4.2 Prism Loader - `src/components/PrismLoader.tsx`

```typescript
'use client';

import { useEffect } from 'react';

export default function PrismLoader() {
  useEffect(() => {
    const loadPrism = async () => {
      // @ts-ignore
      const Prism = (await import('prismjs')).default;
      
      // Load languages
      // @ts-ignore
      await import('prismjs/components/prism-javascript');
      // @ts-ignore
      await import('prismjs/components/prism-typescript');
      // @ts-ignore
      await import('prismjs/components/prism-python');
      // @ts-ignore
      await import('prismjs/components/prism-bash');
      
      Prism.highlightAll();
    };

    loadPrism();
  }, []);

  return null;
}
```

### 4.3 Prism CSS - `src/app/prism-tomorrow.css`

Download theme từ [PrismJS themes](https://github.com/PrismJS/prism-themes) và import vào `layout.tsx`:

```typescript
import './prism-tomorrow.css';
```

## 📚 Bước 5: Table of Contents

### 5.1 TOC Generator - `src/lib/toc.ts`

```typescript
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function generateToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, text, level });
  }

  return toc;
}
```

### 5.2 TOC Component - `src/components/TableOfContents.tsx`

```typescript
'use client';

import { TocItem } from '@/lib/toc';

export default function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav className="sticky top-24">
      <h3 className="font-bold mb-4">Mục lục</h3>
      <ul className="space-y-2">
        {items.map(item => (
          <li 
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
          >
            <a 
              href={`#${item.id}`}
              className="text-gray-600 hover:text-blue-600"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

## 💬 Bước 6: Comments với Giscus

### 6.1 Setup Giscus

1. Vào [giscus.app](https://giscus.app/)
2. Enable Discussions trên GitHub repo
3. Lấy config values

### 6.2 Environment Variables - `.env.local`

```bash
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

### 6.3 Giscus Component - `src/components/GiscusComments.tsx`

```typescript
'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return (
    <div className="mt-12">
      <Giscus
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="vi"
      />
    </div>
  );
}
```

## 🔍 Bước 7: SEO Optimization

### 7.1 Sitemap - `src/app/sitemap.ts`

```typescript
import { getAllArticleSlugs } from '@/lib/articles';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikagi.site';
  const slugs = getAllArticleSlugs();

  const articles = slugs.map(slug => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articles,
  ];
}
```

### 7.2 Robots.txt - `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikagi.site';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### 7.3 Metadata - `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://ikagi.site'),
  title: {
    default: 'Ikagi - Học Lập Trình',
    template: '%s | Ikagi',
  },
  description: 'Blog học lập trình từ cơ bản đến nâng cao',
  authors: [{ name: 'Ikagi' }],
  creator: 'Ikagi',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Ikagi',
  },
};
```

## 🚀 Bước 8: Deployment

### 8.1 Chuẩn Bị Deploy

```bash
# Test build local
npm run build

# Kiểm tra output
ls out/
```

### 8.2 Deploy lên Vercel

1. Push code lên GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

2. Vào [Vercel](https://vercel.com/):
   - New Project
   - Import GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `out`

3. Add Environment Variables:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

4. Deploy!

### 8.3 Custom Domain

1. Mua domain (Porkbun, Namecheap, Cloudflare)
2. Thêm domain trong Vercel Settings
3. Cấu hình DNS:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📝 Bước 9: Viết Bài Viết Mới

### 9.1 Tạo File Markdown

```bash
# Tạo file mới
touch content/articles/my-new-post.md
```

### 9.2 Viết Nội Dung

```markdown
---
title: "Tiêu đề bài viết"
description: "Mô tả ngắn gọn"
date: "2026-02-05"
category: "javascript"
slug: "my-new-post"
---

# Heading 1

Nội dung bài viết...

## Subheading

Code example:

\`\`\`javascript
const hello = () => console.log('Hello');
\`\`\`
```

### 9.3 Deploy

```bash
git add .
git commit -m "Add new post"
git push
```

Vercel sẽ tự động build và deploy!

## 🎯 Best Practices

### Performance
- ✅ Sử dụng Static Generation thay vì Server-Side Rendering
- ✅ Lazy load PrismJS chỉ khi cần
- ✅ Optimize images với Next.js Image component (nếu không dùng static export)
- ✅ Minify CSS và JavaScript

### SEO
- ✅ Sử dụng semantic HTML
- ✅ Thêm meta tags đầy đủ
- ✅ Tạo sitemap.xml và robots.txt
- ✅ Sử dụng structured data (JSON-LD)

### Content Management
- ✅ Đặt tên file markdown rõ ràng
- ✅ Sử dụng frontmatter chuẩn
- ✅ Viết description hấp dẫn
- ✅ Phân loại category hợp lý

### Development
- ✅ Sử dụng TypeScript cho type safety
- ✅ Component hóa UI
- ✅ Reusable utilities
- ✅ Consistent code style

## 📊 Kết Quả

Sau khi hoàn thành, bạn sẽ có:

✅ **Blog tĩnh cực nhanh** - Load time < 1s  
✅ **100% miễn phí** - Vercel free tier  
✅ **SEO-friendly** - Sitemap, meta tags, semantic HTML  
✅ **Developer-friendly** - Viết bài bằng Markdown  
✅ **Modern UI** - Tailwind CSS responsive design  
✅ **Interactive** - Comments, TOC, syntax highlighting  

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Giscus Setup](https://giscus.app/)
- [PrismJS Themes](https://prismjs.com/)
- [Markdown Guide](https://www.markdownguide.org/)

## 💡 Kết Luận

Xây dựng một static blog với Next.js 14 không hề khó và mang lại rất nhiều lợi ích:

- **Performance**: Static files load cực nhanh
- **SEO**: Google love static sites
- **Cost**: Hoàn toàn miễn phí
- **Maintenance**: Đơn giản, ít bug
- **Scalability**: Handle hàng triệu requests

Hãy thử build blog của riêng bạn và share kiến thức với cộng đồng! 🚀

---

**Tags:** #nextjs #static-site #blog #markdown #vercel #typescript #tailwindcss

**Source Code:** [GitHub Repository](https://github.com/hnk24h/hocit)
