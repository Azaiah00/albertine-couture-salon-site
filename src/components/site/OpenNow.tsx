"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * "Open now" pill in Eastern time. Both Google profiles list the salon as open 24 hours;
 * walk-ins run 5:00 AM–7:30 PM and the rest of the night is by appointment (+$30).
 * Rendered after hydration only (no server/client time mismatch).
 */
export function useEasternClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })));
    tick();
    const t = window.setInterval(tick, 30000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

export function salonState(d: Date) {
  const m = d.getHours() * 60 + d.getMinutes();
  const walkIn = m >= 5 * 60 && m < 19 * 60 + 30;
  return walkIn ? { walkIn: true, label: "Open now · walk-ins welcome" } : { walkIn: false, label: "Open now · after-hours by appointment" };
}

export function OpenNowPill({ className }: { className?: string }) {
  const now = useEasternClock();
  const st = now ? salonState(now) : null;
  return (
    <span className={cn("min-h-11 items-center gap-2 rounded-full px-3 text-[0.8rem] tracking-[0.04em] text-mist/90", className)} aria-live="polite">
      <span className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-ok/60 motion-reduce:animate-none" />
        <span className="relative size-2.5 rounded-full bg-ok" />
      </span>
      {st ? st.label : "Open 24/7"}
    </span>
  );
}
