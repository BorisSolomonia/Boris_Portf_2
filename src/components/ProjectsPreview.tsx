import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ProjectsPreview = () => {
  const featuredProjects = [
    {
      title: "The Medici Trading Platform",
      subtitle: "Renaissance of Risk Management",
      description: "A visionary approach to algorithmic trading that transforms market volatility into artistic opportunity.",
      metaphor: "🏛️ Ancient wisdom meets quantum algorithms",
      impact: "300% efficiency increase in portfolio optimization"
    },
    {
      title: "Sistine ERP Chapel", 
      subtitle: "Divine Enterprise Architecture",
      description: "Enterprise resource planning elevated to celestial heights—where every process flows like divine composition.",
      metaphor: "⚡ Sacred geometry in business workflows",
      impact: "Unified 15 disparate systems into harmonious symphony"
    }
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif-elegant text-renaissance-brown mb-6">
            Opus Magnus
          </h2>
          <p className="text-lg text-renaissance-blue max-w-2xl mx-auto font-sans-elegant">
            Behold the masterworks where financial complexity becomes elegant simplicity, 
            and where each solution tells a story of transformation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 1 }}
              viewport={{ once: true }}
              className="golden-section bg-white/70 rounded-lg p-8 renaissance-shadow hover:shadow-lg lyrical-transition group"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-serif-elegant text-renaissance-brown mb-2 group-hover:text-renaissance-gold lyrical-transition">
                  {project.title}
                </h3>
                <p className="text-renaissance-blue font-sans-elegant font-semibold">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-renaissance-brown/80 font-sans-elegant leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-renaissance-blue">
                  <span className="mr-2">{project.metaphor}</span>
                </div>
                <div className="text-sm font-semibold text-renaissance-gold">
                  Impact: {project.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-renaissance-blue text-renaissance-cream rounded-lg lyrical-transition hover:bg-renaissance-brown renaissance-shadow group"
            aria-label="View all portfolio projects"
          >
            <span className="font-sans-elegant font-semibold">Unveil the Complete Gallery</span>
            <motion.span 
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⟶
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsPreview