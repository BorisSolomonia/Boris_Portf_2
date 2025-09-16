import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import SavvYProjects from '../components/SavvYProjects'
import ProtectedPDFViewer from '../components/ProtectedPDFViewer'

const ProjectsPage = () => {
  const techProjects = [
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
      lessons: "Simple beats complex. When systems are intuitive, people perform better.",
      type: "tech",
      coverImage: "/projects/covers/trading-platform.jpg",
      demoUrl: "https://trading-demo.example.com",
      githubUrl: "https://github.com/BorisSolomonia/trading-platform"
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
      lessons: "Integration is everything. When systems work together, businesses fly.",
      type: "tech",
      coverImage: "/projects/covers/business-system.jpg",
      githubUrl: "https://github.com/BorisSolomonia/unified-system"
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
      lessons: "Transparency builds trust. When people understand AI, they use it better.",
      type: "tech",
      coverImage: "/projects/covers/forecasting-tool.jpg",
      demoUrl: "https://forecast-demo.example.com"
    }
  ]

  const financeProjects = [
    {
      id: 4,
      title: "Corporate Valuation Model",
      description: "Comprehensive DCF and comparable company analysis for M&A transactions",
      pdfPath: "/projects/finance/protected/Boris_Solomonia_Finance_CV_02082025.pdf", // Replace with your PDF filename
      type: "finance",
      coverImage: "/projects/covers/valuation.jpg"
    },
    {
      id: 5,
      title: "Risk Management Framework",
      description: "Enterprise risk assessment and mitigation strategies for financial institutions",
      pdfPath: "https://storage.googleapis.com/boris-portfolio-finance/risk-framework.pdf",
      type: "finance",
      coverImage: "https://storage.googleapis.com/boris-portfolio-assets/covers/risk-management.jpg"
    },
    {
      id: 6,
      title: "Budget Planning System",
      description: "Advanced budgeting and forecasting model with scenario analysis",
      pdfPath: "https://storage.googleapis.com/boris-portfolio-finance/budget-planning.pdf",
      type: "finance",
      coverImage: "https://storage.googleapis.com/boris-portfolio-assets/covers/budget-planning.jpg"
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

          {/* Tech Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🛠️ Technology Projects
            </h2>
            <div className="space-y-16">
              {techProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Finance Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              💼 Finance Projects
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Professional finance projects with confidential content protection
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {financeProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * project.id, duration: 0.6 }}
                >
                  <ProtectedPDFViewer
                    pdfPath={project.pdfPath}
                    title={project.title}
                    description={project.description}
                    coverImage={project.coverImage}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SavvY Experience Section */}
      <SavvYProjects />
    </div>
  )
}

export default ProjectsPage