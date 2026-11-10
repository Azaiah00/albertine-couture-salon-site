import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Link-preview (Open Graph / iMessage / WhatsApp / Facebook / X) metadata for a page.
 * Child pages replace the root openGraph object, so every page that sets its own
 * preview must pass the full set — this helper does that.
 */
/** Bump when the cards are regenerated so apps that cache by image URL fetch the new card. */
export const OG_VERSION = "2";
export const ogImg = (path: string) => `${path}?v=${OG_VERSION}`;

export function sharePreview(o: { title: string; description: string; path: string; image: string; alt: string; type?: "website" | "article" }): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: o.type ?? "website",
      siteName: SITE.name,
      locale: "en_US",
      url: o.path,
      title: o.title,
      description: o.description,
      images: [{ url: ogImg(o.image), width: 1200, height: 630, type: "image/jpeg", alt: o.alt }],
    },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: [ogImg(o.image)] },
  };
}
