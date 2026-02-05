import { getAllArticlesMetadata, getAllCategories, getArticlesByCategory } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import NewsletterForm from '@/components/NewsletterForm'
import Link from 'next/link'

export default function Page() {
  const articles = getAllArticlesMetadata()
  const categories = getAllCategories()
  
  // Featured articles (top 3 most recent)
  const featuredArticles = articles.slice(0, 3)
  const remainingArticles = articles.slice(3)

  // Category icons and colors
  const categoryConfig: Record<string, { icon: string; color: string; bgColor: string }> = {
    'JavaScript': { icon: '⚡', color: 'text-yellow-700 dark:text-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' },
    'SQL': { icon: '🗄️', color: 'text-blue-700 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
    'React': { icon: '⚛️', color: 'text-cyan-700 dark:text-cyan-400', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800' },
    'Next.js': { icon: '▲', color: 'text-gray-900 dark:text-gray-100', bgColor: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' },
    'TypeScript': { icon: '📘', color: 'text-blue-700 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
    'Bash': { icon: '💻', color: 'text-green-700 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
    'Life': { icon: '🌸', color: 'text-pink-700 dark:text-pink-400', bgColor: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800' },
  }

  const getCategoryConfig = (category: string) => {
    return categoryConfig[category] || { 
      icon: '📁', 
      color: 'text-gray-700 dark:text-gray-400', 
      bgColor: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Ikagi</h1>
          <p className="text-xl text-slate-200 animate-slide-up">
            Học lập trình từ cơ bản đến nâng cao với các bài viết chất lượng
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 -mt-12">
        <NewsletterForm />
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            📚 Khám Phá Theo Chủ Đề
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Chọn chủ đề bạn yêu thích để tìm bài viết phù hợp
          </p>
        </div>

        {categories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const config = getCategoryConfig(category)
              const articleCount = getArticlesByCategory(category).length
              return (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category.toLowerCase())}`}
                  className={`${config.bgColor} rounded-xl p-6 border-2 hover:shadow-lg transition-all hover:scale-105 group`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {config.icon}
                    </div>
                    <h3 className={`font-bold text-lg mb-1 ${config.color}`}>
                      {category}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {articleCount} bài viết
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-800/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              ⭐ Bài Viết Nổi Bật
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Những bài viết mới nhất và đáng chú ý
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* All Articles Section */}
      {remainingArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              📝 Tất Cả Bài Viết
            </h2>
            <Link
              href="/categories"
              className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors"
            >
              Xem theo danh mục →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {articles.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Chưa có bài viết nào
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hãy thêm bài viết vào thư mục content/articles/
            </p>
          </div>
        </section>
      )}
    </main>
  )
}
