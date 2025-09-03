import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import SavvYProjects from '../components/SavvYProjects'

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Smart Trading Platform",
      subtitle: "Making Market Data Simple",
      description: "A trading platform that turns complex market data into clear, actionable insights. Traders make better decisions faster.",
      challenge: "Traders were overwhelmed by information. Too much data, poor visualization, slow decisions.",
      process: "Studied how traders actually work. Built clean interfaces. Made data tell a story.",
      solution: "Simple dashboard. Clear charts. Smart alerts. Fast execution.",
      impact: [
        "300% faster trading decisions",
        "60% less time analyzing data", 
        "150% better risk assessment",
        "Used by 12 major firms"
      ],
      emoji: "📈",
      technologies: ["React", "D3.js", "WebGL", "Python", "TensorFlow", "PostgreSQL"],
      lessons: "Simple beats complex. When systems are intuitive, people perform better."
    },
    {
      id: 2,
      title: "Unified Business System",
      subtitle: "One System, All Departments", 
      description: "Connected 15 separate business systems into one. Everything talks to everything. No more duplicate work.",
      challenge: "Company had 15 different systems. Nothing connected. Lots of manual work. Slow reporting.",
      process: "Mapped every workflow. Found the connections. Built bridges between systems.",
      solution: "Single dashboard. Real-time data. Automated reports. Happy employees.",
      impact: [
        "Connected 15 systems into one",
        "85% less duplicate data entry",
        "200% faster reports",
        "40% cost reduction"
      ],
      emoji: "⚡",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Redis", "Docker", "Kubernetes"],
      lessons: "Integration is everything. When systems work together, businesses fly."
    },
    {
      id: 3,
      title: "Smart Forecasting Tool",
      subtitle: "Predict the Future with Confidence",
      description: "AI that predicts financial trends with 92% accuracy. Shows you why, not just what.",
      challenge: "Forecasts were black boxes. Nobody trusted them. Planning was guesswork.",
      process: "Built transparent AI. Visual explanations. Clear confidence levels.",
      solution: "Beautiful charts. Clear predictions. Understand the why. Trust the results.",
      impact: [
        "92% accuracy in 6-month forecasts",
        "Stakeholders trust the predictions",
        "75% faster forecast creation",
        "Better planning across 8 departments"
      ],
      emoji: "🔮",
      technologies: ["Python", "Pandas", "Plotly", "FastAPI", "scikit-learn", "PostgreSQL"],
      lessons: "Transparency builds trust. When people understand AI, they use it better."
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <p className="text-lg text-blue-600 mb-4 font-medium">
              this page itself is one of my projects of course :)
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              My Work
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real projects. Real results. Complex problems made simple.
            </p>
          </motion.div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SavvY Experience Section */}
      <SavvYProjects />
    </div>
  )
}

export default ProjectsPage