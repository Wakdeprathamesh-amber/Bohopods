// Cloudinary URL helpers for plain <img> / <video> tags that don't go through
// the next/image loader. Mirrors cloudinary-loader.js for images.
//
// Safe fallback: returns the original src if the cloud name isn't set or the
// path isn't one of the migrated roots.

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const MIGRATED = /^\/(images|brochure)\//;
const MIGRATED_VIDEO = /^\/videos\//;

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

  if (opts?.poster) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:best,w_1920,c_limit/${publicId}`;
  }

  return `https://res.cloudinary.com/${CLOUD}/video/upload/${publicId}.mp4`;
}
