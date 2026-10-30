import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/layout";
import { contactDetails } from "@/content/contact";
import { ContactForm } from "./contact-form";

export function ContactPage({ siteKey }: { siteKey: string }) {
  return (
    <section
      className="bg-white py-10 text-graphite md:py-14 xl:py-16"
      aria-labelledby="contact-page-heading"
    >
      <Container>
        <Breadcrumb currentPage="Contact" />
        <div className="grid gap-10 pt-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pt-12 xl:gap-24">
          <div>
            <h1
              id="contact-page-heading"
              className="max-w-[13ch] text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.045em]"
            >
              Let’s talk about your project.
            </h1>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-muted">
              A new installation, a renovation, or a question about plumbing and
              electrical work. Tell us what you have in mind.
            </p>
            <div className="mt-8 space-y-5 border-t border-line/70 pt-7">
              <div className="flex items-start gap-4">
                <Phone
                  className="mt-1 text-sage"
                  size={20}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-xs text-muted">Call us</h2>
                  <a
                    className="inline-flex min-h-10 items-center text-lg font-medium hover:text-copper"
                    href={`tel:${contactDetails.phoneInternational}`}
                  >
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle
                  className="mt-1 text-sage"
                  size={20}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-xs text-muted">Prefer a message?</h2>
                  <a
                    className="inline-flex min-h-10 items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-copper"
                    href={contactDetails.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                    <ArrowUpRight size={15} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-sage" size={20} aria-hidden="true" />
                <div className="min-w-0">
                  <h2 className="text-xs text-muted">Email</h2>
                  <a
                    className="inline-flex min-h-10 items-center break-all text-sm font-medium hover:text-copper"
                    href={`mailto:${contactDetails.email}`}
                  >
                    {contactDetails.email}
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-[37ch] text-xs leading-relaxed text-muted">
              You can send a broad location and a short description first. We’ll
              discuss the details with you directly.
            </p>
          </div>
          <div className="min-w-0 border-t border-line/70 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 xl:pl-16">
            <ContactForm siteKey={siteKey} />
          </div>
        </div>
        <section
          className="mt-12 border-t border-line/70 pt-8 md:mt-16"
          aria-labelledby="office-location-heading"
        >
          <h2
            id="office-location-heading"
            className="text-xl font-medium tracking-tight"
          >
            Office location
          </h2>
          <p className="mt-2 text-sm text-muted">{contactDetails.address}</p>
          <iframe
            className="mt-5 block h-72 w-full rounded-lg border-0 md:h-96"
            src={contactDetails.mapEmbedUrl}
            title="R.V.B Tech office location on Google Maps"
            width={600}
            height={450}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </section>
      </Container>
    </section>
  );
}
