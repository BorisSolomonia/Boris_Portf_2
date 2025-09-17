import { useState, useEffect } from 'react'

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
  const [error, setError] = useState<string | null>(null)

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
      setLoading(true)
      setError(null)

      // Load finance projects from the generated manifest
      let knownFiles: string[] = []

      try {
        const manifestResponse = await fetch('/src/generated/financeManifest.json')
        if (manifestResponse.ok) {
          const manifest = await manifestResponse.json()
          knownFiles = manifest.map((item: any) => item.filename)
        }
      } catch (manifestError) {
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
          const checkResponse = await fetch(`/projects/finance/protected/${filename}`, { method: 'HEAD' })
          if (checkResponse.ok) {
            const contentLength = checkResponse.headers.get('content-length')
            const lastModified = checkResponse.headers.get('last-modified')

            detectedFiles.push({
              name: filename,
              path: `/projects/finance/protected/${filename}`,
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
    }
  }

  useEffect(() => {
    scanDirectory()

    // Set up periodic checks for new files (every 30 seconds)
    const interval = setInterval(scanDirectory, 30000)

    return () => clearInterval(interval)
  }, [watchPath])

  return { files, loading, error, refetch: scanDirectory }
}