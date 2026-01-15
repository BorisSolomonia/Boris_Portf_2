import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PhotoFrame from './PhotoFrame'

interface HeroSectionProps {
  scrollY: number
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 visionary-gradient"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-serif-elegant text-renaissance-brown mb-6 leading-tight">
                KAIZEN
                <span className="block text-renaissance-blue">Constant Improvement</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="text-xl md:text-2xl text-renaissance-brown/70 mb-12 leading-relaxed"
            >
              Life has a meaning only then, when you are better than yesterday.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <Link
                to="/work"
                className="group px-8 py-4 bg-renaissance-brown text-renaissance-cream rounded-lg transition-all hover:bg-renaissance-gold shadow-lg hover:shadow-xl"
                aria-label="View portfolio work"
              >
                <span className="flex items-center space-x-2">
                  <span className="font-semibold">See My Achievements</span>
                  <motion.span
                    className="inline-flex"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right side - Photo frame */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
            className="flex flex-col items-center lg:items-end"
          >
            <PhotoFrame />

            {/* Download CV Button */}
            <motion.a
              href="/files/CV/Boris_Solomonia_Finance_CV_02082025.pdf"
              download="Boris_Solomonia_Finance_CV.pdf"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="mt-6 px-4 py-2 bg-white text-renaissance-brown rounded-md shadow-md hover:shadow-lg transition-all text-sm border border-renaissance-gold/40 hover:border-renaissance-gold"
              aria-label="Download Boris's CV"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">Download CV</span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="/work#career-timeline" className="flex flex-col items-center text-renaissance-brown/60 focus:outline-none focus:ring-2 focus:ring-renaissance-gold/60 rounded">
          <span className="text-sm font-sans-elegant mb-2">Discover the narrative</span>
          <div className="w-px h-12 bg-renaissance-gold"></div>
        </a>
      </motion.div>
    </section>
  )
}

export default HeroSection
