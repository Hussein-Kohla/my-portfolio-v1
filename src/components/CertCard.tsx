type Cert = {
  title: string;
  issuer: string;
  year: string;
  link: string;
};

type Props = {
  cert: Cert;
  index: number;
  inView: boolean;
};

const ExternalIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
    <path d="M1 9L9 1M9 1H4M9 1V6"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CertCard({ cert, index, inView }: Props) {
  const isClickable = cert.link !== "#";

  const inner = (
    <div
      className={`group flex items-center justify-between gap-4 py-4 border-b border-white/5
        transition-all duration-700 hover:border-white/10
        ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-200 truncate">
          {cert.title}
        </p>
        <p className="text-[11px] text-white/25 mt-0.5">
          {cert.issuer} · {cert.year}
        </p>
      </div>
      {isClickable && (
        <span className="text-white/15 group-hover:text-white/40 transition-colors duration-200">
          <ExternalIcon />
        </span>
      )}
    </div>
  );

  return isClickable ? (
    <a href={cert.link} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}
