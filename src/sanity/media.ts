import { createImageUrlBuilder } from "@sanity/image-url";
import {
  type ServiceCategory,
  type ServicePhoto,
  type ServicesMedia,
  type SiteVideo,
  selectedWork,
  serviceMedia,
  siteVideos,
} from "../content/media.ts";
import { getYouTubeVideoId } from "../lib/youtube.ts";
import { sanityProject } from "./config.ts";

const imageBuilder = createImageUrlBuilder(sanityProject);
const assetIdPattern = /^image-[a-zA-Z0-9]+-[1-9]\d*x[1-9]\d*-[a-z0-9]+$/;
const localPhotos = Object.values(serviceMedia).flat();

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function category(value: unknown): ServiceCategory | undefined {
  return value === "plumbing" || value === "electrical" ? value : undefined;
}

function fraction(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  );
}

function cropFrom(value: unknown) {
  const crop = record(value);
  if (
    crop &&
    fraction(crop.left) &&
    fraction(crop.right) &&
    fraction(crop.top) &&
    fraction(crop.bottom) &&
    crop.left + crop.right < 1 &&
    crop.top + crop.bottom < 1
  ) {
    return {
      left: crop.left,
      right: crop.right,
      top: crop.top,
      bottom: crop.bottom,
    };
  }
  return undefined;
}

function hotspotFrom(value: unknown) {
  const hotspot = record(value);
  if (
    hotspot &&
    fraction(hotspot.x) &&
    fraction(hotspot.y) &&
    fraction(hotspot.width) &&
    fraction(hotspot.height) &&
    hotspot.width > 0 &&
    hotspot.height > 0
  ) {
    return {
      x: hotspot.x,
      y: hotspot.y,
      width: hotspot.width,
      height: hotspot.height,
    };
  }
  return undefined;
}

function photoFrom(value: unknown): ServicePhoto | null {
  const photo = record(value);
  if (!photo || photo.isActive === false) return null;
  const id = text(photo._key);
  const alt = text(photo.alt);
  const caption = text(photo.caption);
  const localPhoto = localPhotos.find(
    (item) => item.alt === alt && item.caption === caption,
  );
  const altNe = text(photo.altNe) ?? localPhoto?.altNe;
  const captionNe = text(photo.captionNe) ?? localPhoto?.captionNe;
  const service = category(photo.category);
  const asset = record(photo.asset);
  const assetId = text(asset?._id);
  const dimensions = record(record(asset?.metadata)?.dimensions);
  const width = dimensions?.width;
  const height = dimensions?.height;
  if (
    !id ||
    !alt ||
    !caption ||
    !service ||
    !assetId ||
    !assetIdPattern.test(assetId) ||
    typeof width !== "number" ||
    !Number.isSafeInteger(width) ||
    width <= 0 ||
    typeof height !== "number" ||
    !Number.isSafeInteger(height) ||
    height <= 0
  )
    return null;

  const crop = cropFrom(photo.crop);
  const croppedWidth = Math.max(
    1,
    Math.round(width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))),
  );
  const croppedHeight = Math.max(
    1,
    Math.round(height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))),
  );
  const src = imageBuilder
    .image({
      asset: { _ref: assetId },
      crop,
      hotspot: hotspotFrom(photo.hotspot),
    })
    .width(croppedWidth)
    .height(croppedHeight)
    .fit("crop")
    .auto("format")
    .url();

  return {
    id,
    src,
    alt,
    ...(altNe ? { altNe } : {}),
    caption,
    ...(captionNe ? { captionNe } : {}),
    category: service,
    width: croppedWidth,
    height: croppedHeight,
  };
}

function videoFrom(value: unknown): SiteVideo | null {
  const video = record(value);
  if (!video) return null;
  const id = text(video._key);
  const title = text(video.title);
  const url = text(video.videoUrl);
  const localVideo = siteVideos.find(
    (item) => item.title === title && item.url === url,
  );
  const titleNe = text(video.titleNe) ?? localVideo?.titleNe;
  if (!id || !title || !url || !getYouTubeVideoId(url)) return null;
  return {
    id,
    title,
    ...(titleNe ? { titleNe } : {}),
    url,
    category: category(video.serviceCategory),
    featured: video.featured === true,
  };
}

export function mapSanityMedia(document: unknown): ServicesMedia {
  const media = record(document);
  const photos = Array.isArray(media?.photos) ? media.photos : [];
  const videos = Array.isArray(media?.videos) ? media.videos : [];
  return {
    images: photos
      .map(photoFrom)
      .filter((photo): photo is ServicePhoto => photo !== null),
    videos: videos
      .map(videoFrom)
      .filter((video): video is SiteVideo => video !== null),
  };
}

// Only explicitly selected local mode uses the original catalog. Empty or
// unpublished CMS content and API errors must never bring removed media back.
export async function loadServicesMedia(
  source: string,
  fetchPublished: () => Promise<unknown>,
): Promise<ServicesMedia> {
  if (source === "local") return { images: selectedWork, videos: siteVideos };
  if (source !== "sanity")
    throw new Error("SERVICES_MEDIA_SOURCE must be local or sanity.");
  return mapSanityMedia(await fetchPublished());
}
