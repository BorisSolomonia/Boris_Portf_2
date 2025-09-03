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
        ease: "easeOut"
      }
    }
  }

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  }

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white/80 rounded-2xl overflow-hidden renaissance-shadow hover:shadow-xl lyrical-transition"
    >
      <div className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {project.title}
          </h2>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            {project.subtitle}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="flex items-center text-blue-600 mb-6">
            <span className="text-3xl mr-3">{project.emoji}</span>
            <span className="font-semibold">Key Innovation</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mb-6 px-6 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-between group"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Hide' : 'Show'} detailed project narrative`}
        >
          <span className="font-semibold text-gray-900">
            {isExpanded ? 'Show Less' : 'Show Details'}
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-blue-600 text-xl"
          >
            ↓
          </motion.span>
        </motion.button>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isExpanded ? "visible" : "hidden"}
          className="overflow-hidden"
        >
          <div className="space-y-8 pt-4 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Problem
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How I Solved It
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.process}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Solution
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {project.solution}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Results
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.impact.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center space-x-3 bg-green-50 rounded-lg p-3"
                  >
                    <span className="text-green-600 font-bold text-lg">✓</span>
                    <span className="text-gray-700 text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Key Insight
              </h3>
              <p className="text-blue-600 italic leading-relaxed bg-blue-50 rounded-lg p-4">
                "{project.lessons}"
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default ProjectCard