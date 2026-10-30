// Service scope for /services. Homepage service copy stays in site.ts.
export const serviceSummaries = [
  {
    id: "plumbing",
    title: "Plumbing",
    description: "From the tank connections to the fittings you use every day.",
    topics: [
      "Water supply & pipe routing",
      "Water tank connections",
      "Bathroom & sanitary fittings",
      "Concealed pipework",
    ],
  },
  {
    id: "electrical",
    title: "Electrical",
    description:
      "Lighting and electrical connections, with the routes considered too.",
    topics: [
      "Lighting installations",
      "Switchboard installations",
      "Electrical conduit routing",
    ],
  },
] as const;
