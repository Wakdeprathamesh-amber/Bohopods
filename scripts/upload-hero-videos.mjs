/**
 * Upload hero film assets to Cloudinary (video + poster).
 *
 *   node --env-file=.env.local scripts/upload-hero-videos.mjs [--dry]
 *
 * Public IDs land under bohopods/videos/hero/* so the runtime helper can
 * reconstruct the CDN URL from the same path the <video> used to load locally.
 */
import { v2 as cloudinary } from "cloudinary";
import { existsSync, statSync } from "node:fs";
import { basename } from "node:path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const DRY = process.argv.includes("--dry");
const ROOT = "bohopods";

/** Prefer sharp HQ encodes when present (built into /tmp before upload). */
const ASSETS = [
  {
    file: process.env.HERO_HQ_MP4 || "/tmp/bohopods-hero-hq.mp4",
    fallback: "public/videos/hero/hero.mp4",
    public_id: `${ROOT}/videos/hero/hero`,
    resource_type: "video",
  },
  {
    file: process.env.HERO_SCRUB_HQ || "/tmp/bohopods-hero-scrub-hq.mp4",
    fallback: "public/videos/hero/hero-scrub.mp4",
    public_id: `${ROOT}/videos/hero/hero-scrub`,
    resource_type: "video",
  },
  {
    file: "public/videos/hero/hero-poster.jpg",
    public_id: `${ROOT}/videos/hero/hero-poster`,
    resource_type: "image",
  },
];

function pick(asset) {
  if (existsSync(asset.file)) return asset.file;
  if (asset.fallback && existsSync(asset.fallback)) return asset.fallback;
  return null;
}

async function main() {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Missing Cloudinary env vars. Run with: node --env-file=.env.local ...");
    process.exit(1);
  }

  const ping = await cloudinary.api.ping();
  console.log(`✓ Authenticated to cloud "${cloud}" (${JSON.stringify(ping)})\n`);

  for (const asset of ASSETS) {
    const file = pick(asset);
    if (!file) {
      console.log(`✗ missing ${asset.file}`);
      continue;
    }
    const mb = (statSync(file).size / (1024 * 1024)).toFixed(1);
    if (DRY) {
      console.log(`[dry] ${file} (${mb} MB) -> ${asset.public_id} [${asset.resource_type}]`);
      continue;
    }
    process.stdout.write(`↑ ${basename(file)} (${mb} MB) -> ${asset.public_id} … `);
    try {
      const opts = {
        public_id: asset.public_id,
        resource_type: asset.resource_type,
        overwrite: true,
        invalidate: true,
      };
      // Chunked upload is more reliable for multi-MB video over flaky pipes.
      const res =
        asset.resource_type === "video"
          ? await cloudinary.uploader.upload_large(file, {
              ...opts,
              chunk_size: 6_000_000,
            })
          : await cloudinary.uploader.upload(file, opts);
      console.log(`✓ ${res.format} ${((res.bytes || 0) / 1024 / 1024).toFixed(1)} MB`);
      console.log(`  ${res.secure_url}`);
    } catch (e) {
      const msg = e?.error?.message || e?.message || String(e);
      console.log(`✗ ${msg}`);
      process.exitCode = 1;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
