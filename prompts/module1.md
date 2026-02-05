You are building a static blog content system.

Generate code to:
- Load Markdown/MDX files from `/content/articles`
- Parse frontmatter fields:
  - title
  - description
  - date
  - category
  - slug
- Return sorted articles by date (descending)
- Work at build time only

Constraints:
- No runtime fetching
- No CMS
- Compatible with static generation

Provide clean, reusable utility functions.