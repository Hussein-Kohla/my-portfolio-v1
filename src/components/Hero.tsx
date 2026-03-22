import { useEffect, useState, useRef } from "react";
import { personal } from "../data";

const ROLES = ["Frontend Developer", "UI Craftsman", "Curious Builder", "Lifelong Learner"];

function Particle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <div
      className="absolute w-px h-px rounded-full bg-white/20 animate-float"
      style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }}
    />
  );
}

function AnimLetter({ char, delay }: { char: string; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span
      className="inline-block transition-all duration-500"
      style={{
        opacity:   show ? 1 : 0,
        transform: show ? "translateY(0) skewX(0deg)" : "translateY(40px) skewX(-8deg)",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: Math.random() * 6,
  x: Math.random() * 100,
  y: Math.random() * 100,
}));

export default function Hero() {
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPageVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIndex(i => (i + 1) % ROLES.length); setRoleVisible(true); }, 350);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  const handleMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current; if (!btn) return;
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.3;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.3;
    btn.style.transform = `translate(${dx}px,${dy}px) scale(1.04)`;
  };
  const handleMagnetLeave = () => { if (btnRef.current) btnRef.current.style.transform = ""; };

  return (
    <section className="relative flex flex-col justify-center min-h-screen px-6 pt-16 overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map(p => <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} />)}
      </div>

      {/* Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0  w-72 h-72 rounded-full bg-cyan-500/7  blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-center">

          {/* ── Text ── */}
          <div>
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 mb-10 transition-all duration-700 ${pageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs tracking-widest uppercase text-white/35">Available for work</span>
            </div>

            {/* Name — letter by letter */}
            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] text-white mb-5 overflow-hidden">
              {"Hussein".split("").map((c, i) => <AnimLetter key={i} char={c} delay={200 + i * 55} />)}
              <br />
              <span className="text-white/18">
                {"Ahmed".split("").map((c, i) => <AnimLetter key={i} char={c} delay={580 + i * 55} />)}
              </span>
            </h1>

            {/* Role */}
            <div
              className={`flex items-center gap-4 mb-8 transition-all duration-700 ${pageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="w-8 h-px bg-white/15" />
              <div className="relative h-5 overflow-hidden">
                <span
                  className="block text-sm tracking-widest uppercase transition-all text-white/45 duration-350"
                  style={{ opacity: roleVisible ? 1 : 0, transform: roleVisible ? "translateY(0)" : "translateY(-12px)" }}
                >
                  {ROLES[roleIndex]}
                </span>
              </div>
            </div>

            {/* Bio */}
            <p
              className={`max-w-md text-white/35 text-base leading-relaxed mb-12 transition-all duration-700 ${pageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "820ms" }}
            >
              {personal.bio}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${pageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "950ms" }}
            >
              <a
                ref={btnRef}
                href="#work"
                className="px-7 py-3 bg-white text-[#090909] text-sm font-medium rounded-full transition-all duration-200 hover:bg-white/90"
                onMouseMove={handleMagnet}
                onMouseLeave={handleMagnetLeave}
              >
                View Projects
              </a>
              <a
                href={personal.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="py-3 text-sm transition-all duration-300 border rounded-full px-7 border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
              >
                Say Hi 👋
              </a>
            </div>
          </div>

          {/* ── Photo ── */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 ${pageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "500ms" }}
          >
            <ProfilePhoto />
          </div>
        </div>

        {/* Scroll line */}
        <div
          className={`absolute -bottom-16 left-0 transition-all duration-700 ${pageVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="w-px h-16 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-white/25 to-transparent animate-scroll-line" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float       { 0%,100%{transform:translateY(0) scale(1);opacity:.15} 50%{transform:translateY(-20px) scale(1.5);opacity:.4} }
        @keyframes scroll-line { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes spin-cw     { to{transform:rotate(360deg)} }
        @keyframes spin-ccw    { to{transform:rotate(-360deg)} }
        @keyframes orbit-a     { from{transform:rotate(0deg)   translateX(var(--r)) rotate(0deg)}   to{transform:rotate(360deg)  translateX(var(--r)) rotate(-360deg)} }
        @keyframes orbit-b     { from{transform:rotate(180deg) translateX(var(--r)) rotate(-180deg)} to{transform:rotate(540deg)  translateX(var(--r)) rotate(-540deg)} }
        @keyframes breathe     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        .animate-float        { animation: float 5s ease-in-out infinite; }
        .animate-scroll-line  { animation: scroll-line 2s ease-in-out infinite; }
        .spin-cw              { animation: spin-cw  16s linear infinite; }
        .spin-ccw             { animation: spin-ccw 10s linear infinite; }
        .orbit-dot-a          { --r:120px; animation: orbit-a 7s  linear infinite; }
        .orbit-dot-b          { --r:145px; animation: orbit-b 13s linear infinite; }
        .breathe              { animation: breathe 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

/* ── Profile photo component ─────────────────────────────── */
function ProfilePhoto() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>

      {/* Outer dashed ring */}
      <div
        className="absolute border border-dashed rounded-full spin-cw border-violet-500/25"
        style={{ inset: -24 }}
      />
      {/* Inner thin ring */}
      <div
        className="absolute border rounded-full spin-ccw border-white/8"
        style={{ inset: -10 }}
      />

      {/* Orbiting dot A — violet */}
      <div className="absolute orbit-dot-a top-1/2 left-1/2" style={{ marginTop: -4, marginLeft: -4 }}>
        <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_3px_rgba(167,139,250,0.7)]" />
      </div>

      {/* Orbiting dot B — cyan */}
      <div className="absolute orbit-dot-b top-1/2 left-1/2" style={{ marginTop: -3, marginLeft: -3 }}>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(103,232,249,0.6)]" />
      </div>

      {/* Glow behind */}
      <div
        className="absolute rounded-full pointer-events-none breathe"
        style={{
          inset: 0,
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          filter: "blur(16px)",
        }}
      />

      {/* Photo — large, no overlay text */}
      <div
        className="relative overflow-hidden border rounded-full border-white/12 bg-white/5"
        style={{ width: 280, height: 280 }}
      >
        <img
          src="/profile.png"
          alt="Hussein Kohla"
          className="object-cover object-top w-full h-full transition-transform duration-700 hover:scale-105"
          style={{ display: "block" }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Clean gradient only at bottom — no text */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(9,9,9,0.25) 0%, transparent 40%)" }}
        />
      </div>

      {/* Open to work chip — below the photo */}
      <div
        className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#0d0d0d] font-mono text-xs text-white/45 whitespace-nowrap"
        style={{ bottom: -16, left: "50%", transform: "translateX(-50%)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
        Open to work
      </div>
    </div>
  );
}
