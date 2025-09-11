import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import MorphingLayout from '../components/MorphingLayout'
import CareerTimeline from '../components/CareerTimeline'

interface Project {
  id: number
  title: string
  company: string
  role: string
  period: string
  category: string
  impact: string[]
  technologies: string[]
  description: string
  metrics?: {
    label: string
    value: string
    color: string
  }[]
}

const WorkPage = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const isInView = useInView(heroRef, { once: true, amount: 0.3 })

  const projects: Project[] = [
    {
      id: 1,
      title: "Agricultural Price Forecasting & Risk Management",
      company: "Agency of Agricultural Projects Management",
      role: "Lead Financial Analyst & Team Manager",
      period: "2023 - Present",
      category: "Government Finance",
      impact: [
        "Led econometric modeling for ministry-level agricultural price forecasting",
        "Managed cross-functional team of 8+ database specialists",
        "Designed end-to-end grant-to-debtor operational framework"
      ],
      technologies: ["ARIMAX/SARIMAX", "DSGE Models", "Excel", "SQL", "Python", "Power BI"],
      description: "Advanced econometric modeling combining macroeconomic variables with agricultural price dynamics. Implemented comprehensive grant management system with automated risk assessment and portfolio analytics.",
      metrics: [
        { label: "Forecast Accuracy", value: "92%", color: "text-green-600" },
        { label: "Team Size", value: "8+", color: "text-blue-600" },
        { label: "Portfolio Value", value: "$50M+", color: "text-purple-600" }
      ]
    },
    {
      id: 2,
      title: "Corporate Valuation & Strategic Consulting",
      company: "JSC SavvY",
      role: "Senior Financial Consultant",
      period: "2022 - Present",
      category: "Financial Services",
      impact: [
        "Delivered 20+ successful corporate valuation and restructuring projects",
        "Built proprietary financial modeling frameworks and dashboard systems",
        "Created automated reporting systems with executive-level KPI storytelling"
      ],
      technologies: ["DCF Models", "Monte Carlo", "Excel VBA", "Power Query", "Tableau", "PDF APIs"],
      description: "Specialized financial consulting for M&A transactions, corporate restructuring, and strategic planning. Developed innovative client presentation systems with controlled access mechanisms.",
      metrics: [
        { label: "Projects Delivered", value: "20+", color: "text-green-600" },
        { label: "Client Satisfaction", value: "95%", color: "text-blue-600" },
        { label: "Revenue Impact", value: "$5M+", color: "text-purple-600" }
      ]
    },
    {
      id: 3,
      title: "Blockchain Governance & Policy Framework",
      company: "Girchi (Parliament)",
      role: "Financial Technology Architect",
      period: "2021 - 2022",
      category: "Government Technology",
      impact: [
        "Designed revolutionary blockchain-based governance financial system",
        "Solved complex algorithmic challenges for fair resource distribution",
        "Built auditable transparency mechanisms for public financial decisions"
      ],
      technologies: ["Blockchain", "Smart Contracts", "React", "Node.js", "PostgreSQL", "Cryptography"],
      description: "Pioneered blockchain-based democratic governance system with sophisticated financial policy framework. Created algorithms for temporal coin distribution and transparent audit trails.",
      metrics: [
        { label: "System Uptime", value: "99.9%", color: "text-green-600" },
        { label: "Transactions", value: "10K+", color: "text-blue-600" },
        { label: "Transparency Score", value: "100%", color: "text-purple-600" }
      ]
    },
    {
      id: 4,
      title: "Enterprise Java Development",
      company: "EPAM Systems",
      role: "Senior Software Engineer",
      period: "2020 - 2021",
      category: "Technology",
      impact: [
        "Selected from 500+ candidates as top 2 performer in technical evaluation",
        "Delivered enterprise-grade microservices architecture solutions",
        "Achieved 99.9% uptime for high-traffic applications serving millions"
      ],
      technologies: ["Java", "Spring Boot", "Docker", "Kubernetes", "PostgreSQL", "Redis", "AWS"],
      description: "Full-stack enterprise development focusing on scalable microservices architecture. Built high-performance applications with emphasis on reliability, performance, and cloud-native deployment strategies.",
      metrics: [
        { label: "Uptime", value: "99.9%", color: "text-green-600" },
        { label: "Requests/sec", value: "10K+", color: "text-blue-600" },
        { label: "Code Coverage", value: "95%", color: "text-purple-600" }
      ]
    },
    {
      id: 5,
      title: "Advanced Accounting Education",
      company: "Ilia State University",
      role: "Senior Lecturer (ACCA F2)",
      period: "2019 - 2022",
      category: "Education",
      impact: [
        "Designed interactive curriculum for 200+ students per semester",
        "Achieved top 5% faculty rating for student satisfaction and outcomes",
        "Integrated real-world case studies with theoretical frameworks"
      ],
      technologies: ["Excel Advanced", "Case Studies", "Financial Modeling", "Interactive Simulations"],
      description: "Pioneered innovative teaching methodology combining theoretical knowledge with practical applications. Created comprehensive case study library and interactive decision-making exercises.",
      metrics: [
        { label: "Students Taught", value: "1000+", color: "text-green-600" },
        { label: "Satisfaction Rating", value: "4.8/5", color: "text-blue-600" },
        { label: "Pass Rate", value: "92%", color: "text-purple-600" }
      ]
    },
    {
      id: 6,
      title: "Java Development Training Program",
      company: "Bitcamp",
      role: "Lead Instructor & Curriculum Designer",
      period: "2020 - 2021",
      category: "EdTech",
      impact: [
        "Designed comprehensive full-stack Java development curriculum",
        "Achieved 95% job placement rate for program graduates",
        "Integrated modern development practices and cloud deployment strategies"
      ],
      technologies: ["Java", "Spring", "Docker", "CI/CD", "Testing Frameworks", "Cloud Platforms"],
      description: "Created industry-leading Java development program with focus on practical skills and modern engineering workflows. Graduates joined major tech companies with strong foundation.",
      metrics: [
        { label: "Job Placement", value: "95%", color: "text-green-600" },
        { label: "Student Rating", value: "4.9/5", color: "text-blue-600" },
        { label: "Graduates Hired", value: "150+", color: "text-purple-600" }
      ]
    }
  ]

  const getCategoryStyles = (category: string) => {
    if (category.includes('Government')) return 'bg-renaissance-gold/10 text-renaissance-gold'
    if (category.includes('Technology')) return 'bg-renaissance-blue/10 text-renaissance-blue'
    if (category.includes('Education')) return 'bg-renaissance-green/10 text-renaissance-green'
    return 'bg-renaissance-brown/10 text-renaissance-brown'
  }

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
            className="text-6xl md:text-8xl font-serif-elegant text-renaissance-brown mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            My Work
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-renaissance-blue font-sans-elegant mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Where Finance Meets Technology
          </motion.p>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-renaissance-brown/60">
            <span className="text-sm font-sans-elegant mb-2">Explore my journey</span>
            <div className="w-px h-12 bg-renaissance-gold"></div>
          </div>
        </motion.div>
      </div>

      {/* Career Timeline */}
      <CareerTimeline />

      {/* Projects Grid */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif-elegant text-renaissance-brown mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-renaissance-blue font-sans-elegant max-w-2xl mx-auto leading-relaxed">
            Transforming business challenges into innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-3xl p-8 shadow-lg border border-renaissance-gold/10 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, borderColor: 'rgba(212, 175, 55, 0.3)' }}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-sans-elegant font-semibold mb-4 ${getCategoryStyles(project.category)}`}>
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-serif-elegant font-bold text-renaissance-brown mb-2 leading-tight group-hover:text-renaissance-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-renaissance-blue font-sans-elegant text-sm mb-2">
                    {project.company} • {project.role}
                  </p>
                  <p className="text-renaissance-brown/60 font-sans-elegant text-sm">
                    {project.period}
                  </p>
                </div>
                <motion.div
                  className="ml-4 text-renaissance-gold"
                  animate={{ rotate: selectedProject === project.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </div>

              {/* Project Summary */}
              <p className="text-renaissance-brown/80 font-sans-elegant leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Key Impact */}
              <div className="mb-6">
                <h4 className="text-sm font-sans-elegant font-semibold text-renaissance-brown mb-3 uppercase tracking-wide">
                  Key Impact
                </h4>
                <ul className="space-y-2">
                  {project.impact.slice(0, selectedProject === project.id ? project.impact.length : 2).map((impact, impactIndex) => (
                    <li key={impactIndex} className="text-renaissance-brown/70 font-sans-elegant text-sm flex items-start leading-relaxed">
                      <span className="text-renaissance-gold mr-3 mt-1.5 flex-shrink-0">•</span>
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-sans-elegant font-semibold text-renaissance-brown mb-3 uppercase tracking-wide">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-renaissance-cream rounded-full text-xs font-sans-elegant text-renaissance-brown/70 border border-renaissance-gold/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <motion.div
                  className="grid grid-cols-3 gap-4 pt-6 border-t border-renaissance-gold/10"
                  initial={{ opacity: selectedProject === project.id ? 1 : 0.7 }}
                  animate={{ opacity: selectedProject === project.id ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className={`text-2xl font-serif-elegant font-bold mb-1 ${metric.color}`}>
                        {metric.value}
                      </div>
                      <div className="text-xs font-sans-elegant text-renaissance-brown/60">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

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
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default WorkPage