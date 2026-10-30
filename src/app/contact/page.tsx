import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact R.V.B Tech about plumbing and electrical work. Call, WhatsApp, email, or send a project enquiry.",
};

export default function Contact() {
  return (
    <ContactPage siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />
  );
}
