import { motion } from 'framer-motion'

interface ProtectedPDFViewerProps {
  pdfPath: string
  title: string
  description: string
  coverImage?: string
}

const ProtectedPDFViewer = ({
  pdfPath,
  title,
  description,
  coverImage
}: ProtectedPDFViewerProps) => {
  return (
    <div className="relative">
      {/* PDF Preview Container */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cover Image or PDF Preview */}
        <div className="relative h-96">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe
              src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0&page=1`}
              className="w-full h-full border-0 filter blur-md"
              title={title}
            />
          )}
        </div>

        {/* Overlay with project info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-2xl">📄</div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                Finance Project
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        </div>

        {/* Click overlay to open PDF with blur */}
        <div
          className="absolute inset-0 bg-transparent cursor-pointer group"
          onClick={() => {
            // Open PDF in new window with custom styles for blur effect
            const newWindow = window.open('', '_blank');
            if (newWindow) {
              newWindow.document.write(`
                <html>
                  <head>
                    <title>${title}</title>
                    <style>
                      body { margin: 0; padding: 20px; background: #f5f5f5; font-family: Arial, sans-serif; }
                      .blur-notice {
                        background: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        border: 2px dashed #ccc;
                        text-align: center;
                      }
                      .pdf-container {
                        filter: blur(2px);
                        opacity: 0.7;
                        border-radius: 8px;
                        overflow: hidden;
                      }
                      iframe { width: 100%; height: 80vh; border: none; }
                    </style>
                  </head>
                  <body>
                    <div class="blur-notice">
                      <h3>📄 Protected Finance Document</h3>
                      <p><strong>${title}</strong></p>
                      <p>${description}</p>
                      <p><em>Content is blurred for protection. This is a portfolio preview.</em></p>
                    </div>
                    <div class="pdf-container">
                      <iframe src="${pdfPath}#toolbar=0" title="${title}"></iframe>
                    </div>
                  </body>
                </html>
              `);
              newWindow.document.close();
            }
          }}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
            >
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtectedPDFViewer