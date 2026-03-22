import { useState } from "react";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlights: string[];
  accent: string;
  link: string;
  year: string;
  status: string;
};

type Props = {
  project: Project;
  index: number;
  inView: boolean;
};

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="flex-shrink-0">
    <path d="M1.5 5.5L4 8L9.5 2.5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ProjectCard({ project, index, inView }: Props) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`group relative transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${
          hovered ? "border-white/15 bg-white/[0.04]" : "border-white/6 bg-white/[0.02]"
        }`}
      >
        {/* Accent top bar */}
        <div
          className="h-[1.5px] w-full transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)`,
            opacity: hovered ? 1 : 0.2,
          }}
        />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-[10px] text-white/25 tracking-widest uppercase">
                  {project.year} · {project.subtitle}
                </p>
                {/* Status badge */}
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full border tracking-widest uppercase"
                  style={{
                    borderColor: `${project.accent}40`,
                    color: project.accent,
                    background: `${project.accent}10`,
                  }}
                >
                  {project.status}
                </span>
              </div>
              <h3 className="font-display text-2xl text-white leading-tight">
                {project.title}
              </h3>
            </div>

            {/* External link button */}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                hovered
                  ? "border-white/25 bg-white/8 text-white"
                  : "border-white/8 text-white/30"
              }`}
              title="Open project"
            >
              <ArrowIcon />
            </a>
          </div>

          {/* Description */}
          <p className="text-white/45 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Expandable section */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: expanded ? "300px" : "0px", opacity: expanded ? 1 : 0 }}
          >
            <div className="pb-5 space-y-4">
              {/* Long description */}
              <p className="text-white/30 text-sm leading-relaxed border-l-2 border-white/8 pl-4">
                {project.longDescription}
              </p>

              {/* Highlights */}
              <div>
                <p className="text-[10px] text-white/20 tracking-widest uppercase mb-2.5">
                  What I built
                </p>
                <ul className="space-y-1.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-white/40">
                      <span style={{ color: project.accent }}>
                        <CheckIcon />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer: tags + expand toggle */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-white/8 text-white/30 tracking-wide font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Expand/collapse */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors duration-200 flex-shrink-0"
            >
              {expanded ? "Less" : "Details"}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              >
                <path d="M1.5 3.5L5 7L8.5 3.5"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-600"
          style={{
            background: `radial-gradient(350px at 50% -20%, ${project.accent}0a, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </article>
  );
}
