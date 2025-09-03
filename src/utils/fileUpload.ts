// File upload utilities for PPT presentations

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: Date
  previewUrl?: string
  allPages?: string[] // Array of all page previews
  totalPages?: number
}

export const allowedFileTypes = [
  'application/vnd.ms-powerpoint', // .ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'application/pdf', // PDF versions of presentations
]

export const maxFileSize = (import.meta.env.VITE_MAX_FILE_SIZE_MB ? parseInt(import.meta.env.VITE_MAX_FILE_SIZE_MB) : 50) * 1024 * 1024 // Default 50MB

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (!allowedFileTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only PowerPoint (.ppt, .pptx) and PDF files are allowed'
    }
  }

  if (file.size > maxFileSize) {
    return {
      isValid: false,
      error: 'File size must be less than 50MB'
    }
  }

  return { isValid: true }
}

export const generatePreviewImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 300
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      reject('Canvas context not available')
      return
    }

    if (file.type === 'application/pdf') {
      // For PDF files, try to read with FileReader and create a better preview
      const reader = new FileReader()
      reader.onload = () => {
        // Create a more realistic document preview for PDF
        createDocumentPreview(ctx, file.name, 'PDF Document')
        const dataUrl = canvas.toDataURL('image/png')
        resolve(dataUrl)
      }
      reader.onerror = () => {
        createDocumentPreview(ctx, file.name, 'PDF Document')
        const dataUrl = canvas.toDataURL('image/png')
        resolve(dataUrl)
      }
      reader.readAsArrayBuffer(file)
    } else {
      // For PPT files, create a presentation-style preview
      createDocumentPreview(ctx, file.name, 'PowerPoint Presentation')
      const dataUrl = canvas.toDataURL('image/png')
      resolve(dataUrl)
    }
  })
}

const createDocumentPreview = (ctx: CanvasRenderingContext2D, filename: string, docType: string) => {
  // Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 400, 300)
  
  // Header section
  ctx.fillStyle = '#f3f4f6'
  ctx.fillRect(0, 0, 400, 60)
  
  // Title area
  ctx.fillStyle = '#1f2937'
  ctx.font = 'bold 18px system-ui'
  ctx.textAlign = 'left'
  ctx.fillText(filename.substring(0, 25) + (filename.length > 25 ? '...' : ''), 20, 30)
  
  ctx.fillStyle = '#6b7280'
  ctx.font = '12px system-ui'
  ctx.fillText(docType, 20, 50)
  
  // Content area simulation
  ctx.fillStyle = '#e5e7eb'
  ctx.fillRect(20, 80, 360, 20)
  ctx.fillRect(20, 110, 280, 20)
  ctx.fillRect(20, 140, 320, 20)
  
  // Chart/diagram simulation
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(20, 180, 100, 80)
  ctx.fillStyle = '#ef4444'
  ctx.fillRect(140, 200, 100, 60)
  ctx.fillStyle = '#10b981'
  ctx.fillRect(260, 190, 100, 70)
  
  // Footer
  ctx.fillStyle = '#f9fafb'
  ctx.fillRect(0, 270, 400, 30)
  ctx.fillStyle = '#9ca3af'
  ctx.font = '10px system-ui'
  ctx.textAlign = 'center'
  ctx.fillText(`Page 1 • ${new Date().toLocaleDateString()}`, 200, 290)
}

const generateAllPages = async (file: File): Promise<string[]> => {
  // Simulate multiple pages for demo - in real app, would extract actual pages
  const numPages = Math.floor(Math.random() * 8) + 3 // 3-10 pages
  const pages: string[] = []
  
  for (let i = 0; i < numPages; i++) {
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 300
    const ctx = canvas.getContext('2d')!
    
    // Create different content for each page
    createPageContent(ctx, file.name, i + 1, numPages)
    pages.push(canvas.toDataURL('image/png'))
  }
  
  return pages
}

const createPageContent = (ctx: CanvasRenderingContext2D, filename: string, pageNum: number, totalPages: number) => {
  // Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 400, 300)
  
  if (pageNum === 1) {
    // Title page
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, 400, 60)
    
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 18px system-ui'
    ctx.textAlign = 'left'
    ctx.fillText(filename.substring(0, 25) + (filename.length > 25 ? '...' : ''), 20, 30)
    
    ctx.fillStyle = '#6b7280'
    ctx.font = '12px system-ui'
    ctx.fillText('PowerPoint Presentation', 20, 50)
    
    // Large title in center
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 24px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('Project Overview', 200, 150)
    
    ctx.font = '16px system-ui'
    ctx.fillStyle = '#6b7280'
    ctx.fillText('SavvY Business & Financial Consulting', 200, 180)
    
  } else {
    // Content pages
    ctx.fillStyle = '#f9fafb'
    ctx.fillRect(0, 0, 400, 40)
    
    ctx.fillStyle = '#374151'
    ctx.font = 'bold 16px system-ui'
    ctx.textAlign = 'left'
    
    const pageTitles = [
      'Executive Summary',
      'Market Analysis', 
      'Financial Projections',
      'Risk Assessment',
      'Strategic Recommendations',
      'Implementation Plan',
      'Timeline & Milestones',
      'Budget Overview',
      'Conclusion'
    ]
    
    const title = pageTitles[Math.min(pageNum - 2, pageTitles.length - 1)] || `Section ${pageNum - 1}`
    ctx.fillText(title, 20, 25)
    
    // Content blocks
    ctx.fillStyle = '#e5e7eb'
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(20, 60 + i * 30, 300 + Math.random() * 60, 15)
    }
    
    // Charts/graphs
    if (pageNum % 2 === 0) {
      // Bar chart
      const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[i]
        const height = 20 + Math.random() * 60
        ctx.fillRect(20 + i * 90, 200 - height, 70, height)
      }
    } else {
      // Line elements
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(20, 180)
      for (let i = 1; i < 8; i++) {
        ctx.lineTo(20 + i * 50, 160 + Math.random() * 40)
      }
      ctx.stroke()
    }
  }
  
  // Page number
  ctx.fillStyle = '#9ca3af'
  ctx.font = '10px system-ui'
  ctx.textAlign = 'center'
  ctx.fillText(`${pageNum} / ${totalPages}`, 200, 290)
}

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  const validation = validateFile(file)
  if (!validation.isValid) {
    throw new Error(validation.error)
  }

  // Generate all pages
  const allPages = await generateAllPages(file)
  const previewUrl = allPages[0] // First page as cover

  // In a real app, you'd upload to a server here
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: file.name,
    size: file.size,
    type: file.type,
    uploadDate: new Date(),
    previewUrl,
    allPages,
    totalPages: allPages.length
  }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}