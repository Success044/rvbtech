import { defineCliConfig } from "sanity/cli";
import { sanityProject } from "./src/sanity/config";

export default defineCliConfig({
  api: sanityProject,
  deployment: { appId: "u4qg5haqxobzu0b10g9b0c29" },
});
