import { motion } from 'framer-motion'

const SkipLink = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-renaissance-gold text-renaissance-cream rounded-lg font-sans-elegant font-semibold"
      initial={{ opacity: 0 }}
      whileFocus={{ opacity: 1 }}
      tabIndex={1}
    >
      Skip to main content
    </motion.a>
  )
}

export default SkipLink