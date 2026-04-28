"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { USER } from "@/lib/data";

const NAV = [
  { href: "/", label: "Dashboard", icon: "home" },
  { href: "/practice", label: "Practice Tests", icon: "doc" },
  { href: "/tutor", label: "AI Tutor", icon: "spark" },
  { href: "/errors", label: "Error Log", icon: "flag" },
  { href: "/profile", label: "My Stats", icon: "chart" },
];

function Icon({ name }: { name: string }) {
  const stroke = "currentColor";
  switch (name) {
    case "home":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>
      );
    case "doc":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></svg>
      );
    case "spark":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>
      );
    case "flag":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4" /><path d="M5 4h12l-2 4 2 4H5" /></svg>
      );
    case "chart":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
      );
  }
  return null;
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] flex flex-col h-screen sticky top-0">
      <div className="px-6 py-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand grid place-items-center text-white font-bold">L</div>
        <div className="text-lg font-semibold tracking-tight">Lumist</div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-brand-soft text-brand"
                  : "text-[var(--foreground)]/70 hover:bg-[var(--background)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon name={item.icon} />
              <span className="flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-soft text-brand grid place-items-center text-sm font-semibold">
          {USER.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{USER.name}</div>
          <div className="text-xs text-muted">SAT · Class of 2027</div>
        </div>
      </div>
    </aside>
  );
}
