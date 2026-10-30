import type { ImageLoaderProps } from "next/image";

export function isSanityImage(src: string): boolean {
  return src.startsWith("https://cdn.sanity.io/images/");
}

export function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!isSanityImage(src)) throw new Error("Expected a Sanity image URL.");
  const url = new URL(src);
  // The source URL already contains the editor's crop. Resize that crop
  // directly on Sanity's CDN instead of encoding the image a second time.
  url.searchParams.set("w", String(width));
  url.searchParams.delete("h");
  url.searchParams.set("fit", "max");
  url.searchParams.set("q", String(quality ?? 80));
  url.searchParams.set("auto", "format");
  return url.toString();
}
