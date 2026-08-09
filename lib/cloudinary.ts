// Cloudinary URL helpers for plain <img> / <video> tags that don't go through
// the next/image loader. Mirrors cloudinary-loader.js for images.
//
// Safe fallback: returns the original src if the cloud name isn't set or the
// path isn't one of the migrated roots.

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const MIGRATED = /^\/(images|brochure)\//;
const MIGRATED_VIDEO = /^\/videos\//;

/**
 * The hero films are on Cloudinary. The uploads looked like they failed —
 * the client connection dropped mid-transfer — but they had already landed
 * server-side, so `bohopods/videos/hero/{hero,hero-scrub}` both resolve.
 */
const VIDEO_ON_CDN = true;

export function cldUrl(
  src: string,
  opts?: { w?: number; q?: number | "auto" },
): string {
  if (!CLOUD || typeof src !== "string" || !MIGRATED.test(src)) return src;

  const path = src.replace(/^\//, "").replace(/\.[a-zA-Z0-9]+$/, "");
  const transforms = [
    "f_auto",
    `q_${opts?.q ?? "auto"}`,
    opts?.w ? `w_${opts.w}` : null,
    "c_limit",
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/bohopods/${path}`;
}

/**
 * Hero film delivery. Loop + scrub are served as the originally uploaded
 * 1080p encodes (no q_/f_ transforms) so Cloudinary doesn't re-compress them
 * soft. The scrub file is all-intra — any re-encode would also break
 * frame-accurate scroll seeking.
 */
export function cldVideoUrl(
  src: string,
  opts?: { scrub?: boolean; poster?: boolean },
): string {
  if (!CLOUD || typeof src !== "string" || !MIGRATED_VIDEO.test(src)) return src;

  const path = src.replace(/^\//, "").replace(/\.[a-zA-Z0-9]+$/, "");
  const publicId = `bohopods/${path}`;

  // The poster uploaded fine, so it comes off the CDN.
  if (opts?.poster) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:best,w_1920,c_limit/${publicId}`;
  }

  /**
   * The films still serve from /public. Repeated attempts to push the 41MB
   * scrub and 16MB loop to Cloudinary died mid-transfer (EPIPE, then a stalled
   * 425s request), and pointing at a public_id that doesn't exist would leave
   * the hero with no video at all. Vercel serves /public from its own CDN, so
   * this is a fine place to sit until the uploads land.
   * To switch over: upload both, then return the commented URL below.
   */
  if (!VIDEO_ON_CDN) return src;
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${publicId}.mp4`;
}
