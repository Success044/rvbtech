"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render(
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: string;
      size: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      "timeout-callback": () => void;
    },
  ): string;
  remove(id: string): void;
  reset(id: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function Turnstile({
  siteKey,
  onToken,
  onError,
  resetKey,
}: {
  siteKey: string;
  onToken: (token: string) => void;
  onError: () => void;
  resetKey: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const callbacks = useRef({ onToken, onError });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    callbacks.current = { onToken, onError };
  }, [onToken, onError]);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !containerRef.current || !window.turnstile) return;
    const api = window.turnstile;
    widgetRef.current = api.render(containerRef.current, {
      sitekey: siteKey,
      action: "contact",
      theme: "light",
      size: "flexible",
      callback: (token) => callbacks.current.onToken(token),
      "expired-callback": () => callbacks.current.onToken(""),
      "error-callback": () => {
        callbacks.current.onToken("");
        callbacks.current.onError();
      },
      "timeout-callback": () => callbacks.current.onToken(""),
    });
    return () => {
      if (widgetRef.current) api.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, [ready, siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetRef.current && window.turnstile)
      window.turnstile.reset(widgetRef.current);
  }, [resetKey]);

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={onReady}
        onError={() => callbacks.current.onError()}
      />
      <div ref={containerRef} className="min-h-16 w-full" />
    </>
  );
}
