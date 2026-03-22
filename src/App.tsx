import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Intro from "./components/Intro";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#090909] text-white antialiased">
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <CustomCursor />
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      glowPos.current.x += (pos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (pos.current.y - glowPos.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${glowPos.current.x}px`;
        glowRef.current.style.top = `${glowPos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-50 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 mix-blend-difference"
      />
    </>
  );
}
