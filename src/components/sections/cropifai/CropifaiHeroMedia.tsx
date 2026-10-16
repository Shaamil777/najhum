"use client";

import { useSyncExternalStore } from "react";
import { CROPIFAI_POSTERS, HERO_VIDEOS } from "@/config/videos";

const query = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

export default function CropifaiHeroMedia() {
  const playVideo = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  return <>
    <picture>
      <source media="(max-width: 767px)" srcSet={CROPIFAI_POSTERS.mobile} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CROPIFAI_POSTERS.desktop} alt="" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
    </picture>
    {playVideo && <video autoPlay loop muted playsInline preload="metadata" poster={CROPIFAI_POSTERS.desktop} className="absolute inset-0 w-full h-full object-cover"><source src={HERO_VIDEOS.cropifai} type="video/mp4" /></video>}
  </>;
}
