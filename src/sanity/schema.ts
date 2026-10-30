import { defineArrayMember, defineField, defineType } from "sanity";
import { getYouTubeVideoId } from "../lib/youtube";

const categories = [
  { title: "Plumbing", value: "plumbing" },
  { title: "Electrical", value: "electrical" },
];

export const servicePhoto = defineType({
  name: "servicePhoto",
  title: "Installation photo",
  type: "image",
  options: { hotspot: true },
  validation: (rule) => rule.required().assetRequired(),
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "A short description of the installation, shown below the photo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "captionNe",
      title: "Caption (Nepali)",
      type: "string",
      description: "Optional Nepali caption for the /ne version of the site.",
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "text",
      rows: 2,
      description:
        "Describe what is visible for visitors using a screen reader.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "altNe",
      title: "Alternative text (Nepali)",
      type: "text",
      rows: 2,
      description:
        "Optional Nepali description for screen-reader users on the /ne version.",
    }),
    defineField({
      name: "category",
      title: "Service",
      type: "string",
      options: { list: categories, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Show in gallery",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "category", media: "asset" },
  },
});

export const serviceVideo = defineType({
  name: "serviceVideo",
  title: "Installation video",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleNe",
      title: "Title (Nepali)",
      type: "string",
      description: "Optional Nepali title for the /ne version of the site.",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube link",
      type: "url",
      description:
        "Paste a YouTube Shorts, watch, or share link. The video stays on YouTube.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            !value || getYouTubeVideoId(value)
              ? true
              : "Enter a valid HTTPS YouTube video link.",
          ),
    }),
    defineField({
      name: "serviceCategory",
      title: "Service",
      type: "string",
      options: { list: categories, layout: "radio" },
    }),
    defineField({
      name: "featured",
      title: "Show on Services",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "title", subtitle: "serviceCategory" } },
});

export const servicesMedia = defineType({
  name: "servicesMedia",
  title: "Services media",
  type: "document",
  fields: [
    defineField({
      name: "photos",
      title: "Photo gallery",
      type: "array",
      description:
        "Drag photos to change their order. Select a photo to edit its caption, crop, or visibility.",
      of: [defineArrayMember({ type: "servicePhoto" })],
      initialValue: [],
    }),
    defineField({
      name: "videos",
      title: "Installation videos",
      type: "array",
      description:
        "Drag videos to change their order. Publish your changes when ready.",
      of: [defineArrayMember({ type: "serviceVideo" })],
      initialValue: [],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Services media",
      subtitle: "Photo gallery and installation videos",
    }),
  },
});
