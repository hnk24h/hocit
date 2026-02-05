# HocIT - Technical Blog

A modern, SEO-friendly static blog built with Next.js 14, focusing on programming tutorials and technical content.

## 🚀 Features

- ✅ **Static Site Generation** - Lightning fast with Next.js SSG
- ✅ **Markdown Content** - Write articles in Markdown with frontmatter
- ✅ **Syntax Highlighting** - PrismJS support for code blocks (SQL, JavaScript, Bash, etc.)
- ✅ **Table of Contents** - Auto-generated TOC with smooth scroll
- ✅ **Category System** - Organize articles by categories
- ✅ **Comments System** - Giscus (GitHub Discussions) integration
- ✅ **SEO Optimized** - Meta tags, sitemap.xml, robots.txt
- ✅ **Responsive Design** - Mobile-first with Tailwind CSS
- ✅ **Zero Cost Hosting** - Deploy to Vercel/Netlify for free

## 📁 Project Structure

```
hocit/
├── content/
│   └── articles/          # Markdown articles
│       ├── sql-insert-statement.md
│       ├── javascript-array-methods.md
│       └── bash-scripting-basics.md
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx     # Homepage
│   │   ├── articles/[slug]/  # Article pages
│   │   ├── category/[slug]/  # Category pages
│   │   └── about/       # About page
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ArticleCard.tsx
│   │   └── TableOfContents.tsx
│   ├── lib/            # Utilities
│   │   ├── articles.ts  # Article loading functions
│   │   ├── markdown.ts  # Markdown processing
│   │   └── toc.ts      # TOC generation
│   └── types/          # TypeScript types
│       └── article.ts
├── public/             # Static assets
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter
- **Syntax Highlighting**: PrismJS
- **Deployment**: Vercel / Netlify

## 📝 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Giscus Comments (optional)
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

> See [Giscus Setup Guide](docs/GISCUS_SETUP.md) for detailed instructions on setting up comments.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 4. Build for Production

```bash
npm run build
```

## ✍️ Writing Articles

Create a new Markdown file in `content/articles/`:

```markdown
---
title: "Your Article Title"
description: "Article description for SEO"
date: "2026-02-05"
category: "JavaScript"
slug: "your-article-slug"
---

## Your Content Here

Write your article content in Markdown...

\`\`\`javascript
// Code blocks with syntax highlighting
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
```

### Frontmatter Fields

- **title**: Article title (required)
- **description**: Short description for SEO (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **category**: Article category (required)
- **slug**: URL slug (required)

## 🎨 Customization

### Change Site Branding

Edit `src/app/layout.tsx` for site metadata.

### Modify Colors

Edit `tailwind.config.js` to customize the color scheme.

### Add New Categories

Just use the category name in article frontmatter. Categories are generated automatically.

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_SITE_URL`
4. Deploy!

### Deploy to Netlify

1. Push code to GitHub
2. Import project on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `out`
5. Set environment variable: `NEXT_PUBLIC_SITE_URL`

## 📄 License

MIT

## 🙏 Support

If you find this project helpful, consider buying me a coffee! ☕

[Buy Me a Coffee](https://www.buymeacoffee.com/hocit)
