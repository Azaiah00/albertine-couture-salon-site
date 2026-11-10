import type { Metadata } from "next";
import { DemoBanner, Toasts } from "@/components/portal/ui";
import { TourGuide } from "@/components/portal/Tour";
import { sharePreview } from "@/lib/og";

export const metadata: Metadata = {
  title: { default: "Book Online", template: "%s · Albertine Couture Booking" },
  description: "Book Albertine Couture Hair Salon online — choose your service, stylist and time in under a minute.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  ...sharePreview({
    title: "Albertine Couture Hair Salon · Booking portal demo",
    description: "Try the new Albertine Couture booking portal as a client, the owner or a stylist. A guide walks you through every feature.",
    path: "/portal",
    image: "/og/portal.jpg",
    alt: "One portal, three views: client, owner and stylist. Albertine Couture booking portal demo.",
  }),
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-ink">
      <DemoBanner />
      <main id="main">{children}</main>
      <Toasts />
      <TourGuide />
    </div>
  );
}
