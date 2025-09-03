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
      icon: "✉️",
      title: "Direct Correspondence",
      detail: "boris.renaissance@fintech.art",
      description: "For detailed project discussions and collaboration inquiries"
    },
    {
      icon: "💼",
      title: "Professional Network", 
      detail: "LinkedIn Profile",
      description: "Connect for industry insights and partnership opportunities"
    },
    {
      icon: "🎨",
      title: "Creative Portfolio",
      detail: "GitHub Showcase",
      description: "Explore the technical artistry behind the solutions"
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 rounded-xl p-8 renaissance-shadow text-center lyrical-transition"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-serif-elegant text-renaissance-brown mb-3">
                  {method.title}
                </h3>
                <p className="text-renaissance-gold font-sans-elegant font-semibold mb-3">
                  {method.detail}
                </p>
                <p className="text-renaissance-brown/70 font-sans-elegant text-sm leading-relaxed">
                  {method.description}
                </p>
              </motion.div>
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