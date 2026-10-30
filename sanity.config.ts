import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityProject } from "./src/sanity/config";
import { servicePhoto, servicesMedia, serviceVideo } from "./src/sanity/schema";

export default defineConfig({
  name: "rvbtech",
  title: "R.V.B Tech",
  ...sanityProject,
  plugins: [structureTool()],
  schema: { types: [servicePhoto, serviceVideo, servicesMedia] },
  document: { singletons: ["servicesMedia"] },
});
