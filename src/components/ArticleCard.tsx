import Link from 'next/link'
import { ArticleMetadata } from '@/types/article'

interface ArticleCardProps {
  article: ArticleMetadata
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <Link href={`/articles/${article.slug}`}>
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {article.category}
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {article.description}
        </p>
        <time className="text-sm text-gray-500">
          {new Date(article.date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </Link>
    </article>
  )
}
