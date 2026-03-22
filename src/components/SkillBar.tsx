import { useEffect, useState } from "react";

type Props = {
  name: string;
  level: number;
  inView: boolean;
  delay: number;
};

export default function SkillBar({ name, level, inView, delay }: Props) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
          {name}
        </span>
        <span className="text-xs text-white/20 font-mono">{level}%</span>
      </div>
      <div className="h-px bg-white/6 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${level}%` : "0%",
            background: `linear-gradient(90deg, #7c3aed, #a78bfa)`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
