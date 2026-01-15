import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { uploadFile, formatFileSize, type UploadedFile } from '../utils/fileUpload'

interface SavvYProject {
  id: string
  title: string
  date: string
  description: string
  pptFile?: string
  previewImage?: string
  uploadedFile?: UploadedFile
  isUploaded?: boolean
}

const SavvYProjects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showBlurredView, setShowBlurredView] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simple admin check - in production, use proper authentication
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(adminStatus)
  }, [])

  // Extract project name from filename
  const extractProjectName = (filename: string): string => {
    const nameWithoutExt = filename.replace(/\.(ppt|pptx|pdf)$/i, '')
    return nameWithoutExt.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  // Combine static projects with uploaded ones
  const staticProjects: SavvYProject[] = [
    {
      id: 'financial-modeling',
      title: 'Financial Modeling & Analysis',
      date: 'Q1 2020',
      description: 'Comprehensive financial models for client investment decisions',
      previewImage: '/placeholder-ppt-1.jpg'
    },
    {
      id: 'business-strategy',
      title: 'Business Strategy Consultation',
      date: 'Q2 2020',
      description: 'Strategic planning and market analysis for growth initiatives',
      previewImage: '/placeholder-ppt-2.jpg'
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment Framework',
      date: 'Q3 2020',
      description: 'Enterprise risk management system design and implementation',
      previewImage: '/placeholder-ppt-3.jpg'
    },
    {
      id: 'performance-metrics',
      title: 'Performance Metrics Dashboard',
      date: 'Q4 2020',
      description: 'KPI tracking and business intelligence reporting system',
      previewImage: '/placeholder-ppt-4.jpg'
    },
    {
      id: 'process-optimization',
      title: 'Process Optimization Study',
      date: 'Q1 2021',
      description: 'Operational efficiency improvements and cost reduction analysis',
      previewImage: '/placeholder-ppt-5.jpg'
    },
    {
      id: 'market-research',
      title: 'Market Research & Competitive Analysis',
      date: 'Q2 2021',
      description: 'Comprehensive market study for new product launch',
      previewImage: '/placeholder-ppt-6.jpg'
    }
  ]

  // Convert uploaded files to project format
  const uploadedProjects: SavvYProject[] = uploadedFiles.map(file => ({
    id: file.id,
    title: extractProjectName(file.name),
    date: file.uploadDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    description: `Uploaded presentation from ${file.uploadDate.toLocaleDateString()}`,
    previewImage: file.previewUrl,
    uploadedFile: file,
    isUploaded: true
  }))

  const savvyProjects = [...staticProjects, ...uploadedProjects]

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId)
    setShowBlurredView(true)
    setCurrentPage(0)
  }

  const closeBlurredView = () => {
    setShowBlurredView(false)
    setSelectedProject(null)
    setCurrentPage(0)
  }

  const getCurrentProjectData = () => {
    const project = savvyProjects.find(p => p.id === selectedProject)
    if (!project) {
      console.warn('No project found for ID:', selectedProject)
    }
    return project
  }

  const nextPage = () => {
    const project = getCurrentProjectData()
    if (project?.uploadedFile?.allPages && currentPage < project.uploadedFile.allPages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => uploadFile(file))
      const uploadedFiles = await Promise.all(uploadPromises)
      setUploadedFiles(prev => [...prev, ...uploadedFiles])
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed: ' + (error as Error).message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleFileUpload(e.dataTransfer.files)
  }

  return (
    <div className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              SavvY Experience Portfolio
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Business & Financial Consulting Projects<br />
            <span className="text-sm font-medium text-blue-600">November 2019 - June 2021 - Full-time</span>
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {savvyProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* PPT Preview - Show actual cover or placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {project.previewImage && project.isUploaded - (
                  /* Show uploaded cover fully transparent */
                  <img 
                    src={project.previewImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-600">PPT Presentation</p>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Upload badge for uploaded files */}
                {project.isUploaded && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Uploaded
                  </div>
                )}
                
                {/* Click hint */}
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{project.date}</span>
                  <span className="text-xs text-gray-500">Confidential</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Admin Upload Area */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Admin Panel
              </span>
            </div>
          <div className="max-w-md mx-auto">
            {isUploading - (
              <>
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Uploading...</h3>
              </>
            ) : (
              <>
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload PPT Files</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Drag and drop your PowerPoint presentations here or click to browse<br />
                  <span className="text-xs text-gray-500">Supports .ppt, .pptx, and .pdf files (max 50MB)</span>
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Choose Files
                </button>
              </>
            )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".ppt,.pptx,.pdf"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </motion.div>
        )}

        {/* Admin Toggle Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              const newAdminStatus = !isAdmin
              setIsAdmin(newAdminStatus)
              localStorage.setItem('isAdmin', newAdminStatus.toString())
            }}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            {isAdmin ? 'Exit Admin Mode' : 'Enter Admin Mode'}
          </button>
        </div>

        {/* Uploaded Files List (Admin Only) */}
        {isAdmin && uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Uploaded Presentations ({uploadedFiles.length})
            </h3>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)} - {file.uploadDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProject(file.id)
                      setShowBlurredView(true)
                    }}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View (Blurred)
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Full Project Viewer Modal */}
      {showBlurredView && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeBlurredView}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {savvyProjects.find(p => p.id === selectedProject)?.title || 'Project Presentation'}
                </h3>
                <p className="text-sm text-gray-600">
                  SavvY Project - {savvyProjects.find(p => p.id === selectedProject)?.date || 'Unknown Date'}
                </p>
              </div>
              <button
                onClick={closeBlurredView}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Full Project Viewer */}
            <div className="p-6">
              <div className="relative bg-white rounded-xl overflow-hidden" style={{ minHeight: '600px' }}>
                {(() => {
                  const currentProject = getCurrentProjectData()
                  
                  if (currentProject?.uploadedFile?.allPages) {
                    // Show all pages with navigation for uploaded files
                    const allPages = currentProject.uploadedFile.allPages
                    return (
                      <div className="w-full h-full">
                        {/* Current page display */}
                        <div className="flex justify-center mb-4" style={{ minHeight: '500px' }}>
                          <img 
                            src={allPages[currentPage]}
                            alt={`Page ${currentPage + 1} of ${currentProject.title}`}
                            className="max-w-full max-h-full object-contain"
                            style={{ minHeight: '500px' }}
                          />
                        </div>
                        
                        {/* Page Navigation */}
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <button
                              onClick={prevPage}
                              disabled={currentPage === 0}
                              className="flex items-center px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Previous
                            </button>
                            
                            <span className="text-sm text-gray-600">
                              Page {currentPage + 1} of {allPages.length}
                            </span>
                            
                            <button
                              onClick={nextPage}
                              disabled={currentPage === allPages.length - 1}
                              className="flex items-center px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Next
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Page thumbnails */}
                          <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                            {allPages.map((page, index) => (
                              <button
                                key={index}
                                onClick={() => goToPage(index)}
                                className={`flex-shrink-0 w-12 h-9 border-2 rounded overflow-hidden transition-all hover:scale-105 ${
                                  index === currentPage - 'border-blue-500' : 'border-gray-200'
                                }`}
                              >
                                <img 
                                  src={page} 
                                  alt={`Page ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  
                  // For static projects or fallback, show simulated content with light blur
                  return (
                    <div className="w-full h-full p-8 filter blur-[1.5px]" style={{ minHeight: '500px' }}>
                      <div className="space-y-6">
                        <div className="text-center border-b pb-4">
                          <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {currentProject?.title || 'Project Presentation'}
                          </h1>
                          <p className="text-gray-600">SavvY Business & Financial Consulting</p>
                          <p className="text-sm text-gray-500">{currentProject?.date || 'Date Unknown'}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">Executive Summary</h3>
                            <div className="space-y-2">
                              <div className="h-3 bg-gray-300 rounded w-full"></div>
                              <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">Key Findings</h3>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="h-3 bg-gray-300 rounded flex-1"></div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="h-3 bg-gray-300 rounded flex-1"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mt-6">
                          <div className="flex justify-center space-x-4">
                            <div className="w-24 h-16 bg-blue-200 rounded"></div>
                            <div className="w-24 h-16 bg-green-200 rounded"></div>
                            <div className="w-24 h-16 bg-yellow-200 rounded"></div>
                          </div>
                        </div>
                        
                        <div className="text-center pt-4 border-t">
                          <p className="text-xs text-gray-400">
                            {currentProject?.isUploaded - 
                              'Uploaded presentation content (lightly blurred)' : 
                              'This content is blurred to protect confidential information'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> These presentations contain confidential client information and proprietary methodologies 
                  developed during my tenure at SavvY Business & Financial Consulting (Nov 2019 - Jun 2021).
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default SavvYProjects
