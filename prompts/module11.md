You are generating a **Giscus Comments module** for a static blog built with **Next.js (App Router, SSG)**.

## Goal
Add a reusable comment system using **Giscus (GitHub Discussions)** with zero backend.

## Requirements
- Use `@giscus/react`
- Comments are enabled only on article pages
- Each article maps to exactly one GitHub Discussion
- Discussion mapping is based on **article slug**
- Must work with **static site generation**
- No client-side data fetching except Giscus iframe itself

## Technical Constraints
- Next.js App Router
- TypeScript
- No server components for Giscus (must be client component)
- No database
- No authentication logic in the app

## Inputs
- `slug: string` (article slug, derived from frontmatter)
- `title: string` (article title)

## Expected Output
1. A reusable React component: `components/GiscusComments.tsx`
2. Component props:
   ```ts
   interface GiscusCommentsProps {
     slug: string;
     title: string;
     enabled?: boolean;
   }