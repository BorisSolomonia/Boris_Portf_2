import { motion } from 'framer-motion'

type Skill = {
  key: string
  label: string
}

// Minimal inline SVG icons for each skill
const Icon = ({ type }: { type: string }) => {
  const common = 'w-5 h-5 sm:w-6 sm:h-6 mr-1.5 flex-shrink-0'
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
    case 'docker':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M3 14c0 2.5 2 4.5 4.5 4.5H15c3.3 0 6-2.7 6-6 0-.3 0-.6-.1-.9" fill="#2396ED" opacity="0.2" />
          <rect x="6" y="9" width="3" height="3" fill="#2396ED" />
          <rect x="9" y="9" width="3" height="3" fill="#2396ED" />
          <rect x="12" y="9" width="3" height="3" fill="#2396ED" />
          <rect x="9" y="6" width="3" height="3" fill="#2396ED" />
          <path d="M18.5 11.5c-.8-.6-1.8-1-2.8-1" stroke="#2396ED" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'k8s':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3l6 3v6l-6 9-6-9V6l6-3z" fill="#326CE5" opacity="0.9" />
          <circle cx="12" cy="12" r="2" fill="#fff" />
        </svg>
      )
    case 'blockchain':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <rect x="4" y="4" width="6" height="6" rx="1.2" fill="#0EA5E9" />
          <rect x="14" y="14" width="6" height="6" rx="1.2" fill="#22C55E" />
          <path d="M10 7h4v4" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 10v4h4" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

const skills: Skill[] = [
  { key: 'excel', label: 'MS Excel' },
  { key: 'java', label: 'Java' },
  { key: 'sql', label: 'SQL' },
  { key: 'spring', label: 'SP Boot' },
  { key: 'oauth', label: 'OAuth' },
  { key: 'gcp', label: 'GCP' },
  { key: 'finance', label: 'Finance' },
  { key: 'om', label: 'OM' },
  { key: 'docker', label: 'Docker' },
  { key: 'k8s', label: 'Kubernetes' },
  { key: 'blockchain', label: 'Blockchain' },
]

export default function FloatingSkills() {
  // Centered, static skill map: Finance at the core.

  // Group skills by how they enable Finance in practice
  const categories: Record<string, string[]> = {
    'Data & Analysis': ['excel', 'sql'],
    'Backend & Services': ['java', 'spring', 'oauth'],
    'Cloud & DevOps': ['gcp', 'docker', 'k8s'],
    'Operations': ['om'],
    'Distributed Ledger': ['blockchain'],
  }

  // Visual placement: angle per category, small offsets within category
  const categoryAngles: Record<string, number> = {
    'Data & Analysis': 210, // bottom-left
    'Backend & Services': 320, // bottom-right
    'Cloud & DevOps': 40, // top-right
    'Operations': 140, // top-left
    'Distributed Ledger': 270, // bottom center
  }

  const baseRadius = 190 // keep outside photo area (~150px)

  type Node = {
    key: string
    label: string
    category: string
    angle: number
    radius: number
    x: number
    y: number
  }

  const center = skills.find(s => s.key === 'finance')!
  const others = skills.filter(s => s.key !== 'finance')

  // Build positioned nodes
  const nodes: Node[] = others.map((s, idx) => {
    const category = Object.keys(categories).find(cat => categories[cat].includes(s.key)) || 'Other'
    const baseAngle = categoryAngles[category] ?? (idx * (360 / others.length))
    // Spread items within a category by a small angle offset
    const siblings = categories[category] || []
    const posInSiblings = Math.max(0, siblings.indexOf(s.key))
    const siblingCount = Math.max(1, siblings.length)
    const spread = 26 // degrees of spread per category
    const start = baseAngle - (spread / 2)
    const angle = start + (siblingCount === 1 ? spread / 2 : (posInSiblings * (spread / (siblingCount - 1))))
    const rad = (angle * Math.PI) / 180
    const radius = baseRadius + (posInSiblings % 2 === 0 ? 0 : 20) // slight stagger
    const x = Math.cos(rad) * radius
    const y = Math.sin(rad) * radius
    return { key: s.key, label: s.label, category, angle, radius, x, y }
  })

  // Category colors for connector hints
  const catColor: Record<string, string> = {
    'Data & Analysis': '#4F46E5',
    'Backend & Services': '#E76F00',
    'Cloud & DevOps': '#0EA5E9',
    'Operations': '#475569',
    'Distributed Ledger': '#22C55E',
    'Other': '#64748B',
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      {/* SVG connectors from Finance to each skill */}
      <div className="absolute inset-0">
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible" width="1" height="1" viewBox="-400 -400 800 800" aria-hidden>
          <defs>
            <linearGradient id="connector" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {nodes.map(n => (
            <line key={`ln-${n.key}`} x1={0} y1={0} x2={n.x} y2={n.y} stroke={catColor[n.category] || 'url(#connector)'} strokeWidth={1.5} strokeOpacity={0.65} />
          ))}
        </svg>
      </div>

      {/* Nodes */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Center: Finance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm border border-emerald-200 shadow px-3.5 py-2 text-[13px] sm:text-[15px] text-emerald-700"
        >
          <Icon type="finance" />
          <span className="font-medium">{center.label}</span>
        </motion.div>

        {/* Outer skills */}
        {nodes.map((n, i) => (
          <div key={n.key} className="absolute" style={{ left: '50%', top: '50%', transform: `translate(-50%, -50%) rotate(${n.angle}deg) translateY(-${n.radius}px)` }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * (i + 1), ease: 'easeOut' }}
              className="-translate-x-1/2 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm px-3 py-1.5 text-[12px] sm:text-[14px] text-gray-700"
            >
              <Icon type={n.key} />
              <span>{n.label}</span>
            </motion.div>
          </div>
        ))}

        {/* Category tags (subtle) */}
        {Object.keys(categories).map((cat, idx) => {
          const a = categoryAngles[cat]
          const r = baseRadius - 70
          const rad = (a * Math.PI) / 180
          const x = Math.cos(rad) * r
          const y = Math.sin(rad) * r
          return (
            <div key={`cat-${cat}`} className="absolute" style={{ left: '50%', top: '50%', transform: `translate(${x}px, ${y}px)` }}>
              <div className="pointer-events-auto select-text rounded-md bg-white/80 px-2 py-0.5 text-[10px] sm:text-[11px] text-gray-600 border border-gray-200 shadow-sm" style={{ borderColor: catColor[cat] }}>
                {cat}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
