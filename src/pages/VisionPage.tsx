import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const VisionPage = () => {
  const focusAreas = [
    {
      title: "Smart Inventory",
      icon: "🧠",
      description: "AI-driven monitoring that alerts owners when stock levels deviate from normal patterns, investigates causes, and recommends corrective actions.",
      tech: ["Machine Learning", "Predictive Analytics", "IoT Integration"],
      gradient: "from-blue-600 to-purple-600",
      delay: 0.2
    },
    {
      title: "Intelligent Pricing",
      icon: "📊",
      description: "Continuous benchmarking of supplier prices, market trends, and historical data to identify fair pricing and negotiate better deals.",
      tech: ["Real-time Analytics", "Market Intelligence", "Automated Negotiation"],
      gradient: "from-purple-600 to-pink-600",
      delay: 0.4
    },
    {
      title: "Automated Financial Analysis",
      icon: "⚡",
      description: "Real-time cash flow forecasting, debtor scoring, and tailored payment terms that strengthen financial stability.",
      tech: ["Financial Modeling", "Risk Assessment", "Predictive Finance"],
      gradient: "from-pink-600 to-red-600",
      delay: 0.6
    },
    {
      title: "Customer & Supplier Collaboration",
      icon: "🤝",
      description: "Tools that communicate directly with debtors and suppliers, streamline orders, organize delivery, and ensure healthy business relationships.",
      tech: ["Communication APIs", "Workflow Automation", "Relationship Management"],
      gradient: "from-red-600 to-orange-600",
      delay: 0.8
    }
  ]

  const timelineItems = [
    {
      phase: "Foundation Building",
      timeframe: "2025-2026",
      focus: "Core AI Infrastructure",
      description: "Develop foundational AI systems for financial analysis and inventory management with initial MVP deployments.",
      icon: "🏗️"
    },
    {
      phase: "Intelligent Integration",
      timeframe: "2026-2027", 
      focus: "Smart Automation",
      description: "Launch automated pricing algorithms and supplier relationship tools, creating interconnected business intelligence ecosystem.",
      icon: "🔗"
    },
    {
      phase: "Market Leadership",
      timeframe: "2027-2030",
      focus: "Industry Transformation",
      description: "Scale solutions globally, establish new industry standards, and mentor next generation of AI-powered financial innovators.",
      icon: "🚀"
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Dark Gradient */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-serif-elegant text-white mb-8 leading-tight">
              Future Plans
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                & Vision
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-sans-elegant"
            >
              I am motivated to build solutions where AI and coding technologies collaborate 
              to transform financial management. My goal is to create intelligent applications 
              that analyze cash flows, optimize inventory, and automate decision-making—helping 
              organizations run smarter, faster, and with greater resilience.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-24 px-6 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif-elegant text-white mb-6">
              Core Focus Areas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four pillars of innovation that will reshape how businesses operate in the AI-driven future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: area.delay, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 } 
                }}
                className="group relative"
              >
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${area.gradient} shadow-2xl transform-gpu`}>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-4">{area.icon}</span>
                      <h3 className="text-2xl font-serif-elegant text-white">
                        {area.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/90 font-sans-elegant leading-relaxed mb-6">
                      {area.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {area.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm text-white font-sans-elegant"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Creation */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-serif-elegant text-white mb-8">
                  Value Creation
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-gray-300 leading-relaxed font-sans-elegant">
                    These tools are not only about efficiency—they create real value by helping 
                    companies minimize waste, improve competitiveness, and make better strategic decisions.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed font-sans-elegant">
                    My vision is to provide businesses with AI-powered assistants that free leaders 
                    from repetitive tasks and allow them to focus on growth and innovation.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { metric: "85%", label: "Waste Reduction" },
                  { metric: "3x", label: "Decision Speed" },
                  { metric: "60%", label: "Cost Savings" },
                  { metric: "10x", label: "Efficiency Gain" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="text-center p-6 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl"
                  >
                    <div className="text-3xl font-bold text-white mb-2">
                      {item.metric}
                    </div>
                    <div className="text-gray-300 font-sans-elegant">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif-elegant text-white mb-6">
              Roadmap to the Future
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A strategic timeline for transforming vision into reality
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-purple-400 hidden md:block" />
            
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative flex items-start space-x-8"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center z-10 shadow-lg">
                    <span className="text-white text-xl">{item.icon}</span>
                  </div>
                  
                  <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-serif-elegant text-white mb-2 md:mb-0">
                        {item.phase}
                      </h3>
                      <div className="flex flex-col md:items-end">
                        <span className="text-blue-400 font-sans-elegant font-semibold mb-1">
                          {item.timeframe}
                        </span>
                        <span className="text-purple-400 font-sans-elegant text-sm">
                          {item.focus}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-sans-elegant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Commitment */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10"
          >
            <h2 className="text-4xl font-serif-elegant text-white mb-8">
              Personal Commitment
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-sans-elegant mb-8">
              I believe technology should make the world better by creating tangible value. 
              My future projects aim to deliver solutions that empower organizations, support 
              entrepreneurs, and contribute to smarter, more sustainable economies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl transition-all hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-2xl transform hover:scale-105"
                aria-label="Contact Boris to collaborate"
              >
                <span className="flex items-center space-x-3">
                  <span className="font-semibold font-sans-elegant">Join the Vision</span>
                  <motion.span 
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
              
              <Link
                to="/projects"
                className="group px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-xl transition-all hover:bg-blue-400 hover:text-white"
                aria-label="View current projects"
              >
                <span className="font-semibold font-sans-elegant">See Current Work</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default VisionPage