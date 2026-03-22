export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-white/5">
      <div className="flex flex-col items-center justify-between max-w-5xl gap-4 mx-auto sm:flex-row">
        <p className="text-sm font-display text-white/20">
          © {new Date().getFullYear()} Creativity<span className="text-violet-500/60">.</span>
        </p>
        <p className="text-xs text-white/15">
          Hussein Kohla — Built with React & TypeScript
        </p>
        <p className="text-xs text-white/15">Egypt 🇪🇬</p>
      </div>
    </footer>
  );
}
