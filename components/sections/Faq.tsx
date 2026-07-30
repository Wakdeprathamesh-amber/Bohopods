import { MessageCircle, Plus } from "lucide-react";
import { Container, Section, SectionHeading, SectionLead, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { faqs, waLink, waMsg } from "@/lib/site";

export function Faq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq" className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container className="max-w-3xl">
        <div className="text-center">
          <Reveal>
            <SectionHeading>Questions</SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionLead className="mx-auto">
              Good questions, clear answers.
            </SectionLead>
          </Reveal>
        </div>

        <div className="mt-10 divide-y divide-sand border-y border-sand">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-display text-forest [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="size-5 shrink-0 text-olive transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-10 text-center">
            <p className="text-muted">Still have a question?</p>
            <CTA
              href={waLink(waMsg.general)}
              external
              variant="outlineDark"
              className="mt-4"
            >
              <MessageCircle className="size-4" /> Ask us on WhatsApp
            </CTA>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
