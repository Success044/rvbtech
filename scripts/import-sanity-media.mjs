import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";
import { selectedWork, siteVideos } from "../src/content/media.ts";
import { sanityApiVersion, servicesMediaId } from "../src/sanity/config.ts";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const files = selectedWork.map((photo) =>
  path.join(projectRoot, "public", photo.src),
);
for (const file of files) {
  if (!existsSync(file)) throw new Error(`Missing source photo: ${file}`);
}
if (process.argv.includes("--dry-run")) {
  console.log(
    `Ready to import ${files.length} photos and ${siteVideos.length} YouTube links.`,
  );
  console.log(
    "The first five videos will be visible; the sixth will stay hidden.",
  );
} else {
  const client = getCliClient({ apiVersion: sanityApiVersion }).withConfig({
    useCdn: false,
    perspective: "raw",
  });
  if (!client.config().token) {
    throw new Error(
      "Sign in with npm exec sanity login, then rerun npm run sanity:import.",
    );
  }
  const existingQuery = "*[_id in $ids][0]._id";
  const ids = [servicesMediaId, `drafts.${servicesMediaId}`];
  if (await client.fetch(existingQuery, { ids })) {
    console.log(
      "Services media already exists. Import skipped to preserve existing edits.",
    );
  } else {
    const photos = [];
    for (const [index, photo] of selectedWork.entries()) {
      const asset = await client.assets.upload(
        "image",
        createReadStream(files[index]),
        {
          filename: path.basename(files[index]),
          contentType: "image/webp",
        },
      );
      photos.push({
        _type: "servicePhoto",
        _key: `photo-${index + 1}`,
        asset: { _type: "reference", _ref: asset._id },
        alt: photo.alt,
        caption: photo.caption,
        category: photo.category,
        isActive: true,
      });
      console.log(`Uploaded ${index + 1}/${files.length}: ${photo.caption}`);
    }
    const videos = siteVideos.map((video) => ({
      _type: "serviceVideo",
      _key: video.id,
      title: video.title,
      videoUrl: video.url,
      serviceCategory: video.category,
      featured: video.featured,
    }));
    if (await client.fetch(existingQuery, { ids })) {
      console.log(
        "Services media was created during the upload. Existing edits were preserved.",
      );
    } else {
      await client.createIfNotExists({
        _id: servicesMediaId,
        _type: "servicesMedia",
        photos,
        videos,
      });
      console.log(
        `Published ${photos.length} photos and ${videos.length} video links to Services media.`,
      );
    }
  }
}
