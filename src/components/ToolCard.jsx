import { Link } from 'react-router-dom';

export default function ToolCard({ icon, title, description, to, gradient }) {
  return (
    <Link
      to={to}
      className="glass-card group p-6 sm:p-8 flex flex-col items-start gap-4 no-underline"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${gradient}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
          {description}
        </p>
      </div>
      <span className="text-sm font-medium text-white/70 group-hover:text-white mt-auto flex items-center gap-1 transition-colors">
        Try Now
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-x-1 transition-transform"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
