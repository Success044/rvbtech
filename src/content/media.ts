// Shared media shapes and the original catalog used by the Sanity import.
// The logo stays local; Services can use Sanity or explicitly selected local mode.
export type ServiceCategory = "plumbing" | "electrical";

export type MediaImage = {
  src: string;
  alt: string;
  altNe?: string;
  width: number;
  height: number;
  caption: string;
  captionNe?: string;
};

export type ServicePhoto = MediaImage & {
  id?: string;
  category: ServiceCategory;
};

export const youtubeChannelUrl = "https://www.youtube.com/@RVBTECH218";

export type SiteVideo = {
  id: string;
  title: string;
  titleNe?: string;
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
      altNe: "हरियो पानी आपूर्ति पाइप कुनाबाट घुमेर खरानी रङका ढल पाइपसँगै बिछ्याइएको",
      width: 1200,
      height: 1600,
      caption: "Water supply & pipe routing",
      captionNe: "पानी आपूर्ति तथा पाइपको मार्ग",
    },
    {
      src: "/images/services/plumbing/water-tank-distribution.webp",
      alt: "Rooftop water tank connected to a green pipe distribution manifold with individual valves",
      altNe:
        "छतको पानी ट्याङ्की प्रत्येक पाइपमा भल्भ भएको हरियो वितरण पाइपसँग जोडिएको",
      width: 1200,
      height: 1600,
      caption: "Water tank distribution",
      captionNe: "पानी ट्याङ्की वितरण प्रणाली",
    },
    {
      src: "/images/services/plumbing/bathroom-plumbing-rough-in.webp",
      alt: "Water supply pipes installed along exposed brick bathroom walls before finishing",
      altNe: "फिनिसिङअघि इँटा देखिने बाथरुमको भित्तामा पानी आपूर्ति पाइप जडान गरिएको",
      width: 1200,
      height: 1600,
      caption: "Bathroom plumbing before finishing",
      captionNe: "फिनिसिङअघि बाथरुमको प्लम्बिङ",
    },
    {
      src: "/images/services/plumbing/concealed-cistern-installation.webp",
      alt: "Concealed toilet cistern and support frame installed in an unfinished wall",
      altNe: "अधुरो भित्तामा लुकाइने शौचालय फ्लस ट्याङ्की र सपोर्ट फ्रेम जडान गरिएको",
      width: 1200,
      height: 1600,
      caption: "Concealed cistern installation",
      captionNe: "लुकाइने फ्लस ट्याङ्की जडान",
    },
    {
      src: "/images/services/plumbing/bathroom-sanitary-installation.webp",
      alt: "White pedestal washbasin and toilet fitted against a grey tiled bathroom wall",
      altNe:
        "खरानी टायल भएको बाथरुमको भित्तामा सेतो पेडेस्टल वासबेसिन र शौचालय जडान गरिएको",
      width: 1600,
      height: 1200,
      caption: "Bathroom sanitary fittings",
      captionNe: "बाथरुमका स्यानिटरी फिटिङ",
    },
    {
      src: "/images/services/plumbing/washbasin-installation.webp",
      alt: "Pedestal washbasin with a wall-mounted tap and handheld spray beside a tiled wall",
      altNe: "टायलको भित्ताछेउ भित्तामा जडित धारा र ह्यान्ड स्प्रे भएको पेडेस्टल वासबेसिन",
      width: 1200,
      height: 1600,
      caption: "Washbasin installation",
      captionNe: "वासबेसिन जडान",
    },
    {
      src: "/images/services/plumbing/sundhara-washbasin-before.webp",
      alt: "Washbasin beneath a window before work, with exposed wall connections and a red container on the basin",
      altNe: "कामअघि झ्यालमुनिको वासबेसिन, भित्ताका जडान खुला र बेसिनमाथि रातो भाँडो",
      width: 1200,
      height: 1600,
      caption: "Washbasin before work",
      captionNe: "कामअघिको वासबेसिन",
    },
    {
      src: "/images/services/plumbing/sundhara-washbasin-after.webp",
      alt: "Washbasin beneath the same window after work, with a fitted wall tap and a clear basin",
      altNe:
        "कामपछि उही झ्यालमुनिको वासबेसिन, भित्तामा धारा जडान गरिएको र बेसिन सफा",
      width: 1200,
      height: 1600,
      caption: "Washbasin after work",
      captionNe: "कामपछिको वासबेसिन",
    },
  ],
  electrical: [
    {
      src: "/images/services/electrical/commercial-lighting.webp",
      alt: "Pendant lamps and ceiling track lights illuminated inside a commercial space under construction",
      altNe:
        "निर्माणाधीन व्यावसायिक स्थानभित्र झुन्डिएका बत्ती र छतका ट्र्याक लाइट बलिरहेका",
      width: 1600,
      height: 1200,
      caption: "Commercial lighting installation",
      captionNe: "व्यावसायिक स्थानको बत्ती जडान",
    },
    {
      src: "/images/services/electrical/decorative-led-lighting.webp",
      alt: "Rectangular decorative ceiling lights and perimeter LED lighting above a wood-panelled wall",
      altNe:
        "काठको प्यानल भएको भित्तामाथि आयताकार सजावटी छत बत्ती र किनारामा LED बत्ती",
      width: 1600,
      height: 1200,
      caption: "Decorative LED lighting",
      captionNe: "सजावटी LED बत्ती",
    },
    {
      src: "/images/services/electrical/electrical-conduit-switchboards.webp",
      alt: "Surface-mounted electrical conduits routed into a vertical group of white switchboards",
      altNe: "भित्तामाथि जडित विद्युतीय कन्ड्युट सेतो स्विचबोर्डको ठाडो समूहसम्म लगिएको",
      width: 1200,
      height: 1600,
      caption: "Conduit routing & switchboards",
      captionNe: "कन्ड्युटको मार्ग तथा स्विचबोर्ड",
    },
    {
      src: "/images/services/electrical/track-lighting.webp",
      alt: "Black ceiling-mounted track lights above an interior space during construction",
      altNe: "निर्माणको क्रममा भित्री स्थानमाथि छतमा जडित कालो ट्र्याक लाइट",
      width: 1200,
      height: 1600,
      caption: "Track lighting",
      captionNe: "ट्र्याक लाइट",
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
    titleNe: "वासबेसिन जडान",
    url: "https://www.youtube.com/shorts/uQhh8aSTmNc",
    category: "plumbing",
    featured: true,
  },
  {
    id: "plumbing",
    title: "Plumbing",
    titleNe: "प्लम्बिङ",
    url: "https://www.youtube.com/shorts/P4qw4DUPpsE",
    category: "plumbing",
    featured: true,
  },
  {
    id: "toilet-fitting",
    title: "Toilet fitting",
    titleNe: "शौचालय जडान",
    url: "https://www.youtube.com/shorts/STQfH9Ev9pk",
    category: "plumbing",
    featured: true,
  },
  {
    id: "bathroom-fittings",
    title: "Wall-hung toilet, washbasin & sink mixer",
    titleNe: "भित्तामा जडित शौचालय, वासबेसिन तथा सिंक मिक्सर",
    url: "https://www.youtube.com/shorts/9GFVXdveaXE",
    category: "plumbing",
    featured: true,
  },
  {
    id: "wall-light",
    title: "Wall light fitting",
    titleNe: "भित्ते बत्ती जडान",
    url: "https://www.youtube.com/shorts/FbNtR23-sHE",
    category: "electrical",
    featured: true,
  },
  {
    id: "wall-hung-toilet",
    title: "Wall-hung toilet fitting",
    titleNe: "भित्तामा जडित शौचालयको जडान",
    url: "https://www.youtube.com/shorts/S1kni12wxtY",
    category: "plumbing",
    featured: false,
  },
];
