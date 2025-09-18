import { useState } from 'react'
import { motion } from 'framer-motion'

type EducationItem = {
  period: string
  title: string
  institution: string
  details?: string
}

type Certification = {
  title: string
  issuer?: string
  year?: string
  image?: string
  link?: string
}

const educationTimeline: EducationItem[] = [
  {
    period: '2018',
    title: 'MBA – Business Administration & Operations Management',
    institution: 'Free University, Tbilisi, Georgia',
    details: 'Recognized for Best Academic Achievement'
  },
  {
    period: '2010',
    title: 'BBA – Financial Accounting and Audit',
    institution: 'Caucasus University, Tbilisi, Georgia'
  },
]

const certifications: Certification[] = [
  { title: 'BTA Certified Blockchain Business Foundations', issuer: 'Blockchain Training Alliance', image: '/files/CV/certificates/blockchaincert.jpeg' },
  { title: 'ACCA Certification – Levels 1, 2, and 3', issuer: 'Association of Chartered Certified Accountants', image: '/files/CV/certificates/acca.png' },
  { title: 'Best Academic Achievement – MBA', issuer: 'Free University, Tbilisi', image: '/files/CV/certificates/BestOM.jpeg' },
  { title: 'Bitcamp Certificate', issuer: 'EPAM / Bitcamp', image: '/images/bitcamp.png' },
]

const tabs = ['Timeline', 'Certifications'] as const
type Tab = typeof tabs[number]

const EducationPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Timeline')

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-renaissance-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif-elegant text-renaissance-brown mb-4">Education</h1>
          <p className="text-renaissance-blue text-lg font-sans-elegant">Formal training and certifications that support my finance and engineering work.</p>
        </motion.div>

        {/* Tabs */}
        <div role="tablist" aria-label="Education sections" className="flex justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full border font-sans-elegant transition-colors ${
                activeTab === tab
                  ? 'bg-white text-renaissance-brown border-renaissance-gold'
                  : 'bg-white/60 text-renaissance-brown/70 border-renaissance-gold/30 hover:bg-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Panels */}
        {activeTab === 'Timeline' && (
          <motion.section
            id="panel-timeline"
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 border border-renaissance-gold/20 rounded-3xl p-6 md:p-10 shadow"
          >
            <ol className="relative border-l border-renaissance-gold/30 ml-4">
              {educationTimeline.map((item, idx) => (
                <li key={idx} className="mb-10 ml-6">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-renaissance-gold/20 border border-renaissance-gold/40">
                    <span className="h-2.5 w-2.5 rounded-full bg-renaissance-gold"></span>
                  </span>
                  <h3 className="text-lg font-serif-elegant text-renaissance-brown">{item.title}</h3>
                  <div className="text-sm text-renaissance-brown/60 font-sans-elegant">{item.institution} • {item.period}</div>
                  {item.details && (
                    <p className="mt-2 text-renaissance-blue/80 font-sans-elegant">{item.details}</p>
                  )}
                </li>
              ))}
            </ol>
          </motion.section>
        )}

        {activeTab === 'Certifications' && (
          <motion.section
            id="panel-certifications"
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 border border-renaissance-gold/20 rounded-3xl p-6 md:p-10 shadow"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((c, idx) => (
                <div key={idx} className="rounded-xl border border-renaissance-gold/20 bg-white overflow-hidden">
                  {c.image && (
                    <div className="aspect-[4/3] bg-renaissance-cream/60 flex items-center justify-center">
                      <img src={c.image} alt={c.title} className="max-h-full max-w-full object-contain p-4" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="text-renaissance-brown font-serif-elegant font-semibold">{c.title}</div>
                    {(c.issuer || c.year) && (
                      <div className="text-sm text-renaissance-brown/60 font-sans-elegant">{[c.issuer, c.year].filter(Boolean).join(' • ')}</div>
                    )}
                    {c.link && (
                      <a href={c.link} target="_blank" rel="noreferrer" className="inline-block mt-3 text-blue-600 hover:underline font-sans-elegant text-sm">View credential</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default EducationPage

