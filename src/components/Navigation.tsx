import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const navItems = [
  {
    path: '/',
    label: 'Home',
    icon: (className: string) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10v10a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1V10" />
      </svg>
    )
  },
  {
    path: '/work',
    label: 'Achievements',
    icon: (className: string) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V6a2 2 0 012-2h4a2 2 0 012 2v1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2" />
      </svg>
    )
  },
  {
    path: '/projects',
    label: 'Projects',
    icon: (className: string) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
    )
  },
  {
    path: '/education',
    label: 'Education',
    icon: (className: string) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l9 5-9 5-9-5 9-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10v4a2 2 0 001 1.732l6 3.268 6-3.268A2 2 0 0019 14v-4" />
      </svg>
    )
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: (className: string) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 8l-10 7L2 8" />
      </svg>
    )
  }
]

const Navigation = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

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

  const renderNavLink = (item: typeof navItems[number], isMobile = false) => {
    const isActive = location.pathname === item.path
    const baseClass = isMobile
      ? 'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors'
      : 'relative px-4 py-2 rounded-full transition-colors'

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${baseClass} ${
          isActive
            ? 'bg-renaissance-gold/20 text-renaissance-brown'
            : 'text-renaissance-brown/70 hover:text-renaissance-brown hover:bg-renaissance-gold/10'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <span className="flex items-center gap-2">
          {item.icon('w-4 h-4')}
          <span className="font-sans-elegant">{item.label}</span>
        </span>
        {!isMobile && isActive && (
          <motion.span
            className="absolute -bottom-2 left-3 right-3 h-0.5 bg-renaissance-gold"
            layoutId="activeTab"
            initial={false}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-renaissance-cream/95 backdrop-blur-md shadow-lg border-b border-renaissance-gold/10'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="block">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-renaissance-gold/20 text-renaissance-brown flex items-center justify-center text-sm font-semibold">
                BS
              </div>
              <div className="leading-tight">
                <div className="text-base font-serif-elegant text-renaissance-brown">Boris Solomonia</div>
                <div className="text-xs text-renaissance-blue/70">Finance systems and product strategy</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => renderNavLink(item))}
            <Link
              to="/contact"
              className="ml-3 px-4 py-2 rounded-full bg-renaissance-brown text-renaissance-cream text-sm font-semibold hover:bg-renaissance-gold transition-colors"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 text-renaissance-brown"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`h-0.5 w-6 bg-current rounded transition-transform ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-current rounded transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-current rounded transition-transform ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-renaissance-cream/95 backdrop-blur-md border-t border-renaissance-gold/10"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => renderNavLink(item, true))}
              <Link
                to="/contact"
                className="block text-center px-4 py-3 rounded-xl bg-renaissance-brown text-renaissance-cream font-semibold hover:bg-renaissance-gold transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-renaissance-gold via-renaissance-blue to-renaissance-green"
        style={{ width: `${scrollProgress}%` }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
      />
    </motion.nav>
  )
}

export default Navigation
