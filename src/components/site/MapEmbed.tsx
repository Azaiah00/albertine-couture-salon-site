"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { fullAddress, type Location } from "@/lib/site";

/** Click-to-load Google map for one location (keeps third-party scripts off the first paint). */
export function MapEmbed({ loc }: { loc: Location }) {
  const [on, setOn] = useState(false);
  const q = encodeURIComponent(`Albertine Couture Hair Salon, ${fullAddress(loc)}`);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-onyx">
      {on ? (
        <iframe
          title={`Map to Albertine Couture ${loc.short}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="absolute inset-0 size-full grayscale-[0.35] invert-[0.92] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button onClick={() => setOn(true)} className="group absolute inset-0 grid place-items-center text-center">
          <span aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(201,162,77,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,.12)_1px,transparent_1px)] [background-size:44px_44px]" />
          <span className="relative">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-crimson text-paper shadow-[0_0_40px_rgba(201,162,77,.45)] transition group-hover:scale-110">
              <MapPin className="size-6" aria-hidden />
            </span>
            <span className="mt-4 block text-bone">Show the {loc.short} map</span>
            <span className="text-sm text-silver">{fullAddress(loc)}</span>
          </span>
        </button>
      )}
    </div>
  );
}
