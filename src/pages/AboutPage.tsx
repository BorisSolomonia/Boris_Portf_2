import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const philosophyPrinciples = [
    {
      title: "Composition & Flow",
      symbol: "∞",
      description: "Every system I design follows the Golden Ratio—not as decoration, but as foundation. User journeys flow like Botticelli's lyrical lines, guiding naturally from need to fulfillment.",
      application: "Information architecture that breathes, navigation that dances, interfaces that sing."
    },
    {
      title: "Symbolic Clarity", 
      symbol: "◊",
      description: "Complex financial concepts deserve elegant metaphors. I transform Byzantine systems into intuitive symbols—growth becomes vines, security becomes fortresses, liquidity becomes flowing water.",
      application: "Making the arcane accessible through the power of visual storytelling."
    },
    {
      title: "Mannerist Innovation",
      symbol: "⚡", 
      description: "While others follow trends, I forge new paths. My solutions challenge conventions not for rebellion's sake, but to create genuinely better experiences.",
      application: "Authentic innovation that serves human needs over industry norms."
    }
  ]

  const journey = [
    {
      period: "The Foundation",
      years: "2018-2020",
      description: "Began my odyssey in traditional finance, quickly recognizing that beautiful systems aren't just more pleasant—they're more effective. Started developing my Renaissance methodology."
    },
    {
      period: "The Awakening", 
      years: "2020-2022",
      description: "Deep dive into ERP systems and algorithmic trading platforms. Discovered how Botticelli's principles could revolutionize financial technology—composition, symbolism, and lyrical flow."
    },
    {
      period: "The Renaissance",
      years: "2022-Present", 
      description: "Fully embraced the fusion of classical artistry and modern technology. Created transformative solutions that don't just work—they inspire. Now leading the charge toward a more beautiful, intuitive fintech future."
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-serif-elegant text-renaissance-brown mb-6">
              The Maestro's Canvas
            </h1>
            <p className="text-xl text-renaissance-blue font-sans-elegant leading-relaxed">
              Where Renaissance principles meet modern innovation—a personal journey 
              through the art of transforming complexity into clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="bg-white/80 rounded-2xl p-8 md:p-12 renaissance-shadow mb-16"
          >
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <div className="w-64 h-64 mx-auto bg-renaissance-gold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-6xl">🎨</span>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-serif-elegant text-renaissance-brown mb-6">
                  A Different Kind of Technologist
                </h2>
                <div className="space-y-4 text-lg font-sans-elegant leading-relaxed text-renaissance-brown/80">
                  <p>
                    I am Boris—a fintech visionary who believes that the most powerful technology 
                    is indistinguishable from art. While others chase trends, I study timeless 
                    principles that have moved hearts and minds for centuries.
                  </p>
                  <p>
                    My approach is radical in its simplicity: apply the compositional genius of 
                    Botticelli, the systematic thinking of Renaissance masters, and the symbolic 
                    power of classical art to solve modern financial challenges.
                  </p>
                  <p>
                    The result? Systems that don't just process data—they tell stories. 
                    Interfaces that don't just function—they inspire. Solutions that don't 
                    just solve problems—they elevate human potential.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-serif-elegant text-renaissance-brown text-center mb-12">
              The Renaissance Method
            </h2>
            <div className="space-y-8">
              {philosophyPrinciples.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                  className="bg-white/60 rounded-xl p-8 renaissance-shadow"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-renaissance-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-renaissance-gold">{principle.symbol}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif-elegant text-renaissance-brown mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-renaissance-brown/80 font-sans-elegant leading-relaxed mb-4">
                        {principle.description}
                      </p>
                      <p className="text-renaissance-blue font-sans-elegant italic">
                        {principle.application}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-serif-elegant text-renaissance-brown text-center mb-12">
              The Artisan's Journey
            </h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-renaissance-gold/30 hidden md:block"></div>
              <div className="space-y-12">
                {journey.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.2, duration: 0.8 }}
                    className="relative flex items-start space-x-8"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-renaissance-gold rounded-full flex items-center justify-center z-10">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1 bg-white/60 rounded-xl p-6 renaissance-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-serif-elegant text-renaissance-brown">
                          {phase.period}
                        </h3>
                        <span className="text-renaissance-gold font-sans-elegant font-semibold">
                          {phase.years}
                        </span>
                      </div>
                      <p className="text-renaissance-brown/80 font-sans-elegant leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Future Vision Preview Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-serif-elegant mb-4">
                    Future Vision
                  </h2>
                  <p className="text-xl text-blue-200 font-sans-elegant">
                    Where AI meets Renaissance artistry in financial innovation
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-serif-elegant mb-4">Transformative AI Solutions</h3>
                    <p className="text-gray-300 font-sans-elegant leading-relaxed mb-6">
                      I envision intelligent applications that analyze cash flows, optimize inventory, 
                      and automate decision-making—helping organizations run smarter, faster, and with greater resilience.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🧠</div>
                        <div className="text-sm">Smart Inventory</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-sm">Intelligent Pricing</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-sm">Financial Analysis</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🤝</div>
                        <div className="text-sm">Collaboration Tools</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="text-6xl mb-4">🚀</div>
                      <h4 className="text-xl font-serif-elegant mb-2">Personal Commitment</h4>
                      <p className="text-gray-300 font-sans-elegant text-sm">
                        Technology that creates tangible value and empowers organizations
                      </p>
                    </div>
                    
                    <Link
                      to="/vision"
                      className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                      aria-label="Explore full vision and future plans"
                    >
                      <span className="font-sans-elegant font-semibold">Explore Full Vision</span>
                      <motion.span 
                        className="inline-block"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, -50, -10],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random(),
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="text-center bg-visionary-gradient rounded-2xl p-8"
          >
            <h2 className="text-3xl font-serif-elegant text-renaissance-brown mb-6">
              Ready to Create Something Extraordinary?
            </h2>
            <p className="text-lg text-renaissance-blue font-sans-elegant mb-8 max-w-2xl mx-auto">
              Let's collaborate on transforming your financial challenges into Renaissance masterpieces. 
              Every project is an opportunity to create something both beautiful and powerful.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-renaissance-gold text-renaissance-cream rounded-lg lyrical-transition hover:bg-renaissance-brown renaissance-shadow group"
              aria-label="Contact Boris for collaboration"
            >
              <span className="font-sans-elegant font-semibold">Begin Our Dialogue</span>
              <motion.span 
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage