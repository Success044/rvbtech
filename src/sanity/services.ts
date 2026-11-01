import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { sanityApiVersion, sanityProject, servicesMediaId } from "./config";
import { loadServicesMedia } from "./media";

const mediaQuery = `*[_type == "servicesMedia" && _id == $id][0] {
  photos[] {
    _key, alt, altNe, caption, captionNe, category, isActive, crop, hotspot,
    "asset": asset->{_id, metadata{dimensions{width, height}}}
  },
  videos[] {_key, title, titleNe, videoUrl, serviceCategory, featured}
}`;

export async function getServicesMedia() {
  "use cache";

  cacheLife({ stale: 0, revalidate: 60, expire: 3600 });
  cacheTag("services-media");

  return loadServicesMedia(
    process.env.SERVICES_MEDIA_SOURCE || "sanity",
    async () => {
      const endpoint = new URL(
        `https://${sanityProject.projectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityProject.dataset}`,
      );
      endpoint.searchParams.set("query", mediaQuery);
      endpoint.searchParams.set("$id", JSON.stringify(servicesMediaId));
      endpoint.searchParams.set("perspective", "published");
      const token = process.env.SANITY_API_READ_TOKEN;
      // Use Next's instrumented fetch so Cache Components can track this read
      // during prerendering as well as subsequent cache revalidation.
      const response = await fetch(endpoint, {
        cache: "no-store",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!response.ok) {
        throw new Error(
          `Sanity media request failed (HTTP ${response.status}).`,
        );
      }
      const body: unknown = await response.json();
      if (!body || typeof body !== "object" || !("result" in body)) {
        throw new Error("Sanity returned an invalid media response.");
      }
      return body.result;
    },
  );
}
