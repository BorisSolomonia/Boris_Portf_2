import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo, type ReactNode } from 'react'

interface MorphingLayoutProps {
  children: ReactNode
  className?: string
  morphType?: 'golden' | 'organic' | 'data'
}

const MorphingLayout = ({ children, className = '', morphType = 'golden' }: MorphingLayoutProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })
  const [morphState, setMorphState] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setMorphState(prev => (prev + 1) % 4)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [isInView])

  useEffect(() => {
    if (!isInView && morphState !== 0) {
      setMorphState(0)
    }
  }, [isInView, morphState])

  const floatingDotAnimations = useMemo(() => {
    const keyframeCount = 3
    const createKeyframes = (count: number, max: number) =>
      Array.from({ length: count }, () => Math.random() * max)

    return Array.from({ length: 8 }, (_, index) => ({
      x: createKeyframes(keyframeCount, 300),
      y: createKeyframes(keyframeCount, 200),
      duration: 8 + index * 0.5 + Math.random(),
      delay: Math.random() * 1.5
    }))
  }, [])

  const getMorphPath = () => {
    switch (morphType) {
      case 'golden':
        // Golden ratio spiral morphing
        const phi = 1.618
        switch (morphState) {
          case 0: return `M0,0 Q${100/phi},${100/phi} 100,100 Q${200-100/phi},${100/phi} 200,0 Q${200-100/phi},${-100/phi} 100,-100 Q${100/phi},${-100/phi} 0,0`
          case 1: return `M0,0 Q${80/phi},${120/phi} 100,100 Q${180-100/phi},${120/phi} 180,20 Q${180-100/phi},${-80/phi} 100,-80 Q${80/phi},${-80/phi} 0,0`
          case 2: return `M0,0 Q${120/phi},${80/phi} 100,100 Q${220-100/phi},${80/phi} 220,0 Q${220-100/phi},${-120/phi} 100,-120 Q${120/phi},${-120/phi} 0,0`
          default: return `M0,0 Q${100/phi},${100/phi} 100,100 Q${200-100/phi},${100/phi} 200,0 Q${200-100/phi},${-100/phi} 100,-100 Q${100/phi},${-100/phi} 0,0`
        }
      
      case 'organic':
        // Organic flowing shapes
        switch (morphState) {
          case 0: return `M20,50 Q50,20 80,50 Q110,80 140,50 Q170,20 200,50 Q230,80 200,110 Q170,140 140,110 Q110,80 80,110 Q50,140 20,110 Q-10,80 20,50`
          case 1: return `M30,40 Q60,10 90,40 Q120,70 150,40 Q180,10 210,40 Q240,70 210,100 Q180,130 150,100 Q120,70 90,100 Q60,130 30,100 Q0,70 30,40`
          case 2: return `M25,45 Q55,15 85,45 Q115,75 145,45 Q175,15 205,45 Q235,75 205,105 Q175,135 145,105 Q115,75 85,105 Q55,135 25,105 Q-5,75 25,45`
          default: return `M20,50 Q50,20 80,50 Q110,80 140,50 Q170,20 200,50 Q230,80 200,110 Q170,140 140,110 Q110,80 80,110 Q50,140 20,110 Q-10,80 20,50`
        }

      case 'data':
        // Data-driven geometric morphing
        switch (morphState) {
          case 0: return `M0,0 L100,0 L100,100 L0,100 Z`
          case 1: return `M20,0 L80,0 Q100,20 100,50 Q100,80 80,100 L20,100 Q0,80 0,50 Q0,20 20,0 Z`
          case 2: return `M50,0 L100,25 L75,75 L25,75 L0,25 Z`
          default: return `M0,0 L100,0 L100,100 L0,100 Z`
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Morphing background shape */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full opacity-5"
          style={{ filter: 'blur(20px)' }}
        >
          <motion.path
            fill="url(#morphGradient)"
            animate={{
              d: getMorphPath(),
            }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating data points */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingDotAnimations.map((animation, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            animate={{
              x: animation.x,
              y: animation.y
            }}
            transition={{
              duration: animation.duration,
              repeat: Infinity,
              repeatDelay: animation.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default MorphingLayout
