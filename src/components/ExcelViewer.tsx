'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

interface ExcelViewerProps {
  fileUrl: string
}

// Convert Google Sheets URL to Excel export URL
function convertGoogleSheetsUrl(url: string): string {
  // Pattern 1: Edit URL - https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit...
  const editPattern = /docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/
  const editMatch = url.match(editPattern)
  
  if (editMatch) {
    const sheetId = editMatch[1]
    // Try export endpoint (may be blocked by CORS for non-published sheets)
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx&id=${sheetId}`
  }
  
  // Pattern 2: Published URL - https://docs.google.com/spreadsheets/d/e/{PUB_ID}/pub...
  const pubPattern = /docs\.google\.com\/spreadsheets\/d\/e\/([a-zA-Z0-9-_]+)\/pub/
  const pubMatch = url.match(pubPattern)
  
  if (pubMatch) {
    // Published sheets can be downloaded directly
    const pubId = pubMatch[1]
    return `https://docs.google.com/spreadsheets/d/e/${pubId}/pub?output=xlsx`
  }
  
  return url
}

export default function ExcelViewer({ fileUrl }: ExcelViewerProps) {
  const [sheets, setSheets] = useState<{ name: string; data: any[][] }[]>([])
  const [activeSheet, setActiveSheet] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [zoom, setZoom] = useState(100)
  const [editMode, setEditMode] = useState(false)
  const [editedData, setEditedData] = useState<{ [sheetIndex: number]: any[][] }>({})
  const [loadedFromCache, setLoadedFromCache] = useState(false)

  useEffect(() => {
    loadExcelFile()
  }, [fileUrl])

  const loadExcelFile = async () => {
    try {
      setLoading(true)
      setError('')

      // Convert Google Sheets URL if needed
      let processedUrl = convertGoogleSheetsUrl(fileUrl)
      console.log('Loading Excel from:', processedUrl)
      console.log('Original URL:', fileUrl)

      // Check if external URL (not local file)
      const isExternalUrl = processedUrl.startsWith('http://') || processedUrl.startsWith('https://')
      
      let arrayBuffer: ArrayBuffer | null = null
      let shouldCache = false
      let fromCache = false
      
      if (isExternalUrl) {
        // Check if file is already cached
        try {
          const cacheCheck = await fetch(`/api/excel/save-cache?url=${encodeURIComponent(fileUrl)}`)
          const cacheData = await cacheCheck.json()
          
          if (cacheData.cached && cacheData.localPath) {
            console.log('📦 Found cached file:', cacheData.localPath)
            // Load from cache
            const cachedResponse = await fetch(cacheData.localPath)
            if (cachedResponse.ok) {
              arrayBuffer = await cachedResponse.arrayBuffer()
              console.log('✅ Loaded from cache, size:', arrayBuffer.byteLength)
              fromCache = true
            }
          }
        } catch (cacheErr) {
          console.log('Cache check failed, will fetch from URL:', cacheErr)
        }

        // If not cached or cache failed, fetch from URL
        if (!arrayBuffer) {
          shouldCache = true
          
          // Try with proxy first
          try {
            const proxyUrl = `/api/proxy?url=${encodeURIComponent(processedUrl)}`
            console.log('Trying proxy:', proxyUrl)
            
            const proxyResponse = await fetch(proxyUrl)
            console.log('Proxy response status:', proxyResponse.status)
            
            if (proxyResponse.ok) {
              arrayBuffer = await proxyResponse.arrayBuffer()
              console.log('Loaded via proxy, size:', arrayBuffer.byteLength)
            } else {
              const errorData = await proxyResponse.json().catch(() => ({}))
              console.warn('Proxy failed:', errorData)
              throw new Error('Proxy request failed')
            }
          } catch (proxyErr) {
            console.warn('Proxy failed, trying direct fetch...', proxyErr)
            
            // Fallback: Try direct fetch (may fail due to CORS)
            try {
              const directResponse = await fetch(processedUrl, {
                mode: 'cors',
                credentials: 'omit',
              })
              
              if (directResponse.ok) {
                arrayBuffer = await directResponse.arrayBuffer()
                console.log('Loaded via direct fetch, size:', arrayBuffer.byteLength)
              } else {
                throw new Error(`Direct fetch failed: ${directResponse.status}`)
              }
            } catch (directErr) {
              console.error('Direct fetch also failed:', directErr)
              throw new Error(
                'Cannot load file. Google Sheets requires "Publish to web". ' +
                'Go to: File → Share → Publish to web → Publish (select Microsoft Excel format)'
              )
            }
          }
        }
      } else {
        // Local file - direct fetch
        const response = await fetch(processedUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        arrayBuffer = await response.arrayBuffer()
        console.log('Local file loaded, size:', arrayBuffer.byteLength)
      }
      
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error('File is empty or could not be downloaded')
      }
      
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      console.log('Workbook sheets:', workbook.SheetNames)

      if (workbook.SheetNames.length === 0) {
        throw new Error('No sheets found in the file')
      }

      const allSheets = workbook.SheetNames.map((name) => {
        const worksheet = workbook.Sheets[name]
        let data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][]
        
        // Normalize: ensure all rows have same number of columns (fix empty cell borders)
        if (data.length > 0) {
          const maxCols = Math.max(...data.map(row => row.length))
          data = data.map(row => {
            const normalizedRow = [...row]
            while (normalizedRow.length < maxCols) {
              normalizedRow.push('')
            }
            return normalizedRow
          })
        }
        
        return { name, data }
      })

      setSheets(allSheets)
      setEditedData({})
      setLoadedFromCache(fromCache)
      setLoading(false)

      // Cache file if it was fetched from external URL
      if (shouldCache && arrayBuffer) {
        try {
          console.log('💾 Caching file for future use...')
          const arrayData = Array.from(new Uint8Array(arrayBuffer))
          
          const cacheResponse = await fetch('/api/excel/save-cache', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: fileUrl,
              arrayBuffer: arrayData
            })
          })

          const cacheResult = await cacheResponse.json()
          if (cacheResult.success) {
            console.log('✅ File cached successfully:', cacheResult.localPath)
          } else {
            console.warn('⚠️ Caching failed:', cacheResult.error)
          }
        } catch (cacheErr) {
          console.warn('Cache save failed:', cacheErr)
          // Don't show error to user, caching is optional
        }
      }
    } catch (err) {
      console.error('Excel load error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load Excel file')
      setLoading(false)
    }
  }

  const getCurrentSheetData = () => {
    return editedData[activeSheet] || sheets[activeSheet]?.data || []
  }

  const handleCellEdit = (rowIndex: number, cellIndex: number, value: string) => {
    const currentData = getCurrentSheetData()
    const newData = currentData.map((row, rIdx) => 
      rIdx === rowIndex 
        ? row.map((cell, cIdx) => cIdx === cellIndex ? value : cell)
        : [...row]
    )
    
    setEditedData(prev => ({
      ...prev,
      [activeSheet]: newData
    }))
  }

  const exportToCSV = () => {
    if (sheets.length === 0) return

    const currentData = getCurrentSheetData()
    const sheet = sheets[activeSheet]
    const csv = currentData.map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${sheet.name}${editMode ? '_edited' : ''}.csv`
    a.click()
  }

  const exportToExcel = () => {
    if (sheets.length === 0) return

    const wb = XLSX.utils.book_new()
    
    sheets.forEach((sheet, index) => {
      const data = editedData[index] || sheet.data
      const ws = XLSX.utils.aoa_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, ws, sheet.name)
    })

    XLSX.writeFile(wb, `edited_${Date.now()}.xlsx`)
  }

  const saveChanges = () => {
    if (Object.keys(editedData).length === 0) {
      alert('Không có thay đổi nào để lưu')
      return
    }
    
    exportToExcel()
    alert('✅ File Excel đã được tải xuống!\n\n💡 Để sync lên Google Sheets:\n1. Mở Google Sheets\n2. File → Import → Upload\n3. Chọn file vừa tải xuống')
  }

  const currentData = getCurrentSheetData()

  const filteredData = searchQuery
    ? currentData.filter((row) =>
        row.some((cell) =>
          String(cell).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : currentData

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">Loading Excel file...</div>
      </div>
    )
  }

  if (error) {
    const isGoogleSheets = fileUrl.includes('docs.google.com/spreadsheets')
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="text-center max-w-2xl">
          <div className="text-red-500 mb-3 text-xl">❌ Không thể load file Excel</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{error}</p>
          
          {isGoogleSheets && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left space-y-3">
              <div>
                <p className="text-blue-900 dark:text-blue-100 font-semibold text-sm mb-2">
                  💡 Google Sheets có thể bị chặn bởi CORS policy
                </p>
                <p className="text-blue-800 dark:text-blue-200 text-xs mb-3">
                  Để đọc Google Sheets, bạn cần <strong>Publish to web</strong>:
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <p className="text-gray-900 dark:text-gray-100 font-medium text-xs mb-2">Hướng dẫn chi tiết:</p>
                <ol className="text-blue-800 dark:text-blue-200 text-xs space-y-1.5 list-decimal list-inside">
                  <li>Mở Google Sheets của bạn</li>
                  <li>Click <strong>File → Share → Publish to web</strong></li>
                  <li>Chọn <strong>"Entire Document"</strong> hoặc sheet cụ thể</li>
                  <li>Chọn format: <strong>"Web page"</strong> hoặc <strong>"Microsoft Excel (.xlsx)"</strong></li>
                  <li>Click <strong>"Publish"</strong></li>
                  <li>Copy link và paste vào đây</li>
                </ol>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                <p className="text-yellow-900 dark:text-yellow-100 font-semibold text-xs mb-1">
                  ⚠️ Alternative: Download Excel
                </p>
                <ol className="text-yellow-800 dark:text-yellow-200 text-xs space-y-1 list-decimal list-inside">
                  <li>File → Download → Microsoft Excel (.xlsx)</li>
                  <li>Upload file vào <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public/pdfs/</code></li>
                  <li>Mở từ Library</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2 sm:py-3 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Sheet Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {sheets.map((sheet, index) => (
              <button
                key={index}
                onClick={() => setActiveSheet(index)}
                className={`px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSheet === index
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                📄 {sheet.name}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {/* Cache Indicator */}
            {loadedFromCache && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-medium border border-green-300 dark:border-green-700">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cached</span>
              </div>
            )}

            {/* Edit Mode Toggle */}
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                editMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Bật/tắt chế độ chỉnh sửa"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="hidden sm:inline">{editMode ? 'Đang sửa' : 'Sửa'}</span>
            </button>

            {/* Save Button (visible when edited) */}
            {Object.keys(editedData).length > 0 && (
              <button
                onClick={saveChanges}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors"
                title="Lưu thay đổi"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span className="hidden sm:inline">Lưu Excel</span>
              </button>
            )}

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>

            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[45px] text-center">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            <button
              onClick={exportToCSV}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm trong sheet..."
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Sheet Content */}
      <div className="flex-1 overflow-auto p-2 sm:p-4">
        {editMode && (
          <div className="mb-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-blue-900 dark:text-blue-100 text-sm font-medium">
              ✏️ Chế độ chỉnh sửa: Click vào ô để sửa nội dung
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
              💡 Sau khi sửa xong, click "Lưu Excel" để tải file xuống, rồi upload lên Google Sheets
            </p>
          </div>
        )}
        
        {filteredData && filteredData.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="w-full border-collapse"
                style={{ fontSize: `${zoom}%` }}
              >
                <tbody>
                  {filteredData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex === 0 ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}
                    >
                      {row.map((cell, cellIndex) => {
                        const cellValue = String(cell || '')
                        
                        return editMode ? (
                          <td
                            key={cellIndex}
                            className="border border-gray-300 dark:border-gray-600 p-0"
                          >
                            <input
                              type="text"
                              value={cellValue}
                              onChange={(e) => handleCellEdit(rowIndex, cellIndex, e.target.value)}
                              className="w-full h-full px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 focus:bg-yellow-50 dark:focus:bg-yellow-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[80px]"
                              style={{ minHeight: '38px' }}
                            />
                          </td>
                        ) : (
                          <td
                            key={cellIndex}
                            className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 min-w-[80px]"
                            style={{ minHeight: '38px' }}
                          >
                            {cellValue}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            {searchQuery ? 'Không tìm thấy kết quả' : 'Sheet trống'}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span>{filteredData?.length || 0} rows × {filteredData?.[0]?.length || 0} columns</span>
            {Object.keys(editedData).length > 0 && (
              <span className="text-orange-600 dark:text-orange-400 font-medium">
                ⚠️ Có thay đổi chưa lưu
              </span>
            )}
          </div>
          <div>
            {editMode 
              ? '💡 Click "Lưu Excel" để tải file đã chỉnh sửa' 
              : loadedFromCache
                ? '⚡ File được load từ cache (nhanh hơn)'
                : '💡 Bật chế độ "Sửa" để chỉnh sửa dữ liệu'
            }
          </div>
        </div>
      </div>
    </div>
  )
}
