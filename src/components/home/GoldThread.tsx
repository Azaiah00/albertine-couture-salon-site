"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Three interlaced strands — a braid — drawn in gold as you scroll. Static under reduced motion. */
export function GoldThread({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const strands = svg.querySelectorAll<SVGPathElement>("path");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(strands, { strokeDashoffset: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(strands, { strokeDashoffset: 0, ease: "none", stagger: 0.05, scrollTrigger: { trigger: svg, start: "top 80%", end: "bottom 60%", scrub: 0.8 } });
    }, svg);
    return () => ctx.revert();
  }, []);
  // three phase-shifted sine strands = a braid
  const strand = (phase: number) => {
    let d = "";
    for (let y = 0; y <= 600; y += 6) {
      const x = 16 + 11 * Math.sin((y / 600) * Math.PI * 9 + phase);
      d += `${y ? "L" : "M"}${x.toFixed(1)} ${y}`;
    }
    return d;
  };
  return (
    <svg ref={ref} viewBox="0 0 32 600" preserveAspectRatio="none" className={className} aria-hidden fill="none">
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((p, i) => (
        <path key={i} d={strand(p)} stroke={i === 1 ? "#e3c77d" : "#c9a24d"} strokeWidth={1.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} opacity={i === 1 ? 0.9 : 0.6} />
      ))}
    </svg>
  );
}
