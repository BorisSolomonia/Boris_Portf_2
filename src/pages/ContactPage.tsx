import { motion } from 'framer-motion'
import { useState } from 'react'

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: '',
    budget: '',
    timeline: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formState)
    // Here you would integrate with your preferred form handling service
  }

  const contactMethods = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Direct Correspondence",
      detail: "borissolomonia@gmail.com",
      description: "For detailed project discussions and collaboration inquiries",
      link: "mailto:borissolomonia@gmail.com"
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#0077B5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: "Professional Network",
      detail: "LinkedIn Profile",
      description: "Connect for industry insights and partnership opportunities",
      link: "https://www.linkedin.com/in/boris-solomonia-mba-245b4855/"
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#333">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      title: "Creative Portfolio",
      detail: "GitHub Showcase",
      description: "Explore the technical artistry behind the solutions",
      link: "https://github.com/BorisSolomonia"
    }
  ]

  const projectTypes = [
    "ERP System Design & Implementation",
    "Trading Platform Development", 
    "Financial Data Visualization",
    "Risk Management Solutions",
    "Blockchain Integration",
    "AI/ML Financial Modeling",
    "Digital Transformation Strategy",
    "Other Renaissance Innovation"
  ]

  const budgetRanges = [
    "Exploring Possibilities ($5K - $15K)",
    "Serious Investment ($15K - $50K)", 
    "Enterprise Transformation ($50K - $150K)",
    "Visionary Partnership ($150K+)"
  ]

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-serif-elegant text-renaissance-brown mb-6">
              The Nexus of Creation
            </h1>
            <p className="text-xl text-renaissance-blue font-sans-elegant leading-relaxed max-w-3xl mx-auto">
              Every masterpiece begins with a conversation. Let us discuss how Renaissance principles 
              can transform your financial technology challenges into works of functional art.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="block bg-white/80 rounded-xl p-8 renaissance-shadow text-center lyrical-transition hover:bg-white/90 cursor-pointer"
              >
                <div className="flex justify-center mb-4">{method.icon}</div>
                <h3 className="text-xl font-serif-elegant text-renaissance-brown mb-3">
                  {method.title}
                </h3>
                <p className="text-renaissance-gold font-sans-elegant font-semibold mb-3">
                  {method.detail}
                </p>
                <p className="text-renaissance-brown/70 font-sans-elegant text-sm leading-relaxed">
                  {method.description}
                </p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="bg-white/90 rounded-2xl p-8 md:p-12 renaissance-shadow"
          >
            <h2 className="text-3xl font-serif-elegant text-renaissance-brown text-center mb-8">
              Commission Your Renaissance Solution
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="name" className="block text-renaissance-brown font-sans-elegant font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-renaissance-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-renaissance-gold/50 lyrical-transition bg-white/80"
                    placeholder="The visionary behind the project"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="email" className="block text-renaissance-brown font-sans-elegant font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-renaissance-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-renaissance-gold/50 lyrical-transition bg-white/80"
                    placeholder="your.vision@company.com"
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label htmlFor="company" className="block text-renaissance-brown font-sans-elegant font-semibold mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-renaissance-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-renaissance-gold/50 lyrical-transition bg-white/80"
                  placeholder="The institution ready for Renaissance"
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="project" className="block text-renaissance-brown font-sans-elegant font-semibold mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formState.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-renaissance-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-renaissance-gold/50 lyrical-transition bg-white/80"
                  >
                    <option value="">Select your vision...</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="budget" className="block text-renaissance-brown font-sans-elegant font-semibold mb-2">
                    Investment Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formState.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-renaissance-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-renaissance-gold/50 lyrical-transition bg-white/80"
                  >
                    <option value="">Select your commitment...</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label htmlFor="timeline" className="block text-renaissance-brown font-sans-elegant font-semibold mb-2">
                  Desired Timeline
                </label>
                <input
                  type="text"
                  id="timeline"
                  name="timeline"
                  value={formState.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-renaissance-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-renaissance-gold/50 lyrical-transition bg-white/80"
                  placeholder="When should our masterpiece be complete?"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label htmlFor="message" className="block text-renaissance-brown font-sans-elegant font-semibold mb-2">
                  Your Vision *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-renaissance-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-renaissance-gold/50 lyrical-transition bg-white/80 resize-none"
                  placeholder="Describe your challenges, dreams, and how you envision Renaissance principles transforming your financial technology..."
                />
              </motion.div>

              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center space-x-3 px-12 py-4 bg-renaissance-gold text-renaissance-cream rounded-lg lyrical-transition hover:bg-renaissance-brown renaissance-shadow group font-sans-elegant font-semibold text-lg"
                  aria-label="Submit contact form to begin collaboration"
                >
                  <span>Begin Our Renaissance</span>
                  <motion.span 
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-center mt-16 bg-visionary-gradient rounded-xl p-8"
          >
            <h3 className="text-2xl font-serif-elegant text-renaissance-brown mb-4">
              What Happens Next?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-sm font-sans-elegant text-renaissance-brown/80">
              <div>
                <span className="block text-renaissance-gold font-bold text-lg mb-2">1. Discovery</span>
                I'll respond within 24 hours to arrange a renaissance consultation where we explore your vision in depth.
              </div>
              <div>
                <span className="block text-renaissance-gold font-bold text-lg mb-2">2. Composition</span>
                Together we'll craft a detailed project symphony—timeline, investment, and artistic approach.
              </div>
              <div>
                <span className="block text-renaissance-gold font-bold text-lg mb-2">3. Creation</span>
                I'll bring Renaissance mastery to your financial technology, creating solutions that inspire and perform.
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage