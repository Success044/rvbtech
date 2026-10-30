# Website assets

The supplied company logo is `images/logo/rvblogo.png`. Its original dimensions are 1131 × 1101, and the shared header/footer display it without stretching.

Original media retained for the import utility and explicit local mode:

- `images/services/plumbing/`: eight plumbing photos.
- `images/services/electrical/`: four electrical photos.
- `src/content/media.ts`: logo metadata, photo captions/alt text/dimensions, and all six YouTube Shorts URLs. Website paths omit `public`, for example `/images/logo/rvblogo.png`.

The `/services` introduction pairs the service heading with a custom water-distribution and lighting illustration, followed by the service scope from `src/content/services.ts`. The Selected work gallery reads published Sanity photos; edit their order and categories in Services media. The original 12-photo catalog in `src/content/media.ts` is retained for migration and explicit local mode. The gallery uses four columns on desktop, three on tablets, and two on phones. Photos retain their original proportions and open in an enlarged view. Plumbing and Electrical filters limit the gallery to that service. Five featured Shorts appear as compact previews and open a player dialog when selected. The extra sixth clip stays in the catalog and is excluded from the page. **Open on YouTube** links to the company's `@RVBTECH218` channel. A closing enquiry strip links to Contact. Videos stay on YouTube and are never uploaded into this directory. The homepage retains its original illustrations and has no photo or video gallery.

Sanity project `f7mpzpv1`, dataset `production`, now contains a **Services media** document. Open [R.V.B Tech Studio](https://rvbtech.sanity.studio/structure), sign in with Google, and select **Structure → Services media** to upload photos into **Photo gallery** or paste YouTube links into **Installation videos**, then publish. For local Studio development, run `npm run studio` and open `http://localhost:3333`. The Services page reads this published content. The local source catalog remains available for explicit local mode and the non-overwriting import script (`npm run sanity:import`). The logo remains local. See `docs/16-media-and-sanity-plan.md` for the editor guide and publishing behavior.

Keep private original artwork and permission records outside this public directory.

The website illustrations live in `src/components/illustrations/` as SVG components. Their colors use the Tailwind theme in `src/app/globals.css`, so palette updates apply to the diagrams too. The homepage hero and service schematics remain labeled as concept illustrations. The Services introduction uses `service-detail-drawing.tsx`, a static concept illustration inspired by the supplied water-tank and lighting photos. Installation photos belong to `/services`.

The temporary favicon lives in `src/app/icon.svg` and `src/app/favicon.ico`; replace both when the final brand mark is ready.
