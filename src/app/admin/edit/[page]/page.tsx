'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditPageContent() {
  const params = useParams()
  const router = useRouter()
  const pageName = params.page as string

  const [content, setContent] = useState<any>({})
  const [originalContent, setOriginalContent] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/verify')
      const data = await response.json()

      if (response.ok && data.authenticated) {
        setAuthenticated(true)
        loadPageContent()
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/admin/login')
    } finally {
      setChecking(false)
    }
  }

  const loadPageContent = async () => {
    try {
      const response = await fetch(`/api/pages/${pageName}`)
      const data = await response.json()

      if (response.ok) {
        setContent(data.content)
        setOriginalContent(data.content)
      } else {
        setMessage({ type: 'error', text: 'Không thể tải nội dung trang' })
      }
    } catch (error) {
      console.error('Error loading page:', error)
      setMessage({ type: 'error', text: 'Lỗi khi tải nội dung' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/pages/${pageName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Đã lưu thành công!' })
        setOriginalContent(content)
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Lỗi khi lưu' })
      }
    } catch (error) {
      console.error('Error saving:', error)
      setMessage({ type: 'error', text: 'Lỗi khi lưu nội dung' })
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setContent(originalContent)
    setMessage({ type: 'success', text: 'Đã khôi phục nội dung gốc' })
    setTimeout(() => setMessage(null), 2000)
  }

  const updateNestedValue = (path: string[], value: any) => {
    const newContent = JSON.parse(JSON.stringify(content))
    let current = newContent

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }
    current[path[path.length - 1]] = value

    setContent(newContent)
  }

  const renderField = (key: string, value: any, path: string[] = []) => {
    const currentPath = [...path, key]
    const pathString = currentPath.join('.')

    if (typeof value === 'string') {
      return (
        <div key={pathString} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {key}
          </label>
          {value.length > 100 ? (
            <textarea
              value={value}
              onChange={(e) => updateNestedValue(currentPath, e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-button bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => updateNestedValue(currentPath, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-button bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          )}
        </div>
      )
    }

    if (Array.isArray(value)) {
      return (
        <div key={pathString} className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 capitalize">
            {key}
          </h4>
          <div className="space-y-4 pl-4 border-l-2 border-brand-500">
            {value.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-button">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Item {index + 1}
                </div>
                {typeof item === 'object' && Object.entries(item).map(([k, v]) => 
                  renderField(k, v, [...currentPath, index.toString()])
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={pathString} className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 capitalize">
            {key}
          </h4>
          <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600">
            {Object.entries(value).map(([k, v]) => renderField(k, v, currentPath))}
          </div>
        </div>
      )
    }

    return null
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang xác thực...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Redirecting to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/admin"
              className="text-brand-600 dark:text-brand-400 hover:underline mb-2 inline-block"
            >
              ← Quay lại Admin
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
              Chỉnh sửa: {pageName}
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-500 text-white rounded-button font-semibold hover:bg-gray-600 transition-colors"
            >
              Khôi phục
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-3 rounded-button font-semibold transition-all ${
                saving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-primary text-white shadow-elevation-2 hover:shadow-elevation-3 hover:scale-105'
              }`}
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-button mb-6 ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Editor */}
        <div className="card p-8">
          {Object.entries(content).map(([key, value]) => renderField(key, value))}
        </div>

        {/* Preview Link */}
        <div className="mt-6 text-center">
          <a
            href={pageName === 'homepage' ? '/' : `/${pageName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 hover:underline"
          >
            👁️ Xem trang trước (mở tab mới)
          </a>
        </div>
      </div>
    </div>
  )
}
