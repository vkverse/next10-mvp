import type { SupportCategory } from "@/types/models";

export function SupportIcon({ category }: { category: SupportCategory }) {
  const common = { viewBox: "0 0 48 48", "aria-hidden": true } as const;
  if (category === "Want to Smoke")
    return (
      <svg {...common}>
        <path d="M11 31c8-2 13-7 16-15" />
        <circle cx="29" cy="13" r="4" />
        <path d="M8 34l6-1 2 5-6 2zM33 10c4-3 8 0 6 4M36 16c5-2 7 3 4 6" />
      </svg>
    );
  if (category === "Procrastination")
    return (
      <svg {...common}>
        <circle cx="24" cy="25" r="14" />
        <path d="M24 17v9l6 3M19 7h10M24 7v4" />
      </svg>
    );
  if (category === "Urge / Habit")
    return (
      <svg {...common} className="heart-icon">
        <path d="M24 39S7 29 7 17c0-8 10-11 17-3 7-8 17-5 17 3 0 12-17 22-17 22z" />
      </svg>
    );
  if (category === "Distracted")
    return (
      <svg {...common}>
        <rect x="13" y="8" width="22" height="32" rx="4" />
        <path d="M19 12h10M22 35h4" />
      </svg>
    );
  if (category === "Feeling Low")
    return (
      <svg {...common}>
        <path d="M13 34h23c7 0 8-10 2-12 1-9-13-12-17-4-8-3-14 12-8 16z" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="14" cy="24" r="3" />
      <circle cx="24" cy="24" r="3" />
      <circle cx="34" cy="24" r="3" />
    </svg>
  );
}
