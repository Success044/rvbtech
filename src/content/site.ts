import { companyLogo } from "@/content/media";

export const site = {
  name: "rvbtech",
  title: "rvbtech — Plumbing & Electrical Contracting",
  description:
    "Thoughtful planning and careful plumbing and electrical installation. Meet rvbtech, a contracting company building from the inside out.",
  logo: companyLogo,
  // Approved contact details appear in the shared project invitation.
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
};

export const services = [
  {
    id: "plumbing",
    title: "Plumbing",
    description:
      "Thoughtfully planned water supply and drainage. From the first pipe route to the final connection, every detail belongs to a bigger picture.",
    topics: ["Water supply", "Drainage", "System installation"],
    link: "Discuss plumbing work",
  },
  {
    id: "electrical",
    title: "Electrical",
    description:
      "Considered electrical systems for the way a space will be used. Coordinated routes, careful installation, and attention to the connections behind the walls.",
    topics: ["Wiring & routing", "Power distribution", "System installation"],
    link: "Discuss electrical work",
  },
] as const;

// Proposed workflow from the homepage plan; confirm with the owner before launch.
export const process = [
  {
    title: "A conversation first",
    description:
      "Understand your space, your plans, and what you need the systems to do.",
  },
  {
    title: "Plan the details",
    description:
      "Consider the routes, connections, and coordination before work begins.",
  },
  {
    title: "Bring it together",
    description:
      "Carry the plan through installation, with care for the work around it.",
  },
  {
    title: "Check & hand over",
    description:
      "Review the installation and walk through the completed scope together.",
  },
];
