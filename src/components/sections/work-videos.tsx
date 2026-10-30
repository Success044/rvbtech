import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/layout";
import { VideoLibrary } from "@/components/ui/video-library";
import { type SiteVideo, youtubeChannelUrl } from "@/content/media";

export function WorkVideos({ videos }: { videos: SiteVideo[] }) {
  const featuredVideos = videos.filter((video) => video.featured);
  if (featuredVideos.length === 0) return null;
  return (
    <section
      className="bg-forest py-12 text-mineral md:py-16 [--focus-color:var(--color-copper-light)]"
      aria-labelledby="work-videos-heading"
    >
      <Container>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-x-7 gap-y-3">
          <h2
            id="work-videos-heading"
            className="text-2xl font-medium tracking-[-0.03em] md:text-3xl"
          >
            Installation videos
          </h2>
          <a
            className="inline-flex min-h-11 items-center gap-2 text-sm text-mineral/80 underline underline-offset-4 hover:text-mineral"
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on YouTube
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <VideoLibrary videos={featuredVideos} />
      </Container>
    </section>
  );
}
