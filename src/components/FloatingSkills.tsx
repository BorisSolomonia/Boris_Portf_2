import { motion } from 'framer-motion'

type Skill = {
  key: string
  label: string
  x: string
  y: string
}

// Minimal inline SVG icons for each skill
const Icon = ({ type }: { type: string }) => {
  const common = 'w-4 h-4 sm:w-5 sm:h-5 mr-1.5 flex-shrink-0'
  switch (type) {
    case 'excel':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#1D6F42" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">X</text>
        </svg>
      )
    case 'java':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 5c2 2-2 2 0 4s-3 2 0 4" stroke="#E76F00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="12" cy="17.5" rx="6" ry="2.2" fill="#3465A4" opacity="0.25" />
        </svg>
      )
    case 'sql':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <ellipse cx="12" cy="6" rx="7" ry="3" fill="#4F46E5" opacity="0.9" />
          <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6" fill="#4F46E5" opacity="0.65" />
        </svg>
      )
    case 'spring':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 4c4.4 0 8 3.6 8 8s-3.6 8-8 8a8 8 0 1 1 0-16z" fill="#6DB33F" />
          <path d="M8 13c2-3 6-3 8-1" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'oauth':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <rect x="3" y="9" width="18" height="10" rx="2" fill="#0EA5E9" />
          <path d="M9 9V7a3 3 0 1 1 6 0v2" stroke="#fff" strokeWidth="2" fill="none" />
        </svg>
      )
    case 'gcp':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M8 15h8a3 3 0 0 0 0-6 4.5 4.5 0 0 0-8.6-1.6A3.5 3.5 0 0 0 8 15z" fill="#4285F4" />
        </svg>
      )
    case 'finance':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <polyline points="4,16 9,12 13,14 20,8" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 8h-4v4" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'om':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <circle cx="9" cy="12" r="3" stroke="#475569" strokeWidth="2" fill="none" />
          <path d="M9 6v2M9 16v2M5 12H3m12 0h2m-9.2-4.2l-1.4-1.4m8.4 8.4l1.4 1.4" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

const skills: Skill[] = [
  { key: 'excel', label: 'MS Excel', x: '-60px', y: '-24px' },
  { key: 'java', label: 'Java', x: '260px', y: '10px' },
  { key: 'sql', label: 'SQL', x: '-70px', y: '160px' },
  { key: 'spring', label: 'SP Boot', x: '230px', y: '170px' },
  { key: 'oauth', label: 'OAuth', x: '50%', y: '-50px' },
  { key: 'gcp', label: 'GCP', x: '75%', y: '120px' },
  { key: 'finance', label: 'Finance', x: '10%', y: '210px' },
  { key: 'om', label: 'OM', x: '-40px', y: '60%' },
]

const floatAnim = {
  initial: { opacity: 0, y: 6, scale: 0.95 },
  animate: (i: number) => ({
    opacity: 1,
    y: [0, -6, 0],
    transition: {
      delay: 0.2 + i * 0.07,
      duration: 3 + (i % 3) * 0.4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}

export default function FloatingSkills() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      {skills.map((s, i) => (
        <motion.div
          key={s.key}
          custom={i}
          variants={floatAnim}
          initial="initial"
          animate="animate"
          style={{ position: 'absolute', left: s.x, top: s.y }}
          className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm px-2.5 py-1 text-[10px] sm:text-xs text-gray-700"
        >
          <Icon type={s.key} />
          <span>{s.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
