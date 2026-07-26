// Custom next/image loader: transparently serves local /images and /brochure
// assets from Cloudinary (with f_auto,q_auto and per-width sizing), so every
// existing <Image src="/images/..."> keeps working unchanged.
//
// Assets are mirrored under a "bohopods/" root by scripts/upload-to-cloudinary.mjs,
// so /images/gatsby/ext-07.jpg maps to public_id bohopods/images/gatsby/ext-07.
//
// Safe fallback: if the cloud name isn't set, or the src isn't one of the
// migrated roots (data URLs, /og.jpg, remote URLs), the original src is
// returned so the site never breaks mid-migration.

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const MIGRATED = /^\/(images|brochure)\//;

export default function cloudinaryLoader({ src, width, quality }) {
  if (!CLOUD || typeof src !== "string" || !MIGRATED.test(src)) return src;

  const path = src.replace(/^\//, "").replace(/\.[a-zA-Z0-9]+$/, "");
  const transforms = ["f_auto", `q_${quality || "auto"}`, `w_${width}`, "c_limit"].join(",");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/bohopods/${path}`;
}
