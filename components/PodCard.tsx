import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Pod } from "@/lib/pods";

export function PodCard({ pod }: { pod: Pod }) {
  return (
    <Link
      href={`/pods/${pod.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-paper transition-shadow duration-300 hover:shadow-xl hover:shadow-forest/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={pod.image}
          alt={`The ${pod.name} pod by Boho Pods`}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/10 to-transparent" />
        {pod.flagship && (
          <span className="absolute left-4 top-4 rounded-full bg-bronze/90 px-3 py-1 text-xs font-display uppercase tracking-wider text-paper">
            Flagship
          </span>
        )}
        {pod.priceFrom && (
          <span className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-display text-forest">
            from {pod.priceFrom}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-2xl text-paper">{pod.name}</h3>
          <p className="text-sm text-paper/80">{pod.tagline}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {pod.overview}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-display text-forest transition-colors group-hover:text-olive">
          View the {pod.name} <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
