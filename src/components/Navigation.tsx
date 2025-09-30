import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Navigation = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [navMode, setNavMode] = useState<'normal' | 'minimal' | 'expanded'>('normal')

  const navItems = [
    { path: '/', label: 'Home', icon: '⌂' },
    { path: '/work', label: 'Achievements', icon: '⚡' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/education', label: 'Education', icon: '🎓' },
    { path: '/contact', label: 'Contact', icon: '📧' }
  ]

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const updateScrollState = () => {
      const currentScroll = window.scrollY
      setIsScrolled(currentScroll > 50)

      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      const rawProgress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0
      const nextProgress = Math.min(Math.max(rawProgress, 0), 100)

      setScrollProgress((prev) => (Math.abs(prev - nextProgress) > 0.5 ? nextProgress : prev))
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gray-900"
          >
            Boris
          </motion.div>
          
          {/* Adaptive navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <motion.div key={item.path}>
                  <Link
                    to={item.path}
                    className="relative px-4 py-2 rounded-lg transition-colors"
                    onMouseEnter={() => setNavMode('expanded')}
                    onMouseLeave={() => setNavMode('normal')}
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <motion.span
                        className={`font-medium ${
                          isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                        }`}
                        animate={{
                          opacity: navMode === 'minimal' ? 0 : 1,
                          width: navMode === 'minimal' ? 0 : 'auto'
                        }}
                      >
                        {item.label}
                      </motion.span>
                    </motion.div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile menu */}
          <motion.button
            className="md:hidden p-2 text-gray-600"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.div className="h-0.5 bg-current rounded" />
              <motion.div className="h-0.5 bg-current rounded" />
              <motion.div className="h-0.5 bg-current rounded" />
            </div>
          </motion.button>
        </div>
      </div>
      
      {/* Floating progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: `${scrollProgress}%` }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
      />
    </motion.nav>
  )
}

export default Navigation
