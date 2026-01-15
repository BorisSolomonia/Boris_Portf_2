import { motion } from 'framer-motion'
import { useFileWatcher } from '../hooks/useFileWatcher'
import DynamicFinanceProject from './DynamicFinanceProject'

const DynamicFinanceSection = () => {
  const { files, loading, isRefreshing, error, refetch } = useFileWatcher('/projects/finance/protected')

  // No static finance projects - only show dynamically detected files

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-serif-elegant text-renaissance-brown mb-8 text-center">
          Finance Projects
        </h2>
        <p className="text-center text-renaissance-brown/70 mb-8">
          Scanning for uploaded finance documents...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-renaissance-gold"></div>
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
        <h2 className="text-3xl font-serif-elegant text-renaissance-brown mb-8 text-center">
          Finance Projects
        </h2>
        <div className="text-center text-red-700 mb-8">
          <p>Error loading finance documents: {error}</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-renaissance-brown text-renaissance-cream rounded-lg hover:bg-renaissance-gold transition-colors"
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
      <h2 className="text-3xl font-serif-elegant text-renaissance-brown mb-8 text-center">
        Finance Projects
      </h2>
      <p className="text-center text-renaissance-brown/70 mb-8">
        Professional finance projects with confidential content protection
        {files.length > 0 && (
          <span className="block mt-2 text-sm text-renaissance-blue">
            {files.length} document{files.length !== 1 ? 's' : ''} automatically detected
          </span>
        )}
      </p>

      {isRefreshing && (
        <p className="text-center text-xs text-renaissance-blue/70 mb-6">
          Refreshing document list...
        </p>
      )}

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
        <div className="text-center text-renaissance-brown/60 py-16">
          <div className="text-6xl mb-4">DOC</div>
          <p>No finance documents found.</p>
          <p className="text-sm mt-2">Upload documents to /public/projects/finance/protected/ to see them here.</p>
        </div>
      )}

      {/* Refresh button */}
      {files.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={refetch}
            className="px-4 py-2 text-sm bg-renaissance-gold/15 text-renaissance-brown rounded-lg hover:bg-renaissance-gold/30 transition-colors"
          >
            Refresh Documents
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default DynamicFinanceSection
