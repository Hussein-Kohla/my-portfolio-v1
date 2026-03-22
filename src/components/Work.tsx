import { useInView } from "../hooks/useInView";
import { projects } from "../data";
import ProjectCard from "./ProjectCard";

export default function Work() {
  const { ref, inView } = useInView();

  return (
    <section id="work" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[10px] text-white/25 tracking-widest uppercase">
            02 / Work
          </span>
          <div className="h-px flex-1 bg-white/6" />
        </div>

        <h2
          className={`font-display text-[clamp(2rem,5vw,3.5rem)] text-white mb-4 leading-tight transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          Projects &{" "}
          <span className="text-white/25">Experiments</span>
        </h2>

        <p
          className={`text-white/35 text-sm mb-14 max-w-md transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Not a commercial portfolio — every project here is a lesson learned or
          an idea tested.
        </p>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
