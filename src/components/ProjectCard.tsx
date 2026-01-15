import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  challenge: string
  process: string
  solution: string
  impact: string[]
  emoji: string
  technologies: string[]
  lessons: string
  type: string
  coverImage?: string
  demoUrl?: string
  githubUrl?: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: 'easeOut'
      }
    }
  }

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
  }

  const typeLabel = project.type === 'tech' ? 'Tech Project' : 'Finance Project'

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="bg-white/80 rounded-2xl overflow-hidden renaissance-shadow hover:shadow-xl lyrical-transition border border-renaissance-gold/10"
    >
      {/* Cover Image */}
      {project.coverImage && (
        <div className="relative h-64 overflow-hidden">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-renaissance-brown/70 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-renaissance-blue text-renaissance-cream text-sm rounded-full font-medium">
              {typeLabel}
            </span>
          </div>
        </div>
      )}

      <div className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-serif-elegant text-renaissance-brown mb-3">
            {project.title}
          </h2>
          <p className="text-xl text-renaissance-blue font-semibold mb-4">{project.subtitle}</p>
          <p className="text-renaissance-brown/80 text-lg leading-relaxed mb-6">{project.description}</p>
          <div className="flex items-center gap-3 text-renaissance-brown mb-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-renaissance-gold/20 text-sm font-semibold tracking-widest">
              {project.emoji}
            </span>
            <div className="font-semibold text-renaissance-brown">Key Innovation</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mb-6 px-6 py-3 bg-renaissance-gold/10 hover:bg-renaissance-gold/20 rounded-lg transition-colors flex items-center justify-between group"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Hide' : 'Show'} detailed project narrative`}
        >
          <span className="font-semibold text-renaissance-brown">
            {isExpanded ? 'Show Less' : 'Show Details'}
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-renaissance-brown"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </motion.button>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isExpanded ? 'visible' : 'hidden'}
          className="overflow-hidden"
        >
          <div className="space-y-8 pt-4 border-t border-renaissance-gold/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-renaissance-brown mb-3">Problem</h3>
                <p className="text-renaissance-brown/80 leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-renaissance-brown mb-3">How I Solved It</h3>
                <p className="text-renaissance-brown/80 leading-relaxed">{project.process}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-renaissance-brown mb-3">Solution</h3>
              <p className="text-renaissance-brown/80 leading-relaxed mb-6">{project.solution}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-renaissance-brown mb-4">Results</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.impact.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center space-x-3 bg-renaissance-green/10 rounded-lg p-3"
                  >
                    <span className="text-renaissance-green font-bold text-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-renaissance-brown/80 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-renaissance-brown mb-3">Key Insight</h3>
              <p className="text-renaissance-blue italic leading-relaxed bg-renaissance-blue/10 rounded-lg p-4">
                "{project.lessons}"
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-renaissance-brown mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-renaissance-blue/10 text-renaissance-brown text-sm rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {(project.demoUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-renaissance-gold/20">
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[120px] bg-renaissance-brown text-renaissance-cream px-6 py-3 rounded-lg font-semibold text-center hover:bg-renaissance-gold transition-colors flex items-center justify-center gap-2"
                  >
                    Live Demo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[120px] bg-renaissance-blue text-renaissance-cream px-6 py-3 rounded-lg font-semibold text-center hover:bg-renaissance-brown transition-colors flex items-center justify-center gap-2"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Action Buttons (always visible) */}
        {(project.demoUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-3 mt-4">
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-renaissance-brown text-renaissance-cream px-4 py-2 rounded-lg text-sm font-medium hover:bg-renaissance-gold transition-colors flex items-center gap-2"
              >
                Live Demo
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-renaissance-blue text-renaissance-cream px-4 py-2 rounded-lg text-sm font-medium hover:bg-renaissance-brown transition-colors flex items-center gap-2"
              >
                Code
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default ProjectCard
