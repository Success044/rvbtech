import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the R.V.B Tech website Privacy Policy, including how enquiry information may be used and handled.",
};

export default function PrivacyPolicy() {
  return <LegalPage document={privacyPolicy} />;
}
