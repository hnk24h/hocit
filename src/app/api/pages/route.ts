import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PAGES_FILE = path.join(process.cwd(), 'data', 'pages-content.json')

// GET - List all pages
export async function GET() {
  try {
    const fileContent = await readFile(PAGES_FILE, 'utf-8')
    const pagesData = JSON.parse(fileContent)
    
    const pages = Object.keys(pagesData).map(key => ({
      name: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }))

    return NextResponse.json({
      success: true,
      pages,
    })
  } catch (error) {
    console.error('Error listing pages:', error)
    return NextResponse.json(
      { error: 'Failed to list pages' },
      { status: 500 }
    )
  }
}
