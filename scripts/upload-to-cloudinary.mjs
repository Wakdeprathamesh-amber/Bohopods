/**
 * One-time migration: mirror local public assets to Cloudinary.
 *
 *   node --env-file=.env.local scripts/upload-to-cloudinary.mjs [--ping] [--dry]
 *
 * Uploads every image under public/images and public/brochure, preserving the
 * folder structure under a "bohopods/" root. The public_id keeps the original
 * path minus the extension, so /images/gatsby/ext-07.jpg becomes
 * bohopods/images/gatsby/ext-07 — which the runtime loader can reconstruct
 * from the same /images/gatsby/ext-07.jpg src with zero component changes.
 *
 * Idempotent: overwrite:true means re-running just refreshes existing assets.
 */
import { v2 as cloudinary } from "cloudinary";
import { readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const ROOT = "bohopods";
const DIRS = ["public/images", "public/brochure"];
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const args = process.argv.slice(2);
const PING = args.includes("--ping");
const DRY = args.includes("--dry");

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (EXT.has(extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

// public/images/gatsby/ext-07.jpg  ->  bohopods/images/gatsby/ext-07
function publicId(file) {
  const rel = relative("public", file).replace(/\\/g, "/");
  return `${ROOT}/${rel.slice(0, rel.length - extname(rel).length)}`;
}

async function main() {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Missing Cloudinary env vars. Run with: node --env-file=.env.local ...");
    process.exit(1);
  }

  const ping = await cloudinary.api.ping();
  console.log(`✓ Authenticated to cloud "${cloud}" (${JSON.stringify(ping)})`);
  if (PING) return;

  const files = DIRS.flatMap(walk);
  console.log(`Found ${files.length} images to upload under ${DIRS.join(", ")}\n`);

  let ok = 0;
  let failed = 0;
  const errors = [];

  // Small concurrency pool so we don't hammer the API.
  const POOL = 6;
  let i = 0;
  async function worker() {
    while (i < files.length) {
      const file = files[i++];
      const public_id = publicId(file);
      if (DRY) {
        console.log(`[dry] ${file}  ->  ${public_id}`);
        ok++;
        continue;
      }
      try {
        const res = await cloudinary.uploader.upload(file, {
          public_id,
          overwrite: true,
          resource_type: "image",
          invalidate: true,
        });
        ok++;
        console.log(`✓ ${public_id}  (${res.format}, ${(res.bytes / 1024).toFixed(0)}kb)`);
      } catch (e) {
        failed++;
        const msg = e?.error?.message || e?.message || String(e);
        errors.push(`${file}: ${msg}`);
        console.log(`✗ ${public_id}  — ${msg}`);
      }
    }
  }
  await Promise.all(Array.from({ length: POOL }, worker));

  console.log(`\nDone. ${ok} ok, ${failed} failed.`);
  if (errors.length) {
    console.log("\nErrors:");
    errors.forEach((e) => console.log("  " + e));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
