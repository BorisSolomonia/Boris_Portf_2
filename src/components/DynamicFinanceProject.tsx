import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { DetectedFile } from '../hooks/useFileWatcher'
import { generateCoverPath, generateDescription, checkCoverExists, getFileIcon } from '../utils/fileUtils'

interface DynamicFinanceProjectProps {
  file: DetectedFile
  index: number
}

const DynamicFinanceProject = ({ file, index }: DynamicFinanceProjectProps) => {
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const loadCover = async () => {
      const coverPath = generateCoverPath(file)
      const exists = await checkCoverExists(coverPath)

      if (exists) {
        setCoverImage(coverPath)
      } else {
        // Use a default finance cover or generate one from PDF
        setCoverImage('/projects/covers/default-finance.jpg')
      }
    }

    loadCover()
  }, [file])

  const handleImageError = () => {
    setImageError(true)
    setCoverImage(null)
  }

  const openProjectWindow = () => {
    const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')

    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${file.displayName} - Finance Project</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
              }

              .container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }

              .header {
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: white;
                padding: 30px;
                text-align: center;
              }

              .header h1 {
                font-size: 2.5rem;
                margin-bottom: 10px;
                font-weight: 700;
              }

              .header p {
                font-size: 1.2rem;
                opacity: 0.9;
                margin-bottom: 10px;
              }

              .file-info {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 20px;
                font-size: 0.9rem;
              }

              .file-info span {
                background: rgba(255, 255, 255, 0.2);
                padding: 5px 15px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
              }

              .content {
                padding: 40px;
              }

              .blur-notice {
                background: #fff3cd;
                border: 2px dashed #ffc107;
                border-radius: 8px;
                padding: 25px;
                margin-bottom: 30px;
                text-align: center;
              }

              .blur-notice h3 {
                color: #856404;
                margin-bottom: 10px;
                font-size: 1.3rem;
              }

              .blur-notice p {
                color: #856404;
                margin: 5px 0;
              }

              .pdf-container {
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                filter: blur(3px);
                opacity: 0.6;
                transition: all 0.3s ease;
              }

              .pdf-container:hover {
                filter: blur(2px);
                opacity: 0.8;
              }

              iframe {
                width: 100%;
                height: 80vh;
                border: none;
                display: block;
              }

              .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #6c757d;
                border-top: 1px solid #e9ecef;
              }

              @media (max-width: 768px) {
                .header h1 { font-size: 2rem; }
                .header p { font-size: 1rem; }
                .content { padding: 20px; }
                .file-info { flex-direction: column; gap: 10px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>${getFileIcon(file.type)} ${file.displayName}</h1>
                <p>${generateDescription(file)}</p>
                <div class="file-info">
                  <span>📁 ${file.type.toUpperCase()}</span>
                  <span>📊 Finance Project</span>
                  <span>🔒 Protected Content</span>
                </div>
              </div>

              <div class="content">
                <div class="blur-notice">
                  <h3>🔒 Protected Finance Document</h3>
                  <p><strong>Document:</strong> ${file.displayName}</p>
                  <p><strong>Type:</strong> ${generateDescription(file)}</p>
                  <p><em>Content is blurred for confidentiality. This is a portfolio preview demonstrating document management capabilities.</em></p>
                </div>

                <div class="pdf-container">
                  <iframe
                    src="${file.path}#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                    title="${file.displayName}"
                    loading="lazy">
                    <p>Your browser does not support PDFs. <a href="${file.path}" target="_blank">Download the PDF</a>.</p>
                  </iframe>
                </div>
              </div>

              <div class="footer">
                <p>Generated automatically from uploaded finance documents | Portfolio Demo</p>
              </div>
            </div>
          </body>
        </html>
      `)

      newWindow.document.close()
      newWindow.focus()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={openProjectWindow}
    >
      {/* Cover Image or Default Display */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
        {coverImage && !imageError ? (
          <img
            src={coverImage}
            alt={file.displayName}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">{getFileIcon(file.type)}</div>
              <div className="text-sm text-gray-600 px-4">
                {file.type.toUpperCase()} Document
              </div>
            </div>
          </div>
        )}

        {/* File type badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {file.type.toUpperCase()}
          </span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{getFileIcon(file.type)}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            Auto-Generated
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {file.displayName}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {generateDescription(file)}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>📁 {(file.size / 1024).toFixed(1)} KB</span>
          <span>🕒 {file.lastModified.toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default DynamicFinanceProject