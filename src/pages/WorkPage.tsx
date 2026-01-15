import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import MorphingLayout from '../components/MorphingLayout'
import CareerTimeline from '../components/CareerTimeline'

const WorkPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const isInView = useInView(heroRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen bg-renaissance-cream">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <MorphingLayout morphType="data" className="absolute inset-0">
          <div />
        </MorphingLayout>
        
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-serif-elegant text-renaissance-brown mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            My Achievements
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-renaissance-blue font-sans-elegant mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Where Finance Meets Technology
          </motion.p>

        </motion.div>

        {/* Timeline Navigation */}
        <motion.div
          className="absolute bottom-36 left-[41%] transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-renaissance-brown/60">
            <span className="text-sm font-sans-elegant mb-6 text-center">Explore my journey</span>

            {/* Timeline Navigation Line */}
            <div className="relative flex items-center justify-center">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-renaissance-gold/40 -translate-y-1/2"></div>

              {/* Navigation Items */}
              <div className="relative flex items-center justify-center space-x-16 bg-renaissance-cream px-8">
                <button
                  onClick={() => {
                    const pastSection = document.querySelector('[data-year="2010"]')
                    pastSection?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className="group flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-renaissance-blue border-2 border-renaissance-cream group-hover:bg-renaissance-gold transition-colors duration-300 mb-2"></div>
                  <span className="text-xs font-sans-elegant text-renaissance-brown/70 group-hover:text-renaissance-gold transition-colors duration-300 text-center">
                    Past
                  </span>
                </button>

                <button
                  onClick={() => {
                    const recentSection = document.querySelector('[data-year="2024"]')
                    recentSection?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className="group flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-renaissance-green border-2 border-renaissance-cream group-hover:bg-renaissance-gold transition-colors duration-300 mb-2"></div>
                  <span className="text-xs font-sans-elegant text-renaissance-brown/70 group-hover:text-renaissance-gold transition-colors duration-300 text-center">
                    Recent
                  </span>
                </button>

                <button
                  onClick={() => {
                    const futureSection = document.querySelector('[data-year="2028"]')
                    futureSection?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className="group flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-renaissance-gold border-2 border-renaissance-cream group-hover:bg-renaissance-gold transition-colors duration-300 mb-2"></div>
                  <span className="text-xs font-sans-elegant text-renaissance-brown/70 group-hover:text-renaissance-gold transition-colors duration-300 text-center">
                    Future
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Career Timeline */}
      <CareerTimeline />
      {/* Call to Action */}
      <motion.section
        className="max-w-4xl mx-auto px-6 py-24 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-br from-renaissance-gold/5 via-renaissance-blue/5 to-renaissance-green/5 rounded-3xl p-12 border border-renaissance-gold/20">
          <motion.h2
            className="text-3xl md:text-4xl font-serif-elegant text-renaissance-brown mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ready to Transform Your Business?
          </motion.h2>
          
          <motion.p
            className="text-lg text-renaissance-blue font-sans-elegant mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Let's collaborate on implementing proven methodologies and technologies to solve your most complex financial and operational challenges.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-renaissance-gold text-white rounded-xl font-sans-elegant font-bold hover:bg-renaissance-gold/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start a Conversation</span>
              <motion.span 
                className="inline-flex"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default WorkPage
