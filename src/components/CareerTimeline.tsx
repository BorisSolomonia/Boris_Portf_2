import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type Achievement = {
  title: string;
  org?: string;
  period?: string;
  bullets?: string[];
  metrics?: string[];
  linkLabel?: string;
  linkHref?: string;
};

type TimelineYear = {
  year: number;
  label?: string;
  items: Achievement[];
};

// === Data derived from your CV ===
// Feel free to adjust wording, add/remove bullets.
const TIMELINE: TimelineYear[] = [
  {
    year: 2010,
    items: [
      {
        title: "BBA – Financial Accounting & Audit",
        org: "Caucasus University",
        period: "2010",
        bullets: ["Foundation in financial reporting & audit standards."],
      },
    ],
  },
  {
    year: 2016,
    items: [
      {
        title: "Financial Manager / Operations Manager",
        org: "Agency of Agricultural Projects Management",
        period: "2016–2019",
        bullets: [
          "Designed streamlined financial processes.",
          "Managed complex project budgets and compliance.",
        ],
      },
    ],
  },
  {
    year: 2018,
    items: [
      {
        title: "MBA – Business Administration & Ops Mgmt (Best Academic Achievement)",
        org: "Free University, Tbilisi",
        period: "2018",
      },
    ],
  },
  {
    year: 2019,
    items: [
      {
        title: "Senior Budgeting & Reporting Manager",
        org: "Agency of Agricultural Projects Management",
        period: "2019",
        bullets: [
          "Directed multi-million budgeting; implemented internal controls.",
          "Maintained & optimized debtor database.",
        ],
      },
      {
        title: "Senior Associate (Consulting)",
        org: "JSC SavvY",
        period: "2019–2021",
        bullets: [
          "20+ engagements: valuation & FP&A models, driver trees, covenants.",
          "Executive dashboards & scenario analysis.",
        ],
        metrics: ["NPV growth↑", "ROI growth↑", "Cost minimization↓"],
      },
    ],
  },
  {
    year: 2021,
    items: [
      {
        title: "Lecturer of Managerial Accounting (ACCA F2)",
        org: "Ilia State University",
        period: "2021–present",
        bullets: ["Live cases, simulations; engagement-first pedagogy."],
      },
      {
        title: "CFO / Analyst of Monetary Policy",
        org: "Girchi (Parliament of Georgia)",
        period: "2021–present",
        bullets: [
          "Built finance policies & accounting app.",
          "Coin-flow logic: mid-period sales, emissions timing, entitlements.",
          "Auditable scenario engine for fairness.",
        ],
        metrics: ["Sales maximization↑", "Cost minimization↓"],
      },
    ],
  },
  {
    year: 2022,
    items: [
      {
        title: "Java Junior Developer (Top 2 of 500)",
        org: "EPAM Systems",
        period: "2022",
        bullets: [
          "Core Java, Spring Boot, Docker, K8s; several finance micro-projects.",
          "Focus on correctness, tests, performance.",
        ],
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        title: "Chief Financial Officer",
        org: "9 Tones Distribution",
        period: "2023–present",
        bullets: [
          "Comprehensive financial strategy & CCC optimization.",
          "Statistical sales forecasting; reduced fixed costs ~5%.",
          "Daily ops dashboard: inventory, debtor scoring, alerts.",
        ],
        metrics: ["Stock minimization↓", "Sales maximization↑", "ROI growth↑"],
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        title: "Debtors Analysis App · ERP Fin-Analytics",
        org: "Personal/Startup Tools",
        period: "2024–2025",
        bullets: [
          "Cash-flow prediction, debtor scoring, explainable recommendations.",
          "ERP modules integrating AI for inventory & pricing analytics.",
        ],
      },
      {
        title: "Bitcamp Java Course",
        org: "Bitcamp",
        period: "Ongoing",
        linkLabel: "Open course",
        linkHref: "https://www.bitcamp.ge/courses/java/",
      },
      {
        title: "Economic Book",
        org: "Redactor",
        period: "Ongoing",
      },
    ],
  },
  // Future Plans
  {
    year: 2025,
    label: "PLANNED",
    items: [
      {
        title: "AI-Driven Financial Advisory Platform",
        org: "Startup Initiative",
        period: "2025–2026",
        bullets: [
          "Launch comprehensive AI-powered financial advisory SaaS platform.",
          "Integrate ML models for personalized investment recommendations.",
          "Target SME market with automated financial planning tools.",
        ],
        metrics: ["Launch Target: Q3 2025", "MVP Users: 1K+", "Revenue Goal: $500K"],
      },
      {
        title: "Advanced FinTech Certification",
        org: "Professional Development",
        period: "2025",
        bullets: [
          "Complete blockchain & DeFi specialization program.",
          "Obtain advanced certifications in ML for finance.",
        ],
      },
    ],
  },
  {
    year: 2026,
    label: "PLANNED",
    items: [
      {
        title: "International Financial Consulting Expansion",
        org: "Global Markets",
        period: "2026–2027",
        bullets: [
          "Establish consulting presence in EU and US markets.",
          "Focus on cross-border M&A and international finance.",
          "Build strategic partnerships with global investment firms.",
        ],
        metrics: ["Target Markets: 3", "International Clients: 15+", "Team Growth: 5x"],
      },
      {
        title: "Open-Source Financial Modeling Framework",
        org: "Community Contribution",
        period: "2026",
        bullets: [
          "Release comprehensive open-source financial modeling library.",
          "Create educational content and documentation.",
          "Build developer community around financial tools.",
        ],
        linkLabel: "GitHub Repository (Coming Soon)",
        linkHref: "#",
      },
    ],
  },
  {
    year: 2027,
    label: "VISION",
    items: [
      {
        title: "Financial Technology Innovation Center",
        org: "Long-term Vision",
        period: "2027+",
        bullets: [
          "Establish R&D center for next-generation financial technologies.",
          "Focus on quantum computing applications in finance.",
          "Mentor next generation of fintech entrepreneurs.",
        ],
        metrics: ["Innovation Hub", "Research Publications", "Startup Incubations"],
      },
      {
        title: "Economic Policy Advisory Role",
        org: "Government/International Bodies",
        period: "2027+",
        bullets: [
          "Advise on digital currency and blockchain policy frameworks.",
          "Contribute to international financial regulatory standards.",
        ],
      },
    ],
  },
];

function useKeyNav<T>(items: T[], index: number, setIndex: (n: number) => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const delta = e.key === "ArrowRight" ? 1 : -1;
        let next = index + delta;
        if (next < 0) next = 0;
        if (next > items.length - 1) next = items.length - 1;
        setIndex(next);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, index, setIndex]);
}

function YearNode({
  y,
  idx,
  selected,
  onSelect,
}: {
  y: TimelineYear;
  idx: number;
  selected: boolean;
  onSelect: (i: number) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: inView ? 1 : 0.9,
      opacity: inView ? 1 : 0.6,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    });
  }, [inView, controls]);

  return (
    <motion.button
      ref={ref}
      aria-label={`Open ${y.year} achievements`}
      onClick={() => onSelect(idx)}
      onFocus={() => onSelect(idx)}
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={controls}
      whileHover={{ scale: 1.06 }}
      className={`relative isolate shrink-0 rounded-full h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 shadow-lg ring-2 focus:outline-none focus:ring-4 transition-all duration-300 ${
        y.label 
          ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white ring-amber-200/40 focus:ring-amber-400 border-2 border-dashed border-amber-300' 
          : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white ring-white/40 focus:ring-emerald-400'
      }`}
    >
      <div className="flex items-center justify-center h-full">
        {y.label ? (
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold">{y.year}</div>
            <div className="text-xs font-semibold opacity-90 -mt-1">{y.label}</div>
          </div>
        ) : (
          <span className="pointer-events-none select-none text-xl sm:text-2xl md:text-3xl font-bold">
            {y.year}
          </span>
        )}
      </div>

      {/* Hover tooltip with achievements */}
      <div
        className={`absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full w-max max-w-[280px] transition-all duration-300 ${
          selected ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
        }`}
        aria-hidden={!selected}
      >
        <div className="bg-gray-900 text-white rounded-lg p-3 shadow-xl">
          <div className="text-sm font-semibold mb-2">{y.year} Highlights</div>
          <ul className="space-y-1">
            {y.items.slice(0, 2).map((it, i) => (
              <li key={i} className="text-xs opacity-90 truncate">
                • {it.title}
              </li>
            ))}
            {y.items.length > 2 && (
              <li className="text-xs opacity-70">
                +{y.items.length - 2} more items
              </li>
            )}
          </ul>
          {/* Arrow pointer */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </motion.button>
  );
}

function Modal({
  open,
  onClose,
  year,
}: {
  open: boolean;
  onClose: () => void;
  year?: TimelineYear;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !year) return null;
  return (
    <div
      className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">
            {year.year} — {year.label ? `${year.label === 'VISION' ? 'Long-term Vision' : 'Future Plans'}` : 'Achievements'}
            {year.label && (
              <span className={`ml-3 px-3 py-1 text-sm font-medium rounded-full ${
                year.label === 'VISION' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {year.label}
              </span>
            )}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {year.items.map((it, i) => (
            <div key={i} className={`rounded-xl border p-4 ${
              year.label 
                ? year.label === 'VISION' 
                  ? 'border-purple-200 bg-purple-50/30' 
                  : 'border-amber-200 bg-amber-50/30'
                : 'border-gray-200'
            }`}>
              <div className="text-lg font-medium">
                {it.title} {it.org ? <span className="text-gray-500">— {it.org}</span> : null}
              </div>
              {it.period && <div className="text-sm text-gray-500">{it.period}</div>}
              {it.metrics && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {it.metrics.map((m, j) => (
                    <span key={j} className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs border border-emerald-200">
                      {m}
                    </span>
                  ))}
                </div>
              )}
              {it.bullets && (
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  {it.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
              {it.linkHref && it.linkLabel && (
                <div className="mt-3">
                  <a
                    href={it.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    {it.linkLabel}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CareerTimeline() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation across years
  useKeyNav(TIMELINE, selectedIndex, setSelectedIndex);

  const selectedYear = useMemo(() => TIMELINE[selectedIndex], [selectedIndex]);

  return (
    <section id="career-timeline" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-semibold tracking-tight">Career Timeline</h2>
      <p className="mt-3 text-lg text-gray-700">
        Hover or focus a year to preview highlights. Click/Enter to open full achievements. Use ← → to move between years.
      </p>

      {/* Wrapped timeline grid */}
      <div
        ref={listRef}
        className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
        aria-label="Career timeline years"
      >
        {TIMELINE.map((y, i) => (
          <div key={y.year} className="group relative flex flex-col items-center">
            <YearNode
              y={y}
              idx={i}
              selected={i === selectedIndex}
              onSelect={(idx) => {
                setSelectedIndex(idx);
                setOpen(true);
              }}
            />
            {/* Connecting line to next node (for visual flow) */}
            {i < TIMELINE.length - 1 && (
              <div className="absolute -right-3 md:-right-4 top-1/2 w-6 md:w-8 h-px bg-gradient-to-r from-indigo-300 to-transparent opacity-30 hidden lg:block" />
            )}
            
            {/* Year label below node */}
            <div className="mt-2 text-center">
              <div className="text-sm font-semibold text-gray-700">{y.year}</div>
              {y.label && (
                <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                  y.label === 'VISION' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-amber-100 text-amber-600'
                }`}>
                  {y.label}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick hint cards for the selected year */}
      <div className="mt-6">
        <div className="text-sm text-gray-500 mb-1">Selected: {selectedYear.year}</div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {selectedYear.items.slice(0, 3).map((it, i) => (
            <div key={i} className="rounded-xl border p-4">
              <div className="font-medium">{it.title}</div>
              {it.org && <div className="text-sm text-gray-500">{it.org}</div>}
              {it.period && <div className="text-xs text-gray-500">{it.period}</div>}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Open {selectedYear.year} achievements
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} year={selectedYear} />
    </section>
  );
}