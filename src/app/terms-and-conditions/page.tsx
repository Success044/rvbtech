import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the R.V.B Tech website Terms and Conditions, including information about enquiries, quotes, and website use.",
};

export default function TermsAndConditions() {
  return <LegalPage document={termsAndConditions} />;
}
