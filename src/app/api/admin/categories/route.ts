import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CATEGORIES_FILE = path.join(process.cwd(), 'data', 'categories.json')

// GET - List all categories
export async function GET() {
  try {
    const fileContent = await readFile(CATEGORIES_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    return NextResponse.json({
      success: true,
      categories: data.categories || [],
      total: data.categories?.length || 0,
    })
  } catch (error) {
    console.error('Error loading categories:', error)
    return NextResponse.json(
      { error: 'Failed to load categories' },
      { status: 500 }
    )
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const newCategory = await request.json()

    // Read existing data
    const fileContent = await readFile(CATEGORIES_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    // Validate required fields
    if (!newCategory.slug || !newCategory.name) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, name' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const exists = data.categories?.some((c: any) => c.slug === newCategory.slug)
    if (exists) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      )
    }

    // Add new category
    if (!data.categories) data.categories = []
    data.categories.push({
      ...newCategory,
      icon: newCategory.icon || '📁',
      count: 0,
    })

    // Write back to file
    await writeFile(CATEGORIES_FILE, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      category: newCategory,
    })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

// PUT - Update category
export async function PUT(request: NextRequest) {
  try {
    const updatedCategory = await request.json()

    // Read existing data
    const fileContent = await readFile(CATEGORIES_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    // Find and update category
    const index = data.categories?.findIndex((c: any) => c.slug === updatedCategory.slug)
    if (index === -1 || index === undefined) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    data.categories[index] = updatedCategory

    // Write back to file
    await writeFile(CATEGORIES_FILE, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory,
    })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE - Delete category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      )
    }

    // Read existing data
    const fileContent = await readFile(CATEGORIES_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    // Filter out the category
    const initialLength = data.categories?.length || 0
    data.categories = data.categories?.filter((c: any) => c.slug !== slug) || []

    if (data.categories.length === initialLength) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Write back to file
    await writeFile(CATEGORIES_FILE, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
