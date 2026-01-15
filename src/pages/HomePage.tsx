import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import ParticleField from '../components/ParticleField'
import MorphingLayout from '../components/MorphingLayout'
import InteractiveDataArt from '../components/InteractiveDataArt'
import EmailForm from '../components/EmailForm'

const HomePage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let ticking = false

    const updateScroll = () => {
      const currentScroll = window.scrollY || window.pageYOffset || 0
      setScrollY((prev) => {
        if (Math.abs(prev - currentScroll) < 1) {
          return prev
        }
        return currentScroll
      })
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    updateScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const workSteps = [
    {
      title: 'Find the Problem',
      description: 'Every complex system has one core issue. I find it fast.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      morphType: 'data'
    },
    {
      title: 'Build the Solution',
      description: 'Clean code. Smart design. Systems that work perfectly.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 010 1.4l-7.8 7.8-3.6.8.8-3.6 7.8-7.8a1 1 0 011.4 0l1.4 1.4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6h4a2 2 0 012 2v4" />
        </svg>
      ),
      morphType: 'organic'
    },
    {
      title: 'Measure Success',
      description: 'Real metrics. Clear improvements. Proven results.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v13h16V7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7l8-4 8 4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
        </svg>
      ),
      morphType: 'golden'
    }
  ] as const

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ParticleField
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        isHovered={isHovered}
      />

      <div className="min-h-screen pt-20 relative z-10">
        <HeroSection scrollY={scrollY} />

        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="relative bg-white/80 border border-renaissance-gold/30 rounded-3xl p-8 overflow-hidden">
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-renaissance-gold/10" />
            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-renaissance-blue/10" />
            <div className="relative">
              <h2 className="text-3xl font-serif-elegant text-renaissance-brown text-center mb-2">
                RS.ge MCP Download
              </h2>
              <p className="text-center text-renaissance-blue/80 font-sans-elegant mb-6">
                Receive the installer and a confirmation email for the RS.ge MCP setup.
              </p>
              <EmailForm />
              <div className="text-center mt-4">
                <Link to="/instructions" className="text-renaissance-blue hover:underline">
                  Instructions for installation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Top quick links: Work then Education */}
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/work"
              className="block rounded-2xl p-6 bg-white/70 border border-renaissance-gold/20 hover:shadow-lg transition"
            >
              <div className="text-sm font-sans-elegant text-renaissance-brown/60 mb-1">Explore</div>
              <div className="text-2xl font-serif-elegant text-renaissance-brown">Work</div>
              <div className="text-renaissance-blue/80 mt-1">Projects, impact, and experience</div>
            </Link>
            <Link
              to="/education"
              className="block rounded-2xl p-6 bg-white/70 border border-renaissance-gold/20 hover:shadow-lg transition"
            >
              <div className="text-sm font-sans-elegant text-renaissance-brown/60 mb-1">Next</div>
              <div className="text-2xl font-serif-elegant text-renaissance-brown">Education</div>
              <div className="text-renaissance-blue/80 mt-1">Timeline and certifications</div>
            </Link>
          </div>
        </div>

        <MorphingLayout morphType="golden" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif-elegant text-renaissance-brown mb-6">
                How I Work
              </h2>
              <p className="text-xl text-renaissance-blue/80 max-w-2xl mx-auto">
                Simple process. Powerful results. Your financial systems become intuitive.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {workSteps.map((step) => (
                <MorphingLayout
                  key={step.title}
                  morphType={step.morphType}
                  className="text-center bg-white/70 rounded-2xl p-8 border border-renaissance-gold/20"
                >
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-renaissance-gold/15 text-renaissance-brown flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-renaissance-brown mb-4">{step.title}</h3>
                  <p className="text-renaissance-blue/80">{step.description}</p>
                </MorphingLayout>
              ))}
            </div>
          </div>
        </MorphingLayout>

        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <InteractiveDataArt />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
