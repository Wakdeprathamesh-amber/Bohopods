"use client";

import dynamic from "next/dynamic";
import { cldUrl } from "@/lib/cloudinary";

/** SSR-safe wrapper: the flip engine touches window/DOM, so it loads client-only,
 *  with a dark stage + cover placeholder while it initializes. */
const Inner = dynamic(
  () => import("./FlipBookInner").then((m) => m.FlipBookInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[62vh] min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-paper/10 bg-[radial-gradient(110%_100%_at_50%_0%,#2a3a1c_0%,#1a2410_55%,#121a0b_100%)] sm:h-[70vh] sm:min-h-[520px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cldUrl("/brochure/page-01.jpg", { w: 900 })}
          alt="Bohopods brochure cover"
          width={1075}
          height={758}
          className="max-h-[70%] w-auto animate-pulse rounded-sm shadow-2xl"
        />
      </div>
    ),
  },
);

export function FlipBook({ pages, pdfHref }: { pages: string[]; pdfHref?: string }) {
  return <Inner pages={pages} pdfHref={pdfHref} />;
}
