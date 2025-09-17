import type { DetectedFile } from '../hooks/useFileWatcher'

// Generate a cover image path for a finance project
export const generateCoverPath = (file: DetectedFile): string => {
  // For PDFs and documents, we'll use a default cover or try to extract one
  const baseName = file.name.replace(/\.[^/.]+$/, '')

  // Check if a custom cover exists
  const customCoverPath = `/projects/covers/${baseName}.jpg`

  // For now, return a placeholder or default cover
  // In a real implementation, this could trigger cover extraction from the first page
  return customCoverPath
}

// Extract metadata from filename
export const extractMetadata = (filename: string) => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

  // Try to extract date patterns
  const dateMatch = nameWithoutExt.match(/(\d{2})(\d{2})(\d{4})/)
  let extractedDate: Date | null = null

  if (dateMatch) {
    const [, day, month, year] = dateMatch
    extractedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  // Extract type/category from filename
  const type = filename.toLowerCase().includes('cv') ? 'CV' :
               filename.toLowerCase().includes('portfolio') ? 'Portfolio' :
               filename.toLowerCase().includes('analysis') ? 'Analysis' :
               filename.toLowerCase().includes('report') ? 'Report' :
               filename.toLowerCase().includes('presentation') ? 'Presentation' :
               'Finance Document'

  return {
    date: extractedDate,
    type,
    category: 'finance'
  }
}

// Generate project description based on filename and metadata
export const generateDescription = (file: DetectedFile): string => {
  const metadata = extractMetadata(file.name)

  const descriptions: Record<string, string> = {
    'CV': 'Professional finance curriculum vitae showcasing experience and achievements',
    'Portfolio': 'Comprehensive collection of finance projects and case studies',
    'Analysis': 'Detailed financial analysis with insights and recommendations',
    'Report': 'Professional finance report with findings and conclusions',
    'Presentation': 'Finance presentation with key insights and data visualization',
    'Finance Document': 'Professional finance document with confidential content'
  }

  return descriptions[metadata.type] || descriptions['Finance Document']
}

// Check if a cover image exists
export const checkCoverExists = async (coverPath: string): Promise<boolean> => {
  try {
    const response = await fetch(coverPath, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

// Get file icon based on type
export const getFileIcon = (type: DetectedFile['type']): string => {
  const icons: Record<DetectedFile['type'], string> = {
    pdf: '📄',
    ppt: '📊',
    pptx: '📊',
    doc: '📝',
    docx: '📝'
  }

  return icons[type] || '📄'
}