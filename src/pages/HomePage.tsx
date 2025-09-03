import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import ParticleField from '../components/ParticleField'
import MorphingLayout from '../components/MorphingLayout'
import InteractiveDataArt from '../components/InteractiveDataArt'

const HomePage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
        <HeroSection scrollY={0} />
        
        <MorphingLayout morphType="golden" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                How I Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple process. Powerful results. Your financial systems become intuitive.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <MorphingLayout morphType="data" className="text-center bg-white/60 rounded-xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Find the Problem</h3>
                <p className="text-gray-600">Every complex system has one core issue. I find it fast.</p>
              </MorphingLayout>
              
              <MorphingLayout morphType="organic" className="text-center bg-white/60 rounded-xl p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Build the Solution</h3>
                <p className="text-gray-600">Clean code. Smart design. Systems that work perfectly.</p>
              </MorphingLayout>
              
              <MorphingLayout morphType="golden" className="text-center bg-white/60 rounded-xl p-8">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Measure Success</h3>
                <p className="text-gray-600">Real metrics. Clear improvements. Proven results.</p>
              </MorphingLayout>
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