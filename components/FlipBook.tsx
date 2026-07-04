"use client";

import dynamic from "next/dynamic";

/** SSR-safe wrapper: the flip engine touches window/DOM, so it loads client-only,
 *  with the brochure cover as a static placeholder while it initializes. */
const Inner = dynamic(
  () => import("./FlipBookInner").then((m) => m.FlipBookInner),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-sand shadow-xl shadow-forest/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brochure/page-01.jpg"
            alt="Boho Pods brochure cover"
            width={1075}
            height={758}
            className="h-auto w-full animate-pulse"
          />
        </div>
      </div>
    ),
  },
);

export function FlipBook({ pages }: { pages: string[] }) {
  return <Inner pages={pages} />;
}
