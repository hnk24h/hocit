'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import MarkdownEditor from '@/components/MarkdownEditor'
import Link from 'next/link'
import { marked } from 'marked'

function EditorContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
  })
  const [content, setContent] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Load existing post if slug is provided
  useEffect(() => {
    if (slug) {
      loadPost(slug)
    }
  }, [slug])

  const loadPost = async (slug: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/load?slug=${slug}`)
      const data = await response.json()

      if (response.ok) {
        const post = data.post
        setFormData({
          title: post.title,
          slug: post.slug,
          date: post.date,
          category: post.category,
          description: post.description,
        })
        
        // Convert markdown to HTML for editor display
        const html = await marked.parse(post.content)
        setContent(html)
        setMarkdown(post.content)
        setMessage({ type: 'success', text: 'Post loaded successfully' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load post' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error while loading post' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    // Validate
    if (!formData.title || !formData.slug || !formData.category || !formData.description) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/posts/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          content: markdown,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `Post saved: ${data.slug}.md` })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save post' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error while saving post' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                ← Back to Blog
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {slug ? 'Edit Post' : 'New Post'}
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? 'Saving...' : 'Save Post'}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 py-6">
        {/* Frontmatter Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Frontmatter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="post-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="e.g., JavaScript, SQL, React"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Brief description for SEO"
              />
            </div>
          </div>
        </div>

        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: WYSIWYG Editor */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Editor</h2>
            <MarkdownEditor content={content} onChange={setMarkdown} />
          </div>

          {/* Right: Markdown Preview */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              Markdown Output
            </h2>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 p-6 min-h-[500px] max-h-[700px] overflow-auto">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                {markdown || 'Start typing to see markdown output...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EditorContent />
    </Suspense>
  )
}
