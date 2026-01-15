import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Achievement = {
  title: string;
  org?: string;
  period?: string;
  bullets?: string[];
  metrics?: string[];
  linkLabel?: string;
  linkHref?: string;
  logo?: string;
};

type TimelineYear = {
  year: number;
  label?: string;
  items: Achievement[];
};

// === Logo mapping for organizations ===
const ORGANIZATION_LOGOS: { [key: string]: string } = {
  // Education
  "Caucasus University": "/images/CU-SiteLogo.png",
  "Free University, Tbilisi": "/images/Free_logo_ENG.png",
  "Ilia State University": "/images/ilia.png",

  // Work experience
  "Agency of Agricultural Projects Management": "/images/RDA-Logo.png",
  "JSC SavvY": "/images/savvy.png",
  "Girchi (Parliament of Georgia)": "/images/girchi.jpg",
  "EPAM Systems": "/images/epam-1.png",
  "9 Tones Distribution": "/images/9t.png",
  "Bitcamp": "/images/bitcamp.png",

  // Future/other entries (placeholders may be added later)
  // "Personal/Startup Tools": "/images/personal-brand.png",
  // "Redactor": "/images/redactor-logo.png",
  // "Startup Initiative": "/images/startup-logo.png",
  // "Professional Development": "/images/professional-dev.png",
  // "Global Markets": "/images/global-markets.png",
  // "Community Contribution": "/images/community-logo.png",
  // "Long-term Vision": "/images/vision-logo.png",
  // "Government/International Bodies": "/images/government-logo.png",
};

// Function to get logo for organization
const getOrgLogo = (org?: string): string | undefined => {
  return org ? ORGANIZATION_LOGOS[org] : undefined;
};

// === Data derived from your CV ===
// Feel free to adjust wording, add/remove bullets.
const TIMELINE: TimelineYear[] = [
  {
    year: 2010,
    items: [
      {
        title: "BBA - Financial Accounting & Audit",
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
        period: "2016-2019",
        bullets: [
          "Designed streamlined financial processes.",
          "Managed complex project budgets and compliance.",
          "Built logistic system for the organization.",
          "Managed a team of 7 employees.",
        ],
      },
    ],
  },
  {
    year: 2018,
    items: [
      {
        title: "MBA - Business Administration & Ops Mgmt (Best Academic Achievement)",
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
        period: "2019-2021",
        bullets: [
          "20+ engagements: valuation & FP&A models, driver trees, covenants.",
          "Executive dashboards & scenario analysis.",
        ],
        metrics: ["NPV growth up", "ROI growth up", "Cost minimization down"],
      },
    ],
  },
  {
    year: 2021,
    items: [
      {
        title: "Lecturer of Managerial Accounting (ACCA F2)",
        org: "Ilia State University",
        period: "2021-present",
        bullets: ["Live cases, simulations; engagement-first pedagogy."],
      },
      {
        title: "CFO / Analyst of Monetary Policy",
        org: "Girchi (Parliament of Georgia)",
        period: "2021-present",
        bullets: [
          "Built finance policies & accounting app.",
          "Coin-flow logic: mid-period sales, emissions timing, entitlements.",
          "Auditable scenario engine for fairness.",
        ],
        metrics: ["Sales maximization up", "Cost minimization down"],
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
        period: "2023-present",
        bullets: [
          "Comprehensive financial strategy & CCC optimization.",
          "Statistical sales forecasting; reduced fixed costs ~5%.",
          "Daily ops dashboard: inventory, debtor scoring, alerts.",
        ],
        metrics: ["Stock minimization down", "Sales maximization up", "ROI growth up"],
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        title: "Debtors Analysis App - ERP Fin-Analytics",
        org: "Personal/Startup Tools",
        period: "2024-2025",
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
        title: "AI-Powered ERP System",
        org: "Develop an ERP / Brooks",
        period: "2025",
        bullets: [
          "Join a large AI-focused organization to leverage hybrid finance + tech expertise, delivering value-driven AI solutions",
          "Develop an ERP app integrating AI at key stages, connecting with government platforms",
          "Advance Brooks - a geo-location social app where users leave notes, set future reminders, and share experiences tied to specific places",
        ],
        
      },
    ],
  },
  {
    year: 2026,
    label: "PLANNED",
    items: [
      {
        title: "Expansion & Cross-Industry AI",
        org: "AI Strategy Portfolio",
        period: "2026",
        bullets: [
          "Reuse modular AI frameworks across finance, logistics, healthcare, and education so every pilot looks like a template.",
          "Bundle adoption roadmaps and governance memos that let executives greenlight the next rollout without a second meeting.",
          "Focus on scalable, transferable AI frameworks that solve problems across sectors",
        ],
      },
    ],
  },
  {
    year: 2028,
    label: "VISION",
    items: [
      {
        title: "Next-Gen Education Platform",
        org: "Future Skills Lab",
        period: "2028",
        bullets: [
          "Launch an AI-guided, project-based platform where adaptive missions make relevance feel like the default.",
          "Co-create journeys with educators and mentors so graduates show up boardroom-ready on day one.",
          "Anchor problem solving, critical thinking, and feedback loops until employers treat the platform as their farm team.",
        ],
      },
    ],
  },
];

function TimelineItem({ year, isLast }: { year: TimelineYear; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex gap-6"
      data-year={year.year}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-4 bg-white z-10 ${
          year.label
            ? year.label === 'VISION'
              ? 'border-purple-500'
              : 'border-amber-500'
            : 'border-blue-500'
        }`} />
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-200 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        {/* Year and label */}
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{year.year}</h3>
          {year.label && (
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              year.label === 'VISION'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              {year.label}
            </span>
          )}
        </div>

        {/* Items */}
        <div className="space-y-4">
          {year.items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start gap-4">
                {/* Organization Logo */}
                {item.org && getOrgLogo(item.org) && (
                  <div className="flex-shrink-0">
                    <img
                      src={getOrgLogo(item.org)}
                      alt={`${item.org} logo`}
                      className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1 border border-gray-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  {/* Title and organization */}
                  <div className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </div>
                  {item.org && (
                    <div className="text-sm text-gray-600 mb-2">{item.org}</div>
                  )}
                  {item.period && (
                    <div className="text-xs text-gray-500 mb-3">{item.period}</div>
                  )}

                  {/* Metrics */}
                  {item.metrics && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.metrics.map((metric, j) => (
                        <span key={j} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bullets */}
                  {item.bullets && (
                    <ul className="text-xs text-gray-700 space-y-1 mb-3">
                      {item.bullets.map((bullet, k) => (
                        <li key={k} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1 flex-shrink-0">-</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Link */}
                  {item.linkHref && item.linkLabel && (
                    <div className="mt-3">
                      <a
                        href={item.linkHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {item.linkLabel}
                        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CareerTimeline() {
  return (
    <section id="career-timeline" className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Career Timeline</h2>
        <p className="mt-3 text-lg text-gray-600">
          A comprehensive overview of my professional journey and achievements.
        </p>
      </div>

      <div className="relative">
        {TIMELINE.map((year, index) => (
          <TimelineItem
            key={year.year}
            year={year}
            isLast={index === TIMELINE.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
