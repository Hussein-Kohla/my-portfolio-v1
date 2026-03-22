type Props = {
  href: string;
  label: string;
  icon: React.ReactNode;
  color?: string;
};

export default function SocialLink({ href, label, icon, color }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 py-4 border-b border-white/5 hover:border-white/15 transition-all duration-300"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/8 group-hover:border-white/20 transition-all duration-300 text-white/40 group-hover:text-white"
        style={color ? { color } : undefined}
      >
        {icon}
      </div>
      <span className="text-sm text-white/40 group-hover:text-white/80 transition-colors duration-300">
        {label}
      </span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="ml-auto text-white/15 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
      >
        <path
          d="M1 11L11 1M11 1H4M11 1V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
