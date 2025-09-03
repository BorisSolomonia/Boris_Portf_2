import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

interface ParticleFieldProps {
  mouseX: number
  mouseY: number
  isHovered: boolean
}

const ParticleField = ({ mouseX, mouseY, isHovered }: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#3B82F6', '#1D4ED8', '#2563EB', '#1E40AF']
    
    const createParticle = (x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * dimensions.width,
      y: y ?? Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200
    })

    // Initialize particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 150; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle physics
        particle.life++
        
        // Mouse attraction/repulsion
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150 && isHovered) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.3
          particle.vy += (dy / distance) * force * 0.3
        }

        // Apply golden ratio spiral force
        const centerX = dimensions.width / 2
        const centerY = dimensions.height / 2
        const angle = Math.atan2(particle.y - centerY, particle.x - centerX)
        const spiralForce = 0.001
        particle.vx += Math.cos(angle + Math.PI / 2) * spiralForce
        particle.vy += Math.sin(angle + Math.PI / 2) * spiralForce

        // Friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = dimensions.width
        if (particle.x > dimensions.width) particle.x = 0
        if (particle.y < 0) particle.y = dimensions.height
        if (particle.y > dimensions.height) particle.y = 0

        // Draw particle
        const alpha = 1 - (particle.life / particle.maxLife)
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.globalAlpha = (100 - distance) / 100 * 0.3
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })

        // Remove dead particles and create new ones
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = createParticle()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, mouseX, mouseY, isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(29, 78, 216, 0.05) 100%)'
      }}
    />
  )
}

export default ParticleField