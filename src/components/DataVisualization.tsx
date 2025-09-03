import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface DataVisualizationProps {
  type: 'spiral' | 'flow' | 'network' | 'golden-ratio'
  data?: any
  className?: string
}

const DataVisualization = ({ type, className = '' }: DataVisualizationProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const renderSpiral = () => {
    const points = []
    const goldenAngle = 137.508 * (Math.PI / 180)
    
    for (let i = 0; i < 50; i++) {
      const angle = i * goldenAngle
      const radius = Math.sqrt(i) * 8
      const x = Math.cos(angle) * radius + 150
      const y = Math.sin(angle) * radius + 150
      points.push({ x, y, delay: i * 0.05 })
    }

    return (
      <svg width="300" height="300" className={className}>
        <defs>
          <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.8)" />
            <stop offset="100%" stopColor="rgba(79, 109, 142, 0.8)" />
          </linearGradient>
        </defs>
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={Math.max(1, 6 - index * 0.1)}
            fill="url(#spiralGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 0.8 } : {}}
            transition={{ delay: point.delay, duration: 0.6 }}
          />
        ))}
      </svg>
    )
  }

  const renderFlow = () => {
    const paths = [
      "M50,150 Q100,50 150,150 T250,150",
      "M50,100 Q150,200 250,100", 
      "M50,200 Q100,100 150,200 T250,200"
    ]

    return (
      <svg width="300" height="300" className={className}>
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.3)" />
            <stop offset="50%" stopColor="rgba(79, 109, 142, 0.6)" />
            <stop offset="100%" stopColor="rgba(34, 139, 34, 0.3)" />
          </linearGradient>
        </defs>
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isVisible ? { pathLength: 1 } : {}}
            transition={{ delay: index * 0.5, duration: 2, ease: "easeInOut" }}
          />
        ))}
      </svg>
    )
  }

  const renderNetwork = () => {
    const nodes = [
      { x: 150, y: 50, size: 12 },
      { x: 50, y: 120, size: 8 },
      { x: 250, y: 120, size: 10 },
      { x: 100, y: 220, size: 6 },
      { x: 200, y: 220, size: 8 },
      { x: 150, y: 280, size: 4 }
    ]

    const connections = [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 4], [2, 3]
    ]

    return (
      <svg width="300" height="300" className={className}>
        <defs>
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 1)" />
            <stop offset="100%" stopColor="rgba(79, 109, 142, 0.8)" />
          </radialGradient>
        </defs>
        {connections.map(([start, end], index) => (
          <motion.line
            key={index}
            x1={nodes[start].x}
            y1={nodes[start].y}
            x2={nodes[end].x}
            y2={nodes[end].y}
            stroke="rgba(139, 69, 19, 0.3)"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          />
        ))}
        {nodes.map((node, index) => (
          <motion.circle
            key={index}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="url(#nodeGradient)"
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: index * 0.3, duration: 0.6 }}
          />
        ))}
      </svg>
    )
  }

  const renderGoldenRatio = () => {
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21]
    const scale = 8

    return (
      <svg width="300" height="300" className={className}>
        <defs>
          <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.2)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0.8)" />
          </linearGradient>
        </defs>
        {fibonacci.map((num, index) => {
          const size = num * scale
          return (
            <motion.rect
              key={index}
              x={150 - size/2}
              y={150 - size/2}
              width={size}
              height={size}
              fill="url(#goldenGradient)"
              stroke="rgba(212, 175, 55, 0.6)"
              strokeWidth="2"
              initial={{ scale: 0, rotate: 0 }}
              animate={isVisible ? { scale: 1, rotate: index * 15 } : {}}
              transition={{ delay: index * 0.2, duration: 1 }}
            />
          )
        })}
      </svg>
    )
  }

  const renderVisualization = () => {
    switch (type) {
      case 'spiral':
        return renderSpiral()
      case 'flow':
        return renderFlow()
      case 'network':
        return renderNetwork()
      case 'golden-ratio':
        return renderGoldenRatio()
      default:
        return renderSpiral()
    }
  }

  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {renderVisualization()}
    </motion.div>
  )
}

export default DataVisualization