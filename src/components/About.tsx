import { useInView, useCounter } from "../hooks/useInView";
import { skills, projects, certifications, personal } from "../data";
import SkillBar from "./SkillBar";
import CertCard from "./CertCard";

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
  start: boolean;
};

function Stat({ value, suffix = "", label, start }: StatProps) {
  const count = useCounter(value, 1200, start);
  return (
    <div>
      <p className="mb-1 text-4xl text-white font-display">
        {count}{suffix}
      </p>
      <p className="text-xs tracking-widest uppercase text-white/25">{label}</p>
    </div>
  );
}

export default function About() {
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: skillsRef, inView: skillsInView } = useInView();

  return (
    <section id="about" className="relative px-6 py-28">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-24">

        {/* ── Header ─────────────────────────────────────── */}
        <div>
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-[10px] text-white/25 tracking-widest uppercase">
              03 / About
            </span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <div className="grid items-start grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Story */}
            <div>
              <h2
                className={`font-display text-[clamp(2rem,4vw,3rem)] text-white mb-8 leading-tight transition-all duration-700 ${
                  headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                I craft with code,
                <br />
                <span className="text-white/25">learn with every line.</span>
              </h2>

              <div
                className={`space-y-4 text-white/40 text-sm leading-relaxed transition-all duration-700 ${
                  headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "180ms" }}
              >
                <p>
                  I'm Hussein Ahmed Kohla, a front-end developer based in Giza,
                  Egypt. I use code to learn, experiment, and grow — not just to ship.
                </p>
                <p>
                  Every project in my portfolio is an experiment: maybe I'm trying
                  React Hooks, Superbase Auth, or building a bilingual UX with RTL
                  support. The point isn't the project itself — it's what I learn
                  from it.
                </p>
                <p>
                  I also enjoy experimenting with new AI coding tools and how they
                  can speed up workflows and open new possibilities for everyday
                  developers.
                </p>
              </div>

              {/* Stats */}
              <div
                ref={statsRef as React.RefObject<HTMLDivElement>}
                className={`grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/6 transition-all duration-700 ${
                  statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Stat value={6} suffix="+" label="Projects" start={statsInView} />
                <Stat value={1} suffix="+" label="Yrs Learning" start={statsInView} />
                <Stat value={skills.length} label="Tools" start={statsInView} />
              </div>
            </div>

            {/* Philosophy + Goal cards */}
            <div
              className={`space-y-4 transition-all duration-700 ${
                headerInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              {/* Philosophy */}
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 hover:border-white/12 hover:bg-white/[0.035] transition-all duration-400">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <p className="text-[10px] text-white/25 tracking-widest uppercase">
                    Coding Philosophy
                  </p>
                </div>
                <p className="text-sm text-lg italic leading-relaxed text-white/55 font-display">
                  "{personal.philosophy}"
                </p>
              </div>

              {/* Goal */}
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 hover:border-white/12 hover:bg-white/[0.035] transition-all duration-400">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <p className="text-[10px] text-white/25 tracking-widest uppercase">
                    My Goal
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-white/45">
                  {personal.goal}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills ─────────────────────────────────────── */}
        <div
          ref={skillsRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${
            skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-10">
            <p className="text-[10px] text-white/25 tracking-widest uppercase whitespace-nowrap">
              Tech Stack
            </p>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5">
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                inView={skillsInView}
                delay={i * 60}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
