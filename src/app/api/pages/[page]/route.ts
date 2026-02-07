import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PAGES_FILE = path.join(process.cwd(), 'data', 'pages-content.json')

// GET - Load page content
export async function GET(
  request: NextRequest,
  { params }: { params: { page: string } }
) {
  try {
    const fileContent = await readFile(PAGES_FILE, 'utf-8')
    const pagesData = JSON.parse(fileContent)
    
    const pageName = params.page
    const pageContent = pagesData[pageName]

    if (!pageContent) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      page: pageName,
      content: pageContent,
    })
  } catch (error) {
    console.error('Error loading page content:', error)
    return NextResponse.json(
      { error: 'Failed to load page content' },
      { status: 500 }
    )
  }
}

// PUT - Update page content
export async function PUT(
  request: NextRequest,
  { params }: { params: { page: string } }
) {
  try {
    const body = await request.json()
    const pageName = params.page

    // Read existing data
    const fileContent = await readFile(PAGES_FILE, 'utf-8')
    const pagesData = JSON.parse(fileContent)

    // Update page content
    pagesData[pageName] = body.content

    // Write back to file
    await writeFile(PAGES_FILE, JSON.stringify(pagesData, null, 2), 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'Page content updated successfully',
      page: pageName,
    })
  } catch (error) {
    console.error('Error updating page content:', error)
    return NextResponse.json(
      { error: 'Failed to update page content' },
      { status: 500 }
    )
  }
}
