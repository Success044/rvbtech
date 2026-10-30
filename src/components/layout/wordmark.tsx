import Image from "next/image";
import { site } from "@/content/site";

export function Wordmark() {
  if (site.logo.src) {
    return (
      <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 ring-1 ring-graphite/8 md:size-16">
        <Image
          className="h-full w-full object-contain"
          src={site.logo.src}
          alt={site.logo.alt}
          width={site.logo.width}
          height={site.logo.height}
          sizes="(min-width: 768px) 52px, 44px"
        />
      </span>
    );
  }

  return (
    <span className="text-[1.6875rem] font-extrabold leading-none tracking-[-0.06em] sm:text-[2.4375rem]">
      {site.name}
      <span className="text-copper-light">.</span>
    </span>
  );
}
