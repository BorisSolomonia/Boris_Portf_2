import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import DynamicFinanceSection from '../components/DynamicFinanceSection'

const ProjectsPage = () => {
  const techProjects = [
    {
      id: 1,
      title: 'Georgia Car Rental Platform',
      subtitle: 'Explore Georgia Your Way',
      description: 'Premium car rental service platform for discovering the beauty of Georgia. From city adventures to mountain escapes, providing the perfect vehicle for every journey.',
      challenge: 'Tourism industry needed a modern, user-friendly platform for car rentals with comprehensive coverage of Georgian destinations.',
      process: 'Developed a full-stack web application with intuitive booking system, vehicle management, and tourist destination integration.',
      solution: 'Beautiful, responsive platform featuring cars, tourist places, regions, and travel information with integrated Georgian music experience.',
      impact: [
        'Streamlined car rental process',
        'Enhanced tourism experience',
        'Integrated travel information',
        'Multi-language support'
      ],
      emoji: 'CR',
      technologies: ['React', 'Node.js', 'MongoDB', 'Responsive Design', 'Travel APIs'],
      lessons: 'Great UX in travel platforms directly translates to customer satisfaction and business growth.',
      type: 'tech',
      coverImage: '/projects/covers/geolander.png',
      demoUrl: 'https://ornate-dragon-82e353.netlify.app/'
    },
    {
      id: 2,
      title: 'Enterprise Resource Planning System',
      subtitle: 'Complete Business Management',
      description: 'Comprehensive ERP application managing financial data, transactions, and business operations with real-time reporting and analytics dashboard.',
      challenge: 'Businesses needed unified system to manage complex financial operations, reporting, and multi-currency transactions efficiently.',
      process: 'Built scalable ERP system with modular architecture supporting financial management, reporting, and business intelligence.',
      solution: 'Full-featured ERP with dashboard analytics, transaction management, multi-language support, and comprehensive reporting tools.',
      impact: [
        'GEL 51,400+ in managed transactions',
        'Multi-currency support (GEL 28,737)',
        'Real-time financial analytics',
        'Streamlined business operations'
      ],
      emoji: 'ERP',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'REST APIs'],
      lessons: 'Enterprise systems require robust architecture and intuitive interfaces to handle complex business workflows.',
      type: 'tech',
      coverImage: '/projects/covers/ERP.png',
      demoUrl: 'http://35.209.56.146/'
    },
    {
      id: 3,
      title: 'GirchiFin Data Processor',
      subtitle: 'Financial Data Transformation',
      description: 'Python-based financial data processing system that handles transaction mapping and automated file processing for financial analysis.',
      challenge: 'Complex financial data needed systematic processing and transaction mapping for analysis and reporting.',
      process: 'Built modular Python system with separate processing pipelines for different data types and formats.',
      solution: 'Automated data transformation with configurable mapping rules and batch processing capabilities.',
      impact: [
        'Automated financial data processing',
        'Configurable transaction mapping',
        'Batch processing capabilities',
        'Modular, maintainable codebase'
      ],
      emoji: 'DP',
      technologies: ['Python', 'Data Processing', 'File I/O', 'Configuration Management'],
      lessons: 'Modular design makes complex data processing manageable and scalable.',
      type: 'tech',
      coverImage: '/projects/covers/data-processor.jpg',
      githubUrl: 'https://github.com/BorisSolomonia/GirchiFin'
    },
    {
      id: 4,
      title: 'Brooks Frontend Application',
      subtitle: 'Modern Web Interface',
      description: 'Advanced frontend application showcasing modern web development practices with responsive design and optimized user experience.',
      challenge: 'Creating a sophisticated frontend interface with modern design patterns and optimal performance.',
      process: 'Implemented using contemporary frontend frameworks with focus on user experience and code maintainability.',
      solution: 'Responsive, accessible web application with clean architecture and modern UI patterns.',
      impact: [
        'Enhanced user experience',
        'Responsive across all devices',
        'Modern development practices',
        'Maintainable codebase'
      ],
      emoji: 'BF',
      technologies: ['Frontend Frameworks', 'Responsive Design', 'Modern CSS', 'JavaScript'],
      lessons: 'Good frontend architecture creates lasting value for both users and developers.',
      type: 'tech',
      coverImage: '/projects/covers/brooks-frontend.jpg',
      githubUrl: 'https://github.com/BorisSolomonia/brooks-new-front'
    },
    {
      id: 5,
      title: 'Greenscape.ge',
      subtitle: 'Landscaping Services Website',
      description: 'Public website for a landscaping company showcasing services, projects, and contact information.',
      challenge: 'Create a clean, trustworthy online presence that clearly presents services and drives inquiries.',
      process: 'Designed and implemented a responsive, fast-loading site with clear navigation and contact CTAs.',
      solution: 'Simple, mobile-first layout with service highlights, visuals, and easy ways to get in touch.',
      impact: [
        'Improved online credibility',
        'Responsive across devices',
        'SEO-friendly structure'
      ],
      emoji: 'GS',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      lessons: 'Clarity and speed matter most for small-business websites.',
      type: 'tech',
      demoUrl: 'https://greenscape.ge'
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
            <p className="text-lg text-renaissance-blue mb-4 font-medium">
              This page is a project too. It runs on the same system thinking I deliver for clients.
            </p>
            <h1 className="text-5xl md:text-6xl font-serif-elegant text-renaissance-brown mb-6">
              My Work
            </h1>
            <p className="text-xl text-renaissance-brown/70 max-w-3xl mx-auto leading-relaxed">
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
            <h2 className="text-3xl font-serif-elegant text-renaissance-brown mb-8 text-center">
              Technology Projects
            </h2>
            <div className="space-y-16">
              {techProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Finance Projects Section - Dynamic */}
          <DynamicFinanceSection />
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
