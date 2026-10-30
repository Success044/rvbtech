import type { SiteVideo } from "@/content/media";
import { getYouTubeVideoId } from "@/lib/youtube";

// Mounted only after a visitor chooses a clip. Closing its dialog removes it.
export function YouTubeShort({
  video,
  title,
}: {
  video: SiteVideo;
  title: string;
}) {
  const videoId = getYouTubeVideoId(video.url);

  if (!videoId) return null;

  return (
    <div className="relative aspect-[9/16] overflow-hidden bg-graphite">
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
