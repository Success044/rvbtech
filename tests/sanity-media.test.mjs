import assert from "node:assert/strict";
import { test } from "node:test";
import { selectedWork, siteVideos } from "../src/content/media.ts";
import {
  isSanityImage,
  sanityImageLoader,
} from "../src/lib/sanity-image-loader.ts";
import { loadServicesMedia, mapSanityMedia } from "../src/sanity/media.ts";

const photo = {
  _key: "photo-1",
  alt: "Water supply pipes",
  caption: "Pipe routing",
  category: "plumbing",
  isActive: true,
  asset: {
    _id: "image-abc123-1600x1200-webp",
    metadata: { dimensions: { width: 1600, height: 1200 } },
  },
};
const video = {
  _key: "video-1",
  title: "Washbasin fitting",
  videoUrl: "https://www.youtube.com/shorts/uQhh8aSTmNc",
  serviceCategory: "plumbing",
  featured: true,
};

test("maps ordered CMS photos and videos without changing visibility or losing stable keys", () => {
  const media = mapSanityMedia({
    photos: [photo, { ...photo, _key: "photo-2", category: "electrical" }],
    videos: [video, { ...video, _key: "video-2", featured: false }],
  });
  assert.deepEqual(
    media.images.map((image) => image.id),
    ["photo-1", "photo-2"],
  );
  assert.deepEqual(
    media.images.map((image) => image.category),
    ["plumbing", "electrical"],
  );
  assert.equal(media.images[0].width, 1600);
  assert.equal(media.images[0].height, 1200);
  assert.match(media.images[0].src, /^https:\/\/cdn\.sanity\.io\/images\//);
  assert.deepEqual(
    media.videos.map((item) => [item.id, item.featured]),
    [
      ["video-1", true],
      ["video-2", false],
    ],
  );
});

test("applies the editor's image crop and carries it into responsive CDN URLs", () => {
  const media = mapSanityMedia({
    photos: [
      {
        ...photo,
        crop: { left: 0.125, right: 0.125, top: 0, bottom: 0.25 },
        hotspot: { x: 0.5, y: 0.4, width: 0.2, height: 0.2 },
      },
    ],
  });
  const image = media.images[0];
  assert.equal(image.width, 1200);
  assert.equal(image.height, 900);
  const originalUrl = new URL(image.src);
  assert.equal(originalUrl.searchParams.get("rect"), "200,0,1200,900");
  const thumbnailUrl = new URL(
    sanityImageLoader({ src: image.src, width: 400, quality: 75 }),
  );
  assert.equal(
    thumbnailUrl.searchParams.get("rect"),
    originalUrl.searchParams.get("rect"),
  );
  assert.equal(thumbnailUrl.searchParams.get("w"), "400");
  assert.equal(thumbnailUrl.searchParams.has("h"), false);
  assert.equal(thumbnailUrl.searchParams.get("q"), "75");
  assert.equal(thumbnailUrl.searchParams.get("auto"), "format");
});

test("skips hidden, incomplete, or malformed photos without breaking the remaining gallery", () => {
  const media = mapSanityMedia({
    photos: [
      null,
      "invalid",
      { ...photo, isActive: false },
      { ...photo, alt: " " },
      { ...photo, caption: "" },
      { ...photo, category: "unknown" },
      { ...photo, asset: null },
      {
        ...photo,
        asset: { ...photo.asset, _id: "https://example.com/image.webp" },
      },
      {
        ...photo,
        asset: {
          ...photo.asset,
          metadata: { dimensions: { width: -1, height: 1200 } },
        },
      },
      photo,
    ],
  });
  assert.equal(media.images.length, 1);
  assert.equal(media.images[0].caption, photo.caption);
});

test("ignores invalid crop and hotspot metadata instead of generating broken URLs", () => {
  const media = mapSanityMedia({
    photos: [
      {
        ...photo,
        crop: { left: 1, right: 1, top: Number.NaN, bottom: 0 },
        hotspot: { x: -1, y: 0.5, width: 0, height: 1 },
      },
    ],
  });
  assert.equal(media.images[0].width, 1600);
  assert.equal(media.images[0].height, 1200);
  assert.equal(media.images[0].src.includes("NaN"), false);
});

test("never accepts arbitrary embeds or unsafe video links from CMS content", () => {
  const media = mapSanityMedia({
    videos: [
      null,
      { ...video, videoUrl: "javascript:alert(1)" },
      {
        ...video,
        videoUrl: "https://youtube.com.example.com/watch?v=uQhh8aSTmNc",
      },
      {
        ...video,
        videoUrl:
          '<iframe src="https://youtube.com/embed/uQhh8aSTmNc"></iframe>',
      },
      { ...video, title: " " },
      video,
    ],
  });
  assert.equal(media.videos.length, 1);
  assert.equal(media.videos[0].url, video.videoUrl);
});

test("empty or unpublished CMS content stays empty and never resurrects the local catalog", async () => {
  for (const document of [null, undefined, {}, { photos: [], videos: [] }]) {
    assert.deepEqual(await loadServicesMedia("sanity", async () => document), {
      images: [],
      videos: [],
    });
  }
  await assert.rejects(
    loadServicesMedia("sanity", async () => {
      throw new Error("API unavailable");
    }),
    /API unavailable/,
  );
});

test("uses local media only when explicitly selected, without contacting the CMS", async () => {
  const media = await loadServicesMedia("local", async () => {
    throw new Error("Must not fetch");
  });
  assert.deepEqual(media, { images: selectedWork, videos: siteVideos });
  assert.equal(media.images.length, 12);
  assert.equal(media.videos.filter((item) => item.featured).length, 5);
  await assert.rejects(
    loadServicesMedia("invalid", async () => null),
    /SERVICES_MEDIA_SOURCE/,
  );
});

test("restricts the CDN loader to Sanity images and rejects lookalike domains", () => {
  for (const src of [
    "/images/photo.webp",
    "https://example.com/photo.webp",
    "https://cdn.sanity.io.evil.example/images/photo.webp",
  ]) {
    assert.equal(isSanityImage(src), false);
    assert.throws(
      () => sanityImageLoader({ src, width: 400 }),
      /Expected a Sanity image/,
    );
  }
});
