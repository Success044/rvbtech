# rvbtech

The responsive Home, About, Services, and Contact pages for rvbtech, a plumbing and electrical contracting company. Built with Next.js App Router, TypeScript, Tailwind CSS, Archivo, and Lucide icons.

The current visual direction is **Industrial Editorial**: a graphite opening spread, heavy display type, technical system illustrations, substantial service sections, and a copper enquiry panel.

## Local development

Use Node.js 24 LTS (the Sanity SDK requires Node.js 22.12 or newer).

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```bash
npm run lint
npm test
npx tsc --noEmit
npm run build
npm start
```

The first build needs network access to download Archivo through `next/font`. It is then served locally by Next.js.

## Editing the pages

- `src/content/site.ts`: brand settings, contact details, navigation, services, and proposed process copy.
- `src/content/media.ts`: shared media types, the local logo, and the original photo/video catalog used by the Sanity import and explicit local mode.
- `sanity.config.ts`, `sanity.cli.ts`, and `src/sanity/schema.ts`: the Studio configuration and Services media editor.
- `src/sanity/services.ts` and `media.ts`: published media fetching, caching, and conversion to the gallery's existing types.
- `src/components/sections/home-page.tsx`: homepage sections.
- `src/components/sections/services-page.tsx`: `/services` content, service photos, and site videos.
- `src/content/contact.ts`: supplied public phone/WhatsApp number and receiving email.
- `src/components/sections/contact-page.tsx` and `contact-form.tsx`: contact layout and enquiry form.
- `src/lib/contact/`: shared validation, bounded request handling, Turnstile verification, Resend delivery, and rate-limit adapters.
- `functions/api/contact.ts`: production contact endpoint for the planned Cloudflare Pages deployment.
- `workers/contact-limits/`: shared, atomic production rate limits; no public sending endpoint.
- `src/content/services.ts`: brief Plumbing and Electrical summaries for `/services`.
- `src/content/about.ts`: the founder's experience statement, ordered story chapters, and consultation principles.
- `src/components/sections/about-page.tsx`: the `/about` page.
- `src/components/layout/`: shared wordmark, responsive navigation, and footer.
- `src/app/globals.css`: shared Tailwind theme tokens, base rules, and the drawing-grid utility.
- `src/components/ui/`: reusable layout, typography, actions, and numbered steps.
- `src/components/illustrations/building-systems-drawing.tsx`: the original schematic shown in the hero.
- `src/components/illustrations/service-drawing.tsx`: the plumbing and electrical concept drawings.
- `src/components/illustrations/connection-fault-drawing.tsx`: the leaking-pipe and disconnected-cable illustration.
- `src/components/sections/route-placeholder.tsx`: shared layout for unfinished pages and the custom 404.
- `src/components/sections/project-invitation.tsx`: the shared project enquiry section.

## Styling conventions

Use Tailwind utilities directly in JSX for layout, spacing, responsive changes, and component states. Keep the Industrial Editorial palette and display type scale in `src/app/globals.css`; use named utilities such as `bg-graphite`, `text-copper-light`, and `text-display-section` instead of repeating color values.

Use the shared `Container`, `Section`, `Heading`, `BodyCopy`, `ActionLink`, and `NumberedSteps` components for recurring patterns. Header, mobile menu, and footer share their navigation links; Home and About share the project invitation. No page-specific or component-specific stylesheets are needed. The SVG illustrations also use Tailwind colors from the same global theme.

The supplied logo is used in the header and footer. `/services` has an illustrated introduction, service summaries, and a gallery displaying published Sanity photos. The gallery uses two columns on phones, three on tablets, and four on desktop. Visitors can filter by service and open an enlarged photo with keyboard navigation, Escape to close, and focus restored to the opener. Edit photos, captions, crops, visibility, and order in Sanity Studio. The homepage keeps its original service illustrations. See [asset notes](public/README.md).

The Services page ends with compact video previews. The five featured Shorts open in a portrait video dialog; closing it removes the player and stops playback. The extra sixth link remains in the catalog but is excluded from the page. The section's **Open on YouTube** link points to `https://www.youtube.com/@RVBTECH218`, configured by `youtubeChannelUrl` in `src/content/media.ts`. No iframe loads before a visitor chooses to play. URLs are validated before constructing privacy-enhanced embed URLs. Run `node --test tests/youtube.test.mjs` on Node 22.18+ to check the URL handling.

## Editing Services in Sanity

Project **RvbTech** (`f7mpzpv1`), dataset **production**, uses a single **Services media** document. Its **Photo gallery** stores uploaded images, captions, alternative text, service categories, crops, and visibility. Its **Installation videos** list stores titles and validated YouTube links. Drag items to reorder them, then **Publish**.

Open [R.V.B Tech Studio](https://rvbtech.sanity.studio/structure) and sign in with the Google account that has access to RvbTech. Select **Structure → Services media** to edit the content. This hosted editor is also listed under **Studios** in the project dashboard and works without a local server. For local Studio development, run `npm run studio` and open [localhost:3333](http://localhost:3333). `npm run studio:build` builds the editor; `npm run studio:deploy` updates the existing hosted Studio using the deployment ID in `sanity.cli.ts`. Content edits only need **Publish**.

The website reads only published content. On the current Next.js server, refresh after publishing; cached media revalidates after 60 seconds. Open pages do not live-refresh. Services streams its cached CMS content through a loading boundary. A future static-export deployment would need a build-time media-fetching path and a publish-triggered rebuild. The logo, page copy, and contact information remain in the codebase.

Configuration is listed in [.env.example](.env.example). `SERVICES_MEDIA_SOURCE=sanity` reads the CMS; `local` explicitly selects the original catalog for migration or offline development. Empty or unpublished CMS content stays empty, and API errors never silently restore removed local media. Public reads use no token for this dataset. A private dataset would require the server-only `SANITY_API_READ_TOKEN`.

`npm run sanity:import` seeds the existing 12 photos and six YouTube links after `npm exec sanity login`. It skips the import if a published or draft **Services media** document already exists, preserving editor changes. Keep the original local photos for this migration utility. Images are resized directly on Sanity's CDN with editor crops preserved. Studio dependencies have scoped overrides for patched transitive packages; review them when upgrading Sanity. See [the editor guide](docs/16-media-and-sanity-plan.md).

The Contact page uses the supplied `9851313968` phone/WhatsApp number and `rvbtech10@gmail.com` inbox. Its form collects name, phone and/or email, service, optional area/city, and message. Enquiries are emailed rather than stored in Sanity; when an email is provided, the visitor also receives a copy from the verified Resend sender. Keys and sender configuration belong in `.env` or hosting secrets; see [.env.example](.env.example) and [contact setup](docs/17-contact-implementation.md). No real email was sent during implementation tests.

The local Next.js `/api/contact` route is for `npm run dev`. The production build deliberately rejects delivery through this development adapter. The planned Cloudflare production endpoint requires the `CONTACT_LIMITS` Durable Object binding and complete production credentials; it fails closed if these are absent. Production hosting/static export and that binding must be configured before enabling live enquiries. A different production host needs its own shared rate-limit adapter rather than enabling the development in-memory counters.

## Current scope

Public navigation uses `/`, `/about`, `/services`, and `/contact`, with no hash fragments. All four pages have their content. Unknown URLs show the fault illustration and a single **Back to home** button. A hidden heading preserves page context for screen readers. The header marks the active page on all four routes.

Skip-to-content, back-to-top, and the About story jump use buttons that move focus and scroll without changing the URL. They respect reduced-motion preferences.

The Contact page has descriptive metadata and direct contact links. Form delivery remains disabled until the required credentials, verified sender, and production backend are ready. All supplied service photos appear on `/services`. Detailed project case studies, team imagery, and testimonials remain omitted until their content is available.

The About copy is an editorial draft from the user-supplied owner interview. Its 13-year experience statement refers to the founder, not the age of the company. The story has ordered chapters without invented milestone dates. Warranty examples from the interview are not published as promises. Confirm final copy and operating policies with the owner before launch; the plan is recorded in `docs/15-about-page-plan.md`.

The website is a local implementation for review, with proposed copy from the project docs. Confirm service scope, process, contact channels, photography, and final branding before launch. Services media is connected to Sanity, and its Studio is deployed at `https://rvbtech.sanity.studio`. Contact delivery, static-export hosting configuration, and public website deployment still need their production setup. No production website domain or service area is assumed.
