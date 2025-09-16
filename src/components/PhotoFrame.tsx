import { motion } from 'framer-motion'
import { useState } from 'react'
import FloatingSkills from './FloatingSkills'

const PhotoFrame = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      {/* Main photo container with modern frame */}
      <motion.div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Outer frame - contemporary minimal border */}
        <div className="relative w-80 h-80 mx-auto">
          {/* Animated border elements */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #1D4ED8, #2563EB, #1E40AF)',
              padding: '3px'
            }}
            animate={{ 
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-white rounded-2xl" />
          </motion.div>

          {/* Inner shadow frame */}
          <div className="absolute inset-2 rounded-xl shadow-inner bg-gradient-to-br from-gray-50 to-gray-100">
            
            {/* Profile Photo */}
            <div className="absolute inset-3 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                src="/images/profile-photo.jpg"
                alt="Boris Solomonia - Financial Technology Consultant"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.fallback-content');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              
              {/* Fallback content if image doesn't load */}
              <div className="fallback-content hidden w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl text-white font-bold">B</span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">Boris Solomonia</p>
                </div>
              </div>

              {/* Subtle overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Corner accent details */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-3 border-t-3 border-blue-500 rounded-tl-lg opacity-70" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-r-3 border-t-3 border-blue-500 rounded-tr-lg opacity-70" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-3 border-b-3 border-blue-500 rounded-bl-lg opacity-70" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-3 border-b-3 border-blue-500 rounded-br-lg opacity-70" />

          {/* Floating elements around the frame */}
          {isHovered && (
            <>
              <motion.div
                className="absolute -top-8 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-60"
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-6 right-1/3 w-3 h-3 bg-indigo-400 rounded-full opacity-50"
                initial={{ scale: 0, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.div
                className="absolute top-1/3 -right-8 w-2 h-2 bg-blue-300 rounded-full opacity-70"
                initial={{ scale: 0, x: -10 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: -10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
            </>
          )}
          {/* Floating skills orbiting around the photo */}
          <FloatingSkills />
        </div>

        {/* Contemporary text label */}
        {/* <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-gray-700 font-medium text-sm">Visionary & Innovator</span>
        </motion.div> */}
      </motion.div>

      {/* Background accent shape */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 -z-10">
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 opacity-30"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>
    </div>
  )
}

export default PhotoFrame
