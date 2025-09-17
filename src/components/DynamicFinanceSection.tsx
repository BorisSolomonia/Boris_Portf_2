import { motion } from 'framer-motion'
import { useFileWatcher } from '../hooks/useFileWatcher'
import DynamicFinanceProject from './DynamicFinanceProject'

const DynamicFinanceSection = () => {
  const { files, loading, error, refetch } = useFileWatcher('/projects/finance/protected')

  // No static finance projects - only show dynamically detected files

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          💼 Finance Projects
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Scanning for uploaded finance documents...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          💼 Finance Projects
        </h2>
        <div className="text-center text-red-600 mb-8">
          <p>Error loading finance documents: {error}</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    )
  }

  const totalProjects = files.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        💼 Finance Projects
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Professional finance projects with confidential content protection
        {files.length > 0 && (
          <span className="block mt-2 text-sm text-blue-600">
            ✨ {files.length} document{files.length !== 1 ? 's' : ''} automatically detected
          </span>
        )}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Dynamically detected files */}
        {files.map((file, index) => (
          <DynamicFinanceProject
            key={`dynamic-${file.name}`}
            file={file}
            index={index}
          />
        ))}

      </div>

      {totalProjects === 0 && (
        <div className="text-center text-gray-500 py-16">
          <div className="text-6xl mb-4">📁</div>
          <p>No finance documents found.</p>
          <p className="text-sm mt-2">Upload documents to /public/projects/finance/protected/ to see them here.</p>
        </div>
      )}

      {/* Refresh button */}
      {files.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={refetch}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            🔄 Refresh Documents
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default DynamicFinanceSection