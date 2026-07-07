import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Pod } from "@/lib/pods";

/** Image-first pod card — the photo is the card; name + CTA live on it. */
export function PodCard({ pod }: { pod: Pod }) {
  return (
    <Link
      href={`/pods/${pod.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-sand transition-shadow duration-300 hover:shadow-xl hover:shadow-forest/10"
    >
      <Image
        src={pod.image}
        alt={`The ${pod.name} pod by Boho Pods`}
        fill
        sizes="(max-width:640px) 85vw, (max-width:1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/15 to-transparent" />
      {pod.flagship && (
        <span className="absolute left-4 top-4 rounded-full bg-bronze/90 px-3 py-1 font-display text-xs uppercase tracking-wider text-paper">
          Flagship
        </span>
      )}
      {pod.priceFrom && (
        <span className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-display text-xs text-forest">
          from {pod.priceFrom}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="text-2xl text-paper">{pod.name}</h3>
          <p className="truncate text-sm text-paper/80">{pod.tagline}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-paper/30 bg-paper/10 px-4 py-2 font-display text-sm text-paper backdrop-blur-sm transition-colors duration-300 group-hover:bg-paper group-hover:text-forest">
          View <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
