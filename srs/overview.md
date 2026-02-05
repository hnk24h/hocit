# Technical Blog Static Website

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for building a technical blog website similar to hoclaptrinh.io using a static site architecture. The site focuses on publishing programming tutorials, articles, and code examples with strong SEO performance and minimal operating cost.

### 1.2 Scope

The system is a content-focused static website with:

- Article pages
- Category-based navigation
- Syntax-highlighted code blocks
- SEO optimization
- Responsive UI
- Optional monetization links (Buy Me a Coffee)
- No user authentication or backend server is required

## 2. Target Technology Stack

### 2.1 Frontend Framework (choose one)

- **Preferred**: Next.js (Static Generation)
- **Alternatives**: Astro, Hugo

### 2.2 Content Format

- Markdown (.md)
- MDX (.mdx) if using React components in content

### 2.3 Styling

- Tailwind CSS (preferred)
- Plain CSS (acceptable)

### 2.4 Code Highlighting

- PrismJS or Shiki

### 2.5 Deployment

- Vercel or Netlify (Free tier)
- Custom domain support

## 3. System Architecture Overview

```
Content (Markdown)
        ↓
Static Site Generator
        ↓
Pre-rendered HTML
        ↓
CDN Hosting (Vercel/Netlify)
```

## 4. Functional Requirements

### 4.1 Homepage

**Description:**  
The homepage displays a list of recent articles and navigation links.

**Requirements:**

- Display latest articles sorted by publish date (descending)
- Each article preview includes:
  - Title
  - Short description
  - Publish date
  - Category
- Responsive layout (desktop / tablet / mobile)

**Acceptance Criteria:**

- Page loads under 1s on average
- All articles are statically rendered

### 4.2 Article Page

**Description:**  
Displays a full tutorial/article similar to SQL tutorial pages.

**Requirements:**

- Render Markdown/MDX content
- Support headings (H1–H4)
- Support images
- Support tables
- Support inline code and code blocks
- Syntax highlighting for:
  - SQL
  - JavaScript
  - Bash
  - Other common languages

**Acceptance Criteria:**

- Code blocks are highlighted correctly
- Layout matches readable blog format
- No client-side data fetching required

### 4.3 Table of Contents (TOC)

**Description:**  
Auto-generated TOC based on headings in the article.

**Requirements:**

- Extract headings (H2, H3)
- Display TOC on article page (sidebar or top)
- Anchor links scroll smoothly

**Acceptance Criteria:**

- TOC updates automatically when headings change
- Clicking TOC links scrolls to correct section

### 4.4 Categories

**Description:**  
Articles are grouped by category (e.g. SQL, JavaScript, Backend).

**Requirements:**

- Each article has exactly one category
- Category page lists all articles in that category
- Category slug used in URL

**Acceptance Criteria:**

- `/category/sql` shows all SQL articles
- Category pages are statically generated

### 4.5 SEO

**Requirements:**

- Clean URL structure:
  - `/articles/sql-insert-statement`
- Meta tags:
  - `title`
  - `description`
  - `og:title`
  - `og:description`
- Sitemap.xml generation
- robots.txt

**Acceptance Criteria:**

- All pages indexed by search engines
- Lighthouse SEO score ≥ 90

### 4.6 Navigation

**Requirements:**

- Header navigation:
  - Home
  - Categories
  - About
- Footer:
  - Copyright
  - Buy Me a Coffee link

### 4.7 Buy Me a Coffee Integration

**Requirements:**

- External link button
- Optional embedded widget
- No payment logic inside the site

**Acceptance Criteria:**

- Button opens Buy Me a Coffee page in new tab

## 5. Content Management Requirements

### 5.1 Article Frontmatter

Each article must contain frontmatter:

```yaml
title: "SQL INSERT Statement"
description: "Learn how to use INSERT in SQL with examples"
date: "2026-02-05"
category: "SQL"
slug: "sql-insert-statement"
```

### 5.2 Content Rules

- Markdown must render deterministically
- No runtime CMS
- Content updates require rebuild & redeploy

## 6. Non-Functional Requirements

### 6.1 Performance

- Static generation only
- No server-side runtime dependencies
- CDN caching enabled

### 6.2 Security

- No user input forms
- No authentication
- No database

### 6.3 Cost

- Monthly cost: $0
- Annual cost: domain only

## 7. Project Structure (Reference)

```
/
├── content/
│   └── articles/
│       ├── sql-insert.md
│       └── js-array.md
├── pages/ or src/pages/
├── components/
│   ├── Layout
│   ├── Article
│   ├── TOC
│   └── CodeBlock
├── styles/
├── public/
├── next.config.js / astro.config.mjs
```

## 8. Out of Scope

- User authentication
- Comments system
- Database
- Admin panel
- Paid subscriptions

## 9. Future Enhancements (Optional)

- Search (client-side)
- Dark mode
- Related articles
- RSS feed
- Internationalization (i18n)

## 10. Success Criteria

- Fully static
- SEO friendly
- Easy content writing via Markdown
- Deployable via GitHub + CI/CD
- Compatible with Copilot code generation