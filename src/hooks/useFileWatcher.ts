import { useState, useEffect, useRef } from 'react'
import financeManifest from '../generated/financeManifest.json'

export interface DetectedFile {
  name: string
  path: string
  displayName: string
  type: 'pdf' | 'ppt' | 'pptx' | 'doc' | 'docx'
  size: number
  lastModified: Date
}

export const useFileWatcher = (watchPath: string) => {
  const [files, setFiles] = useState<DetectedFile[]>([])
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const initialLoadRef = useRef(true)

  const getFileType = (filename: string): DetectedFile['type'] => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf': return 'pdf'
      case 'ppt': return 'ppt'
      case 'pptx': return 'pptx'
      case 'doc': return 'doc'
      case 'docx': return 'docx'
      default: return 'pdf'
    }
  }

  const generateDisplayName = (filename: string): string => {
    // Remove file extension
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

    // Convert underscores and hyphens to spaces
    let displayName = nameWithoutExt.replace(/[_-]/g, ' ')

    // Capitalize first letter of each word
    displayName = displayName.replace(/\b\w/g, letter => letter.toUpperCase())

    // Handle common patterns
    displayName = displayName
      .replace(/\bCv\b/gi, 'CV')
      .replace(/\bApi\b/gi, 'API')
      .replace(/\bUi\b/gi, 'UI')
      .replace(/\bId\b/gi, 'ID')

    return displayName
  }

  const scanDirectory = async () => {
    try {
      if (initialLoadRef.current) {
        setLoading(true)
      } else {
        setIsRefreshing(true)
      }
      setError(null)

      const normalizedWatchPath = watchPath.replace(/\/$/, '')

      // Load finance projects from the generated manifest
      const manifestEntries = Array.isArray(financeManifest) ? financeManifest : []
      let knownFiles = manifestEntries
        .map((item: { filename?: string }) => item.filename)
        .filter((filename): filename is string => Boolean(filename))

      if (knownFiles.length === 0) {
        // Fallback to hardcoded list if manifest is not available
        knownFiles = [
          'Almond - Financial Analysis.pdf',
          'Ambulatory - Financial Analysis.pdf',
          'Doe - Financial Analysis.pdf',
          'Granits - Financial Analysis.pdf',
          'IHUB - Financial Modeling.pdf',
          'Kvareli Eden - Financial Analysis.pdf',
          'Megawood - Financial Analysis.pdf',
          'OTT TeleStrsm - Financial Analysis.pdf',
          'Real Estate - Business Plan.pdf',
          'Tile - Financial Analysis.pdf',
          'Water Supply - Financial Analysis.pdf',
          'Wine Production - Financial Analysis.pdf'
        ]
      }

      const detectedFiles: DetectedFile[] = []

      // Check each known file
      for (const filename of knownFiles) {
        try {
          const filePath = `${normalizedWatchPath}/${encodeURIComponent(filename)}`
          const checkResponse = await fetch(filePath, { method: 'HEAD' })
          if (checkResponse.ok) {
            const contentLength = checkResponse.headers.get('content-length')
            const lastModified = checkResponse.headers.get('last-modified')

            detectedFiles.push({
              name: filename,
              path: filePath,
              displayName: generateDisplayName(filename),
              type: getFileType(filename),
              size: contentLength ? parseInt(contentLength) : 0,
              lastModified: lastModified ? new Date(lastModified) : new Date()
            })
          }
        } catch (err) {
          // File doesn't exist or can't be accessed, skip it silently
          continue
        }
      }

      setFiles(detectedFiles)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan directory')
      console.error('Error scanning directory:', err)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
      initialLoadRef.current = false
    }
  }

  useEffect(() => {
    scanDirectory()

    // Set up periodic checks for new files (every 30 seconds)
    const interval = setInterval(scanDirectory, 30000)

    return () => clearInterval(interval)
  }, [watchPath])

  return { files, loading, isRefreshing, error, refetch: scanDirectory }
}
