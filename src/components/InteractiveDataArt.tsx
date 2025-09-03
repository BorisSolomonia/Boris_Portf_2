import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface DataPoint {
  value: number
  timestamp: number
  id: string
}

const InteractiveDataArt = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const intervalRef = useRef<number>()

  const generateDataPoint = () => {
    const newPoint: DataPoint = {
      value: Math.random() * 100,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    }
    
    setDataPoints(prev => {
      const updated = [...prev, newPoint].slice(-20) // Keep last 20 points
      return updated
    })
  }

  const startGeneration = () => {
    setIsGenerating(true)
    intervalRef.current = setInterval(generateDataPoint, 200)
    
    setTimeout(() => {
      setIsGenerating(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }, 5000)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const maxValue = Math.max(...dataPoints.map(p => p.value), 1)

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Live Data Art
          </h3>
          <p className="text-gray-600">
            Watch financial data transform into visual poetry
          </p>
        </div>
        
        <motion.button
          onClick={startGeneration}
          disabled={isGenerating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGenerating ? 'Generating...' : 'Generate Data Art'}
        </motion.button>
      </div>

      <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated background waves */}
          <motion.path
            d="M0,100 Q100,80 200,100 T400,100 V200 H0 V100"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,100 Q100,80 200,100 T400,100 V200 H0 V100",
                "M0,120 Q100,100 200,120 T400,120 V200 H0 V100",
                "M0,100 Q100,80 200,100 T400,100 V200 H0 V100"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Data visualization */}
          {dataPoints.map((point, index) => {
            const x = (index / (dataPoints.length - 1 || 1)) * 380 + 10
            const y = 180 - (point.value / maxValue) * 160
            const prevPoint = dataPoints[index - 1]
            const prevX = prevPoint ? ((index - 1) / (dataPoints.length - 1)) * 380 + 10 : x
            const prevY = prevPoint ? 180 - (prevPoint.value / maxValue) * 160 : y

            return (
              <g key={point.id}>
                {/* Connection line to previous point */}
                {index > 0 && (
                  <motion.line
                    x1={prevX}
                    y1={prevY}
                    x2={x}
                    y2={y}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Data point */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="0"
                  fill="#1D4ED8"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 4, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Value label */}
                <motion.text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {point.value.toFixed(0)}
                </motion.text>

                {/* Ripple effect */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="0"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1"
                  opacity="0"
                  animate={{
                    r: [0, 20, 30],
                    opacity: [0.6, 0.2, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut"
                  }}
                />
              </g>
            )
          })}

          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating metrics */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="bg-white/90 rounded-lg px-3 py-1 text-sm">
            <span className="text-gray-500">Points:</span> 
            <span className="font-semibold ml-1">{dataPoints.length}</span>
          </div>
          {dataPoints.length > 0 && (
            <div className="bg-white/90 rounded-lg px-3 py-1 text-sm">
              <span className="text-gray-500">Latest:</span> 
              <span className="font-semibold ml-1">
                {dataPoints[dataPoints.length - 1]?.value.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Statistical insights */}
      {dataPoints.length > 3 && (
        <motion.div
          className="mt-6 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(dataPoints.reduce((sum, p) => sum + p.value, 0) / dataPoints.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...dataPoints.map(p => p.value)).toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">Peak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {dataPoints.length > 1 
                ? ((dataPoints[dataPoints.length - 1].value - dataPoints[0].value) > 0 ? '+' : '') +
                  (dataPoints[dataPoints.length - 1].value - dataPoints[0].value).toFixed(1)
                : '0.0'}
            </div>
            <div className="text-sm text-gray-500">Change</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default InteractiveDataArt