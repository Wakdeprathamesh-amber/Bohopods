import Image from "next/image";

/** Full-bleed statement moment — one image, one line, no UI. */
export function ImageBreak() {
  return (
    <section className="relative flex min-h-[58vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/gatsby/ext-01.jpg"
        alt="Evening light glowing through the glass walls of a Gatsby pod"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest-deep/55" />
      <div className="hero-text-shadow relative z-10 px-6 py-24 text-center">
        <p className="kicker text-sage">The Boho feeling</p>
        <p className="mx-auto mt-6 max-w-4xl font-serif-i text-3xl leading-snug text-paper sm:text-4xl md:text-5xl">
          &ldquo;inside but outside, but still inside&rdquo;
        </p>
      </div>
    </section>
  );
}
