import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CTA } from "@/components/primitives";
import { waLink, waMsg } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-dvh items-center justify-center overflow-hidden">
        <Image
          src="/images/renders/boho-126.jpg"
          alt="A glass pod wrapped in monsoon mist"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/70" />
        <div className="hero-text-shadow relative z-10 px-6 py-32 text-center">
          <p className="kicker text-sage">404</p>
          <h1 className="mx-auto mt-5 max-w-2xl font-serif-i text-4xl font-normal leading-snug text-paper sm:text-5xl">
            Looks like you&rsquo;ve wandered off the trail.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-paper/80">
            The page you&rsquo;re after isn&rsquo;t here — but the view back home
            is worth it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <CTA href="/" variant="light">
              Back to the view
            </CTA>
            <CTA href={waLink(waMsg.general)} external variant="outlineLight">
              <MessageCircle className="size-4" /> WhatsApp us
            </CTA>
          </div>
        </div>
      </main>
    </>
  );
}
