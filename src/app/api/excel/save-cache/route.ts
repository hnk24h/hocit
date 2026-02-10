import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    // Check if in production (Vercel has read-only filesystem)
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Caching not available in production. Files must be manually uploaded to public/pdfs/' },
        { status: 403 }
      )
    }

    const { url, arrayBuffer } = await request.json()

    if (!url || !arrayBuffer) {
      return NextResponse.json(
        { error: 'Missing url or arrayBuffer' },
        { status: 400 }
      )
    }

    // Create hash from URL to use as filename
    const urlHash = crypto.createHash('md5').update(url).digest('hex')
    const filename = `cached_${urlHash}.xlsx`

    // Save to public/pdfs folder
    const publicDir = path.join(process.cwd(), 'public', 'pdfs')
    
    // Create directory if not exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    const filePath = path.join(publicDir, filename)

    // Convert array to Buffer
    const buffer = Buffer.from(arrayBuffer)
    
    // Write file
    fs.writeFileSync(filePath, buffer)

    // Save URL mapping to JSON file
    const mappingPath = path.join(publicDir, 'excel-cache-mapping.json')
    let mapping: { [key: string]: string } = {}
    
    if (fs.existsSync(mappingPath)) {
      const content = fs.readFileSync(mappingPath, 'utf-8')
      mapping = JSON.parse(content)
    }

    mapping[url] = filename
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2))

    // Add to library automatically
    try {
      // Try to get title from URL or use filename
      const urlObj = new URL(url)
      let title = 'Cached Excel File'
      
      if (urlObj.hostname.includes('google.com')) {
        title = 'Google Sheets (Cached)'
      } else {
        title = urlObj.pathname.split('/').pop() || 'Excel File'
      }

      // Don't await - run in background
      fetch('http://localhost:3000/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          filename: `/pdfs/${filename}`,
          description: `Cached from: ${url.substring(0, 60)}...`,
          type: 'excel'
        })
      }).catch(err => console.log('Library add skipped:', err.message))
    } catch (libErr) {
      // Ignore library errors
      console.log('Library update skipped')
    }

    return NextResponse.json({
      success: true,
      filename,
      localPath: `/pdfs/${filename}`,
      message: 'File cached successfully'
    })
  } catch (error) {
    console.error('Cache save error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to cache file' },
      { status: 500 }
    )
  }
}

// Get cached file info for a URL
export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url')
    
    if (!url) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
    }

    // Check mapping file
    const mappingPath = path.join(process.cwd(), 'public', 'pdfs', 'excel-cache-mapping.json')
    
    if (!fs.existsSync(mappingPath)) {
      return NextResponse.json({ cached: false })
    }

    const content = fs.readFileSync(mappingPath, 'utf-8')
    const mapping = JSON.parse(content)

    if (mapping[url]) {
      const cachedPath = `/pdfs/${mapping[url]}`
      const fullPath = path.join(process.cwd(), 'public', cachedPath)
      
      // Check if file still exists
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath)
        return NextResponse.json({
          cached: true,
          localPath: cachedPath,
          filename: mapping[url],
          size: stats.size,
          cachedAt: stats.mtime
        })
      }
    }

    return NextResponse.json({ cached: false })
  } catch (error) {
    console.error('Cache check error:', error)
    return NextResponse.json({ cached: false, error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
