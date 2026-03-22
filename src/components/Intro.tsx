import { useEffect, useState } from "react";

type Props = { onDone: () => void };

// The lines that get "typed" one by one
const CODE_LINES = [
  { text: 'const developer = {',           color: 'text-white/70',   indent: 0 },
  { text: '  name:',                        color: 'text-violet-400', indent: 0, valueText: ' "Hussein Ahmed"',  valueColor: 'text-emerald-400' },
  { text: '  role:',                        color: 'text-violet-400', indent: 0, valueText: ' "Frontend Developer"',   valueColor: 'text-amber-400'   },
  { text: '  passion:',                     color: 'text-violet-400', indent: 0, valueText: ' "∞"',              valueColor: 'text-pink-400'    },
  { text: '  available:',                   color: 'text-violet-400', indent: 0, valueText: ' true',             valueColor: 'text-cyan-400'    },
  { text: '};',                             color: 'text-white/70',   indent: 0 },
  { text: '',                               color: '',                indent: 0 },
  { text: 'developer.build();',             color: 'text-white/50',   indent: 0 },
];

const CHAR_DELAY = 28;   // ms per character
const LINE_GAP   = 120;  // extra ms between lines

export default function CodeIntro({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine]   = useState(0);
  const [currentChar, setCurrentChar]   = useState(0);
  const [done, setDone]                 = useState(false);
  const [fadeOut, setFadeOut]           = useState(false);

  // Build full text for each line
  const fullText = (i: number) => {
    const l = CODE_LINES[i];
    return l.text + (l.valueText ?? "");
  };

  useEffect(() => {
    if (currentLine >= CODE_LINES.length) {
      // All lines done — pause then fade out
      const t1 = setTimeout(() => setFadeOut(true), 900);
      const t2 = setTimeout(() => onDone(), 1500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }

    const lineLen = fullText(currentLine).length;

    if (currentChar < lineLen) {
      const delay = currentChar === 0 ? LINE_GAP : CHAR_DELAY;
      const t = setTimeout(() => {
        setVisibleLines(prev => {
          const next = [...prev];
          next[currentLine] = fullText(currentLine).slice(0, currentChar + 1);
          return next;
        });
        setCurrentChar(c => c + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      // Line complete → next line
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, LINE_GAP / 2);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  // Render a line with syntax coloring by splitting at valueText boundary
  const renderLine = (lineIdx: number) => {
    const l   = CODE_LINES[lineIdx];
    const raw = visibleLines[lineIdx] ?? "";
    if (!raw) return null;

    const keyPart   = l.text;
    const valuePart = l.valueText ?? "";
    const typed     = raw;

    if (!valuePart) {
      return <span className={l.color}>{typed}</span>;
    }

    if (typed.length <= keyPart.length) {
      return <span className={l.color}>{typed}</span>;
    }

    return (
      <>
        <span className={l.color}>{keyPart}</span>
        <span className={l.valueColor}>{typed.slice(keyPart.length)}</span>
      </>
    );
  };

  const isLastLine = currentLine === CODE_LINES.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#090909]"
      style={{
        opacity:    fadeOut ? 0 : 1,
        transition: fadeOut ? "opacity 0.6s ease" : "none",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(124,58,237,0.12) 0%,transparent 70%)" }}
      />

      {/* Terminal window */}
      <div className="relative w-full max-w-lg mx-6">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border border-white/8 rounded-t-xl">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-[11px] text-white/20 font-mono tracking-wider">hussein.ts</span>
        </div>

        {/* Code area */}
        <div className="bg-white/[0.025] border-x border-b border-white/8 rounded-b-xl px-6 py-6 font-mono text-sm leading-7 min-h-[220px]">
          {CODE_LINES.map((_, i) => (
            <div key={i} className="flex">
              {/* Line number */}
              <span className="flex-shrink-0 w-4 mr-5 text-xs leading-7 text-right select-none text-white/15">
                {i + 1}
              </span>
              {/* Content */}
              <span>
                {i < currentLine
                  ? renderLine(i)          // completed line
                  : i === currentLine
                  ? (
                    <>
                      {renderLine(i)}
                      {/* blinking cursor */}
                      <span className="animate-blink inline-block w-[2px] h-[14px] bg-violet-400 ml-[1px] align-middle" />
                    </>
                  )
                  : null
                }
              </span>
            </div>
          ))}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center gap-2 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] text-white/25 font-mono">
            {currentLine >= CODE_LINES.length ? "compiled successfully" : "typing..."}
          </span>
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={onDone}
        className="absolute font-mono text-xs tracking-widest uppercase transition-colors bottom-8 right-8 text-white/20 hover:text-white/50"
      >
        skip →
      </button>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 0.8s step-end infinite; }
      `}</style>
    </div>
  );
}
