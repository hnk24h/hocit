import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles'
import { markdownToHtml } from '@/lib/markdown'
import { extractHeadings, addHeadingIds } from '@/lib/toc'
import TableOfContents from '@/components/TableOfContents'
import PrismLoader from '@/components/PrismLoader'
import GiscusComments from '@/components/GiscusComments'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  let contentHtml = await markdownToHtml(article.content || '')
  contentHtml = addHeadingIds(contentHtml)
  const headings = extractHeadings(contentHtml)

  return (
    <main className="min-h-screen">
      <PrismLoader />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            {/* Article Header */}
            <header className="mb-8">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {article.description}
              </p>
              <time className="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-red-600 prose-pre:bg-gray-900 prose-pre:text-gray-100"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Comments Section */}
            <GiscusComments slug={article.slug} title={article.title} />
          </article>

          {/* Table of Contents - Sticky Sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-8">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  )
}
