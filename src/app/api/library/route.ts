import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface PDFBook {
  title: string
  filename: string
  description?: string
  author?: string
  pages?: number
  thumbnail?: string
  type?: 'pdf' | 'excel'
  addedAt?: string
}

const LIBRARY_FILE = path.join(process.cwd(), 'data', 'library.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(LIBRARY_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Get initial library data
function getInitialLibrary(): PDFBook[] {
  return [
    {
      title: 'Sample PDF',
      filename: 'sample.pdf',
      description: 'A sample PDF book for testing',
      author: 'Author Name',
      type: 'pdf',
    },
    {
      title: 'Sample Excel - Báo cáo doanh số',
      filename: 'sample.xlsx',
      description: 'Bảng tính Excel với 3 sheets: Doanh số, Báo cáo tháng, Nhân viên',
      type: 'excel',
    },
    {
      title: 'Google Sheets Example - Students 1',
      filename: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
      description: 'Google public sample spreadsheet - Student roster data',
      type: 'excel',
    },
    {
      title: 'Google Sheets Example - Students 2',
      filename: 'https://docs.google.com/spreadsheets/d/1uoAxwHWWdBotikvcCuHfMPj9vZ6LKN3II8kfRNg8aHU/edit',
      description: 'Google public sample spreadsheet - Student roster data',
      type: 'excel',
    },
    {
      title: 'Japanese IT',
      filename: 'Japanese IT.xlsx',
      description: 'Japanese IT',
      type: 'excel',
    },
  ]
}

// GET: Read library data
export async function GET() {
  try {
    ensureDataDir()

    // If file doesn't exist, create with initial data
    if (!fs.existsSync(LIBRARY_FILE)) {
      const initialData = getInitialLibrary()
      fs.writeFileSync(LIBRARY_FILE, JSON.stringify(initialData, null, 2))
      return NextResponse.json(initialData)
    }

    const content = fs.readFileSync(LIBRARY_FILE, 'utf-8')
    const data = JSON.parse(content) as PDFBook[]
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Library GET error:', error)
    // Fallback to initial data if error
    return NextResponse.json(getInitialLibrary())
  }
}

// POST: Add new book to library
export async function POST(request: NextRequest) {
  try {
    ensureDataDir()

    const newBook = await request.json() as PDFBook

    if (!newBook.title || !newBook.filename) {
      return NextResponse.json(
        { error: 'Missing title or filename' },
        { status: 400 }
      )
    }

    // Read current library
    let library: PDFBook[] = []
    if (fs.existsSync(LIBRARY_FILE)) {
      const content = fs.readFileSync(LIBRARY_FILE, 'utf-8')
      library = JSON.parse(content)
    } else {
      library = getInitialLibrary()
    }

    // Check if already exists (by filename)
    const exists = library.some(book => book.filename === newBook.filename)
    if (exists) {
      return NextResponse.json(
        { error: 'Book already exists in library', exists: true },
        { status: 409 }
      )
    }

    // Add timestamp
    newBook.addedAt = new Date().toISOString()

    // Add to library
    library.unshift(newBook) // Add to beginning

    // Save
    fs.writeFileSync(LIBRARY_FILE, JSON.stringify(library, null, 2))

    return NextResponse.json({
      success: true,
      book: newBook,
      message: 'Book added to library'
    })
  } catch (error) {
    console.error('Library POST error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add book' },
      { status: 500 }
    )
  }
}

// DELETE: Remove book from library
export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json()

    if (!filename) {
      return NextResponse.json(
        { error: 'Missing filename' },
        { status: 400 }
      )
    }

    ensureDataDir()

    if (!fs.existsSync(LIBRARY_FILE)) {
      return NextResponse.json(
        { error: 'Library not found' },
        { status: 404 }
      )
    }

    const content = fs.readFileSync(LIBRARY_FILE, 'utf-8')
    let library = JSON.parse(content) as PDFBook[]

    // Remove book
    const originalLength = library.length
    library = library.filter(book => book.filename !== filename)

    if (library.length === originalLength) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    // Save
    fs.writeFileSync(LIBRARY_FILE, JSON.stringify(library, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Book removed from library'
    })
  } catch (error) {
    console.error('Library DELETE error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to remove book' },
      { status: 500 }
    )
  }
}
