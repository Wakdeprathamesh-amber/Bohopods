// Cloudinary URL helper for plain <img> tags (the flip-book / brochure teaser),
// which don't go through the next/image loader. Mirrors cloudinary-loader.js.
//
// Safe fallback: returns the original src if the cloud name isn't set or the
// path isn't one of the migrated roots.

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const MIGRATED = /^\/(images|brochure)\//;

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
