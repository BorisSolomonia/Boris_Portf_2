import { motion } from 'framer-motion'
import { useMemo } from 'react'

type SkillNode = {
  key: string
  label: string
  side: 'left' | 'right'
  y: number
  highlight?: 'origin' | 'core'
}

// Minimal inline SVG icons for each skill
const Icon = ({ type }: { type: string }) => {
  const common = 'w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0'
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

const nodes: SkillNode[] = [
  { key: 'finance', label: 'Finance', side: 'left', y: 15, highlight: 'origin' },
  { key: 'excel', label: 'MS Excel', side: 'right', y: 15, highlight: 'core' },
  { key: 'java', label: 'Java', side: 'left', y: 35, highlight: 'core' },
  { key: 'sql', label: 'SQL', side: 'right', y: 35 },
  { key: 'spring', label: 'SP Boot', side: 'left', y: 55, highlight: 'core' },
  { key: 'oauth', label: 'OAuth', side: 'right', y: 55 },
  { key: 'docker', label: 'Docker', side: 'left', y: 75 },
  { key: 'gcp', label: 'GCP', side: 'right', y: 75 },
  { key: 'k8s', label: 'Kubernetes', side: 'left', y: 95, highlight: 'core' },
  { key: 'blockchain', label: 'Blockchain', side: 'right', y: 95 },
  { key: 'om', label: 'OM', side: 'right', y: 25, highlight: 'core' },
]

const LEFT_ANCHOR = 14
const RIGHT_ANCHOR = 86

export default function FloatingSkills() {
  const { leftNodes, rightNodes } = useMemo(() => {
    const sorted = [...nodes].sort((a, b) => a.y - b.y)
    return {
      leftNodes: sorted.filter((node) => node.side === 'left'),
      rightNodes: sorted.filter((node) => node.side === 'right'),
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 flex w-[40rem] max-w-[90vw] -translate-x-1/2 select-none sm:w-[44rem]">
      <div className="relative -top-4 h-[22rem] w-full">
        {[...leftNodes, ...rightNodes].map((node, index) => {
          const positionStyles = {
            left: `${node.side === 'left' ? LEFT_ANCHOR : RIGHT_ANCHOR}%`,
            top: `${node.y}%`,
          }
          const baseClasses = 'absolute -translate-y-1/2 whitespace-nowrap px-2 py-1 text-[11px] font-medium sm:text-[13px]'
          const palette = 'text-gray-700'
          const sideClasses = node.side === 'left'
            ? '-translate-x-full pr-3 text-right'
            : 'pl-3'

          return (
            <div
              key={node.key}
              className={`${baseClasses} ${palette} ${sideClasses}`}
              style={positionStyles}
            >
              <div className={`flex items-center gap-2 ${node.side === 'left' ? 'flex-row-reverse' : ''}`}>
                <Icon type={node.key} />
                <span>{node.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
