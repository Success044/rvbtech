const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
const youtubeHosts = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
]);

// Shared by Sanity's video URL field and the website's video player.
// Construct embeds from the ID, never from an arbitrary editor-supplied URL.
export function getYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) {
      return null;
    }

    let id: string | null = null;
    if (url.hostname === "youtu.be") {
      id = url.pathname.slice(1);
    } else if (youtubeHosts.has(url.hostname)) {
      if (url.pathname === "/watch") {
        id = url.searchParams.get("v");
      } else {
        const match = url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)\/?$/);
        id = match?.[1] ?? null;
      }
    }

    return id && videoIdPattern.test(id) ? id : null;
  } catch {
    return null;
  }
}
