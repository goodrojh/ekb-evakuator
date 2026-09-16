import React from "react";

export default function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={dark ? "#0f1115" : "#ffb020"} />
        <rect x="8" y="36" width="48" height="8" rx="2" fill={dark ? "#ffb020" : "#0f1115"} />
        <path
          d="M12 36V24h18l6-8h10v20"
          fill="none"
          stroke={dark ? "#ffb020" : "#0f1115"}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="48" r="5" fill={dark ? "#fff" : "#0f1115"} />
        <circle cx="46" cy="48" r="5" fill={dark ? "#fff" : "#0f1115"} />
        <rect x="36" y="12" width="8" height="4" rx="2" fill={dark ? "#ffb020" : "#0f1115"} />
      </svg>
      <span className={"font-display font-bold text-[15px] leading-none tracking-tight " + (compact ? "hidden sm:inline " : "") + (dark ? "text-ink" : "text-white")}>
        ЕКБ<span className="text-amber">·</span>ЭВАКУАТОР
      </span>
    </span>
  );
}
