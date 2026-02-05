import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Article, ArticleMetadata } from '@/types/article'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

/**
 * Get all article slugs for static generation
 */
export function getAllArticleSlugs(): string[] {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return []
    }
    const fileNames = fs.readdirSync(articlesDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading articles directory:', error)
    return []
  }
}

/**
 * Get article metadata only (without content)
 */
export function getArticleMetadata(slug: string): ArticleMetadata | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || '',
      slug: data.slug || slug,
    }
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error)
    return null
  }
}

/**
 * Get full article with content
 */
export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || '',
      slug: data.slug || slug,
      content,
    }
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error)
    return null
  }
}

/**
 * Get all articles sorted by date (descending)
 */
export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs()
  const articles = slugs
    .map(slug => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  
  return articles
}

/**
 * Get all articles metadata only (for listing pages)
 */
export function getAllArticlesMetadata(): ArticleMetadata[] {
  const slugs = getAllArticleSlugs()
  const articles = slugs
    .map(slug => getArticleMetadata(slug))
    .filter((article): article is ArticleMetadata => article !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  
  return articles
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const articles = getAllArticlesMetadata()
  const categories = new Set(articles.map(article => article.category))
  return Array.from(categories).sort()
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: string): ArticleMetadata[] {
  const allArticles = getAllArticlesMetadata()
  return allArticles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  )
}
