import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Ruler, Sparkles } from "lucide-react";
import type { Pod } from "@/lib/pods";

const glanceIcons = [Ruler, BedDouble, Sparkles];

/**
 * Catalogue card for /pods — where people compare, so the image carries an
 * info block: at-a-glance facts + a line of story. (Homepage keeps the
 * image-only teaser card.)
 */
export function PodCatalogueCard({ pod }: { pod: Pod }) {
  return (
    <Link
      href={`/pods/${pod.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pod.image}
          alt={`The ${pod.name} pod by Boho Pods`}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent" />
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
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl">{pod.name}</h3>
        <p className="mt-0.5 text-sm text-muted">{pod.tagline}</p>

        <ul className="mt-4 space-y-1.5 border-t border-sand pt-4">
          {pod.glance.map((fact, i) => {
            const Icon = glanceIcons[i];
            return (
              <li key={fact} className="flex items-center gap-2.5 text-sm text-ink">
                <Icon className="size-4 shrink-0 text-olive" />
                {fact}
              </li>
            );
          })}
        </ul>

        <span className="mt-5 inline-flex items-center gap-1 font-display text-sm text-forest transition-colors group-hover:text-olive">
          View details <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
