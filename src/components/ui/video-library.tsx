"use client";

import { ArrowUpRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SiteVideo } from "@/content/media";
import { getYouTubeVideoId } from "@/lib/youtube";
import { YouTubeShort } from "./youtube-short";

export function VideoLibrary({ videos }: { videos: SiteVideo[] }) {
  const validVideos = videos.filter((video) => getYouTubeVideoId(video.url));
  const [activeVideo, setActiveVideo] = useState<SiteVideo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeVideo && !dialog?.open) dialog?.showModal();
    if (!activeVideo && dialog?.open) dialog.close();
  }, [activeVideo]);

  return (
    <>
      <ul className="grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-10">
        {validVideos.map((video) => (
          <li key={video.id} className="min-w-0 border-t border-line-dark">
            <button
              type="button"
              className="group flex w-full items-center gap-4 py-5 text-left"
              aria-label={`Play ${video.title}`}
              aria-haspopup="dialog"
              onClick={() => setActiveVideo(video)}
            >
              <span className="relative shrink-0 overflow-hidden rounded-sm">
                <Image
                  className="h-28 w-21 object-cover"
                  src={`https://i.ytimg.com/vi/${getYouTubeVideoId(video.url)}/hqdefault.jpg`}
                  alt=""
                  width={480}
                  height={360}
                  unoptimized
                />
                <span className="absolute right-1.5 bottom-1.5 flex size-7 items-center justify-center rounded-full bg-mineral text-graphite">
                  <Play className="ml-0.5" size={13} aria-hidden="true" />
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-sm leading-relaxed font-medium group-hover:underline group-hover:underline-offset-4">
                  {video.title}
                </span>
                <span className="mt-2 block text-xs text-mineral/60">
                  Watch video
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        className="m-auto max-h-[calc(100dvh-2rem)] w-104 max-w-[calc(100%-2rem)] overflow-y-auto border-0 bg-graphite p-0 text-mineral backdrop:bg-graphite/90 [--focus-color:var(--color-copper-light)]"
        aria-labelledby="video-dialog-title"
        onClose={() => setActiveVideo(null)}
      >
        {activeVideo && (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-graphite px-4 py-2">
              <h3 id="video-dialog-title" className="text-sm font-medium">
                {activeVideo.title}
              </h3>
              <button
                className="flex size-11 shrink-0 items-center justify-center hover:bg-mineral/10"
                type="button"
                aria-label="Close video"
                onClick={() => dialogRef.current?.close()}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="mx-auto w-[clamp(200px,40dvh,24rem)] max-w-full">
              <YouTubeShort video={activeVideo} />
            </div>
            <a
              className="mx-4 inline-flex min-h-13 items-center gap-2 text-xs text-mineral/75 underline underline-offset-4 hover:text-mineral"
              href={activeVideo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch this clip on YouTube
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </>
        )}
      </dialog>
    </>
  );
}
