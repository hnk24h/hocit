'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Category {
  slug: string
  name: string
  icon: string
  description?: string
  count: number
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      const data = await response.json()

      if (response.ok) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
      showMessage('error', 'Lỗi khi tải danh mục')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleCreate = () => {
    setCurrentCategory({
      slug: '',
      name: '',
      icon: '📁',
      description: '',
      count: 0,
    })
    setEditMode(true)
  }

  const handleEdit = (category: Category) => {
    setCurrentCategory(category)
    setEditMode(true)
  }

  const handleSave = async () => {
    if (!currentCategory) return

    try {
      const isNew = !categories.find(c => c.slug === currentCategory.slug)
      const method = isNew ? 'POST' : 'PUT'
      
      const response = await fetch('/api/admin/categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCategory),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('success', isNew ? 'Đã tạo danh mục' : 'Đã cập nhật danh mục')
        setEditMode(false)
        setCurrentCategory(null)
        loadCategories()
      } else {
        showMessage('error', data.error || 'Lỗi khi lưu')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      showMessage('error', 'Lỗi khi lưu danh mục')
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return

    try {
      const response = await fetch(`/api/admin/categories?slug=${slug}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('success', 'Đã xóa danh mục')
        loadCategories()
      } else {
        showMessage('error', data.error || 'Lỗi khi xóa')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      showMessage('error', 'Lỗi khi xóa danh mục')
    }
  }

  const updateField = (field: keyof Category, value: any) => {
    setCurrentCategory(prev => ({ ...prev, [field]: value }))
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/admin"
              className="text-brand-600 dark:text-brand-400 hover:underline mb-2 inline-block"
            >
              ← Quay lại Admin
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              📁 Quản lý Danh mục
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {categories.length} danh mục
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-gradient-primary text-white rounded-button font-semibold shadow-elevation-2 hover:shadow-elevation-3 hover:scale-105 transition-all"
          >
            + Thêm danh mục
          </button>
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

        {/* Edit Form */}
        {editMode && currentCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-card p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {categories.find(c => c.slug === currentCategory.slug) ? 'Chỉnh sửa' : 'Thêm'} danh mục
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={currentCategory.slug || ''}
                      onChange={(e) => updateField('slug', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-button bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="laptop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tên danh mục *
                    </label>
                    <input
                      type="text"
                      value={currentCategory.name || ''}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-button bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Laptop"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon (emoji)
                  </label>
                  <input
                    type="text"
                    value={currentCategory.icon || ''}
                    onChange={(e) => updateField('icon', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-button bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-2xl"
                    placeholder="💻"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Ví dụ: 💻 📚 ⚡ 🛠️ 🌐 🎨 📊
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={currentCategory.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-button bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Mô tả danh mục..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setEditMode(false)
                    setCurrentCategory(null)
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-button font-semibold hover:bg-gray-600 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-button font-semibold shadow-elevation-2 hover:shadow-elevation-3 transition-all"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.slug} className="card p-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {category.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Slug: {category.slug}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-button text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(category.slug)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-button text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Chưa có danh mục
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thêm danh mục đầu tiên của bạn
            </p>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-gradient-primary text-white rounded-button font-semibold shadow-elevation-2 hover:shadow-elevation-3 hover:scale-105 transition-all"
            >
              + Thêm danh mục
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
