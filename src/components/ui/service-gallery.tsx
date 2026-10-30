"use client";

import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ServiceCategory, ServicePhoto } from "@/content/media";
import { cx } from "@/lib/classes";
import { isSanityImage, sanityImageLoader } from "@/lib/sanity-image-loader";

const filters = [
  { id: "all", label: "All work" },
  { id: "plumbing", label: "Plumbing" },
  { id: "electrical", label: "Electrical" },
] as const;

export function ServiceGallery({ images }: { images: ServicePhoto[] }) {
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleImages = images.filter(
    (image) => category === "all" || image.category === category,
  );
  const selectedImage =
    selectedIndex === null ? null : visibleImages[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedIndex !== null && !dialog?.open) dialog?.showModal();
    if (selectedIndex === null && dialog?.open) dialog.close();
  }, [selectedIndex]);

  function changePhoto(direction: number) {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current + direction + visibleImages.length) % visibleImages.length,
    );
  }

  return (
    <>
      <div className="border-line/70 mb-7 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="selected-work-heading"
          className="text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Selected work
        </h2>
        <fieldset className="flex gap-6">
          <legend className="sr-only">Filter work by service</legend>
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={cx(
                "min-h-11 border-b-2 text-sm",
                category === filter.id
                  ? "border-graphite text-graphite font-medium"
                  : "text-muted hover:text-graphite border-transparent",
              )}
              aria-pressed={category === filter.id}
              onClick={() => setCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </fieldset>
      </div>
      <output className="sr-only" aria-live="polite">
        {visibleImages.length} photos shown
      </output>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 xl:gap-6">
        {visibleImages.map((image, index) => (
          <figure
            className="mb-5 break-inside-avoid lg:mb-6"
            key={image.id ?? image.src}
          >
            <button
              type="button"
              className="group bg-paper/35 relative block w-full overflow-hidden rounded-sm"
              aria-label={`Enlarge ${image.caption.toLowerCase()}`}
              aria-haspopup="dialog"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                className="h-auto w-full"
                src={image.src}
                loader={
                  isSanityImage(image.src) ? sanityImageLoader : undefined
                }
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1416px) 312px, (min-width: 1280px) calc((100vw - 168px) / 4), (min-width: 1024px) calc((100vw - 112px) / 4), (min-width: 768px) calc((100vw - 96px) / 3), calc((100vw - 56px) / 2)"
              />
              <span className="text-graphite absolute right-3 bottom-3 flex size-9 items-center justify-center bg-white/95 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
                <Expand size={17} aria-hidden="true" />
              </span>
            </button>
            <figcaption className="text-muted mt-2 text-xs leading-relaxed">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="bg-graphite text-mineral backdrop:bg-graphite/90 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl border-0 p-0 [--focus-color:var(--color-copper-light)]"
        aria-labelledby="gallery-photo-caption"
        onClose={() => setSelectedIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            changePhoto(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {selectedImage && (
          <>
            <div className="flex items-center justify-between gap-4 px-4 py-2 sm:px-6">
              <h3 id="gallery-photo-caption" className="text-sm font-medium">
                {selectedImage.caption}
              </h3>
              <button
                className="hover:bg-mineral/10 flex size-11 shrink-0 items-center justify-center"
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close photo"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="relative h-[min(72dvh,850px)]">
              <Image
                src={selectedImage.src}
                loader={
                  isSanityImage(selectedImage.src)
                    ? sanityImageLoader
                    : undefined
                }
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1280px) 1152px, 95vw"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-2 text-sm sm:px-6">
              <button
                className="hover:text-copper-light flex min-h-11 items-center gap-2"
                type="button"
                onClick={() => changePhoto(-1)}
                aria-label="Previous photo"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Previous
              </button>
              <span className="text-mineral/65 text-xs" aria-live="polite">
                {(selectedIndex ?? 0) + 1} / {visibleImages.length}
              </span>
              <button
                className="hover:text-copper-light flex min-h-11 items-center gap-2"
                type="button"
                onClick={() => changePhoto(1)}
                aria-label="Next photo"
              >
                Next
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
