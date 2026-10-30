// Shared media shapes and the original catalog used by the Sanity import.
// The logo stays local; Services can use Sanity or explicitly selected local mode.
export type ServiceCategory = "plumbing" | "electrical";

export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type ServicePhoto = MediaImage & {
  id?: string;
  category: ServiceCategory;
};

export const youtubeChannelUrl = "https://www.youtube.com/@RVBTECH218";

export type SiteVideo = {
  id: string;
  title: string;
  url: string;
  category?: ServiceCategory;
  featured: boolean;
};

export type ServicesMedia = {
  images: ServicePhoto[];
  videos: SiteVideo[];
};

export const companyLogo: MediaImage = {
  src: "/images/logo/rvblogo.png",
  alt: "R.V.B Tech",
  width: 1131,
  height: 1101,
  caption: "R.V.B Tech company logo",
};

// Photos belong to the Services route; the homepage keeps its illustrations.
export const serviceMedia = {
  plumbing: [
    {
      src: "/images/services/plumbing/rooftop-pipe-routing.webp",
      alt: "Green water supply pipes routed around a corner beside grey drainage pipes",
      width: 1200,
      height: 1600,
      caption: "Water supply & pipe routing",
    },
    {
      src: "/images/services/plumbing/water-tank-distribution.webp",
      alt: "Rooftop water tank connected to a green pipe distribution manifold with individual valves",
      width: 1200,
      height: 1600,
      caption: "Water tank distribution",
    },
    {
      src: "/images/services/plumbing/bathroom-plumbing-rough-in.webp",
      alt: "Water supply pipes installed along exposed brick bathroom walls before finishing",
      width: 1200,
      height: 1600,
      caption: "Bathroom plumbing before finishing",
    },
    {
      src: "/images/services/plumbing/concealed-cistern-installation.webp",
      alt: "Concealed toilet cistern and support frame installed in an unfinished wall",
      width: 1200,
      height: 1600,
      caption: "Concealed cistern installation",
    },
    {
      src: "/images/services/plumbing/bathroom-sanitary-installation.webp",
      alt: "White pedestal washbasin and toilet fitted against a grey tiled bathroom wall",
      width: 1600,
      height: 1200,
      caption: "Bathroom sanitary fittings",
    },
    {
      src: "/images/services/plumbing/washbasin-installation.webp",
      alt: "Pedestal washbasin with a wall-mounted tap and handheld spray beside a tiled wall",
      width: 1200,
      height: 1600,
      caption: "Washbasin installation",
    },
    {
      src: "/images/services/plumbing/sundhara-washbasin-before.webp",
      alt: "Washbasin beneath a window before work, with exposed wall connections and a red container on the basin",
      width: 1200,
      height: 1600,
      caption: "Washbasin before work",
    },
    {
      src: "/images/services/plumbing/sundhara-washbasin-after.webp",
      alt: "Washbasin beneath the same window after work, with a fitted wall tap and a clear basin",
      width: 1200,
      height: 1600,
      caption: "Washbasin after work",
    },
  ],
  electrical: [
    {
      src: "/images/services/electrical/commercial-lighting.webp",
      alt: "Pendant lamps and ceiling track lights illuminated inside a commercial space under construction",
      width: 1600,
      height: 1200,
      caption: "Commercial lighting installation",
    },
    {
      src: "/images/services/electrical/decorative-led-lighting.webp",
      alt: "Rectangular decorative ceiling lights and perimeter LED lighting above a wood-panelled wall",
      width: 1600,
      height: 1200,
      caption: "Decorative LED lighting",
    },
    {
      src: "/images/services/electrical/electrical-conduit-switchboards.webp",
      alt: "Surface-mounted electrical conduits routed into a vertical group of white switchboards",
      width: 1200,
      height: 1600,
      caption: "Conduit routing & switchboards",
    },
    {
      src: "/images/services/electrical/track-lighting.webp",
      alt: "Black ceiling-mounted track lights above an interior space during construction",
      width: 1200,
      height: 1600,
      caption: "Track lighting",
    },
  ],
} satisfies Record<ServiceCategory, MediaImage[]>;

// Photos retain their original proportions. Categories power the gallery filters.
export const selectedWork: ServicePhoto[] = [
  { ...serviceMedia.electrical[0], category: "electrical" },
  { ...serviceMedia.plumbing[1], category: "plumbing" },
  { ...serviceMedia.plumbing[4], category: "plumbing" },
  { ...serviceMedia.plumbing[0], category: "plumbing" },
  { ...serviceMedia.electrical[1], category: "electrical" },
  { ...serviceMedia.plumbing[3], category: "plumbing" },
  { ...serviceMedia.electrical[2], category: "electrical" },
  { ...serviceMedia.plumbing[2], category: "plumbing" },
  { ...serviceMedia.plumbing[5], category: "plumbing" },
  { ...serviceMedia.electrical[3], category: "electrical" },
  { ...serviceMedia.plumbing[6], category: "plumbing" },
  { ...serviceMedia.plumbing[7], category: "plumbing" },
];

// Order follows the supplied links. Display titles use public metadata and thumbnails.
// Only featured clips appear on /services. Keep the extra sixth clip in reserve.
export const siteVideos: SiteVideo[] = [
  {
    id: "site-update",
    title: "Washbasin fitting",
    url: "https://www.youtube.com/shorts/uQhh8aSTmNc",
    category: "plumbing",
    featured: true,
  },
  {
    id: "plumbing",
    title: "Plumbing",
    url: "https://www.youtube.com/shorts/P4qw4DUPpsE",
    category: "plumbing",
    featured: true,
  },
  {
    id: "toilet-fitting",
    title: "Toilet fitting",
    url: "https://www.youtube.com/shorts/STQfH9Ev9pk",
    category: "plumbing",
    featured: true,
  },
  {
    id: "bathroom-fittings",
    title: "Wall-hung toilet, washbasin & sink mixer",
    url: "https://www.youtube.com/shorts/9GFVXdveaXE",
    category: "plumbing",
    featured: true,
  },
  {
    id: "wall-light",
    title: "Wall light fitting",
    url: "https://www.youtube.com/shorts/FbNtR23-sHE",
    category: "electrical",
    featured: true,
  },
  {
    id: "wall-hung-toilet",
    title: "Wall-hung toilet fitting",
    url: "https://www.youtube.com/shorts/S1kni12wxtY",
    category: "plumbing",
    featured: false,
  },
];
