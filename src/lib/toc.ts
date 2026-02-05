export interface TocItem {
  id: string
  text: string
  level: number
}

/**
 * Extract headings from HTML content for TOC
 */
export function extractHeadings(html: string): TocItem[] {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '') // Remove any HTML tags
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Add IDs to headings in HTML
 */
export function addHeadingIds(html: string): string {
  return html.replace(/<h([23])[^>]*>(.*?)<\/h\1>/gi, (match, level, content) => {
    const text = content.replace(/<[^>]*>/g, '')
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    return `<h${level} id="${id}">${content}</h${level}>`
  })
}
