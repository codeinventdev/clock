"use client";

import { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
  format?: "auto" | string;
  responsive?: boolean;
}

export const AdPlaceholder = ({
  slot,
  className = "w-full max-w-7xl mx-auto my-8",
  style,
  format = "auto",
  responsive = true,
}: AdPlaceholderProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If AdSense client isn't configured, do nothing (keeps placeholder)
    if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT || !adRef.current) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT || !slot) {
    // Fallback placeholder for local/dev or when slot not provided
    return (
      <div className={className}>
        <div className="flex items-center justify-center w-full h-24 bg-muted/50 border border-dashed rounded-lg">
          <span className="text-muted-foreground">Advertisement</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        style={{ display: "block", ...(style || {}) }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};
